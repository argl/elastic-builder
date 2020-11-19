import test from 'ava';
import { DateHistogramAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, DateHistogramAggregation, 'date_histogram');

test('constructor sets optional arguments', t => {
    const value = new DateHistogramAggregation(
            'sale_date',
            'date',
            'year'
        ).toJSON(),
        expected = {
            sale_date: {
                date_histogram: {
                    field: 'date',
                    interval: 'year'
                }
            }
        };
    t.deepEqual(value, expected);
});

test('time_zone is set', t => {
    const value = new DateHistogramAggregation('by_day', 'date', 'day')
        .timeZone('-01:00')
        .toJSON();
    const expected = {
        by_day: {
            date_histogram: {
                field: 'date',
                interval: 'day',
                time_zone: '-01:00'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('calendar_interval_is_set', t => {
    const value = new DateHistogramAggregation('by_day', 'date')
        .calendarInterval('month')
        .toJSON();
    const expected = {
        by_day: {
            date_histogram: {
                field: 'date',
                calendar_interval: 'month'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('fixed_interval_is_set', t => {
    const value = new DateHistogramAggregation('by_day', 'date')
        .fixedInterval('90s')
        .toJSON();
    const expected = {
        by_day: {
            date_histogram: {
                field: 'date',
                fixed_interval: '90s'
            }
        }
    };
    t.deepEqual(value, expected);
});
