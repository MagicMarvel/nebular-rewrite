import Card from "../HomePopUpCard";
import React from "react";

export default function Index(props) {
  return (
    <Card title="简介" handleClose={props.handleClose}>
      汕头大学-ACM-博客问答站
    </Card>
  );
}
