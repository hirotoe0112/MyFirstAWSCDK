## Index
- [プロジェクトから直接デプロイする場合](#direct)
- [GitHub Actionsからデプロイする場合](#actions)
<a id="direct"></a>
## プロジェクトから直接デプロイする場合
### AWS CDKのセットアップ
1. AWS CDK v2のインストール
2. アカウントのブートストラップ（アカウント、リージョンごとに初回のみ必要）
```
cdk bootstrap aws://{accountID}/{region}
```
### プロジェクトのクローン
```
git init
git clone https://github.com/hirotoe0112/MyFirstAWSCDK.git
```
### 依存関係のインストール
```
npm install
```
### ユニットテスト
```
npm test
```
### デプロイ
```
cdk deploy
```
コンソールに表示されたアウトプットがAPIのエンドポイントとなります。
```
Outputs:
todo-stack.apigatewayEndpointF1DACA1D = https://***.execute-api.ap-northeast-1.amazonaws.com/dev/
```

<a id="actions"></a>
## Github Actionsからデプロイする場合
### リポジトリにシークレットの設定
Settings⇒Secrets⇒Actionsに以下の値を設定します。
```
AWS_ACCESS_KEY_ID　：IAMユーザのアクセスキー
AWS_SECRET_ACCESS_KEY　：IAMユーザのシークレットアクセスキー
```
※当リポジトリには応募者のキーが設定済み
### プロジェクトのクローン
```
git init
git clone https://github.com/hirotoe0112/MyFirstAWSCDK.git
```
### ブランチを切ってソースコードを修正し、pull requestを行う
```
git push origin feature/xxx
```
masterに対してpull requestが行われると、GitHub Actionsにてユニットテストが行われます。
### マージする
ユニットテストの成功を確認後、masterへマージします。  
masterへのマージが行われると、GitHub Actionsにてデプロイが行われます。  
Actions⇒該当のマージコメント⇒aws_cdk⇒CDK Deployを開き、下部に表示されたアウトプットがAPIのエンドポイントとなります。
```
Outputs:
todo-stack.apigatewayEndpointF1DACA1D = https://***.execute-api.ap-northeast-1.amazonaws.com/dev/
```