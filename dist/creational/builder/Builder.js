"use strict";
/**
 * Builder Pattern
 * Construct complex objects step by step
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestBuilder = exports.HttpRequest = exports.SQLQueryBuilder = exports.SQLQuery = exports.ComputerDirector = exports.ComputerBuilder = exports.Computer = void 0;
// Product
class Computer {
    constructor() {
        this.cpu = '';
        this.memory = '';
        this.storage = '';
        this.graphics = '';
        this.motherboard = '';
        this.powerSupply = '';
        this.coolingSystem = '';
        this.networkCard = '';
        this.warranty = 0;
    }
    getSpecifications() {
        const specs = [
            `CPU: ${this.cpu || 'Not specified'}`,
            `Memory: ${this.memory || 'Not specified'}`,
            `Storage: ${this.storage || 'Not specified'}`,
            `Graphics: ${this.graphics || 'Not specified'}`,
            `Motherboard: ${this.motherboard || 'Not specified'}`,
            `Power Supply: ${this.powerSupply || 'Not specified'}`,
            `Cooling: ${this.coolingSystem || 'Not specified'}`,
            `Network: ${this.networkCard || 'Not specified'}`,
            `Warranty: ${this.warranty} years`
        ];
        return specs.join('\n');
    }
    getEstimatedPrice() {
        let price = 0;
        if (this.cpu.includes('i9'))
            price += 500;
        else if (this.cpu.includes('i7'))
            price += 350;
        else if (this.cpu.includes('i5'))
            price += 250;
        if (this.memory.includes('32GB'))
            price += 300;
        else if (this.memory.includes('16GB'))
            price += 150;
        else if (this.memory.includes('8GB'))
            price += 75;
        if (this.storage.includes('1TB'))
            price += 100;
        else if (this.storage.includes('512GB'))
            price += 50;
        if (this.graphics.includes('RTX'))
            price += 800;
        else if (this.graphics.includes('GTX'))
            price += 400;
        return price;
    }
}
exports.Computer = Computer;
// Concrete Builder
class ComputerBuilder {
    constructor() {
        this.computer = new Computer();
    }
    setCPU(cpu) {
        this.computer.cpu = cpu;
        return this;
    }
    setMemory(memory) {
        this.computer.memory = memory;
        return this;
    }
    setStorage(storage) {
        this.computer.storage = storage;
        return this;
    }
    setGraphics(graphics) {
        this.computer.graphics = graphics;
        return this;
    }
    setMotherboard(motherboard) {
        this.computer.motherboard = motherboard;
        return this;
    }
    setPowerSupply(powerSupply) {
        this.computer.powerSupply = powerSupply;
        return this;
    }
    setCoolingSystem(cooling) {
        this.computer.coolingSystem = cooling;
        return this;
    }
    setNetworkCard(network) {
        this.computer.networkCard = network;
        return this;
    }
    setWarranty(years) {
        this.computer.warranty = years;
        return this;
    }
    build() {
        const result = this.computer;
        this.computer = new Computer(); // Reset for next build
        return result;
    }
}
exports.ComputerBuilder = ComputerBuilder;
// Director
class ComputerDirector {
    constructor(builder) {
        this.builder = builder;
    }
    buildGamingComputer() {
        return this.builder
            .setCPU('Intel i9-13900K')
            .setMemory('32GB DDR5-5600')
            .setStorage('1TB NVMe SSD')
            .setGraphics('NVIDIA RTX 4080')
            .setMotherboard('ASUS ROG Strix Z790-E')
            .setPowerSupply('850W 80+ Gold Modular')
            .setCoolingSystem('AIO Liquid Cooler 280mm')
            .setNetworkCard('Wi-Fi 6E + Ethernet')
            .setWarranty(3)
            .build();
    }
    buildOfficeComputer() {
        return this.builder
            .setCPU('Intel i5-13400')
            .setMemory('16GB DDR4-3200')
            .setStorage('512GB SATA SSD')
            .setGraphics('Integrated Intel UHD')
            .setMotherboard('MSI B760M Pro-A')
            .setPowerSupply('500W 80+ Bronze')
            .setCoolingSystem('Stock CPU Cooler')
            .setNetworkCard('Ethernet')
            .setWarranty(1)
            .build();
    }
    buildWorkstationComputer() {
        return this.builder
            .setCPU('Intel i7-13700K')
            .setMemory('64GB DDR5-4800')
            .setStorage('2TB NVMe SSD')
            .setGraphics('NVIDIA RTX 4070')
            .setMotherboard('ASUS Pro WS W790-ACE')
            .setPowerSupply('750W 80+ Platinum')
            .setCoolingSystem('Tower Air Cooler')
            .setNetworkCard('Wi-Fi 6 + Dual Ethernet')
            .setWarranty(5)
            .build();
    }
}
exports.ComputerDirector = ComputerDirector;
// Advanced example: SQL Query Builder
class SQLQuery {
    constructor() {
        this.select = [];
        this.from = '';
        this.joins = [];
        this.where = [];
        this.groupBy = [];
        this.having = [];
        this.orderBy = [];
    }
    toString() {
        const parts = [];
        if (this.select.length > 0) {
            parts.push(`SELECT ${this.select.join(', ')}`);
        }
        if (this.from) {
            parts.push(`FROM ${this.from}`);
        }
        if (this.joins.length > 0) {
            parts.push(this.joins.join(' '));
        }
        if (this.where.length > 0) {
            parts.push(`WHERE ${this.where.join(' AND ')}`);
        }
        if (this.groupBy.length > 0) {
            parts.push(`GROUP BY ${this.groupBy.join(', ')}`);
        }
        if (this.having.length > 0) {
            parts.push(`HAVING ${this.having.join(' AND ')}`);
        }
        if (this.orderBy.length > 0) {
            parts.push(`ORDER BY ${this.orderBy.join(', ')}`);
        }
        if (this.limit !== undefined) {
            parts.push(`LIMIT ${this.limit}`);
        }
        if (this.offset !== undefined) {
            parts.push(`OFFSET ${this.offset}`);
        }
        return parts.join(' ');
    }
}
exports.SQLQuery = SQLQuery;
class SQLQueryBuilder {
    constructor() {
        this.query = new SQLQuery();
    }
    select(...columns) {
        this.query.select.push(...columns);
        return this;
    }
    from(table) {
        this.query.from = table;
        return this;
    }
    join(table, condition) {
        this.query.joins.push(`JOIN ${table} ON ${condition}`);
        return this;
    }
    leftJoin(table, condition) {
        this.query.joins.push(`LEFT JOIN ${table} ON ${condition}`);
        return this;
    }
    rightJoin(table, condition) {
        this.query.joins.push(`RIGHT JOIN ${table} ON ${condition}`);
        return this;
    }
    where(condition) {
        this.query.where.push(condition);
        return this;
    }
    groupBy(...columns) {
        this.query.groupBy.push(...columns);
        return this;
    }
    having(condition) {
        this.query.having.push(condition);
        return this;
    }
    orderBy(column, direction = 'ASC') {
        this.query.orderBy.push(`${column} ${direction}`);
        return this;
    }
    limit(count) {
        this.query.limit = count;
        return this;
    }
    offset(count) {
        this.query.offset = count;
        return this;
    }
    build() {
        const result = this.query;
        this.query = new SQLQuery(); // Reset for next build
        return result;
    }
}
exports.SQLQueryBuilder = SQLQueryBuilder;
class HttpRequest {
    constructor() {
        this.method = 'GET';
        this.url = '';
        this.headers = {};
        this.timeout = 30000;
        this.retries = 0;
    }
    toString() {
        const parts = [
            `${this.method} ${this.url}`,
            `Headers: ${JSON.stringify(this.headers)}`,
            `Timeout: ${this.timeout}ms`,
            `Retries: ${this.retries}`
        ];
        if (this.body) {
            parts.push(`Body: ${JSON.stringify(this.body)}`);
        }
        return parts.join('\n');
    }
}
exports.HttpRequest = HttpRequest;
class HttpRequestBuilder {
    constructor() {
        this.request = new HttpRequest();
    }
    method(method) {
        this.request.method = method;
        return this;
    }
    url(url) {
        this.request.url = url;
        return this;
    }
    header(key, value) {
        this.request.headers[key] = value;
        return this;
    }
    headers(headers) {
        this.request.headers = { ...this.request.headers, ...headers };
        return this;
    }
    body(body) {
        this.request.body = body;
        return this;
    }
    json(data) {
        this.request.body = data;
        this.request.headers['Content-Type'] = 'application/json';
        return this;
    }
    timeout(ms) {
        this.request.timeout = ms;
        return this;
    }
    retries(count) {
        this.request.retries = count;
        return this;
    }
    build() {
        const result = this.request;
        this.request = new HttpRequest(); // Reset for next build
        return result;
    }
    // Convenience methods for common patterns
    static get(url) {
        return new HttpRequestBuilder().method('GET').url(url);
    }
    static post(url) {
        return new HttpRequestBuilder().method('POST').url(url);
    }
    static put(url) {
        return new HttpRequestBuilder().method('PUT').url(url);
    }
    static delete(url) {
        return new HttpRequestBuilder().method('DELETE').url(url);
    }
}
exports.HttpRequestBuilder = HttpRequestBuilder;
//# sourceMappingURL=Builder.js.map