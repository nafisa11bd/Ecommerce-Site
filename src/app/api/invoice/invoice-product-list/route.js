import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    let HeaderList = headers();
    let id = parseInt(HeaderList.get("id"));
    const prisma = new PrismaClient();
    const reqBody = await req.json();

    const result = await prisma.invoice_products.findMany({
      where: { AND: [{ invoice_id: reqBody["invoice_id"] }, { user_id: id }] },
      include: { products: true },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
