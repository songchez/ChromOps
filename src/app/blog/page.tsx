import Link from "next/link";
import path from "path";
import React from "react";
import fs from "fs";

interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  content: string;
}

export default async function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "src/data/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts: Post[] = await Promise.all(
    filenames.map(async (filename) => {
      const post = await import(`@/data/posts/${filename}`);
      const { content, metadata } = post;

      return {
        slug: filename.replace(".mdx", ""),
        title: metadata.title,
        date: metadata.date,
        tag: metadata.tag,
        content: content,
      };
    })
  );

  return (
    <div className="p-6">
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-white hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-600">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
