"use strict";
/**
 * Adapter Pattern
 * Allow incompatible interfaces to work together
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudStorageAdapter = exports.CloudStorageService = exports.DatabaseRepository = exports.LegacyDatabaseAdapter = exports.LegacyDatabase = exports.PaymentProcessor = exports.PayPalAdapter = exports.StripeAdapter = exports.PayPalPaymentService = exports.StripePaymentService = exports.AudioPlayer = exports.MediaAdapter = exports.AdvancedMediaPlayer = void 0;
// Adaptee - existing class with incompatible interface
class AdvancedMediaPlayer {
    playVlc(fileName) {
        console.log(`Playing vlc file: ${fileName}`);
    }
    playMp4(fileName) {
        console.log(`Playing mp4 file: ${fileName}`);
    }
    playFlac(fileName) {
        console.log(`Playing flac file: ${fileName}`);
    }
}
exports.AdvancedMediaPlayer = AdvancedMediaPlayer;
// Adapter class
class MediaAdapter {
    constructor() {
        this.advancedPlayer = new AdvancedMediaPlayer();
    }
    play(audioType, fileName) {
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
exports.MediaAdapter = MediaAdapter;
// Context class that uses the adapter
class AudioPlayer {
    play(audioType, fileName) {
        if (audioType.toLowerCase() === 'mp3') {
            console.log(`Playing mp3 file: ${fileName}`);
        }
        else {
            this.mediaAdapter = new MediaAdapter();
            this.mediaAdapter.play(audioType, fileName);
        }
    }
}
exports.AudioPlayer = AudioPlayer;
// Third-party payment service with different interface
class StripePaymentService {
    async createCharge(amountInCents, currencyCode) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
            id: `ch_${Math.random().toString(36).substr(2, 9)}`,
            status: 'succeeded'
        };
    }
    async createRefund(chargeId, amountInCents) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
            id: `re_${Math.random().toString(36).substr(2, 9)}`,
            status: 'succeeded'
        };
    }
}
exports.StripePaymentService = StripePaymentService;
class PayPalPaymentService {
    async executePayment(amount, currency) {
        await new Promise(resolve => setTimeout(resolve, 150));
        return {
            paymentId: `PAY-${Math.random().toString(36).substr(2, 9)}`,
            state: 'approved'
        };
    }
    async refundPayment(paymentId, refundAmount) {
        await new Promise(resolve => setTimeout(resolve, 150));
        return {
            refundId: `REFUND-${Math.random().toString(36).substr(2, 9)}`,
            state: 'completed'
        };
    }
}
exports.PayPalPaymentService = PayPalPaymentService;
// Adapters for different payment services
class StripeAdapter {
    constructor() {
        this.stripeService = new StripePaymentService();
    }
    async processPayment(amount, currency) {
        try {
            const amountInCents = Math.round(amount * 100);
            const result = await this.stripeService.createCharge(amountInCents, currency.toLowerCase());
            return {
                success: result.status === 'succeeded',
                transactionId: result.id
            };
        }
        catch (error) {
            return {
                success: false,
                transactionId: ''
            };
        }
    }
    async refund(transactionId, amount) {
        try {
            const amountInCents = Math.round(amount * 100);
            const result = await this.stripeService.createRefund(transactionId, amountInCents);
            return {
                success: result.status === 'succeeded',
                refundId: result.id
            };
        }
        catch (error) {
            return {
                success: false,
                refundId: ''
            };
        }
    }
}
exports.StripeAdapter = StripeAdapter;
class PayPalAdapter {
    constructor() {
        this.paypalService = new PayPalPaymentService();
    }
    async processPayment(amount, currency) {
        try {
            const result = await this.paypalService.executePayment(amount.toString(), currency.toUpperCase());
            return {
                success: result.state === 'approved',
                transactionId: result.paymentId
            };
        }
        catch (error) {
            return {
                success: false,
                transactionId: ''
            };
        }
    }
    async refund(transactionId, amount) {
        try {
            const result = await this.paypalService.refundPayment(transactionId, amount.toString());
            return {
                success: result.state === 'completed',
                refundId: result.refundId
            };
        }
        catch (error) {
            return {
                success: false,
                refundId: ''
            };
        }
    }
}
exports.PayPalAdapter = PayPalAdapter;
// Payment processor that works with any payment gateway
class PaymentProcessor {
    constructor(gateway) {
        this.gateway = gateway;
    }
    async processTransaction(amount, currency = 'USD') {
        console.log(`Processing payment of ${amount} ${currency}...`);
        const result = await this.gateway.processPayment(amount, currency);
        if (result.success) {
            console.log(`Payment successful! Transaction ID: ${result.transactionId}`);
        }
        else {
            console.log('Payment failed!');
        }
    }
    async processRefund(transactionId, amount) {
        console.log(`Processing refund of ${amount} for transaction ${transactionId}...`);
        const result = await this.gateway.refund(transactionId, amount);
        if (result.success) {
            console.log(`Refund successful! Refund ID: ${result.refundId}`);
        }
        else {
            console.log('Refund failed!');
        }
    }
}
exports.PaymentProcessor = PaymentProcessor;
// Legacy database with different interface
class LegacyDatabase {
    constructor() {
        this.connected = false;
    }
    async openConnection() {
        console.log('Opening legacy database connection...');
        this.connected = true;
        return true;
    }
    async executeQuery(queryString) {
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
    async closeConnection() {
        console.log('Closing legacy database connection...');
        this.connected = false;
    }
}
exports.LegacyDatabase = LegacyDatabase;
class LegacyDatabaseAdapter {
    constructor() {
        this.legacyDb = new LegacyDatabase();
    }
    async connect() {
        const success = await this.legacyDb.openConnection();
        if (!success) {
            throw new Error('Failed to connect to legacy database');
        }
    }
    async query(sql) {
        const result = await this.legacyDb.executeQuery(sql);
        return result.rows;
    }
    async disconnect() {
        await this.legacyDb.closeConnection();
    }
}
exports.LegacyDatabaseAdapter = LegacyDatabaseAdapter;
// Modern database repository
class DatabaseRepository {
    constructor(db) {
        this.db = db;
    }
    async getUsers() {
        await this.db.connect();
        try {
            const users = await this.db.query('SELECT * FROM users');
            return users;
        }
        finally {
            await this.db.disconnect();
        }
    }
}
exports.DatabaseRepository = DatabaseRepository;
// Cloud storage service with different interface
class CloudStorageService {
    async downloadObject(key) {
        console.log(`Downloading object: ${key}`);
        // Simulate cloud download
        return {
            content: Buffer.from(`Content of ${key}`),
            metadata: { size: 1024, lastModified: new Date() }
        };
    }
    async uploadObject(key, data) {
        console.log(`Uploading object: ${key}`);
        return {
            url: `https://storage.example.com/${key}`,
            etag: Math.random().toString(36)
        };
    }
    async removeObject(key) {
        console.log(`Removing object: ${key}`);
    }
}
exports.CloudStorageService = CloudStorageService;
class CloudStorageAdapter {
    constructor() {
        this.cloudStorage = new CloudStorageService();
    }
    async readFile(path) {
        const result = await this.cloudStorage.downloadObject(path);
        return result.content.toString();
    }
    async writeFile(path, content) {
        const buffer = Buffer.from(content);
        await this.cloudStorage.uploadObject(path, buffer);
    }
    async deleteFile(path) {
        await this.cloudStorage.removeObject(path);
    }
}
exports.CloudStorageAdapter = CloudStorageAdapter;
//# sourceMappingURL=Adapter.js.map