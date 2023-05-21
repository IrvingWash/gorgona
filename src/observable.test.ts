import { describe, expect, it } from '@jest/globals';

import { Subject } from './subject';

describe('Observers', () => {
	describe('subscribed to Observable', () => {
		it('should be triggered when Subject\'s value changes', () => {
			let state = 0;

			const observer = (): void => {
				state++;
			};

			const subject = new Subject('zero');

			const observable = subject.asObservable();

			observable.subscribe(observer);

			subject.setValue('one');

			expect(state).toEqual(1);
		});
	});
});
