const dotenv = require('dotenv')
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { TIMEOUT } = require('dns');
const { syncBuiltinESMExports } = require('module');

dotenv.config() // configuring dotenv

const token = process.env.TELEGRAM_BOT_API_TOKEN;

const channel = process.env.CHANNEL_NAME; 

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: false});

async function sleep() {
    return new Promise(resolve => {
        setTimeout(() => {
         console.log("sleeped")
            resolve()
        }, 10000)
    })
} 
async function getQuote() {
    await sleep()
    axios.get('https://api.quotable.io/random')
    .then(function (response) {
      // handle success
     // console.log(response.data);
      // sending message to the channel
      bot.sendMessage(channel, `${response.data.content}\n\n${response.data.author}`) 
      console.log('Quote to Channel was sent')
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }




async function publishQuotes(n) {
    for (var i = 0; i < n; i++) {
        // for (var i = 0; i < Infinity; i++) {
       await getQuote()
     
}
}

publishQuotes(2)