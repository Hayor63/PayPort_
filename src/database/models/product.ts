import {
  getModelForClass,
  prop,
  Ref,
  modelOptions,
  pre,
  Severity,
  DocumentType,
  ModelOptions,
} from "@typegoose/typegoose";
import categoryModel, { category } from "./category";
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Product>("save", async function () {
  if (!this.isModified("title") && !this.isModified("sku")) return;
  const randomDigit =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  this.sku = randomDigit;
  const slugified = this.title.toLowerCase().split(" ").join("-");
  this.slug = slugified;
  return;
})
export class Product {
  @prop({ required: true })
  title!: string;
  @prop({ required: true })
  price!: number;
  @prop({ required: true })
  instock!: boolean;
  @prop({ required: true })
  description!: string;
  @prop({ required: true, default: false })
  isFeatured!: boolean;
  @prop({ref : ()=> category, required : true})
  categoryId : Ref<category>[];
  @prop()
  slug: string;
  @prop()
  sku: number;
}
const ProductModel = getModelForClass(Product);
export default ProductModel;
