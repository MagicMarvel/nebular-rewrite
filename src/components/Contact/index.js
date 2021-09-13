import React from "react";
import HomePopUpCard from "../HomePopUpCard";
export default function Index(props) {
  return (
    <HomePopUpCard
      handleClose={props.handleClose}
      title="联系我们"
    ></HomePopUpCard>
  );
}
