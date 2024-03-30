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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.validatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const validatePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidPassword = yield bcrypt_1.default.compare(password, hashedPassword);
    return isValidPassword;
});
exports.validatePassword = validatePassword;
const generateToken = (id) => {
    var _a, _b, _c;
    const tokenExpiryTime = (_a = process.env.JWT_EXPIRATION_TIME) !== null && _a !== void 0 ? _a : constants_1.Alternates.tokenExpirationTime;
    const secretKey = (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : constants_1.Alternates.secretKey;
    const treasureHuntKey = (_c = process.env.TREASURE_HUNT_KEY) !== null && _c !== void 0 ? _c : constants_1.Alternates.treasureHuntKey;
    const tokenData = {
        userId: id,
        key: treasureHuntKey,
    };
    const signedToken = jsonwebtoken_1.default.sign(tokenData, secretKey, {
        expiresIn: tokenExpiryTime,
    });
    return signedToken;
};
exports.generateToken = generateToken;
//# sourceMappingURL=Login.js.map