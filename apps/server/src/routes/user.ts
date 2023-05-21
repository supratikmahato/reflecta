import prisma from "../db/client";
import authenticate from "../middlewares/authenticate";
import { parseCoffeeType } from "../utils";
import { Prisma } from "@prisma/client";
import express, { type RequestHandler } from "express";

const router = express.Router();

router.get("/:username", authenticate, (async (req, res) => {
  const { username } = req.params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
      select: {
        moods: {
          where: {
            deletedAt: null,
            isPublic: true,
          },
          select: {
            id: true,
            coffeeType: true,
            content: true,
            createdAt: true,
            isEdited: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    res.json({
      success: true,
      moods: parseCoffeeType(user.moods),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
      });
      throw error;
    }
  }
}) as RequestHandler);

router.get("/search", (async (req, res) => {
  const { username } = req.query;
  const users = await prisma.user.findMany({
    where: {
      username: {
        search: username as string,
      },
    },
    select: {
      id: true,
      username: true,
    },
  });
  res.json(users);
}) as RequestHandler);

export default router;
