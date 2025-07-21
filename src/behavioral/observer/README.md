# 😎 Observer Pattern

## Overview

The Observer pattern defines a dependency between objects so that whenever an object changes its state, all its dependents are notified automatically.

## Real World Example

> A good example would be the job seekers where they subscribe to some job posting site and they are notified whenever there is a matching job opportunity.

## In Plain Words

> Defines a dependency between objects so that whenever an object changes its state, all its dependents are notified.

## Wikipedia Definition

> The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.

## TypeScript Implementation

### Basic Structure

```typescript
// Observer interface
interface Observer {
    update(subject: Subject): void;
}

// Subject interface
interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

// Concrete Subject
class ConcreteSubject implements Subject {
    private observers: Observer[] = [];
    private state: string = '';
    
    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Observer has been attached already.');
        }
        
        console.log('Attached an observer.');
        this.observers.push(observer);
    }
    
    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Nonexistent observer.');
        }
        
        this.observers.splice(observerIndex, 1);
        console.log('Detached an observer.');
    }
    
    public notify(): void {
        console.log('Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
    
    public getState(): string {
        return this.state;
    }
    
    public setState(state: string): void {
        console.log(`Setting state to: ${state}`);
        this.state = state;
        this.notify();
    }
}

// Concrete Observers
class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject) {
            console.log(`Observer A reacted to state: ${subject.getState()}`);
        }
    }
}

class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject) {
            console.log(`Observer B reacted to state: ${subject.getState()}`);
        }
    }
}
```

### Real-world Examples

#### Weather Station System
```typescript
// Weather data interface
interface WeatherData {
    temperature: number;
    humidity: number;
    pressure: number;
}

// Weather observer interface
interface WeatherObserver {
    update(weatherData: WeatherData): void;
}

// Weather subject interface
interface WeatherSubject {
    registerObserver(observer: WeatherObserver): void;
    removeObserver(observer: WeatherObserver): void;
    notifyObservers(): void;
}

// Weather Station (Subject)
class WeatherStation implements WeatherSubject {
    private observers: WeatherObserver[] = [];
    private weatherData: WeatherData = {
        temperature: 0,
        humidity: 0,
        pressure: 0
    };
    
    public registerObserver(observer: WeatherObserver): void {
        this.observers.push(observer);
        console.log('Weather observer registered');
    }
    
    public removeObserver(observer: WeatherObserver): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log('Weather observer removed');
        }
    }
    
    public notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this.weatherData);
        }
    }
    
    public setWeatherData(temperature: number, humidity: number, pressure: number): void {
        this.weatherData = { temperature, humidity, pressure };
        console.log(`Weather updated: ${temperature}°C, ${humidity}% humidity, ${pressure} hPa`);
        this.notifyObservers();
    }
    
    public getWeatherData(): WeatherData {
        return { ...this.weatherData };
    }
}

// Concrete Observers (Display Elements)
class CurrentConditionsDisplay implements WeatherObserver {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public update(weatherData: WeatherData): void {
        console.log(`${this.name} - Current conditions: ${weatherData.temperature}°C, ${weatherData.humidity}% humidity`);
    }
}

class StatisticsDisplay implements WeatherObserver {
    private temperatures: number[] = [];
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public update(weatherData: WeatherData): void {
        this.temperatures.push(weatherData.temperature);
        const avg = this.temperatures.reduce((a, b) => a + b, 0) / this.temperatures.length;
        const max = Math.max(...this.temperatures);
        const min = Math.min(...this.temperatures);
        
        console.log(`${this.name} - Statistics: Avg ${avg.toFixed(1)}°C, Max ${max}°C, Min ${min}°C`);
    }
}

class ForecastDisplay implements WeatherObserver {
    private name: string;
    private lastPressure: number = 0;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public update(weatherData: WeatherData): void {
        let forecast = 'Unknown';
        
        if (this.lastPressure !== 0) {
            if (weatherData.pressure > this.lastPressure) {
                forecast = 'Improving weather on the way!';
            } else if (weatherData.pressure < this.lastPressure) {
                forecast = 'Cooler, rainy weather expected';
            } else {
                forecast = 'More of the same';
            }
        }
        
        this.lastPressure = weatherData.pressure;
        console.log(`${this.name} - Forecast: ${forecast}`);
    }
}
```

#### Stock Market System
```typescript
// Stock data interface
interface StockData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
}

// Stock observer interface
interface StockObserver {
    onStockUpdate(stockData: StockData): void;
}

// Stock subject interface
interface StockSubject {
    addObserver(observer: StockObserver): void;
    removeObserver(observer: StockObserver): void;
    notifyObservers(stockData: StockData): void;
}

// Stock Market (Subject)
class StockMarket implements StockSubject {
    private observers: StockObserver[] = [];
    private stocks: Map<string, StockData> = new Map();
    
    public addObserver(observer: StockObserver): void {
        this.observers.push(observer);
        console.log('Stock observer added');
    }
    
    public removeObserver(observer: StockObserver): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log('Stock observer removed');
        }
    }
    
    public notifyObservers(stockData: StockData): void {
        for (const observer of this.observers) {
            observer.onStockUpdate(stockData);
        }
    }
    
    public updateStock(symbol: string, newPrice: number): void {
        const currentStock = this.stocks.get(symbol);
        const oldPrice = currentStock?.price || newPrice;
        
        const change = newPrice - oldPrice;
        const changePercent = oldPrice !== 0 ? (change / oldPrice) * 100 : 0;
        
        const stockData: StockData = {
            symbol,
            price: newPrice,
            change,
            changePercent
        };
        
        this.stocks.set(symbol, stockData);
        console.log(`Stock ${symbol} updated to $${newPrice}`);
        this.notifyObservers(stockData);
    }
    
    public getStock(symbol: string): StockData | undefined {
        return this.stocks.get(symbol);
    }
}

// Concrete Observers
class StockDisplay implements StockObserver {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public onStockUpdate(stockData: StockData): void {
        const changeIndicator = stockData.change >= 0 ? '↑' : '↓';
        const color = stockData.change >= 0 ? 'green' : 'red';
        
        console.log(`${this.name} - ${stockData.symbol}: $${stockData.price} ${changeIndicator} ${stockData.change.toFixed(2)} (${stockData.changePercent.toFixed(2)}%)`);
    }
}

class StockAlert implements StockObserver {
    private name: string;
    private alertThreshold: number;
    
    constructor(name: string, alertThreshold: number) {
        this.name = name;
        this.alertThreshold = alertThreshold;
    }
    
    public onStockUpdate(stockData: StockData): void {
        if (Math.abs(stockData.changePercent) >= this.alertThreshold) {
            console.log(`🚨 ${this.name} ALERT: ${stockData.symbol} changed by ${stockData.changePercent.toFixed(2)}%!`);
        }
    }
}

class Portfolio implements StockObserver {
    private name: string;
    private holdings: Map<string, number> = new Map();
    private totalValue: number = 0;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public addHolding(symbol: string, shares: number): void {
        this.holdings.set(symbol, shares);
    }
    
    public onStockUpdate(stockData: StockData): void {
        const shares = this.holdings.get(stockData.symbol);
        if (shares) {
            const holdingValue = shares * stockData.price;
            console.log(`${this.name} Portfolio - ${stockData.symbol}: ${shares} shares worth $${holdingValue.toFixed(2)}`);
        }
    }
}
```

#### Event System
```typescript
// Event data interface
interface EventData {
    type: string;
    payload: any;
    timestamp: Date;
}

// Event listener interface
interface EventListener {
    handle(eventData: EventData): void;
}

// Event emitter interface
interface EventEmitter {
    on(eventType: string, listener: EventListener): void;
    off(eventType: string, listener: EventListener): void;
    emit(eventType: string, payload: any): void;
}

// Event Manager (Subject)
class EventManager implements EventEmitter {
    private listeners: Map<string, EventListener[]> = new Map();
    
    public on(eventType: string, listener: EventListener): void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        
        this.listeners.get(eventType)!.push(listener);
        console.log(`Event listener added for ${eventType}`);
    }
    
    public off(eventType: string, listener: EventListener): void {
        const eventListeners = this.listeners.get(eventType);
        if (eventListeners) {
            const index = eventListeners.indexOf(listener);
            if (index > -1) {
                eventListeners.splice(index, 1);
                console.log(`Event listener removed for ${eventType}`);
            }
        }
    }
    
    public emit(eventType: string, payload: any): void {
        const eventData: EventData = {
            type: eventType,
            payload,
            timestamp: new Date()
        };
        
        const eventListeners = this.listeners.get(eventType);
        if (eventListeners) {
            console.log(`Emitting ${eventType} event to ${eventListeners.length} listeners`);
            for (const listener of eventListeners) {
                listener.handle(eventData);
            }
        }
    }
}

// Concrete Event Listeners
class Logger implements EventListener {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public handle(eventData: EventData): void {
        console.log(`${this.name} logged: [${eventData.timestamp.toISOString()}] ${eventData.type} - ${JSON.stringify(eventData.payload)}`);
    }
}

class EmailNotifier implements EventListener {
    private email: string;
    
    constructor(email: string) {
        this.email = email;
    }
    
    public handle(eventData: EventData): void {
        if (eventData.type === 'user_signup' || eventData.type === 'order_placed') {
            console.log(`📧 Email sent to ${this.email}: ${eventData.type} notification`);
        }
    }
}

class DatabaseSaver implements EventListener {
    private tableName: string;
    
    constructor(tableName: string) {
        this.tableName = tableName;
    }
    
    public handle(eventData: EventData): void {
        console.log(`💾 Saving to ${this.tableName}: ${eventData.type} with data ${JSON.stringify(eventData.payload)}`);
    }
}
```

## Usage Examples

```typescript
// Weather Station example
const weatherStation = new WeatherStation();

const currentDisplay = new CurrentConditionsDisplay('Living Room Display');
const statisticsDisplay = new StatisticsDisplay('Statistics Board');
const forecastDisplay = new ForecastDisplay('Forecast Display');

weatherStation.registerObserver(currentDisplay);
weatherStation.registerObserver(statisticsDisplay);
weatherStation.registerObserver(forecastDisplay);

weatherStation.setWeatherData(25, 60, 1020);
weatherStation.setWeatherData(27, 65, 1015);
weatherStation.setWeatherData(23, 70, 1025);

// Stock Market example
const stockMarket = new StockMarket();

const display = new StockDisplay('Main Display');
const alertSystem = new StockAlert('Alert System', 5); // 5% threshold
const portfolio = new Portfolio('My Portfolio');

portfolio.addHolding('AAPL', 100);
portfolio.addHolding('GOOGL', 50);

stockMarket.addObserver(display);
stockMarket.addObserver(alertSystem);
stockMarket.addObserver(portfolio);

stockMarket.updateStock('AAPL', 150.00);
stockMarket.updateStock('AAPL', 155.50);
stockMarket.updateStock('GOOGL', 2800.00);
stockMarket.updateStock('AAPL', 142.75); // Should trigger alert

// Event System example
const eventManager = new EventManager();

const logger = new Logger('System Logger');
const emailNotifier = new EmailNotifier('admin@example.com');
const databaseSaver = new DatabaseSaver('events');

eventManager.on('user_signup', logger);
eventManager.on('user_signup', emailNotifier);
eventManager.on('user_signup', databaseSaver);

eventManager.on('order_placed', logger);
eventManager.on('order_placed', emailNotifier);

eventManager.emit('user_signup', { userId: 123, email: 'user@example.com' });
eventManager.emit('order_placed', { orderId: 456, amount: 99.99 });
```

## When to Use

✅ **Good Use Cases:**
- When changes to one object require changing many other objects
- When an object should notify other objects without knowing who they are
- When you need a loosely coupled design between interacting objects
- When you want to add/remove observers dynamically at runtime

❌ **Avoid When:**
- When the relationship between objects is simple and static
- When performance is critical and notifications are frequent
- When the observer pattern creates complex chains of updates

## Benefits

- **Loose Coupling**: Subject and observers are loosely coupled
- **Dynamic Relationships**: Observers can be added/removed at runtime
- **Broadcast Communication**: One-to-many communication
- **Open/Closed Principle**: You can add new observers without changing the subject

## Drawbacks

- **Memory Leaks**: Observers may not be properly removed
- **Performance**: Can be slow if there are many observers
- **Unexpected Updates**: Complex chains of updates can be hard to debug
- **Order Dependency**: Order of notification may matter but isn't guaranteed

## Best Practices

1. **Remove Observers**: Always remove observers when they're no longer needed
2. **Handle Errors**: Don't let one observer's error affect others
3. **Avoid Circular Dependencies**: Be careful of circular update chains
4. **Use Weak References**: Consider weak references to prevent memory leaks
5. **Document Side Effects**: Clearly document what each observer does

## Modern TypeScript Features

```typescript
// Using generics for type-safe observers
interface TypedObserver<T> {
    update(data: T): void;
}

interface TypedSubject<T> {
    subscribe(observer: TypedObserver<T>): void;
    unsubscribe(observer: TypedObserver<T>): void;
    notify(data: T): void;
}

// Using async observers
interface AsyncObserver {
    updateAsync(data: any): Promise<void>;
}

class AsyncSubject {
    private observers: AsyncObserver[] = [];
    
    public async notifyAsync(data: any): Promise<void> {
        const promises = this.observers.map(observer => observer.updateAsync(data));
        await Promise.all(promises);
    }
}

// Using RxJS-style observables
class Observable<T> {
    private observers: ((value: T) => void)[] = [];
    
    public subscribe(observer: (value: T) => void): () => void {
        this.observers.push(observer);
        
        // Return unsubscribe function
        return () => {
            const index = this.observers.indexOf(observer);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        };
    }
    
    public next(value: T): void {
        this.observers.forEach(observer => observer(value));
    }
}
```

## Variations

### Push vs Pull Model

#### Push Model (Push data to observers)
```typescript
interface PushObserver {
    update(data: any): void; // Data is pushed to observer
}
```

#### Pull Model (Observers pull data from subject)
```typescript
interface PullObserver {
    update(subject: Subject): void; // Observer pulls data from subject
}
```

### Event-Driven Observer
```typescript
class EventDrivenSubject {
    private eventListeners: Map<string, Function[]> = new Map();
    
    public addEventListener(event: string, callback: Function): void {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event)!.push(callback);
    }
    
    public dispatchEvent(event: string, data: any): void {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(data));
        }
    }
}
```

## Testing

```typescript
// Mock observer for testing
class MockObserver implements Observer {
    public updates: any[] = [];
    
    public update(subject: Subject): void {
        this.updates.push(subject);
    }
    
    public getUpdateCount(): number {
        return this.updates.length;
    }
}

// Test example
describe('Observer Pattern', () => {
    it('should notify all observers when state changes', () => {
        const subject = new ConcreteSubject();
        const observer1 = new MockObserver();
        const observer2 = new MockObserver();
        
        subject.attach(observer1);
        subject.attach(observer2);
        
        subject.setState('test');
        
        expect(observer1.getUpdateCount()).toBe(1);
        expect(observer2.getUpdateCount()).toBe(1);
    });
});
```

## Files in This Implementation

- `Observer.ts` - Main observer pattern implementations
- `Demo.ts` - Demonstration and usage examples
- `README.md` - This documentation file

## Running the Example

```bash
npm start observer
```

## Related Patterns

- **Mediator**: Defines how objects interact, Observer defines one-to-many dependencies
- **Singleton**: Subject is often implemented as a singleton
- **Command**: Commands can be used to implement undo in observer notifications
- **Model-View-Controller (MVC)**: Observer is fundamental to MVC architecture
