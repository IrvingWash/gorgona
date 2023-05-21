import { Observer } from './observer';
import { Subject } from './subject';

export class Observable<T> {
	private _subject: Subject<T>;

	public constructor(subject: Subject<T>) {
		this._subject = subject;
	}

	public subscribe(observer: Observer<T>): void;
	public subscribe(observers: Observer<T>[]): void
	public subscribe(o: Observer<T> | Observer<T>[]): void {
		if (Array.isArray(o)) {
			this._subject.subscribe(o);

			return;
		}

		this._subject.subscribe(o);
	}

	public unsubscribe(): void
	public unsubscribe(observer: Observer<T>): void
	public unsubscribe(observers: Observer<T>[]): void
	public unsubscribe(o?: Observer<T> | Observer<T>[]): void {
		if (Array.isArray(o)) {
			this._subject.unsubscribe(o);

			return;
		}

		if (o !== undefined) {
			this._subject.unsubscribe(o);

			return;
		}

		this._subject.unsubscribe();
	}
}
