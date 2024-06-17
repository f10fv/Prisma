import prisma from "../../../prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req, res) {
  try {
    let data = await req.json();
    const name = data.name;
    const email = data.email;
    const category = data.category;
    const password = data.password;
    const jobTitle = data.jobTitle;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        jobTitle: jobTitle,
        category: {
          connect: {
            id: parseInt(category),
          },
        },
      },
    });
    return new Response(newUser, {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
  }
}
export async function GET(req, res) {
  try {
    const users = await prisma.user.findMany({
      include: {
        category: true,
        contracts: true,
      },
    });
    console.log("The users are:", users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error(error);
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        contracts: true,
      },
    });
    console.log(user);
    if (user.contracts.length > 0) {
      return NextResponse.json(
        { message: "User has active contracts" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error deleting user:", error);
  }
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
}
