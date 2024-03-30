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
exports.signUp = exports.checkIfUserAlreadyExists = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const result = yield bcrypt_1.default.hash(password, saltRounds);
    return result;
});
const checkIfUserAlreadyExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    return foundUser;
});
exports.checkIfUserAlreadyExists = checkIfUserAlreadyExists;
const signUp = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, name, age, city, }) {
    const hashedPassword = yield hashPassword(password);
    const createdUser = yield prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            age,
            city,
            levels: [1],
        },
    });
    return createdUser;
});
exports.signUp = signUp;
//# sourceMappingURL=Signup.js.map