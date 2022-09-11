<script>
    import BottomNavigation from "./Navigation/BottomNavigation.svelte";
    import Toolbar from "./Navigation/Toolbar.svelte";

    export let showSearch = false;
</script>

<Toolbar {showSearch} />

<div class="container">
    <slot />
</div>

<BottomNavigation />

<style>
    .container {
        padding-top: 60px;
    }
</style>