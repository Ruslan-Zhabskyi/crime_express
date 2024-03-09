import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Crime Express" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Crime Express" });
    },
  },

  signup: {
    auth: false,

    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Crime Express" });
    },
  },
  login: {
    auth: false,

    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Login error", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
  // admin dash
  adminDashboard: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!loggedInUser.isAdmin) {
        // If the user is not an admin, redirect them to a different page
        return h.redirect("/dashboard");
      }
      // Fetch all users from the database
      const users = await db.userStore.getAllUsers();
      // Render the admin dashboard view with the users
      return h.view("admin-view", { title: "Admin Dashboard", users, user: loggedInUser });
    },
  },

  removeUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!loggedInUser.isAdmin) {
        // If the user is not an admin, redirect them to a different page
        return h.redirect("/dashboard");
      }
      // Remove the user from the database
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      // Redirect back to the admin dashboard
      return h.redirect("/admin");
    },
  },
};
