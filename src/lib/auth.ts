import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const config = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials, _req) {
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        if (!userFound)
          throw new Error("El usuario o la contraseña son incorrectos.");

        const matchPassword = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!matchPassword)
          throw new Error("El usuario o la contraseña son incorrectos.");

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
