import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Demo from "./pages/demo";
import Home from "./pages/home";
import ArticleList from "./pages/ArticleList";
import ShowArticle from "./pages/ShowArticle";
// 应用路由
class index extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/demo">
            <Demo />
          </Route>
          <Route path="/articleList/:pageNum">
            <ArticleList />
          </Route>
          <Route path="/article/:articleId">
            <ShowArticle></ShowArticle>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default index;
