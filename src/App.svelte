<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-routing";

	import Navigation from "./components/Navigation/Navigation.svelte";
	import Notification from "./components/Notification/Notification.svelte";
	import Favourites from "./pages/Favourites.svelte";
	import Feed from "./pages/Feed.svelte";
	import Settings from "./pages/Settings.svelte";
	import BottomNavigation from "./components/Navigation/BottomNavigation.svelte";
	import Layout from "./components/Layout.svelte";
	import { notifications } from "./notification-store";
	import { fetchPastFavourites } from "./favourite-store";
	import { settings, fetchPastSettings } from "./settings-store";

	export let url = "";

	let notificationList = [];

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
</script>

<Router {url}>
	<Layout>
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
