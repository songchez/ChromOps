import React from "react";

export default async function BlogPostPage({ params }) {
  const { default: Post, metadata } = await import(
    `@/data/posts/${params.slug}.mdx`
  );

  return (
    <div className="max-w-3xl p-3 prose prose-headings:mt-8 prose-p:text-white prose-headings:font-semibold prose-headings:text-white prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-lg dark:prose-headings:text-white">
      {metadata.title}
      <Post />
    </div>
  );
}
