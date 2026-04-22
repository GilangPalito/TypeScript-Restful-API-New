import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, SearchContactRequest, toContactResponse, UpdateContactRequest } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class ContactService {

    // ------------------------------------------------------------
    // CREATE CONTACT
    // ------------------------------------------------------------
   static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request) as CreateContactRequest;

        const record = {
            ...createRequest,
            ...{username: user.username}
        };

        const contact = await prismaClient.contact.create({
            data: record
        });

        logger.debug("record : " + JSON.stringify(contact));
        return toContactResponse(contact);
    }

    // Function utk Cek apakah contact dengan id tertentu milik user dengan username tertentu, ada
    static async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where:{
                id: contactId,
                username: username
            }
        });

        if(!contact){
            throw new ResponseError(404, "Contact not found");
        }
        return contact;
    }

    // ------------------------------------------------------------
    // GET CONTACT
    // ------------------------------------------------------------
    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExists(user.username, id);
        return toContactResponse(contact);
    }

    // ------------------------------------------------------------
    // UPDATE CONTACT
    // ------------------------------------------------------------
    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {

        const updateRequest = Validation.validate(ContactValidation.UPDATE, request) as UpdateContactRequest;  // Validasi request
        await this.checkContactMustExists(user.username, updateRequest.id); // Cek pastikan contact nya harus ada

        // Update ke Database
        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        }); 

        return toContactResponse(contact);
    }

    // ------------------------------------------------------------
    // REMOVE CONTACT
    // ------------------------------------------------------------
    static async delete(user: User, id: number): Promise<ContactResponse> {
        await this.checkContactMustExists(user.username, id); // Cek pastikan contact nya harus ada

        const contact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        }); 
        return toContactResponse(contact);
    }

    // ------------------------------------------------------------
    // SEARCH CONTACT
    // ------------------------------------------------------------
    static async search(user: User, request: SearchContactRequest) : Promise<Pageable<ContactResponse>> {
        const searchRequest = Validation.validate(ContactValidation.SEARCH, request) as SearchContactRequest;
        const skip = (searchRequest.page - 1) * searchRequest.size;

        const filters = [];
        // check if name exists
        if(searchRequest.name){
            filters.push({
                OR: [
                    {
                        first_name: {
                            contains: searchRequest.name
                        }
                    },
                    {
                        last_name: {
                            contains: searchRequest.name
                        }
                    }
                ]
            })
        }
        // check if email exists
        if(searchRequest.email){
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        // check if phone exists
        if(searchRequest.phone){
            filters.push({
                phone: {
                    contains: searchRequest.phone
                }
            })
        }

        const contacts = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters
            },
        })

        return {
            data: contacts.map(contact => toContactResponse(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }

}