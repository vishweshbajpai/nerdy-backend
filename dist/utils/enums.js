"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["Ok"] = 200] = "Ok";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
    StatusCodes[StatusCodes["Unauthorized"] = 401] = "Unauthorized";
    StatusCodes[StatusCodes["Forbidden"] = 403] = "Forbidden";
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["InternalServerError"] = 500] = "InternalServerError";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
var Errors;
(function (Errors) {
    Errors["TOKEN_EXPIRED_ERROR"] = "TokenExpiredError";
})(Errors || (exports.Errors = Errors = {}));
//# sourceMappingURL=enums.js.map