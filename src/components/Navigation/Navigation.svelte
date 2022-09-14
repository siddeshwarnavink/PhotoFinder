<script>
    import { _ } from "svelte-i18n";

    import NavigationLink from "./NavigationLink.svelte";
</script>

<div class="nav">
    <NavigationLink to="/">{$_("app.navigation.home")}</NavigationLink>
    <NavigationLink to="/favourites"
        >{$_("app.navigation.favourites")}</NavigationLink
    >
    <NavigationLink to="/settings"
        >{$_("app.navigation.settings")}</NavigationLink
    >
</div>

<style>
    .nav {
        padding: 1em 0;
    }
</style>
