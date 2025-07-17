/**
 * Factory Method Pattern Demo
 */

import {
    DogFactory,
    CatFactory,
    WildAnimalFactory,
    PDFDocumentFactory,
    WordDocumentFactory,
    HTMLDocumentFactory,
    getPaymentFactory
} from './FactoryMethod';

export function demonstrateFactoryMethod(): void {
    console.log('=== Factory Method Pattern Demo ===\n');

    // Animal Factory Demo
    console.log('1. Animal Factory:');
    const dogFactory = new DogFactory('Golden Retriever');
    const catFactory = new CatFactory('Persian');
    const lionFactory = new WildAnimalFactory('lion');
    const wolfFactory = new WildAnimalFactory('wolf');

    console.log(dogFactory.introduceAnimal());
    console.log(catFactory.introduceAnimal());
    console.log(lionFactory.introduceAnimal());
    console.log(wolfFactory.introduceAnimal());
    console.log();

    // Document Factory Demo
    console.log('2. Document Factory:');
    const pdfFactory = new PDFDocumentFactory();
    const wordFactory = new WordDocumentFactory();
    const htmlFactory = new HTMLDocumentFactory();

    const content = 'This is a sample document content.';
    
    console.log(pdfFactory.processDocument(content));
    console.log(wordFactory.processDocument(content));
    console.log(htmlFactory.processDocument(content));
    console.log();

    // Payment Processor Factory Demo
    console.log('3. Payment Processor Factory:');
    
    try {
        const creditFactory = getPaymentFactory('credit', '4532123456789012');
        const paypalFactory = getPaymentFactory('paypal', 'user@example.com');
        const cryptoFactory = getPaymentFactory('crypto', '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

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

    } catch (error) {
        console.error(`Payment processing error: ${error}`);
    }

    // Advanced usage: Dynamic factory selection
    console.log('5. Dynamic Factory Selection:');
    const paymentMethods = [
        { type: 'credit' as const, id: '4532123456789012', amount: 50 },
        { type: 'paypal' as const, id: 'customer@email.com', amount: 150 },
        { type: 'crypto' as const, id: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', amount: 75 }
    ];

    paymentMethods.forEach(method => {
        try {
            const factory = getPaymentFactory(method.type, method.id);
            console.log(factory.executePayment(method.amount));
        } catch (error) {
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
export * from './FactoryMethod';
