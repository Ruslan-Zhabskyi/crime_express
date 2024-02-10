import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  addLocation: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Location error", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newLocation = {
        userid: loggedInUser._id,
        name: request.payload.name,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.locationStore.addLocation(newLocation);
      return h.redirect("/dashboard");
    },
  },

  deleteLocation: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.locationStore.deleteLocationById(location._id);
      return h.redirect("/dashboard");
    },
  },

  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getUserLocations(loggedInUser._id);
      const viewData = {
        title: "Crime Accidents Dashboard",
        user: loggedInUser,
        locations: locations,
      };
      return h.view("dashboard-view", viewData);
    },
  },
};
