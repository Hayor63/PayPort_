import { createCategory } from "../../validationSchema/category";
import categoryModel, { category } from "../models/category";

export default class CategoryRepo {
  static createCategory: (category: createCategory) => Promise<category> =
    async (category) => {
      const data = await categoryModel.create(category);
      return data;
    };
}
