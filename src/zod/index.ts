import z from "zod";

export const SignupSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim().min(1),
  username: z
    .string({ required_error: "Username is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be atleast 6 characters long" }),
  city: z.string(),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(12),
  levels: z.number().array(),
});

export const LoginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be atleast 6 characters long" }),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
