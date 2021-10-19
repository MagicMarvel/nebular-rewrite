// 接口基地址
// export const BASE_URL = "http://sankuyan.cn";

// 测试用
// export const BASE_URL = "http://81.71.18.45:5000/";

export const BASE_URL = "http://localhost:3000";

// 具体地址
export const GET_ARTICLE_BY_ID = "/public/article/get";
export const GET_ARTICLE_LIST = "/public/article/list";
export const LOGIN = "/public/user/login";
export const REGISTER = "/public/user/register";
export const LOGOUT = "/public/user/logout";
export const GET_USER_BY_ID = "/public/user/getUser";
export const GET_USER = "/user/getUser";
export const INFO_CHANGE = "/user/infoChange";
export const UPLOAD_PHOTO = "/user/uploadPhoto";
export const UPLOAD_IMAGE = "/user/uploadImage";
export const SEARCH_ARTICLE = "/public/article/search";
export const DELETE_ARTICLEL_BY_ID = "/article/delete";
export const EDIT_ARTICLEL_BY_ID = "/article/edit";
export const GET_ARTICLE_BY_CURRENCY_USER = "/article/list";
export const POST_NEW_ARTICLE = "/article/post";
export const GET_QUESTION_LIST = "/public/question/list";
export const SEARCH_QUESTION = "/public/question/search";
export const GET_QUESTION_BY_ID = "/public/question/get";
export const POST_NEW_QUESTION = "/question/post";
export const GET_ANSWER_BY_QUESTIONID = "/public/answer/list";
export const POST_ANSWER = "/answer/post";
export const GET_ANSWER_BY_ANSWERID = "/public/answer/get";
export const GET_QUESTION_LIST_BY_CURRENCY_USER = "/question/listMe";

export function getUsrPhoto(username) {
  return `${BASE_URL}/user/${username}/ProfilePhoto.jpg`;
}
