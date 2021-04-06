interface IEnvConfig {
  SERVER_URL: string;
}

interface IConfig {
  local: IEnvConfig;
  staging: IEnvConfig;
  production: IEnvConfig;
}

const config: IConfig = {
  local: {
    SERVER_URL: "http://localhost:8080",
  },
  staging: {
    SERVER_URL:
      "http://todobackend-staging.eba-pinzma4i.us-west-1.elasticbeanstalk.com",
  },
  production: {
    SERVER_URL: "",
  },
};

const env: keyof IConfig = (process.env.REACT_APP_ENV ||
  "local") as keyof IConfig;

export default config[env];
