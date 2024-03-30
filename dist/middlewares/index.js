"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enums_1 = require("../utils/enums");
const constants_1 = require("../utils/constants");
const validateToken = (req, res, next) => {
    var _a;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(enums_1.StatusCodes.Unauthorized)
            .json({ message: "Authorization header not found" });
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res
            .status(enums_1.StatusCodes.Unauthorized)
            .json({ message: "Bearer token expected (JWT)" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const secretKey = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : constants_1.Alternates.secretKey;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        if (err.name === enums_1.Errors.TOKEN_EXPIRED_ERROR) {
            return res
                .status(enums_1.StatusCodes.Unauthorized)
                .json({ message: "Token expired" });
        }
        return res
            .status(enums_1.StatusCodes.Unauthorized)
            .json({ message: "Unauthorized" });
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=index.js.map