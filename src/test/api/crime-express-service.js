import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const crimeexpressService = {
  crimeexpressUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.serviceUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.serviceUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.serviceUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.serviceUrl}/api/users`);
    return res.data;
  },

  async createLocation(location) {
    const res = await axios.post(`${this.serviceUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const response = await axios.delete(`${this.serviceUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.serviceUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.serviceUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.serviceUrl}/api/locations/${id}`);
    return res.data;
  },

  async getAllReports() {
    const res = await axios.get(`${this.serviceUrl}/api/reports`);
    return res.data;
  },

  async createReport(id, report) {
    const res = await axios.post(`${this.serviceUrl}/api/locations/${id}/reports`, report);
    return res.data;
  },

  async deleteAllReports() {
    const res = await axios.delete(`${this.serviceUrl}/api/reports`);
    return res.data;
  },

  async getReport(id) {
    const res = await axios.get(`${this.serviceUrl}/api/reports/${id}`);
    return res.data;
  },

  async deleteReport(id) {
    const res = await axios.delete(`${this.serviceUrl}/api/reports/${id}`);
    return res.data;
  },
};
