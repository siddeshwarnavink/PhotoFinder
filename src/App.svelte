<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-routing";

	import Notification from "./components/Notification/Notification.svelte";
	import Favourites from "./pages/Favourites.svelte";
	import Feed from "./pages/Feed.svelte";
	import Settings from "./pages/Settings.svelte";
	import { notifications } from "./notification-store";
	import { fetchPastFavourites } from "./favourite-store";
	import { settings, fetchPastSettings } from "./settings-store";
	import { searchQuery } from "./searchQuery-store";
	import Layout from "./components/Layout.svelte";

	export let url = "";

	let notificationList = [];
	let shouldShowSearch = false;

	onMount(() => {
		fetchPastFavourites();
		fetchPastSettings();
	});

	notifications.subscribe((notifications) => {
		notificationList = [...notifications];
	});

	settings.subscribe((settingsList) => {
		const darkModeSetting = settingsList.find(
			(setting) => setting.id === "dark-mode"
		);

		if (darkModeSetting.value) {
			document.body.style.backgroundColor = "#333333";
			document.body.style.color = "#fff";
		} else {
			document.body.style.backgroundColor = "#efefef";
			document.body.style.color = "#000";
		}
	});

	searchQuery.subscribe(({ showSearch }) => {
		shouldShowSearch = showSearch;
	});
</script>

<Router {url}>
	<Layout showSearch={shouldShowSearch}>
		<Route path="/" component={Feed} />
		<Route path="/favourites" component={Favourites} />
		<Route path="/settings" component={Settings} />
	</Layout>
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
