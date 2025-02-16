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
export const ProductSchema = object({
  body: object({
    title: string({ required_error: " title is required" }),
    // Product_id : string({ required_error :" productid is required"}),
    price: number({ required_error: " price is required" }).positive(
      "must be positive"
    ),
    instock: boolean({ required_error: "instock is required" }).optional(),
    description: string({ required_error: "description is required" }),
    isFeatured: boolean().optional(),
    categoryId: array(string({ required_error: "category required" })),
    sku: number().optional(),
    slug: string().optional(),
  }),
});

//delete Product
export const deleteProductSchema = object({
  params: object({
    id: string({
      required_error: "Product ID is required",
    }),
  }),
});

// get Single Product
export const getSingleProductSchema = object({
  params: object({
    id: string({
      required_error: "Product ID is required",
    }),
  }),
});

//update Product
export const updateProductSchema = object({
  params: object({
    id: string({
      required_error: "Billing ID is required",
    }),
  }),
  body: object({
    title: string({ required_error: " title is required" }),
    // Product_id : string({ required_error :" productid is required"}),
    price: number({ required_error: " price is required" }).positive(
      "must be positive"
    ),
    instock: boolean({ required_error: "instock is required" }).optional(),
    description: string({ required_error: "description is required" }),
    isFeatured: boolean().optional(),
    categoryId: array(string({ required_error: "category required" })),
    sku: number().optional(),
    slug: string().optional(),
  }),
});
export type Product = z.infer<typeof ProductSchema>["body"];
export type CreateProduct = Omit<Product, "slug" | "sku">;
export type deleteProduct = TypeOf<typeof deleteProductSchema>["params"];
export type updateProduct = {
  params: TypeOf<typeof updateProductSchema>["params"];
  body: TypeOf<typeof updateProductSchema>["body"];
};
export type getSingleProduct = TypeOf<typeof getSingleProductSchema>["params"]
