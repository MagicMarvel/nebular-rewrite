import React, { useEffect, useState, useContext } from "react";
import Require from "../../utils/Require";
import { INFO_CHANGE, GET_USER_BY_ID } from "../../utils/pathMap";
import styled from "styled-components";
import UserCard from "../UserCard";
import UsrPhotoChanger from "../../components/UsrPhotoChanger";
import { CSSTransition } from "react-transition-group";
import { ToastContext } from "../../App";

const InputLabel = styled.div`
  display: block;
  margin: 0;
  padding: 0 0 8px;
  line-height: 1.5715;
  white-space: normal;
  text-align: left;
  color: #262626;
  font-size: 14px;
  font-weight: 500;
  padding: 0 0 8px;
`;

const MyInput = styled.input`
  font-size: 14px;
  line-height: 1.5715;
  color: #262626;
  position: relative;
  display: block;
  width: 100%;
  border-radius: 0.3rem;
  height: 1.75rem;
  padding-left: 0.4rem;
`;

export default function Index(props) {
  const toastController = useContext(ToastContext);
  const [usrInformation, setUsrInformation] = useState(undefined);
  const [blogname, setBlogname] = useState(undefined);
  const [qq, setQq] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const [mail, setMail] = useState(undefined);
  const [nickname, setNickname] = useState(undefined);
  const [motto, setMotto] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [hobby, setHobby] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [tel, setTel] = useState(undefined);
  const [showUsrPhotoChanger, setShowUsrPhotoChanger] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await Require.get(GET_USER_BY_ID, {
        params: {
          uid: props.usrInformation.uid,
        },
      });
      if (res.data.code === 1) {
        const tmp = res.data.data;
        setBlogname(tmp.blogname);
        setQq(tmp.qq);
        setGender(tmp.gender);
        setMail(tmp.mail);
        setNickname(tmp.nickname);
        setMotto(tmp.motto);
        setLocation(tmp.location);
        setHobby(tmp.hobby);
        setUsername(tmp.username);
        setTel(tmp.tel);
      }
    };
    if (props.usrInformation !== undefined) fetchData();
  }, [props.usrInformation]);

  const handleInformationUpload = async () => {
    const res = await Require.post(INFO_CHANGE, {
      blogname,
      qq,
      gender,
      mail,
      nickname,
      motto,
      location,
      hobby,
      tel,
    });
    if (res.data.code === 1) {
      toastController({ mes: "修改成功，请刷新", timeout: 1000 });
    } else
      toastController({
        mes: "修改失败，若反复遇到该问题，请联系管理员",
        timeout: 3000,
      });
  };
  return (
    <div className=" bg-white bg-opacity-50 rounded p-3 flex justify-between flex-wrap">
      <div className="min-h-screen w-full md:w-3/4 flex flex-col justify-around items-start">
        <div className="w-full">
          <InputLabel className="">用户名：</InputLabel>
          <MyInput
            className="select-none"
            type="text"
            disabled
            value={username !== undefined ? username : ""}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel className="">博客名：</InputLabel>
          <MyInput
            className="outline-none focus:ring-2 hover:ring-1 transition-all"
            type="text"
            value={blogname !== undefined ? blogname : ""}
            onChange={(e) => {
              setBlogname(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel className="">QQ：</InputLabel>
          <MyInput
            className="outline-none focus:ring-2 hover:ring-1 transition-all"
            type="number"
            value={qq !== undefined ? qq : ""}
            onChange={(e) => {
              setQq(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel className="">性别：</InputLabel>
          <input type="radio" name="gender" value="男" />
          <label htmlFor="男" className="px-1 text-sm">
            男
          </label>
          <input type="radio" name="gender" value="女" />
          <label htmlFor="女" className="px-1 text-sm">
            女
          </label>
        </div>
        <div className="w-full">
          <InputLabel className="">邮箱：</InputLabel>
          <MyInput
            className="outline-none focus:ring-2 hover:ring-1 transition-all"
            type="email"
            value={mail !== undefined ? mail : ""}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel className="">昵称：</InputLabel>
          <MyInput
            className="outline-none focus:ring-2 hover:ring-1 transition-all"
            type="text"
            value={nickname !== undefined ? nickname : ""}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel className="">格言：</InputLabel>
          <MyInput
            className="outline-none focus:ring-2 hover:ring-1 transition-all"
            type="text"
            value={motto !== undefined ? motto : ""}
            onChange={(e) => {
              setMotto(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel className="">籍贯：</InputLabel>
          <MyInput
            className="outline-none focus:ring-2 hover:ring-1 transition-all"
            type="text"
            value={location !== undefined ? location : ""}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel className="">电话：</InputLabel>
          <MyInput
            className="outline-none focus:ring-2 hover:ring-1 transition-all"
            type="tel"
            value={tel !== undefined ? tel : ""}
            onChange={(e) => {
              setTel(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel className="">兴趣爱好</InputLabel>
          <MyInput
            className="outline-none focus:ring-2 hover:ring-1 transition-all h-10 inline-block"
            type="text"
            value={hobby !== undefined ? hobby : ""}
            onChange={(e) => {
              setHobby(e.target.value);
            }}
          />
        </div>
        <div className="w-full flex justify-end">
          <div
            className="px-2 m-1 h-9 rounded bg-gray-300 border border-gray-400 flex items-center justify-center
        hover:text-indigo-600 hover:border-indigo-600 transition-all select-none cursor-pointer"
            onClick={handleInformationUpload}
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="upload"
              width="1.4rem"
              height="1.4rem"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
            </svg>
            <div className="text-sm mx-1 ">上传个人信息</div>
          </div>
        </div>
      </div>
      {/* 头像设置 */}
      <div className="inline-block  mt-5">
        {/* 头像渲染 */}
        <UserCard uid={props.usrInformation?.uid || undefined} />
        {/* 修改头像按钮 */}
        <div
          className="w-28 h-9 mx-auto rounded bg-gray-300 border border-gray-400 flex items-center justify-center
        hover:text-indigo-600 hover:border-indigo-600 transition-all select-none cursor-pointer"
          onClick={() => {
            setShowUsrPhotoChanger(true);
          }}
        >
          <svg
            t="1634479396626"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3639"
            width="1.4rem"
            height="1.4rem"
            fill="currentColor"
          >
            <path d="M830.976 328.192h-97.28c-23.04 0-41.472-18.432-41.472-41.472V224.256c0-23.04-18.432-41.472-41.472-41.472H373.248c-23.04 0-41.472 18.432-41.472 41.472V286.72c0 23.04-18.432 41.472-41.472 41.472h-97.28c-23.04 0-41.472 18.432-41.472 41.472v430.08c0 23.04 18.432 41.472 41.472 41.472h638.464c23.04 0 41.472-18.432 41.472-41.472v-430.08c-0.512-23.04-18.944-41.472-41.984-41.472z m-320.512 386.048c-81.92 0-148.48-66.56-148.48-148.48s66.56-148.48 148.48-148.48 148.48 66.56 148.48 148.48-66.56 148.48-148.48 148.48z"></path>
          </svg>
          <div className="text-sm mx-1">修改头像</div>
        </div>
        <CSSTransition
          in={showUsrPhotoChanger}
          classNames="FadeInOut"
          timeout={200}
          unmountOnExit
        >
          <div className="absolute -top-20 left-0 z-30 w-full">
            <UsrPhotoChanger
              close={() => setShowUsrPhotoChanger(false)}
              username={username}
            />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
