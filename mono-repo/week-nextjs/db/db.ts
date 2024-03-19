import { PrismaClient } from "@prisma/client";


const prismaClientSingletion = () => {
    return new PrismaClient();
}

declare global {
    var prismaGlobal : undefined | ReturnType<typeof prismaClientSingletion>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingletion();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;