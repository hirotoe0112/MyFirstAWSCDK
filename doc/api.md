## Index
- [ユーザ作成](#add-user)
- [ユーザ確認](#confirm)
- [ログイン](#auth)
- [タスク登録](#add-task)
- [タスク一覧取得](#get-tasks)
- [タスク1件取得](#get-task)
- [タスク更新](#update-task)
- [タスク削除](#delete-task)

## ユーザ管理用API
<a id="add-user"></a>
### 新規ユーザを登録する
<table>
  <tr>
    <td>動作概要</td>
  </tr>
  <tr>
    <td>新規ユーザを登録する</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="5">リクエスト</td>
  </tr>
  <tr>
    <td>URL</td>
    <td colspan="4">https://{エンドポイント}/users</td>
  </tr>
  <tr>
    <td>メソッド</td>
    <td colspan="4">POST</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td colspan="2">名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">ボディ</td>
    <td>要素</td>
    <td>型</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>username</td>
    <td>String</td>
    <td>ユーザ名</td>
    <td>最大128文字</td>
  </tr>
  <tr>
    <td>password</td>
    <td>String</td>
    <td>パスワード</td>
    <td>最小文字数：8文字<br>
    少なくとも1つの数字を含む<br>
    少なくとも1つの特殊文字を含む<br>
    少なくとも1つの大文字を含む<br>
    少なくとも1つの小文字を含む</td>
  </tr>
  <tr>
    <td>email</td>
    <td>String</td>
    <td>メールアドレス</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="4">レスポンス</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td>名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">ステータスコード</td>
    <td>パターン</td>
    <td>想定ケース</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>400 Bad Request</td>
    <td>必要なパラメータがない</td>
    <td></td>
  </tr>
  <tr>
    <td>500 Internal Server Error</td>
    <td>ユーザ名が129文字以上<br>
    パスワード要件を満たしていない<br>
    メールアドレスの形式が不正</td>
    <td></td>
  </tr>
  <tr>
    <td>200 OK</td>
    <td>上記以外</td>
    <td></td>
  </tr>
</table>

<a id="confirm"></a>
### ユーザを確認する
<table>
  <tr>
    <td>動作概要</td>
  </tr>
  <tr>
    <td>登録したユーザを確認する</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="5">リクエスト</td>
  </tr>
  <tr>
    <td>URL</td>
    <td colspan="4">https://{エンドポイント}/confirm</td>
  </tr>
  <tr>
    <td>メソッド</td>
    <td colspan="4">POST</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td colspan="2">名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">ボディ</td>
    <td>要素</td>
    <td>型</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>username</td>
    <td>String</td>
    <td>ユーザ名</td>
    <td></td>
  </tr>
  <tr>
    <td>code</td>
    <td>Integer</td>
    <td>確認コード</td>
    <td>登録したメールアドレス宛てに送信される数値6桁の確認コード</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="4">レスポンス</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td>名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">ステータスコード</td>
    <td>パターン</td>
    <td>想定ケース</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>400 Bad Request</td>
    <td>必要なパラメータがない</td>
    <td></td>
  </tr>
  <tr>
    <td>500 Internal Server Error</td>
    <td>ユーザが認証済み<br>
    ユーザが存在しない<br>
    認証コードが間違っている</td>
    <td></td>
  </tr>
  <tr>
    <td>200 OK</td>
    <td>上記以外</td>
    <td></td>
  </tr>
</table>

<a id="auth"></a>
### ユーザログイン
<table>
  <tr>
    <td>動作概要</td>
  </tr>
  <tr>
    <td>ユーザとパスワードを認証しトークンを取得する</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="5">リクエスト</td>
  </tr>
  <tr>
    <td>URL</td>
    <td colspan="4">https://{エンドポイント}/auth</td>
  </tr>
  <tr>
    <td>メソッド</td>
    <td colspan="4">POST</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td colspan="2">名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">ボディ</td>
    <td>要素</td>
    <td>型</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>username</td>
    <td>String</td>
    <td>ユーザ名</td>
    <td></td>
  </tr>
  <tr>
    <td>password</td>
    <td>String</td>
    <td>パスワード</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="5">レスポンス</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td colspan="2">名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">ボディ</td>
    <td>要素</td>
    <td>型</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>IdToken</td>
    <td>String</td>
    <td>トークン</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">ステータスコード</td>
    <td colspan="2">パターン</td>
    <td>想定ケース</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">400 Bad Request</td>
    <td>必要なパラメータがない</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">500 Internal Server Error</td>
    <td>ユーザが存在しない<br>
    パスワードが間違っている</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">200 OK</td>
    <td>上記以外</td>
    <td></td>
  </tr>
</table>

## タスク管理用API
<a id="add-task"></a>
### 新規タスクを登録する
<table>
  <tr>
    <td>動作概要</td>
  </tr>
  <tr>
    <td>新規タスクを登録する</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="5">リクエスト</td>
  </tr>
  <tr>
    <td>URL</td>
    <td colspan="4">https://{エンドポイント}/tasks</td>
  </tr>
  <tr>
    <td>メソッド</td>
    <td colspan="4">POST</td>
  </tr>
  <tr>
    <td rowspan="3">ヘッダ</td>
    <td colspan="2">名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">Authorization</td>
    <td>/authで取得したトークン</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">ボディ</td>
    <td>要素</td>
    <td>型</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>title</td>
    <td>String</td>
    <td>タスクのタイトル</td>
    <td></td>
  </tr>
  <tr>
    <td>content</td>
    <td>String</td>
    <td>タスクの内容</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="4">レスポンス</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td>名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">ステータスコード</td>
    <td>パターン</td>
    <td>想定ケース</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>400 Bad Request</td>
    <td>必要なパラメータがない</td>
    <td></td>
  </tr>
  <tr>
    <td>401 Unauthorized</td>
    <td>トークンが無効</td>
    <td></td>
  </tr>
  <tr>
    <td>200 OK</td>
    <td>上記以外</td>
    <td></td>
  </tr>
</table>

<a id="get-tasks"></a>
### タスク一覧を取得する
<table>
  <tr>
    <td>動作概要</td>
  </tr>
  <tr>
    <td>ユーザのタスク一覧を取得する</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="4">リクエスト</td>
  </tr>
  <tr>
    <td>URL</td>
    <td colspan="3">https://{エンドポイント}/tasks</td>
  </tr>
  <tr>
    <td>メソッド</td>
    <td colspan="3">GET</td>
  </tr>
  <tr>
    <td rowspan="3">ヘッダ</td>
    <td>名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>/authで取得したトークン</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="5">レスポンス</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td colspan="2">名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="10">ボディ</td>
    <td>要素</td>
    <td>型</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Items</td>
    <td>Json Array</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Items.taskId</td>
    <td>String</td>
    <td>タスクID</td>
    <td></td>
  </tr>
  <tr>
    <td>Items.userId</td>
    <td>String</td>
    <td>ユーザID</td>
    <td>Amazon Cognitoのsub</td>
  </tr>
  <tr>
    <td>Items.createDt</td>
    <td>Integer</td>
    <td>作成日</td>
    <td>unixtimeミリ秒</td>
  </tr>
  <tr>
    <td>Items.updateDt</td>
    <td>Integer</td>
    <td>更新日</td>
    <td>unixtimeミリ秒</td>
  </tr>
  <tr>
    <td>Items.title</td>
    <td>String</td>
    <td>タスクのタイトル</td>
    <td></td>
  </tr>
  <tr>
    <td>Items.content</td>
    <td>String</td>
    <td>タスクの内容</td>
    <td></td>
  </tr>
  <tr>
    <td>Count</td>
    <td>Integer</td>
    <td>タスク数</td>
    <td></td>
  </tr>
  <tr>
    <td>ScannedCount</td>
    <td>Integer</td>
    <td>タスク総数</td>
    <td>フィルタをかけていないため、Countと同数になる</td>
  </tr>
  <tr>
    <td rowspan="3">ステータスコード</td>
    <td colspan="2">パターン</td>
    <td>想定ケース</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">401 Unauthorized</td>
    <td>トークンが無効</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">200 OK</td>
    <td>上記以外</td>
    <td></td>
  </tr>
</table>

<a id="get-task"></a>
### タスク情報を取得する
<table>
  <tr>
    <td>動作概要</td>
  </tr>
  <tr>
    <td>特定のタスク情報を取得する</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="4">リクエスト</td>
  </tr>
  <tr>
    <td>URL</td>
    <td colspan="3">https://{エンドポイント}/tasks/{taskID}</td>
  </tr>
  <tr>
    <td>メソッド</td>
    <td colspan="3">GET</td>
  </tr>
  <tr>
    <td rowspan="3">ヘッダ</td>
    <td>名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>/authで取得したトークン</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="5">レスポンス</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td colspan="2">名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="8">ボディ</td>
    <td>要素</td>
    <td>型</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Item</td>
    <td>Json Object</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Items.taskId</td>
    <td>String</td>
    <td>タスクID</td>
    <td></td>
  </tr>
  <tr>
    <td>Items.userId</td>
    <td>String</td>
    <td>ユーザID</td>
    <td>Amazon Cognitoのsub</td>
  </tr>
  <tr>
    <td>Items.createDt</td>
    <td>Integer</td>
    <td>作成日</td>
    <td>unixtimeミリ秒</td>
  </tr>
  <tr>
    <td>Items.updateDt</td>
    <td>Integer</td>
    <td>更新日</td>
    <td>unixtimeミリ秒</td>
  </tr>
  <tr>
    <td>Items.title</td>
    <td>String</td>
    <td>タスクのタイトル</td>
    <td></td>
  </tr>
  <tr>
    <td>Items.content</td>
    <td>String</td>
    <td>タスクの内容</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">ステータスコード</td>
    <td colspan="2">パターン</td>
    <td>想定ケース</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">401 Unauthorized</td>
    <td>トークンが無効</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">200 OK</td>
    <td>上記以外</td>
    <td></td>
  </tr>
</table>

<a id="update-task"></a>
### タスクを更新する
<table>
  <tr>
    <td>動作概要</td>
  </tr>
  <tr>
    <td>登録済みのタスクを更新する</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="5">リクエスト</td>
  </tr>
  <tr>
    <td>URL</td>
    <td colspan="4">https://{エンドポイント}/tasks/{taskID}</td>
  </tr>
  <tr>
    <td>メソッド</td>
    <td colspan="4">PATCH</td>
  </tr>
  <tr>
    <td rowspan="3">ヘッダ</td>
    <td colspan="2">名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td colspan="2">Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">Authorization</td>
    <td>/authで取得したトークン</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">ボディ</td>
    <td>要素</td>
    <td>型</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>title</td>
    <td>String</td>
    <td>タスクのタイトル</td>
    <td>更新する場合のみ必要</td>
  </tr>
  <tr>
    <td>content</td>
    <td>String</td>
    <td>タスクの内容</td>
    <td>更新する場合のみ必要</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="4">レスポンス</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td>名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">ステータスコード</td>
    <td>パターン</td>
    <td>想定ケース</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>401 Unauthorized</td>
    <td>トークンが無効</td>
    <td></td>
  </tr>
  <tr>
    <td>403 Forbidden</td>
    <td>taskIDが設定されていない</td>
    <td></td>
  </tr>
  <tr>
    <td>200 OK</td>
    <td>上記以外</td>
    <td></td>
  </tr>
</table>

<a id="delete-task"></a>
### タスクを削除する
<table>
  <tr>
    <td>動作概要</td>
  </tr>
  <tr>
    <td>登録済みのタスクを削除する</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="4">リクエスト</td>
  </tr>
  <tr>
    <td>URL</td>
    <td colspan="3">https://{エンドポイント}/tasks/{taskID}</td>
  </tr>
  <tr>
    <td>メソッド</td>
    <td colspan="3">DELETE</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td>名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>/authで取得したトークン</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="4">レスポンス</td>
  </tr>
  <tr>
    <td rowspan="2">ヘッダ</td>
    <td>名称</td>
    <td>内容</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>Content-Type</td>
    <td>application/json</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">ステータスコード</td>
    <td>パターン</td>
    <td>想定ケース</td>
    <td>備考</td>
  </tr>
  <tr>
    <td>401 Unauthorized</td>
    <td>トークンが無効</td>
    <td></td>
  </tr>
  <tr>
    <td>403 Forbidden</td>
    <td>taskIDが設定されていない</td>
    <td></td>
  </tr>
  <tr>
    <td>200 OK</td>
    <td>上記以外</td>
    <td></td>
  </tr>
</table>