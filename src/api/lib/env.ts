enum Environments {
    LOCAL_MAC = 'mac',
    LOCAL_WINDOWS = 'win',
    DEV_SERVER = 'dev',
    PROD_SERVER = 'prod',
    QA_SERVER = 'qa'
}

const AppInfo = {
    codeName: 'DevX RESTful API',
    prefix: 'devx_admin',
    key: '12345678',
    postfixLength: 5
};

class Environment {
    public PORT = 3026;
    private enableDebug = false;
    private environment: string;

    constructor(environment: string, enableDebugger: boolean = false) {
        this.environment = environment;
        this.enableDebug = enableDebugger;
        if (this.checkRequirements()) {
            this.debug('RESTful API has one or more errors. Please check for errors.');
            this.debug('Exiting...');
            this.exitProcess();
        }
    }

    private debug(msg: string): void {
        console.log(`[${new Date().toUTCString()}] ${msg}`);
    }

    private exitProcess(): void {
        process.exit(1);
    }

    public isEnabledDebug(): boolean {
        return this.enableDebug;
    }

    public getDatabaseName(): string {
        return `db_${AppInfo.prefix}_${this.environment}`;
    }

    public getAppInfo(): any {
        return AppInfo;
    }

    private checkRequirements(): boolean {
        let error = false;
        if (this.environment === '') {
            error = true;
            this.debug('Environment specification is not found!.Please check the env.js');
        }
        if (Object.keys(AppInfo).length === 0) {
            error = true;
            this.debug('AppInfo is not found!.Please check the env.js');
        }
        if (AppInfo && AppInfo.codeName && AppInfo.codeName === '') {
            error = true;
            this.debug('AppInfo.codename is not defined!.Please check the env.js');
        }
        if (AppInfo && AppInfo.prefix && AppInfo.prefix === '') {
            error = true;
            this.debug('AppInfo.prefix is not defined!.Please check the env.js');
        }
        if (AppInfo && AppInfo.key && (AppInfo.key === '' || AppInfo.key.length < 8)) {
            error = true;
            this.debug('AppInfo.key is not defined or minimum length is not found!.Please check the env.js');
        }
        if (AppInfo && AppInfo.postfixLength === null && AppInfo.postfixLength === undefined && AppInfo.postfixLength < 0) {
            error = true;
            this.debug('AppInfo.postfixLength is not defined or minimum length is not found!.Please check the env.js');
        }
        return error;
    }
}

export default new Environment(Environments.LOCAL_WINDOWS, true);
