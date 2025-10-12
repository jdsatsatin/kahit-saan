<script lang="ts">
	import { House, User, MessageCircle, Utensils } from '@lucide/svelte';
</script>

<div
	class="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-3xl flex-row justify-around bg-white p-2"
>
	<div class="flex flex-col items-center justify-center">
		<House class="h-4 w-4" />
		Home
	</div>
	<div class="flex flex-col items-center justify-center">
		<Utensils class="h-4 w-4" />
		Food
	</div>
	<div class="flex flex-col items-center justify-center">
		<MessageCircle class="h-4 w-4" />
		Chat
	</div>
	<div class="flex flex-col items-center justify-center">
		<User class="h-4 w-4" />
		Profile
	</div>
</div>
