/**
 * Factory Method Pattern
 * Create objects without specifying the exact class of object that will be created
 */
export interface Animal {
    makeSound(): string;
    getType(): string;
    getHabitat(): string;
}
export declare class Dog implements Animal {
    private breed;
    constructor(breed?: string);
    makeSound(): string;
    getType(): string;
    getHabitat(): string;
}
export declare class Cat implements Animal {
    private breed;
    constructor(breed?: string);
    makeSound(): string;
    getType(): string;
    getHabitat(): string;
}
export declare class Lion implements Animal {
    makeSound(): string;
    getType(): string;
    getHabitat(): string;
}
export declare class Wolf implements Animal {
    makeSound(): string;
    getType(): string;
    getHabitat(): string;
}
export declare abstract class AnimalFactory {
    abstract createAnimal(): Animal;
    introduceAnimal(): string;
}
export declare class DogFactory extends AnimalFactory {
    private breed?;
    constructor(breed?: string | undefined);
    createAnimal(): Animal;
}
export declare class CatFactory extends AnimalFactory {
    private breed?;
    constructor(breed?: string | undefined);
    createAnimal(): Animal;
}
export declare class WildAnimalFactory extends AnimalFactory {
    private animalType;
    constructor(animalType: 'lion' | 'wolf');
    createAnimal(): Animal;
}
export interface Document {
    getType(): string;
    getContent(): string;
    save(): string;
    export(format: string): string;
}
export declare class PDFDocument implements Document {
    private content;
    constructor(content?: string);
    getType(): string;
    getContent(): string;
    save(): string;
    export(format: string): string;
}
export declare class WordDocument implements Document {
    private content;
    constructor(content?: string);
    getType(): string;
    getContent(): string;
    save(): string;
    export(format: string): string;
}
export declare class HTMLDocument implements Document {
    private content;
    constructor(content?: string);
    getType(): string;
    getContent(): string;
    save(): string;
    export(format: string): string;
}
export declare abstract class DocumentFactory {
    abstract createDocument(content: string): Document;
    processDocument(content: string): string;
}
export declare class PDFDocumentFactory extends DocumentFactory {
    createDocument(content: string): Document;
}
export declare class WordDocumentFactory extends DocumentFactory {
    createDocument(content: string): Document;
}
export declare class HTMLDocumentFactory extends DocumentFactory {
    createDocument(content: string): Document;
}
export interface PaymentProcessor {
    processPayment(amount: number): string;
    validatePayment(amount: number): boolean;
    getProcessorName(): string;
    getTransactionFee(amount: number): number;
}
export declare class CreditCardProcessor implements PaymentProcessor {
    private cardNumber;
    constructor(cardNumber: string);
    processPayment(amount: number): string;
    validatePayment(amount: number): boolean;
    getProcessorName(): string;
    getTransactionFee(amount: number): number;
}
export declare class PayPalProcessor implements PaymentProcessor {
    private email;
    constructor(email: string);
    processPayment(amount: number): string;
    validatePayment(amount: number): boolean;
    getProcessorName(): string;
    getTransactionFee(amount: number): number;
}
export declare class CryptoProcessor implements PaymentProcessor {
    private walletAddress;
    constructor(walletAddress: string);
    processPayment(amount: number): string;
    validatePayment(amount: number): boolean;
    getProcessorName(): string;
    getTransactionFee(amount: number): number;
}
export declare abstract class PaymentProcessorFactory {
    abstract createProcessor(): PaymentProcessor;
    executePayment(amount: number): string;
}
export declare class CreditCardProcessorFactory extends PaymentProcessorFactory {
    private cardNumber;
    constructor(cardNumber: string);
    createProcessor(): PaymentProcessor;
}
export declare class PayPalProcessorFactory extends PaymentProcessorFactory {
    private email;
    constructor(email: string);
    createProcessor(): PaymentProcessor;
}
export declare class CryptoProcessorFactory extends PaymentProcessorFactory {
    private walletAddress;
    constructor(walletAddress: string);
    createProcessor(): PaymentProcessor;
}
export declare function getPaymentFactory(type: 'credit' | 'paypal' | 'crypto', identifier: string): PaymentProcessorFactory;
//# sourceMappingURL=FactoryMethod.d.ts.map