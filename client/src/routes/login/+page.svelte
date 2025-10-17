<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';

	import { authService } from '$lib/services/auth.service';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	const login = async (email: string, password: string) => {
		const response = await authService.login(email, password);
		const { data, error } = response;

		if (data.user) {
			goto('/my-stores');
		} else if (error) {
			toast(error.message);
		}
	};
</script>

<div class="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center gap-3 p-8">
	<img src="/icon.png" alt="" class="h-30 w-30" />
	<div class="mb-4 flex flex-col items-center gap-1">
		<p class="text-2xl font-semibold">Log-in</p>
		<p class="text-center text-gray-700">Log-in with your email and password.</p>
	</div>

	<Input class="" placeholder="Email" type="email" bind:value={email} />
	<Input class="" placeholder="Password" type="password" bind:value={password} />
	<Button class="w-full" onclick={() => login(email, password)}>Login</Button>
	<p class="text-center text-xs text-gray-700">
		By clicking login, you agree to our Terms of Service and <a href="/privacy-policy"
			>Privacy Policy</a
		>.
	</p>
</div>
