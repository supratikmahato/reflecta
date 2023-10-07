import prisma from "../db/client";
import authenticate from "../middlewares/authenticate";
import { parseCoffeeType } from "../utils";
import { Prisma } from "@prisma/client";
import express, { type RequestHandler } from "express";
import {
  coffeeIsPublicValidation,
  coffeePatchValidation,
  coffeePostValidation,
} from "validation";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const router = express.Router();

router.post("/", authenticate, (async (request, response) => {
  const { coffeeType, content } = request.body;
  const requestUser = request.user;
  try {
    const value = await coffeePostValidation.parseAsync({
      coffeeType,
      content,
    });
    await prisma.user.update({
      where: {
        id: requestUser.id,
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
    response.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({
        success: false,
        error: fromZodError(error),
      });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      response.status(500).json({
        success: false,
      });
      throw error;
    }
  }
}) as RequestHandler);

router.get("/", authenticate, (async (request, response) => {
  const requestUser = request.user;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: requestUser.id,
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
            isEdited: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    response.json({
      success: true,
      moods: parseCoffeeType(user.moods),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      response.status(500).json({
        success: false,
      });
      throw error;
    }
  }
}) as RequestHandler);

router.patch("/:id", authenticate, (async (request, response) => {
  const { id } = request.params;
  const { content, isPublic } = request.body;
  try {
    if ((content !== undefined || null) && (isPublic === undefined || null)) {
      const value = await coffeePatchValidation.parseAsync({
        content,
      });
      await prisma.mood.update({
        where: {
          id,
        },
        data: {
          content: value.content,
          isEdited: true,
        },
      });
      response.json({
        success: true,
      });
    } else if (
      (isPublic !== undefined || null) &&
      (content === undefined || null)
    ) {
      const value = await coffeeIsPublicValidation.parseAsync({
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
      response.json({
        success: true,
      });
    } else {
      response.status(400).json({
        success: false,
        error: "Invalid request",
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({
        success: false,
        error: fromZodError(error),
      });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      response.status(500).json({
        success: false,
      });
      throw error;
    }
  }
}) as RequestHandler);

router.delete("/:id", authenticate, (async (request, response) => {
  const { id } = request.params;
  try {
    await prisma.mood.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    response.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      response.status(500).json({
        success: false,
      });
      throw error;
    }
  }
}) as RequestHandler);

export default router;
