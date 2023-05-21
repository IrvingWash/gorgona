import React from 'react';
import { useObservable } from '../../';

import { IPartsRackViewModel } from './parts-rack-view-model.js';

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
