import React from "react";
class index extends React.Component {
  render() {
    return (
      // 遮罩背景
      <div className="fixed w-full h-full bg-gray-700 bg-opacity-40 flex items-center justify-center z-50 ">
        {/* 背景里的大白色卡片 */}
        <div className="w-5/6 h-5/6 bg-white rounded-lg p-4">
          {/* 标题 */}
          <div className="border-b-2 h-12 text-xl leading-8 pl-4">
            全部近期文章
          </div>
        </div>
      </div>
    );
  }
}
export default index;
