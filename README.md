# GORGONA

## Minimal reactive toolset. With a React hook

### Installation
```bash
npm i gorgona
```

### Roster
- `Subject`. An object that holds an observable value.  
	Observers can subscribe to changes of the value.

- `Observable`. A Subject to be exposed to the outside world.  
	Encapsulates everything

- `Observer`. Just a type of the function which can be subscribed to a Subject

- `useObservable`. A React hook to easily use Observables within React components.

### Usage

#### Vanilla
Let's say we're making an app for our favorite band.
The app is meant to notify us fans about a new release.

```typescript
import { Subject, Observable } from 'gorgona';

class Artist {
	public discography$: Observable<string[]>;

	private _discography$: Subject<string[]>;

	public constructor(previousReleases: string[]) {
		this._discography$ = new Subject(previousReleases);
		this.discography$ = this._discography.asObservable();
	}

	public releaseNewAlbum(title: string): void {
		this._discography$.setValue([...this._discography$.getValue(), title]);
	}
}

class Fan {
	public rejoiceBlissfully = (): void => {
		console.log('YOSH!');
	}
}

const artist = new Artist(['The Goliath', 'The Joyless Parson']);
const fan = new Fan();

artist.discography$.subscribe(fan.rejoiceBlissfully);

artist.releaseNewAlbum('Another cool album title');

// Console output
// > YOSH!
```

#### React
This time we are developing a mecha part selling marketplace.
We decided to decouple business logic from the UI and started with a view model
```typescript
// part.ts
export const enum PartType {
	Weapon = 'weapon',
	BodyPart = 'body part',
}

export interface Part {
	manufacturer: string;
	type: PartType;
	name: string;
	price: number;
}
```

```typescript
// parts-rack-view-model.ts
import { Observable, Subject } from 'gorgona';

import { Part, PartType } from './part.ts';

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
```

```tsx
// parts-rack.tsx
import React from 'react';
import { useObservable } from 'gorgona';

import { IPartsRackViewModel } from './parts-rack-view-model';

interface PartsRackProps {
	model: IPartsRackViewModel;
}

export function PartsRack(props: PartsRackProps): JSX.Element {
	const { model } = props;

	// Now the component will be rerendered
	// every time anyone calls `PartsRackViewModel.fetchParts`
	const parts = useObservable(model.parts$, model.getParts());

	return (
		<div>
			{ parts.map((part) => (
				<div>
					<p>{ part.name }</p>
					<p>{ part.type }</p>
					<p>{ part.price }</p>
					<p>{ part.manufacturer }</p>
				</div>
			))}
		</div>
	);
}
```

```tsx
// app.tsx
import React from 'react';

import { PartsRack } from './parts-rack';
import { PartsRackViewModel } from './parts-rack-view-model';

export function App(): JSX.Element {
	const partsRackViewModel = new PartsRackViewModel();

	return (
		<PartsRack model={ partsRackViewModel } />
	);
}
```

The code above needs to be put in a React project
