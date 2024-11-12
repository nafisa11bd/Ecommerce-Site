import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let type = searchParams.get("type");
    const prisma = new PrismaClient();
    const result = await prisma.policies.findMany({
      where: { type: type },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "success", data: e });
  }
}
