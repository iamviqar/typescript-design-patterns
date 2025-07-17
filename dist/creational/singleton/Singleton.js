"use strict";
/**
 * Singleton Pattern
 * Ensures a class has only one instance and provides global access to it
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = exports.DatabaseConnection = exports.ConfigManager = exports.GenericSingleton = exports.Singleton = void 0;
class Singleton {
    constructor() {
        this.data = [];
        this.timestamp = Date.now();
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    addData(item) {
        this.data.push(item);
    }
    getData() {
        return [...this.data];
    }
    getTimestamp() {
        return this.timestamp;
    }
    clearData() {
        this.data = [];
    }
}
exports.Singleton = Singleton;
/**
 * Generic Singleton base class
 */
class GenericSingleton {
    constructor() {
        const className = this.constructor.name;
        if (GenericSingleton.instances.has(className)) {
            throw new Error(`Instance of ${className} already exists`);
        }
        GenericSingleton.instances.set(className, this);
    }
    static getInstance() {
        const className = this.name;
        if (!GenericSingleton.instances.has(className)) {
            new this();
        }
        return GenericSingleton.instances.get(className);
    }
}
exports.GenericSingleton = GenericSingleton;
GenericSingleton.instances = new Map();
class ConfigManager {
    constructor() {
        this.config = {
            apiUrl: 'https://api.example.com',
            timeout: 5000,
            retries: 3,
            debug: false
        };
    }
    static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }
    get(key) {
        return this.config[key];
    }
    set(key, value) {
        this.config[key] = value;
    }
    getAll() {
        return { ...this.config };
    }
    update(updates) {
        this.config = { ...this.config, ...updates };
    }
}
exports.ConfigManager = ConfigManager;
/**
 * Database Connection - Thread-safe singleton
 */
class DatabaseConnection {
    constructor() {
        this.isConnected = false;
        this.queries = [];
        this.connectionString = 'mongodb://localhost:27017/myapp';
    }
    static async getInstance() {
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
            }
            finally {
                DatabaseConnection.lock = false;
            }
        }
        return DatabaseConnection.instance;
    }
    async connect() {
        if (!this.isConnected) {
            console.log(`Connecting to ${this.connectionString}`);
            // Simulate async connection
            await new Promise(resolve => setTimeout(resolve, 100));
            this.isConnected = true;
        }
        return this.isConnected;
    }
    disconnect() {
        if (this.isConnected) {
            console.log('Disconnecting from database');
            this.isConnected = false;
        }
    }
    query(sql) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }
        this.queries.push(sql);
        return `Executed: ${sql}`;
    }
    getQueryHistory() {
        return [...this.queries];
    }
    isConnectionActive() {
        return this.isConnected;
    }
}
exports.DatabaseConnection = DatabaseConnection;
DatabaseConnection.lock = false;
/**
 * Logger Singleton with different log levels
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor() {
        this.logs = [];
        this.logLevel = LogLevel.INFO;
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    setLogLevel(level) {
        this.logLevel = level;
    }
    log(level, message, category) {
        if (level >= this.logLevel) {
            const entry = {
                level,
                message,
                timestamp: new Date(),
                category
            };
            this.logs.push(entry);
            this.outputLog(entry);
        }
    }
    debug(message, category) {
        this.log(LogLevel.DEBUG, message, category);
    }
    info(message, category) {
        this.log(LogLevel.INFO, message, category);
    }
    warn(message, category) {
        this.log(LogLevel.WARN, message, category);
    }
    error(message, category) {
        this.log(LogLevel.ERROR, message, category);
    }
    getLogs(level) {
        if (level !== undefined) {
            return this.logs.filter(log => log.level === level);
        }
        return [...this.logs];
    }
    clearLogs() {
        this.logs = [];
    }
    outputLog(entry) {
        const levelName = LogLevel[entry.level];
        const category = entry.category ? `[${entry.category}]` : '';
        console.log(`${entry.timestamp.toISOString()} [${levelName}]${category} ${entry.message}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Singleton.js.map