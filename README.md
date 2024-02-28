# ts-dev

PHPとTypeScript用の簡単な開発環境を構築します。

## 機能
- ```docker compose up -d```で起動
- app内のtsディレクトリ内を修正ください
- nodeコンテナを通して常に自動でコンパイルが行われます
- コンパイルされたスクリプトはsrc/jsディレクトリに吐き出されます
- ブラウザでの確認は、```http://localhost:8080```にアクセスください
- デプロイは、src内のファイルをpublic_html内にアップロードしてください

## 動作環境
WSL2
Ubuntu
Docker

## 使い方
1. WSL2をインストール
2. Ubuntuをインストール
3. Dockerをインストール
4. Ubuntuターミナルを起動
5. ```docker compose up -d``` を実行

## 【参考】
https://www.kagoya.jp/howto/cloud/container/wsl2_docker/

https://qiita.com/EBIHARA_kenji/items/12c7a452429d79006450
