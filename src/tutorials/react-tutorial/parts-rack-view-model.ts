import { Observable, Subject } from '../../';

import { Part, PartType } from './part.js';

export interface IPartsRackViewModel {
	parts$: Observable<Part[]>;
	getParts(): Part[];
	fetchParts(): Promise<void>;
}

export class PartsRackViewModel implements IPartsRackViewModel {
	public parts$: Observable<Part[]>;

	private _parts$: Subject<Part[]>;

	public constructor() {
		this._parts$ = new Subject<Part[]>([]);
		this.parts$ = this._parts$.asObservable();
	}

	public getParts(): Part[] {
		return this._parts$.getValue();
	}

	public async fetchParts(): Promise<void> {
		// Imagine we got this from the server
		this._parts$.setValue([{
			manufacturer: 'Kisaragi',
			type: PartType.BodyPart,
			name: 'KAW-SAMURAI2',
			price: 128_000,
		}]);
	}
}
