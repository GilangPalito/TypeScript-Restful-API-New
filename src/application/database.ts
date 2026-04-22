import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient} from "@prisma/client"; // Mengimpor PrismaClient dari paket @prisma/client
import {logger} from "./logging";

const globalForPrisma = globalThis as unknown as { // Menambahkan properti prisma ke globalThis untuk menyimpan instance PrismaClient
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({ // Konfigurasi adapter untuk PostgreSQL
  connectionString: process.env.DATABASE_URL!,
});

export const prismaClient = new PrismaClient({
    adapter,
    log: [          // Log all queries, errors, warnings, and informational messages emitted by Prisma Client
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
prismaClient.$on("error", (e) => { // Menangani event error yang dipancarkan oleh Prisma Client
    logger.error(e);
})

prismaClient.$on("warn", (e) => { // Menangani event warning yang dipancarkan oleh Prisma Client
    logger.warn(e);
})

prismaClient.$on("info", (e) => {
    logger.info(e);
})

prismaClient.$on("query", (e) => {
    logger.info(e);
})