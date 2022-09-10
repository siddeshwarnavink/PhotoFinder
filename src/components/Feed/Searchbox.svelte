<script>
    import { createEventDispatcher } from "svelte";

    import { settings } from "../../settings-store";

    let isDarkMode = false;

    export let query;
    export let mobile = false;

    const dispatch = createEventDispatcher();

    settings.subscribe((settingsList) => {
        const darkModeSetting = settingsList.find(
            (setting) => setting.id === "dark-mode"
        );

        isDarkMode = darkModeSetting.value;
    });

    function onInputChangeHandler(event) {
        dispatch("change", { value: event.target.value });
    }

    function onCloseSearchHanlder() {
        dispatch("close");
    }
</script>

<div class="search-box" class:darkMode={isDarkMode} class:mobile>
    <div class="search-box__input">
        <span class="material-icons">search</span>
        <input
            placeholder="Search for pictures"
            value={query}
            on:keyup={onInputChangeHandler}
        />
        {#if mobile}
            <span on:click={onCloseSearchHanlder} class="material-icons">close</span>
        {/if}
    </div>
</div>

<style>
    .search-box {
        display: flex;
        width: 300px;
        padding: 12px 0;
    }

    .search-box.mobile {
        width: 100% !important;
        padding: 0;
    }

    .search-box .search-box__input {
        background-color: #ccc;
        color: #000;
        padding: 6px 12px;
        display: flex;
        border-radius: 10px;
        width: 100%;
    }

    .search-box.mobile .search-box__input {
        border-radius: 0px !important;
        padding: 16px 12px;
    }

    .search-box.darkMode .search-box__input {
        background-color: #000 !important;
        color: #fff !important;
    }

    .search-box__input input,
    .search-box__input .material-icons {
        display: block;
        justify-content: center;
        align-items: center;
        background-color: transparent;
    }

    .search-box__input input {
        border: 0;
        outline: none;
        font-size: 1.2em;
        width: 100%;
        color: inherit;
    }

    .search-box__input .material-icons {
        padding-right: 5px;
    }
</style>
