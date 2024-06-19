# react-ts-degital-meishi

![main](/docs/images/main.jpg)

---

## サービス説明

デジタル名刺 は勉強会などで自己紹介や好きな技術、github アカウントなどを気軽に登録・閲覧できるシンプルな Web アプリケーションです。
登録したデータは登録翌日の朝６時（日本時間）に自動的に削除されます。

## 主な使用技術

Frontend:

- react@18.3.1
- react-hook-form@7.51.5
- react-router-dom@6.23.1
- typescript@5.4.5
- @chakra-ui/react@2.8.2
- chakra-react-select@4.8.0
- react-icons@5.2.1
- vite@5.2.12

Backend/DB:

- Supabase

Test：

- jest@29.7.0
- @testing-library/react@15.0.7

CI/CD：

- Github Actions

Deploy:

- Firebase Hosting

## 環境設定

1. env ファイルをコピー

```bash
$ cp .env.template .env
```

## build

```bash
$ npm run build
```

## アプリ起動

```bash
$ npm run dev
```

## deploy

```bash
$ make deploy
```

## test

```bash
$ make test
```
