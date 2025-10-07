// MongoDB initialization script for Expe Payment Gateway

db = db.getSiblingDB('expe_gateway');

// Create collections with validators
db.createCollection('merchants', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['merchantId', 'name', 'email', 'secret'],
      properties: {
        merchantId: { bsonType: 'string' },
        name: { bsonType: 'string' },
        email: { bsonType: 'string' },
        secret: { bsonType: 'string' },
        webhookUrl: { bsonType: 'string' },
        isActive: { bsonType: 'bool' },
        createdAt: { bsonType: 'date' }
      }
    }
  }
});

db.createCollection('payments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['paymentId', 'merchantId', 'amount', 'status'],
      properties: {
        paymentId: { bsonType: 'string' },
        merchantId: { bsonType: 'string' },
        amount: { bsonType: 'number' },
        currency: { bsonType: 'string' },
        status: { 
          enum: ['CREATED', 'PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'] 
        }
      }
    }
  }
});

db.createCollection('wallets');
db.createCollection('users');
db.createCollection('webhook_attempts');
db.createCollection('payment_backups');
db.createCollection('api_keys');
db.createCollection('projects');

// Create indexes for performance
db.merchants.createIndex({ merchantId: 1 }, { unique: true });
db.merchants.createIndex({ email: 1 }, { unique: true });

db.payments.createIndex({ paymentId: 1 }, { unique: true });
db.payments.createIndex({ merchantId: 1, status: 1 });
db.payments.createIndex({ idempotencyKey: 1 }, { sparse: true });
db.payments.createIndex({ createdAt: -1 });

db.wallets.createIndex({ userId: 1 }, { unique: true });

db.users.createIndex({ userId: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });

db.webhook_attempts.createIndex({ attemptId: 1 }, { unique: true });
db.webhook_attempts.createIndex({ paymentId: 1 });
db.webhook_attempts.createIndex({ status: 1, nextRunAt: 1 });

db.payment_backups.createIndex({ paymentId: 1 });
db.payment_backups.createIndex({ createdAt: -1 });

db.api_keys.createIndex({ keyId: 1 }, { unique: true });
db.api_keys.createIndex({ merchantId: 1 });
db.api_keys.createIndex({ key: 1 }, { unique: true });

db.projects.createIndex({ projectId: 1 }, { unique: true });
db.projects.createIndex({ merchantId: 1 });

print('✅ Expe Payment Gateway database initialized successfully');
