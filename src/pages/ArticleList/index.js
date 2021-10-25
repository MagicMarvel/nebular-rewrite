import React, { useEffect, useState } from "react";
import Require from "../../utils/Require";
import { Link } from "react-router-dom";
import { GET_ARTICLE_LIST } from "../../utils/pathMap";
import { useParams } from "react-router-dom";
import PageNav from "../../components/PageNav";
import pureMarkdownToSummary from "../../utils/pureMarkdownToSummary";
import UserCard from "../../components/UserCard";
import BackgroundCard from "../../components/BackgroundCard";

export default function Index(props) {
    const [articleList, setArticleList] = useState(undefined);
    const [maxPage, setMaxPage] = useState(0);
    // 向url取得要求访问第几页的articlelist
    const { pageNum } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const res = await Require.get(GET_ARTICLE_LIST, {
                params: {
                    page: pageNum,
                    size: 5,
                },
            });
            setArticleList(res.data.data.detail);
            setMaxPage(res.data.data.size);
        };
        fetchData();
    }, [pageNum]);
    return (
        <>
            <BackgroundCard>
                {articleList !== undefined &&
                    articleList.map((item) => {
                        return (
                            // 单个的文章卡片，包括了左边的文章summary和右侧的用户
                            <div key={item.articleId}>
                                {/* 左侧的文章summary */}
                                <div className="border-b border-gray-600 border-dotted pb-2 flex flex-row w-full">
                                    <div className="inline-block flex-grow mr-5">
                                        {/* 文章名 */}
                                        <div
                                            className="mt-6 mb-3 pl-5 py-1 bg-gray-300 bg-opacity-10 font-kaiti text-xl 
    text-purple-900 font-medium text-opacity-75 border-l-3 border-indigo-700 
      "
                                        >
                                            <Link
                                                to={`/article/${item.articleId}`}
                                                className="block transform hover:translate-x-8 hover:text-red-500 duration-500 cursor-pointer"
                                            >
                                                {item.title}
                                            </Link>
                                        </div>
                                        {/* 文章 summary */}
                                        <div className="font-kaiti ">
                                            <div className="text-gray-600 select-none break-all">
                                                {pureMarkdownToSummary(
                                                    item.summary
                                                )}
                                                <Link
                                                    to={`/article/${item.articleId}`}
                                                    className="text-purple-600 ml-2 break-words"
                                                >
                                                    ....阅读更多
                                                </Link>
                                            </div>
                                            {/* 作者 发布时间 */}
                                            <div className="mt-2 float-right">
                                                <span className="text-gray-400">
                                                    posted @ {item.date}
                                                </span>
                                                <Link
                                                    to="#"
                                                    className="text-gray-400 ml-2"
                                                >
                                                    {item.author}
                                                </Link>
                                            </div>
                                            <div className="clear-both"></div>
                                        </div>
                                    </div>
                                    {/* 用户头像和信息卡片 */}
                                    <div className="">
                                        <div className="hidden lg:block">
                                            {" "}
                                            <UserCard uid={item.uid} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                {/* 清除浮动带来的大卡片高度不够情况，顺便做一个翻页buttom */}
                <div className="clear-both float-right m-7">
                    <PageNav
                        maxPage={maxPage}
                        nowPage={pageNum}
                        type={"articleList"}
                    />
                </div>
                {/*  */}
                <div className="clear-both"></div>
            </BackgroundCard>
        </>
    );
}
