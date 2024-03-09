export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      isAdmin: false,
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      isAdmin: false,
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      isAdmin: true,
    },
  },
  locations: {
    _model: "Location",
    malahide: {
      name: "Malahide",
      latitude: 56,
      longitude: -6,
      userid: "->users.bart",
    },
    swords: {
      name: "Swords",
      latitude: 50,
      longitude: -6,
      userid: "->users.marge",
    },
  },
  reports: {
    _model: "Report",
    report_1: {
      name: "Scary",
      latitude: 56,
      longitude: -6,
      category: "Anti Social Behavior",
      description: "Very Scary",
      locationid: "->locations.swords",
    },
    report_2: {
      name: "Scary 2",
      latitude: 56,
      longitude: -6,
      category: "Anti Social Behavior",
      description: "Very Scary",
      locationid: "->locations.malahide",
    },
    report_3: {
      name: "Scary 3",
      latitude: 56,
      longitude: -6,
      category: "Anti Social Behavior",
      description: "Very Scary",
      locationid: "->locations.malahide",
    },
  },
};
