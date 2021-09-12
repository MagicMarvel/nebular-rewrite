import React from "react";
import Require from "../../utils/Require";
import { GET_ARTICLE_LIST } from "../../utils/pathMap";
import ArticleCard from "../ArticleCard";
class index extends React.Component {
  state = {
    articleList: [],
    openDetails: false,
  };
  componentDidMount = async () => {
    const res = await Require.get(GET_ARTICLE_LIST, {
      params: {
        size: 5,
        page: 1,
      },
    });
    console.log(res.data.data.detail);
    this.setState({ articleList: res.data.data.detail });
  };
  render() {
    const { articleList } = this.state;
    return (
      <div className="m-6">
        {articleList.map((data) => (
          <ArticleCard article={data} key={data.articleId} />
        ))}
        {/* 阅读更多 */}
        <div
          className="float-right p-2"
          onClick={() => this.props.setShowDetailsHandle(true)}
        >
          Read More....
        </div>
      </div>
    );
  }
}
export default index;
