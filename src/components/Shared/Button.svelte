<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function onClickHandler(event) {
        dispatch("click");
    }
</script>

<button on:click={onClickHandler}>
    <slot />
</button>

<style>
    button {
        padding: 8px 25px;
        font-weight: bold;
        font-size: 1.2rem;
        background-color: var(--primaryColor);
        color: #fff;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        outline: none;
    }

    button:hover {
        background-color: var(--primaryColorDark);
    }
</style>
