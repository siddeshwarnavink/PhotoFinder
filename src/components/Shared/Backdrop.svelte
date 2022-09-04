<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function onClickHandler() {
        dispatch("click");
    }
</script>

<div class="backdrop" on:click={onClickHandler} />

<style>
    .backdrop {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        top: 0;
        left: 0;
    }
</style>
