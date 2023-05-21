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
