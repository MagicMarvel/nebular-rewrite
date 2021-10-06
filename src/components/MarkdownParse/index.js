// markdown渲染器
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/pathMap";

// 用于将markdown格式渲染成html https://github.com/remarkjs/react-markdown
import ReactMarkdown from "react-markdown";
// 为上面的渲染增加增强插件 https://github.com/remarkjs/remark-gfm
import remarkGfm from "remark-gfm";
// 为上面的渲染增加代码高亮组件 https://github.com/react-syntax-highlighter/react-syntax-highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
// 提供数学公式渲染功能
// use a syntax extension (through remark-math) is used to support math in markdown,
// and a transform plugin (rehype-katex) to render that math.
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// 提供目录功能
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

// 渲染图片链接 https://github.com/Pondorasti/remark-img-links
import remarkImgLinks from "@pondorasti/remark-img-links";

const s = `
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
| - | :- |sd -: | :-:sdf |
| - | :- |sd -: | :-:sdf |
| - | :- |sd -: | :-:sdf |

 a | b  |  c |  d  
 - | :- | -: | :-: 
 - | :- |sd -: | :-:sdf 

## Tasklist

* [ ] to do
* [x] done
`;

// 为了目录的绝对定位，上一层组件需要设置为relative
// 输入：markdown，传入noTOC可以不渲染TOC，传入h1NoLine可关闭h1标签下面的横线
// TODO:增强目录的效果
export default function Index(props) {
  const { h1NoLine } = props;
  return (
    <div className="relative">
      <ReactMarkdown
        className="w-full text-gray-500"
        // 删去toc字符串
        children={props.markdown.replace("[toc]", "").replace("[TOC]", "")}
        // children={s}
        remarkPlugins={[
          remarkMath,
          [remarkImgLinks, { absolutePath: BASE_URL }],
          remarkGfm,
        ]}
        rehypePlugins={[
          rehypeKatex,
          rehypeSlug,
          [
            rehypeToc,
            {
              headings: ["h1", "h2", "h3"],
              cssClasses: {
                toc: `hidden md:${
                  props.noTOC === undefined ? "block" : "hidden"
                } bg-toc rounded px-3 m-3`, // Change the CSS class for the TOC
                link: "visited:text-yellow-300 text-toc-text font-kaiti list-disc", // Change the CSS class for links in the TOC
                listItem: "ml-3 text-toc-text",
              },
            },
          ],
        ]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                className="rounded opacity-90"
                children={String(children).replace(/\n$/, "")}
                style={materialOceanic}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code
                className={`${className} inline-block font-kaiti text-sm lg:text-base text-gray-500 rounded bg-gray-400 bg-opacity-30 px-1.5`}
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }) => {
            return (
              <h1
                className={`text-gray-500 font-kaiti text-3xl leading-normal ${
                  h1NoLine === undefined ? "border-b" : ""
                }  border-gray-600 md:pr-1/4 `}
                {...props}
              >
                {props.children}
              </h1>
            );
          },
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
              className="text-gray-500 font-kaiti text-sm lg:text-base mt-4 break-words leading-relaxed"
              {...props}
            >
              {props.children}
            </p>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="font-kaiti border-gray-600 border-l-3 border-t border-b pb-4 pl-5 my-1"
              {...props}
            >
              {props.children}
            </blockquote>
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-400 font-kaiti" {...props}>
              {props.children}
            </a>
          ),
          li: ({ node, ordered, ...props }) => (
            <li
              className={`font-kaiti leading-normal text-gray-500 my-1 text-sm lg:text-base ${
                ordered === true ? "list-decimal" : "list-disc"
              }`}
              {...props}
            >
              {props.children}
            </li>
          ),
          ul: ({ node, ordered, ...props }) => (
            <ul
              className="font-kaiti ml-5 mt-4 list-outside list-disc"
              {...props}
            >
              {props.children}
            </ul>
          ),
          ol: ({ node, ordered, ...props }) => (
            <ol
              className="font-kaiti ml-5 mt-4 list-outside list-decimal"
              {...props}
            >
              {props.children}
            </ol>
          ),
          table: ({ node, ...props }) => (
            <table className="border-collapse text-gray-700" {...props}>
              {props.children}
            </table>
          ),
          td: ({ node, isHeader, ...props }) => (
            <td className="border border-gray-500 " {...props}>
              {props.children}
            </td>
          ),
          th: ({ node, isHeader, ...props }) => (
            <th
              className="border border-gray-500 bg-green-500 text-gray-800 bg-opacity-80"
              {...props}
            >
              {props.children}
            </th>
          ),
          tr: ({ node, isHeader, ...props }) => (
            <tr {...props}>{props.children}</tr>
          ),
        }}
      />
    </div>
  );
}
