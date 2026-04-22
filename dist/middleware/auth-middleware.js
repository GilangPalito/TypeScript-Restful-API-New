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
exports.authMiddleware = void 0;
const database_1 = require("../application/database");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get(`X-API-TOKEN`); // 1. Kira ambil token nya dulu.
    if (token) { // 2. Cek, dia ngirim token atau tidak.
        const user = yield database_1.prismaClient.user.findFirst({
            where: {
                token: token
            }
        });
        if (user) { // Klo user nya ditemukan
            req.user = user;
            next(); // panggil next function nya
            return;
        }
    }
    res.status(401).json({
        errors: "Unauthorized"
    });
});
exports.authMiddleware = authMiddleware;
