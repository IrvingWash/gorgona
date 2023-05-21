import {
	describe,
	expect,
	it,
	jest,
} from '@jest/globals';

import { Artist } from './new-album';
import { Fan } from './new-album';

describe('New Album from Vanilla tutorial', () => {
	it('compiles and works', () => {
		const artist = new Artist(['a', 'b', 'c']);
		const fan = new Fan();

		const mock = jest.spyOn(fan, 'rejoiceBlissfully');

		artist.discography$.subscribe(fan.rejoiceBlissfully);

		artist.releaseNewAlbum('d');

		expect(mock).toHaveBeenCalled();
	});
});
