// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const { slug } = params;

	return {
		slug
		// other data
	};
};
