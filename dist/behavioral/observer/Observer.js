"use strict";
/**
 * Observer Pattern
 * Define a one-to-many dependency between objects so that when one object changes state,
 * all its dependents are notified and updated automatically
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncProcessor = exports.AsyncObservable = exports.EventFilter = exports.EventLogger = exports.EventEmitter = exports.PortfolioTracker = exports.StockDisplay = exports.Stock = exports.WeatherForecast = exports.HumidityDisplay = exports.TemperatureDisplay = exports.WeatherStation = exports.Observable = void 0;
// Generic Observable class
class Observable {
    constructor() {
        this.observers = new Set();
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.delete(observer);
    }
    notifyObservers(data) {
        this.observers.forEach(observer => {
            try {
                observer.update(data);
            }
            catch (error) {
                console.error(`Error notifying observer ${observer.getId()}:`, error);
            }
        });
    }
    getObserverCount() {
        return this.observers.size;
    }
    hasObserver(observer) {
        return this.observers.has(observer);
    }
    clearObservers() {
        this.observers.clear();
    }
}
exports.Observable = Observable;
class WeatherStation extends Observable {
    constructor() {
        super();
        this.currentWeather = {
            temperature: 20,
            humidity: 50,
            pressure: 1013.25,
            timestamp: new Date()
        };
    }
    setWeatherData(temperature, humidity, pressure) {
        this.currentWeather = {
            temperature,
            humidity,
            pressure,
            timestamp: new Date()
        };
        this.notifyObservers(this.currentWeather);
    }
    getCurrentWeather() {
        return { ...this.currentWeather };
    }
}
exports.WeatherStation = WeatherStation;
class TemperatureDisplay {
    constructor(id) {
        this.id = id;
    }
    update(weather) {
        console.log(`[${this.id}] Temperature Display: ${weather.temperature}°C`);
    }
    getId() {
        return this.id;
    }
}
exports.TemperatureDisplay = TemperatureDisplay;
class HumidityDisplay {
    constructor(id) {
        this.id = id;
    }
    update(weather) {
        console.log(`[${this.id}] Humidity Display: ${weather.humidity}%`);
    }
    getId() {
        return this.id;
    }
}
exports.HumidityDisplay = HumidityDisplay;
class WeatherForecast {
    constructor(id) {
        this.history = [];
        this.id = id;
    }
    update(weather) {
        this.history.push(weather);
        if (this.history.length > 10) {
            this.history.shift(); // Keep only last 10 readings
        }
        const forecast = this.generateForecast();
        console.log(`[${this.id}] Weather Forecast: ${forecast}`);
    }
    generateForecast() {
        if (this.history.length < 2) {
            return 'Not enough data';
        }
        const latest = this.history[this.history.length - 1];
        const previous = this.history[this.history.length - 2];
        const tempTrend = latest.temperature - previous.temperature;
        const pressureTrend = latest.pressure - previous.pressure;
        if (pressureTrend > 1 && tempTrend > 0) {
            return 'Improving weather expected';
        }
        else if (pressureTrend < -1 && tempTrend < 0) {
            return 'Stormy weather expected';
        }
        else {
            return 'Stable weather expected';
        }
    }
    getId() {
        return this.id;
    }
}
exports.WeatherForecast = WeatherForecast;
class Stock extends Observable {
    constructor(symbol, initialPrice) {
        super();
        this.symbol = symbol;
        this.price = initialPrice;
        this.previousPrice = initialPrice;
    }
    setPrice(newPrice) {
        this.previousPrice = this.price;
        this.price = newPrice;
        const change = this.price - this.previousPrice;
        const changePercent = (change / this.previousPrice) * 100;
        const stockData = {
            symbol: this.symbol,
            price: this.price,
            change: change,
            changePercent: changePercent,
            volume: Math.floor(Math.random() * 1000000) + 100000,
            timestamp: new Date()
        };
        this.notifyObservers(stockData);
    }
    getPrice() {
        return this.price;
    }
    getSymbol() {
        return this.symbol;
    }
}
exports.Stock = Stock;
class StockDisplay {
    constructor(id) {
        this.id = id;
    }
    update(stock) {
        const arrow = stock.change >= 0 ? '↗' : '↘';
        const color = stock.change >= 0 ? '🟢' : '🔴';
        console.log(`[${this.id}] ${color} ${stock.symbol}: $${stock.price.toFixed(2)} ${arrow} ${stock.changePercent.toFixed(2)}%`);
    }
    getId() {
        return this.id;
    }
}
exports.StockDisplay = StockDisplay;
class PortfolioTracker {
    constructor(id) {
        this.holdings = new Map();
        this.id = id;
    }
    addHolding(symbol, shares) {
        this.holdings.set(symbol, shares);
    }
    update(stock) {
        const shares = this.holdings.get(stock.symbol);
        if (shares) {
            const value = shares * stock.price;
            const change = shares * stock.change;
            console.log(`[${this.id}] Portfolio: ${stock.symbol} ${shares} shares = $${value.toFixed(2)} (${change >= 0 ? '+' : ''}$${change.toFixed(2)})`);
        }
    }
    getId() {
        return this.id;
    }
}
exports.PortfolioTracker = PortfolioTracker;
class EventEmitter extends Observable {
    emit(type, data, source) {
        const event = {
            type,
            data,
            timestamp: new Date(),
            source
        };
        this.notifyObservers(event);
    }
}
exports.EventEmitter = EventEmitter;
class EventLogger {
    constructor(id) {
        this.logs = [];
        this.id = id;
    }
    update(event) {
        this.logs.push(event);
        console.log(`[${this.id}] Event logged: ${event.type} from ${event.source || 'unknown'} at ${event.timestamp.toISOString()}`);
    }
    getLogs() {
        return [...this.logs];
    }
    getLogsCount() {
        return this.logs.length;
    }
    getId() {
        return this.id;
    }
}
exports.EventLogger = EventLogger;
class EventFilter {
    constructor(id, allowedTypes) {
        this.id = id;
        this.allowedTypes = new Set(allowedTypes);
        this.filteredEmitter = new EventEmitter();
    }
    update(event) {
        if (this.allowedTypes.has(event.type)) {
            console.log(`[${this.id}] Filtering event: ${event.type}`);
            this.filteredEmitter.emit(event.type, event.data, `filtered-${event.source}`);
        }
    }
    getFilteredEmitter() {
        return this.filteredEmitter;
    }
    getId() {
        return this.id;
    }
}
exports.EventFilter = EventFilter;
class AsyncObservable {
    constructor() {
        this.observers = new Set();
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.delete(observer);
    }
    async notifyObservers(data) {
        const notifications = Array.from(this.observers).map(async (observer) => {
            try {
                await observer.updateAsync(data);
            }
            catch (error) {
                console.error(`Error notifying async observer ${observer.getId()}:`, error);
            }
        });
        await Promise.all(notifications);
    }
    async notifyObserversSequentially(data) {
        for (const observer of this.observers) {
            try {
                await observer.updateAsync(data);
            }
            catch (error) {
                console.error(`Error notifying async observer ${observer.getId()}:`, error);
            }
        }
    }
}
exports.AsyncObservable = AsyncObservable;
class AsyncProcessor {
    constructor(id, processingTime = 100) {
        this.id = id;
        this.processingTime = processingTime;
    }
    async updateAsync(data) {
        console.log(`[${this.id}] Starting async processing...`);
        await new Promise(resolve => setTimeout(resolve, this.processingTime));
        console.log(`[${this.id}] Completed async processing of data`);
    }
    getId() {
        return this.id;
    }
}
exports.AsyncProcessor = AsyncProcessor;
//# sourceMappingURL=Observer.js.map