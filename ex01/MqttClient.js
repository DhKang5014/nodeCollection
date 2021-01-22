const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

const HOST = "msg01.cloudiot.ntruss.com";
const PORT = 8883;
const PUBLISH_TOPIC = `factory/temperature`;
const SUBSCRIBE_TOPIC = `alert`;
const QOS = 1;

const certFolderPath = "./";
const KEY = fs.readFileSync(certFolderPath + `6a8709.private.pem`);
const CERT = fs.readFileSync(certFolderPath + `6a8709.cert.pem`);
const CA_CHAIN = fs.readFileSync(certFolderPath + `6a8709.caChain.pem`);
const TRUSTED_CA_LIST = fs.readFileSync(certFolderPath + `rootCaCert.pem`);
const FULL_CERTIFICATION = CERT+"\n"+CA_CHAIN;

let receivedIndex = 0;

const connectionInfo = {
  port: PORT,
  host: HOST,
  key: KEY,
  cert: FULL_CERTIFICATION,
  ca: TRUSTED_CA_LIST,
  rejectUnauthorized: true,
  protocol: 'mqtts',
  connectTimeout: 60 * 1000,
  keepalive: 1000,
}

const client = mqtt.connect(connectionInfo);

// Connetion to mqtt message broker //
client.on('connect', async function () {
  console.log('=== Successfully Connected');

  for (let i = 0; i < 5; i++) {
    await sleep(1000);
    sendMessage();
  }
})

// Subscribe to Message //
function sendMessage() {
  console.log(">>> Publish to IoT server.")
  client.publish(PUBLISH_TOPIC, getMsg())
}

// Subscribe to Message //
client.subscribe(SUBSCRIBE_TOPIC, {qos:QOS});

// Receiving Message //
client.on('message', async function (topic, message) {
  console.log(`<<< Subscribe from IoT server. topic : "${topic}", message(${receivedIndex}) : ${message.toString()}`);
  receivedIndex++;

  if (receivedIndex == 5) {
    client.end();
    console.log("=== Complete.")
  }
})

client.on('close', function () {
  console.log("connection Close");
})

client.on('error', function (err) {
  console.log(err.toString());
})

function getMsg () {
  const timeStamp = Math.floor(new Date() / 1000);
  const msg = `{"battery":9,"date":"2016-12-15","deviceId":"device_1","deviceType":"temperature","time":"15:12:00","value":35}`;
  return msg;
}

const sleep = (ms) => {
     return new Promise(resolve=>{
         setTimeout(resolve,ms);
     })
 }