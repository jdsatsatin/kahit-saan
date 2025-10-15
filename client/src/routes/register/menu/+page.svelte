<script lang="ts">
	import { onMount } from 'svelte';
	import Tesseract from 'tesseract.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let imageFile: File | null = null;
	let processing = false;
	let result = '';
	let imageUrl: string | null = null;

   export let type = "text";
  export let accept = "";
  export let value = "";
  export let $$restProps;
	onMount(() => {
		console.log('Client mounted ✅');
	});

	function handleFileChange(event: Event) {
		const files = (event.target as HTMLInputElement).files;
		if (files && files.length > 0) {
			imageFile = files[0];
			imageUrl = URL.createObjectURL(imageFile);
		}
	}

	async function handleImageUpload() {
    if (!imageFile) {
        alert('Please select an image first!');
        return;
    }

    processing = true;
    console.log('Starting OCR...');

    const { data } = await Tesseract.recognize(imageFile, 'eng', {
        logger: (info) => console.log(info)
    });

    console.log('OCR done ✅');
    result = data.text;
    processing = false;

    if (imageUrl) URL.revokeObjectURL(imageUrl);
}
</script>

<div class="flex h-screen flex-col items-center justify-center gap-4 p-6">
	<input
  type={type}
  accept={accept}
  value={value}
  {...$$restProps}
/>

	{#if imageUrl}
		<img src={imageUrl} alt="Preview" class="h-40 rounded shadow" />
	{/if}

<button on:click={handleImageUpload} disabled={processing} class="btn">
    {processing ? 'Processing...' : 'Run OCR'}
</button>

	{#if result}
		<div class="mt-4 w-full max-w-md whitespace-pre-wrap rounded bg-gray-100 p-3 text-sm">
			{result}
		</div>
	{/if}
</div>
