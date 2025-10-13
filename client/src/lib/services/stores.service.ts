import { supabase } from '$lib/supabase/client';

export const StoreService = {
	async getStores(offset = 0, limit = 10) {
		const { data, error } = await supabase
			.from('stores')
			.select('*')
			.range(offset, offset + limit - 1);
		if (error) {
			console.error('Error fetching stores:', error);
			return [];
		}
		return data;
	}
};
