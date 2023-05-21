import { Subject, Observable } from '../../';

class Artist {
	public discography$: Observable<string[]>;

	private _discography$: Subject<string[]>;

	public constructor(previousReleases: string[]) {
		this._discography$ = new Subject(previousReleases);
		this.discography$ = this._discography$.asObservable();
	}

	public releaseNewAlbum(title: string): void {
		this._discography$.setValue([...this._discography$.getValue(), title]);
	}
}

class Fan {
	public rejoiceBlissfully = (): void => {
		console.log('YOSH!');
	};
}

const artist = new Artist(['The Goliath', 'The Joyless Parson']);
const fan = new Fan();

artist.discography$.subscribe(fan.rejoiceBlissfully);

artist.releaseNewAlbum('Another cool album title');
