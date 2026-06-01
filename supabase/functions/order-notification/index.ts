import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId, customer, items, total, orderNumber } = await req.json();

    // Build order summary
    const itemsList = (items || [])
      .map((item: any) => `- ${item.name} (Qty: ${item.quantity || 1}) — ${item.price || ""}`)
      .join("\n");

    const orderSummary = `
🛒 New Order Received!

📋 Order Number: ${orderNumber || orderId}
👤 Customer: ${customer?.name || "N/A"}
📧 Email: ${customer?.email || "N/A"}
📱 Phone: ${customer?.phone || "N/A"}
📍 Address: ${customer?.address || "N/A"}

📦 Items:
${itemsList || "—"}

💰 Total: ${total || "N/A"}

🕐 Time: ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}

🔗 Track Order: https://goldcoasthair.readdy.ai/track?id=${orderNumber || orderId}
    `.trim();

    // Send to Readdy form endpoint for email notification
    const formData = new URLSearchParams({
      name: customer?.name || "New Order",
      email: customer?.email || "no-reply@goldcoasthair.com",
      subject: `New Order: ${orderNumber || orderId}`,
      message: orderSummary,
    });

    await fetch("https://readdy.ai/api/form/d8eu1heuf4jvh7ti3k1g", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
