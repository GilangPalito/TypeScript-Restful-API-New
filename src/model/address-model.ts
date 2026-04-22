import { Address } from "@prisma/client";

export type AddressResponse = {
    id: number;
    street?: string | null;
    city?: string | null;
    province?: string | null;
    country: string;
    postal_code: string;
}

export type CreateAddressRequest = {
    contact_id: number;
    street?: string;
    city?: string;
    province?: string;
    country: string;
    postal_code: string;
}

export type UpdateAddressRequest = {
    id : number;
    contact_id: number;
    street?: string;
    city?: string;
    province?: string;
    country: string;
    postal_code: string;
}

export type GetAddressRequest = {
    contact_id: number;
    id: number;
}

// Karena sama dgn GetAddressRequest, kita bisa pake type alias untuk DeleteAddressRequest
export type RemoveAddressRequest = GetAddressRequest


// ini utk konversi address yg ada di prisma ke bentuk response yang akan dikirim ke client
export function toAddressResponse(address: Address): AddressResponse{
    return {
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code,
    }
}