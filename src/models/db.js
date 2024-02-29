import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { reportMongoStore } from "./mongo/report-mongo-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { reportJsonStore } from "./json/report-json-store.js";

export const db = {
  userStore: null,
  locationStore: null,
  reportStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.locationStore = locationMongoStore;
        this.reportStore = reportMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userJsonStore;
        this.locationStore = locationJsonStore;
        this.reportStore = reportJsonStore;
        break;
    }
  },
};
