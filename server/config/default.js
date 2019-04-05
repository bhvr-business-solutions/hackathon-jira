module.exports = {
  server: {
    port: process.env.SERVER_PORT ? +process.env.SERVER_PORT : 8081
  },
  jira: {
    domain: 'behaviour',
    defaultProjectKey: 'HJ',
    userName: 'remy.jeancolas@bhvr.com',
    password: 'sag4Dorfki2fYPloVffiE6DB'
  },
  displayLimit: 5,
  teamName: "Awesome Team",
  defaultUser: {
    name: "missingNo",
    avatar: "avatar3.png"
  },
  users: [
    {
      name: "wondert",
      avatar: "princess_walk.gif",
      jiraId: "5c350d9005d0812fde06dd22"
    },
    {
      name: "ekime",
      avatar: "soldier_walk.gif",
      jiraId: "557058:e5edff59-b028-4e44-aaaf-6d5dd62bd466"
    },
    {
      name: "tyson",
      avatar: "barbarian_1_walk.gif",
      jiraId: "5a81b4f4cd68e7211cf87aaf"
    },
    {
      name: "hodor",
      avatar: "wizard_1_walk.gif",
      jiraId: "557058:d2ccf86c-db2e-453d-8ad0-d9ef6facd83f"
    },
    {
      name: "Groot",
      avatar: "goblin_2_walk.gif",
      jiraId: "557058:5795d3dc-e7f4-4045-a717-fec981187530"
    }
  ]
};
