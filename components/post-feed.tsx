import { postService } from "@/src/services/postService";
import { getInitials } from "@/src/utils/get-initials";
import { timeAgo } from "@/src/utils/time-ago";

export async function PostFeed() {
  const { data: posts } = await postService.getAllPosts();

  return (
    <main className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6">
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Nenhum post ainda. Seja o primeiro a publicar!
        </p>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {getInitials(`User ${post.authorId}`)}
              </div>
              <div>
                <p className="text-sm font-semibold">User {post.authorId}</p>
                <p className="text-xs text-muted-foreground">
                  {timeAgo(post.createdAt)}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{post.content}</p>
          </article>
        ))
      )}
    </main>
  );
}
