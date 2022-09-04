<script>
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";

    import Backdrop from "../Shared/Backdrop.svelte";

    export let show = false;

    const dispatch = createEventDispatcher();

    function togglePopupHandler() {
        dispatch("toggle");
    }
</script>

{#if show}
    <Backdrop on:click={togglePopupHandler} />

    <div
        class="popup"
        in:fly={{ y: -200, duration: 500 }}
        out:fly={{ y: -200, duration: 600 }}
    >
        <slot />
        <button on:click={togglePopupHandler}>Yes</button>
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

    .popup button {
        padding: 8px 25px;
        font-weight: bold;
        font-size: 1rem;
        background-color: #ec2e67;
        color: #fff;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        outline: none;
    }

    .popup button:hover {
        background-color: #df265d;
    }
</style>
