const AWS = require('aws-sdk');

module.exports = class ClientSQS {
  constructor({ queueUrl, region } = {}) {
    this.init({ region });
    this.config = {
      queueUrl,
    };
    this.sqs = new AWS.SQS();
  }

  init({ region }) {
    AWS.config.update({ region });
  }

  async sendMessage(message = 'empty') {
    return this.sqs.sendMessage({
      QueueUrl: this.config.queueUrl,
      MessageBody: JSON.stringify(message),
    }).promise();
  }

  async receiveMessage() {
    return this.sqs.receiveMessage({
      QueueUrl: this.config.queueUrl,
      WaitTimeSeconds: 20
    }).promise();
  }

  async deleteMessage(message) {
    return this.sqs.deleteMessage({
      QueueUrl: this.config.queueUrl,
      ReceiptHandle: message.Messages[0].ReceiptHandle
    }).promise();
  }

}

