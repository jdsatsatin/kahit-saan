<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
</script>

<div class="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center gap-3 p-8">
	<img src="/icon.png" alt="" class="h-30 w-30" />
	<div class="flex flex-col items-center gap-2">
		<p class="text-xl font-semibold">Iregister ang iyong Store</p>
		<p class="text-center text-sm text-gray-700">
			Gamitin ang iyong email at password sa pag login.
		</p>
	</div>
	<Input class="" placeholder="Pangalan ng Store" type="text" />
	<Input class="" placeholder="Password" type="password" />
	<Input class="" placeholder="Email" type="email" />
	<Input class="" placeholder="Password" type="password" />
	<Button
		class="w-full"
		onclick={() => {
			toast('Logged in');
		}}>Login</Button
	>
	<p class="text-center text-xs text-gray-700">
		By clicking login, you agree to our Terms of Service and Privacy Policy.
	</p>
</div>
