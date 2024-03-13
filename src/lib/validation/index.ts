import { z } from "zod";

export const SignupValidationSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 chateracters" }),
  username: z
    .string()
    .min(3, { message: "UserName must be at least 3 chateracters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 chateracters" }),
  email: z.string().email(),
});
