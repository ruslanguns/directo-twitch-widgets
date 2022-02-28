# Widgets for Twitch Content Creators

## Description

This application is built on top of [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository and React.js frontend (using Vite). It is a simple application that allows you to create widgets for Twitch.tv.

## Available Twitch chat commands

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `hola`        | When it finds hello in the message   |
| `!bot-saluda` | Bot send a message to who call it    |
| `!confetti`   | Send confetti, ideal for celebration |
| `!redes`      | Share social networks                |
| `!github`     | Share github                         |
| `!twitter`    | Share twitter                        |
| `!twitch`     | Share twitch                         |
| `!linkedin`   | Share Linkedin                       |

## Widgets available

> **Note:** I am assuming you're running server on port 3000.

|    Widget     |                Description                 |
| :-----------: | :----------------------------------------: |
|     Chat      |           http://localhost:3000            |
| Selected Chat | http://localhost:3000/widget/selected-chat |
|   Confetti    |   http://localhost:3000/widget/confetti    |

## API Endpoints

| Endpoint             | Method | Description                    | Required search parameters |
| -------------------- | ------ | ------------------------------ | -------------------------- |
| `/api/chat`          | GET    | Get all chats                  | skip: int, take: int       |
| `/api/chat/selected` | GET    | Get selected chat              | none                       |
| `/api/chat/all`      | DELETE | Delete/Prune all chats from DB | none                       |
| `/api/chat/:chatId`  | DELETE | Delete one chat                | none                       |

## Socket Events available

| Event name      | Direction | Description                                 |
| --------------- | --------- | ------------------------------------------- |
| `selected-chat` | Pub / Sub | Set selected chat, emits the chat body      |
| `confetti`      | Sub       | Triggers when confetti is sent, emits ovoid |

## Web application

Application is available at http://localhost:3000 and can be accessed by any browser, the following routes will be available:

- `/`: Home page
- `/widget/selected-chat`: Selected chat widget
- `/widget/confetti`: Confetti widget

## Installation

For better development experience I'm using [pnpm](https://pnpm.js.org/) as the package manager for the project.

This server will be running on port 3000, if you want to change it you can do it by editing the client/src/constants.js with the localhost:<PORT>... and when starting the app make sure you're using PORT environment variable. `PORT=3000 pnpm start:prod`

> Is required to setup the environments with the proper Operating Systems Variables, that's why I am providing the `.env.sample` file so you can easily setup the environment variables, by just renaming it to `.env` and adding the proper values.

```bash
$ pnpm install && cd client && pnpm install
```

## Build client & server

```bash
$ pnpm run build
```

## Running the app

```bash
# development the server
$ pnpm run start

# watch mode & development the client
$ cd client && pnpm run dev

# watch mode server
$ pnpm run start:dev

# production mode (client & server)
$ pnpm run start:prod
```

## Stay in touch

- Author - [Ruslan Gonzalez](https://github.com/ruslanguns)
- Twitter - [@ruslangonzalez](https://twitter.com/ruslanguns)
- Twitch - [@rusgunx](https://twitch.tv/rusgunx)
