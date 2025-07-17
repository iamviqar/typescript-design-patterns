/**
 * Abstract Factory Pattern
 * Provide an interface for creating families of related objects
 */
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
export interface GUIFactory {
    createButton(): Button;
    createWindow(): Window;
    createMenu(): Menu;
}
export declare class WindowsButton implements Button {
    private enabled;
    render(): string;
    onClick(): void;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
}
export declare class WindowsWindow implements Window {
    private title;
    render(): string;
    setTitle(title: string): void;
    getTitle(): string;
    close(): void;
}
export declare class WindowsMenu implements Menu {
    private items;
    render(): string;
    addItem(item: string): void;
    getItems(): string[];
}
export declare class MacOSButton implements Button {
    private enabled;
    render(): string;
    onClick(): void;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
}
export declare class MacOSWindow implements Window {
    private title;
    render(): string;
    setTitle(title: string): void;
    getTitle(): string;
    close(): void;
}
export declare class MacOSMenu implements Menu {
    private items;
    render(): string;
    addItem(item: string): void;
    getItems(): string[];
}
export declare class LinuxButton implements Button {
    private enabled;
    render(): string;
    onClick(): void;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
}
export declare class LinuxWindow implements Window {
    private title;
    render(): string;
    setTitle(title: string): void;
    getTitle(): string;
    close(): void;
}
export declare class LinuxMenu implements Menu {
    private items;
    render(): string;
    addItem(item: string): void;
    getItems(): string[];
}
export declare class WindowsFactory implements GUIFactory {
    createButton(): Button;
    createWindow(): Window;
    createMenu(): Menu;
}
export declare class MacOSFactory implements GUIFactory {
    createButton(): Button;
    createWindow(): Window;
    createMenu(): Menu;
}
export declare class LinuxFactory implements GUIFactory {
    createButton(): Button;
    createWindow(): Window;
    createMenu(): Menu;
}
export declare class Application {
    private button;
    private window;
    private menu;
    constructor(factory: GUIFactory);
    setupUI(): void;
    render(): string;
    handleButtonClick(): void;
    closeApplication(): void;
}
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
export declare abstract class DatabaseAbstractFactory {
    abstract createDatabase(): Database;
    abstract createTransaction(): DatabaseTransaction;
    abstract createMigration(): DatabaseMigration;
}
export declare class MySQLDatabase implements Database {
    private connected;
    connect(): Promise<string>;
    query(sql: string): Promise<string>;
    disconnect(): Promise<void>;
    getConnectionInfo(): string;
}
export declare class MySQLTransaction implements DatabaseTransaction {
    private active;
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    isActive(): boolean;
}
export declare class MySQLMigration implements DatabaseMigration {
    migrate(): Promise<string>;
    rollback(): Promise<string>;
    getVersion(): number;
}
export declare class PostgreSQLDatabase implements Database {
    private connected;
    connect(): Promise<string>;
    query(sql: string): Promise<string>;
    disconnect(): Promise<void>;
    getConnectionInfo(): string;
}
export declare class PostgreSQLTransaction implements DatabaseTransaction {
    private active;
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    isActive(): boolean;
}
export declare class PostgreSQLMigration implements DatabaseMigration {
    migrate(): Promise<string>;
    rollback(): Promise<string>;
    getVersion(): number;
}
export declare class MySQLFactory extends DatabaseAbstractFactory {
    createDatabase(): Database;
    createTransaction(): DatabaseTransaction;
    createMigration(): DatabaseMigration;
}
export declare class PostgreSQLFactory extends DatabaseAbstractFactory {
    createDatabase(): Database;
    createTransaction(): DatabaseTransaction;
    createMigration(): DatabaseMigration;
}
export declare function getGUIFactory(platform: 'windows' | 'macos' | 'linux'): GUIFactory;
export declare function getDatabaseFactory(type: 'mysql' | 'postgresql'): DatabaseAbstractFactory;
//# sourceMappingURL=AbstractFactory.d.ts.map