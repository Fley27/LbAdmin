export default {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard/default",
          icon: "feather icon-home",
        },
        {
          id: "user",
          title: "User",
          type: "item",
          url: "/dashboard/user",
          icon: "feather icon-user",
        },
        {
          id: "challenge",
          title: "Challenge",
          type: "collapse",
          icon: "fa fa-calendar",
          children: [
            {
              id: "new",
              title: "Create New",
              type: "item",
              url: "/dashboard/addchallenge",
            },
            {
              id: "view",
              title: "View ",
              type: "item",
              url: "/dashboard/challenge",
            },
          ],
        },
      ],
    },
  ],
};
