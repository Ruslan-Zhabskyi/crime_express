import { assert } from "chai";
import { crimeexpressService } from "./crime-express-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    crimeexpressService.clearAuth();
    await crimeexpressService.createUser(maggie);
    await crimeexpressService.authenticate(maggieCredentials);
    await crimeexpressService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await crimeexpressService.createUser(maggie);
    const response = await crimeexpressService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await crimeexpressService.createUser(maggie);
    const response = await crimeexpressService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    crimeexpressService.clearAuth();
    try {
      await crimeexpressService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
