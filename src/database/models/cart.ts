import { getModelForClass, prop, Ref, pre, Severity, ModelOptions } from "@typegoose/typegoose";
import { CartItem } from "./cartitem"; // Correct import
import { User } from "./user";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Cart>("validate", async function () {
  // Make sure cartItems are populated before calculating the total
  const populatedCartItems = await this.populate('cartItems'); // Populate cartItems
  
  // Calculate total before saving
  this.total = populatedCartItems.cartItems.reduce((total, cartItem: any) => {
    const cartItemSubtotal = cartItem?.Subtotal || 0;
    return total + cartItemSubtotal;
  }, 0);
})
export class Cart {

  @prop({ ref: () => User, required: true }) 
  userId!: Ref<User>; 

  @prop({ ref: () => CartItem, required: true })
  cartItems!: Ref<CartItem>[]; 

  @prop({ required: true, default: 0 })
  total!: number;
}

const CartModel = getModelForClass(Cart);
export default CartModel;
