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
	},

	async getStoreById(id: string) {
		const { data, error } = await supabase.from('stores').select('*').eq('id', id).single();
		if (error) {
			console.error('Error fetching store by ID:', error);
			return null;
		}
		return data;
	}
};
