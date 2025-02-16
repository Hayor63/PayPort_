import { SortOrder } from "mongoose";
import { formatResponseRecord } from "../../utils/formatter";
import { PartialLoose } from "../../utils/helpers";
import { CreateProduct } from "../../validationSchema/product";
import  Category  from "../models/category";
import ProductModel, { Product } from "../models/product";

class ProductExtend extends Product {
  createdAt: string;
}
type SortLogic = PartialLoose<ProductExtend, "asc" | "desc" | 1 | -1>;

const defaultSortLogic: SortLogic = { createdAt: -1 };
export interface PaginatedFetchParams {
  pageNumber: number;
  pageSize: number;
  filter: Record<string, any>;
  sortLogic: SortLogic;
  search: string;
}
export default class ProductRepo {
  static createProduct: (product: CreateProduct) => Promise<Product> = async (
    product
  ) => {
    const data = await ProductModel.create(product);
    return data;
  };

  static getPaginatedProduct = async ({
    pageNumber = 1,
    pageSize = 10,
    filter: _filter,
    sortLogic = defaultSortLogic, // Use -1 for descending order
    search,
  }: Partial<PaginatedFetchParams>): Promise<Product[]> => {
    const filter = {
      ...(_filter || {}),
      ...(search ? { title: { $regex: search, $options: "i" } } : {})
    };

    const products = await ProductModel.find(filter)  
      .sort(sortLogic)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate("categoryId")
      .lean()
      .exec();

    const formattedProducts: Product[] = products.map((product) => {
      return {
        ...formatResponseRecord(product),
      };
    });

    return formattedProducts;
  };

  
   //get by Id
   static getById: (productId: string) => Promise<any> = async (productId) => {
    const data = await ProductModel.findById(productId);
    return data;
  };

    //Update Product
    static updateProduct: (
      id: string,
      updateParams: Partial<CreateProduct>
    ) => Promise<any> = async (id, updateParams) => {
      return await ProductModel.findByIdAndUpdate(id, updateParams, {
        new: true,
      });
    };
  
    //Delete Product
    static deleteProduct :  (productId : string) => Promise<any> = async(productId) => {
      const data = await ProductModel.findByIdAndDelete(productId)
      return data
    }
}
