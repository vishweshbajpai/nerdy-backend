"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Signup_1 = __importDefault(require("./Signup"));
const Login_1 = __importDefault(require("./Login"));
const User_1 = __importDefault(require("./User"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.use("/signup", Signup_1.default);
router.use("/login", Login_1.default);
// Protected routes
router.use(middlewares_1.validateToken);
router.use("/users", User_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map