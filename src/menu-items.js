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
            {
              id: "type",
              title: "Type",
              type: "collapse",
              icon: "feather icon-clock",
              children: [
                {
                  id: "Create New",
                  title: "Create New",
                  type: "item",
                  url: "/challenge/addchallengetype",
                },
                {
                  id: "View Challenge Type",
                  title: "View Challenge Type",
                  type: "item",
                  url: "/challenge/challengetype",
                },
              ],
            },
            {
              id: "category",
              title: "Category",
              type: "collapse",
              icon: "feather icon-clock",
              children: [
                {
                  id: "Create New",
                  title: "Create New",
                  type: "item",
                  url: "/challenge/addchallengecategory",
                },
                {
                  id: "view challenge category",
                  title: "View Challenge Category",
                  type: "item",
                  url: "/challenge/challengecategory",
                },
              ],
            },
          ],
        },
        {
          id: "store",
          title: "Store",
          type: "item",
          url: "/dashboard/store",
          icon: "feather icon-clock",
        },
        {
          id: "plan",
          title: "Plan",
          type: "item",
          url: "/dashboard/plan",
          icon: "feather icon-clock",
        },
      ],
    },
  ],
};
