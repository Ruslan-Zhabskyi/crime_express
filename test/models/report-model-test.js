import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, testReports, Kilkenny, Wicklow, malahideReport, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Report Model tests", () => {
  let kilkennyList = null;

  setup(async () => {
    db.init("json");
    await db.locationStore.deleteAllLocations();
    await db.reportStore.deleteAllReports();
    kilkennyList = await db.locationStore.addLocation(Kilkenny);
    for (let i = 0; i < testReports.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testReports[i] = await db.reportStore.addReport(kilkennyList._id, testReports[i]);
    }
  });

  test("create single report", async () => {
    const wicklowList = await db.locationStore.addLocation(Wicklow);
    const report = await db.reportStore.addReport(wicklowList._id, malahideReport);
    assert.isNotNull(report._id);
    assertSubset(malahideReport, report);
  });

  test("create multiple reports", async () => {
    const reports = await db.locationStore.getLocationById(kilkennyList._id);
    assert.equal(testReports.length, testReports.length);
  });

  test("delete all reports", async () => {
    const reports = await db.reportStore.getAllReports();
    assert.equal(testReports.length, reports.length);
    await db.reportStore.deleteAllReports();
    const newReports = await db.reportStore.getAllReports();
    assert.equal(0, newReports.length);
  });

  test("get a report - success", async () => {
    const wicklowList = await db.locationStore.addLocation(Wicklow);
    const report = await db.reportStore.addReport(wicklowList._id, malahideReport);
    const newReport = await db.reportStore.getReportById(report._id);
    assertSubset(malahideReport, newReport);
  });

  test("delete One Report - success", async () => {
    const id = testReports[0]._id;
    await db.reportStore.deleteReport(id);
    const reports = await db.reportStore.getAllReports();
    assert.equal(reports.length, testLocations.length - 1);
    const deletedReport = await db.reportStore.getReportById(id);
    assert.isNull(deletedReport);
  });

  test("get a report - bad params", async () => {
    assert.isNull(await db.reportStore.getReportById(""));
    assert.isNull(await db.reportStore.getReportById());
  });

  test("delete One report - fail", async () => {
    await db.reportStore.deleteReport("bad-id");
    const reports = await db.reportStore.getAllReports();
    assert.equal(reports.length, testLocations.length);
  });
});
