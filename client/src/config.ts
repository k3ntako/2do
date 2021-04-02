interface IEnvConfig {
  SERVER_URL: string;
}

interface IConfig {
  local: IEnvConfig;
  test: IEnvConfig;
  development: IEnvConfig;
  production: IEnvConfig;
}

const config: IConfig = {
  local: {
    SERVER_URL: "http://localhost:8080",
  },
  test: {
    SERVER_URL: "http://localhost:8080",
  },
  development: {
    SERVER_URL:
      "http://todobackend-staging.eba-pinzma4i.us-west-1.elasticbeanstalk.com",
  },
  production: {
    SERVER_URL:
      "",
  },
};

const env: keyof IConfig = process.env.REACT_APP_ENV as keyof IConfig || "local";

export default config[env];
