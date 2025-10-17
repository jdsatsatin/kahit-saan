<script lang="ts">
	let { description } = $props();
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<div class="mx-auto w-full max-w-3xl">
	<!-- Store Description Section -->
	<div class="bg-white px-6 py-6">
		<h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">About</h2>
		<p class="text-base leading-relaxed text-gray-800">
			{description || 'No description available.'}
		</p>
	</div>
</div>

<Separator class="bg-gray-100" />
