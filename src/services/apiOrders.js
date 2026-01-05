import { supabase } from "./supabase";

export async function createCheckoutSession(checkoutData) {
  const { data, error } = await supabase.functions.invoke(
    "swift-processor",
    {
      body: checkoutData,
    }
  );

  if (error) {
    console.error("Stripe Session Error:", error);
    throw new Error(error.message || "Failed to initialize payment");
  }

  return data; 
}


export async function getOrders(user_id) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Could not get orders");
  }
  return data;
}

export async function getOrderById(order_id) {
  const isStripeId = order_id.startsWith("cs_");
  const column = isStripeId ? "stripe_session_id" : "id";

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq(column, order_id)
    .maybeSingle();
  if (error) throw new Error(`Order not found ${error.message}`);
  return data;
}
