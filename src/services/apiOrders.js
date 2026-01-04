import { supabase } from "./supabase";

/* export async function createOrder(newOrder) {
  const { data, error } = await supabase
    .from("orders")
    .insert([newOrder])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not create the order");
  }

  return data;
}
 */
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
    .single();
  if (error) throw error;
  return data;
}
