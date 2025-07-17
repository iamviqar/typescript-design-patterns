/**
 * Builder Pattern
 * Construct complex objects step by step
 */

// Product
export class Computer {
    public cpu: string = '';
    public memory: string = '';
    public storage: string = '';
    public graphics: string = '';
    public motherboard: string = '';
    public powerSupply: string = '';
    public coolingSystem: string = '';
    public networkCard: string = '';
    public warranty: number = 0;

    public getSpecifications(): string {
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

    public getEstimatedPrice(): number {
        let price = 0;
        if (this.cpu.includes('i9')) price += 500;
        else if (this.cpu.includes('i7')) price += 350;
        else if (this.cpu.includes('i5')) price += 250;
        
        if (this.memory.includes('32GB')) price += 300;
        else if (this.memory.includes('16GB')) price += 150;
        else if (this.memory.includes('8GB')) price += 75;
        
        if (this.storage.includes('1TB')) price += 100;
        else if (this.storage.includes('512GB')) price += 50;
        
        if (this.graphics.includes('RTX')) price += 800;
        else if (this.graphics.includes('GTX')) price += 400;
        
        return price;
    }
}

// Builder interface
export interface IComputerBuilder {
    setCPU(cpu: string): IComputerBuilder;
    setMemory(memory: string): IComputerBuilder;
    setStorage(storage: string): IComputerBuilder;
    setGraphics(graphics: string): IComputerBuilder;
    setMotherboard(motherboard: string): IComputerBuilder;
    setPowerSupply(powerSupply: string): IComputerBuilder;
    setCoolingSystem(cooling: string): IComputerBuilder;
    setNetworkCard(network: string): IComputerBuilder;
    setWarranty(years: number): IComputerBuilder;
    build(): Computer;
}

// Concrete Builder
export class ComputerBuilder implements IComputerBuilder {
    private computer: Computer;

    constructor() {
        this.computer = new Computer();
    }

    setCPU(cpu: string): IComputerBuilder {
        this.computer.cpu = cpu;
        return this;
    }

    setMemory(memory: string): IComputerBuilder {
        this.computer.memory = memory;
        return this;
    }

    setStorage(storage: string): IComputerBuilder {
        this.computer.storage = storage;
        return this;
    }

    setGraphics(graphics: string): IComputerBuilder {
        this.computer.graphics = graphics;
        return this;
    }

    setMotherboard(motherboard: string): IComputerBuilder {
        this.computer.motherboard = motherboard;
        return this;
    }

    setPowerSupply(powerSupply: string): IComputerBuilder {
        this.computer.powerSupply = powerSupply;
        return this;
    }

    setCoolingSystem(cooling: string): IComputerBuilder {
        this.computer.coolingSystem = cooling;
        return this;
    }

    setNetworkCard(network: string): IComputerBuilder {
        this.computer.networkCard = network;
        return this;
    }

    setWarranty(years: number): IComputerBuilder {
        this.computer.warranty = years;
        return this;
    }

    build(): Computer {
        const result = this.computer;
        this.computer = new Computer(); // Reset for next build
        return result;
    }
}

// Director
export class ComputerDirector {
    constructor(private builder: IComputerBuilder) {}

    buildGamingComputer(): Computer {
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

    buildOfficeComputer(): Computer {
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

    buildWorkstationComputer(): Computer {
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

// Advanced example: SQL Query Builder
export class SQLQuery {
    public select: string[] = [];
    public from: string = '';
    public joins: string[] = [];
    public where: string[] = [];
    public groupBy: string[] = [];
    public having: string[] = [];
    public orderBy: string[] = [];
    public limit?: number;
    public offset?: number;

    toString(): string {
        const parts: string[] = [];

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

export class SQLQueryBuilder {
    private query: SQLQuery;

    constructor() {
        this.query = new SQLQuery();
    }

    select(...columns: string[]): SQLQueryBuilder {
        this.query.select.push(...columns);
        return this;
    }

    from(table: string): SQLQueryBuilder {
        this.query.from = table;
        return this;
    }

    join(table: string, condition: string): SQLQueryBuilder {
        this.query.joins.push(`JOIN ${table} ON ${condition}`);
        return this;
    }

    leftJoin(table: string, condition: string): SQLQueryBuilder {
        this.query.joins.push(`LEFT JOIN ${table} ON ${condition}`);
        return this;
    }

    rightJoin(table: string, condition: string): SQLQueryBuilder {
        this.query.joins.push(`RIGHT JOIN ${table} ON ${condition}`);
        return this;
    }

    where(condition: string): SQLQueryBuilder {
        this.query.where.push(condition);
        return this;
    }

    groupBy(...columns: string[]): SQLQueryBuilder {
        this.query.groupBy.push(...columns);
        return this;
    }

    having(condition: string): SQLQueryBuilder {
        this.query.having.push(condition);
        return this;
    }

    orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): SQLQueryBuilder {
        this.query.orderBy.push(`${column} ${direction}`);
        return this;
    }

    limit(count: number): SQLQueryBuilder {
        this.query.limit = count;
        return this;
    }

    offset(count: number): SQLQueryBuilder {
        this.query.offset = count;
        return this;
    }

    build(): SQLQuery {
        const result = this.query;
        this.query = new SQLQuery(); // Reset for next build
        return result;
    }
}

// HTTP Request Builder
export interface HttpHeaders {
    [key: string]: string;
}

export class HttpRequest {
    public method: string = 'GET';
    public url: string = '';
    public headers: HttpHeaders = {};
    public body?: any;
    public timeout: number = 30000;
    public retries: number = 0;

    toString(): string {
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

export class HttpRequestBuilder {
    private request: HttpRequest;

    constructor() {
        this.request = new HttpRequest();
    }

    method(method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'): HttpRequestBuilder {
        this.request.method = method;
        return this;
    }

    url(url: string): HttpRequestBuilder {
        this.request.url = url;
        return this;
    }

    header(key: string, value: string): HttpRequestBuilder {
        this.request.headers[key] = value;
        return this;
    }

    headers(headers: HttpHeaders): HttpRequestBuilder {
        this.request.headers = { ...this.request.headers, ...headers };
        return this;
    }

    body(body: any): HttpRequestBuilder {
        this.request.body = body;
        return this;
    }

    json(data: any): HttpRequestBuilder {
        this.request.body = data;
        this.request.headers['Content-Type'] = 'application/json';
        return this;
    }

    timeout(ms: number): HttpRequestBuilder {
        this.request.timeout = ms;
        return this;
    }

    retries(count: number): HttpRequestBuilder {
        this.request.retries = count;
        return this;
    }

    build(): HttpRequest {
        const result = this.request;
        this.request = new HttpRequest(); // Reset for next build
        return result;
    }

    // Convenience methods for common patterns
    static get(url: string): HttpRequestBuilder {
        return new HttpRequestBuilder().method('GET').url(url);
    }

    static post(url: string): HttpRequestBuilder {
        return new HttpRequestBuilder().method('POST').url(url);
    }

    static put(url: string): HttpRequestBuilder {
        return new HttpRequestBuilder().method('PUT').url(url);
    }

    static delete(url: string): HttpRequestBuilder {
        return new HttpRequestBuilder().method('DELETE').url(url);
    }
}
