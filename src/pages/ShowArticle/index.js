import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Require from "../../utils/Require";
import { GET_ARTICLE_BY_ID } from "../../utils/pathMap";
import MarkdownParse from "../../components/MarkdownParse";

export default function Index(props) {
  const [articleInformation, setArticleInformation] = useState(undefined);
  const { articleId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await Require.get(GET_ARTICLE_BY_ID, {
        params: {
          articleId: articleId,
        },
      });
      console.log("fetch!!");
      console.log(res.data.data);
      setArticleInformation(res.data.data);
    };
    fetchData();
  }, [articleId]);
  return (
    <div>
      {articleInformation !== undefined && (
        <MarkdownParse markdown={articleInformation.content}></MarkdownParse>
      )}
    </div>
    // <div>article</div>
  );
}
