import { DeliveryStatus } from "@/providers/store/services/types/orders";

export const orderDeliveryStatuses: Record<DeliveryStatus, DeliveryStatus> = {
  pending: "pending",
  delivered: "delivered",
  canceled: "canceled",
};
