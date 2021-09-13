import React from "react";
import HomePopUpCard from "../HomePopUpCard";

export default function index(props) {
  return (
    <HomePopUpCard handleClose={props.handleClose} title="注册"></HomePopUpCard>
  );
}
