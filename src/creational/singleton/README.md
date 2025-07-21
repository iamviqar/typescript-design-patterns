# 💍 Singleton Pattern

## Overview

The Singleton pattern ensures that only one instance of a particular class is ever created and provides a global point of access to that instance.

## Real World Example

> There can only be one president of a country at a time. The same president has to be brought to action, whenever duty calls. President here is singleton.

## In Plain Words

> Ensures that only one object of a particular class is ever created.

## Wikipedia Definition

> In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one object. This is useful when exactly one object is needed to coordinate actions across the system.

## ⚠️ Important Note

Singleton pattern is actually considered an anti-pattern and overuse of it should be avoided. It is not necessarily bad and could have some valid use-cases but should be used with caution because it introduces a global state in your application and change to it in one place could affect in the other areas and it could become pretty difficult to debug. The other bad thing about them is it makes your code tightly coupled plus mocking the singleton could be difficult.

## TypeScript Implementation

### Basic Structure

```typescript
class Singleton {
    private static instance: Singleton;
    
    private constructor() {
        // Hide the constructor
    }
    
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

### Real-world Examples

#### Configuration Manager
```typescript
class ConfigManager {
    private static instance: ConfigManager;
    private config: Map<string, any> = new Map();
    
    private constructor() {}
    
    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }
    
    public set(key: string, value: any): void {
        this.config.set(key, value);
    }
    
    public get(key: string): any {
        return this.config.get(key);
    }
}
```

#### Database Connection
```typescript
class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connection: any;
    
    private constructor() {
        // Initialize database connection
        this.connection = this.createConnection();
    }
    
    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    
    private createConnection(): any {
        // Simulate database connection
        return { connected: true, timestamp: Date.now() };
    }
    
    public query(sql: string): any {
        return `Executing: ${sql}`;
    }
}
```

## Usage Examples

```typescript
// Configuration Manager Example
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();

console.log(config1 === config2); // true

config1.set('timeout', 10000);
console.log(config2.get('timeout')); // 10000

// Database Connection Example
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2); // true
console.log(db1.query('SELECT * FROM users'));
```

## When to Use

✅ **Good Use Cases:**
- Configuration settings that should be shared across the application
- Database connection pools
- Logging services
- Caching mechanisms
- Hardware interface access

❌ **Avoid When:**
- You need multiple instances with different configurations
- The object doesn't truly need to be unique
- Testing becomes difficult due to global state
- You're using it just to avoid passing dependencies

## Benefits

- **Memory Efficiency**: Only one instance exists
- **Global Access**: Easy to access from anywhere
- **Lazy Initialization**: Created only when needed
- **Thread Safety**: Can be made thread-safe

## Drawbacks

- **Global State**: Introduces global state which can be problematic
- **Testing Difficulties**: Hard to mock and test
- **Tight Coupling**: Creates dependencies throughout the codebase
- **Concurrency Issues**: Can have problems in multi-threaded environments

## Best Practices

1. **Use Sparingly**: Only when you truly need a single instance
2. **Consider Dependency Injection**: Often a better alternative
3. **Make Thread-Safe**: In multi-threaded environments
4. **Avoid Global State**: Consider if the data really needs to be global
5. **Testability**: Provide ways to reset or mock for testing

## Modern Alternatives

### Dependency Injection
```typescript
// Instead of Singleton
class UserService {
    constructor(private config: ConfigManager) {}
}

// Inject the single instance through DI container
```

### Module Pattern
```typescript
// ES6 modules are singletons by nature
export const config = {
    timeout: 10000,
    apiUrl: 'https://api.example.com'
};
```

## Files in This Implementation

- `Singleton.ts` - Main singleton pattern implementations
- `Demo.ts` - Demonstration and usage examples
- `README.md` - This documentation file

## Running the Example

```bash
npm start singleton
```

## Related Patterns

- **Factory Method**: Often implemented as singletons
- **Abstract Factory**: Factory instances are often singletons
- **Builder**: Director class might be a singleton
- **Facade**: Facade objects are often singletons
