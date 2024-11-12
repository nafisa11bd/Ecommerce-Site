import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let id = parseInt(searchParams.get("id"));
    const prisma = new PrismaClient();
    const result = await prisma.products.findMany({
      where: { category_id: id },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "success", data: e });
  }
}
