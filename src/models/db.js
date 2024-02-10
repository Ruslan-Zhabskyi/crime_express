import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { reportMongoStore } from "./mongo/report-mongo-store.js";

export const db = {
  userStore: null,
  locationStore: null,
  reportStore: null,

  init() {
    this.userStore = userMongoStore;
    this.locationStore = locationMongoStore;
    this.reportStore = reportMongoStore;
    connectMongo();
  },
};
