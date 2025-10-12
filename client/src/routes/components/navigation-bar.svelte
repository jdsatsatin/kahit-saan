<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import { Search } from '@lucide/svelte';
</script>

<div class="bg-[#B0CE88]">
	<div class="mx-auto flex max-w-3xl items-center gap-4 p-4">
		<div class="relative flex w-full flex-row items-center rounded-md bg-white">
			<Search class="text-muted-background absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
			<Input type="search" placeholder="Search..." class="w-full pl-9" />
		</div>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
</div>
