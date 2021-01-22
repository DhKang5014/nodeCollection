const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

const HOST = "msg01.cloudiot.ntruss.com";
const PORT = 8883;
//const SUBSCRIBE_TOPIC = `alert`;
const SUBSCRIBE_TOPIC = `factory/temperature`;
const QOS = 1;

const certFolderPath = "./";
const KEY = fs.readFileSync(certFolderPath + `6a8709.private.pem`);
const CERT = fs.readFileSync(certFolderPath + `6a8709.cert.pem`);
const CA_CHAIN = fs.readFileSync(certFolderPath + `6a8709.caChain.pem`);
const TRUSTED_CA_LIST = fs.readFileSync(certFolderPath + `rootCaCert.pem`);
const FULL_CERTIFICATION = CERT+"\n"+CA_CHAIN;

let receivedIndex = 0;
let ConnIndex = 0 ;
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

  while(true) {
    console.log(ConnIndex,'횟수');
    ConnIndex++;
    await sleep(1000);
  }
})

// Subscribe to Message //
client.subscribe(SUBSCRIBE_TOPIC, {qos:QOS});

// Receiving Message //
client.on('message', async function (topic, message) {
  console.log(`<<< Subscribe from IoT server. topic : "${topic}", message(${receivedIndex}) : ${message.toString()}`);
  
  // 커넥션 횟수 조절
  receivedIndex++;

  //if (receivedIndex == 5) {
  //  client.end();
  //  console.log("=== Complete.")
  //}
})

client.on('close', function () {
  console.log("connection Close");
})

client.on('error', function (err) {
  console.log(err.toString());
})

const sleep = (ms) => {
     return new Promise(resolve=>{
         setTimeout(resolve,ms);
     })
 }