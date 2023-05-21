import { describe, expect, it } from '@jest/globals';

import { Subject } from './subject';

describe('Subject', () => {
	it('should trigger subscribed observers when it\'s value is changed', () => {
		let state = 0;

		const observer = (): void => {
			state++;
		};

		const subject = new Subject('zero');
		subject.subscribe(observer);

		subject.setValue('one');

		expect(state).toEqual(1);
	});

	it('should not trigger observers if the same primitive value is set safely', () => {
		let state = 0;

		const observer = (): void => {
			state++;
		};

		const subject = new Subject('zero');
		subject.subscribe(observer);

		subject.setValueSafely('zero');
		subject.setValueSafely('one');
		subject.setValueSafely('one');
		subject.setValueSafely('one');

		expect(state).toEqual(1);
	});

	it('should not notify unsubscirbed observers', () => {
		let state = 0;

		const observer1 = (): void => {
			state++;
		};

		const observer2 = (): void => {
			state += 2;
		};

		const subject = new Subject('zero');

		subject.subscribe(observer1);
		subject.subscribe(observer2);

		subject.unsubscribe(observer1);

		subject.setValue('one');

		expect(state).toEqual(2);
	});

	it('should not trigger an observer multiple times if the observer was subscribed more than once', () => {
		let state = 0;

		const observer = (): void => {
			state++;
		};

		const subject = new Subject('zero');

		subject.subscribe(observer);
		subject.subscribe(observer);
		subject.subscribe(observer);

		subject.setValue('one');

		expect(state).toEqual(1);
	});
});
