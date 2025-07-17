/**
 * Observer Pattern
 * Define a one-to-many dependency between objects so that when one object changes state,
 * all its dependents are notified and updated automatically
 */

// Observer interface
export interface Observer<T = any> {
    update(data: T): void;
    getId(): string;
}

// Subject interface
export interface Subject<T = any> {
    addObserver(observer: Observer<T>): void;
    removeObserver(observer: Observer<T>): void;
    notifyObservers(data: T): void;
}

// Generic Observable class
export class Observable<T> implements Subject<T> {
    private observers: Set<Observer<T>> = new Set();

    addObserver(observer: Observer<T>): void {
        this.observers.add(observer);
    }

    removeObserver(observer: Observer<T>): void {
        this.observers.delete(observer);
    }

    notifyObservers(data: T): void {
        this.observers.forEach(observer => {
            try {
                observer.update(data);
            } catch (error) {
                console.error(`Error notifying observer ${observer.getId()}:`, error);
            }
        });
    }

    getObserverCount(): number {
        return this.observers.size;
    }

    hasObserver(observer: Observer<T>): boolean {
        return this.observers.has(observer);
    }

    clearObservers(): void {
        this.observers.clear();
    }
}

// Weather Station Example
export interface WeatherData {
    temperature: number;
    humidity: number;
    pressure: number;
    timestamp: Date;
}

export class WeatherStation extends Observable<WeatherData> {
    private currentWeather: WeatherData;

    constructor() {
        super();
        this.currentWeather = {
            temperature: 20,
            humidity: 50,
            pressure: 1013.25,
            timestamp: new Date()
        };
    }

    setWeatherData(temperature: number, humidity: number, pressure: number): void {
        this.currentWeather = {
            temperature,
            humidity,
            pressure,
            timestamp: new Date()
        };
        this.notifyObservers(this.currentWeather);
    }

    getCurrentWeather(): WeatherData {
        return { ...this.currentWeather };
    }
}

export class TemperatureDisplay implements Observer<WeatherData> {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    update(weather: WeatherData): void {
        console.log(`[${this.id}] Temperature Display: ${weather.temperature}°C`);
    }

    getId(): string {
        return this.id;
    }
}

export class HumidityDisplay implements Observer<WeatherData> {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    update(weather: WeatherData): void {
        console.log(`[${this.id}] Humidity Display: ${weather.humidity}%`);
    }

    getId(): string {
        return this.id;
    }
}

export class WeatherForecast implements Observer<WeatherData> {
    private id: string;
    private history: WeatherData[] = [];

    constructor(id: string) {
        this.id = id;
    }

    update(weather: WeatherData): void {
        this.history.push(weather);
        if (this.history.length > 10) {
            this.history.shift(); // Keep only last 10 readings
        }

        const forecast = this.generateForecast();
        console.log(`[${this.id}] Weather Forecast: ${forecast}`);
    }

    private generateForecast(): string {
        if (this.history.length < 2) {
            return 'Not enough data';
        }

        const latest = this.history[this.history.length - 1]!;
        const previous = this.history[this.history.length - 2]!;
        
        const tempTrend = latest.temperature - previous.temperature;
        const pressureTrend = latest.pressure - previous.pressure;

        if (pressureTrend > 1 && tempTrend > 0) {
            return 'Improving weather expected';
        } else if (pressureTrend < -1 && tempTrend < 0) {
            return 'Stormy weather expected';
        } else {
            return 'Stable weather expected';
        }
    }

    getId(): string {
        return this.id;
    }
}

// Stock Market Example
export interface StockData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    timestamp: Date;
}

export class Stock extends Observable<StockData> {
    private symbol: string;
    private price: number;
    private previousPrice: number;

    constructor(symbol: string, initialPrice: number) {
        super();
        this.symbol = symbol;
        this.price = initialPrice;
        this.previousPrice = initialPrice;
    }

    setPrice(newPrice: number): void {
        this.previousPrice = this.price;
        this.price = newPrice;

        const change = this.price - this.previousPrice;
        const changePercent = (change / this.previousPrice) * 100;

        const stockData: StockData = {
            symbol: this.symbol,
            price: this.price,
            change: change,
            changePercent: changePercent,
            volume: Math.floor(Math.random() * 1000000) + 100000,
            timestamp: new Date()
        };

        this.notifyObservers(stockData);
    }

    getPrice(): number {
        return this.price;
    }

    getSymbol(): string {
        return this.symbol;
    }
}

export class StockDisplay implements Observer<StockData> {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    update(stock: StockData): void {
        const arrow = stock.change >= 0 ? '↗' : '↘';
        const color = stock.change >= 0 ? '🟢' : '🔴';
        console.log(`[${this.id}] ${color} ${stock.symbol}: $${stock.price.toFixed(2)} ${arrow} ${stock.changePercent.toFixed(2)}%`);
    }

    getId(): string {
        return this.id;
    }
}

export class PortfolioTracker implements Observer<StockData> {
    private id: string;
    private holdings: Map<string, number> = new Map();

    constructor(id: string) {
        this.id = id;
    }

    addHolding(symbol: string, shares: number): void {
        this.holdings.set(symbol, shares);
    }

    update(stock: StockData): void {
        const shares = this.holdings.get(stock.symbol);
        if (shares) {
            const value = shares * stock.price;
            const change = shares * stock.change;
            console.log(`[${this.id}] Portfolio: ${stock.symbol} ${shares} shares = $${value.toFixed(2)} (${change >= 0 ? '+' : ''}$${change.toFixed(2)})`);
        }
    }

    getId(): string {
        return this.id;
    }
}

// Event System Example
export interface Event {
    type: string;
    data: any;
    timestamp: Date;
    source?: string;
}

export class EventEmitter extends Observable<Event> {
    emit(type: string, data: any, source?: string): void {
        const event: Event = {
            type,
            data,
            timestamp: new Date(),
            source
        };
        this.notifyObservers(event);
    }
}

export class EventLogger implements Observer<Event> {
    private id: string;
    private logs: Event[] = [];

    constructor(id: string) {
        this.id = id;
    }

    update(event: Event): void {
        this.logs.push(event);
        console.log(`[${this.id}] Event logged: ${event.type} from ${event.source || 'unknown'} at ${event.timestamp.toISOString()}`);
    }

    getLogs(): Event[] {
        return [...this.logs];
    }

    getLogsCount(): number {
        return this.logs.length;
    }

    getId(): string {
        return this.id;
    }
}

export class EventFilter implements Observer<Event> {
    private id: string;
    private allowedTypes: Set<string>;
    private filteredEmitter: EventEmitter;

    constructor(id: string, allowedTypes: string[]) {
        this.id = id;
        this.allowedTypes = new Set(allowedTypes);
        this.filteredEmitter = new EventEmitter();
    }

    update(event: Event): void {
        if (this.allowedTypes.has(event.type)) {
            console.log(`[${this.id}] Filtering event: ${event.type}`);
            this.filteredEmitter.emit(event.type, event.data, `filtered-${event.source}`);
        }
    }

    getFilteredEmitter(): EventEmitter {
        return this.filteredEmitter;
    }

    getId(): string {
        return this.id;
    }
}

// Async Observer Pattern
export interface AsyncObserver<T> {
    updateAsync(data: T): Promise<void>;
    getId(): string;
}

export class AsyncObservable<T> {
    private observers: Set<AsyncObserver<T>> = new Set();

    addObserver(observer: AsyncObserver<T>): void {
        this.observers.add(observer);
    }

    removeObserver(observer: AsyncObserver<T>): void {
        this.observers.delete(observer);
    }

    async notifyObservers(data: T): Promise<void> {
        const notifications = Array.from(this.observers).map(async observer => {
            try {
                await observer.updateAsync(data);
            } catch (error) {
                console.error(`Error notifying async observer ${observer.getId()}:`, error);
            }
        });

        await Promise.all(notifications);
    }

    async notifyObserversSequentially(data: T): Promise<void> {
        for (const observer of this.observers) {
            try {
                await observer.updateAsync(data);
            } catch (error) {
                console.error(`Error notifying async observer ${observer.getId()}:`, error);
            }
        }
    }
}

export class AsyncProcessor implements AsyncObserver<any> {
    private id: string;
    private processingTime: number;

    constructor(id: string, processingTime: number = 100) {
        this.id = id;
        this.processingTime = processingTime;
    }

    async updateAsync(data: any): Promise<void> {
        console.log(`[${this.id}] Starting async processing...`);
        await new Promise(resolve => setTimeout(resolve, this.processingTime));
        console.log(`[${this.id}] Completed async processing of data`);
    }

    getId(): string {
        return this.id;
    }
}
