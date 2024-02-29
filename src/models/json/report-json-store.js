import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const reportJsonStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(playlistId, report) {
    await db.read();
    report._id = v4();
    report.locationid = locationId;
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  async getReportsByLocationId(id) {
    await db.read();
    let r = db.data.reports.filter((report) => report.locationid === id);
    if (r === undefined) r = null;
    return r;
  },

  async getReportById(id) {
    await db.read();
    let r = db.data.reports.find((report) => report._id === id);
    if (r === undefined) r = null;
    return r;
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    if (index !== -1) db.data.reports.splice(index, 1);
    await db.write();
  },

  async deleteAllReports() {
    db.data.reports = [];
    await db.write();
  },

  async updateReport(report, updatedReport) {
    report.name = updatedReport.name;
    report.latitude = updatedReport.latitude;
    report.longitude = updatedReport.longitude;
    report.category = updatedReport.category;
    report.description = updatedReport.description;
    await db.write();
  },
};
