import type { PageLoad } from './$types';
import { StoreService } from '$lib/services/stores.service';

export const load: PageLoad = async ({ params }) => {
	const store = await StoreService.getStoreById(params.slug);
	return {
		store: store || null
	};
};
