const data = {};

data.token = "";
data.id = "";
data.prefix = ">"
data.payload = {
  op: 2,
  d: {
      token: data.token,
      intents: 131071,
      properties: {
          $os: 'linux',
          $browser: 'my_library',
          $device: 'my_library'
      },
      presence: {
          status: "online",
          since: Date.now(),
          activities: [{
              name: "forlorn",
              type: 1,
              url: `https://twitch.tv/forlorn`
            }]
        }
  }
};


export default data