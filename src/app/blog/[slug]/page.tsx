import React from "react";

export default async function BlogPostPage({ params }) {
  const { default: Post, metadata } = await import(
    `@/data/posts/${params.slug}.mdx`
  );

  const typoTheme = `max-w-3xl p-3 prose 
    prose-strong:text-blue-400 
    prose-hr:border-gray-300
    prose-invert
    prose-headings:text-white
    prose-p:text-white
    prose-h1:text-4xl
    prose-h1:text-blue-500
    prose-h1:decoration-fuchsia-600
    prose-h2:text-3xl
    prose-h3:text-2xl
    prose-h4:text-xl
    prose-h5:text-lg
    prose-h6:text-lg
  `;

  return (
    <div className={typoTheme}>
      <Post />
    </div>
  );
}
