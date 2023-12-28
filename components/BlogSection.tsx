"use client";
import React, { useEffect, useState } from "react";
import sanityClient from "../sanity";
import BlogPost from "./BlogPost";

function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    async function getBlogPosts() {
      try {
        const posts = await sanityClient.fetch('*[_type == "post"]');
        setBlogPosts(posts);
      } catch (err) {
        console.error("Error:", err);
      }
    }
    getBlogPosts();
  }, []);

  return (
    <div className="p-4">
      {blogPosts.map((post, index) => (
        <div key={index} className="p-4 border-b">
          <BlogPost key={index} post={post} />
        </div>
      ))}
    </div>
  );
}

export default BlogSection;
