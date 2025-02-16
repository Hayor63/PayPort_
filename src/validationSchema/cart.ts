import {
  object,
  string,
  array,
  TypeOf,
  z,
} from "zod";
export const CartSchema = object({
  body: object({
    userId: string({ required_error: "User ID is required" }).min(
      1,
      "User ID cannot be empty"
    ),
    cartItems: array(string({ required_error: "cart is required" })),
  }),
});

export const UpdateCartSchema = object({
  params: object({
    id: string({
      required_error: "Billing Id is required",
    }),
  }),

  body: object({
    cartItems: array(string()).optional(),
  }),
});

// Get All Cart Schema
export const getAllCartSchema = object({});

//clear Cart
export const clearCart = object({
  params: object({
    userId: string({
      required_error: "user ID is required",
    }),
  }),
});

// get Single Cart
export const getSingleCart = object({
  params: object({
    id: string({
      required_error: "Cart ID is required",
    }),
  }),
});

export const deleteCartSchema = object({
  params: object({
    id: string({
      required_error: "cart ID is required",
    }),
  }),
});

export type CreateCart = z.infer<typeof CartSchema>["body"];
export type UpdateCart = {
  params: TypeOf<typeof UpdateCartSchema>["params"];
  body: TypeOf<typeof UpdateCartSchema>["body"];
};
export type deleteCart = TypeOf<typeof deleteCartSchema>["params"];
export type clearCartSchema = TypeOf<typeof clearCart>["params"];
export type getAllCart = TypeOf<typeof getAllCartSchema>;
export type getSingleCartSchema = TypeOf<typeof getSingleCart>["params"];
