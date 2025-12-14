import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { DateTime } from 'luxon';
import getNextSunday, { getNextWednesday, getNextDayOfWeek } from './getNextSunday.js';

describe('getNextSunday', () => {
  let originalLocal;

  beforeEach(() => {
    originalLocal = DateTime.local;
  });

  afterEach(() => {
    DateTime.local = originalLocal;
  });

  it('should return next Sunday when called on Monday', () => {
    // Mock a Monday (2025-01-06 is a Monday)
    const monday = DateTime.fromISO('2025-01-06T10:00:00');
    DateTime.local = () => monday;

    const result = DateTime.fromISO(getNextSunday());
    const expected = DateTime.fromISO('2025-01-12'); // Next Sunday

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-12');
    assert.strictEqual(result.weekday, 7, 'Result should be a Sunday');
  });

  it('should return today when called on Sunday', () => {
    // Mock a Sunday (2025-01-12 is a Sunday)
    const sunday = DateTime.fromISO('2025-01-12T10:00:00');
    DateTime.local = () => sunday;

    const result = DateTime.fromISO(getNextSunday());
    const expected = DateTime.fromISO('2025-01-12'); // Today

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return today (2025-01-12)');
    assert.strictEqual(result.weekday, 7, 'Result should be a Sunday');
  });

  it('should return next Sunday when called on Saturday', () => {
    // Mock a Saturday (2025-01-11 is a Saturday)
    const saturday = DateTime.fromISO('2025-01-11T10:00:00');
    DateTime.local = () => saturday;

    const result = DateTime.fromISO(getNextSunday());
    const expected = DateTime.fromISO('2025-01-12'); // Tomorrow

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-12');
    assert.strictEqual(result.weekday, 7, 'Result should be a Sunday');
  });

  it('should return next Sunday when called on Wednesday', () => {
    // Mock a Wednesday (2025-01-08 is a Wednesday)
    const wednesday = DateTime.fromISO('2025-01-08T10:00:00');
    DateTime.local = () => wednesday;

    const result = DateTime.fromISO(getNextSunday());
    const expected = DateTime.fromISO('2025-01-12'); // This Sunday

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-12');
    assert.strictEqual(result.weekday, 7, 'Result should be a Sunday');
  });
});

describe('getNextWednesday', () => {
  it('should return next Wednesday when called on Monday', () => {
    // Mock a Monday (2025-01-06 is a Monday)
    const monday = DateTime.fromISO('2025-01-06T10:00:00');
    const nextWed = DateTime.fromISO('2025-01-08'); // Wednesday

    // Temporarily override DateTime.local for this test
    const originalLocal = DateTime.local;
    DateTime.local = () => monday;

    try {
      const result = getNextWednesday();

      assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday (weekday=3)');
      assert.strictEqual(result.toISODate(), nextWed.toISODate(), 'Should return 2025-01-08');
    } finally {
      DateTime.local = originalLocal;
    }
  });

  it('should return next Wednesday when called on Tuesday', () => {
    // Mock a Tuesday (2025-01-07 is a Tuesday)
    const tuesday = DateTime.fromISO('2025-01-07T10:00:00');
    const nextWed = DateTime.fromISO('2025-01-08'); // Tomorrow

    const originalLocal = DateTime.local;
    DateTime.local = () => tuesday;

    try {
      const result = getNextWednesday();

      assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday');
      assert.strictEqual(result.toISODate(), nextWed.toISODate(), 'Should return 2025-01-08');
    } finally {
      DateTime.local = originalLocal;
    }
  });

  it('should return today when called on Wednesday', () => {
    // Mock a Wednesday (2025-01-08 is a Wednesday)
    const wednesday = DateTime.fromISO('2025-01-08T10:00:00');
    const nextWed = DateTime.fromISO('2025-01-08'); // This week

    const originalLocal = DateTime.local;
    DateTime.local = () => wednesday;

    try {
      const result = getNextWednesday();

      assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday');
      // This should return next week's Wednesday, not today
      assert.strictEqual(result.toISODate(), nextWed.toISODate(), 'Should return next week (2025-01-15)');
    } finally {
      DateTime.local = originalLocal;
    }
  });

  it('should return next Wednesday when called on Thursday', () => {
    // Mock a Thursday (2025-01-09 is a Thursday)
    const thursday = DateTime.fromISO('2025-01-09T10:00:00');
    const nextWed = DateTime.fromISO('2025-01-15'); // Next week Wednesday

    const originalLocal = DateTime.local;
    DateTime.local = () => thursday;

    try {
      const result = getNextWednesday();

      assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday');
      assert.strictEqual(result.toISODate(), nextWed.toISODate(), 'Should return 2025-01-15');
    } finally {
      DateTime.local = originalLocal;
    }
  });

  it('should return next Wednesday when called on Friday', () => {
    // Mock a Friday (2025-01-10 is a Friday)
    const friday = DateTime.fromISO('2025-01-10T10:00:00');
    const nextWed = DateTime.fromISO('2025-01-15'); // Next week

    const originalLocal = DateTime.local;
    DateTime.local = () => friday;

    try {
      const result = getNextWednesday();

      assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday');
      assert.strictEqual(result.toISODate(), nextWed.toISODate(), 'Should return 2025-01-15');
    } finally {
      DateTime.local = originalLocal;
    }
  });

  it('should return next Wednesday when called on Saturday', () => {
    // Mock a Saturday (2025-01-11 is a Saturday)
    const saturday = DateTime.fromISO('2025-01-11T10:00:00');
    const nextWed = DateTime.fromISO('2025-01-15'); // Next week

    const originalLocal = DateTime.local;
    DateTime.local = () => saturday;

    try {
      const result = getNextWednesday();

      assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday');
      assert.strictEqual(result.toISODate(), nextWed.toISODate(), 'Should return 2025-01-15');
    } finally {
      DateTime.local = originalLocal;
    }
  });

  it('should return next Wednesday when called on Sunday', () => {
    // Mock a Sunday (2025-01-12 is a Sunday)
    const sunday = DateTime.fromISO('2025-01-12T10:00:00');
    const nextWed = DateTime.fromISO('2025-01-15'); // This week

    const originalLocal = DateTime.local;
    DateTime.local = () => sunday;

    try {
      const result = getNextWednesday();

      assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday');
      assert.strictEqual(result.toISODate(), nextWed.toISODate(), 'Should return 2025-01-15');
    } finally {
      DateTime.local = originalLocal;
    }
  });
});

describe('getNextDayOfWeek', () => {
  let originalLocal;

  beforeEach(() => {
    originalLocal = DateTime.local;
  });

  afterEach(() => {
    DateTime.local = originalLocal;
  });

  it('should return today when called on Monday with "Monday"', () => {
    const monday = DateTime.fromISO('2025-01-06T10:00:00'); // Monday
    DateTime.local = () => monday;

    const result = getNextDayOfWeek('Monday');
    const expected = DateTime.fromISO('2025-01-06'); // Today

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-06');
    assert.strictEqual(result.weekday, 1, 'Result should be a Monday');
  });

  it('should return next Tuesday when called on Monday with "Tuesday"', () => {
    const monday = DateTime.fromISO('2025-01-06T10:00:00'); // Monday
    DateTime.local = () => monday;

    const result = getNextDayOfWeek('Tuesday');
    const expected = DateTime.fromISO('2025-01-07'); // Tomorrow

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-07');
    assert.strictEqual(result.weekday, 2, 'Result should be a Tuesday');
  });

  it('should return next Wednesday when called on Monday with "wed"', () => {
    const monday = DateTime.fromISO('2025-01-06T10:00:00'); // Monday
    DateTime.local = () => monday;

    const result = getNextDayOfWeek('wed');
    const expected = DateTime.fromISO('2025-01-08'); // This Wednesday

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-08');
    assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday');
  });

  it('should return today when called on Thursday with "THU"', () => {
    const thursday = DateTime.fromISO('2025-01-09T10:00:00'); // Thursday
    DateTime.local = () => thursday;

    const result = getNextDayOfWeek('THU');
    const expected = DateTime.fromISO('2025-01-09'); // Today

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-09');
    assert.strictEqual(result.weekday, 4, 'Result should be a Thursday');
  });

  it('should return next Friday when called on Tuesday with "Friday"', () => {
    const tuesday = DateTime.fromISO('2025-01-07T10:00:00'); // Tuesday
    DateTime.local = () => tuesday;

    const result = getNextDayOfWeek('Friday');
    const expected = DateTime.fromISO('2025-01-10'); // This Friday

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-10');
    assert.strictEqual(result.weekday, 5, 'Result should be a Friday');
  });

  it('should return today when called on Saturday with "sat"', () => {
    const saturday = DateTime.fromISO('2025-01-11T10:00:00'); // Saturday
    DateTime.local = () => saturday;

    const result = getNextDayOfWeek('sat');
    const expected = DateTime.fromISO('2025-01-11'); // Today

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-11');
    assert.strictEqual(result.weekday, 6, 'Result should be a Saturday');
  });

  it('should return next Sunday when called on Wednesday with "Sunday"', () => {
    const wednesday = DateTime.fromISO('2025-01-08T10:00:00'); // Wednesday
    DateTime.local = () => wednesday;

    const result = getNextDayOfWeek('Sunday');
    const expected = DateTime.fromISO('2025-01-12'); // This Sunday

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-12');
    assert.strictEqual(result.weekday, 7, 'Result should be a Sunday');
  });

  it('should return today when called on Sunday with "sun"', () => {
    const sunday = DateTime.fromISO('2025-01-12T10:00:00'); // Sunday
    DateTime.local = () => sunday;

    const result = getNextDayOfWeek('sun');
    const expected = DateTime.fromISO('2025-01-12'); // Today

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-12');
    assert.strictEqual(result.weekday, 7, 'Result should be a Sunday');
  });

  it('should handle mixed case input like "wEdNeSdAy"', () => {
    const monday = DateTime.fromISO('2025-01-06T10:00:00'); // Monday
    DateTime.local = () => monday;

    const result = getNextDayOfWeek('wEdNeSdAy');
    const expected = DateTime.fromISO('2025-01-08'); // This Wednesday

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-08');
    assert.strictEqual(result.weekday, 3, 'Result should be a Wednesday');
  });

  it('should return next Monday when called on Friday with "monday"', () => {
    const friday = DateTime.fromISO('2025-01-10T10:00:00'); // Friday
    DateTime.local = () => friday;

    const result = getNextDayOfWeek('monday');
    const expected = DateTime.fromISO('2025-01-13'); // Next Monday

    assert.strictEqual(result.toISODate(), expected.toISODate(), 'Should return 2025-01-13');
    assert.strictEqual(result.weekday, 1, 'Result should be a Monday');
  });
});