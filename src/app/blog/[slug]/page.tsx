import React from "react";

export default async function BlogPostPage({ params }) {
  const { default: Post, metadata } = await import(
    `@/data/posts/${params.slug}.mdx`
  );

  const typoTheme = `max-w-3xl p-3 prose prose-strong:text-blue-400 prose-hr:border-gray-300
    dark:prose-invert
    dark:prose-headings:text-white
    dark:prose-p:text-white
    dark:prose-h1:text-4xl
    dark:prose-h1:text-blue-500
    dark:prose-h1:decoration-fuchsia-600
    dark:prose-h2:text-3xl
    dark:prose-h3:text-2xl
    dark:prose-h4:text-xl
    dark:prose-h5:text-lg
    dark:prose-h6:text-lg
  `;

  return (
    <div className={typoTheme}>
      <Post />
    </div>
  );
}
