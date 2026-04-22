import { Request } from "express";
import { User } from "@prisma/client";

// Extend interface Request dari Express, untuk menambahkan property user
export interface UserRequest extends Request { 
    user?: User 
}

