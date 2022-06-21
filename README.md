# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## 開発環境
- aws-cli/2.7.8 Python/3.9.11 Windows/10 exe/AMD64 prompt/off
- aws cdk 2.28.1 (build d035432)
- Node.js v16.x

## 準備
- Administrator権限をもったIAMユーザ
- 上記ユーザのアクセスキー
- 上記ユーザのシークレットアクセスキー

## 初回設定
AWSアカウント、リージョンでCDK Bootstrapが未実施の場合、実施
cdk bootstrap aws://アカウントID/リージョン名

GithubのSecretsに以下の値を設定
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY