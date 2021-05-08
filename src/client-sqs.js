const AWS = require('aws-sdk');

const { AWS_QUEUE_URL, AWS_REGION } = process.env;
module.exports = class ClientSQS {
  constructor() {
    this.init(AWS_REGION);
    this.config = {
      QueueUrl: AWS_QUEUE_URL
    };
    this.sqs = new AWS.SQS();
  }

  static getInstance() {
    if(!this.instance) this.instance = new ClientSQS();
    return this.instance;
  }

  init(region) {
    AWS.config.update({ region });
  }

  async sendMessage(message = 'empty') {
    return this.sqs.sendMessage({
      ...this.config,
      MessageBody: JSON.stringify(message),
    }).promise();
  }

  async receiveMessage() {
    return this.sqs.receiveMessage({
      ...this.config,
      WaitTimeSeconds: 20
    }).promise();
  }

  async deleteMessage(message) {
    return this.sqs.deleteMessage({
      ...this.config,
      ReceiptHandle: message.Messages[0].ReceiptHandle
    }).promise();
  }

}

