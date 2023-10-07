/* eslint-disable @typescript-eslint/no-misused-promises */
import prisma from "../db/client";
import { Prisma } from "@prisma/client";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { accessToken, isAuthenticated } = request.cookies;
  if (accessToken && isAuthenticated === "true") {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (error: any, decoded: any) => {
        try {
          if (error) {
            response.status(401).json({
              success: false,
              error: error.message,
            });
          }
          const user = await prisma.user.findUniqueOrThrow({
            where: {
              token: decoded.token,
            },
          });
          request.user = user;
          next();
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            response.status(500).json({
              success: false,
              error: error.message,
            });
          } else {
            response.status(401).json({
              success: false,
              error: "Unauthorized",
            });
          }
        }
      },
    );
  } else {
    response.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }
};

export default authenticate;
