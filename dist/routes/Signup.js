"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("../zod");
const Signup_1 = require("../repositories/Signup");
const Login_1 = require("../repositories/Login");
const enums_1 = require("../utils/enums");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Input Validation
    const parsed = zod_1.SignupSchema.safeParse(body);
    if (!parsed.success) {
        return res.status(enums_1.StatusCodes.BadRequest).json({ error: parsed });
    }
    // Check if user already exists
    const foundUser = yield (0, Signup_1.checkIfUserAlreadyExists)(body.email);
    if (foundUser) {
        return res.status(enums_1.StatusCodes.BadRequest).json({
            message: "User already exists",
        });
    }
    const createdUser = yield (0, Signup_1.signUp)(body);
    // Generate JWT
    const signedToken = (0, Login_1.generateToken)(createdUser.id);
    res.status(enums_1.StatusCodes.Ok).json({
        message: "Signup successful",
        token: signedToken,
        userDetails: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            age: createdUser.age,
            city: createdUser.city,
        },
    });
}));
exports.default = router;
//# sourceMappingURL=Signup.js.map