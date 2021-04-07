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
      "http://todobackend-staging.us-west-1.elasticbeanstalk.com/health-check",
  },
  production: {
    SERVER_URL:
      "http://todobackend-production.us-west-1.elasticbeanstalk.com/health-check",
  },
};

const env: keyof IConfig = (process.env.REACT_APP_ENV ||
  "local") as keyof IConfig;

export default config[env];
