require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  startAutoBump();
});

function startAutoBump() {
  const channelId = process.env.CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.error('❌ Channel not found');
    return;
  }

  setInterval(() => {
    channel.send('/bump')
      .then(() => console.log('✅ Bump command sent'))
      .catch(console.error);
  }, 24 * 60 * 60 * 1000); // every 2 hours
}

client.login(process.env.DISCORD_TOKEN);