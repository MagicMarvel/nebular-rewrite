import React from "react";
import styled from "styled-components";

const HelloWorld = styled.div`
  background-color: lavenderblush;
`;

class index extends React.Component {
  render() {
    return (
      <div>
        <div className="bg-yellow-600 ">hello world</div>
      </div>
    );
  }
}
export default index;
