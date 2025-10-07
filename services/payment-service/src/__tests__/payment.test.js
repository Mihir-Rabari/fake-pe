const { generatePaymentId } = require('@expe/shared');

describe('Payment Service Tests', () => {
  test('should generate valid payment ID', () => {
    const paymentId = generatePaymentId();
    expect(paymentId).toMatch(/^pay_/);
    expect(paymentId.length).toBeGreaterThan(10);
  });

  test('payment IDs should be unique', () => {
    const id1 = generatePaymentId();
    const id2 = generatePaymentId();
    expect(id1).not.toBe(id2);
  });
});
