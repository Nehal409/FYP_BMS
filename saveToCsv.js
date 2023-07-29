/** When the battery readings are recieved save them to csv */

const receivedMessages = [];

client.on("message", function (topic, message) {
  // Called each time a message is received
  console.log("Received message:", topic, message.toString());

  // Push the received message to the receivedMessages array
  receivedMessages.push({
    topic: topic,
    message: message.toString(),
    timestamp: new Date().toISOString(),
  });
});

// Function to save received messages to CSV file
function saveMessagesToCSV() {
  const csvContent = receivedMessages
    .map((msg) => `${msg.timestamp},${msg.topic},${msg.message}`)
    .join("\n");
  const header = "Timestamp,Topic,Message\n";
  const csvData = header + csvContent;

  fs.writeFile("batterReadings.csv", csvData, function (err) {
    if (err) {
      console.error("Error saving messages to CSV file:", err);
    } else {
      console.log("Messages saved to CSV file");
    }
  });
}

// Call saveMessagesToCSV function at a desired interval (e.g., every 10 seconds)
setInterval(saveMessagesToCSV, 10000);
