"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
// API Router khusus klo udh dalam kondisi Login
//----------------------------------------------
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const contact_controller_1 = require("../controller/contact-controller");
const address_controller_1 = require("../controller/address-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware); // Middleware untuk memeriksa token sebelum mengakses route API lainnya
// User API
//----------------------------------------------
exports.apiRouter.get("/api/users/current", user_controller_1.UserController.get); // Route untuk mendapatkan data user yang sedang login (current user)
exports.apiRouter.patch("/api/users/current", user_controller_1.UserController.update); // Route untuk mengupdate data user yang sedang login (current user)
exports.apiRouter.delete("/api/users/current", user_controller_1.UserController.logout); // Route untuk logout user yang sedang login (current user)  
// Contact API
//----------------------------------------------
exports.apiRouter.post("/api/contacts", contact_controller_1.ContactController.create); // Route untuk membuat kontak baru
exports.apiRouter.get("/api/contacts/:contactId", contact_controller_1.ContactController.get); // Route untuk mendapatkan data kontak berdasarkan ID
exports.apiRouter.put("/api/contacts/:contactId", contact_controller_1.ContactController.update);
exports.apiRouter.delete("/api/contacts/:contactId", contact_controller_1.ContactController.remove);
exports.apiRouter.get("/api/contacts", contact_controller_1.ContactController.search); // Route untuk mencari kontak berdasarkan query parameters (name, email, phone, page, size)
// Address API
//----------------------------------------------
exports.apiRouter.post("/api/contacts/:contactId/addresses", address_controller_1.AddressController.create); // Route untuk membuat alamat baru untuk kontak tertentu
exports.apiRouter.get("/api/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.get); // Route untuk mendapatkan data alamat berdasarkan ID kontak dan ID alamat
exports.apiRouter.put("/api/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.update); // Route untuk mengupdate data alamat berdasarkan ID kontak dan ID alamat
exports.apiRouter.delete("/api/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.remove); // Route untuk menghapus data alamat berdasarkan ID kontak dan ID alamat
exports.apiRouter.get("/api/contacts/:contactId/addresses", address_controller_1.AddressController.list); // Route untuk mendapatkan daftar alamat berdasarkan ID kontak tertentu
