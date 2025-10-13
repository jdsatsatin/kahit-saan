import { supabase } from '$lib/supabase/client';

export const StoreService = {
	async getStores() {
		const { data, error } = await supabase.from('stores').select('*');
		if (error) {
			console.error('Error fetching stores:', error);
			return [];
		}
		return data;
	}
};
