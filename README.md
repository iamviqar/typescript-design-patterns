# TypeScript Design Patterns

A comprehensive implementation of all 23 Gang of Four (GoF) Design Patterns in TypeScript with modern language features, type safety, and real-world examples.

## 🚀 Features

- **Type Safety**: Full TypeScript implementation with strict type checking
- **Modern Syntax**: Uses ES2020+ features and modern TypeScript patterns
- **Real-world Examples**: Practical implementations demonstrating actual use cases
- **Interactive Demos**: Command-line interface for exploring patterns
- **Comprehensive Documentation**: Detailed explanations and code comments
- **Professional Structure**: Industry-standard project organization

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd typescript-design-patterns

# Install dependencies
npm install

# Build the project
npm run build

# Run the demos
npm start
```

## 🎮 Usage

### Run All Patterns
```bash
npm start
```

### Run Specific Pattern
```bash
npm start singleton
npm start factory-method
npm start abstract-factory
npm start builder
npm start observer
```

### Interactive Mode
```bash
npm start --interactive
```

### List Available Patterns
```bash
npm start --list
```

### Help
```bash
npm start --help
```

## � Pattern Documentation

Each design pattern includes comprehensive documentation with:

### 📖 Individual Pattern READMEs
- **Real-world examples** and analogies
- **Plain English explanations** of complex concepts  
- **Complete TypeScript implementations** with modern features
- **Usage examples** and best practices
- **When to use** and when to avoid guidelines
- **Benefits and drawbacks** analysis
- **Related patterns** and comparisons

### 🎯 Quick Navigation

#### Creational Patterns
- [💍 Singleton](src/creational/singleton/) - Ensure single instance
- [🏭 Factory Method](src/creational/factory-method/) - Create objects via inheritance
- [🔨 Abstract Factory](src/creational/abstract-factory/) - Create object families
- [👷 Builder](src/creational/builder/) - Construct complex objects step-by-step

#### Structural Patterns  
- [🔌 Adapter](src/structural/adapter/) - Make incompatible interfaces work together

#### Behavioral Patterns
- [😎 Observer](src/behavioral/observer/) - Define one-to-many object dependencies

### 📋 Pattern Summary Table

| Category | Pattern | Complexity | Use Case |
|----------|---------|------------|----------|
| **Creational** | Singleton | ⭐⭐ | Global access to single instance |
| **Creational** | Factory Method | ⭐⭐⭐ | Create objects without specifying classes |
| **Creational** | Abstract Factory | ⭐⭐⭐⭐ | Create families of related objects |
| **Creational** | Builder | ⭐⭐⭐ | Construct complex objects step-by-step |
| **Structural** | Adapter | ⭐⭐ | Interface compatibility |
| **Behavioral** | Observer | ⭐⭐⭐ | Notify dependents of state changes |

**Complexity Legend:** ⭐ Simple, ⭐⭐ Moderate, ⭐⭐⭐ Complex, ⭐⭐⭐⭐ Advanced

## �📋 Implemented Patterns

### ✅ Creational Patterns (4/5)

| Pattern | Status | Description | Documentation |
|---------|--------|-------------|---------------|
| **[Singleton](src/creational/singleton/)** | ✅ Complete | Ensure only one instance exists globally | [📖 Read More](src/creational/singleton/) |
| **[Factory Method](src/creational/factory-method/)** | ✅ Complete | Create objects without specifying exact classes | [📖 Read More](src/creational/factory-method/) |
| **[Abstract Factory](src/creational/abstract-factory/)** | ✅ Complete | Create families of related objects | [📖 Read More](src/creational/abstract-factory/) |
| **[Builder](src/creational/builder/)** | ✅ Complete | Construct complex objects step by step | [📖 Read More](src/creational/builder/) |
| **Prototype** | 🚧 Coming Soon | Create objects by cloning existing instances | Coming Soon |

### 🚧 Structural Patterns (1/7)

| Pattern | Status | Description | Documentation |
|---------|--------|-------------|---------------|
| **[Adapter](src/structural/adapter/)** | ⚠️ Partial | Allow incompatible interfaces to work together | [📖 Read More](src/structural/adapter/) |
| **Bridge** | 🚧 Coming Soon | Separate abstraction from implementation | Coming Soon |
| **Composite** | 🚧 Coming Soon | Compose objects into tree structures | Coming Soon |
| **Decorator** | 🚧 Coming Soon | Add behavior dynamically | Coming Soon |
| **Facade** | 🚧 Coming Soon | Provide simplified interface | Coming Soon |
| **Flyweight** | 🚧 Coming Soon | Minimize memory usage | Coming Soon |
| **Proxy** | 🚧 Coming Soon | Provide placeholder for another object | Coming Soon |

### 🚧 Behavioral Patterns (1/11)

| Pattern | Status | Description | Documentation |
|---------|--------|-------------|---------------|
| **[Observer](src/behavioral/observer/)** | ✅ Complete | Notify multiple objects of state changes | [📖 Read More](src/behavioral/observer/) |
| **Strategy** | 🚧 Coming Soon | Define family of interchangeable algorithms | Coming Soon |
| **Command** | 🚧 Coming Soon | Encapsulate requests as objects | Coming Soon |
| **State** | 🚧 Coming Soon | Change behavior when internal state changes | Coming Soon |
| **Template Method** | 🚧 Coming Soon | Define algorithm skeleton | Coming Soon |
| **Chain of Responsibility** | 🚧 Coming Soon | Pass requests along handler chain | Coming Soon |
| **Iterator** | 🚧 Coming Soon | Access collection elements sequentially | Coming Soon |
| **Mediator** | 🚧 Coming Soon | Define object interactions | Coming Soon |
| **Memento** | 🚧 Coming Soon | Capture and restore object state | Coming Soon |
| **Visitor** | 🚧 Coming Soon | Separate algorithms from objects | Coming Soon |
| **Interpreter** | 🚧 Coming Soon | Define grammar for language | Coming Soon |

## 🏗️ Project Structure

```
typescript-design-patterns/
├── src/
│   ├── creational/
│   │   ├── singleton/
│   │   │   ├── Singleton.ts         # Implementation
│   │   │   ├── Demo.ts             # Usage examples
│   │   │   └── README.md           # 📖 Full documentation
│   │   ├── factory-method/
│   │   │   ├── FactoryMethod.ts
│   │   │   ├── Demo.ts
│   │   │   └── README.md
│   │   ├── abstract-factory/
│   │   │   ├── AbstractFactory.ts
│   │   │   ├── Demo.ts
│   │   │   └── README.md
│   │   └── builder/
│   │       ├── Builder.ts
│   │       ├── Demo.ts
│   │       └── README.md
│   ├── structural/
│   │   └── adapter/
│   │       ├── Adapter.ts
│   │       └── README.md
│   ├── behavioral/
│   │   └── observer/
│   │       ├── Observer.ts
│   │       ├── Demo.ts
│   │       └── README.md
│   └── index.ts                    # Main entry point
├── dist/                           # Compiled output
├── docs/                           # Additional documentation
├── package.json
├── tsconfig.json
├── README.md                       # This file
└── reference.md                    # 📚 Complete pattern reference
```

## 📚 Reference Material

This project includes a comprehensive [reference.md](reference.md) file that contains:

- **Complete explanations** of all 23 GoF design patterns
- **Real-world analogies** to make patterns easy to understand  
- **Code examples** in multiple programming languages
- **When to use** each pattern guidelines
- **Benefits and drawbacks** of each approach
- **Cross-references** between related patterns

The reference material serves as the foundation for all individual pattern implementations and documentation in this TypeScript project.

## 🏗️ Project Structure

## 💡 Pattern Examples

### Singleton Pattern
```typescript
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();
console.log(config1 === config2); // true

config1.set('timeout', 10000);
console.log(config2.get('timeout')); // 10000
```

### Factory Method Pattern
```typescript
const factory = getPaymentFactory('credit', '4532123456789012');
const result = factory.executePayment(100.00);
console.log(result); // "Processed $100 via Credit Card ending in 9012"
```

### Abstract Factory Pattern
```typescript
const factory = getGUIFactory('windows');
const app = new Application(factory);
app.setupUI();
console.log(app.render()); // Windows-styled UI components
```

### Builder Pattern
```typescript
const computer = new ComputerBuilder()
    .setCPU('Intel i9-13900K')
    .setMemory('32GB DDR5')
    .setGraphics('NVIDIA RTX 4080')
    .build();
```

### Observer Pattern
```typescript
const weatherStation = new WeatherStation();
const display = new TemperatureDisplay('Display1');

weatherStation.addObserver(display);
weatherStation.setWeatherData(25, 60, 1020); // Notifies all observers
```

## 🛠️ Development

### Scripts
```bash
npm run build       # Compile TypeScript
npm run dev         # Run with ts-node
npm start          # Run compiled version
npm test           # Run tests (when available)
npm run lint       # Run ESLint
npm run clean      # Clean dist folder
```

### TypeScript Configuration
- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Enabled
- **Type Checking**: Comprehensive
- **Source Maps**: Enabled
- **Decorators**: Experimental support

## 🎯 Key Features

### Type Safety
- Full TypeScript implementation with strict type checking
- Generic types for flexible, reusable components
- Interface-based design for better abstraction
- Null safety and strict property checking

### Modern JavaScript
- ES2020+ features (async/await, optional chaining, etc.)
- Classes and inheritance
- Modules and imports
- Arrow functions and destructuring

### Real-world Examples
Each pattern includes multiple practical examples:
- **Singleton**: Configuration manager, database connection, logger
- **Factory Method**: Payment processors, document creators, animal factories
- **Abstract Factory**: GUI components, database systems
- **Builder**: Computer configuration, SQL queries, HTTP requests
- **Observer**: Weather stations, stock market, event systems

### Error Handling
- Comprehensive try-catch blocks
- Graceful error reporting
- Promise rejection handling
- Type-safe error messages

## 📚 Learning Resources

### Pattern Benefits
- **Creational**: Object creation flexibility and control
- **Structural**: Object composition and relationships
- **Behavioral**: Communication and responsibility distribution

### Best Practices
- Follow SOLID principles
- Use composition over inheritance
- Implement interfaces for abstraction
- Maintain single responsibility

### When to Use
Each pattern includes detailed documentation about:
- Problem it solves
- When to apply it
- Benefits and drawbacks
- Real-world use cases
- Implementation considerations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement new patterns or improvements
4. Add comprehensive tests
5. Update documentation
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔮 Roadmap

- [ ] Complete all 23 GoF patterns
- [ ] Add unit tests for all patterns
- [ ] Create UML diagrams
- [ ] Add performance benchmarks
- [ ] Create web-based interactive demos
- [ ] Add integration examples
- [ ] Performance optimization guides

---

**Note**: This is a foundational implementation showcasing key design patterns with TypeScript. Each pattern is implemented with multiple real-world examples and comprehensive type safety.
