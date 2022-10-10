import express from "express";
import dotenv from "dotenv";
import { coffeePostValidation } from "../validation";
import { ValidationError } from "joi";
import authenticate from "../middlewares/authenticate";
import prisma from "../db/client";
import { Prisma } from "@prisma/client";

const router = express.Router();

dotenv.config();

router.post("/", authenticate, async (req, res) => {
  const { coffeeType, content } = req.body;
  const reqUser = req.user;
  try {
    const value = await coffeePostValidation.validateAsync({
      coffeeType,
      content,
    });
    await prisma.user.update({
      where: {
        id: reqUser.id,
      },
      data: {
        moods: {
          create: {
            coffeeType: value.coffeeType,
            content: value.content,
          },
        },
      },
    });
    res.json({
      success: true,
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

router.get("/", authenticate, async (req, res) => {
  const reqUser = req.user;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: reqUser.id,
      },
      select: {
        moods: {
          select: {
            id: true,
            coffeeType: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });
    res.json({
      success: true,
      moods: user.moods.reverse(),
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
});

export default router;
