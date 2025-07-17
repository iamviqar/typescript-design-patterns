/**
 * Observer Pattern
 * Define a one-to-many dependency between objects so that when one object changes state,
 * all its dependents are notified and updated automatically
 */
export interface Observer<T = any> {
    update(data: T): void;
    getId(): string;
}
export interface Subject<T = any> {
    addObserver(observer: Observer<T>): void;
    removeObserver(observer: Observer<T>): void;
    notifyObservers(data: T): void;
}
export declare class Observable<T> implements Subject<T> {
    private observers;
    addObserver(observer: Observer<T>): void;
    removeObserver(observer: Observer<T>): void;
    notifyObservers(data: T): void;
    getObserverCount(): number;
    hasObserver(observer: Observer<T>): boolean;
    clearObservers(): void;
}
export interface WeatherData {
    temperature: number;
    humidity: number;
    pressure: number;
    timestamp: Date;
}
export declare class WeatherStation extends Observable<WeatherData> {
    private currentWeather;
    constructor();
    setWeatherData(temperature: number, humidity: number, pressure: number): void;
    getCurrentWeather(): WeatherData;
}
export declare class TemperatureDisplay implements Observer<WeatherData> {
    private id;
    constructor(id: string);
    update(weather: WeatherData): void;
    getId(): string;
}
export declare class HumidityDisplay implements Observer<WeatherData> {
    private id;
    constructor(id: string);
    update(weather: WeatherData): void;
    getId(): string;
}
export declare class WeatherForecast implements Observer<WeatherData> {
    private id;
    private history;
    constructor(id: string);
    update(weather: WeatherData): void;
    private generateForecast;
    getId(): string;
}
export interface StockData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    timestamp: Date;
}
export declare class Stock extends Observable<StockData> {
    private symbol;
    private price;
    private previousPrice;
    constructor(symbol: string, initialPrice: number);
    setPrice(newPrice: number): void;
    getPrice(): number;
    getSymbol(): string;
}
export declare class StockDisplay implements Observer<StockData> {
    private id;
    constructor(id: string);
    update(stock: StockData): void;
    getId(): string;
}
export declare class PortfolioTracker implements Observer<StockData> {
    private id;
    private holdings;
    constructor(id: string);
    addHolding(symbol: string, shares: number): void;
    update(stock: StockData): void;
    getId(): string;
}
export interface Event {
    type: string;
    data: any;
    timestamp: Date;
    source?: string;
}
export declare class EventEmitter extends Observable<Event> {
    emit(type: string, data: any, source?: string): void;
}
export declare class EventLogger implements Observer<Event> {
    private id;
    private logs;
    constructor(id: string);
    update(event: Event): void;
    getLogs(): Event[];
    getLogsCount(): number;
    getId(): string;
}
export declare class EventFilter implements Observer<Event> {
    private id;
    private allowedTypes;
    private filteredEmitter;
    constructor(id: string, allowedTypes: string[]);
    update(event: Event): void;
    getFilteredEmitter(): EventEmitter;
    getId(): string;
}
export interface AsyncObserver<T> {
    updateAsync(data: T): Promise<void>;
    getId(): string;
}
export declare class AsyncObservable<T> {
    private observers;
    addObserver(observer: AsyncObserver<T>): void;
    removeObserver(observer: AsyncObserver<T>): void;
    notifyObservers(data: T): Promise<void>;
    notifyObserversSequentially(data: T): Promise<void>;
}
export declare class AsyncProcessor implements AsyncObserver<any> {
    private id;
    private processingTime;
    constructor(id: string, processingTime?: number);
    updateAsync(data: any): Promise<void>;
    getId(): string;
}
//# sourceMappingURL=Observer.d.ts.map