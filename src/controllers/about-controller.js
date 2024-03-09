export const aboutController = {
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "About Crime Express",
        user: loggedInUser,
      };
      return h.view("about-view", viewData);
    },
  },
};
