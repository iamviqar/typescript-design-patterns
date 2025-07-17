/**
 * Abstract Factory Pattern
 * Provide an interface for creating families of related objects
 */

// Abstract Product interfaces
export interface Button {
    render(): string;
    onClick(): void;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
}

export interface Window {
    render(): string;
    setTitle(title: string): void;
    getTitle(): string;
    close(): void;
}

export interface Menu {
    render(): string;
    addItem(item: string): void;
    getItems(): string[];
}

// Abstract Factory interface
export interface GUIFactory {
    createButton(): Button;
    createWindow(): Window;
    createMenu(): Menu;
}

// Concrete Products - Windows
export class WindowsButton implements Button {
    private enabled: boolean = true;

    render(): string {
        return `[Windows Button] ${this.enabled ? 'Enabled' : 'Disabled'}`;
    }

    onClick(): void {
        if (this.enabled) {
            console.log('Windows button clicked!');
        }
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }
}

export class WindowsWindow implements Window {
    private title: string = 'Windows Window';

    render(): string {
        return `[Windows Window: ${this.title}]`;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    close(): void {
        console.log(`Closing Windows window: ${this.title}`);
    }
}

export class WindowsMenu implements Menu {
    private items: string[] = [];

    render(): string {
        return `[Windows Menu] Items: ${this.items.join(', ')}`;
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    getItems(): string[] {
        return [...this.items];
    }
}

// Concrete Products - macOS
export class MacOSButton implements Button {
    private enabled: boolean = true;

    render(): string {
        return `(macOS Button) ${this.enabled ? 'Enabled' : 'Disabled'}`;
    }

    onClick(): void {
        if (this.enabled) {
            console.log('macOS button clicked!');
        }
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }
}

export class MacOSWindow implements Window {
    private title: string = 'macOS Window';

    render(): string {
        return `(macOS Window: ${this.title})`;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    close(): void {
        console.log(`Closing macOS window: ${this.title}`);
    }
}

export class MacOSMenu implements Menu {
    private items: string[] = [];

    render(): string {
        return `(macOS Menu) Items: ${this.items.join(' | ')}`;
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    getItems(): string[] {
        return [...this.items];
    }
}

// Concrete Products - Linux
export class LinuxButton implements Button {
    private enabled: boolean = true;

    render(): string {
        return `{Linux Button} ${this.enabled ? 'Enabled' : 'Disabled'}`;
    }

    onClick(): void {
        if (this.enabled) {
            console.log('Linux button clicked!');
        }
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }
}

export class LinuxWindow implements Window {
    private title: string = 'Linux Window';

    render(): string {
        return `{Linux Window: ${this.title}}`;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    close(): void {
        console.log(`Closing Linux window: ${this.title}`);
    }
}

export class LinuxMenu implements Menu {
    private items: string[] = [];

    render(): string {
        return `{Linux Menu} Items: [${this.items.join('] [')}]`;
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    getItems(): string[] {
        return [...this.items];
    }
}

// Concrete Factories
export class WindowsFactory implements GUIFactory {
    createButton(): Button {
        return new WindowsButton();
    }

    createWindow(): Window {
        return new WindowsWindow();
    }

    createMenu(): Menu {
        return new WindowsMenu();
    }
}

export class MacOSFactory implements GUIFactory {
    createButton(): Button {
        return new MacOSButton();
    }

    createWindow(): Window {
        return new MacOSWindow();
    }

    createMenu(): Menu {
        return new MacOSMenu();
    }
}

export class LinuxFactory implements GUIFactory {
    createButton(): Button {
        return new LinuxButton();
    }

    createWindow(): Window {
        return new LinuxWindow();
    }

    createMenu(): Menu {
        return new LinuxMenu();
    }
}

// Client code that works with families of related products
export class Application {
    private button: Button;
    private window: Window;
    private menu: Menu;

    constructor(factory: GUIFactory) {
        this.button = factory.createButton();
        this.window = factory.createWindow();
        this.menu = factory.createMenu();
    }

    setupUI(): void {
        this.window.setTitle('My Application');
        this.menu.addItem('File');
        this.menu.addItem('Edit');
        this.menu.addItem('View');
        this.menu.addItem('Help');
    }

    render(): string {
        const components = [
            this.window.render(),
            this.menu.render(),
            this.button.render()
        ];
        return components.join('\n');
    }

    handleButtonClick(): void {
        this.button.onClick();
    }

    closeApplication(): void {
        this.window.close();
    }
}

// Advanced example: Database Factory
export interface Database {
    connect(): Promise<string>;
    query(sql: string): Promise<string>;
    disconnect(): Promise<void>;
    getConnectionInfo(): string;
}

export interface DatabaseTransaction {
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    isActive(): boolean;
}

export interface DatabaseMigration {
    migrate(): Promise<string>;
    rollback(): Promise<string>;
    getVersion(): number;
}

export abstract class DatabaseAbstractFactory {
    abstract createDatabase(): Database;
    abstract createTransaction(): DatabaseTransaction;
    abstract createMigration(): DatabaseMigration;
}

// MySQL implementations
export class MySQLDatabase implements Database {
    private connected: boolean = false;

    async connect(): Promise<string> {
        this.connected = true;
        return 'Connected to MySQL database';
    }

    async query(sql: string): Promise<string> {
        if (!this.connected) throw new Error('Not connected to database');
        return `MySQL executed: ${sql}`;
    }

    async disconnect(): Promise<void> {
        this.connected = false;
    }

    getConnectionInfo(): string {
        return 'MySQL Database Connection';
    }
}

export class MySQLTransaction implements DatabaseTransaction {
    private active: boolean = false;

    async begin(): Promise<void> {
        this.active = true;
        console.log('MySQL transaction started');
    }

    async commit(): Promise<void> {
        this.active = false;
        console.log('MySQL transaction committed');
    }

    async rollback(): Promise<void> {
        this.active = false;
        console.log('MySQL transaction rolled back');
    }

    isActive(): boolean {
        return this.active;
    }
}

export class MySQLMigration implements DatabaseMigration {
    async migrate(): Promise<string> {
        return 'MySQL migrations applied';
    }

    async rollback(): Promise<string> {
        return 'MySQL migrations rolled back';
    }

    getVersion(): number {
        return 1;
    }
}

// PostgreSQL implementations
export class PostgreSQLDatabase implements Database {
    private connected: boolean = false;

    async connect(): Promise<string> {
        this.connected = true;
        return 'Connected to PostgreSQL database';
    }

    async query(sql: string): Promise<string> {
        if (!this.connected) throw new Error('Not connected to database');
        return `PostgreSQL executed: ${sql}`;
    }

    async disconnect(): Promise<void> {
        this.connected = false;
    }

    getConnectionInfo(): string {
        return 'PostgreSQL Database Connection';
    }
}

export class PostgreSQLTransaction implements DatabaseTransaction {
    private active: boolean = false;

    async begin(): Promise<void> {
        this.active = true;
        console.log('PostgreSQL transaction started');
    }

    async commit(): Promise<void> {
        this.active = false;
        console.log('PostgreSQL transaction committed');
    }

    async rollback(): Promise<void> {
        this.active = false;
        console.log('PostgreSQL transaction rolled back');
    }

    isActive(): boolean {
        return this.active;
    }
}

export class PostgreSQLMigration implements DatabaseMigration {
    async migrate(): Promise<string> {
        return 'PostgreSQL migrations applied';
    }

    async rollback(): Promise<string> {
        return 'PostgreSQL migrations rolled back';
    }

    getVersion(): number {
        return 1;
    }
}

// Concrete Database Factories
export class MySQLFactory extends DatabaseAbstractFactory {
    createDatabase(): Database {
        return new MySQLDatabase();
    }

    createTransaction(): DatabaseTransaction {
        return new MySQLTransaction();
    }

    createMigration(): DatabaseMigration {
        return new MySQLMigration();
    }
}

export class PostgreSQLFactory extends DatabaseAbstractFactory {
    createDatabase(): Database {
        return new PostgreSQLDatabase();
    }

    createTransaction(): DatabaseTransaction {
        return new PostgreSQLTransaction();
    }

    createMigration(): DatabaseMigration {
        return new PostgreSQLMigration();
    }
}

// Utility function to get appropriate factory
export function getGUIFactory(platform: 'windows' | 'macos' | 'linux'): GUIFactory {
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

export function getDatabaseFactory(type: 'mysql' | 'postgresql'): DatabaseAbstractFactory {
    switch (type) {
        case 'mysql':
            return new MySQLFactory();
        case 'postgresql':
            return new PostgreSQLFactory();
        default:
            throw new Error(`Unknown database type: ${type}`);
    }
}
