import express from "express";
import dotenv from "dotenv";
import { coffeePatchValidation, coffeePostValidation } from "../validation";
import { ValidationError } from "joi";
import authenticate from "../middlewares/authenticate";
import prisma from "../db/client";
import { Prisma } from "@prisma/client";
import { parseCoffeeType } from "../utils";

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
          where: {
            deletedAt: null,
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

router.get("/test", authenticate, async (req, res) => {
  const resp = await prisma.user.findMany({
    select: {
      moods: true,
    },
  });
  res.json(resp);
});

router.patch("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const value = await coffeePatchValidation.validateAsync({
      content,
    });
    await prisma.mood.update({
      where: {
        id,
      },
      data: {
        content: value.content,
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

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.mood.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
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

export default router;
