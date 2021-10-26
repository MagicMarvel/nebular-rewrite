import React, { createContext, Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Toast from "./components/Toast";
import Loading from "./pages/Loading";
const Demo = lazy(() => import("./pages/demo"));
const Home = lazy(() => import("./pages/home"));
const ArticleList = lazy(() => import("./pages/ArticleList"));
const ShowArticle = lazy(() => import("./pages/ShowArticle"));
const QAList = lazy(() => import("./pages/Q&AList"));
const PersonalPage = lazy(() => import("./pages/PersonalPage"));
const ShowQA = lazy(() => import("./pages/ShowQA"));
const GoWrong404 = lazy(() => import("./pages/GoWrong404"));

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
                    <Suspense fallback={<Loading />}>
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
                                    <GoWrong404 />
                                </Route>
                            </Switch>
                        </Router>
                    </Suspense>
                </ToastContext.Provider>
            </>
        );
    }
}

export const ToastContext = createContext();
export default index;
