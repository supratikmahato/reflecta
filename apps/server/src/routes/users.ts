import prisma from "../db/client";
import express, { type RequestHandler } from "express";

const router = express.Router();

router.get("/find", (async (request, response) => {
  const { username } = request.query;
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username as string,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      username: true,
    },
  });
  response.json({
    success: true,
    users,
  });
}) as RequestHandler);

export default router;
