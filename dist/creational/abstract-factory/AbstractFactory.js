"use strict";
/**
 * Abstract Factory Pattern
 * Provide an interface for creating families of related objects
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLFactory = exports.MySQLFactory = exports.PostgreSQLMigration = exports.PostgreSQLTransaction = exports.PostgreSQLDatabase = exports.MySQLMigration = exports.MySQLTransaction = exports.MySQLDatabase = exports.DatabaseAbstractFactory = exports.Application = exports.LinuxFactory = exports.MacOSFactory = exports.WindowsFactory = exports.LinuxMenu = exports.LinuxWindow = exports.LinuxButton = exports.MacOSMenu = exports.MacOSWindow = exports.MacOSButton = exports.WindowsMenu = exports.WindowsWindow = exports.WindowsButton = void 0;
exports.getGUIFactory = getGUIFactory;
exports.getDatabaseFactory = getDatabaseFactory;
// Concrete Products - Windows
class WindowsButton {
    constructor() {
        this.enabled = true;
    }
    render() {
        return `[Windows Button] ${this.enabled ? 'Enabled' : 'Disabled'}`;
    }
    onClick() {
        if (this.enabled) {
            console.log('Windows button clicked!');
        }
    }
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    isEnabled() {
        return this.enabled;
    }
}
exports.WindowsButton = WindowsButton;
class WindowsWindow {
    constructor() {
        this.title = 'Windows Window';
    }
    render() {
        return `[Windows Window: ${this.title}]`;
    }
    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }
    close() {
        console.log(`Closing Windows window: ${this.title}`);
    }
}
exports.WindowsWindow = WindowsWindow;
class WindowsMenu {
    constructor() {
        this.items = [];
    }
    render() {
        return `[Windows Menu] Items: ${this.items.join(', ')}`;
    }
    addItem(item) {
        this.items.push(item);
    }
    getItems() {
        return [...this.items];
    }
}
exports.WindowsMenu = WindowsMenu;
// Concrete Products - macOS
class MacOSButton {
    constructor() {
        this.enabled = true;
    }
    render() {
        return `(macOS Button) ${this.enabled ? 'Enabled' : 'Disabled'}`;
    }
    onClick() {
        if (this.enabled) {
            console.log('macOS button clicked!');
        }
    }
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    isEnabled() {
        return this.enabled;
    }
}
exports.MacOSButton = MacOSButton;
class MacOSWindow {
    constructor() {
        this.title = 'macOS Window';
    }
    render() {
        return `(macOS Window: ${this.title})`;
    }
    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }
    close() {
        console.log(`Closing macOS window: ${this.title}`);
    }
}
exports.MacOSWindow = MacOSWindow;
class MacOSMenu {
    constructor() {
        this.items = [];
    }
    render() {
        return `(macOS Menu) Items: ${this.items.join(' | ')}`;
    }
    addItem(item) {
        this.items.push(item);
    }
    getItems() {
        return [...this.items];
    }
}
exports.MacOSMenu = MacOSMenu;
// Concrete Products - Linux
class LinuxButton {
    constructor() {
        this.enabled = true;
    }
    render() {
        return `{Linux Button} ${this.enabled ? 'Enabled' : 'Disabled'}`;
    }
    onClick() {
        if (this.enabled) {
            console.log('Linux button clicked!');
        }
    }
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    isEnabled() {
        return this.enabled;
    }
}
exports.LinuxButton = LinuxButton;
class LinuxWindow {
    constructor() {
        this.title = 'Linux Window';
    }
    render() {
        return `{Linux Window: ${this.title}}`;
    }
    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }
    close() {
        console.log(`Closing Linux window: ${this.title}`);
    }
}
exports.LinuxWindow = LinuxWindow;
class LinuxMenu {
    constructor() {
        this.items = [];
    }
    render() {
        return `{Linux Menu} Items: [${this.items.join('] [')}]`;
    }
    addItem(item) {
        this.items.push(item);
    }
    getItems() {
        return [...this.items];
    }
}
exports.LinuxMenu = LinuxMenu;
// Concrete Factories
class WindowsFactory {
    createButton() {
        return new WindowsButton();
    }
    createWindow() {
        return new WindowsWindow();
    }
    createMenu() {
        return new WindowsMenu();
    }
}
exports.WindowsFactory = WindowsFactory;
class MacOSFactory {
    createButton() {
        return new MacOSButton();
    }
    createWindow() {
        return new MacOSWindow();
    }
    createMenu() {
        return new MacOSMenu();
    }
}
exports.MacOSFactory = MacOSFactory;
class LinuxFactory {
    createButton() {
        return new LinuxButton();
    }
    createWindow() {
        return new LinuxWindow();
    }
    createMenu() {
        return new LinuxMenu();
    }
}
exports.LinuxFactory = LinuxFactory;
// Client code that works with families of related products
class Application {
    constructor(factory) {
        this.button = factory.createButton();
        this.window = factory.createWindow();
        this.menu = factory.createMenu();
    }
    setupUI() {
        this.window.setTitle('My Application');
        this.menu.addItem('File');
        this.menu.addItem('Edit');
        this.menu.addItem('View');
        this.menu.addItem('Help');
    }
    render() {
        const components = [
            this.window.render(),
            this.menu.render(),
            this.button.render()
        ];
        return components.join('\n');
    }
    handleButtonClick() {
        this.button.onClick();
    }
    closeApplication() {
        this.window.close();
    }
}
exports.Application = Application;
class DatabaseAbstractFactory {
}
exports.DatabaseAbstractFactory = DatabaseAbstractFactory;
// MySQL implementations
class MySQLDatabase {
    constructor() {
        this.connected = false;
    }
    async connect() {
        this.connected = true;
        return 'Connected to MySQL database';
    }
    async query(sql) {
        if (!this.connected)
            throw new Error('Not connected to database');
        return `MySQL executed: ${sql}`;
    }
    async disconnect() {
        this.connected = false;
    }
    getConnectionInfo() {
        return 'MySQL Database Connection';
    }
}
exports.MySQLDatabase = MySQLDatabase;
class MySQLTransaction {
    constructor() {
        this.active = false;
    }
    async begin() {
        this.active = true;
        console.log('MySQL transaction started');
    }
    async commit() {
        this.active = false;
        console.log('MySQL transaction committed');
    }
    async rollback() {
        this.active = false;
        console.log('MySQL transaction rolled back');
    }
    isActive() {
        return this.active;
    }
}
exports.MySQLTransaction = MySQLTransaction;
class MySQLMigration {
    async migrate() {
        return 'MySQL migrations applied';
    }
    async rollback() {
        return 'MySQL migrations rolled back';
    }
    getVersion() {
        return 1;
    }
}
exports.MySQLMigration = MySQLMigration;
// PostgreSQL implementations
class PostgreSQLDatabase {
    constructor() {
        this.connected = false;
    }
    async connect() {
        this.connected = true;
        return 'Connected to PostgreSQL database';
    }
    async query(sql) {
        if (!this.connected)
            throw new Error('Not connected to database');
        return `PostgreSQL executed: ${sql}`;
    }
    async disconnect() {
        this.connected = false;
    }
    getConnectionInfo() {
        return 'PostgreSQL Database Connection';
    }
}
exports.PostgreSQLDatabase = PostgreSQLDatabase;
class PostgreSQLTransaction {
    constructor() {
        this.active = false;
    }
    async begin() {
        this.active = true;
        console.log('PostgreSQL transaction started');
    }
    async commit() {
        this.active = false;
        console.log('PostgreSQL transaction committed');
    }
    async rollback() {
        this.active = false;
        console.log('PostgreSQL transaction rolled back');
    }
    isActive() {
        return this.active;
    }
}
exports.PostgreSQLTransaction = PostgreSQLTransaction;
class PostgreSQLMigration {
    async migrate() {
        return 'PostgreSQL migrations applied';
    }
    async rollback() {
        return 'PostgreSQL migrations rolled back';
    }
    getVersion() {
        return 1;
    }
}
exports.PostgreSQLMigration = PostgreSQLMigration;
// Concrete Database Factories
class MySQLFactory extends DatabaseAbstractFactory {
    createDatabase() {
        return new MySQLDatabase();
    }
    createTransaction() {
        return new MySQLTransaction();
    }
    createMigration() {
        return new MySQLMigration();
    }
}
exports.MySQLFactory = MySQLFactory;
class PostgreSQLFactory extends DatabaseAbstractFactory {
    createDatabase() {
        return new PostgreSQLDatabase();
    }
    createTransaction() {
        return new PostgreSQLTransaction();
    }
    createMigration() {
        return new PostgreSQLMigration();
    }
}
exports.PostgreSQLFactory = PostgreSQLFactory;
// Utility function to get appropriate factory
function getGUIFactory(platform) {
    switch (platform) {
        case 'windows':
            return new WindowsFactory();
        case 'macos':
            return new MacOSFactory();
        case 'linux':
            return new LinuxFactory();
        default:
            throw new Error(`Unknown platform: ${platform}`);
    }
}
function getDatabaseFactory(type) {
    switch (type) {
        case 'mysql':
            return new MySQLFactory();
        case 'postgresql':
            return new PostgreSQLFactory();
        default:
            throw new Error(`Unknown database type: ${type}`);
    }
}
//# sourceMappingURL=AbstractFactory.js.map