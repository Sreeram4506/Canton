import { createFileRoute } from "@tanstack/react-router";
import { isAdmin, json } from "@/server/auth";
import { getDb } from "@/server/db";

type BannerDoc = { _id: string; active: boolean; text: string };

export const Route = createFileRoute("/api/banner")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const doc = await (
            await getDb()
          )
            .collection<BannerDoc>("settings")
            .findOne({ _id: "banner" });
          return json({ active: Boolean(doc?.active && doc.text), text: doc?.text ?? "" });
        } catch (err) {
          console.error("banner read failed", err);
          // A database hiccup should never break the public site; just show no banner.
          return json({ active: false, text: "" });
        }
      },
      PUT: async ({ request }) => {
        if (!isAdmin(request)) return json({ error: "Unauthorized" }, 401);
        const body = (await request.json().catch(() => null)) as {
          active?: unknown;
          text?: unknown;
        } | null;
        const text = typeof body?.text === "string" ? body.text.trim().slice(0, 200) : "";
        const active = body?.active === true;
        if (active && !text) return json({ error: "Banner text is required" }, 400);
        await (
          await getDb()
        )
          .collection<BannerDoc>("settings")
          .updateOne({ _id: "banner" }, { $set: { active, text } }, { upsert: true });
        return json({ active, text });
      },
    },
  },
});
