const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function runCompletion(message) {
    const completion = await openai.createChatCompletion({
        model:"AI-3",
        prompt: message,
        max_tokens: 200
    })

    return completion.data.choices[0]
}

const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
});


client.initialize();
client.on('authenticated', () => {
    console.log('Authenticated');
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    if (message.body) {
        var pesan = message.body;
        var dataArray = pesan.split("#");
        var nama = dataArray[1].split(":")[1].trim();
        var umur = dataArray[2].split(":")[1].trim();
        var nokar = dataArray[3].split(":")[1].trim();

        var balasan = "Anda menginputkan:\n" +
            "Nama: " + nama + "\n" +
            "Umur: " + umur + "\n" +
            "Nokar: " + nokar;

        client.sendMessage(message.from, balasan);
    }
});
