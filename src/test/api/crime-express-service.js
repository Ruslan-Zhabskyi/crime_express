import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const crimeexpressService = {
  crimeexpressUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.crimeexpressUrl}/api/users`, user);
    return res.data;
  },
};
