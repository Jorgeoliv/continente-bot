# continente-bot

## Build & run

Create a `.env` file first. Example:

```
MATCH_WEEK=5 # The match week that you are interested to know if there are tickets available
TELEGRAM_BOT_TOKEN=your_telegram_bot_token # You can get a bot from @BotFather
TELEGRAM_BOT_CHAT_ID=your_telegram_bot_chat # The chat ID to receive the messages
```

### Run with Docker

`docker-compose build` to build the image

`docker-compose up` to execute the script

### Run local

`yarn` to install the dependencies

`yarn test` to run the script
