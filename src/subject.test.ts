import {
	beforeEach,
	describe,
	expect,
	it,
} from '@jest/globals';

import { Subject } from './subject';

describe('Subject', () => {
	let state = 0;

	const observer = (): void => {
		state++;
	};

	beforeEach(() => {
		state = 0;
	});

	it('should trigger subscribed Observers when it\'s value is changed', () => {
		const subject = new Subject('zero');
		subject.subscribe(observer);

		subject.setValue('one');

		expect(state).toEqual(1);
	});

	it('should not trigger Observers if the same primitive value is set safely', () => {
		const subject = new Subject('zero');
		subject.subscribe(observer);

		subject.setValueSafely('zero');
		subject.setValueSafely('one');
		subject.setValueSafely('one');
		subject.setValueSafely('one');

		expect(state).toEqual(1);
	});

	it('should not notify unsubscribed Observers', () => {
		const anotherObserver = (): void => {
			state += 2;
		};

		const subject = new Subject('zero');

		subject.subscribe(observer);
		subject.subscribe(anotherObserver);

		subject.unsubscribe(observer);

		subject.setValue('one');

		expect(state).toEqual(2);
	});

	it('should not trigger an Observer multiple times if the Observer was subscribed more than once', () => {
		const subject = new Subject('zero');

		subject.subscribe(observer);
		subject.subscribe(observer);
		subject.subscribe(observer);

		subject.setValue('one');

		expect(state).toEqual(1);
	});
});
