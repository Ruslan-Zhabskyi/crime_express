export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Crime Express",
      };
      return h.view("about-view", viewData);
    },
  },
};
