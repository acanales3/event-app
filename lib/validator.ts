import * as z from "zod";
import Category from "./database/models/category.model";

export const eventFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(300, "Description must be smaller than 300 characters"),
  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(300, "Location must be smaller than 300 characters"),
  imageUrl: z.string().min(1, "Must include an SVG, PNG, or JPG"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z
    .string()
    .refine(
      (value) => /^[a-zA-Z0-9]+$/.test(value),
      "Category ID must only contain alphabet characters."
    ),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
