import React from "react";
import HomePopUpCard from "../HomePopUpCard";

export default function Index(props) {
  return (
    <HomePopUpCard smallCard handleClose={props.handleClose} title="登录">
      <div className="p-3">
        <label htmlFor="usrName" className="w-20 inline-block">
          用户名：
        </label>
        <input className="w-64 text-black" type="text" />
      </div>
      <div className="p-3">
        <label htmlFor="password" className="w-20 inline-block">
          密码：
        </label>
        <input className="w-64 text-black" type="password" />
      </div>
      <div className="p-3">
        <button
          className="float-right bg-blue-500 w-16 font-medium rounded-sm text-white mb-2"
          style={{}}
        >
          ->
        </button>
      </div>
    </HomePopUpCard>
  );
}
