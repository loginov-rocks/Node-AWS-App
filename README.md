# nodejs-aws-be

Business Domain: Vehicle Subscription

Front end: https://github.com/loginov-rocks/nodejs-aws-fe

## Architecture

![Architecture](https://raw.githubusercontent.com/loginov-rocks/nodejs-aws-be/main/docs/Architecture.png)

## Deployment

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
