import React from "react";
import HomePopUpCard from "../HomePopUpCard";

export default function index(props) {
  return (
    <HomePopUpCard smallCard handleClose={props.handleClose} title="注册">
      <div className="p-3">
        <lable htmlFor="usrName" className="w-20 inline-block">
          用户名：
        </lable>
        <input
          type="text"
          name="usrName"
          placeholder="登录的用户名"
          className="w-48 lg:w-64 text-black placeholder-gray-400"
        />
      </div>
      <div className="p-3">
        <lable htmlFor="password" className="w-20 inline-block">
          密码：
        </lable>
        <input
          type="password"
          name="password"
          className="w-48 lg:w-64 text-black"
        />
      </div>
      <div className="p-3">
        <lable htmlFor="telephone" className="w-20 inline-block">
          电话：
        </lable>
        <input
          type="tel"
          name="telephone"
          className="w-48 lg:w-64 text-black"
        />
      </div>
      <div className="p-3">
        <lable htmlFor="email" className="w-20 inline-block">
          邮箱：
        </lable>
        <input type="text" name="email" className="w-48 lg:w-64 text-black" />
      </div>
      <div className="p-3">
        <button className="w-1/2 text-center mx-auto my-0 block bg-blue-500 h-8 shadow-sm text-sm font-medium rounded-sm text-white mb-2">
          注册
        </button>
      </div>
    </HomePopUpCard>
  );
}
