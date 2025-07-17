/**
 * Factory Method Pattern
 * Create objects without specifying the exact class of object that will be created
 */

// Product interface
export interface Animal {
    makeSound(): string;
    getType(): string;
    getHabitat(): string;
}

// Concrete Products
export class Dog implements Animal {
    constructor(private breed: string = 'Generic') {}

    makeSound(): string {
        return 'Woof!';
    }

    getType(): string {
        return `Dog (${this.breed})`;
    }

    getHabitat(): string {
        return 'Domestic';
    }
}

export class Cat implements Animal {
    constructor(private breed: string = 'Generic') {}

    makeSound(): string {
        return 'Meow!';
    }

    getType(): string {
        return `Cat (${this.breed})`;
    }

    getHabitat(): string {
        return 'Domestic';
    }
}

export class Lion implements Animal {
    makeSound(): string {
        return 'Roar!';
    }

    getType(): string {
        return 'Lion';
    }

    getHabitat(): string {
        return 'Savanna';
    }
}

export class Wolf implements Animal {
    makeSound(): string {
        return 'Howl!';
    }

    getType(): string {
        return 'Wolf';
    }

    getHabitat(): string {
        return 'Forest';
    }
}

// Creator abstract class
export abstract class AnimalFactory {
    // The factory method - subclasses will override this
    abstract createAnimal(): Animal;

    // Template method that uses the factory method
    public introduceAnimal(): string {
        const animal = this.createAnimal();
        return `This is a ${animal.getType()} that says "${animal.makeSound()}" and lives in ${animal.getHabitat()}`;
    }
}

// Concrete Creators
export class DogFactory extends AnimalFactory {
    constructor(private breed?: string) {
        super();
    }

    createAnimal(): Animal {
        return new Dog(this.breed);
    }
}

export class CatFactory extends AnimalFactory {
    constructor(private breed?: string) {
        super();
    }

    createAnimal(): Animal {
        return new Cat(this.breed);
    }
}

export class WildAnimalFactory extends AnimalFactory {
    constructor(private animalType: 'lion' | 'wolf') {
        super();
    }

    createAnimal(): Animal {
        switch (this.animalType) {
            case 'lion':
                return new Lion();
            case 'wolf':
                return new Wolf();
            default:
                throw new Error(`Unknown animal type: ${this.animalType}`);
        }
    }
}

// Advanced example: Document creation
export interface Document {
    getType(): string;
    getContent(): string;
    save(): string;
    export(format: string): string;
}

export class PDFDocument implements Document {
    constructor(private content: string = '') {}

    getType(): string {
        return 'PDF';
    }

    getContent(): string {
        return this.content;
    }

    save(): string {
        return `PDF document saved with content: "${this.content}"`;
    }

    export(format: string): string {
        return `Exporting PDF to ${format} format`;
    }
}

export class WordDocument implements Document {
    constructor(private content: string = '') {}

    getType(): string {
        return 'Word';
    }

    getContent(): string {
        return this.content;
    }

    save(): string {
        return `Word document saved with content: "${this.content}"`;
    }

    export(format: string): string {
        return `Exporting Word document to ${format} format`;
    }
}

export class HTMLDocument implements Document {
    constructor(private content: string = '') {}

    getType(): string {
        return 'HTML';
    }

    getContent(): string {
        return `<html><body>${this.content}</body></html>`;
    }

    save(): string {
        return `HTML document saved with content: "${this.content}"`;
    }

    export(format: string): string {
        return `Exporting HTML to ${format} format`;
    }
}

export abstract class DocumentFactory {
    abstract createDocument(content: string): Document;

    public processDocument(content: string): string {
        const doc = this.createDocument(content);
        const saveResult = doc.save();
        return `Created ${doc.getType()} document. ${saveResult}`;
    }
}

export class PDFDocumentFactory extends DocumentFactory {
    createDocument(content: string): Document {
        return new PDFDocument(content);
    }
}

export class WordDocumentFactory extends DocumentFactory {
    createDocument(content: string): Document {
        return new WordDocument(content);
    }
}

export class HTMLDocumentFactory extends DocumentFactory {
    createDocument(content: string): Document {
        return new HTMLDocument(content);
    }
}

// Real-world example: Payment processor
export interface PaymentProcessor {
    processPayment(amount: number): string;
    validatePayment(amount: number): boolean;
    getProcessorName(): string;
    getTransactionFee(amount: number): number;
}

export class CreditCardProcessor implements PaymentProcessor {
    constructor(private cardNumber: string) {}

    processPayment(amount: number): string {
        if (!this.validatePayment(amount)) {
            throw new Error('Invalid payment amount');
        }
        const fee = this.getTransactionFee(amount);
        return `Processed $${amount} (fee: $${fee}) via Credit Card ending in ${this.cardNumber.slice(-4)}`;
    }

    validatePayment(amount: number): boolean {
        return amount > 0 && amount <= 10000;
    }

    getProcessorName(): string {
        return 'Credit Card';
    }

    getTransactionFee(amount: number): number {
        return amount * 0.029; // 2.9% fee
    }
}

export class PayPalProcessor implements PaymentProcessor {
    constructor(private email: string) {}

    processPayment(amount: number): string {
        if (!this.validatePayment(amount)) {
            throw new Error('Invalid payment amount');
        }
        const fee = this.getTransactionFee(amount);
        return `Processed $${amount} (fee: $${fee}) via PayPal account: ${this.email}`;
    }

    validatePayment(amount: number): boolean {
        return amount > 0 && amount <= 50000;
    }

    getProcessorName(): string {
        return 'PayPal';
    }

    getTransactionFee(amount: number): number {
        return amount * 0.034; // 3.4% fee
    }
}

export class CryptoProcessor implements PaymentProcessor {
    constructor(private walletAddress: string) {}

    processPayment(amount: number): string {
        if (!this.validatePayment(amount)) {
            throw new Error('Invalid payment amount');
        }
        const fee = this.getTransactionFee(amount);
        return `Processed $${amount} (fee: $${fee}) via Crypto wallet: ${this.walletAddress.slice(0, 8)}...`;
    }

    validatePayment(amount: number): boolean {
        return amount > 0; // No upper limit for crypto
    }

    getProcessorName(): string {
        return 'Cryptocurrency';
    }

    getTransactionFee(amount: number): number {
        return Math.max(1, amount * 0.01); // 1% fee, minimum $1
    }
}

export abstract class PaymentProcessorFactory {
    abstract createProcessor(): PaymentProcessor;

    public executePayment(amount: number): string {
        const processor = this.createProcessor();
        return processor.processPayment(amount);
    }
}

export class CreditCardProcessorFactory extends PaymentProcessorFactory {
    constructor(private cardNumber: string) {
        super();
    }

    createProcessor(): PaymentProcessor {
        return new CreditCardProcessor(this.cardNumber);
    }
}

export class PayPalProcessorFactory extends PaymentProcessorFactory {
    constructor(private email: string) {
        super();
    }

    createProcessor(): PaymentProcessor {
        return new PayPalProcessor(this.email);
    }
}

export class CryptoProcessorFactory extends PaymentProcessorFactory {
    constructor(private walletAddress: string) {
        super();
    }

    createProcessor(): PaymentProcessor {
        return new CryptoProcessor(this.walletAddress);
    }
}

// Utility function to get appropriate factory
export function getPaymentFactory(
    type: 'credit' | 'paypal' | 'crypto',
    identifier: string
): PaymentProcessorFactory {
    switch (type) {
        case 'credit':
            return new CreditCardProcessorFactory(identifier);
        case 'paypal':
            return new PayPalProcessorFactory(identifier);
        case 'crypto':
            return new CryptoProcessorFactory(identifier);
        default:
            throw new Error(`Unknown payment type: ${type}`);
    }
}
