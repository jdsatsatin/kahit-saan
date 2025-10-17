<script lang="ts">
	let { mapSrc } = $props();
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<div class="mx-auto w-full max-w-3xl">
	<!-- Store Description Section -->
	<div class="bg-white px-6 py-6">
		<h2 class="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Location</h2>
		<div class="overflow-hidden rounded-2xl">
			<iframe
				title="Store Location"
				src={mapSrc}
				width="100%"
				height="280"
				style="border:0;"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				class="w-full"
			></iframe>
		</div>
	</div>
</div>
<Separator class="text-gray-100" />
