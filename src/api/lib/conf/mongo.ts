import * as mongoose from 'mongoose';
import env from '../env';

export class MongoConnection {
    public connect(): void {
        const mongo = 'mongodb://localhost/' + env.getDatabaseName();

        mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });

        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);

        const conn = mongoose.connection;

        conn.on('error', console.error.bind(console, 'MongoDB Connection Error!'));

        conn.once('open', () => console.log('Mongo Database Connection is established!'));
    }
}