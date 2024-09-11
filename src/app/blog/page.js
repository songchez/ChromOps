import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "src/data/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
    };
  });

  return (
    <div className="p-6">
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-500 hover:underline"
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
