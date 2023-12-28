import React from "react";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanity";

// Set up the image URL builder
const builder = imageUrlBuilder(sanityClient as any);

function urlFor(source: any) {
  return builder.image(source);
}

function BlogPost({ post }: { post: BlogPost }) {
  const { title, _createdAt, slug, mainImage } = post;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={urlFor(mainImage.asset).url() || ""}
            alt={title}
          />
        </div>
        <div className="py-8 px-4">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {new Date(_createdAt).toLocaleDateString()}
          </div>
          <Link
            href={`/blog/${slug.current}`}
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {title}
          </Link>
        </div>
        <div className="p-4 flex items-center justify-between">
          <Link
            className="mt-3 bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-2 rounded w-28 text-center"
            href={`/blog/${slug.current}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
