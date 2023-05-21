import React from 'react';

import { PartsRack } from './parts-rack';
import { PartsRackViewModel } from './parts-rack-view-model';

export function App(): JSX.Element {
	const partsRackViewModel = new PartsRackViewModel();

	return (
		<PartsRack model={ partsRackViewModel } />
	);
}
