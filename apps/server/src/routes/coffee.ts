import express, { type RequestHandler } from "express";
import {
  coffeeIsPublicValidation,
  coffeePatchValidation,
  coffeePostValidation,
} from "validation";
import { ValidationError } from "joi";
import authenticate from "../middlewares/authenticate";
import prisma from "../db/client";
import { Prisma } from "@prisma/client";
import { parseCoffeeType } from "../utils";

const router = express.Router();

router.post("/", authenticate, (async (req, res) => {
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
}) as RequestHandler);

router.get("/", authenticate, (async (req, res) => {
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
            isPublic: true,
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
}) as RequestHandler);

router.patch("/:id", authenticate, (async (req, res) => {
  const { id } = req.params;
  const { content, isPublic } = req.body;
  try {
    if ((content !== undefined || null) && (isPublic === undefined || null)) {
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
    } else if (
      (isPublic !== undefined || null) &&
      (content === undefined || null)
    ) {
      const value = await coffeeIsPublicValidation.validateAsync({
        isPublic,
      });
      await prisma.mood.update({
        where: {
          id,
        },
        data: {
          isPublic: value.isPublic,
        },
      });
      res.json({
        success: true,
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Invalid request",
      });
    }
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
}) as RequestHandler);

router.delete("/:id", authenticate, (async (req, res) => {
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
}) as RequestHandler);

export default router;
