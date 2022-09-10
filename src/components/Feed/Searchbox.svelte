<script>
    import { createEventDispatcher } from "svelte";

    import { settings } from "../../settings-store";

    let isDarkMode = false;

    export let query;

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
</script>

<div class="search-box" class:darkMode={isDarkMode}>
    <div class="search-box__input">
        <span class="material-icons">search</span>
        <input
            placeholder="Search for pictures"
            value={query}
            on:keyup={onInputChangeHandler}
        />
    </div>
</div>

<style>
    .search-box {
        display: flex;
        max-width: 400px;
        margin: auto;
        padding: 12px 0;
    }

    .search-box .search-box__input {
        background-color: #ccc;
        color: #000;
        padding: 6px 12px;
        display: flex;
        border-radius: 10px;
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
