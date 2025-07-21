# 🔨 Abstract Factory Pattern

## Overview

The Abstract Factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes.

## Real World Example

> Extending our door example from Simple Factory. Based on your needs you might get a wooden door from a wooden door shop, iron door from an iron shop or a PVC door from the relevant shop. Plus you might need a guy with different kind of specialities to fit the door, for example a carpenter for wooden door, welder for iron door etc. As you can see there is a dependency between the doors now, wooden door needs carpenter, iron door needs a welder etc.

## In Plain Words

> A factory of factories; a factory that groups the individual but related/dependent factories together without specifying their concrete classes.

## Wikipedia Definition

> The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes

## TypeScript Implementation

### Basic Structure

```typescript
// Abstract products
interface AbstractProductA {
    operationA(): string;
}

interface AbstractProductB {
    operationB(): string;
    collaborateWithA(collaborator: AbstractProductA): string;
}

// Abstract factory
interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}

// Concrete products for family 1
class ConcreteProductA1 implements AbstractProductA {
    operationA(): string {
        return 'Product A1';
    }
}

class ConcreteProductB1 implements AbstractProductB {
    operationB(): string {
        return 'Product B1';
    }
    
    collaborateWithA(collaborator: AbstractProductA): string {
        return `B1 collaborating with ${collaborator.operationA()}`;
    }
}

// Concrete factory 1
class ConcreteFactory1 implements AbstractFactory {
    createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }
    
    createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}
```

### Real-world Examples

#### GUI Component Factory
```typescript
// Abstract GUI components
interface Button {
    render(): string;
    onClick(): string;
}

interface Window {
    render(): string;
    minimize(): string;
    maximize(): string;
}

interface Menu {
    render(): string;
    addItem(item: string): void;
}

// Windows implementations
class WindowsButton implements Button {
    render(): string {
        return 'Rendering Windows-style button';
    }
    
    onClick(): string {
        return 'Windows button clicked';
    }
}

class WindowsWindow implements Window {
    render(): string {
        return 'Rendering Windows-style window';
    }
    
    minimize(): string {
        return 'Minimizing Windows window';
    }
    
    maximize(): string {
        return 'Maximizing Windows window';
    }
}

class WindowsMenu implements Menu {
    private items: string[] = [];
    
    render(): string {
        return `Rendering Windows menu with items: ${this.items.join(', ')}`;
    }
    
    addItem(item: string): void {
        this.items.push(item);
    }
}

// macOS implementations
class MacButton implements Button {
    render(): string {
        return 'Rendering macOS-style button';
    }
    
    onClick(): string {
        return 'macOS button clicked';
    }
}

class MacWindow implements Window {
    render(): string {
        return 'Rendering macOS-style window';
    }
    
    minimize(): string {
        return 'Minimizing macOS window';
    }
    
    maximize(): string {
        return 'Maximizing macOS window';
    }
}

class MacMenu implements Menu {
    private items: string[] = [];
    
    render(): string {
        return `Rendering macOS menu with items: ${this.items.join(', ')}`;
    }
    
    addItem(item: string): void {
        this.items.push(item);
    }
}

// Abstract factory
interface GUIFactory {
    createButton(): Button;
    createWindow(): Window;
    createMenu(): Menu;
}

// Concrete factories
class WindowsFactory implements GUIFactory {
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

class MacFactory implements GUIFactory {
    createButton(): Button {
        return new MacButton();
    }
    
    createWindow(): Window {
        return new MacWindow();
    }
    
    createMenu(): Menu {
        return new MacMenu();
    }
}

// Client application
class Application {
    private button: Button;
    private window: Window;
    private menu: Menu;
    
    constructor(factory: GUIFactory) {
        this.button = factory.createButton();
        this.window = factory.createWindow();
        this.menu = factory.createMenu();
    }
    
    setupUI(): void {
        this.menu.addItem('File');
        this.menu.addItem('Edit');
        this.menu.addItem('View');
    }
    
    render(): string {
        return [
            this.window.render(),
            this.button.render(),
            this.menu.render()
        ].join('\n');
    }
}
```

#### Database System Factory
```typescript
// Abstract database components
interface Connection {
    connect(): string;
    disconnect(): string;
}

interface Command {
    execute(query: string): string;
}

interface Transaction {
    begin(): string;
    commit(): string;
    rollback(): string;
}

// MySQL implementations
class MySQLConnection implements Connection {
    connect(): string {
        return 'Connected to MySQL database';
    }
    
    disconnect(): string {
        return 'Disconnected from MySQL database';
    }
}

class MySQLCommand implements Command {
    execute(query: string): string {
        return `Executing MySQL query: ${query}`;
    }
}

class MySQLTransaction implements Transaction {
    begin(): string {
        return 'MySQL transaction started';
    }
    
    commit(): string {
        return 'MySQL transaction committed';
    }
    
    rollback(): string {
        return 'MySQL transaction rolled back';
    }
}

// PostgreSQL implementations
class PostgreSQLConnection implements Connection {
    connect(): string {
        return 'Connected to PostgreSQL database';
    }
    
    disconnect(): string {
        return 'Disconnected from PostgreSQL database';
    }
}

class PostgreSQLCommand implements Command {
    execute(query: string): string {
        return `Executing PostgreSQL query: ${query}`;
    }
}

class PostgreSQLTransaction implements Transaction {
    begin(): string {
        return 'PostgreSQL transaction started';
    }
    
    commit(): string {
        return 'PostgreSQL transaction committed';
    }
    
    rollback(): string {
        return 'PostgreSQL transaction rolled back';
    }
}

// Abstract factory
interface DatabaseFactory {
    createConnection(): Connection;
    createCommand(): Command;
    createTransaction(): Transaction;
}

// Concrete factories
class MySQLFactory implements DatabaseFactory {
    createConnection(): Connection {
        return new MySQLConnection();
    }
    
    createCommand(): Command {
        return new MySQLCommand();
    }
    
    createTransaction(): Transaction {
        return new MySQLTransaction();
    }
}

class PostgreSQLFactory implements DatabaseFactory {
    createConnection(): Connection {
        return new PostgreSQLConnection();
    }
    
    createCommand(): Command {
        return new PostgreSQLCommand();
    }
    
    createTransaction(): Transaction {
        return new PostgreSQLTransaction();
    }
}
```

## Usage Examples

```typescript
// GUI Factory example
function getGUIFactory(platform: string): GUIFactory {
    switch (platform.toLowerCase()) {
        case 'windows':
            return new WindowsFactory();
        case 'mac':
            return new MacFactory();
        default:
            throw new Error('Unsupported platform');
    }
}

// Usage
const factory = getGUIFactory('windows');
const app = new Application(factory);
app.setupUI();
console.log(app.render());

// Database Factory example
function getDatabaseFactory(type: string): DatabaseFactory {
    switch (type.toLowerCase()) {
        case 'mysql':
            return new MySQLFactory();
        case 'postgresql':
            return new PostgreSQLFactory();
        default:
            throw new Error('Unsupported database type');
    }
}

// Usage
const dbFactory = getDatabaseFactory('mysql');
const connection = dbFactory.createConnection();
const command = dbFactory.createCommand();
const transaction = dbFactory.createTransaction();

console.log(connection.connect());
console.log(transaction.begin());
console.log(command.execute('SELECT * FROM users'));
console.log(transaction.commit());
```

## When to Use

✅ **Good Use Cases:**
- When you need to create families of related or dependent objects
- When you want to ensure that products from a family are used together
- When you need to support multiple product lines or platforms
- When the system should be independent of how products are created

❌ **Avoid When:**
- When you only need to create one type of object
- When the relationships between objects are simple
- When adding new product families is rare

## Benefits

- **Consistency**: Ensures related objects are used together
- **Isolation**: Separates client code from concrete classes
- **Easy Switching**: Can switch entire product families easily
- **Single Responsibility**: Each factory handles one product family

## Drawbacks

- **Complexity**: Can become complex with many product families
- **Difficult Extension**: Adding new products requires changing all factories
- **Code Duplication**: Similar code across different factories

## Abstract Factory vs Factory Method

| Abstract Factory | Factory Method |
|------------------|----------------|
| Creates families of objects | Creates single objects |
| Uses composition | Uses inheritance |
| Multiple factory methods | Single factory method |
| Product families are related | Products may be unrelated |

## Best Practices

1. **Define Clear Relationships**: Ensure products in a family work well together
2. **Use Interfaces**: Define clear contracts for all products and factories
3. **Consider Configuration**: Allow runtime selection of factories
4. **Document Dependencies**: Clearly explain relationships between products
5. **Handle Errors**: Provide meaningful error messages for invalid combinations

## Modern TypeScript Features

```typescript
// Using generics for type safety
interface TypedFactory<T extends ProductFamily> {
    createProducts(): T;
}

// Using mapped types
type ProductFamily = {
    button: Button;
    window: Window;
    menu: Menu;
};

// Using conditional types
type FactoryFor<T> = T extends 'windows' ? WindowsFactory : MacFactory;
```

## Design Considerations

### Extensibility
```typescript
// Adding new product types
interface Dialog {
    show(): string;
    hide(): string;
}

// Extending existing factories
interface ExtendedGUIFactory extends GUIFactory {
    createDialog(): Dialog;
}
```

### Configuration
```typescript
// Factory configuration
interface FactoryConfig {
    theme: 'light' | 'dark';
    platform: 'windows' | 'mac';
    language: string;
}

class ConfigurableGUIFactory implements GUIFactory {
    constructor(private config: FactoryConfig) {}
    
    // Factory methods use configuration
}
```

## Files in This Implementation

- `AbstractFactory.ts` - Main abstract factory pattern implementations
- `Demo.ts` - Demonstration and usage examples
- `README.md` - This documentation file

## Running the Example

```bash
npm start abstract-factory
```

## Related Patterns

- **Factory Method**: Often used to implement Abstract Factory methods
- **Singleton**: Factory instances are often singletons
- **Builder**: Can be used to create complex products
- **Prototype**: Products can be created by cloning prototypes
