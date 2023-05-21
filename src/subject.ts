import { Observer } from './observer';

export class Subject<T> {
	private _value: T;
	private _observers: Set<Observer<T>>;

	public constructor(initialValue: T) {
		this._value = initialValue;
		this._observers = new Set();
	}

	public getValue(): T {
		return this._value;
	}

	public setValue(value: T): void {
		this._value = value;

		this._notify();
	}

	public setValueSafely(value: T): void {
		if (Object.is(this._value, value)) {
			return;
		}

		this.setValue(value);
	}

	public subscribe(observer: Observer<T>): void
	public subscribe(observers: Observer<T>[]): void
	public subscribe(o: Observer<T> | Observer<T>[]): void {
		if (Array.isArray(o)) {
			o.forEach((observer) => {
				this._observers.add(observer);
			});

			return;
		}

		this._observers.add(o);
	}

	public unsubscribe(): void
	public unsubscribe(observer: Observer<T>): void
	public unsubscribe(observers: Observer<T>[]): void
	public unsubscribe(o?: Observer<T> | Observer<T>[]): void {
		if (Array.isArray(o)) {
			o.forEach((observer) => {
				this._observers.delete(observer);
			});

			return;
		}

		if (o !== undefined) {
			this._observers.delete(o);

			return;
		}

		this._observers.clear();
	}

	private _notify(): void {
		this._observers.forEach((observer) => {
			observer(this._value);
		});
	}
}
