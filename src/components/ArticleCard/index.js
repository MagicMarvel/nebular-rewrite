import React from "react";
class index extends React.Component {
  render() {
    const { article } = this.props;
    console.log(article);
    return (
      <>
        {/* 外面的大卡片 */}
        <div className="shadow-lg rounded-xl my-3 hover:shadow-xl transition-all duration-300 p-6 border-2 border-gray-100	hover:border-gray-200">
          {/* 文章名 */}
          <div className="font-kaiti text-2xl  font-medium ">
            {article.title}
          </div>
          {/* 文章发布时间 */}
          <div className="font-kaiti pb-2 pt-1.5 pl-4">{article.date}</div>
          {/* 文章内容 */}
          <div className="font-kaiti text-gray-600">{article.summary}</div>
        </div>
      </>
    );
  }
}
export default index;
