"use strict";
/**
 * Factory Method Pattern Demo
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
exports.demonstrateFactoryMethod = demonstrateFactoryMethod;
const FactoryMethod_1 = require("./FactoryMethod");
function demonstrateFactoryMethod() {
    console.log('=== Factory Method Pattern Demo ===\n');
    // Animal Factory Demo
    console.log('1. Animal Factory:');
    const dogFactory = new FactoryMethod_1.DogFactory('Golden Retriever');
    const catFactory = new FactoryMethod_1.CatFactory('Persian');
    const lionFactory = new FactoryMethod_1.WildAnimalFactory('lion');
    const wolfFactory = new FactoryMethod_1.WildAnimalFactory('wolf');
    console.log(dogFactory.introduceAnimal());
    console.log(catFactory.introduceAnimal());
    console.log(lionFactory.introduceAnimal());
    console.log(wolfFactory.introduceAnimal());
    console.log();
    // Document Factory Demo
    console.log('2. Document Factory:');
    const pdfFactory = new FactoryMethod_1.PDFDocumentFactory();
    const wordFactory = new FactoryMethod_1.WordDocumentFactory();
    const htmlFactory = new FactoryMethod_1.HTMLDocumentFactory();
    const content = 'This is a sample document content.';
    console.log(pdfFactory.processDocument(content));
    console.log(wordFactory.processDocument(content));
    console.log(htmlFactory.processDocument(content));
    console.log();
    // Payment Processor Factory Demo
    console.log('3. Payment Processor Factory:');
    try {
        const creditFactory = (0, FactoryMethod_1.getPaymentFactory)('credit', '4532123456789012');
        const paypalFactory = (0, FactoryMethod_1.getPaymentFactory)('paypal', 'user@example.com');
        const cryptoFactory = (0, FactoryMethod_1.getPaymentFactory)('crypto', '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
        const amount = 100.00;
        console.log(creditFactory.executePayment(amount));
        console.log(paypalFactory.executePayment(amount));
        console.log(cryptoFactory.executePayment(amount));
        console.log();
        // Test different amounts
        console.log('4. Testing Different Payment Amounts:');
        console.log(creditFactory.executePayment(25.50));
        console.log(paypalFactory.executePayment(500.75));
        console.log(cryptoFactory.executePayment(1000.00));
        console.log();
    }
    catch (error) {
        console.error(`Payment processing error: ${error}`);
    }
    // Advanced usage: Dynamic factory selection
    console.log('5. Dynamic Factory Selection:');
    const paymentMethods = [
        { type: 'credit', id: '4532123456789012', amount: 50 },
        { type: 'paypal', id: 'customer@email.com', amount: 150 },
        { type: 'crypto', id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', amount: 75 }
    ];
    paymentMethods.forEach(method => {
        try {
            const factory = (0, FactoryMethod_1.getPaymentFactory)(method.type, method.id);
            console.log(factory.executePayment(method.amount));
        }
        catch (error) {
            console.error(`Error processing ${method.type} payment: ${error}`);
        }
    });
    console.log();
    // Document export demo
    console.log('6. Document Export Capabilities:');
    const pdf = pdfFactory.createDocument('PDF content example');
    const word = wordFactory.createDocument('Word content example');
    const html = htmlFactory.createDocument('HTML content example');
    console.log(`PDF export to XML: ${pdf.export('XML')}`);
    console.log(`Word export to PDF: ${word.export('PDF')}`);
    console.log(`HTML export to TXT: ${html.export('TXT')}`);
    console.log('\n=== Factory Method Pattern Demo Complete ===');
}
// Export for external usage
__exportStar(require("./FactoryMethod"), exports);
//# sourceMappingURL=Demo.js.map