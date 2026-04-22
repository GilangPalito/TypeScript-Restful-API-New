// API Router khusus klo udh dalam kondisi Login
//----------------------------------------------
import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";

import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { AddressController } from "../controller/address-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);     // Middleware untuk memeriksa token sebelum mengakses route API lainnya

// User API
//----------------------------------------------
apiRouter.get("/api/users/current",UserController.get);   // Route untuk mendapatkan data user yang sedang login (current user)
apiRouter.patch("/api/users/current",UserController.update); // Route untuk mengupdate data user yang sedang login (current user)
apiRouter.delete("/api/users/current",UserController.logout); // Route untuk logout user yang sedang login (current user)  

// Contact API
//----------------------------------------------
apiRouter.post("/api/contacts", ContactController.create); // Route untuk membuat kontak baru
apiRouter.get("/api/contacts/:contactId", ContactController.get); // Route untuk mendapatkan data kontak berdasarkan ID
apiRouter.put("/api/contacts/:contactId", ContactController.update); 
apiRouter.delete("/api/contacts/:contactId", ContactController.remove); 
apiRouter.get("/api/contacts", ContactController.search); // Route untuk mencari kontak berdasarkan query parameters (name, email, phone, page, size)

// Address API
//----------------------------------------------
apiRouter.post("/api/contacts/:contactId/addresses", AddressController.create); // Route untuk membuat alamat baru untuk kontak tertentu
apiRouter.get("/api/contacts/:contactId/addresses/:addressId", AddressController.get); // Route untuk mendapatkan data alamat berdasarkan ID kontak dan ID alamat
apiRouter.put("/api/contacts/:contactId/addresses/:addressId", AddressController.update); // Route untuk mengupdate data alamat berdasarkan ID kontak dan ID alamat
apiRouter.delete("/api/contacts/:contactId/addresses/:addressId", AddressController.remove); // Route untuk menghapus data alamat berdasarkan ID kontak dan ID alamat
apiRouter.get("/api/contacts/:contactId/addresses", AddressController.list); // Route untuk mendapatkan daftar alamat berdasarkan ID kontak tertentu