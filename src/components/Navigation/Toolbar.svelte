<script>
    import Searchbox from "../Feed/Searchbox.svelte";
    import Navigation from "./Navigation.svelte";

    let searchQuery = "";

    function onSearchQueryChangeHandler(event) {
        searchQuery = event.detail.value;
    }

    function onSearchSubmitHandler() {
        // ...
    }
</script>

<div class="toolbar">
    <img src="/images/Gallery-Icon.svg" alt="Gallery-Logo" class="logo" />

    <div class="navigation">
        <Navigation />
    </div>

    <div style="flex:1;" />

    <form class="search-box" on:submit|preventDefault={onSearchSubmitHandler}>
        <Searchbox query={searchQuery} on:change={onSearchQueryChangeHandler} />
    </form>
</div>

<style>
    .toolbar {
        background-color: white;
        display: flex;
    }

    .toolbar .logo {
        padding: 10px;
        margin: 0 12px;
    }

    .toolbar .navigation {
        margin: 0 2em;
    }

    .toolbar .search-box {
        margin: 0 2em;
    }

    @media (max-width: 600px) {
        .toolbar .navigation,
        .toolbar .search-box {
            display: none;
        }
    }
</style>
