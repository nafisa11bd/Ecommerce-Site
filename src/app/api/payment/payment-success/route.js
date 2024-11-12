import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let tran_id = searchParams.get("tran_id");
    const prisma = new PrismaClient();
    const result = await prisma.invoices.updateMany({
      where: { AND: [{ tran_id: tran_id }] },
      data: { payment_status: "success" },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.toString() });
  }
}
