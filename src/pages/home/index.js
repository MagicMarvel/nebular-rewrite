import React from "react";
import styled from "styled-components";
import Require from "../../utils/Require";
import { GET_ARTICLE_BY_ID } from "../../utils/pathMap";
import ShowArticleBriefInformation from "../../components/ShowArticleBriefInformation";

class index extends React.Component {
  handleClick = async () => {
    const res = await Require.get(GET_ARTICLE_BY_ID, {
      params: {
        articleId: 57,
      },
    });
    console.log(res);
  };
  render() {
    return (
      <div>
        <div
          className="bg-yellow-600 text-3xl text-gray-200 hover:text-yellow-100"
          onClick={this.handleClick}
          style={{ color: "black" }}
        >
          hello world
        </div>
        <ShowArticleBriefInformation />
      </div>
    );
  }
}
export default index;
