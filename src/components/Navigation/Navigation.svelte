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
    <NavigationLink to="/favourites"
        >Favourites {#if favouritesCount > 0}({favouritesCount}){/if}</NavigationLink
    >

    <div class="side-nav">
        <NavigationLink to="/settings">
            <span class="material-icons">settings</span>
        </NavigationLink>
    </div>
</div>

<style>
    .nav {
        text-align: center;
        padding: 1em 0;
        margin-left: 50px;
    }

    .nav .side-nav {
        float: right;
    }

    @media (max-width: 600px) {
        .nav {
            display: none;
        }
    }
</style>
