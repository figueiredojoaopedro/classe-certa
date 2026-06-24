import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/src/services/userService";
import { created, badRequest, serverError } from "@/src/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.username || !body.email || !body.password) {
      return badRequest("username, email and password are required");
    }

    if (body.password.length < 6) {
      return badRequest("Password must be at least 6 characters");
    }

    const user = await userService.register({
      username: String(body.username),
      email: String(body.email),
      password: String(body.password),
      phoneNumber: body.phoneNumber ? String(body.phoneNumber) : undefined,
    });

    return created(user);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return serverError(error);
  }
}
