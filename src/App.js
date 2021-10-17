import React, { createContext } from "react";
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
import Toast from "./components/Toast";
export const ToastContext = createContext();

// 应用路由
class index extends React.Component {
  state = {
    toastConfig: {},
  };

  constructor() {
    super();
    this.handleToastConfig = this.handleToastConfig.bind(this);
  }

  /**
   * 用于控制toast展示的函数，这个控制函数通过context向下传递到每一个组件里
   * 在控制函数内部实现了组件定时关闭的能力
   * @param {object} toastConfig 传入{show、timeout、mes}
   */
  handleToastConfig = (toastConfig) => {
    let configTemp = { show: true, ...toastConfig };
    if (configTemp.timeout === undefined) configTemp.timeout = 1000;
    this.setState({ toastConfig: configTemp });
    setTimeout(() => {
      configTemp.show = false;
      this.setState({ toastConfig: configTemp });
    }, toastConfig.timeout);
  };

  render() {
    return (
      <>
        <Toast config={this.state.toastConfig} />
        <ToastContext.Provider value={this.handleToastConfig}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home/index" />
              </Route>
              <Route exact path="/home">
                <Redirect to="/home/index" />
              </Route>
              <Route path="/home/:routerChoice">
                <Home />
              </Route>
              <Route path="/demo">
                <Demo username="forTest" />
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
                <GoWrong404 />
              </Route>
            </Switch>
          </Router>
        </ToastContext.Provider>
      </>
    );
  }
}

export default index;
