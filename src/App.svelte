<script>
	import { Router, Route } from "svelte-routing";

	import Navigation from "./components/Navigation/Navigation.svelte";
	import Notification from "./components/Notification/Notification.svelte";
	import Favourites from "./pages/Favourites.svelte";
	import Feed from "./pages/Feed.svelte";
	import Greetings from "./pages/Greetings.svelte";
	import { notifications } from "./notification-store";

	export let url = "";

	let notificationList = [];

	notifications.subscribe((notifications) => {
		notificationList = [...notifications];
	});
</script>

<Router {url}>
	<Navigation />

	<Route path="/" component={Greetings} />
	<Route path="/feed" component={Feed} />
	<Route path="/favourites" component={Favourites} />
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
</style>
