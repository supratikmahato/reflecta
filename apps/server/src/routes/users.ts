import express, { type RequestHandler } from "express";
import prisma from "../db/client";

const router = express.Router();

router.get("/find", (async (req, res) => {
  const { username } = req.query;
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
  res.json({
    success: true,
    users,
  });
}) as RequestHandler);

export default router;
