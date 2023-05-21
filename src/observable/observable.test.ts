import {
	beforeEach,
	describe,
	expect,
	it,
} from '@jest/globals';

import { Subject } from '../subject/subject';

describe('Observers', () => {
	let state = 0;

	const observer = (): void => {
		state++;
	};

	beforeEach(() => {
		state = 0;
	});

	describe('subscribed to Observable', () => {
		it('should be triggered when Subject\'s value changes', () => {
			const subject = new Subject('zero');

			const observable = subject.asObservable();

			observable.subscribe(observer);

			subject.setValue('one');

			expect(state).toEqual(1);
		});
	});
});
