import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/client";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    jwt.verify(
      accessToken,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.ACCESS_TOKEN_SECRET!,
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
            res.status(401).json({
              success: false,
              error: error.message,
            });
          }
          res.status(401).json({
            success: false,
            error: "Unauthorized",
          });
        }
      }
    );
  } else {
    res.status(401).json({
      success: false,
      code: 401,
      error: "Unauthorized",
    });
  }
};

export default authenticate;
