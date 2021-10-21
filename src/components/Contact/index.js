import React from "react";
import HomePopUpCard from "../HomePopUpCard";
export default function Index(props) {
  return (
    <HomePopUpCard handleClose={props.handleClose} title="联系我们">
      <div className="text-gray-400 text-sm">
        这里的消息将会发送至后台，请随意填写
      </div>
      <textarea className=" w-full mx-auto block m-3 text-gray-900 "></textarea>{" "}
      <div className="p-3">
        <button className="w-1/2 md:w-1/4 text-center mx-auto my-0 block bg-blue-500 h-8 shadow-sm text-sm font-medium rounded-sm text-white mb-2">
          发送
        </button>
      </div>
    </HomePopUpCard>
  );
}
