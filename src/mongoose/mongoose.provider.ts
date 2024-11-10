import * as mongoose from 'mongoose';

export const mongooseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect('mongodb://localhost:27017/social_network_posts'),
};