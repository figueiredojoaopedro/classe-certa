import { NextRequest } from "next/server";
import { postService } from "@/src/services/postService";
import {
  success,
  badRequest,
  notFound,
  serverError,
} from "@/src/lib/api-response";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const post = await postService.getPost(Number(id));

    if (!post) return notFound("Post not found");

    return success(post);
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.content) {
      return badRequest("content is required");
    }

    const post = await postService.updatePost(Number(id), {
      content: String(body.content),
    });

    if (!post) return notFound("Post not found");

    return success(post);
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const post = await postService.deletePost(Number(id));

    if (!post) return notFound("Post not found");

    return success(post);
  } catch (error) {
    return serverError(error);
  }
}
