import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Demo from "./pages/demo";
import Home from "./pages/home";
import ArticleList from "./pages/ArticleList";
import ShowArticle from "./pages/ShowArticle";
import QAList from "./pages/Q&AList";
import PersonalPage from "./pages/PersonalPage";
import ShowQA from "./pages/ShowQA";
import GoWrong404 from "./pages/GoWrong404";
// 应用路由
class index extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <Redirect to="/home/index" /> */}
            <Demo />
          </Route>
          <Route exact path="/home">
            <Redirect to="/home/index" />
          </Route>
          <Route path="/home/:routerChoice">
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
          <Route path="/personalPage">
            <PersonalPage />
          </Route>
          <Route path="/QA/:questionId">
            <ShowQA />
          </Route>
          <Route path="*">
            {/* <GoWrong404 /> */}
            <Demo />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default index;
