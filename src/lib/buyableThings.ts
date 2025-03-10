import redbullImage from '../assets/redbull.jpg';
import batteryImage from '../assets/battery.jpg';

export const buyableThings = [
	{
		name: 'battery',
		displayName: 'Battery',
		image: batteryImage,
		price: 15
	},
	{
		name: 'redbull',
		displayName: 'Red Bull',
		image: redbullImage,
		price: 23
	},
	{
		name: 'powerking',
		displayName: 'Power King',
		image: redbullImage,
		price: 23
	}
] as const;

export type BuyableThingName = (typeof buyableThings)[number]['name'];

export const getBuyableThing = (name: BuyableThingName) =>
	buyableThings.find((thing) => thing.name === name)!;
