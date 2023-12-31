var mqtt = require("mqtt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

var options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: "mqtts",
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on("connect", function () {
  console.log("Connected");
});

client.on("error", function (error) {
  console.log(error);
});

client.on("message", function (topic, message) {
  // called each time a message is received
  console.log("Received message:", topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe("my/test/topic");

// publish message 'Hello' to topic 'my/test/topic'
client.publish("my/test/topic", "Hello");

// MongoDB configs
const db = process.env.MONGO_URI;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// db connection
const connect = () => {
  mongoose
    .connect(db, dbOptions)
    .then(() => {
      console.log('Database connection successful...');
    })
    .catch((err) => {
      throw err;
    });
};

// connect();
