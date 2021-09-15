import React from "react";
import HomePopUpCard from "../HomePopUpCard";

export default function Index(props) {
  return (
    <HomePopUpCard smallCard handleClose={props.handleClose} title="登录">
      <div className="p-3">
        <label htmlFor="usrName" className="w-20 inline-block">
          用户名：
        </label>
        <input className=" w-48 lg:w-64 text-black" type="text" />
      </div>
      <div className="p-3">
        <label htmlFor="password" className="w-20 inline-block">
          密码：
        </label>
        <input className="w-48 lg:w-64 text-black" type="password" />
      </div>
      <div className="p-3">
        <button className="w-1/2 text-center mx-auto my-0 block bg-blue-500 h-8 shadow-sm text-sm font-medium rounded-sm text-white mb-2">
          登入
        </button>
      </div>
    </HomePopUpCard>
  );
}
