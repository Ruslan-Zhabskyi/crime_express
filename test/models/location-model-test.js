import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, testReports, Kilkenny, Wicklow, malahideReport, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Location Model tests", () => {
  setup(async () => {
    db.init("json");
    await db.locationStore.deleteAllLocations();
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.locationStore.addLocation(testLocations[i]);
    }
  });

  test("create a location", async () => {
    const location = await db.locationStore.addLocation(Kilkenny);
    assertSubset(Kilkenny, location);
    assert.isDefined(location._id);
  });

  test("delete all locations", async () => {
    let returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 3);
    await db.locationStore.deleteAllLocations();
    returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get a location - success", async () => {
    const location = await db.locationStore.addLocation(Kilkenny);
    const returnedLocations = await db.locationStore.getLocationById(location._id);
    assertSubset(Kilkenny, location);
  });

  test("delete One Location - success", async () => {
    const id = testLocations[0]._id;
    await db.locationStore.deleteLocationById(id);
    const returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length - 1);
    const deleteLocation = await db.locationStore.getLocationById(id);
    assert.isNull(deleteLocation);
  });

  test("get a location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById());
  });

  test("delete One Location - fail", async () => {
    await db.locationStore.deleteLocationById("bad-id");
    const allLocations = await db.locationStore.getAllLocations();
    assert.equal(testLocations.length, allLocations.length);
  });
});
