"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLevelSchema = exports.LoginSchema = exports.SignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupSchema = zod_1.default.object({
    name: zod_1.default.string({ required_error: "Name is required" }).trim().min(1),
    email: zod_1.default
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: zod_1.default
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be atleast 6 characters long" }),
    city: zod_1.default.string({ required_error: "City is required" }),
    age: zod_1.default
        .number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
    })
        .min(12, { message: "Age must be 12 or above" }),
    levels: zod_1.default.number().array().optional(),
});
exports.LoginSchema = zod_1.default.object({
    email: zod_1.default
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: zod_1.default
        .string()
        .min(6, { message: "Password must be atleast 6 characters long" }),
});
exports.UpdateLevelSchema = zod_1.default.object({
    level: zod_1.default
        .number({
        required_error: "Level is required",
        invalid_type_error: "Level must be a number",
    })
        .min(2, { message: "Level must be between 2 to 5" })
        .max(5, { message: "Level must be between 2 to 5" }),
});
//# sourceMappingURL=index.js.map