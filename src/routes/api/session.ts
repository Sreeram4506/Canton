import { createFileRoute } from "@tanstack/react-router";
import { checkPassword, clearCookie, isAdmin, json, sessionCookie } from "@/server/auth";

export const Route = createFileRoute("/api/session")({
  server: {
    handlers: {
      GET: ({ request }) => json({ admin: isAdmin(request) }),
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
        // Small fixed delay slows down password guessing.
        await new Promise((r) => setTimeout(r, 400));
        if (typeof body?.password !== "string" || !checkPassword(body.password)) {
          return json({ error: "Wrong password" }, 401);
        }
        return json({ admin: true }, 200, { "set-cookie": sessionCookie() });
      },
      DELETE: () => json({ admin: false }, 200, { "set-cookie": clearCookie() }),
    },
  },
});
