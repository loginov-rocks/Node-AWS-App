# Node AWS App

Monorepo for an application built completely with JavaScript, based on React and Nest frameworks and combining
serverless and containerized approach on AWS.

The application represents a basic shop with a products catalog, that can be updated by the CSV ingestion,
authentication, and a shopping cart. So it can be used as a ground for a full-featured application. 

Architecture and implementation were done during the first run of RS School course
[NodeJS in AWS](https://rs.school/nodejs-aws/), and some parts of the codebase were forked from the
[RS School repositories](https://github.com/rolling-scopes-school).

## Architecture

Tech Stack: JavaScript, TypeScript, React, Node.js, NestJS, PostgreSQL, Docker, Serverless framework.

AWS Stack: S3, CloudFront, API Gateway, Lambda, ELB, RDS, SQS, SNS, Cognito, CloudFormation.

![Architecture Diagram](https://raw.githubusercontent.com/loginov-rocks/Node-AWS-App/main/docs/Architecture.png)

## Deployment Tips

### BFF Service

```sh
eb init loginov-rocks-bff-api --platform=node.js --region=eu-central-1 --profile=danila_loginov
eb create loginov-rocks-bff-api-dev --cname=loginov-rocks-bff-api-dev --single --profile=danila_loginov
```

Go to Elastic Beanstalk console, find the environment, go to Configuration, click Edit on the Software line and find
Environment properties table, add environment variables with services URLs.

### Cart Service

```sh
eb init loginov-rocks-cart-api --platform="Docker running on 64bit Amazon Linux" --region=eu-central-1 --profile=danila_loginov
eb create loginov-rocks-cart-api-dev --cname=loginov-rocks-cart-api-dev --single --profile=danila_loginov
```
