"use strict";
/**
 * Singleton Pattern Demo
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.Logger = exports.DatabaseConnection = exports.ConfigManager = exports.Singleton = void 0;
exports.demonstrateSingleton = demonstrateSingleton;
const Singleton_1 = require("./Singleton");
Object.defineProperty(exports, "Singleton", { enumerable: true, get: function () { return Singleton_1.Singleton; } });
Object.defineProperty(exports, "ConfigManager", { enumerable: true, get: function () { return Singleton_1.ConfigManager; } });
Object.defineProperty(exports, "DatabaseConnection", { enumerable: true, get: function () { return Singleton_1.DatabaseConnection; } });
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return Singleton_1.Logger; } });
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return Singleton_1.LogLevel; } });
async function demonstrateSingleton() {
    console.log('=== Singleton Pattern Demo ===\n');
    // Basic Singleton Demo
    console.log('1. Basic Singleton:');
    const singleton1 = Singleton_1.Singleton.getInstance();
    const singleton2 = Singleton_1.Singleton.getInstance();
    console.log(`Same instance: ${singleton1 === singleton2}`);
    singleton1.addData('First item');
    singleton1.addData('Second item');
    console.log(`Data from singleton1: ${JSON.stringify(singleton1.getData())}`);
    console.log(`Data from singleton2: ${JSON.stringify(singleton2.getData())}`);
    console.log(`Timestamp: ${new Date(singleton1.getTimestamp()).toISOString()}\n`);
    // Configuration Manager Demo
    console.log('2. Configuration Manager:');
    const config1 = Singleton_1.ConfigManager.getInstance();
    const config2 = Singleton_1.ConfigManager.getInstance();
    console.log(`Same config instance: ${config1 === config2}`);
    console.log(`API URL: ${config1.get('apiUrl')}`);
    config1.set('timeout', 10000);
    console.log(`Timeout from config2: ${config2.get('timeout')}`);
    config1.update({ debug: true, retries: 5 });
    console.log(`Updated config: ${JSON.stringify(config1.getAll())}\n`);
    // Database Connection Demo
    console.log('3. Database Connection:');
    const db1 = await Singleton_1.DatabaseConnection.getInstance();
    const db2 = await Singleton_1.DatabaseConnection.getInstance();
    console.log(`Same DB instance: ${db1 === db2}`);
    await db1.connect();
    console.log(`Connection active: ${db1.isConnectionActive()}`);
    try {
        db1.query('SELECT * FROM users');
        db1.query('SELECT * FROM products');
        console.log(`Query history: ${JSON.stringify(db1.getQueryHistory())}`);
    }
    catch (error) {
        console.error(`Database error: ${error}`);
    }
    db1.disconnect();
    console.log(`Connection after disconnect: ${db1.isConnectionActive()}\n`);
    // Logger Demo
    console.log('4. Logger Singleton:');
    const logger1 = Singleton_1.Logger.getInstance();
    const logger2 = Singleton_1.Logger.getInstance();
    console.log(`Same logger instance: ${logger1 === logger2}`);
    logger1.setLogLevel(Singleton_1.LogLevel.DEBUG);
    logger1.debug('Debug message', 'SYSTEM');
    logger1.info('Info message', 'APP');
    logger1.warn('Warning message', 'SECURITY');
    logger1.error('Error message', 'DATABASE');
    console.log(`Total logs: ${logger1.getLogs().length}`);
    console.log(`Error logs: ${logger1.getLogs(Singleton_1.LogLevel.ERROR).length}\n`);
    // Demonstrate thread-safety with async operations
    console.log('5. Concurrent Access Test:');
    const promises = Array.from({ length: 5 }, async (_, i) => {
        const db = await Singleton_1.DatabaseConnection.getInstance();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
        return db;
    });
    const dbInstances = await Promise.all(promises);
    const allSame = dbInstances.every(db => db === dbInstances[0]);
    console.log(`All async instances are same: ${allSame}`);
    console.log('\n=== Singleton Pattern Demo Complete ===');
}
//# sourceMappingURL=Demo.js.map