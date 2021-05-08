(async () => {
  require('dotenv').config();
  const ClientSQS = require('./client-sqs');

  const SQS = ClientSQS.getInstance();

  try {
    await SQS.sendMessage({
      id: 1,
      name: `Microbiano ${new Date()}`,
      age: 32
    });

    const message = await SQS.receiveMessage();
    await SQS.deleteMessage(message);

    console.log(message);
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }

})();