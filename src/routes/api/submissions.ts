import { createFileRoute } from "@tanstack/react-router";
import { isAdmin, json } from "@/server/auth";
import { getDb } from "@/server/db";
import { parseSubmission } from "@/server/submissions";

export const Route = createFileRoute("/api/submissions")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = parseSubmission(await request.json().catch(() => null));
        if (!parsed) return json({ error: "Invalid submission" }, 400);
        try {
          await (
            await getDb()
          )
            .collection("submissions")
            .insertOne({ ...parsed, status: "new", createdAt: new Date().toISOString() });
          return json({ ok: true }, 201);
        } catch (err) {
          console.error("submission save failed", err);
          return json({ error: "Could not save" }, 500);
        }
      },
      GET: async ({ request }) => {
        if (!isAdmin(request)) return json({ error: "Unauthorized" }, 401);
        const docs = await (
          await getDb()
        )
          .collection("submissions")
          .find({})
          .sort({ createdAt: -1 })
          .limit(500)
          .toArray();
        return json(docs.map(({ _id, ...rest }) => ({ id: String(_id), ...rest })));
      },
    },
  },
});
