import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const emailFound = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if(emailFound) return NextResponse.json(
      { 
        title: "Email",
        message: "El email ya esta en uso."
      },
      { status: 409 }
    )

    const usernameFound = await prisma.user.findUnique({
      where: {
        username: data.username
      }
    })

    if(usernameFound) return NextResponse.json(
      { 
        title: "Nombre de usuario",
        message: "El nombre de usuario ya esta en uso."
      },
      { status: 409 }
    )

    const cellphoneFound = await prisma.user.findUnique({
      where: {
        cellphone: data.cellphone
      }
    })

    if(cellphoneFound) return NextResponse.json(
      { 
        title: "Teléfono",
        message: "El número de teléfono ya esta en uso."
      },
      { status: 409 }
    )

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        cellphone: data.cellphone
      }
    })

    const { password: _, ...user } = newUser

    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Tuvimos un problema, inténtalo más tarde." },
      { status: error?.status ?? 500 }
    )
  }
}