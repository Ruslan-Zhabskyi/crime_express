import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { reportController } from "./controllers/report-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/location/{id}", config: reportController.index },
  { method: "POST", path: "/location/{id}/addreport", config: reportController.addReport },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "POST", path: "/dashboard/addlocation", config: dashboardController.addLocation },
  { method: "GET", path: "/location/delete/{id}", config: dashboardController.deleteLocation },
  { method: "GET", path: "/location/{locationId}/report/delete/{reportId}", config: reportController.deleteReport },
];
