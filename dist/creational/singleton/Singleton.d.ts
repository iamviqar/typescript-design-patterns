/**
 * Singleton Pattern
 * Ensures a class has only one instance and provides global access to it
 */
export declare class Singleton {
    private static instance;
    private data;
    private readonly timestamp;
    private constructor();
    static getInstance(): Singleton;
    addData(item: string): void;
    getData(): readonly string[];
    getTimestamp(): number;
    clearData(): void;
}
/**
 * Generic Singleton base class
 */
export declare abstract class GenericSingleton<T> {
    private static instances;
    protected constructor();
    static getInstance<U extends GenericSingleton<any>>(this: new () => U): U;
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
export declare class ConfigManager {
    private static instance;
    private config;
    private constructor();
    static getInstance(): ConfigManager;
    get<K extends keyof IConfig>(key: K): IConfig[K];
    set<K extends keyof IConfig>(key: K, value: IConfig[K]): void;
    getAll(): Readonly<IConfig>;
    update(updates: Partial<IConfig>): void;
}
/**
 * Database Connection - Thread-safe singleton
 */
export declare class DatabaseConnection {
    private static instance;
    private connectionString;
    private isConnected;
    private queries;
    private static lock;
    private constructor();
    static getInstance(): Promise<DatabaseConnection>;
    connect(): Promise<boolean>;
    disconnect(): void;
    query(sql: string): string;
    getQueryHistory(): readonly string[];
    isConnectionActive(): boolean;
}
/**
 * Logger Singleton with different log levels
 */
export declare enum LogLevel {
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
export declare class Logger {
    private static instance;
    private logs;
    private logLevel;
    private constructor();
    static getInstance(): Logger;
    setLogLevel(level: LogLevel): void;
    log(level: LogLevel, message: string, category?: string): void;
    debug(message: string, category?: string): void;
    info(message: string, category?: string): void;
    warn(message: string, category?: string): void;
    error(message: string, category?: string): void;
    getLogs(level?: LogLevel): readonly ILogEntry[];
    clearLogs(): void;
    private outputLog;
}
//# sourceMappingURL=Singleton.d.ts.map