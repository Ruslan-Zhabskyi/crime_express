import Boom from "@hapi/boom";
import { LocationSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const locationApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const locations = await db.locationStore.getAllLocations();
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No Location with this id");
        }
        return location;
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const location = request.payload;
        const newLocation = await db.locationStore.addLocation(location);
        if (newLocation) {
          return h.response(newLocation).code(201);
        }
        return Boom.badImplementation("error creating location");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No Location with this id");
        }
        await db.locationStore.deleteLocationById(location._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.locationStore.deleteAllLocations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
