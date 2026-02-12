import { BlogPageClient } from "@/components/blog/blog-page-client";
import { getBlogPosts } from "@/lib/repositories/blog";

export const revalidate = 86400;

export default async function BlogPage() {
	const posts = await getBlogPosts();

	return <BlogPageClient posts={posts} />;
}
