<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';

	import { authService } from '$lib/services/auth.service';
	import { goto } from '$app/navigation';

	let email: string = $state('');
	let password: string = $state('');
	let loading: boolean = $state(false);

	const register = async (email: string, password: string) => {
		loading = true;
		try {
			const response = await authService.register(email, password);
			const { data, error } = response;

			if (data.user) {
				goto('/my-stores');
			} else if (error) {
				toast(error.message);
			}
		} catch (error) {
			toast('There has been an error, please contact Administrator.');
		} finally {
			loading = false;
		}
	};
</script>

<div class="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center gap-3 p-8">
	<img src="/icon.png" alt="" class="h-30 w-30" />
	<div class="mb-4 flex flex-col items-center gap-1">
		<p class="text-2xl font-semibold">Register</p>
		<p class="text-center text-gray-700">Register with your email and password.</p>
	</div>

	<Input class="" placeholder="Email" type="email" bind:value={email} required />
	<Input class="" placeholder="Password" type="password" bind:value={password} required />
	<Button class="w-full" onclick={() => register(email, password)} disabled={loading}
		>{loading ? 'Registering....' : 'Register'}</Button
	>
	<p class="text-center text-xs text-gray-700">
		By clicking login, you agree to our Terms of Service and <a href="/privacy-policy"
			>Privacy Policy</a
		>.
	</p>
</div>
