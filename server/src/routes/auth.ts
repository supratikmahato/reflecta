import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userRegisterValidation, userLoginValidation } from "../validation";
import prisma from "../db/client";
import { ValidationError } from "joi";
import { Prisma } from "@prisma/client";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  try {
    const value = await userRegisterValidation.validateAsync({
      email,
      username,
      password,
      confirmPassword,
    });
    const saltRounds = 10;
    bcrypt.hash(value.password, saltRounds, async (error, hash) => {
      if (error) {
        res.status(500).json({
          success: false,
        });
      }
      await prisma.user.create({
        data: {
          email: value.email,
          username: value.username,
          password: hash,
        },
      });
      res.json({
        success: true,
      });
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
      console.log(error);
      res.status(500).json({
        success: false,
      });
      throw error;
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const value = await userLoginValidation.validateAsync({
      email,
      password,
    });
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: value.email,
      },
    });
    bcrypt.compare(value.password, user.password, (error, result) => {
      if (error) {
        res.status(500).json({
          success: false,
          error: "Server error",
        });
      } else if (!result) {
        res.status(400).json({
          success: false,
          error: "Wrong password",
        });
      } else {
        const accessToken = jwt.sign(
          { token: user.token },
          process.env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: "60d",
          }
        );
        res
          .cookie("accessToken", accessToken, {
            maxAge: 60 * 60 * 24 * 60 * 1000,
            httpOnly: true,
            ...(process.env.NODE_ENV === "production" && {
              sameSite: "none",
              secure: true,
            }),
          })
          .cookie("isAuthenticated", "true", {
            maxAge: 60 * 60 * 24 * 60 * 1000,
            // ...(process.env.NODE_ENV === "production" && {
            //   sameSite: "none",
            //   secure: true,
            // }),
            sameSite: "none",
            // secure: true,
          })
          .json({
            success: true,
          });
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
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
    } else if (error.name === "NotFoundError") {
      res.status(400).json({
        success: false,
        error: "User not found",
      });
    } else {
      console.error(error.name);
      res.status(500).json({
        success: false,
      });
      throw error;
    }
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken").clearCookie("isAuthenticated").json({
    success: true,
  });
});

router.get("/username", authenticate, async (req, res) => {
  const reqUser = req.user;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: reqUser.id,
      },
      select: {
        username: true,
      },
    });
    res.json({
      success: true,
      username: user.username,
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
