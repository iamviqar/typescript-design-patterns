/**
 * Singleton Pattern Demo
 */

import { 
    Singleton, 
    ConfigManager, 
    DatabaseConnection, 
    Logger, 
    LogLevel 
} from './Singleton';

export async function demonstrateSingleton(): Promise<void> {
    console.log('=== Singleton Pattern Demo ===\n');

    // Basic Singleton Demo
    console.log('1. Basic Singleton:');
    const singleton1 = Singleton.getInstance();
    const singleton2 = Singleton.getInstance();
    
    console.log(`Same instance: ${singleton1 === singleton2}`);
    
    singleton1.addData('First item');
    singleton1.addData('Second item');
    
    console.log(`Data from singleton1: ${JSON.stringify(singleton1.getData())}`);
    console.log(`Data from singleton2: ${JSON.stringify(singleton2.getData())}`);
    console.log(`Timestamp: ${new Date(singleton1.getTimestamp()).toISOString()}\n`);

    // Configuration Manager Demo
    console.log('2. Configuration Manager:');
    const config1 = ConfigManager.getInstance();
    const config2 = ConfigManager.getInstance();
    
    console.log(`Same config instance: ${config1 === config2}`);
    console.log(`API URL: ${config1.get('apiUrl')}`);
    
    config1.set('timeout', 10000);
    console.log(`Timeout from config2: ${config2.get('timeout')}`);
    
    config1.update({ debug: true, retries: 5 });
    console.log(`Updated config: ${JSON.stringify(config1.getAll())}\n`);

    // Database Connection Demo
    console.log('3. Database Connection:');
    const db1 = await DatabaseConnection.getInstance();
    const db2 = await DatabaseConnection.getInstance();
    
    console.log(`Same DB instance: ${db1 === db2}`);
    
    await db1.connect();
    console.log(`Connection active: ${db1.isConnectionActive()}`);
    
    try {
        db1.query('SELECT * FROM users');
        db1.query('SELECT * FROM products');
        console.log(`Query history: ${JSON.stringify(db1.getQueryHistory())}`);
    } catch (error) {
        console.error(`Database error: ${error}`);
    }
    
    db1.disconnect();
    console.log(`Connection after disconnect: ${db1.isConnectionActive()}\n`);

    // Logger Demo
    console.log('4. Logger Singleton:');
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();
    
    console.log(`Same logger instance: ${logger1 === logger2}`);
    
    logger1.setLogLevel(LogLevel.DEBUG);
    logger1.debug('Debug message', 'SYSTEM');
    logger1.info('Info message', 'APP');
    logger1.warn('Warning message', 'SECURITY');
    logger1.error('Error message', 'DATABASE');
    
    console.log(`Total logs: ${logger1.getLogs().length}`);
    console.log(`Error logs: ${logger1.getLogs(LogLevel.ERROR).length}\n`);
    
    // Demonstrate thread-safety with async operations
    console.log('5. Concurrent Access Test:');
    const promises = Array.from({ length: 5 }, async (_, i) => {
        const db = await DatabaseConnection.getInstance();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
        return db;
    });
    
    const dbInstances = await Promise.all(promises);
    const allSame = dbInstances.every(db => db === dbInstances[0]);
    console.log(`All async instances are same: ${allSame}`);
    
    console.log('\n=== Singleton Pattern Demo Complete ===');
}

// Export for external usage
export {
    Singleton,
    ConfigManager,
    DatabaseConnection,
    Logger,
    LogLevel
};
