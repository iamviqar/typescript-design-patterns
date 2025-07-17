/**
 * Adapter Pattern
 * Allow incompatible interfaces to work together
 */
export interface MediaPlayer {
    play(audioType: string, fileName: string): void;
}
export declare class AdvancedMediaPlayer {
    playVlc(fileName: string): void;
    playMp4(fileName: string): void;
    playFlac(fileName: string): void;
}
export declare class MediaAdapter implements MediaPlayer {
    private advancedPlayer;
    constructor();
    play(audioType: string, fileName: string): void;
}
export declare class AudioPlayer implements MediaPlayer {
    private mediaAdapter?;
    play(audioType: string, fileName: string): void;
}
export interface PaymentGateway {
    processPayment(amount: number, currency: string): Promise<{
        success: boolean;
        transactionId: string;
    }>;
    refund(transactionId: string, amount: number): Promise<{
        success: boolean;
        refundId: string;
    }>;
}
export declare class StripePaymentService {
    createCharge(amountInCents: number, currencyCode: string): Promise<{
        id: string;
        status: string;
    }>;
    createRefund(chargeId: string, amountInCents: number): Promise<{
        id: string;
        status: string;
    }>;
}
export declare class PayPalPaymentService {
    executePayment(amount: string, currency: string): Promise<{
        paymentId: string;
        state: string;
    }>;
    refundPayment(paymentId: string, refundAmount: string): Promise<{
        refundId: string;
        state: string;
    }>;
}
export declare class StripeAdapter implements PaymentGateway {
    private stripeService;
    constructor();
    processPayment(amount: number, currency: string): Promise<{
        success: boolean;
        transactionId: string;
    }>;
    refund(transactionId: string, amount: number): Promise<{
        success: boolean;
        refundId: string;
    }>;
}
export declare class PayPalAdapter implements PaymentGateway {
    private paypalService;
    constructor();
    processPayment(amount: number, currency: string): Promise<{
        success: boolean;
        transactionId: string;
    }>;
    refund(transactionId: string, amount: number): Promise<{
        success: boolean;
        refundId: string;
    }>;
}
export declare class PaymentProcessor {
    private gateway;
    constructor(gateway: PaymentGateway);
    processTransaction(amount: number, currency?: string): Promise<void>;
    processRefund(transactionId: string, amount: number): Promise<void>;
}
export interface Database {
    connect(): Promise<void>;
    query(sql: string): Promise<any[]>;
    disconnect(): Promise<void>;
}
export declare class LegacyDatabase {
    private connected;
    openConnection(): Promise<boolean>;
    executeQuery(queryString: string): Promise<{
        rows: any[];
        rowCount: number;
    }>;
    closeConnection(): Promise<void>;
}
export declare class LegacyDatabaseAdapter implements Database {
    private legacyDb;
    constructor();
    connect(): Promise<void>;
    query(sql: string): Promise<any[]>;
    disconnect(): Promise<void>;
}
export declare class DatabaseRepository {
    private db;
    constructor(db: Database);
    getUsers(): Promise<any[]>;
}
export interface FileSystem {
    readFile(path: string): Promise<string>;
    writeFile(path: string, content: string): Promise<void>;
    deleteFile(path: string): Promise<void>;
}
export declare class CloudStorageService {
    downloadObject(key: string): Promise<{
        content: Buffer;
        metadata: any;
    }>;
    uploadObject(key: string, data: Buffer): Promise<{
        url: string;
        etag: string;
    }>;
    removeObject(key: string): Promise<void>;
}
export declare class CloudStorageAdapter implements FileSystem {
    private cloudStorage;
    constructor();
    readFile(path: string): Promise<string>;
    writeFile(path: string, content: string): Promise<void>;
    deleteFile(path: string): Promise<void>;
}
//# sourceMappingURL=Adapter.d.ts.map