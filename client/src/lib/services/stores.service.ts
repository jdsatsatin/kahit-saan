import { supabase } from '$lib/supabase/client';

export const storeService = {
	async getStores(offset = 0, limit = 10) {
		const { data, error } = await supabase
			.from('stores')
			.select('*')
			.range(offset, offset + limit - 1);
		if (error) {
			return [];
		}
		return data;
	},

	//
	async createStore() {},

	async getStoreById(id: string) {
		const { data, error } = await supabase.from('stores').select('*').eq('id', id).single();
		if (error) {
			return null;
		}
		return data;
	},

	async getNearbyStores(userLat: number, userLng: number, radiusKm = 50, limit = 10) {
		const { data: nearbyData, error: nearbyError } = await supabase.rpc('nearby_stores', {
			user_lat: userLat,
			user_lng: userLng,
			radius_km: radiusKm,
			result_limit: limit
		});

		if (nearbyError) {
			console.error('Error fetching nearby stores:', nearbyError);
			return [];
		}

		if (!nearbyData || nearbyData.length === 0) {
			return [];
		}

		// Extract store IDs and create a distance map
		const storeIds = nearbyData.map((store: any) => store.id);
		const distanceMap = new Map(nearbyData.map((store: any) => [store.id, store.distance]));

		// Fetch complete store data
		const { data: storesData, error: storesError } = await supabase
			.from('stores')
			.select('*')
			.in('id', storeIds);

		if (storesError) {
			console.error('Error fetching store details:', storesError);
			return [];
		}

		// Combine store data with distances and sort by distance
		const storesWithDistance = storesData.map((store) => ({
			...store,
			distance: distanceMap.get(store.id) || 0
		}));

		storesWithDistance.sort((a, b) => a.distance - b.distance);

		return storesWithDistance;
	}
};
