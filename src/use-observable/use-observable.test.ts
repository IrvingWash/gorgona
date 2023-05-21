/**
 * @jest-environment jsdom
 */

import {
	describe,
	expect,
	it,
} from '@jest/globals';

import { act, renderHook } from '@testing-library/react';

import { useObservable } from './use-observable';
import { Subject } from '../subject/subject';

describe('Use Observable hook', () => {
	describe('should update component state', () => {
		it('when primitive values are changed in the Subject', () => {
			const subject = new Subject(1);
			const observable = subject.asObservable();

			const { result } = renderHook(() => useObservable(observable, subject.getValue()));

			act(() => {
				subject.setValue(5);
			});

			expect(result.current).toBe(5);
		});

		it('when an object property value changes', () => {
			const mock = {
				band: 'Gorguts',
				album: 'Obscure',
			};

			const subject = new Subject(mock);
			const observable = subject.asObservable();

			const { result } = renderHook(() => useObservable(observable, subject.getValue()));

			act(() => {
				subject.setValue({
					...mock,
					album: 'Colored Sands',
				});
			});

			expect(result.current?.album).toBe('Colored Sands');
		});

		it('when an element is added to an array', () => {
			const mock = ['Dark Souls', 'Bloodborne', 'Sekiro', 'Elden Ring'];

			const subject = new Subject(mock);
			const observable = subject.asObservable();

			const { result } = renderHook(() => useObservable(observable, subject.getValue()));

			act(() => {
				subject.setValue([...mock, 'Armored Core 6']);
			});

			expect(result.current?.at(-1)).toBe('Armored Core 6');
		});

		it ('when a new object is passed', () => {
			const subject = new Subject<Record<string, string>>({ nekomata: 'A cat yokai' });
			const observable = subject.asObservable();

			const { result } = renderHook(() => useObservable(observable, subject.getValue()));

			act(() => {
				subject.setValue({ nurikabe: 'An invisible wall' });
			});

			expect(result.current['nurikabe']).toBeDefined();
		});

		it ('when a new array is passed', () => {
			const subject = new Subject(['Ergo Proxy', 'Psycho-Pass']);
			const observable = subject.asObservable();

			const { result } = renderHook(() => useObservable(observable, subject.getValue()));

			act(() => {
				subject.setValue(['The Thing', 'Chaser']);
			});

			expect(result.current?.[0]).toBe('The Thing');
		});
	});
});
