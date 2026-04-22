import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, toAddressResponse, UpdateAddressRequest } from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Address } from "../generated/prisma";


export class AddressService {

    // =================================================
    // CREATE Address
    // =================================================
    static async create(user : User, request: CreateAddressRequest) : Promise<AddressResponse> {
        // validasi data request
        const createRequest = Validation.validate(AddressValidation.CREATE, request) as CreateAddressRequest;

        // Cek apakah Contact nya ada atau tidak, karena kita butuh contact_id untuk membuat address
        await ContactService.checkContactMustExists(user.username, request.contact_id);

        const address = await prismaClient.address.create({
            data: createRequest
        });

       return toAddressResponse(address);
    }
    
    // Cek apakah address dengan id tertentu ada atau tidak, dan apakah address tersebut milik contact dengan contact_id tertentu atau tidak
     static async checkAddressMustExists(contactId: number, addressId: number): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId
            }
        });

        if (!address) {
            throw new ResponseError(404, "Address is not found");
        }
        return address;
    }

    // =================================================
    // GET Address
    // =================================================
   static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const getRequest = Validation.validate(AddressValidation.GET, request) as GetAddressRequest;

        await ContactService.checkContactMustExists(user.username, request.contact_id);
        const address = await this.checkAddressMustExists(getRequest.contact_id, getRequest.id);

        return toAddressResponse(address);
    }

    // =================================================
    // UPDATE Address
    // =================================================
    static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest = Validation.validate(AddressValidation.UPDATE, request) as UpdateAddressRequest;

        await ContactService.checkContactMustExists(user.username, request.contact_id);
        await this.checkAddressMustExists(updateRequest.contact_id, updateRequest.id);

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        });

        return toAddressResponse(address);
    }

    // =================================================
    // REMOVE Address
    // =================================================
    static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {

        const removeRequest = Validation.validate(AddressValidation.GET, request) as RemoveAddressRequest;
       
        await ContactService.checkContactMustExists(user.username, request.contact_id);
        await this.checkAddressMustExists(removeRequest.contact_id, removeRequest.id);

        const address = await prismaClient.address.delete({
            where: {
                id: removeRequest.id
            }
        });

        return toAddressResponse(address);
    }

    // =================================================
    // LIST Address berdasarkan contact_id tertentu     
    // =================================================
    static async list(user: User, contactId: number): Promise<Array<AddressResponse>> {
        await ContactService.checkContactMustExists(user.username, contactId);

        const addresses = await prismaClient.address.findMany({
            where:{
                contact_id: contactId
            }
        });

        return addresses.map((address) => toAddressResponse(address));
    }
       


}