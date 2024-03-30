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
const enums_1 = require("../utils/enums");
const User_1 = require("../repositories/User");
const router = (0, express_1.Router)();
router.get("/:userId/levels", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    // Check if user already exists
    const foundUser = yield (0, User_1.getUserWithId)(userId);
    if (!foundUser) {
        return res.status(enums_1.StatusCodes.BadRequest).json({
            message: "User not found",
        });
    }
    const levels = yield (0, User_1.getLevelsOfUser)(userId);
    res.status(enums_1.StatusCodes.Ok).json({
        message: "Levels loaded successfully",
        levels,
    });
}));
router.put("/:userId/levels", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userId = req.params.userId;
    // Input Validation
    const parsed = zod_1.UpdateLevelSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(enums_1.StatusCodes.BadRequest).json({ error: parsed });
    }
    // Check if user already exists
    const foundUser = yield (0, User_1.getUserWithId)(userId);
    if (!foundUser) {
        return res.status(enums_1.StatusCodes.BadRequest).json({
            message: "User not found",
        });
    }
    if (!foundUser.levels.includes(body.level)) {
        yield (0, User_1.updateLevelOfUser)(userId, body.level);
    }
    res.status(enums_1.StatusCodes.Ok).json({ message: "Level cleared" });
}));
exports.default = router;
//# sourceMappingURL=User.js.map