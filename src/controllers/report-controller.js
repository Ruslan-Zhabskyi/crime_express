import { db } from "../models/db.js";
import { ReportSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const reportController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "Location",
        location: location,
        user: loggedInUser,
      };
      return h.view("location-view", viewData);
    },
  },

  addReport: {
    validate: {
      payload: ReportSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const location = await db.locationStore.getLocationById(request.params.id);
        location.reports = await db.reportStore.getReportsByLocationId(location._id);
        return h.view("location-view", { title: "Add report error", errors: error.details, location: location }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newReport = {
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.reportStore.addReport(location._id, newReport);
      return h.redirect(`/location/${location._id}`);
    },
  },

  deleteReport: {
    handler: async function (request, h) {
      const { locationId, reportId } = request.params;
      const location = await db.locationStore.getLocationById(locationId);
      await db.reportStore.deleteReport(reportId);
      return h.redirect(`/location/${location._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          location.img = url;
          await db.locationStore.updateLocation(location);
        }
        return h.redirect(`/location/${location._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/location/${location._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
