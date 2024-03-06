import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { crimeexpressService } from "./crime-express-service.js";
import { maggie, Wicklow, testLocations, testReports, malahideReport } from "../fixtures.js";

suite("Report API tests", () => {
  let user = null;
  let wicklowCrimes = null;

  setup(async () => {
    crimeexpressService.clearAuth();
    user = await crimeexpressService.createUser(maggie);
    await crimeexpressService.authenticate(maggie);
    await crimeexpressService.deleteAllLocations();
    await crimeexpressService.deleteAllReports();
    await crimeexpressService.deleteAllUsers();
    user = await crimeexpressService.createUser(maggie);
    await crimeexpressService.authenticate(maggie);
    Wicklow.userid = user._id;
    wicklowCrimes = await crimeexpressService.createLocation(Wicklow);
  });

  teardown(async () => {});

  test("create report", async () => {
    const returnedReport = await crimeexpressService.createReport(wicklowCrimes._id, malahideReport);
    assertSubset(malahideReport, returnedReport);
  });

  test("create Multiple reports", async () => {
    for (let i = 0; i < testReports.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await crimeexpressService.createReport(wicklowCrimes._id, testReports[i]);
    }
    const returnedReports = await crimeexpressService.getAllReports();
    assert.equal(returnedReports.length, testReports.length);
    for (let i = 0; i < returnedReports.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const report = await crimeexpressService.getReport(returnedReports[i]._id);
      assertSubset(report, returnedReports[i]);
    }
  });

  test("Delete ReportApi", async () => {
    for (let i = 0; i < testReports.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await crimeexpressService.createReport(wicklowCrimes._id, testReports[i]);
    }
    let returnedReports = await crimeexpressService.getAllReports();
    assert.equal(returnedReports.length, testReports.length);
    for (let i = 0; i < returnedReports.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await crimeexpressService.deleteReport(returnedReports[i]._id);
    }
    returnedReports = await crimeexpressService.getAllReports();
    assert.equal(returnedReports.length, 0);
  });

  test("denormalised location", async () => {
    for (let i = 0; i < testReports.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await crimeexpressService.createReport(wicklowCrimes._id, testReports[i]);
    }
    const returnedLocation = await crimeexpressService.getLocation(wicklowCrimes._id);
    assert.equal(returnedLocation.reports.length, testReports.length);
    for (let i = 0; i < testReports.length; i += 1) {
      assertSubset(testReports[i], returnedLocation.reports[i]);
    }
  });
});
