import { assert } from "chai";
import { crimeexpressService } from "./crime-express-service.js";
import { decodeToken } from "../../api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    crimeexpressService.clearAuth();
    await crimeexpressService.createUser(maggie);
    await crimeexpressService.authenticate(maggie);
    await crimeexpressService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await crimeexpressService.createUser(maggie);
    const response = await crimeexpressService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await crimeexpressService.createUser(maggie);
    const response = await crimeexpressService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
