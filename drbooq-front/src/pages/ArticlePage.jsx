// src/pages/ArticlePage.jsx - MOBILE OPTIMIZED
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";

export default function ArticlePage() {
  const { id } = useParams();
  const article = blogs.find((b) => b.id === parseInt(id));

  // ✅ Scroll to top on article load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Article not found ❌
      </div>
    );
  }

  return (
    <div className="bg-white font-['Inter','Helvetica Neue',Arial,sans-serif] text-[#333]">
      <div className="w-full max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-10">
        <article className="prose prose-lg max-w-none prose-headings:text-[#003057] prose-headings:font-bold prose-p:text-[1rem] sm:prose-p:text-[1.15rem] prose-p:leading-relaxed prose-li:text-[0.95rem] sm:prose-li:text-[1.1rem] prose-li:leading-relaxed">
          {article.Content ? <article.Content /> : <p>{article.content}</p>}
        </article>
      </div>
    </div>
  );
}
