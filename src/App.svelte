<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-routing";

	import Navigation from "./components/Navigation/Navigation.svelte";
	import Notification from "./components/Notification/Notification.svelte";
	import Favourites from "./pages/Favourites.svelte";
	import Feed from "./pages/Feed.svelte";
	import Settings from "./pages/Settings.svelte";
	import { notifications } from "./notification-store";
	import { fetchPastFavourites } from "./favourite-store";
	import { fetchPastSettings } from "./settings-store";
	import BottomNavigation from "./components/Navigation/BottomNavigation.svelte";

	export let url = "";

	let notificationList = [];

	onMount(() => {
		fetchPastFavourites();
		fetchPastSettings();
	});

	notifications.subscribe((notifications) => {
		notificationList = [...notifications];
	});
</script>

<Router {url}>
	<Navigation />

	<Route path="/" component={Feed} />
	<Route path="/favourites" component={Favourites} />
	<Route path="/settings" component={Settings} />

	<BottomNavigation />
</Router>

<div class="notification-tray">
	{#each notificationList as notification}
		<Notification message={notification.message} />
	{/each}
</div>

<style>
	.notification-tray {
		position: fixed;
		bottom: 24px;
		right: 24px;
		width: 300px;
		z-index: 300;
	}

	@media (max-width: 600px) {
		.notification-tray {
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
