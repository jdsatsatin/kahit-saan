import { GOOGLE_GEOCODING_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const lat = url.searchParams.get('lat');
	const lng = url.searchParams.get('lng');

	if (!lat || !lng) {
		return new Response(JSON.stringify({ error: 'Missing coordinates' }), { status: 400 });
	}

	const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODING_API_KEY}`;
	const res = await fetch(api);
	const data = await res.json();

	if (data.status !== 'OK' || !data.results?.length) {
		return new Response(JSON.stringify({ error: 'No address found' }), { status: 404 });
	}

	return new Response(
		JSON.stringify({
			formatted_address: data.results[0].formatted_address,
			raw: data.results[0]
		}),
		{ headers: { 'Content-Type': 'application/json' } }
	);
};
