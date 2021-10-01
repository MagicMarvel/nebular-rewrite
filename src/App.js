import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Demo from "./pages/demo";
import Home from "./pages/home";
import ArticleList from "./pages/ArticleList";
import ShowArticle from "./pages/ShowArticle";
import QAList from "./pages/Q&AList";
import PersonalPage from "./pages/PersonalPage";
import ShowQA from "./pages/ShowQA";
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
            <ShowArticle />
          </Route>
          <Route path="/QAList/:pageNum">
            <QAList />
          </Route>
          <Route path="/personalPage/:id">
            <PersonalPage />
          </Route>
          <Route path="/QA/:questionId">
            <ShowQA />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default index;
