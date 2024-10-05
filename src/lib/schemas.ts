import { string, z } from "zod";

import {
  MAX_UPLOAD_IMG_SIZE,
  ACCEPTED_UPLOAD_IMG_TYPES,
} from "@/lib/constants";

const fileSchema = z.unknown().transform((value) => {
  return value as FileList;
});

export const imageSchema = fileSchema.refine((files) => {
  console.log("file: ", files.item);
  return files?.[0]?.size === 0 || files?.[0]?.type.startsWith("image/");
});

// .refine((files: File) => {
//   console.log("size check: ", files.size <= MAX_UPLOAD_IMG_SIZE);
//   console.log("files: ", files.size);
//   return files;
// }, "El tamaño máximo de la imagen debe ser 5MB.")
// .refine((files) => {
//   console.log(files);
//   console.log(
//     "accepted img: ",
//     ACCEPTED_UPLOAD_IMG_TYPES.includes(files?.[0]?.type)
//   );
//   return ACCEPTED_UPLOAD_IMG_TYPES.includes(files?.[0]?.type);
// }, "Sólo se admiten los formatos .jpg, .jpeg, .png y .webp.");

export const priceSchema = z.coerce
  .number()
  .int()
  .gte(1, { message: "El precio debe ser mayor a 0." });
