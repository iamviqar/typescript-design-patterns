/**
 * Builder Pattern Demo
 */

import {
    ComputerBuilder,
    ComputerDirector,
    SQLQueryBuilder,
    HttpRequestBuilder
} from './Builder';

export function demonstrateBuilder(): void {
    console.log('=== Builder Pattern Demo ===\n');

    // Computer Builder Demo
    console.log('1. Computer Builder with Director:');
    const builder = new ComputerBuilder();
    const director = new ComputerDirector(builder);

    const gamingPC = director.buildGamingComputer();
    console.log('Gaming Computer:');
    console.log(gamingPC.getSpecifications());
    console.log(`Estimated Price: $${gamingPC.getEstimatedPrice()}\n`);

    const officePC = director.buildOfficeComputer();
    console.log('Office Computer:');
    console.log(officePC.getSpecifications());
    console.log(`Estimated Price: $${officePC.getEstimatedPrice()}\n`);

    // Custom Computer without Director
    console.log('2. Custom Computer (without Director):');
    const customPC = new ComputerBuilder()
        .setCPU('AMD Ryzen 9 7950X')
        .setMemory('128GB DDR5-5200')
        .setStorage('4TB NVMe SSD')
        .setGraphics('NVIDIA RTX 4090')
        .setMotherboard('ASUS ROG Crosshair X670E Hero')
        .setPowerSupply('1000W 80+ Titanium')
        .setCoolingSystem('Custom Loop Liquid Cooling')
        .setNetworkCard('10Gb Ethernet + Wi-Fi 6E')
        .setWarranty(5)
        .build();

    console.log('Custom High-End Computer:');
    console.log(customPC.getSpecifications());
    console.log(`Estimated Price: $${customPC.getEstimatedPrice()}\n`);

    // SQL Query Builder Demo
    console.log('3. SQL Query Builder:');
    
    const simpleQuery = new SQLQueryBuilder()
        .select('id', 'name', 'email')
        .from('users')
        .where('active = 1')
        .orderBy('name', 'ASC')
        .limit(10)
        .build();

    console.log('Simple Query:');
    console.log(simpleQuery.toString());
    console.log();

    const complexQuery = new SQLQueryBuilder()
        .select('u.name', 'u.email', 'COUNT(o.id) as order_count', 'SUM(o.total) as total_spent')
        .from('users u')
        .leftJoin('orders o', 'u.id = o.user_id')
        .where('u.active = 1')
        .where('u.created_at > \'2023-01-01\'')
        .groupBy('u.id', 'u.name', 'u.email')
        .having('COUNT(o.id) > 0')
        .orderBy('total_spent', 'DESC')
        .limit(50)
        .offset(0)
        .build();

    console.log('Complex Query with Joins and Aggregation:');
    console.log(complexQuery.toString());
    console.log();

    // HTTP Request Builder Demo
    console.log('4. HTTP Request Builder:');

    const getRequest = HttpRequestBuilder
        .get('https://api.example.com/users')
        .header('Authorization', 'Bearer token123')
        .header('Accept', 'application/json')
        .timeout(5000)
        .retries(3)
        .build();

    console.log('GET Request:');
    console.log(getRequest.toString());
    console.log();

    const postRequest = HttpRequestBuilder
        .post('https://api.example.com/users')
        .json({
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user'
        })
        .header('Authorization', 'Bearer token123')
        .timeout(10000)
        .build();

    console.log('POST Request:');
    console.log(postRequest.toString());
    console.log();

    const customRequest = new HttpRequestBuilder()
        .method('PUT')
        .url('https://api.example.com/users/123')
        .headers({
            'Authorization': 'Bearer token123',
            'Content-Type': 'application/json',
            'X-API-Version': '2.0'
        })
        .body({
            name: 'Jane Doe',
            email: 'jane@example.com'
        })
        .timeout(15000)
        .retries(2)
        .build();

    console.log('Custom PUT Request:');
    console.log(customRequest.toString());

    // Multiple builds with same builder
    console.log('\n5. Multiple Builds with Same Builder:');
    const queryBuilder = new SQLQueryBuilder();
    
    const usersQuery = queryBuilder
        .select('*')
        .from('users')
        .where('active = 1')
        .build();

    const productsQuery = queryBuilder
        .select('id', 'name', 'price')
        .from('products')
        .where('in_stock = 1')
        .orderBy('price', 'ASC')
        .build();

    console.log('Users Query:', usersQuery.toString());
    console.log('Products Query:', productsQuery.toString());

    console.log('\n=== Builder Pattern Demo Complete ===');
}

// Export for external usage
export * from './Builder';
