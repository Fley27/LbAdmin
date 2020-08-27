import React from "react";
import $ from "jquery";

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

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const EditChallenge = React.lazy(() =>
  import("./Demo/Dashboard/editChallenge")
);
const EditChallengeCategory = React.lazy(() =>
  import("./Demo/Dashboard/editChallengeCategory")
);
const EditChallengeType = React.lazy(() =>
  import("./Demo/Dashboard/editChallengeType")
);
const Plan = React.lazy(() => import("./Demo/Dashboard/plan"));
const Store = React.lazy(() => import("./Demo/Dashboard/store"));
const User = React.lazy(() => import("./Demo/Dashboard/user"));
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
    path: "/dashboard/editchallenge",
    exact: true,
    name: "Default",
    component: EditChallenge,
  },
  {
    path: "/dashboard/editchallengecategory",
    exact: true,
    name: "Default",
    component: EditChallengeCategory,
  },
  {
    path: "/challenge/editchallengetype",
    exact: true,
    name: "Default",
    component: EditChallengeType,
  },
  {
    path: "/dashboard/plan",
    exact: true,
    name: "Default",
    component: Plan,
  },
  {
    path: "/dashboard/store",
    exact: true,
    name: "Default",
    component: Store,
  },
  {
    path: "/dashboard/user",
    exact: true,
    name: "Default",
    component: User,
  },
];

export default routes;
