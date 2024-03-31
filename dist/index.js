"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const enums_1 = require("./utils/enums");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.use("*", (req, res) => {
    res.status(enums_1.StatusCodes.NotFound).json({ message: "Route not found" });
});
//  Global error handler
app.use((err, req, res, next) => {
    var _a, _b;
    const statusCode = (_a = err.statusCode) !== null && _a !== void 0 ? _a : enums_1.StatusCodes.InternalServerError;
    const message = (_b = err.message) !== null && _b !== void 0 ? _b : "Something broke!";
    res.status(statusCode).json({ message });
    console.log(err);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
exports.default = app;
//# sourceMappingURL=index.js.map