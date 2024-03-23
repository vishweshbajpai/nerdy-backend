import z from "zod";

export const SignupSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim().min(1),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters long" }),
  city: z.string({ required_error: "City is required" }),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(12, { message: "Age must be 12 or above" }),
  levels: z.number().array().optional(),
});

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

export const UpdateLevelSchema = z.object({
  level: z
    .number({
      required_error: "Level is required",
      invalid_type_error: "Level must be a number",
    })
    .min(2, { message: "Level must be between 2 to 10" })
    .max(10, { message: "Level must be between 2 to 10" }),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type UpdateLevelSchemaType = z.infer<typeof UpdateLevelSchema>;
