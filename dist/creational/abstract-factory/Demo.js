"use strict";
/**
 * Abstract Factory Pattern Demo
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demonstrateAbstractFactory = demonstrateAbstractFactory;
const AbstractFactory_1 = require("./AbstractFactory");
async function demonstrateAbstractFactory() {
    console.log('=== Abstract Factory Pattern Demo ===\n');
    // GUI Factory Demo
    console.log('1. Cross-Platform GUI Application:');
    const platforms = ['windows', 'macos', 'linux'];
    platforms.forEach(platform => {
        console.log(`\n--- ${platform.toUpperCase()} Application ---`);
        const factory = (0, AbstractFactory_1.getGUIFactory)(platform);
        const app = new AbstractFactory_1.Application(factory);
        app.setupUI();
        console.log(app.render());
        app.handleButtonClick();
        app.closeApplication();
    });
    console.log('\n2. Database Factory Demo:');
    // MySQL Demo
    console.log('\n--- MySQL Database ---');
    const mysqlFactory = (0, AbstractFactory_1.getDatabaseFactory)('mysql');
    const mysqlDb = mysqlFactory.createDatabase();
    const mysqlTx = mysqlFactory.createTransaction();
    const mysqlMigration = mysqlFactory.createMigration();
    try {
        console.log(await mysqlDb.connect());
        console.log(mysqlDb.getConnectionInfo());
        await mysqlTx.begin();
        console.log(await mysqlDb.query('SELECT * FROM users'));
        console.log(await mysqlDb.query('UPDATE users SET active = 1'));
        await mysqlTx.commit();
        console.log(await mysqlMigration.migrate());
        console.log(`Migration version: ${mysqlMigration.getVersion()}`);
        await mysqlDb.disconnect();
    }
    catch (error) {
        console.error(`MySQL error: ${error}`);
        await mysqlTx.rollback();
    }
    // PostgreSQL Demo
    console.log('\n--- PostgreSQL Database ---');
    const pgFactory = (0, AbstractFactory_1.getDatabaseFactory)('postgresql');
    const pgDb = pgFactory.createDatabase();
    const pgTx = pgFactory.createTransaction();
    const pgMigration = pgFactory.createMigration();
    try {
        console.log(await pgDb.connect());
        console.log(pgDb.getConnectionInfo());
        await pgTx.begin();
        console.log(await pgDb.query('SELECT * FROM products'));
        console.log(await pgDb.query('INSERT INTO products (name) VALUES (\'New Product\')'));
        await pgTx.commit();
        console.log(await pgMigration.migrate());
        console.log(`Migration version: ${pgMigration.getVersion()}`);
        await pgDb.disconnect();
    }
    catch (error) {
        console.error(`PostgreSQL error: ${error}`);
        await pgTx.rollback();
    }
    // Advanced usage: Multiple applications
    console.log('\n3. Multiple Platform Applications:');
    const appConfigs = [
        { platform: 'windows', title: 'Windows Text Editor' },
        { platform: 'macos', title: 'macOS Image Viewer' },
        { platform: 'linux', title: 'Linux Terminal' }
    ];
    appConfigs.forEach(config => {
        const factory = (0, AbstractFactory_1.getGUIFactory)(config.platform);
        const app = new AbstractFactory_1.Application(factory);
        app.setupUI();
        console.log(`\n${config.title}:`);
        console.log(app.render());
    });
    // Demonstrate family consistency
    console.log('\n4. Component Family Consistency:');
    const windowsFactory = (0, AbstractFactory_1.getGUIFactory)('windows');
    const macosFactory = (0, AbstractFactory_1.getGUIFactory)('macos');
    const windowsButton = windowsFactory.createButton();
    const windowsWindow = windowsFactory.createWindow();
    const macosButton = macosFactory.createButton();
    const macosWindow = macosFactory.createWindow();
    console.log('Windows family:');
    console.log(`  ${windowsButton.render()}`);
    console.log(`  ${windowsWindow.render()}`);
    console.log('macOS family:');
    console.log(`  ${macosButton.render()}`);
    console.log(`  ${macosWindow.render()}`);
    console.log('\n=== Abstract Factory Pattern Demo Complete ===');
}
// Export for external usage
__exportStar(require("./AbstractFactory"), exports);
//# sourceMappingURL=Demo.js.map