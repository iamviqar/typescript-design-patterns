"use strict";
/**
 * Observer Pattern Demo
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demonstrateObserver = demonstrateObserver;
const Observer_1 = require("./Observer");
async function demonstrateObserver() {
    console.log('=== Observer Pattern Demo ===\n');
    // Weather Station Demo
    console.log('1. Weather Station:');
    const weatherStation = new Observer_1.WeatherStation();
    const tempDisplay1 = new Observer_1.TemperatureDisplay('TempDisplay-1');
    const tempDisplay2 = new Observer_1.TemperatureDisplay('TempDisplay-2');
    const humidityDisplay = new Observer_1.HumidityDisplay('HumidityDisplay');
    const forecast = new Observer_1.WeatherForecast('WeatherForecast');
    weatherStation.addObserver(tempDisplay1);
    weatherStation.addObserver(tempDisplay2);
    weatherStation.addObserver(humidityDisplay);
    weatherStation.addObserver(forecast);
    console.log(`Observers registered: ${weatherStation.getObserverCount()}`);
    weatherStation.setWeatherData(25, 60, 1020);
    weatherStation.setWeatherData(28, 55, 1025);
    weatherStation.setWeatherData(22, 70, 1015);
    console.log('\nRemoving one temperature display...');
    weatherStation.removeObserver(tempDisplay2);
    weatherStation.setWeatherData(20, 75, 1010);
    console.log();
    // Stock Market Demo
    console.log('2. Stock Market:');
    const appleStock = new Observer_1.Stock('AAPL', 150.00);
    const googleStock = new Observer_1.Stock('GOOGL', 2800.00);
    const stockDisplay = new Observer_1.StockDisplay('StockDisplay');
    const portfolio = new Observer_1.PortfolioTracker('MyPortfolio');
    // Add holdings to portfolio
    portfolio.addHolding('AAPL', 100);
    portfolio.addHolding('GOOGL', 10);
    appleStock.addObserver(stockDisplay);
    appleStock.addObserver(portfolio);
    googleStock.addObserver(stockDisplay);
    googleStock.addObserver(portfolio);
    appleStock.setPrice(155.50);
    googleStock.setPrice(2750.00);
    appleStock.setPrice(148.25);
    googleStock.setPrice(2820.50);
    console.log();
    // Event System Demo
    console.log('3. Event System:');
    const eventEmitter = new Observer_1.EventEmitter();
    const logger = new Observer_1.EventLogger('SystemLogger');
    const errorFilter = new Observer_1.EventFilter('ErrorFilter', ['error', 'warning']);
    const debugFilter = new Observer_1.EventFilter('DebugFilter', ['debug', 'info']);
    eventEmitter.addObserver(logger);
    eventEmitter.addObserver(errorFilter);
    eventEmitter.addObserver(debugFilter);
    // Set up filtered event handlers
    const errorLogger = new Observer_1.EventLogger('ErrorLogger');
    const debugLogger = new Observer_1.EventLogger('DebugLogger');
    errorFilter.getFilteredEmitter().addObserver(errorLogger);
    debugFilter.getFilteredEmitter().addObserver(debugLogger);
    eventEmitter.emit('info', { message: 'Application started' }, 'App');
    eventEmitter.emit('error', { message: 'Database connection failed' }, 'DB');
    eventEmitter.emit('debug', { message: 'Processing user request' }, 'API');
    eventEmitter.emit('warning', { message: 'High memory usage detected' }, 'Monitor');
    console.log(`\nTotal events logged: ${logger.getLogsCount()}`);
    console.log(`Error events logged: ${errorLogger.getLogsCount()}`);
    console.log(`Debug events logged: ${debugLogger.getLogsCount()}\n`);
    // Async Observer Demo
    console.log('4. Async Observer Pattern:');
    const asyncObservable = new Observer_1.AsyncObservable();
    const processor1 = new Observer_1.AsyncProcessor('AsyncProcessor1', 200);
    const processor2 = new Observer_1.AsyncProcessor('AsyncProcessor2', 300);
    const processor3 = new Observer_1.AsyncProcessor('AsyncProcessor3', 100);
    asyncObservable.addObserver(processor1);
    asyncObservable.addObserver(processor2);
    asyncObservable.addObserver(processor3);
    console.log('Parallel async notification:');
    const startTime = Date.now();
    await asyncObservable.notifyObservers('Parallel processing data');
    console.log(`Parallel processing completed in ${Date.now() - startTime}ms\n`);
    console.log('Sequential async notification:');
    const startTime2 = Date.now();
    await asyncObservable.notifyObserversSequentially('Sequential processing data');
    console.log(`Sequential processing completed in ${Date.now() - startTime2}ms\n`);
    // Observer Management Demo
    console.log('5. Observer Management:');
    const observable = new Observer_1.WeatherStation();
    const display1 = new Observer_1.TemperatureDisplay('Display1');
    const display2 = new Observer_1.TemperatureDisplay('Display2');
    const display3 = new Observer_1.TemperatureDisplay('Display3');
    observable.addObserver(display1);
    observable.addObserver(display2);
    observable.addObserver(display3);
    console.log(`Observers: ${observable.getObserverCount()}`);
    console.log(`Has Display1: ${observable.hasObserver(display1)}`);
    observable.setWeatherData(30, 40, 1030);
    console.log('\nClearing all observers...');
    observable.clearObservers();
    console.log(`Observers after clear: ${observable.getObserverCount()}`);
    observable.setWeatherData(35, 45, 1035); // No output expected
    console.log('\n=== Observer Pattern Demo Complete ===');
}
// Export for external usage
__exportStar(require("./Observer"), exports);
//# sourceMappingURL=Demo.js.map