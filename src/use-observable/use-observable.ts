import { useEffect, useState } from 'react';

import { Observable } from '../observable/observable';

export function useObservable<T>(observable$: Observable<T>, initialValue: T): T
export function useObservable<T>(observable$: Observable<T>, initialValue?: T): T | undefined
export function useObservable<T>(observable$: Observable<T>, initialValue?: T): T | undefined {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		observable$.subscribe(setValue);

		return () => observable$.unsubscribe();
	},
	[observable$, setValue]
	);

	return value;
}
