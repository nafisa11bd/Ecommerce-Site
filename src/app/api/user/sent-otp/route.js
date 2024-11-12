import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SendEmail } from "@/utility/EmailUtility";
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let email = searchParams.get("email");

    let code = Math.floor(100000 + Math.random() * 900000).toString();
    let EmailText = `Your OTP Code is=${code}`;
    let EmailSubject = "Next Ecommerce Verification Code";
    await SendEmail(email, EmailText, EmailSubject);

    const result = await prisma.users.upsert({
      where: { email: email },
      update: { otp: code },
      create: { email: email, otp: code },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
