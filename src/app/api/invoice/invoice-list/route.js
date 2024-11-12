import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    let HeaderList = headers();
    let id = parseInt(HeaderList.get("id"));

    const prisma = new PrismaClient();
    const result = await prisma.invoices.findMany({
      where: { user_id: id },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
