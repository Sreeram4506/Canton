/** Saves a form submission for the admin dashboard. Never throws: WhatsApp hand-off still works if this fails. */
export function saveSubmission(payload: Record<string, string>): void {
  fetch("/api/submissions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
