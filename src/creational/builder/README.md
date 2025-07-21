# 👷 Builder Pattern

## Overview

The Builder pattern allows you to create different flavors of an object while avoiding constructor pollution. It's useful when there could be several flavors of an object or when there are a lot of steps involved in creation of an object.

## Real World Example

> Imagine you are at Hardee's and you order a specific deal, lets say, "Big Hardee" and they hand it over to you without *any questions*; this is the example of simple factory. But there are cases when the creation logic might involve more steps. For example you want a customized Subway deal, you have several options in how your burger is made e.g what bread do you want? what types of sauces would you like? What cheese would you want? etc. In such cases builder pattern comes to the rescue.

## In Plain Words

> Allows you to create different flavors of an object while avoiding constructor pollution. Useful when there could be several flavors of an object. Or when there are a lot of steps involved in creation of an object.

## Wikipedia Definition

> The builder pattern is an object creation software design pattern with the intentions of finding a solution to the telescoping constructor anti-pattern.

## The Telescoping Constructor Anti-Pattern

At one point or the other we have all seen a constructor like below:

```typescript
constructor(
    size: number, 
    cheese: boolean = true, 
    pepperoni: boolean = true, 
    tomato: boolean = false, 
    lettuce: boolean = true
) {}
```

As you can see; the number of constructor parameters can quickly get out of hand and it might become difficult to understand the arrangement of parameters. Plus this parameter list could keep on growing if you would want to add more options in future. This is called telescoping constructor anti-pattern.

## TypeScript Implementation

### Basic Structure

```typescript
// Product
class Product {
    private parts: string[] = [];
    
    public addPart(part: string): void {
        this.parts.push(part);
    }
    
    public listParts(): string {
        return `Product parts: ${this.parts.join(', ')}`;
    }
}

// Builder interface
interface Builder {
    reset(): void;
    buildPartA(): void;
    buildPartB(): void;
    buildPartC(): void;
}

// Concrete builder
class ConcreteBuilder implements Builder {
    private product: Product;
    
    constructor() {
        this.reset();
    }
    
    public reset(): void {
        this.product = new Product();
    }
    
    public buildPartA(): void {
        this.product.addPart('PartA');
    }
    
    public buildPartB(): void {
        this.product.addPart('PartB');
    }
    
    public buildPartC(): void {
        this.product.addPart('PartC');
    }
    
    public getProduct(): Product {
        const result = this.product;
        this.reset();
        return result;
    }
}

// Director
class Director {
    private builder: Builder;
    
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }
    
    public buildMinimalViableProduct(): void {
        this.builder.buildPartA();
    }
    
    public buildFullFeaturedProduct(): void {
        this.builder.buildPartA();
        this.builder.buildPartB();
        this.builder.buildPartC();
    }
}
```

### Real-world Examples

#### Computer Builder
```typescript
class Computer {
    private cpu: string = '';
    private memory: string = '';
    private storage: string = '';
    private graphics: string = '';
    private motherboard: string = '';
    private powerSupply: string = '';
    
    public setCPU(cpu: string): void {
        this.cpu = cpu;
    }
    
    public setMemory(memory: string): void {
        this.memory = memory;
    }
    
    public setStorage(storage: string): void {
        this.storage = storage;
    }
    
    public setGraphics(graphics: string): void {
        this.graphics = graphics;
    }
    
    public setMotherboard(motherboard: string): void {
        this.motherboard = motherboard;
    }
    
    public setPowerSupply(powerSupply: string): void {
        this.powerSupply = powerSupply;
    }
    
    public getSpecs(): string {
        return `Computer Specs:
        CPU: ${this.cpu}
        Memory: ${this.memory}
        Storage: ${this.storage}
        Graphics: ${this.graphics}
        Motherboard: ${this.motherboard}
        Power Supply: ${this.powerSupply}`;
    }
}

class ComputerBuilder {
    private computer: Computer;
    
    constructor() {
        this.computer = new Computer();
    }
    
    public setCPU(cpu: string): ComputerBuilder {
        this.computer.setCPU(cpu);
        return this;
    }
    
    public setMemory(memory: string): ComputerBuilder {
        this.computer.setMemory(memory);
        return this;
    }
    
    public setStorage(storage: string): ComputerBuilder {
        this.computer.setStorage(storage);
        return this;
    }
    
    public setGraphics(graphics: string): ComputerBuilder {
        this.computer.setGraphics(graphics);
        return this;
    }
    
    public setMotherboard(motherboard: string): ComputerBuilder {
        this.computer.setMotherboard(motherboard);
        return this;
    }
    
    public setPowerSupply(powerSupply: string): ComputerBuilder {
        this.computer.setPowerSupply(powerSupply);
        return this;
    }
    
    public build(): Computer {
        const result = this.computer;
        this.computer = new Computer(); // Reset for next build
        return result;
    }
}
```

#### SQL Query Builder
```typescript
class SQLQuery {
    private selectFields: string[] = [];
    private fromTable: string = '';
    private whereConditions: string[] = [];
    private orderByFields: string[] = [];
    private limitCount: number = 0;
    
    public setSelect(fields: string[]): void {
        this.selectFields = fields;
    }
    
    public setFrom(table: string): void {
        this.fromTable = table;
    }
    
    public addWhere(condition: string): void {
        this.whereConditions.push(condition);
    }
    
    public addOrderBy(field: string): void {
        this.orderByFields.push(field);
    }
    
    public setLimit(count: number): void {
        this.limitCount = count;
    }
    
    public build(): string {
        let query = `SELECT ${this.selectFields.join(', ')} FROM ${this.fromTable}`;
        
        if (this.whereConditions.length > 0) {
            query += ` WHERE ${this.whereConditions.join(' AND ')}`;
        }
        
        if (this.orderByFields.length > 0) {
            query += ` ORDER BY ${this.orderByFields.join(', ')}`;
        }
        
        if (this.limitCount > 0) {
            query += ` LIMIT ${this.limitCount}`;
        }
        
        return query;
    }
}

class SQLQueryBuilder {
    private query: SQLQuery;
    
    constructor() {
        this.query = new SQLQuery();
    }
    
    public select(...fields: string[]): SQLQueryBuilder {
        this.query.setSelect(fields);
        return this;
    }
    
    public from(table: string): SQLQueryBuilder {
        this.query.setFrom(table);
        return this;
    }
    
    public where(condition: string): SQLQueryBuilder {
        this.query.addWhere(condition);
        return this;
    }
    
    public orderBy(field: string): SQLQueryBuilder {
        this.query.addOrderBy(field);
        return this;
    }
    
    public limit(count: number): SQLQueryBuilder {
        this.query.setLimit(count);
        return this;
    }
    
    public build(): string {
        const result = this.query.build();
        this.query = new SQLQuery(); // Reset for next build
        return result;
    }
}
```

#### HTTP Request Builder
```typescript
interface RequestOptions {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
    timeout: number;
}

class HttpRequest {
    private options: Partial<RequestOptions> = {
        headers: {},
        timeout: 5000
    };
    
    public setMethod(method: string): void {
        this.options.method = method;
    }
    
    public setUrl(url: string): void {
        this.options.url = url;
    }
    
    public addHeader(key: string, value: string): void {
        if (!this.options.headers) {
            this.options.headers = {};
        }
        this.options.headers[key] = value;
    }
    
    public setBody(body: any): void {
        this.options.body = body;
    }
    
    public setTimeout(timeout: number): void {
        this.options.timeout = timeout;
    }
    
    public getOptions(): RequestOptions {
        if (!this.options.method || !this.options.url) {
            throw new Error('Method and URL are required');
        }
        return this.options as RequestOptions;
    }
}

class HttpRequestBuilder {
    private request: HttpRequest;
    
    constructor() {
        this.request = new HttpRequest();
    }
    
    public get(url: string): HttpRequestBuilder {
        this.request.setMethod('GET');
        this.request.setUrl(url);
        return this;
    }
    
    public post(url: string): HttpRequestBuilder {
        this.request.setMethod('POST');
        this.request.setUrl(url);
        return this;
    }
    
    public put(url: string): HttpRequestBuilder {
        this.request.setMethod('PUT');
        this.request.setUrl(url);
        return this;
    }
    
    public delete(url: string): HttpRequestBuilder {
        this.request.setMethod('DELETE');
        this.request.setUrl(url);
        return this;
    }
    
    public withHeader(key: string, value: string): HttpRequestBuilder {
        this.request.addHeader(key, value);
        return this;
    }
    
    public withBody(body: any): HttpRequestBuilder {
        this.request.setBody(body);
        return this;
    }
    
    public withTimeout(timeout: number): HttpRequestBuilder {
        this.request.setTimeout(timeout);
        return this;
    }
    
    public build(): RequestOptions {
        const result = this.request.getOptions();
        this.request = new HttpRequest(); // Reset for next build
        return result;
    }
}
```

## Usage Examples

```typescript
// Computer Builder example
const computer = new ComputerBuilder()
    .setCPU('Intel i9-13900K')
    .setMemory('32GB DDR5')
    .setStorage('1TB NVMe SSD')
    .setGraphics('NVIDIA RTX 4080')
    .setMotherboard('ASUS ROG Strix Z790')
    .setPowerSupply('850W 80+ Gold')
    .build();

console.log(computer.getSpecs());

// SQL Query Builder example
const query = new SQLQueryBuilder()
    .select('id', 'name', 'email')
    .from('users')
    .where('age > 18')
    .where('active = true')
    .orderBy('name')
    .limit(10)
    .build();

console.log(query);
// Output: SELECT id, name, email FROM users WHERE age > 18 AND active = true ORDER BY name LIMIT 10

// HTTP Request Builder example
const requestOptions = new HttpRequestBuilder()
    .post('https://api.example.com/users')
    .withHeader('Content-Type', 'application/json')
    .withHeader('Authorization', 'Bearer token123')
    .withBody({ name: 'John Doe', email: 'john@example.com' })
    .withTimeout(10000)
    .build();

console.log(requestOptions);
```

## When to Use

✅ **Good Use Cases:**
- When creating complex objects with many optional parameters
- When the construction process should be independent of the object's representation
- When you need different representations of the same construction process
- When you want to avoid telescoping constructors

❌ **Avoid When:**
- Simple objects with few parameters
- When the construction process is straightforward
- When immutability is not required

## Benefits

- **Readable Code**: Method chaining makes object construction clear
- **Flexible Construction**: Can create different representations
- **Parameter Validation**: Can validate parameters during construction
- **Immutable Objects**: Can create immutable objects step by step

## Drawbacks

- **Code Complexity**: More code than simple constructors
- **Memory Overhead**: Builder objects take additional memory
- **Learning Curve**: May be confusing for simple use cases

## Builder vs Factory

| Builder | Factory |
|---------|---------|
| Constructs complex objects step by step | Creates objects in one shot |
| Focuses on how the object is built | Focuses on what object to create |
| Returns the final product at the end | Returns product immediately |
| Controls the construction process | Delegates construction to subclasses |

## Best Practices

1. **Method Chaining**: Return `this` from builder methods for fluent interface
2. **Validation**: Validate required parameters in the `build()` method
3. **Reset Builder**: Reset builder state after building for reuse
4. **Immutable Products**: Consider making the final product immutable
5. **Clear Interface**: Make it obvious which parameters are required vs optional

## Modern TypeScript Features

```typescript
// Using generics for type safety
class GenericBuilder<T> {
    protected product: Partial<T> = {};
    
    public build(): T {
        // Validate required fields
        return this.product as T;
    }
}

// Using conditional types
type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Using template literals for method names
type BuilderMethods<T> = {
    [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => BuilderMethods<T>;
};
```

## Variations

### Director Pattern
```typescript
class ComputerDirector {
    public buildGamingPC(builder: ComputerBuilder): Computer {
        return builder
            .setCPU('Intel i9-13900K')
            .setMemory('32GB DDR5')
            .setGraphics('NVIDIA RTX 4090')
            .setStorage('2TB NVMe SSD')
            .build();
    }
    
    public buildOfficePC(builder: ComputerBuilder): Computer {
        return builder
            .setCPU('Intel i5-13400')
            .setMemory('16GB DDR4')
            .setGraphics('Integrated')
            .setStorage('512GB SSD')
            .build();
    }
}
```

### Step Builder Pattern
```typescript
interface CPUStep {
    setCPU(cpu: string): MemoryStep;
}

interface MemoryStep {
    setMemory(memory: string): BuildStep;
}

interface BuildStep {
    setStorage(storage: string): BuildStep;
    setGraphics(graphics: string): BuildStep;
    build(): Computer;
}

class StepComputerBuilder implements CPUStep, MemoryStep, BuildStep {
    // Implementation ensuring required steps are followed
}
```

## Files in This Implementation

- `Builder.ts` - Main builder pattern implementations
- `Demo.ts` - Demonstration and usage examples
- `README.md` - This documentation file

## Running the Example

```bash
npm start builder
```

## Related Patterns

- **Abstract Factory**: Can use builders to create products
- **Composite**: Often built using the builder pattern
- **Factory Method**: Can be used within builders to create components
- **Strategy**: Builder can use different strategies for construction
