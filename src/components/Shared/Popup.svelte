<script>
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";

    import Backdrop from "../Shared/Backdrop.svelte";
    import { settings } from "../../settings-store";
    import Button from "./Button.svelte";

    export let show = false;

    let isDarkMode = false;

    const dispatch = createEventDispatcher();

    settings.subscribe((settingsList) => {
        const darkModeSetting = settingsList.find(
            (setting) => setting.id === "dark-mode"
        );

        isDarkMode = darkModeSetting.value;
    });

    function togglePopupHandler() {
        dispatch("toggle");
    }

    function confirmPopupHandler() {
        dispatch("confirm");
    }
</script>

{#if show}
    <Backdrop on:click={togglePopupHandler} />

    <div
        class="popup"
        class:darkMode={isDarkMode}
        in:fly={{ y: -200, duration: 500 }}
        out:fly={{ y: -200, duration: 600 }}
    >
        <slot />
        <Button on:click={confirmPopupHandler}>Yes</Button>
    </div>
{/if}

<style>
    .popup {
        z-index: 200;
        background-color: #fff;
        padding: 20px 24px;
        border-radius: 12px;
        width: 350px;
        position: absolute;
        left: 40%;
    }

    .popup.darkMode {
        background-color: #333333 !important;
        color: white;
    }

    @media (max-width: 600px) {
        .popup {
            left: 5%;
            top: 25%;
            width: 90vw;
        }
    }
</style>
