import {
  getModelForClass,
  prop,
  Ref,
  pre,
  Severity,
  ModelOptions,
} from "@typegoose/typegoose";
import ProductModel, { Product } from "./product";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<CartItem>("save", async function () { // Change validate to save
  // Manually populate the product and calculate subtotal
  const product = await ProductModel.findById(this.productId);
  const productPrice = product?.price || 0;
  this.Subtotal = this.quantity * productPrice; // Dynamically calculate Subtotal
})
export class CartItem {
  @prop({ ref: () => Product, required: true })
  productId!: Ref<Product>; // Reference to the Product

  @prop({ required: true })
  quantity!: number;

  @prop({ default: 0 }) // Ensure default value for Subtotal
  Subtotal!: number;
}

const CartItemModel = getModelForClass(CartItem);
export default CartItemModel;
