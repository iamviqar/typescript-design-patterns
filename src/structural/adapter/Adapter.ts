/**
 * Adapter Pattern
 * Allow incompatible interfaces to work together
 */

// Target interface that clients expect
export interface MediaPlayer {
    play(audioType: string, fileName: string): void;
}

// Adaptee - existing class with incompatible interface
export class AdvancedMediaPlayer {
    playVlc(fileName: string): void {
        console.log(`Playing vlc file: ${fileName}`);
    }

    playMp4(fileName: string): void {
        console.log(`Playing mp4 file: ${fileName}`);
    }

    playFlac(fileName: string): void {
        console.log(`Playing flac file: ${fileName}`);
    }
}

// Adapter class
export class MediaAdapter implements MediaPlayer {
    private advancedPlayer: AdvancedMediaPlayer;

    constructor() {
        this.advancedPlayer = new AdvancedMediaPlayer();
    }

    play(audioType: string, fileName: string): void {
        switch (audioType.toLowerCase()) {
            case 'vlc':
                this.advancedPlayer.playVlc(fileName);
                break;
            case 'mp4':
                this.advancedPlayer.playMp4(fileName);
                break;
            case 'flac':
                this.advancedPlayer.playFlac(fileName);
                break;
            default:
                console.log(`${audioType} format not supported`);
        }
    }
}

// Context class that uses the adapter
export class AudioPlayer implements MediaPlayer {
    private mediaAdapter?: MediaAdapter;

    play(audioType: string, fileName: string): void {
        if (audioType.toLowerCase() === 'mp3') {
            console.log(`Playing mp3 file: ${fileName}`);
        } else {
            this.mediaAdapter = new MediaAdapter();
            this.mediaAdapter.play(audioType, fileName);
        }
    }
}

// Real-world example: Payment Gateway Adapter
export interface PaymentGateway {
    processPayment(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }>;
    refund(transactionId: string, amount: number): Promise<{ success: boolean; refundId: string }>;
}

// Third-party payment service with different interface
export class StripePaymentService {
    async createCharge(amountInCents: number, currencyCode: string): Promise<{ id: string; status: string }> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
            id: `ch_${Math.random().toString(36).substr(2, 9)}`,
            status: 'succeeded'
        };
    }

    async createRefund(chargeId: string, amountInCents: number): Promise<{ id: string; status: string }> {
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
            id: `re_${Math.random().toString(36).substr(2, 9)}`,
            status: 'succeeded'
        };
    }
}

export class PayPalPaymentService {
    async executePayment(amount: string, currency: string): Promise<{ paymentId: string; state: string }> {
        await new Promise(resolve => setTimeout(resolve, 150));
        return {
            paymentId: `PAY-${Math.random().toString(36).substr(2, 9)}`,
            state: 'approved'
        };
    }

    async refundPayment(paymentId: string, refundAmount: string): Promise<{ refundId: string; state: string }> {
        await new Promise(resolve => setTimeout(resolve, 150));
        return {
            refundId: `REFUND-${Math.random().toString(36).substr(2, 9)}`,
            state: 'completed'
        };
    }
}

// Adapters for different payment services
export class StripeAdapter implements PaymentGateway {
    private stripeService: StripePaymentService;

    constructor() {
        this.stripeService = new StripePaymentService();
    }

    async processPayment(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }> {
        try {
            const amountInCents = Math.round(amount * 100);
            const result = await this.stripeService.createCharge(amountInCents, currency.toLowerCase());
            
            return {
                success: result.status === 'succeeded',
                transactionId: result.id
            };
        } catch (error) {
            return {
                success: false,
                transactionId: ''
            };
        }
    }

    async refund(transactionId: string, amount: number): Promise<{ success: boolean; refundId: string }> {
        try {
            const amountInCents = Math.round(amount * 100);
            const result = await this.stripeService.createRefund(transactionId, amountInCents);
            
            return {
                success: result.status === 'succeeded',
                refundId: result.id
            };
        } catch (error) {
            return {
                success: false,
                refundId: ''
            };
        }
    }
}

export class PayPalAdapter implements PaymentGateway {
    private paypalService: PayPalPaymentService;

    constructor() {
        this.paypalService = new PayPalPaymentService();
    }

    async processPayment(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }> {
        try {
            const result = await this.paypalService.executePayment(amount.toString(), currency.toUpperCase());
            
            return {
                success: result.state === 'approved',
                transactionId: result.paymentId
            };
        } catch (error) {
            return {
                success: false,
                transactionId: ''
            };
        }
    }

    async refund(transactionId: string, amount: number): Promise<{ success: boolean; refundId: string }> {
        try {
            const result = await this.paypalService.refundPayment(transactionId, amount.toString());
            
            return {
                success: result.state === 'completed',
                refundId: result.refundId
            };
        } catch (error) {
            return {
                success: false,
                refundId: ''
            };
        }
    }
}

// Payment processor that works with any payment gateway
export class PaymentProcessor {
    private gateway: PaymentGateway;

    constructor(gateway: PaymentGateway) {
        this.gateway = gateway;
    }

    async processTransaction(amount: number, currency: string = 'USD'): Promise<void> {
        console.log(`Processing payment of ${amount} ${currency}...`);
        
        const result = await this.gateway.processPayment(amount, currency);
        
        if (result.success) {
            console.log(`Payment successful! Transaction ID: ${result.transactionId}`);
        } else {
            console.log('Payment failed!');
        }
    }

    async processRefund(transactionId: string, amount: number): Promise<void> {
        console.log(`Processing refund of ${amount} for transaction ${transactionId}...`);
        
        const result = await this.gateway.refund(transactionId, amount);
        
        if (result.success) {
            console.log(`Refund successful! Refund ID: ${result.refundId}`);
        } else {
            console.log('Refund failed!');
        }
    }
}

// Database Adapter Example
export interface Database {
    connect(): Promise<void>;
    query(sql: string): Promise<any[]>;
    disconnect(): Promise<void>;
}

// Legacy database with different interface
export class LegacyDatabase {
    private connected: boolean = false;

    async openConnection(): Promise<boolean> {
        console.log('Opening legacy database connection...');
        this.connected = true;
        return true;
    }

    async executeQuery(queryString: string): Promise<{ rows: any[]; rowCount: number }> {
        if (!this.connected) {
            throw new Error('Database not connected');
        }
        
        console.log(`Executing legacy query: ${queryString}`);
        // Simulate query execution
        const mockRows = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
        ];
        
        return {
            rows: mockRows,
            rowCount: mockRows.length
        };
    }

    async closeConnection(): Promise<void> {
        console.log('Closing legacy database connection...');
        this.connected = false;
    }
}

export class LegacyDatabaseAdapter implements Database {
    private legacyDb: LegacyDatabase;

    constructor() {
        this.legacyDb = new LegacyDatabase();
    }

    async connect(): Promise<void> {
        const success = await this.legacyDb.openConnection();
        if (!success) {
            throw new Error('Failed to connect to legacy database');
        }
    }

    async query(sql: string): Promise<any[]> {
        const result = await this.legacyDb.executeQuery(sql);
        return result.rows;
    }

    async disconnect(): Promise<void> {
        await this.legacyDb.closeConnection();
    }
}

// Modern database repository
export class DatabaseRepository {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    async getUsers(): Promise<any[]> {
        await this.db.connect();
        try {
            const users = await this.db.query('SELECT * FROM users');
            return users;
        } finally {
            await this.db.disconnect();
        }
    }
}

// File System Adapter Example
export interface FileSystem {
    readFile(path: string): Promise<string>;
    writeFile(path: string, content: string): Promise<void>;
    deleteFile(path: string): Promise<void>;
}

// Cloud storage service with different interface
export class CloudStorageService {
    async downloadObject(key: string): Promise<{ content: Buffer; metadata: any }> {
        console.log(`Downloading object: ${key}`);
        // Simulate cloud download
        return {
            content: Buffer.from(`Content of ${key}`),
            metadata: { size: 1024, lastModified: new Date() }
        };
    }

    async uploadObject(key: string, data: Buffer): Promise<{ url: string; etag: string }> {
        console.log(`Uploading object: ${key}`);
        return {
            url: `https://storage.example.com/${key}`,
            etag: Math.random().toString(36)
        };
    }

    async removeObject(key: string): Promise<void> {
        console.log(`Removing object: ${key}`);
    }
}

export class CloudStorageAdapter implements FileSystem {
    private cloudStorage: CloudStorageService;

    constructor() {
        this.cloudStorage = new CloudStorageService();
    }

    async readFile(path: string): Promise<string> {
        const result = await this.cloudStorage.downloadObject(path);
        return result.content.toString();
    }

    async writeFile(path: string, content: string): Promise<void> {
        const buffer = Buffer.from(content);
        await this.cloudStorage.uploadObject(path, buffer);
    }

    async deleteFile(path: string): Promise<void> {
        await this.cloudStorage.removeObject(path);
    }
}
