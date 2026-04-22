"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client"); // Mengimpor PrismaClient dari paket @prisma/client
const logging_1 = require("./logging");
const globalForPrisma = globalThis;
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
exports.prismaClient = new client_1.PrismaClient({
    adapter,
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
});
// memastikan hanya ada satu instance PrismaClient yang digunakan di seluruh aplikasi
exports.prismaClient.$on("error", (e) => {
    logging_1.logger.error(e);
});
exports.prismaClient.$on("warn", (e) => {
    logging_1.logger.warn(e);
});
exports.prismaClient.$on("info", (e) => {
    logging_1.logger.info(e);
});
exports.prismaClient.$on("query", (e) => {
    logging_1.logger.info(e);
});
