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
exports.updateLevelOfUser = exports.getLevelsOfUser = exports.getUserWithId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserWithId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield prisma.user.findFirst({
        where: {
            id: userId,
        },
    });
    return foundUser;
});
exports.getUserWithId = getUserWithId;
const getLevelsOfUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.user.findFirst({
        select: {
            levels: true,
        },
        where: {
            id: userId,
        },
    });
    return data === null || data === void 0 ? void 0 : data.levels;
});
exports.getLevelsOfUser = getLevelsOfUser;
const updateLevelOfUser = (userId, level) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prisma.user.update({
        data: {
            levels: {
                push: level,
            },
        },
        where: {
            id: userId,
        },
    });
    return updatedUser;
});
exports.updateLevelOfUser = updateLevelOfUser;
//# sourceMappingURL=User.js.map