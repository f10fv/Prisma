import prisma from "../../../prisma/client";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    let data = await req.json();
    console.log("This the data ", data);
    const name = data.name;
    const newCategory = await prisma.category.create({
      data: data,
    });
    console.log(data);
    return new Response(newCategory, {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function GET(req, res) {
  try {
    const categorys = await prisma.category.findMany();
    return NextResponse.json(categorys);
  } catch (error) {
    console.error("Error fetching categorys:", error);
    return NextResponse.error(error);
  }
}
