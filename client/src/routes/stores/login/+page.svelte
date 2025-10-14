<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center gap-3 p-8">
	<img src="/icon.png" alt="" class="h-30 w-30" />
	<p class="text-2xl font-semibold">Mag log-in</p>
	<p class="text-center text-gray-700">Gamitin ang iyong email at password sa pag login.</p>

	<Input class="" placeholder="Email" type="email" />
	<Input class="" placeholder="Password" type="password" />
	<Button class="w-full">Login</Button>
	<p class="text-center text-xs text-gray-700">
		By clicking login, you agree to our Terms of Service and Privacy Policy.
	</p>
</div>
