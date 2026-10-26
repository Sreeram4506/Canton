import { createFileRoute } from "@tanstack/react-router";
import { ObjectId } from "mongodb";
import { isAdmin, json } from "@/server/auth";
import { getDb } from "@/server/db";
import { SUBMISSION_STATUSES } from "@/server/submissions";

export const Route = createFileRoute("/api/submissions/$id")({
  server: {
    handlers: {
      PATCH: async ({ request, params }) => {
        if (!isAdmin(request)) return json({ error: "Unauthorized" }, 401);
        if (!ObjectId.isValid(params.id)) return json({ error: "Bad id" }, 400);
        const body = (await request.json().catch(() => null)) as { status?: unknown } | null;
        const status = SUBMISSION_STATUSES.find((s) => s === body?.status);
        if (!status) return json({ error: "Bad status" }, 400);
        await (
          await getDb()
        )
          .collection("submissions")
          .updateOne({ _id: new ObjectId(params.id) }, { $set: { status } });
        return json({ ok: true });
      },
      DELETE: async ({ request, params }) => {
        if (!isAdmin(request)) return json({ error: "Unauthorized" }, 401);
        if (!ObjectId.isValid(params.id)) return json({ error: "Bad id" }, 400);
        await (await getDb()).collection("submissions").deleteOne({ _id: new ObjectId(params.id) });
        return json({ ok: true });
      },
    },
  },
});
