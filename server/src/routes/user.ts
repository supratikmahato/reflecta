import express from "express";
import prisma from "../db/client";
import { ValidationError } from "joi";
import { Prisma } from "@prisma/client";
import { parseCoffeeType } from "../utils";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/:username", authenticate, async (req, res) => {
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
    if (error instanceof ValidationError) {
      const errors = error.details.map((detail) => detail.message);
      res.status(400).json({
        success: false,
        error: errors,
      });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
});

export default router;
