import redbullImage from '../assets/redbull.jpg';
import monsterImage from '../assets/monster.webp';
import batteryImage from '../assets/battery.jpg';
import powerkingImage from '../assets/powerking.jpg';
import colaImage from '../assets/cola-zero.jpeg';

export const buyableThings = [
	{
		name: 'battery',
		displayName: 'Battery',
		image: batteryImage,
		price: 17
	},
	{
		name: 'monster',
		displayName: 'Monster',
		image: monsterImage,
		price: 18
	},
	{
		name: 'redbull',
		displayName: 'Red Bull',
		image: redbullImage,
		price: 23
	},
	{
		name: 'cola',
		displayName: 'Coca Cola',
		image: colaImage,
		price: 10
	},
	{
		name: 'powerking',
		displayName: 'Power King',
		image: powerkingImage,
		price: 10
	}
] as const;

export type BuyableThingName = (typeof buyableThings)[number]['name'];

export const getBuyableThing = (name: BuyableThingName) =>
	buyableThings.find((thing) => thing.name === name)!;
