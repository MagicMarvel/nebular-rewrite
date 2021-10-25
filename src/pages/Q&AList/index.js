import React, { useEffect, useState } from "react";
import Require from "../../utils/Require";
import { Link } from "react-router-dom";
import { GET_QUESTION_LIST } from "../../utils/pathMap";
import { useParams } from "react-router-dom";
import PageNav from "../../components/PageNav";
import UserCard from "../../components/UserCard";
import pureMarkdownToSummary from "../../utils/pureMarkdownToSummary";
import BackgroundCard from "../../components/BackgroundCard";

function QAListItemRender(props) {
    return (
        // 单个的提问卡片，包括了左边的文章summary和右侧的用户
        <div>
            <div
                key={props.item.questionId}
                className="border-b border-gray-600 border-dotted w-full flex justify-between"
            >
                <div className="block lg:w-4/5 flex-grow mr-5">
                    {/* 提问名 */}
                    <Link
                        className="block mt-6 mb-3 pl-5 py-1 bg-gray-300 bg-opacity-10 font-kaiti text-xl 
      text-purple-900 font-medium text-opacity-75 border-l-3 border-indigo-700"
                        to={`/QA/${props?.item.questionId}`}
                    >
                        <div className="transform hover:translate-x-8 hover:text-red-500 duration-500 cursor-pointer">
                            {props.item.title}
                        </div>
                    </Link>
                    <div className="font-kaiti lg:float-left lg:w-full">
                        <div className="text-gray-600 select-none">
                            {pureMarkdownToSummary(
                                props.item.summary === ""
                                    ? ""
                                    : props.item.summary
                            )}
                        </div>
                        {/* 作者 发布时间 */}
                        <div className="mt-2 float-right">
                            <span className="text-gray-400">
                                posted @ {props.item.date}
                            </span>
                            <Link to="#" className="text-gray-400 ml-2">
                                {props.item.author}
                            </Link>
                        </div>
                    </div>
                    {/* 清除发布时间和作者右浮动 */}
                    <div className="clear-both"></div>
                </div>
                {/* 显示用户的小框框 */}
                <div className="hidden lg:block">
                    <UserCard uid={props.uid} />
                </div>
            </div>
        </div>
    );
}

export default function Index(props) {
    const [QAList, setQAList] = useState(undefined);
    const [maxPage, setMaxPage] = useState(0);
    // 向url取得要求访问第几页的articlelist
    const { pageNum } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const res = await Require.get(GET_QUESTION_LIST, {
                params: {
                    page: pageNum,
                    size: 5,
                },
            });
            setQAList(res.data.data.detail);
            setMaxPage(res.data.data.size);
        };
        fetchData();
    }, [pageNum]);
    return (
        <BackgroundCard>
            {QAList !== undefined &&
                QAList.length !== 0 &&
                QAList.map((item) => {
                    return (
                        // 单个的提问卡片，包括了左边的提问summary和右侧的用户
                        <QAListItemRender
                            key={item.questionId}
                            item={item}
                            uid={item.uid}
                        ></QAListItemRender>
                    );
                })}
            {/* 清除浮动带来的大卡片高度不够情况，顺便做一个翻页buttom */}
            <div className="clear-both float-right m-7">
                <PageNav maxPage={maxPage} nowPage={pageNum} type={"QAList"} />
            </div>
            {/*  */}
            <div className="clear-both"></div>
        </BackgroundCard>
    );
}
