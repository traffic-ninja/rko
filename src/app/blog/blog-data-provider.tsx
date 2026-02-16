import { createClient } from "@/lib/supabase/server";
import { BlogClientPage } from "./blog-client-page";
import type { BlogPost } from "@/lib/supabase/types";

export default async function BlogDataProvider() {
  const supabase = await createClient();

  // Получаем все статьи блога
  const { data: blogPosts, error: blogPostsError } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false }); // Сортируем по дате публикации

  if (blogPostsError) {
    console.error("Ошибка при загрузке статей блога:", blogPostsError);
    return <div>Ошибка загрузки статей.</div>;
  }

  return (
    <BlogClientPage initialBlogPosts={blogPosts as BlogPost[] || []} />
  );
}
