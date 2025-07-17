/**
 * Singleton Pattern
 * Ensures a class has only one instance and provides global access to it
 */

export class Singleton {
    private static instance: Singleton;
    private data: string[] = [];
    private readonly timestamp: number;

    private constructor() {
        this.timestamp = Date.now();
    }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public addData(item: string): void {
        this.data.push(item);
    }

    public getData(): readonly string[] {
        return [...this.data];
    }

    public getTimestamp(): number {
        return this.timestamp;
    }

    public clearData(): void {
        this.data = [];
    }
}

/**
 * Generic Singleton base class
 */
export abstract class GenericSingleton<T> {
    private static instances: Map<string, any> = new Map();

    protected constructor() {
        const className = this.constructor.name;
        if (GenericSingleton.instances.has(className)) {
            throw new Error(`Instance of ${className} already exists`);
        }
        GenericSingleton.instances.set(className, this);
    }

    public static getInstance<U extends GenericSingleton<any>>(
        this: new () => U
    ): U {
        const className = this.name;
        if (!GenericSingleton.instances.has(className)) {
            new this();
        }
        return GenericSingleton.instances.get(className) as U;
    }
}

/**
 * Configuration Manager - Real-world example
 */
export interface IConfig {
    apiUrl: string;
    timeout: number;
    retries: number;
    debug: boolean;
}

export class ConfigManager {
    private static instance: ConfigManager;
    private config: IConfig;

    private constructor() {
        this.config = {
            apiUrl: 'https://api.example.com',
            timeout: 5000,
            retries: 3,
            debug: false
        };
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    public get<K extends keyof IConfig>(key: K): IConfig[K] {
        return this.config[key];
    }

    public set<K extends keyof IConfig>(key: K, value: IConfig[K]): void {
        this.config[key] = value;
    }

    public getAll(): Readonly<IConfig> {
        return { ...this.config };
    }

    public update(updates: Partial<IConfig>): void {
        this.config = { ...this.config, ...updates };
    }
}

/**
 * Database Connection - Thread-safe singleton
 */
export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connectionString: string;
    private isConnected: boolean = false;
    private queries: string[] = [];
    private static lock: boolean = false;

    private constructor() {
        this.connectionString = 'mongodb://localhost:27017/myapp';
    }

    public static async getInstance(): Promise<DatabaseConnection> {
        if (!DatabaseConnection.instance) {
            if (DatabaseConnection.lock) {
                // Wait for initialization to complete
                while (DatabaseConnection.lock) {
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
                return DatabaseConnection.instance;
            }
            
            DatabaseConnection.lock = true;
            try {
                if (!DatabaseConnection.instance) {
                    DatabaseConnection.instance = new DatabaseConnection();
                }
            } finally {
                DatabaseConnection.lock = false;
            }
        }
        return DatabaseConnection.instance;
    }

    public async connect(): Promise<boolean> {
        if (!this.isConnected) {
            console.log(`Connecting to ${this.connectionString}`);
            // Simulate async connection
            await new Promise(resolve => setTimeout(resolve, 100));
            this.isConnected = true;
        }
        return this.isConnected;
    }

    public disconnect(): void {
        if (this.isConnected) {
            console.log('Disconnecting from database');
            this.isConnected = false;
        }
    }

    public query(sql: string): string {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }
        this.queries.push(sql);
        return `Executed: ${sql}`;
    }

    public getQueryHistory(): readonly string[] {
        return [...this.queries];
    }

    public isConnectionActive(): boolean {
        return this.isConnected;
    }
}

/**
 * Logger Singleton with different log levels
 */
export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

export interface ILogEntry {
    level: LogLevel;
    message: string;
    timestamp: Date;
    category?: string;
}

export class Logger {
    private static instance: Logger;
    private logs: ILogEntry[] = [];
    private logLevel: LogLevel = LogLevel.INFO;

    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    public log(level: LogLevel, message: string, category?: string): void {
        if (level >= this.logLevel) {
            const entry: ILogEntry = {
                level,
                message,
                timestamp: new Date(),
                category
            };
            this.logs.push(entry);
            this.outputLog(entry);
        }
    }

    public debug(message: string, category?: string): void {
        this.log(LogLevel.DEBUG, message, category);
    }

    public info(message: string, category?: string): void {
        this.log(LogLevel.INFO, message, category);
    }

    public warn(message: string, category?: string): void {
        this.log(LogLevel.WARN, message, category);
    }

    public error(message: string, category?: string): void {
        this.log(LogLevel.ERROR, message, category);
    }

    public getLogs(level?: LogLevel): readonly ILogEntry[] {
        if (level !== undefined) {
            return this.logs.filter(log => log.level === level);
        }
        return [...this.logs];
    }

    public clearLogs(): void {
        this.logs = [];
    }

    private outputLog(entry: ILogEntry): void {
        const levelName = LogLevel[entry.level];
        const category = entry.category ? `[${entry.category}]` : '';
        console.log(`${entry.timestamp.toISOString()} [${levelName}]${category} ${entry.message}`);
    }
}
