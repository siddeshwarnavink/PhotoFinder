<script>
    import NavigationLink from "./NavigationLink.svelte";

    import { favourites } from "../../favourite-store";

    let favouritesCount = 0;

    favourites.subscribe((favouriteList) => {
        favouritesCount = favouriteList.length;
    });
</script>

<div class="nav">
    <NavigationLink to="/">Home</NavigationLink>
    <NavigationLink to="/favourites">Favourites</NavigationLink>
    <NavigationLink to="/settings">Settings</NavigationLink>
</div>

<style>
    .nav {
        padding: 1em 0;
    }
</style>
