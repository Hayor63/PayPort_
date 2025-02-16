import { object, optional, string,number, array, TypeOf,boolean,z } from "zod"
export const CategorySchema = object ({
    body : object ({
        name : string({ required_error :" name is required"}),
        image : string({ required_error :" image is required"}),
        description : string ({ required_error : "description is required"})
    })
})
export type createCategory = TypeOf < typeof CategorySchema> ["body"]