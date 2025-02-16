import {
  object,
  optional,
  string,
  number,
  array,
  TypeOf,
  boolean,
  z,
} from "zod";

export const OrderSchema = object({
  body: object({
    userId: string({ required_error: "userid is required" }),
    cartId: string({ required_error: "Cart ID is required" }),
    deliveryFee: number({
      required_error: "delivery fee is required",
    }).positive("fee must be positive"),
    vat: number({ required_error: "vat required" }).positive(
      "vat must be positive"
    ),
    coupon: number({ required_error: "coupon required" }).positive(
      "coupon must be positive"
    ),
    currency: string({ required_error: "currency required" }),
    paymentref: string({ required_error: "payment ref is required" }),
  }),
});

//delete order
export const deleteOrderSchema = object({
  params: object({
    id: string({
      required_error: "Order ID is required",
    }),
  }),
});

//update order
export const updateOrderSchema = object({
  params: object({
    id: string({
      required_error: "Order ID is required",
    }),
  }),

  body: object({
    cartId: string({
      required_error: "Cart ID is required",
    }),

    billingId: string({
      required_error: "Billing ID is required",
    }),

    deliveryFee: number({
      required_error: "Delivery fee is required",
    }).positive("Delivery fee must be a positive number"),

    vat: number({
      required_error: "VAT is required",
    }).nonnegative("VAT must be 0 or a positive number"),

    coupon: number().optional(),

    currency: string({
      required_error: "Currency is required",
    }),

    paymentId: string().optional(),
  }),
});

// get Single Order
export const getSingleOrderSchema = object({
  params: object({
    id: string({
      required_error: "order ID is required",
    }),
  }),
});

export type Order = z.infer<typeof OrderSchema>["body"];
export type CreateOrder = Omit<Order, "slug" | "sku">;
export type deleteOrder = TypeOf<typeof deleteOrderSchema>["params"];
export type updateOrder = {
  params: TypeOf<typeof updateOrderSchema>["params"];
  body: TypeOf<typeof updateOrderSchema>["body"];
};
export type getSingleOrder = TypeOf<typeof getSingleOrderSchema>["params"];
