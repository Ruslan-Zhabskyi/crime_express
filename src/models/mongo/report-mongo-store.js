import { Report } from "./report.js";
import { v4 } from "uuid";
import { Location } from "./location.js";

export const reportMongoStore = {
  async getReportsByLocationId(id) {
    const reports = await Report.find({ locationid: id }).lean();
    //added it for testing
    if (!reports) {
      reports = null;
    }
    return reports;
  },

  async getReportById(id) {
    if (id) {
      const report = await Report.findOne({ _id: id }).lean();
    }
    return report;
  },

  async addReport(locationId, report) {
    const newReport = new Report(report);
    newReport.locationid = locationId;
    const reportObj = await newReport.save();
    return reportObj;
  },

  async deleteReport(id) {
    try {
      await Report.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllReports() {
    await Report.deleteMany({});
  },

  async updateReport(report, updatedReport) {
    report.name = updatedReport.name;
    report.category = updatedReport.category;
    report.description = updatedReport.description;
    report.latitude = updatedReport.latitude;
    report.longitude = updatedReport.longitude;
    await updatedReport.save();
    return report;
  },
};
