import env from './env';

class Logger {

    private instance: Logger;

    public getInstance(): Logger {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    public debugLog(msg: string = ''): void {
        if (env.isEnabledDebug() && msg !== '') {
            console.log(`[${new Date().toUTCString()}] ${msg}`);
        }
    }
}

export default new Logger().getInstance().debugLog;