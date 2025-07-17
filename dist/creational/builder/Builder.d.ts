/**
 * Builder Pattern
 * Construct complex objects step by step
 */
export declare class Computer {
    cpu: string;
    memory: string;
    storage: string;
    graphics: string;
    motherboard: string;
    powerSupply: string;
    coolingSystem: string;
    networkCard: string;
    warranty: number;
    getSpecifications(): string;
    getEstimatedPrice(): number;
}
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
export declare class ComputerBuilder implements IComputerBuilder {
    private computer;
    constructor();
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
export declare class ComputerDirector {
    private builder;
    constructor(builder: IComputerBuilder);
    buildGamingComputer(): Computer;
    buildOfficeComputer(): Computer;
    buildWorkstationComputer(): Computer;
}
export declare class SQLQuery {
    select: string[];
    from: string;
    joins: string[];
    where: string[];
    groupBy: string[];
    having: string[];
    orderBy: string[];
    limit?: number;
    offset?: number;
    toString(): string;
}
export declare class SQLQueryBuilder {
    private query;
    constructor();
    select(...columns: string[]): SQLQueryBuilder;
    from(table: string): SQLQueryBuilder;
    join(table: string, condition: string): SQLQueryBuilder;
    leftJoin(table: string, condition: string): SQLQueryBuilder;
    rightJoin(table: string, condition: string): SQLQueryBuilder;
    where(condition: string): SQLQueryBuilder;
    groupBy(...columns: string[]): SQLQueryBuilder;
    having(condition: string): SQLQueryBuilder;
    orderBy(column: string, direction?: 'ASC' | 'DESC'): SQLQueryBuilder;
    limit(count: number): SQLQueryBuilder;
    offset(count: number): SQLQueryBuilder;
    build(): SQLQuery;
}
export interface HttpHeaders {
    [key: string]: string;
}
export declare class HttpRequest {
    method: string;
    url: string;
    headers: HttpHeaders;
    body?: any;
    timeout: number;
    retries: number;
    toString(): string;
}
export declare class HttpRequestBuilder {
    private request;
    constructor();
    method(method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'): HttpRequestBuilder;
    url(url: string): HttpRequestBuilder;
    header(key: string, value: string): HttpRequestBuilder;
    headers(headers: HttpHeaders): HttpRequestBuilder;
    body(body: any): HttpRequestBuilder;
    json(data: any): HttpRequestBuilder;
    timeout(ms: number): HttpRequestBuilder;
    retries(count: number): HttpRequestBuilder;
    build(): HttpRequest;
    static get(url: string): HttpRequestBuilder;
    static post(url: string): HttpRequestBuilder;
    static put(url: string): HttpRequestBuilder;
    static delete(url: string): HttpRequestBuilder;
}
//# sourceMappingURL=Builder.d.ts.map