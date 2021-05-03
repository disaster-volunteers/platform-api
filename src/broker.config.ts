import { Transport } from '@nestjs/microservices';

export const BROKER_TRANSPORT = Transport.RMQ;
export const BROKER_OPTS = {
  urls: [
    `amqp://${process.env.BROKER_HOST || 'localhost'}:${
      process.env.BROKER_PORT || '5672'
    }`,
  ],
  queue: 'disasters_queue',
  queueOptions: {
    durable: true,
  },
};
