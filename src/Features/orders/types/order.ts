import type { Database } from "../../../services/database.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];

export interface OrderItem {
  id: string | number;
  title: string;
  quantity: number;
  selectedPlatform: string;
  price: number;
  licenseKey?: string;
  licenseKeys?: string[];
}
