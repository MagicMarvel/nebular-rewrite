import React, { useEffect, useState } from "react";
import Require from "../../utils/Require";
import { GET_USER_BY_ID } from "../../utils/pathMap";

export default function Index(props) {
  const [usrInformation, setUsrInformation] = useState(undefined);
  useEffect(() => {
    const fetch = async () => {
      const res = await Require.get(GET_USER_BY_ID, {
        params: {
          uid: props.uid,
        },
      });
      setUsrInformation(res.data.data);
      console.log(res.data.data);
    };
    fetch();
  }, [props.uid]);
  return (
    <div
      className="inline-block  border-blue-400 my-1 rounded-lg p-3 bg-white bg-opacity-60 shadow-xl 
    transition-all transform hover:-translate-y-2 hover:rotate-2 hover:shadow-2xl cursor-pointer select-none"
    >
      {usrInformation !== undefined && (
        <div>
          {/* 没有头像默认用这个代替 */}
          <svg
            t="1633165446285"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2157"
            width="128"
            height="128"
          >
            <path
              d="M501.937582 545.097053c147.891962 0 268.231366-118.534055 268.223274-264.288929 0-145.746783-120.330301-264.28994-268.222263-264.28994-147.890951 0-268.221252 118.584625-268.221252 264.28994C233.71633 426.520519 354.046631 545.097053 501.937582 545.097053zM612.471463 570.546911 411.497184 570.546911c-186.760063 0-338.664249 149.569875-338.664249 333.472733l0 19.794109c0 96.139636 149.47278 96.139636 338.664249 96.139636l200.974278 0c181.747565 0 338.694591 0 338.694591-96.139636l0-19.794109C951.164031 720.158252 799.235571 570.546911 612.471463 570.546911z"
              p-id="2158"
              fill="#707070"
            ></path>
          </svg>
          <div className="text-xs text-gray-500">{usrInformation.nickname}</div>
          <div className="text-xs text-gray-500">{usrInformation.mail}</div>
        </div>
      )}
    </div>
  );
}
