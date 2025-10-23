// utils/whatsapp.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export async function sendWhatsAppMessage(to, message) {
  try {
    const url = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("✅ WhatsApp API Response:", data);

    if (data.error) {
      console.error("⚠️ WhatsApp API Error:", data.error);
    }

  } catch (err) {
    console.error("❌ WhatsApp Send Error:", err.message);
  }
}
