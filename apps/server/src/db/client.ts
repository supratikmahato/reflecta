import { PrismaClient } from "database";

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

export async function connect(): Promise<void> {
  await prisma.$connect();
  console.log("Connected to database");
}

export async function disconnect(): Promise<void> {
  await prisma.$disconnect();
  console.log("Disconnected from database");
}

export default prisma;
