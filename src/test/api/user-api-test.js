import { crimeexpressService } from "./crime-express-service.js";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { maggie } from "../fixtures.js";

suite("User API tests", () => {
  setup(async () => {});
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await crimeexpressService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });
});
