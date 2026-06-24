import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/src/services/userService";
import { badRequest, serverError } from "@/src/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.identifier || !body.password) {
      return badRequest("identifier and password are required");
    }

    const user = await userService.login(
      String(body.identifier),
      String(body.password),
    );

    const response = NextResponse.json({ data: user }, { status: 200 });

    response.cookies.set("session", user.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid credentials") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    return serverError(error);
  }
}
