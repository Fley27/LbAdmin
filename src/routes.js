import React from "react";
import $ from "jquery";
import Feedback from "./Demo/Dashboard/Feedback";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const AddChallenge = React.lazy(() => import("./Demo/Dashboard/addChallenge"));
const AddCoins = React.lazy(() => import("./Demo/Dashboard/addCoins"));
const Challenge = React.lazy(() => import("./Demo/Dashboard/challenge"));
const User = React.lazy(() => import("./Demo/Dashboard/user"));
const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const routes = [
  {
    path: "/dashboard/addcoins",
    exact: true,
    name: "Default",
    component: AddCoins,
  },
  {
    path: "/dashboard/addchallenge",
    exact: true,
    name: "Default",
    component: AddChallenge,
  },
  {
    path: "/dashboard/challenge",
    exact: true,
    name: "Default",
    component: Challenge,
  },
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/dashboard/user",
    exact: true,
    name: "Default",
    component: User,
  },
];

export default routes;
