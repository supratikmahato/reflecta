/* eslint-disable @typescript-eslint/no-misused-promises */
import { Prisma } from "@prisma/client";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/client";

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { accessToken, isAuthenticated } = req.cookies;
  if (accessToken && isAuthenticated === "true") {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (error: any, decoded: any) => {
        try {
          if (error) {
            res.status(401).json({
              success: false,
              error: error.message,
            });
          }
          const user = await prisma.user.findUniqueOrThrow({
            where: {
              token: decoded.token,
            },
          });
          req.user = user;
          next();
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
              success: false,
              error: error.message,
            });
          } else {
            res.status(401).json({
              success: false,
              error: "Unauthorized",
            });
          }
        }
      }
    );
  } else {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }
};

export default authenticate;
