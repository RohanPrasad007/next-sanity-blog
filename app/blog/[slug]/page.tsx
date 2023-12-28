"use client";
import sanityClient from "../../../sanity";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";

// Set up the image URL builder
const builder = imageUrlBuilder(sanityClient as any);

function urlFor(source: any) {
  const url = builder.image(source);
  return url;
}

const serializers = {
  types: {
    block: ({ node, children }: BlockProps) => {
      switch (node.style) {
        case "h1":
          return <h1 className="text-4xl font-bold my-4">{children}</h1>;
        case "h2":
          return <h2 className="text-3xl font-bold my-3">{children}</h2>;
        case "h3":
          return <h3 className="text-2xl font-bold my-2">{children}</h3>;
        case "h4":
          return <h4 className="text-xl font-bold my-2">{children}</h4>;
        case "blockquote":
          return (
            <blockquote className="pl-4 italic border-l-4 my-2">
              {children}
            </blockquote>
          );
        default:
          return <p className="text-base my-2">{children}</p>;
      }
    },
    image: ({ node }: BlockProps) => (
      <figure className="flex flex-col items-center my-4">
        <img src={node.asset?.url} alt={node.alt} className="w-full h-auto" />
        {node.caption && (
          <figcaption className="text-sm mt-2">{node.caption}</figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    strong: ({ children }: MarkProps) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: MarkProps) => <em className="italic">{children}</em>,
    link: ({ children, mark }: MarkProps) => (
      <a
        href={mark.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: ({ type, children }: { type: string; children: React.ReactNode }) => {
    switch (type) {
      case "bullet":
        return <ul className="list-disc list-inside my-4 pl-5">{children}</ul>;
      default:
        return <ul className="list-disc list-inside my-4 pl-5">{children}</ul>;
    }
  },
  listItem: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-2">{children}</li>
  ),
};

export default function Page({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<BlogPost>();

  useEffect(() => {
    const getBlogPost = async () => {
      try {
        const posts = await sanityClient.fetch(
          `*[slug.current == "${params.slug}"]`
        );
        setBlog(posts[0]);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    getBlogPost();
  }, []);

  return blog ? (
    <div className="p-4 w-[90%] mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">{blog.title}</h1>
      <img
        src={urlFor(blog.mainImage.asset).url() || ""}
        alt={blog.title}
        className="w-1/2 mb-4 text-center mx-auto"
      />
      <p className="text-gray-500 mb-4">
        {new Date(blog._createdAt).toLocaleDateString()}
      </p>
      <div>
        <BlockContent blocks={blog.body} serializers={serializers} />
      </div>
    </div>
  ) : null;
}
