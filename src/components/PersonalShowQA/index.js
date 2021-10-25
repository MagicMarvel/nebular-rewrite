import React, { useState, useEffect, useRef } from "react";
import Require from "../../utils/Require";
import { GET_QUESTION_LIST_BY_CURRENCY_USER } from "../../utils/pathMap";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

function QAItem(props) {
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <div
            className="w-full h-52 border-solid border border-blue-200 my-4 rounded-lg 
           flex flex-col items-center justify-center transition-all duration-150
          bg-white bg-opacity-50 text-2xl font-serif hover:shadow-lg group"
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            <Link
                className=" group-hover:tracking-widest transform 
           transition-all duration-150 tracking-wide select-none font-kaiti"
                to={`/QA/${props.questionId}`}
            >
                {props.title}
            </Link>
            <CSSTransition classNames="Slide" timeout={100} in={mouseOver}>
                <div className="text-sm flex felx-row justify-center font-kaiti"></div>
            </CSSTransition>
        </div>
    );
}

export default function QAList(props) {
    const [QAList, setQAList] = useState(undefined);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(undefined);
    const pageRef = useRef(null);
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const res = await Require.get(GET_QUESTION_LIST_BY_CURRENCY_USER, {
                params: {
                    page: page,
                    size: 4,
                },
            });
            if (res.data.code === 1) {
                setQAList(res.data.data.detail);
                setMaxPage(res.data.data.size);
                pageRef.current.value = page;
            } else {
            }
        };
        fetch();
    }, [page, reRender]);

    useEffect(() => {
        setReRender(props.reRender);
    }, [props.reRender]);

    return (
        <div className="min-h-screen flex-grow ml-8">
            {/* 添加文章 */}
            <div
                className="w-full h-52 border-dashed border-2 my-4 flex justify-center items-center group
         hover:bg-white hover:bg-opacity-50 hover:shadow-lg transition-all duration-200 rounded-lg cursor-pointer"
                onClick={props.showEditorForQA}
            >
                <svg
                    t="1633573403433"
                    className="fill-current text-gray-600 group-hover:animate-pulse"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1957"
                    width="200"
                    height="200"
                >
                    <path
                        d="M512 512V170.666667h42.666667v341.333333h341.333333v42.666667h-341.333333v341.333333h-42.666667v-341.333333H170.666667v-42.666667h341.333333z"
                        p-id="1958"
                    ></path>
                </svg>
            </div>
            {QAList !== undefined && (
                <div className="">
                    {/* 列表渲染 */}
                    {QAList.map((item) => {
                        return (
                            <div key={item.articleId}>
                                <QAItem {...item} />
                            </div>
                        );
                    })}
                    {/* 翻页按钮 */}
                    <div className="flex flex-row justify-end ">
                        {/* 上一页 */}
                        <div
                            className="border border-gray-600 w-8 h-6 mx-1 flex justify-center items-center rounded cursor-pointer
                bg-white bg-opacity-70 hover:shadow-xl hover:bg-blue-300 select-none 
                transition-all duration-150"
                            onClick={() => {
                                if (page - 1 >= 1)
                                    setPage(() => {
                                        return page - 1;
                                    });
                            }}
                        >
                            <div className="">{"<"}</div>
                        </div>
                        {/* 当前页 */}
                        <input
                            ref={pageRef}
                            className=" bg-opacity-0 w-6 h-6 flex justify-center items-center text-center"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    if (e.target.value <= maxPage)
                                        setPage(e.target.value);
                                }
                            }}
                        />
                        {/* 最大页 */}
                        <div className="  w-6 h-6  flex justify-center items-center">
                            /{maxPage}
                        </div>
                        {/* 下一页 */}
                        <div
                            className="border border-gray-600 w-8 h-6 mx-1 flex justify-center items-center rounded 
                cursor-pointer bg-white bg-opacity-70 hover:shadow-xl hover:bg-blue-300 select-none 
                transition-all duration-150"
                            onClick={() => {
                                if (page + 1 <= maxPage)
                                    setPage(() => {
                                        return page + 1;
                                    });
                            }}
                        >
                            <div className="">{">"}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
