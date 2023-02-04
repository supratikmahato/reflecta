import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

export async function connect(): Promise<void> {
  await prisma.$connect();
  console.log("Connected to database");
}

export default prisma;
