import React from "react";
import $ from "jquery";
import Feedback from "./Demo/Dashboard/Feedback";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const AddChallenge = React.lazy(() => import("./Demo/Dashboard/addChallenge"));
const AddChallengeCategory = React.lazy(() =>
  import("./Demo/Dashboard/addChallengeCategory")
);
const AddChallengeType = React.lazy(() =>
  import("./Demo/Dashboard/addChallengeType")
);
const AddCoins = React.lazy(() => import("./Demo/Dashboard/addCoins"));
const Challenge = React.lazy(() => import("./Demo/Dashboard/challenge"));
const ChallengeCategory = React.lazy(() =>
  import("./Demo/Dashboard/challengeCategory")
);
const ChallengeType = React.lazy(() =>
  import("./Demo/Dashboard/challengeType")
);
const User = React.lazy(() => import("./Demo/Dashboard/user"));
const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const EditChallengeType = React.lazy(() =>
  import("./Demo/Dashboard/editChallengeType")
);
const routes = [
  {
    path: "/dashboard/addchallenge",
    exact: true,
    name: "Default",
    component: AddChallenge,
  },
  {
    path: "/challenge/addchallengecategory",
    exact: true,
    name: "Default",
    component: AddChallengeCategory,
  },
  {
    path: "/challenge/addchallengetype",
    exact: true,
    name: "Default",
    component: AddChallengeType,
  },
  {
    path: "/dashboard/addcoins",
    exact: true,
    name: "Default",
    component: AddCoins,
  },
  {
    path: "/dashboard/challenge",
    exact: true,
    name: "Default",
    component: Challenge,
  },
  {
    path: "/challenge/challengecategory",
    exact: true,
    name: "Default",
    component: ChallengeCategory,
  },
  {
    path: "/challenge/challengeType",
    exact: true,
    name: "Default",
    component: ChallengeType,
  },
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/challenge/editchallengetype",
    exact: true,
    name: "Default",
    component: EditChallengeType,
  },
  {
    path: "/dashboard/user",
    exact: true,
    name: "Default",
    component: User,
  },
];

export default routes;
