import type { CartItem } from "../Features/cart/cartSlice";
import type { Order } from "../Features/orders/types/order";
import type { CheckoutFormValues } from "../pages/CheckoutPage/components/CheckoutForm";
import { supabase } from "./supabase";

export interface CheckoutData {
  items: CartItem[];
  user_id: string | null;
  shippingDetails: CheckoutFormValues;
}

export async function createCheckoutSession(
  checkoutData: CheckoutData,
): Promise<{ url: string }> {
  const { data, error } = await supabase.functions.invoke<{ url: string }>(
    "swift-processor",
    {
      body: checkoutData,
    },
  );

  if (error) {
    console.error("Stripe Session Error:", error);
    throw new Error(error.message || "Failed to initialize payment");
  }

  if (!data) throw new Error("No data returned from payment processor");
  return data;
}

export async function getOrders(user_id: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Could not get orders");
  }
  return data || [];
}

export async function getOrderById(order_id: string): Promise<Order | null> {
  const isStripeId = order_id.startsWith("cs_");
  const column = isStripeId ? "stripe_session_id" : ("id" as const);

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq(column, order_id)
    .maybeSingle();
  if (error) throw new Error(`Order not found ${error.message}`);
  return data;
}
