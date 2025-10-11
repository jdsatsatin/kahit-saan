<script lang="ts">
 import Input from "$lib/components/ui/input/input.svelte";
 import * as Avatar from "$lib/components/ui/avatar/index";
 import logo from '$lib/assets/logo.svg';
</script>
 

<div class="bg-[#6a994e]">


<div class="max-w-3xl mx-auto p-4 flex items-center gap-4">
  <img src="/assets/" alt="">
<Input /> 
<Avatar.Root>
  <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
  <Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
</div>
</div>
