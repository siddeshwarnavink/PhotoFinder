<script>
    import Toolbar from "./Navigation/Toolbar.svelte";

    export let showSearch = false;
</script>

<Toolbar {showSearch} />

<div class="container">
    <slot />
</div>
