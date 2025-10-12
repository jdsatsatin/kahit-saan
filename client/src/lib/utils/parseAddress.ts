export type AddressComponent = {
	long_name: string;
	short_name?: string;
	types: string[];
};

export type Geometry = {
	location: {
		lat: number;
		lng: number;
	};
};

export type AddressData = {
	formatted_address: string;
	raw: {
		address_components: AddressComponent[];
		geometry: Geometry;
	};
};

// Helper function to find a component by type
export function getComponent(components: AddressComponent[], typeName: string): string | null {
	const comp = components.find((c) => c.types.includes(typeName));
	return comp ? comp.long_name : null;
}

// Helper to parse address object from Google Geocoding API
export function parseAddress(data: any) {
	const components = data.address_components;
	const formattedAddress = data.formatted_address;
	const streetNumber = getComponent(components, 'street_number');
	const route = getComponent(components, 'route');
	const sublocality = getComponent(components, 'sublocality_level_1');
	const city = getComponent(components, 'locality');
	const province = getComponent(components, 'administrative_area_level_1');
	const country = getComponent(components, 'country');
	const { lat, lng } = data.geometry.location;

	return {
		formattedAddress,
		street: [streetNumber, route].filter(Boolean).join(' '),
		sublocality,
		city,
		province,
		country,
		lat,
		lng
	};
}
