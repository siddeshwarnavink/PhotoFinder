<script>
    import { createEventDispatcher } from "svelte";

    import { settings } from "../../settings-store";

    import Button from "../Shared/Button.svelte";

    export let feedData;

    let isDarkMode = false;

    const dispatch = createEventDispatcher();

    settings.subscribe((settingsList) => {
        const darkModeSetting = settingsList.find(
            (setting) => setting.id === "dark-mode"
        );

        isDarkMode = darkModeSetting.value;
    });

    function onRemoveHandler() {
        dispatch("remove");
    }

    function onViewFeedHandler() {
        dispatch("viewFeed");
    }
</script>

<div class="favourite-item" class:darkMode={isDarkMode}>
    <div
        class="thumbnail"
        style="background-image: url('{feedData.src.small}');"
        alt={feedData.alt}
        on:click={onViewFeedHandler}
    />

    <div class="container">
        <h3>{feedData.alt}</h3>

        <div class="favourite-action">
            <Button on:click={onRemoveHandler}>Remove</Button>
        </div>
    </div>
</div>

<style>
    .favourite-item {
        background-color: #ccc;
        border-radius: 10px;
    }

    .favourite-item.darkMode,
    .favourite-item.darkMode .thumbnail::after {
        background-color: #1a1a1a !important;
        color: #fff;
    }

    .favourite-item .thumbnail {
        width: 100%;
        height: 150px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        cursor: pointer;
    }

    .thumbnail::after {
        content: "";
        border-top-left-radius: 70% 100%;
        border-top-right-radius: 70% 100%;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        background-color: #ccc;
        height: 25%;
    }

    .favourite-item .container {
        padding: 16px 24px;
    }

    .container h3 {
        padding: 0;
        margin: 0;
        font-size: 1rem;
    }

    .container .favourite-action {
        align-items: center;
        padding: 10px 0;
    }

    @media (max-width: 600px) {
        .favourite-item {
            margin-bottom: 12px;
        }
    }
</style>
