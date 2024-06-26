import prisma from "../../../prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
