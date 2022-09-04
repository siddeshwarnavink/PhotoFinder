<script>
    import NavigationLink from "./NavigationLink.svelte";

    import { favourites } from "../../favourite-store";

    let favouritesCount = 0;

    favourites.subscribe((favouriteList) => {
        favouritesCount = favouriteList.length;
    });
</script>

<div class="nav">
    <NavigationLink to="/">Gallery feed</NavigationLink>
    <NavigationLink to="/favourites">Favourites ({favouritesCount})</NavigationLink>
</div>

<style>
    .nav {
        text-align: center;
        padding: 1em 0;
    }
</style>
