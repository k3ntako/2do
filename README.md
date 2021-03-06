# 2do

## Getting Started

Clone the repo and follow the steps below.

### Frontend

1. In your command-line interface go to the `client` directory within the project.
2. Install dependencies:
   ```
   $ yarn install
   ```
3. $ Start the application:
   ```
   $ yarn start
   ```
4. Once the server has started, visit `locahost:3000` in a browser to view the app.

### Backend

1. Install [Maven](https://maven.apache.org/what-is-maven.html).
2. Install [PostgreSQL](https://www.postgresql.org/download/).
   - Mac users: we recommend [Postgres.app](https://postgresapp.com/) for most users.
3. Create `todo` database locally using your preferred method. Example:
   1. Install [psql](https://blog.timescale.com/tutorials/how-to-install-psql-on-mac-ubuntu-debian-windows/).
   2. Enter `psql` CLI by running:
      ```
      $ psql
      ```
   3. Within `psql` run: `CREATE DATABASE todo;`.
4. In your command-line interface go to the `server` directory within the project.
5. Build and start the program:
   ```
   $ ./mvnw spring-boot:run
   ```
6. Once the server has started, visit `locahost:8080/health-check` in a browser to view status of the server.

## Deployed Versions

[Frontend(staging)](http://mattkentaro-frontend-dev.s3-website-us-west-1.amazonaws.com/)  
[Frontend(production)](http://mattkentaro-frontend-prod.s3-website-us-west-1.amazonaws.com/)  
[Spring API(staging)](http://todobackend-staging.us-west-1.elasticbeanstalk.com/health-check/)  
[Spring API(production)](http://todobackend-production.us-west-1.elasticbeanstalk.com/health-check/)

## Running Tests

### Frontend Tests

Frontend tests will test the utility functions.

1. In your command-line interface go to the `client` directory within the project.
2. Make sure you have the dependencies installed and the API key from the Getting Started section above.
3. Run the tests:
   ```
   $ npm test
   ```

### End-to-End Tests

End-to-end tests will start the React server and open a Cypress UI where you can run tests.

1. In your command-line interface go to the `client` directory within the project.
2. Make sure you have the dependencies installed and the API key from the Getting Started section above.
3. Start the backend server with the testing profile:
   ```
   $ ./mvnw spring-boot:run -Dspring-boot.run.profiles=testing
   ```
4. Run the tests in a separate CLI tab:
   ```
   $ npm run test:e2e
   ```

---

## Assuming AWS IAM Roles

To separate concerns and delegate permissions, we created an IAM User that could assume Roles with specific permissions to perform tasks when needed.

1. Created an IAM user named `InfrastructureProvisioner` (save credentials)
2. Created an `AssumeRole` policy allowing the `sts:AssumeRole` action
3. Attached `AssumeRole` policy to `InfrastructureProvisioner` user
4. Created `InfrastructureProvisioner` role
5. Gave the `InfrastructureProvisioner` role relevant permissions (S3 and Elastic Beanstalk)
6. Install AWS CLI client
   ```
   $ brew install awscli
   ```
7. Configure AWS CLI for `InfrastructureProvisioner` user using credentials generated in step one:

   ```
   $ aws configure

   $ AWS Access Key ID [None]: <user credentials>
   $ AWS Secret Access Key [None]: <user credentials>
   $ Default region name [None]: us-west-1
   $ Default output format [None]: json
   ```

8. Confirm current user
   ```
   $ aws sts get-caller-identity
   ```

### Assume IAM Role

1. Start new session assuming `InfrastructureProvisioner` role:
   ```
   $ aws sts assume-role --role-arn "<aws arn of role>" --role-session-name AWSCLI-Session
   ```
2. Using the output, set environment variables:
   ```
   $ export AWS_ACCESS_KEY_ID=RoleAccessKeyID
   $ export AWS_SECRET_ACCESS_KEY=RoleSecretKey
   $ export AWS_SESSION_TOKEN=RoleSessionToken
   ```
3. Confirm that you're now assuming role:
   ```
   $ aws sts get-caller-identity
   ```
   `AssumedRoleId` should be appended with `:AWSCLI-Session` and `Arn` should show the assumed role
4. User can now perform actions with permissions granted to `InfrastructureProvisioner` role

### Return to Original User

```
$ unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
```

---

## Configuring AWS Deployment

These are the steps we took to deploy the frontend React app to an S3 bucket, and the Java Spring API to Elastic Beanstalk, using the AWS CLI

### Frontend | AWS S3

1. Assume `InfrastructureProvisioner` role (see above)
2. Make a new S3 bucket:
   ```
   $ aws s3 mb s3://<unique bucket name>
   ```
3. Create build:
   ```
   $ npm run build-staging
   ```
4. Add 'deploy' script to `package.json`:
   ```
   "deploy": "aws s3 sync build/ s3://<bucket name>"
   ```
5. Configure bucket for web hosting:
   ```
   $ aws s3 website s3://<bucket name> --index-document index.html
   ```
6. Create bucket policy JSON file:
   ```
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "PublicReadGetObject",
               "Effect": "Allow",
               "Principal": "*",
               "Action": [
                   "s3:GetObject"
               ],
               "Resource": [
                   "arn:aws:s3:::Bucket-Name/*"
               ]
           }
       ]
   }
   ```
7. Set bucket policy:
   ```
   $ aws s3api put-bucket-policy --bucket <bucket name> --policy file://<valid json file>
   ```
8. Deploy:
   ```
   $ npm run deploy
   ```
9. Visit site to confirm:
   ```
   http://<bucket name>.s3-website-us-west-1.amazonaws.com/
   ```

### API | AWS Elastic Beanstalk

#### Staging

1. Assume `InfrastructureProvisioner` role (see above)
2. Create a new application:
   ```
   $ aws elasticbeanstalk create-application --application-name <unique app name> --description "<description>"
   ```
3. Set default values and location for Elastic Beanstalk application (applies only to current directory):
   ```
   $ eb init
   ```
   Follow the prompts to enter relevant information/settings
4. Create new environment to deploy to:
   ```
   $ eb create <environment name>  -db -db.engine postgres -db.user postgres -db.pass postgres -db.version="12.5"
   ```
5. Build new Jar:
   ```
   $ ./mvnw spring-boot:build-image
   ```
   Which will create jar at:
   ```
   ./target/<app name-version-SNAPSHOT>.jar
   ```
6. Edit `./.elasticbeanstalk/config.yml` to add build artifact
   ```
   deploy:
       artifact: ./target/<app name-version-SNAPSHOT>.jar
   ```
7. Run deploy script and upload jar to EB:
   ```
   $ eb deploy ToDoBackend-staging
   ```
8. Create environment variable in Elastic Beanstalk environment to specify the profile
   ```
   $ eb setenv spring_profiles_active=aws
   ```

#### Production

Make sure you have completed the steps for "Staging". The following command will clone the environment and deploy the application that is deployed to staging.

```
$ eb clone <name of environment to clone> -n <production environment name> --cname <production environment CNAME>
```

## Deployment

### Frontend

1. Assume `InfrastructureProvisioner` role (see above)
2. From the `/client` directory, create build:
   ```
   $ npm run build-production
   ```
3. Deploy to S3:
   ```
   $ aws s3 sync build/ s3://mattkentaro-frontend-prod
   ```

### Backend

1. Assume `InfrastructureProvisioner` role (see above)

2. From the `/server` directory, build new Jar:
   ```
   $ ./mvnw spring-boot:build-image
   ```
3. Run deploy script and upload jar to EB:
   ```
   $ eb deploy ToDoBackend-production
   ```
4. ON FIRST DEPLOY ONLY: Create environment variable in Elastic Beanstalk environment to specify the profile
   ```
   $ eb setenv spring_profiles_active=aws
   ```
