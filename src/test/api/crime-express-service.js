import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const crimeexpressService = {
  crimeexpressUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.crimeexpressUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.crimeexpressUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.crimeexpressUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.crimeexpressUrl}/api/users`);
    return res.data;
  },

  async createLocation(location) {
    const res = await axios.post(`${this.crimeexpressUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const response = await axios.delete(`${this.crimeexpressUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.crimeexpressUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.crimeexpressUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.crimeexpressUrl}/api/locations/${id}`);
    return res.data;
  },

  async getAllReports() {
    const res = await axios.get(`${this.crimeexpressUrl}/api/reports`);
    return res.data;
  },

  async createReport(id, report) {
    const res = await axios.post(`${this.crimeexpressUrl}/api/locations/${id}/reports`, report);
    return res.data;
  },

  async deleteAllReports() {
    const res = await axios.delete(`${this.crimeexpressUrl}/api/reports`);
    return res.data;
  },

  async getReport(id) {
    const res = await axios.get(`${this.crimeexpressUrl}/api/reports/${id}`);
    return res.data;
  },

  async deleteReport(id) {
    const res = await axios.delete(`${this.crimeexpressUrl}/api/reports/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.crimeexpressUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
