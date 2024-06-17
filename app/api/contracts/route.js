import prisma from "../../../prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    let data = await req.json();
    console.log("This the data ", data);
    const startDate = data.startDate;
    const endDate = data.endDate;
    const salary = data.salary;
    const userId = parseInt(data.userId);
    const newContract = await prisma.contract.create({
      data: {
        startDate: startDate,
        endDate: endDate,
        salary: salary,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return NextResponse.json(newContract);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function GET(req, res) {
  try {
    const contracts = await prisma.contract.findMany({
      include: {
        user: true,
      },
    });
    return NextResponse.json(contracts);
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return NextResponse.error(error);
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    const contract = await prisma.contract.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(contract, { status: 200 });
  } catch (error) {
    console.log("Error deleting contract:", error);
  }
}