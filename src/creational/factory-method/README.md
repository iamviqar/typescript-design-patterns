# 🏭 Factory Method Pattern

## Overview

The Factory Method pattern provides a way to delegate the instantiation logic to child classes without specifying the exact class of the object that will be created.

## Real World Example

> Consider the case of a hiring manager. It is impossible for one person to interview for each of the positions. Based on the job opening, she has to decide and delegate the interview steps to different people.

## In Plain Words

> It provides a way to delegate the instantiation logic to child classes.

## Wikipedia Definition

> In class-based programming, the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. This is done by creating objects by calling a factory method—either specified in an interface and implemented by child classes, or implemented in a base class and optionally overridden by derived classes—rather than by calling a constructor.

## TypeScript Implementation

### Basic Structure

```typescript
// Product interface
interface Product {
    operation(): string;
}

// Abstract Creator
abstract class Creator {
    // Factory method
    abstract createProduct(): Product;
    
    // Template method that uses the factory method
    public someOperation(): string {
        const product = this.createProduct();
        return `Creator: ${product.operation()}`;
    }
}

// Concrete Creators
class ConcreteCreatorA extends Creator {
    createProduct(): Product {
        return new ConcreteProductA();
    }
}

class ConcreteCreatorB extends Creator {
    createProduct(): Product {
        return new ConcreteProductB();
    }
}
```

### Real-world Examples

#### Payment Processor Factory
```typescript
// Payment interface
interface PaymentProcessor {
    processPayment(amount: number): string;
    validatePayment(): boolean;
}

// Concrete payment processors
class CreditCardProcessor implements PaymentProcessor {
    constructor(private cardNumber: string) {}
    
    processPayment(amount: number): string {
        return `Processed $${amount} via Credit Card ending in ${this.cardNumber.slice(-4)}`;
    }
    
    validatePayment(): boolean {
        return this.cardNumber.length === 16;
    }
}

class PayPalProcessor implements PaymentProcessor {
    constructor(private email: string) {}
    
    processPayment(amount: number): string {
        return `Processed $${amount} via PayPal account ${this.email}`;
    }
    
    validatePayment(): boolean {
        return this.email.includes('@');
    }
}

class BankTransferProcessor implements PaymentProcessor {
    constructor(private accountNumber: string) {}
    
    processPayment(amount: number): string {
        return `Processed $${amount} via Bank Transfer to account ${this.accountNumber}`;
    }
    
    validatePayment(): boolean {
        return this.accountNumber.length >= 8;
    }
}

// Abstract factory
abstract class PaymentFactory {
    abstract createProcessor(): PaymentProcessor;
    
    public executePayment(amount: number): string {
        const processor = this.createProcessor();
        if (processor.validatePayment()) {
            return processor.processPayment(amount);
        }
        return 'Payment validation failed';
    }
}

// Concrete factories
class CreditCardFactory extends PaymentFactory {
    constructor(private cardNumber: string) {
        super();
    }
    
    createProcessor(): PaymentProcessor {
        return new CreditCardProcessor(this.cardNumber);
    }
}

class PayPalFactory extends PaymentFactory {
    constructor(private email: string) {
        super();
    }
    
    createProcessor(): PaymentProcessor {
        return new PayPalProcessor(this.email);
    }
}

class BankTransferFactory extends PaymentFactory {
    constructor(private accountNumber: string) {
        super();
    }
    
    createProcessor(): PaymentProcessor {
        return new BankTransferProcessor(this.accountNumber);
    }
}
```

#### Document Creator Factory
```typescript
// Document interface
interface Document {
    export(): string;
    print(): string;
}

// Concrete documents
class PDFDocument implements Document {
    constructor(private content: string) {}
    
    export(): string {
        return `Exporting PDF: ${this.content}`;
    }
    
    print(): string {
        return `Printing PDF: ${this.content}`;
    }
}

class WordDocument implements Document {
    constructor(private content: string) {}
    
    export(): string {
        return `Exporting Word Document: ${this.content}`;
    }
    
    print(): string {
        return `Printing Word Document: ${this.content}`;
    }
}

// Abstract creator
abstract class DocumentCreator {
    abstract createDocument(content: string): Document;
    
    public processDocument(content: string): string {
        const document = this.createDocument(content);
        return document.export();
    }
}

// Concrete creators
class PDFCreator extends DocumentCreator {
    createDocument(content: string): Document {
        return new PDFDocument(content);
    }
}

class WordCreator extends DocumentCreator {
    createDocument(content: string): Document {
        return new WordDocument(content);
    }
}
```

## Usage Examples

```typescript
// Payment processing example
function getPaymentFactory(type: string, identifier: string): PaymentFactory {
    switch (type) {
        case 'credit':
            return new CreditCardFactory(identifier);
        case 'paypal':
            return new PayPalFactory(identifier);
        case 'bank':
            return new BankTransferFactory(identifier);
        default:
            throw new Error('Unknown payment type');
    }
}

// Usage
const factory = getPaymentFactory('credit', '4532123456789012');
const result = factory.executePayment(100.00);
console.log(result); // "Processed $100 via Credit Card ending in 9012"

// Document processing example
const pdfCreator = new PDFCreator();
const wordCreator = new WordCreator();

console.log(pdfCreator.processDocument('My PDF Content'));
console.log(wordCreator.processDocument('My Word Content'));
```

## When to Use

✅ **Good Use Cases:**
- When the exact types of objects to create are determined at runtime
- When you want to provide a library/framework that can be extended
- When you need to delegate object creation to subclasses
- When the creation process is complex and varies between types

❌ **Avoid When:**
- Simple object creation that doesn't require abstraction
- When you have a fixed set of objects that won't change
- When the creation logic is trivial

## Benefits

- **Flexibility**: Easy to introduce new types without changing existing code
- **Loose Coupling**: Client code doesn't depend on concrete classes
- **Single Responsibility**: Object creation logic is separated
- **Open/Closed Principle**: Open for extension, closed for modification

## Drawbacks

- **Complexity**: Can make code more complex than simple object creation
- **Extra Classes**: Requires creating many factory classes
- **Learning Curve**: May be harder for new developers to understand

## Comparison with Simple Factory

| Simple Factory | Factory Method |
|----------------|----------------|
| Static method creates objects | Virtual method creates objects |
| Can't be extended easily | Can be extended through inheritance |
| Single factory for all objects | Separate factory for each type |
| Violates Open/Closed Principle | Follows Open/Closed Principle |

## Best Practices

1. **Use Abstract Classes**: Define common interface for all creators
2. **Parameterize Creation**: Allow configuration of created objects
3. **Handle Errors Gracefully**: Provide meaningful error messages
4. **Document Factory Methods**: Clearly explain what each factory creates
5. **Consider Generic Types**: Use TypeScript generics for type safety

## Modern TypeScript Features

```typescript
// Using generics for better type safety
abstract class GenericFactory<T> {
    abstract create(): T;
}

// Using type guards
function isPaymentProcessor(obj: any): obj is PaymentProcessor {
    return 'processPayment' in obj && 'validatePayment' in obj;
}

// Using union types
type PaymentType = 'credit' | 'paypal' | 'bank';

function createPaymentFactory(
    type: PaymentType, 
    identifier: string
): PaymentFactory {
    // Implementation
}
```

## Files in This Implementation

- `FactoryMethod.ts` - Main factory method pattern implementations
- `Demo.ts` - Demonstration and usage examples
- `README.md` - This documentation file

## Running the Example

```bash
npm start factory-method
```

## Related Patterns

- **Abstract Factory**: Creates families of related objects
- **Builder**: Complex object construction pattern
- **Prototype**: Creates objects by cloning
- **Template Method**: Often uses factory methods in template steps
