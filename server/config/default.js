module.exports = {
  server: {
    port: process.env.SERVER_PORT ? +process.env.SERVER_PORT : 8081
  },
  jira: {
    domain: 'behaviour',
    defaultProjectKey: 'HJ',
    userName: null,
    password: null
  },
  displayLimit: 5,
  defaultUser: {
    name: "missingNo",
    avatar: "avatar3.png"
  },
  users: [
    {
      name: "wondert",
      avatar: "avatar1.png",
      jiraId: "5c350d9005d0812fde06dd22"
    },
    {
      name: "ekime",
      avatar: "avatar2.png",
      jiraId: "557058:e5edff59-b028-4e44-aaaf-6d5dd62bd466"
    }
  ]
};
