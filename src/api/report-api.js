import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const reportApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const reports = await db.reportStore.getAllReports();
        return reports;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const report = await db.reportStore.getReportById(request.params.id);
        if (!report) {
          return Boom.notFound("No report with this id");
        }
        return report;
      } catch (err) {
        return Boom.serverUnavailable("No report with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const report = await db.reportStore.addReport(request.params.id, request.payload);
        if (report) {
          return h.response(report).code(201);
        }
        return Boom.badImplementation("error creating report");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.reportStore.deleteAllReports();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const report = await db.reportStore.getReportById(request.params.id);
        if (!report) {
          return Boom.notFound("No Report with this id");
        }
        await db.reportStore.deleteReport(report._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Report with this id");
      }
    },
  },
};
