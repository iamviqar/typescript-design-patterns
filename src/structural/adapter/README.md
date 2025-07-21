# 🔌 Adapter Pattern

## Overview

The Adapter pattern allows you to wrap an otherwise incompatible object in an adapter to make it compatible with another class.

## Real World Example

> Consider that you have some pictures in your memory card and you need to transfer them to your computer. In order to transfer them you need some kind of adapter that is compatible with your computer ports so that you can attach memory card to your computer. In this case card reader is an adapter.
> Another example would be the famous power adapter; a three legged plug can't be connected to a two pronged outlet, it needs to use a power adapter that makes it compatible with the two pronged outlet.
> Yet another example would be a translator translating words spoken by one person to another

## In Plain Words

> Adapter pattern lets you wrap an otherwise incompatible object in an adapter to make it compatible with another class.

## Wikipedia Definition

> In software engineering, the adapter pattern is a software design pattern that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.

## TypeScript Implementation

### Basic Structure

```typescript
// Target interface that client expects
interface Target {
    request(): string;
}

// Adaptee with incompatible interface
class Adaptee {
    public specificRequest(): string {
        return 'Special behavior';
    }
}

// Adapter that makes Adaptee compatible with Target
class Adapter implements Target {
    private adaptee: Adaptee;
    
    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }
    
    public request(): string {
        return `Adapter: ${this.adaptee.specificRequest()}`;
    }
}
```

### Real-world Examples

#### Media Player Adapter
```typescript
// Target interface
interface MediaPlayer {
    play(audioType: string, fileName: string): string;
}

// Adaptee classes with different interfaces
class Mp3Player {
    public playMp3(fileName: string): string {
        return `Playing MP3 file: ${fileName}`;
    }
}

class Mp4Player {
    public playMp4(fileName: string): string {
        return `Playing MP4 file: ${fileName}`;
    }
}

class VlcPlayer {
    public playVlc(fileName: string): string {
        return `Playing VLC file: ${fileName}`;
    }
}

// Adapter for advanced media players
class MediaAdapter implements MediaPlayer {
    private mp4Player?: Mp4Player;
    private vlcPlayer?: VlcPlayer;
    
    constructor(audioType: string) {
        switch (audioType.toLowerCase()) {
            case 'mp4':
                this.mp4Player = new Mp4Player();
                break;
            case 'vlc':
                this.vlcPlayer = new VlcPlayer();
                break;
        }
    }
    
    public play(audioType: string, fileName: string): string {
        switch (audioType.toLowerCase()) {
            case 'mp4':
                return this.mp4Player?.playMp4(fileName) || 'MP4 player not available';
            case 'vlc':
                return this.vlcPlayer?.playVlc(fileName) || 'VLC player not available';
            default:
                return `${audioType} format not supported`;
        }
    }
}

// Main audio player that uses adapter
class AudioPlayer implements MediaPlayer {
    private mediaAdapter?: MediaAdapter;
    private mp3Player: Mp3Player;
    
    constructor() {
        this.mp3Player = new Mp3Player();
    }
    
    public play(audioType: string, fileName: string): string {
        if (audioType.toLowerCase() === 'mp3') {
            return this.mp3Player.playMp3(fileName);
        } else if (audioType.toLowerCase() === 'mp4' || audioType.toLowerCase() === 'vlc') {
            this.mediaAdapter = new MediaAdapter(audioType);
            return this.mediaAdapter.play(audioType, fileName);
        } else {
            return `${audioType} format not supported`;
        }
    }
}
```

#### Payment Gateway Adapter
```typescript
// Target interface expected by our application
interface PaymentGateway {
    processPayment(amount: number, currency: string): PaymentResult;
}

interface PaymentResult {
    success: boolean;
    transactionId: string;
    message: string;
}

// Third-party payment services with different interfaces
class PayPalService {
    public makePayment(sum: number, currencyCode: string): any {
        return {
            status: 'completed',
            id: `paypal_${Date.now()}`,
            info: `PayPal payment of ${sum} ${currencyCode} completed`
        };
    }
}

class StripeService {
    public charge(amountInCents: number, curr: string): any {
        return {
            paid: true,
            charge_id: `stripe_${Date.now()}`,
            description: `Stripe charge of ${amountInCents / 100} ${curr} successful`
        };
    }
}

class SquareService {
    public processTransaction(value: number, currency: string): any {
        return {
            successful: true,
            transaction_ref: `square_${Date.now()}`,
            note: `Square transaction of ${value} ${currency} processed`
        };
    }
}

// Adapters for each payment service
class PayPalAdapter implements PaymentGateway {
    private paypalService: PayPalService;
    
    constructor(paypalService: PayPalService) {
        this.paypalService = paypalService;
    }
    
    public processPayment(amount: number, currency: string): PaymentResult {
        const result = this.paypalService.makePayment(amount, currency);
        return {
            success: result.status === 'completed',
            transactionId: result.id,
            message: result.info
        };
    }
}

class StripeAdapter implements PaymentGateway {
    private stripeService: StripeService;
    
    constructor(stripeService: StripeService) {
        this.stripeService = stripeService;
    }
    
    public processPayment(amount: number, currency: string): PaymentResult {
        const amountInCents = amount * 100;
        const result = this.stripeService.charge(amountInCents, currency);
        return {
            success: result.paid,
            transactionId: result.charge_id,
            message: result.description
        };
    }
}

class SquareAdapter implements PaymentGateway {
    private squareService: SquareService;
    
    constructor(squareService: SquareService) {
        this.squareService = squareService;
    }
    
    public processPayment(amount: number, currency: string): PaymentResult {
        const result = this.squareService.processTransaction(amount, currency);
        return {
            success: result.successful,
            transactionId: result.transaction_ref,
            message: result.note
        };
    }
}

// Payment processor that uses adapters
class PaymentProcessor {
    private gateway: PaymentGateway;
    
    constructor(gateway: PaymentGateway) {
        this.gateway = gateway;
    }
    
    public processPayment(amount: number, currency: string): PaymentResult {
        return this.gateway.processPayment(amount, currency);
    }
}
```

#### Database Adapter
```typescript
// Target interface for our application's database operations
interface Database {
    connect(): string;
    query(sql: string): string;
    disconnect(): string;
}

// Legacy database system
class LegacyDatabase {
    public establishConnection(): string {
        return 'Legacy database connection established';
    }
    
    public executeQuery(query: string): string {
        return `Legacy database executed: ${query}`;
    }
    
    public closeConnection(): string {
        return 'Legacy database connection closed';
    }
}

// Modern database system
class ModernDatabase {
    public open(): string {
        return 'Modern database opened';
    }
    
    public run(statement: string): string {
        return `Modern database ran: ${statement}`;
    }
    
    public close(): string {
        return 'Modern database closed';
    }
}

// Adapters for different database systems
class LegacyDatabaseAdapter implements Database {
    private legacyDb: LegacyDatabase;
    
    constructor(legacyDb: LegacyDatabase) {
        this.legacyDb = legacyDb;
    }
    
    public connect(): string {
        return this.legacyDb.establishConnection();
    }
    
    public query(sql: string): string {
        return this.legacyDb.executeQuery(sql);
    }
    
    public disconnect(): string {
        return this.legacyDb.closeConnection();
    }
}

class ModernDatabaseAdapter implements Database {
    private modernDb: ModernDatabase;
    
    constructor(modernDb: ModernDatabase) {
        this.modernDb = modernDb;
    }
    
    public connect(): string {
        return this.modernDb.open();
    }
    
    public query(sql: string): string {
        return this.modernDb.run(sql);
    }
    
    public disconnect(): string {
        return this.modernDb.close();
    }
}
```

## Usage Examples

```typescript
// Media Player example
const player = new AudioPlayer();

console.log(player.play('mp3', 'song.mp3'));
console.log(player.play('mp4', 'video.mp4'));
console.log(player.play('vlc', 'movie.vlc'));
console.log(player.play('avi', 'file.avi')); // Unsupported format

// Payment Gateway example
const paypalService = new PayPalService();
const paypalAdapter = new PayPalAdapter(paypalService);
const paymentProcessor = new PaymentProcessor(paypalAdapter);

const result = paymentProcessor.processPayment(100, 'USD');
console.log(result);

// Database example
const legacyDb = new LegacyDatabase();
const dbAdapter = new LegacyDatabaseAdapter(legacyDb);

console.log(dbAdapter.connect());
console.log(dbAdapter.query('SELECT * FROM users'));
console.log(dbAdapter.disconnect());
```

## When to Use

✅ **Good Use Cases:**
- When you want to use an existing class with an incompatible interface
- When integrating third-party libraries with different APIs
- When you need to use legacy code with new systems
- When you want to create a reusable class that works with unrelated classes

❌ **Avoid When:**
- When interfaces are already compatible
- When you can modify the existing classes directly
- When the adaptation logic is too complex or hacky

## Benefits

- **Reusability**: Allows reuse of existing classes with incompatible interfaces
- **Separation of Concerns**: Separates interface conversion from business logic
- **Legacy Integration**: Enables integration of legacy systems
- **Third-party Integration**: Simplifies integration of third-party libraries

## Drawbacks

- **Code Complexity**: Adds an extra layer of abstraction
- **Performance**: Additional method calls through adapter
- **Maintenance**: More classes to maintain

## Types of Adapters

### Object Adapter (Composition)
```typescript
class ObjectAdapter implements Target {
    private adaptee: Adaptee;
    
    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }
    
    public request(): string {
        return this.adaptee.specificRequest();
    }
}
```

### Class Adapter (Inheritance) - Limited in TypeScript
```typescript
// TypeScript doesn't support multiple inheritance
// But you can use mixins for similar functionality
interface Adaptee {
    specificRequest(): string;
}

interface Target {
    request(): string;
}

class ClassAdapter implements Target, Adaptee {
    public specificRequest(): string {
        return 'Specific request';
    }
    
    public request(): string {
        return this.specificRequest();
    }
}
```

## Best Practices

1. **Keep Adapters Simple**: Focus only on interface conversion
2. **Handle Errors Gracefully**: Provide meaningful error messages
3. **Document Mappings**: Clearly explain how interfaces are mapped
4. **Consider Bidirectional Adapters**: For two-way communication
5. **Use Dependency Injection**: Make adapters configurable

## Modern TypeScript Features

```typescript
// Using generics for flexible adapters
interface GenericAdapter<T, U> {
    adapt(input: T): U;
}

// Using mapped types for automatic adaptation
type AdaptedInterface<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
        ? (...args: Parameters<T[K]>) => ReturnType<T[K]>
        : T[K];
};

// Using conditional types
type AdapterFor<T> = T extends LegacyDatabase 
    ? LegacyDatabaseAdapter 
    : T extends ModernDatabase 
    ? ModernDatabaseAdapter 
    : never;
```

## Two-way Adapter Example

```typescript
interface TwoWayAdapter {
    adaptAtoB(a: any): any;
    adaptBtoA(b: any): any;
}

class CurrencyAdapter implements TwoWayAdapter {
    public adaptAtoB(usd: number): number {
        return usd * 0.85; // USD to EUR
    }
    
    public adaptBtoA(eur: number): number {
        return eur / 0.85; // EUR to USD
    }
}
```

## Testing Adapters

```typescript
// Mock the adaptee for testing
class MockAdaptee {
    public specificRequest(): string {
        return 'Mock response';
    }
}

// Test the adapter
describe('Adapter', () => {
    it('should adapt the interface correctly', () => {
        const mockAdaptee = new MockAdaptee();
        const adapter = new Adapter(mockAdaptee);
        
        expect(adapter.request()).toBe('Adapter: Mock response');
    });
});
```

## Files in This Implementation

- `Adapter.ts` - Main adapter pattern implementations
- `README.md` - This documentation file

## Running the Example

```bash
npm start adapter
```

## Related Patterns

- **Bridge**: Separates abstraction from implementation
- **Decorator**: Adds behavior without changing interface
- **Facade**: Provides simplified interface to complex subsystem
- **Proxy**: Controls access to another object
