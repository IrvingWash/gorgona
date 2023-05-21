import { describe, expect, it } from '@jest/globals';

import { hello } from './hello';

describe('Hello', () => {
	it('greets the world', () => {
		expect(hello()).toBe('Hello, World!');
	});
});
