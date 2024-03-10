import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ReportSpec, ReportSpecPlus, ReportArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const reportApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const reports = await db.reportStore.getAllReports();
        return reports;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ReportArraySpec, failAction: validationError },
    description: "Get all reportApi",
    notes: "Returns all reportApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Find a Report",
    notes: "Returns a report",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ReportSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
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
    // tags: ["api"],
    // description: "Create a report",
    // notes: "Returns the newly created report",
    // validate: { payload: ReportSpec },
    // response: { schema: ReportSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.reportStore.deleteAllReports();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all trackApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Delete a report",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
