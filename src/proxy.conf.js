const PROXY_CONFIG = [
  {
    context: [
      "/projectmanagement",
    ],
    target: "https://localhost:7278",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
