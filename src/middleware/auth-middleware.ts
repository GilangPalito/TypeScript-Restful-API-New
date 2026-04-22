// Middleware yg digunakan untuk request sebelum masuk ke controller
import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { prismaClient } from "../application/database";


export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    
    const token = req.get(`X-API-TOKEN`); // 1. Kira ambil token nya dulu.

    if (token) {  // 2. Cek, dia ngirim token atau tidak.
        const user = await prismaClient.user.findFirst({   // kita query ke database, apakah token nya valid atau tidak. 
            where: {
                token: token
            }
        }); 
      
        if (user) {   // Klo user nya ditemukan
            req.user = user;        
            next(); // panggil next function nya
            return;
        }
    }

    res.status(401).json({   // 3. Klo nggk dikirim token nya, kembalikan error 401 (Unauthorized)
        errors: "Unauthorized"
    }); 
}
