import { EventEmitter } from "events";
import { assert } from "chai";
import { crimeexpressService } from "./crime-express-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, Wicklow, testLocations } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Location API tests", () => {
  let user = null;

  setup(async () => {
    await crimeexpressService.deleteAllLocations();
    await crimeexpressService.deleteAllUsers();
    user = await crimeexpressService.createUser(maggie);
    Wicklow.userid = user._id;
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await crimeexpressService.createLocation(Wicklow);
    assert.isNotNull(returnedLocation);
    assertSubset(Wicklow, returnedLocation);
  });

  test("delete a location", async () => {
    const location = await crimeexpressService.createLocation(Wicklow);
    const response = await crimeexpressService.deleteLocation(location._id);
    assert.equal(response.status, 204);
    try {
      const returnedLocation = await crimeexpressService.getLocation(location.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });

  test("create multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      testLocations[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await crimeexpressService.createLocation(testLocations[i]);
    }
    let returnedLists = await crimeexpressService.getAllLocations();
    assert.equal(returnedLists.length, testLocations.length);
    await crimeexpressService.deleteAllLocations();
    returnedLists = await crimeexpressService.getAllLocations();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant locations", async () => {
    try {
      const response = await crimeexpressService.deleteLocation("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });
});
