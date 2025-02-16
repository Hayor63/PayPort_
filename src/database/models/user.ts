import { getModelForClass, prop, pre, DocumentType } from "@typegoose/typegoose";
import * as argon2 from "argon2";

@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
export class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  isVendor!: boolean;

  @prop({ unique: true, required: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: true })
  contactNumber!: string;

  @prop({ required: true, default: false })
  isVerified!: boolean;

  
  // @prop({ required: true, enum: ["admin", "manager", "user"], default: "user" })
  // role!: string;

  async verifyPassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
