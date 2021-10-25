import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavPageBlock = styled(Link)`
    :hover {
        transform: scale(1.2) translateY(-2.5px);
    }
    text-decoration: none;
    border: 1px solid;
    margin: 0px 5px 0px 5px;
    width: 1.75rem;
    height: 1.75rem;
    line-height: 1.75rem;
    text-shadow: 0 0 1px #fff;
    opacity: 1;
    box-sizing: border-box;
    background-color: rgba(50, 83, ff, 1);
    text-align: center;
    border-radius: 2px;
    transition: all 0.2s;
`;

// 分页按钮
class Index extends React.Component {
    makeUrl = (toPage) => {
        const { type } = this.props;
        if (type === "articleList") return `/articleList/${toPage}`;
        if (type === "QAList") return `/QAList/${toPage}`;
    };
    render() {
        const { maxPage, nowPage } = this.props;
        return (
            <div className="select-none">
                {/* 如果用户要求访问比最大页数还要多的页面，不显示该分页按钮，只有一页的也不显示*/}
                {nowPage <= maxPage && maxPage >= 2 && (
                    <div
                        style={{
                            marginTop: "23px",
                            display: "flex",
                        }}
                    >
                        <NavPageBlock
                            to={() => this.makeUrl(nowPage - 0 - 1)}
                            style={{
                                pointerEvents: `${
                                    nowPage > 1 ? "auto" : " none"
                                }`,
                            }}
                        >
                            {"<"}
                        </NavPageBlock>
                        {nowPage - 0 - 3 >= 1 && (
                            <NavPageBlock
                                to={() => this.makeUrl(nowPage - 0 - 3)}
                            >
                                {nowPage - 0 - 3}
                            </NavPageBlock>
                        )}
                        {nowPage - 0 - 2 >= 1 && (
                            <NavPageBlock
                                to={() => this.makeUrl(nowPage - 0 - 2)}
                            >
                                {nowPage - 0 - 2}
                            </NavPageBlock>
                        )}
                        {nowPage - 0 - 1 >= 1 && (
                            <NavPageBlock
                                to={() => this.makeUrl(nowPage - 0 - 1)}
                            >
                                {nowPage - 0 - 1}
                            </NavPageBlock>
                        )}
                        {
                            <NavPageBlock
                                to={() => this.makeUrl(nowPage - 0)}
                                style={{
                                    backgroundColor: "#127594",
                                    color: "white",
                                }}
                            >
                                {nowPage - 0}
                            </NavPageBlock>
                        }
                        {nowPage - 0 + 1 <= maxPage && (
                            <NavPageBlock
                                to={() => this.makeUrl(nowPage - 0 + 1)}
                            >
                                {nowPage - 0 + 1}
                            </NavPageBlock>
                        )}
                        {nowPage - 0 + 2 <= maxPage && (
                            <NavPageBlock
                                to={() => this.makeUrl(nowPage - 0 + 2)}
                            >
                                {nowPage - 0 + 2}
                            </NavPageBlock>
                        )}
                        <NavPageBlock
                            to={() => this.makeUrl(nowPage - 0 + 1)}
                            style={{
                                pointerEvents: `${
                                    nowPage <= maxPage - 1 ? "auto" : "none"
                                }`,
                            }}
                        >
                            {">"}
                        </NavPageBlock>
                    </div>
                )}
            </div>
        );
    }
}

export default Index;
