import { getInitials } from "@/src/utils/get-initials";
import { timeAgo } from "@/src/utils/time-ago";

type Post = {
  id: number;
  author: string;
  role: string;
  content: string;
  createdAt: string;
};

const posts: Post[] = [
  {
    id: 1,
    author: "Maria Silva",
    role: "Professora de Matemática",
    content:
      "Acabei de finalizar mais um semestre incrível com meus alunos! Ver o brilho nos olhos deles ao entenderem um conceito novo é algo que não tem preço.",
    createdAt: "2026-06-17T14:30:00Z",
  },
  {
    id: 2,
    author: "Colégio Santo Antônio",
    role: "Escola",
    content:
      "Estamos contratando professores de Ciências para o ensino fundamental. Venha fazer parte da nossa equipe! Envie seu currículo para contato@santoantonio.edu.br",
    createdAt: "2026-06-17T10:00:00Z",
  },
  {
    id: 3,
    author: "Carlos Oliveira",
    role: "Professor de História",
    content:
      "Participei hoje de uma palestra sobre metodologias ativas no ensino de História. Muito conteúdo relevante que vou aplicar em sala de aula!",
    createdAt: "2026-06-16T22:00:00Z",
  },
  {
    id: 4,
    author: "Escola Futuro",
    role: "Escola",
    content:
      "Temos 5 vagas abertas para professores de diversas disciplinas. Confira nossas oportunidades no portal de carreiras.",
    createdAt: "2026-06-16T18:00:00Z",
  },
  {
    id: 5,
    author: "Ana Costa",
    role: "Professora de Português",
    content:
      "Dica de leitura para professores: 'Pedagogia da Autonomia', de Paulo Freire. Um clássico que todo educador deveria ler.",
    createdAt: "2026-06-16T14:00:00Z",
  },
  {
    id: 6,
    author: "Instituto Educar",
    role: "Escola",
    content:
      "Acreditamos que a educação transforma vidas. Por isso, investimos constantemente na capacitação dos nossos professores.",
    createdAt: "2026-06-15T20:00:00Z",
  },
];

export function PostFeed() {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {getInitials(post.author)}
            </div>
            <div>
              <p className="text-sm font-semibold">{post.author}</p>
              <p className="text-xs text-muted-foreground">
                {post.role} · {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{post.content}</p>
        </article>
      ))}
    </main>
  );
}
