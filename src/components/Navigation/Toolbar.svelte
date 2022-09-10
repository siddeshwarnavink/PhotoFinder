<script>
    import { onMount } from "svelte";

    import Searchbox from "../Feed/Searchbox.svelte";
    import Navigation from "./Navigation.svelte";
    import { searchQuery } from "../../searchQuery-store";

    let searchQueryText = "";

    export let showSearch;

    onMount(() => {
        searchQuery.subscribe(({ query }) => {
            searchQueryText = query;
        });
    });

    function onSearchQueryChangeHandler(event) {
        searchQuery.update((prevSearchQuery) => {
            return {
                ...prevSearchQuery,
                query: event.detail.value,
            };
        });
    }

    function onSearchSubmitHandler() {
        searchQuery.update((prevSearchQuery) => {
            return {
                ...prevSearchQuery,
                submitted: true,
            };
        });
    }
</script>

<div class="toolbar">
    <img src="/images/Gallery-Icon.svg" alt="Gallery-Logo" class="logo" />

    <div class="navigation">
        <Navigation />
    </div>

    {#if showSearch}
        <div style="flex:1;" />

        <form
            class="search-box"
            on:submit|preventDefault={onSearchSubmitHandler}
        >
            <Searchbox
                query={searchQueryText}
                on:change={onSearchQueryChangeHandler}
            />
        </form>
    {/if}
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
