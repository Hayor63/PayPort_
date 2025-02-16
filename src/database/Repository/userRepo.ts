import { DocumentType } from "@typegoose/typegoose";
import { formatcontactNumber } from "../../utils/formatter";
import UserModel, { User } from "../models/user";

export default class UserRepo {
  static createUser:(
    user: Omit<User, "verifyPassword" >
  ) => Promise<User> = async (user) => {
    const { contactNumber, ...rest } = user;
    return await UserModel.create({
      ...rest,
      contactNumber: formatcontactNumber(contactNumber)
    });
  };

  static verifyUser: (id: string) => Promise<boolean> = async (id) => {
    const user = await this.findById(id);
    if (!user) {
      return false; // User not found
    }

    // Assuming `isVerified` is a field in the User schema
    user.isVerified = true;
    await user.save(); // Save the updated user
    return true; // Indicate success
  };


  static findByEmail: (
    email: string
  ) => Promise<DocumentType<User> | null> = async (email) => {
    return await UserModel.findOne({ email });
  };

  static updateUser: (
    updateParams: Partial<User>,
    id: string
  ) => Promise<Omit<User, "password"> | null> = async (updateParams, id) => {
    const { password, ...rest } = updateParams;
    const user = await this.findById(id);
    if (!user) return null;
    if (password) {
      user.password = password;
      user.save();
    }
    await UserModel.findByIdAndUpdate(id, rest);
    return rest as User;
  };

  static findById = async (id: string) => {
    return await UserModel.findById(id);
  };

  static deleteUser = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
  };
}