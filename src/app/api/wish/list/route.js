import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

export async function POST(req, res) {
  try {
    let HeaderList = headers();
    let id = parseInt(HeaderList.get("id"));
    let reqBody = await req.json();
    const prisma = new PrismaClient();
    const result = await prisma.product_wishes.create({
      data: { product_id: reqBody["product_id"], user_id: id },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.toString() });
  }
}

export async function GET(req, res) {
  try {
    let HeaderList = headers();
    let id = parseInt(HeaderList.get("id"));

    const prisma = new PrismaClient();
    const result = await prisma.product_wishes.findMany({
      where: { user_id: id },
      include: { products: true },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.toString() });
  }
}

export async function DELETE(req, res) {
  try {
    let HeaderList = headers();
    let id = parseInt(HeaderList.get("id"));
    let reqBody = await req.json();
    const prisma = new PrismaClient();
    const result = await prisma.product_wishes.deleteMany({
      where: {
        AND: [{ product_id: reqBody["product_id"] }, { user_id: id }],
      },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.toString() });
  }
}
