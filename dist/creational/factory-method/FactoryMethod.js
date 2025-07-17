"use strict";
/**
 * Factory Method Pattern
 * Create objects without specifying the exact class of object that will be created
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoProcessorFactory = exports.PayPalProcessorFactory = exports.CreditCardProcessorFactory = exports.PaymentProcessorFactory = exports.CryptoProcessor = exports.PayPalProcessor = exports.CreditCardProcessor = exports.HTMLDocumentFactory = exports.WordDocumentFactory = exports.PDFDocumentFactory = exports.DocumentFactory = exports.HTMLDocument = exports.WordDocument = exports.PDFDocument = exports.WildAnimalFactory = exports.CatFactory = exports.DogFactory = exports.AnimalFactory = exports.Wolf = exports.Lion = exports.Cat = exports.Dog = void 0;
exports.getPaymentFactory = getPaymentFactory;
// Concrete Products
class Dog {
    constructor(breed = 'Generic') {
        this.breed = breed;
    }
    makeSound() {
        return 'Woof!';
    }
    getType() {
        return `Dog (${this.breed})`;
    }
    getHabitat() {
        return 'Domestic';
    }
}
exports.Dog = Dog;
class Cat {
    constructor(breed = 'Generic') {
        this.breed = breed;
    }
    makeSound() {
        return 'Meow!';
    }
    getType() {
        return `Cat (${this.breed})`;
    }
    getHabitat() {
        return 'Domestic';
    }
}
exports.Cat = Cat;
class Lion {
    makeSound() {
        return 'Roar!';
    }
    getType() {
        return 'Lion';
    }
    getHabitat() {
        return 'Savanna';
    }
}
exports.Lion = Lion;
class Wolf {
    makeSound() {
        return 'Howl!';
    }
    getType() {
        return 'Wolf';
    }
    getHabitat() {
        return 'Forest';
    }
}
exports.Wolf = Wolf;
// Creator abstract class
class AnimalFactory {
    // Template method that uses the factory method
    introduceAnimal() {
        const animal = this.createAnimal();
        return `This is a ${animal.getType()} that says "${animal.makeSound()}" and lives in ${animal.getHabitat()}`;
    }
}
exports.AnimalFactory = AnimalFactory;
// Concrete Creators
class DogFactory extends AnimalFactory {
    constructor(breed) {
        super();
        this.breed = breed;
    }
    createAnimal() {
        return new Dog(this.breed);
    }
}
exports.DogFactory = DogFactory;
class CatFactory extends AnimalFactory {
    constructor(breed) {
        super();
        this.breed = breed;
    }
    createAnimal() {
        return new Cat(this.breed);
    }
}
exports.CatFactory = CatFactory;
class WildAnimalFactory extends AnimalFactory {
    constructor(animalType) {
        super();
        this.animalType = animalType;
    }
    createAnimal() {
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
exports.WildAnimalFactory = WildAnimalFactory;
class PDFDocument {
    constructor(content = '') {
        this.content = content;
    }
    getType() {
        return 'PDF';
    }
    getContent() {
        return this.content;
    }
    save() {
        return `PDF document saved with content: "${this.content}"`;
    }
    export(format) {
        return `Exporting PDF to ${format} format`;
    }
}
exports.PDFDocument = PDFDocument;
class WordDocument {
    constructor(content = '') {
        this.content = content;
    }
    getType() {
        return 'Word';
    }
    getContent() {
        return this.content;
    }
    save() {
        return `Word document saved with content: "${this.content}"`;
    }
    export(format) {
        return `Exporting Word document to ${format} format`;
    }
}
exports.WordDocument = WordDocument;
class HTMLDocument {
    constructor(content = '') {
        this.content = content;
    }
    getType() {
        return 'HTML';
    }
    getContent() {
        return `<html><body>${this.content}</body></html>`;
    }
    save() {
        return `HTML document saved with content: "${this.content}"`;
    }
    export(format) {
        return `Exporting HTML to ${format} format`;
    }
}
exports.HTMLDocument = HTMLDocument;
class DocumentFactory {
    processDocument(content) {
        const doc = this.createDocument(content);
        const saveResult = doc.save();
        return `Created ${doc.getType()} document. ${saveResult}`;
    }
}
exports.DocumentFactory = DocumentFactory;
class PDFDocumentFactory extends DocumentFactory {
    createDocument(content) {
        return new PDFDocument(content);
    }
}
exports.PDFDocumentFactory = PDFDocumentFactory;
class WordDocumentFactory extends DocumentFactory {
    createDocument(content) {
        return new WordDocument(content);
    }
}
exports.WordDocumentFactory = WordDocumentFactory;
class HTMLDocumentFactory extends DocumentFactory {
    createDocument(content) {
        return new HTMLDocument(content);
    }
}
exports.HTMLDocumentFactory = HTMLDocumentFactory;
class CreditCardProcessor {
    constructor(cardNumber) {
        this.cardNumber = cardNumber;
    }
    processPayment(amount) {
        if (!this.validatePayment(amount)) {
            throw new Error('Invalid payment amount');
        }
        const fee = this.getTransactionFee(amount);
        return `Processed $${amount} (fee: $${fee}) via Credit Card ending in ${this.cardNumber.slice(-4)}`;
    }
    validatePayment(amount) {
        return amount > 0 && amount <= 10000;
    }
    getProcessorName() {
        return 'Credit Card';
    }
    getTransactionFee(amount) {
        return amount * 0.029; // 2.9% fee
    }
}
exports.CreditCardProcessor = CreditCardProcessor;
class PayPalProcessor {
    constructor(email) {
        this.email = email;
    }
    processPayment(amount) {
        if (!this.validatePayment(amount)) {
            throw new Error('Invalid payment amount');
        }
        const fee = this.getTransactionFee(amount);
        return `Processed $${amount} (fee: $${fee}) via PayPal account: ${this.email}`;
    }
    validatePayment(amount) {
        return amount > 0 && amount <= 50000;
    }
    getProcessorName() {
        return 'PayPal';
    }
    getTransactionFee(amount) {
        return amount * 0.034; // 3.4% fee
    }
}
exports.PayPalProcessor = PayPalProcessor;
class CryptoProcessor {
    constructor(walletAddress) {
        this.walletAddress = walletAddress;
    }
    processPayment(amount) {
        if (!this.validatePayment(amount)) {
            throw new Error('Invalid payment amount');
        }
        const fee = this.getTransactionFee(amount);
        return `Processed $${amount} (fee: $${fee}) via Crypto wallet: ${this.walletAddress.slice(0, 8)}...`;
    }
    validatePayment(amount) {
        return amount > 0; // No upper limit for crypto
    }
    getProcessorName() {
        return 'Cryptocurrency';
    }
    getTransactionFee(amount) {
        return Math.max(1, amount * 0.01); // 1% fee, minimum $1
    }
}
exports.CryptoProcessor = CryptoProcessor;
class PaymentProcessorFactory {
    executePayment(amount) {
        const processor = this.createProcessor();
        return processor.processPayment(amount);
    }
}
exports.PaymentProcessorFactory = PaymentProcessorFactory;
class CreditCardProcessorFactory extends PaymentProcessorFactory {
    constructor(cardNumber) {
        super();
        this.cardNumber = cardNumber;
    }
    createProcessor() {
        return new CreditCardProcessor(this.cardNumber);
    }
}
exports.CreditCardProcessorFactory = CreditCardProcessorFactory;
class PayPalProcessorFactory extends PaymentProcessorFactory {
    constructor(email) {
        super();
        this.email = email;
    }
    createProcessor() {
        return new PayPalProcessor(this.email);
    }
}
exports.PayPalProcessorFactory = PayPalProcessorFactory;
class CryptoProcessorFactory extends PaymentProcessorFactory {
    constructor(walletAddress) {
        super();
        this.walletAddress = walletAddress;
    }
    createProcessor() {
        return new CryptoProcessor(this.walletAddress);
    }
}
exports.CryptoProcessorFactory = CryptoProcessorFactory;
// Utility function to get appropriate factory
function getPaymentFactory(type, identifier) {
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
//# sourceMappingURL=FactoryMethod.js.map