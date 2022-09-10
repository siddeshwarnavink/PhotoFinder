<script>
    import { onMount } from "svelte";

    import Searchbox from "../Feed/Searchbox.svelte";
    import Navigation from "./Navigation.svelte";
    import { searchQuery } from "../../searchQuery-store";
    import { settings } from "../../settings-store";

    let isDarkMode = false;
    let searchMode = false;
    let searchQueryText = "";

    export let showSearch;

    onMount(() => {
        searchQuery.subscribe(({ query }) => {
            if (query.trim() !== "" && showSearch) {
                searchMode = true;
            }
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
        searchMode = !searchMode;

        searchQuery.update((prevSearchQuery) => {
            return {
                ...prevSearchQuery,
                submitted: true,
            };
        });
    }

    function toggleSearchModeHandler() {
        searchMode = !searchMode;
        searchQuery.update((prevSearchQuery) => {
            return {
                ...prevSearchQuery,
                query: "",
            };
        });
    }
</script>

{#if !searchMode}
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
                    on:close={toggleSearchModeHandler}
                />
            </form>

            <div class="search-icon">
                <button on:click={toggleSearchModeHandler}>
                    <span class="material-icons">search</span>
                </button>
            </div>
        {/if}
    </div>
{:else}
    <form
        on:submit|preventDefault={onSearchSubmitHandler}
        class="mobileSearch-toolbar"
    >
        <Searchbox
            mobile={true}
            query={searchQueryText}
            on:change={onSearchQueryChangeHandler}
            on:close={toggleSearchModeHandler}
        />
    </form>
{/if}

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

    .toolbar .search-icon button {
        border: 0;
        background-color: transparent;
        outline: none;
        font-size: 1.2em;
        padding: 16px 21px;
        margin-top: 5px;
        display: none;
    }

    .toolbar.darkMode .search-icon .material-icons {
        color: #fff !important;
    }

    @media (max-width: 600px) {
        .toolbar .navigation,
        .toolbar .search-box {
            display: none;
        }

        .toolbar .search-icon button {
            display: block;
        }
    }
</style>
