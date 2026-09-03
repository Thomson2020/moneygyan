const WEBHOOK_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbysWckrMgcVtxcQBZ3VZv5XRKbAbTeoNRBEK2cbIzrAVoQtm6CFVNrCbAg5lk57y5tSZA/exec";

/**
 * Sends form submission data to Google Sheets & triggers an email alert via Google Apps Script.
 * Uses mode: "no-cors" since Google Apps Script redirects after execution.
 */
export async function sendToGoogleSheets(payload) {
  if (!WEBHOOK_URL) return;
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to forward submission to Google Sheets / Email:", err);
  }
}
