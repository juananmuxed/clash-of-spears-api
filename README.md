
# ⚔️ Clash of Spears API REST
 
 ⌨️ with ❤︎ by <a href="https://muxed.dev">MuXeD</a>

 
[![License](https://img.shields.io/github/license/juananmuxed/clash-of-spears-api?label=License)](LICENSE) [![Discord](https://img.shields.io/discord/324463341819133953?color=purple&label=Discord&logo=discord)](https://discord.gg/88rzwfU)

### GitHub Status

![Release](https://img.shields.io/github/v/release/juananmuxed/clash-of-spears-api?include_prereleases&label=Release&logo=github) ![GitHub issues by-label](https://img.shields.io/github/issues/juananmuxed/clash-of-spears-api/bug?label=Bugs%20Opened&logo=github) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/juananmuxed/clash-of-spears-api?label=Activity&logo=github)

### Demo deploy status

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/juananmuxed/clash-of-spears-api/deploy.yml?label=Workflow)](https://cos.muxed.es) [![Website](https://img.shields.io/website?down_color=red&down_message=Offline&label=Website&up_color=green&up_message=Online&url=https://cos.muxed.es)](https://cos.muxed.es) 

## 🎱 Introduction

> *If your enemy is secure at all points, be prepared for him. If he is in superior strength, evade him. If your opponent is temperamental, seek to irritate him. Pretend to be weak, that he may grow arrogant. If he is taking his ease, give him no rest. If his forces are united, separate them. If sovereign and subject are in accord, put division between them. Attack him where he is unprepared, appear where you are not expected .* <br> - Sun tzu, The Art of War

This is a simple  **NOT OFICIAL** API REST to get data from game [Clash of Spears](https://www.fightinghedgehog.com/).

For any question about game use **Books** or contact the creators:
- [Fighting Hedgehog](https://www.fightinghedgehog.com/)
- [Clash of Spears Facebook](https://www.facebook.com/CLASHofSpears/)
- [The warhammer spot](http://www.thewargamespot.com/clash-of-spears/)

## ☕️ Buy Me a Coffee

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U21M2BE)

## 🐛 Report a bug

Please follow one of this links to report a bug:
- [Github issues](https://github.com/juananmuxed/clash-of-spears-api/issues)
- [Discord](https://discord.gg/88rzwfU)

## 💻 Development

To fix bugs or simply check code.

Requirements:

- Install MariaDB (and create a database called clash-of-spears)
- Node 12 at least

Clone the repo

```bash
git clone https://github.com/juananmuxed/clash-of-spears-api.git
```

Access to the folder

```bash
cd clash-of-spears-api
```

Run NPM to install dependencies and run dev environment

```bash
cd npm i
cd npm run dev
```

Clone .env.example or rename as .env

And you can access to the swagger via web browser in http://localhost:3000/swagger

## Docker production

Create a `.env.production` with params of DB and run `npm run docker:deploy` 

Remember you need a Database with a `name-of-table` table chosen in the `.env.production` file.

## 🏗 Built with

- [Express](https://expressjs.com/)

## 📌 Versions

Used [SemVer](http://semver.org/) for versions. For all available version, see [tags](https://github.com/juananmuxed/clash-of-spears-api/tags).

And here the [Changelog](CHANGELOG.md)

## 🍰 Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests.

## 📄 License

This project is under license (MIT) - see [LICENSE](LICENSE) for details.