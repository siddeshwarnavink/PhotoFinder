<script>
    import { onMount } from "svelte";

    import Searchbox from "../Feed/Searchbox.svelte";
    import Navigation from "./Navigation.svelte";
    import { searchQuery } from "../../searchQuery-store";
    import { settings } from "../../settings-store";

    let isDarkMode = false;
    let searchQueryText = "";

    export let showSearch;

    onMount(() => {
        searchQuery.subscribe(({ query }) => {
            searchQueryText = query;
        });
    });

    settings.subscribe((settingsList) => {
        const darkModeSetting = settingsList.find(
            (setting) => setting.id === "dark-mode"
        );

        isDarkMode = darkModeSetting.value;
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

<div class="toolbar" class:darkMode={isDarkMode}>
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

    .toolbar.darkMode {
        background-color: #1a1a1a;
    }

    .toolbar .logo {
        padding: 15px;
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
