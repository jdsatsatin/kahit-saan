<script lang="ts">
	let { contacts } = $props();
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<div class="mx-auto w-full max-w-3xl">
	<!-- Store Description Section -->
	<div class="bg-white px-6 py-6">
		<h2 class="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
			Contact Information
		</h2>

		{#each contacts as { icon: Icon, info, onclick }}
			{#if info}
				<button
					{onclick}
					class="group flex w-full min-w-0 items-center gap-1 rounded-xl text-left transition-all active:scale-[0.98] active:bg-gray-50"
				>
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 transition-colors group-active:bg-gray-100"
					>
						<Icon class="text-primary h-5 w-5" />
					</div>
					<div class="min-w-0 flex-1">
						<p class="w-full truncate text-base font-medium text-gray-800" title={info}>
							{info}
						</p>
					</div>
				</button>
			{/if}
		{/each}
	</div>
</div>
<Separator class="bg-gray-100" />
