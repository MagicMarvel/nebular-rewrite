import React from "react";

// 容器，用于展示任意内容，一张半透明白卡片
class index extends React.Component {
  render() {
    return (
      <div className="bg-opacity-80 shadow-lg rounded-xl my-3 hover:shadow-xl transition-all duration-300 p-6 border-2 border-gray-100 bg-white hover:border-gray-200">
        <p>index</p>
      </div>
    );
  }
}
export default index;
