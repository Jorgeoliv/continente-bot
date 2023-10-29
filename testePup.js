import puppeteer from 'puppeteer';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const MATCH_WEEK = process.env.MATCH_WEEK;

const sendTelegramMessage = async () => {
  // replace the value below with the Telegram token you receive from @BotFather
  const token = process.env.TELEGRAM_BOT_TOKEN;
  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(token);

  await bot.sendMessage(process.env.TELEGRAM_BOT_CHAT_ID, `New tickets available on matchweek ${MATCH_WEEK}`);
}

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  // const browser = await puppeteer.launch({ headless: false });
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   slowMo: 250, // slow down by 250ms
  // });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://feed.continente.pt/liga-portugal#102926');

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const confirmCookiesBtn = await page.$('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
  await confirmCookiesBtn.click();

  const primeiraLiga = await page.waitForSelector('.selectedTagContent');
  const matchWeek = await primeiraLiga.waitForSelector(`[data-round="liga_1_jornada_${MATCH_WEEK}"]`)

  await matchWeek.waitForSelector('.game__priceGroup', { timeout: 5000 });

  await browser.close();

  await sendTelegramMessage();
})();