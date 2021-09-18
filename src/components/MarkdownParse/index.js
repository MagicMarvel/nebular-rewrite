import React from "react";
// 用于将markdown格式渲染成html https://github.com/remarkjs/react-markdown
import ReactMarkdown from "react-markdown";
// 为上面的渲染增加增强插件 https://github.com/remarkjs/remark-gfm
import remarkGfm from "remark-gfm";
// 为上面的渲染增加代码高亮组件 https://github.com/react-syntax-highlighter/react-syntax-highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
// 提供数学公式渲染功能
// use a syntax extension (through remark-math) is used to support math in markdown,
// and a transform plugin (rehype-katex) to render that math.
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// 提供目录功能
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

export default function Index(props) {
  return (
    <ReactMarkdown
      children={props.markdown}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeSlug, rehypeToc]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={prism}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        h1: ({ node, ...props }) => (
          <h1
            className="text-gray-500 font-kaiti text-3xl leading-normal border-b border-gray-600"
            {...props}
          >
            {props.children}
          </h1>
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-gray-500 font-kaiti text-2xl my-4" {...props}>
            {props.children}
          </h2>
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-gray-500 font-kaiti text-xl" {...props}>
            {props.children}
          </h3>
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-gray-500 font-kaiti text-lg" {...props}>
            {props.children}
          </h4>
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-gray-500 font-kaiti text-base" {...props}>
            {props.children}
          </h5>
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-gray-500 font-kaiti text-base" {...props}>
            {props.children}
          </h6>
        ),
        p: ({ node, ...props }) => (
          <p
            className="text-gray-500 font-kaiti text-sm mt-4 break-words leading-relaxed"
            {...props}
          >
            {props.children}
          </p>
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-gray-600 border-l-3 border-t border-b pb-4 pl-5"
            {...props}
          >
            {props.children}
          </blockquote>
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-400 " {...props}>
            {props.children}
          </a>
        ),
        li: ({ node, ...props }) => (
          <li className="leading-normal text-gray-500" {...props}>
            {props.children}
          </li>
        ),
        ul: ({ node, ...props }) => (
          <ul className="ml-5 list-outside list-disc" {...props}>
            {props.children}
          </ul>
        ),
        ol: ({ node, ...props }) => (
          <ol className="ml-5 list-outside list-decimal" {...props}>
            {props.children}
          </ol>
        ),
      }}
    />
  );
}
