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
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<category>("save", async function () {
  if (!this.isModified("sku")) return;
  const slugified = this.name.toLowerCase().split(" ").join("-");
  this.slug = slugified;
  return;
})
export class category {
  @prop({ required: true })
  name!: string;
  @prop({ required: true })
  description!: string;
  @prop({ required: true })
  image!: string;
  @prop()
  slug: string;
}
const categoryModel = getModelForClass(category);
export default categoryModel;
