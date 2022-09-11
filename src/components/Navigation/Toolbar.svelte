<script>
    import { onMount } from "svelte";

    import Searchbox from "../Feed/Searchbox.svelte";
    import Navigation from "./Navigation.svelte";
    import { searchQuery } from "../../searchQuery-store";
    import { settings } from "../../settings-store";

    let isDarkMode = false;
    let searchMode = false;
    let pinned = true;
    let searchQueryText = "";

    export let showSearch;

    onMount(() => {
        searchQuery.subscribe(({ query }) => {
            // if (query.trim() !== "" && showSearch) {
            //     searchMode = true;
            // }
            searchQueryText = query;
        });

        toolbarPinnedStateListener();
    });

    settings.subscribe((settingsList) => {
        const darkModeSetting = settingsList.find(
            (setting) => setting.id === "dark-mode"
        );

        isDarkMode = darkModeSetting.value;
    });

    function toolbarPinnedStateListener() {
        const toolbarHeight = 60;
        let pxTrigger = 0;

        document.addEventListener("scroll", () => {
            const pxFromTop = window.scrollY || window.pageYOffset;

            if (pxFromTop > toolbarHeight) {
                pinned = pxTrigger > pxFromTop;
                pxTrigger = pxFromTop
            } else {
                pinned = true;
            }
        });
    }

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

<div class="toolbar" class:darkMode={isDarkMode} class:searchMode class:pinned>
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

{#if searchMode}
    <form
        on:submit|preventDefault={onSearchSubmitHandler}
        class="mobileSearch-toolbar"
        class:pinned
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

    .toolbar,
    .mobileSearch-toolbar {
        position: fixed;
        width: 100%;
        z-index: 100;
        height: 60px;
        top: -60px;
        transition: all 200ms ease;
    }

    .toolbar.pinned,
    .mobileSearch-toolbar.pinned {
        top: 0;
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

    .mobileSearch-toolbar {
        display: none;
    }

    @media (max-width: 600px) {
        .toolbar .navigation,
        .toolbar .search-box,
        .toolbar.searchMode {
            display: none;
        }

        .mobileSearch-toolbar,
        .toolbar .search-icon button {
            display: block;
        }
    }
</style>
