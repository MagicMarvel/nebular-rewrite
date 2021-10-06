import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: ${(props) => props.top};
  color: #d1d0d0;
  font-family: kaiti;
  transform: translate(-50%, -50%);
  line-height: 1.5rem;
  background-color: rgba(128, 123, 123, 0.4);
  padding: 0.8rem;
  border-radius: 0.625rem;
  font-weight: bolder;
  transition: all 0.4s;
  box-shadow: 0.3125rem 0.25rem 0.3125rem 0rem rgba(0, 0, 0, 0.2);
`;

/**
 *
 * 需要传入 show(是否显示该Toast)，mes：提示的文本，top：距离顶部的距离，keepTime：提示显示的时间
 */
export default function Toast(props) {
  const [top, setTop] = useState("-50%");

  useEffect(() => {
    if (props.show === true) {
      setTop(props.top || "20%");
      setTimeout(() => {
        setTop("-50%");
      }, props.keepTime || 3000);
    }
  }, [props.show, props.top, props.keepTime]);

  return (
    <Container top={top} className="text-sm lg:text-xl">
      {props.mes || "若你看到这串字符，那么请联系管理员"}
    </Container>
  );
}
