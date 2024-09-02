import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      //@ts-ignore
      async authorize(credentials, _req) {

        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials!.email
          }
        });

        if(!userFound) throw new Error("El usuario o la contraseña son incorrectos.")

        const matchPassword = await bcrypt.compare(credentials!.password, userFound.password)

        if(!matchPassword) throw new Error("El usuario o la contraseña son incorrectos.")
        
        return {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
          cellphone: userFound.cellphone,
          role: userFound.role
        }
      },
    })
  ],
  pages: {
    signIn: "/auth/login"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }