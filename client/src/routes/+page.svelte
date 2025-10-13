<script lang="ts">
	import NavigationBar from './components/navigation-bar.svelte';
	import AddressHeader from './components/address-header.svelte';
	import StoreSection from './components/store-section.svelte';
	import FoodSection from './components/food-section.svelte';
	import BottomNavigationBar from './components/bottom-navigation-bar.svelte';
</script>

<div class="pb-14">
	<NavigationBar />
	<StoreSection />
	<FoodSection />
</div>
<BottomNavigationBar />
