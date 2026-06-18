import { NextRequest, NextResponse } from "next/server";
import { postService } from "@/src/services/postService";
import {
  created,
  badRequest,
  serverError,
} from "@/src/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 10));

    const result = await postService.getAllPosts(page, limit);

    return NextResponse.json({
      data: result.data,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.authorId || !body.content) {
      return badRequest("authorId and content are required");
    }

    const post = await postService.createPost({
      authorId: Number(body.authorId),
      content: String(body.content),
    });

    return created(post);
  } catch (error) {
    return serverError(error);
  }
}
