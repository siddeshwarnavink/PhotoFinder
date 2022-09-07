<script>
    import { createEventDispatcher } from "svelte";

    import Button from "../Shared/Button.svelte";

    export let query;

    const dispatch = createEventDispatcher();

    function onInputChangeHandler(event) {
        dispatch("change", { value: event.target.value });
    }
</script>

<div class="search-box">
    <div class="search-box__input">
        <span class="material-icons">search</span>
        <input
            placeholder="e.g nature"
            value={query}
            on:keyup={onInputChangeHandler}
        />
    </div>

    <div class="search-box__searchBtn">
        <Button>Search</Button>
    </div>
</div>

<style>
    .search-box {
        display: flex;
        max-width: 400px;
        margin: auto;
        padding: 12px 0;
    }

    .search-box .search-box__searchBtn {
        margin-left: 12px;
    }

    .search-box .search-box__input {
        background-color: #fff;
        color: #000;
        padding: 6px 12px;
        display: flex;
        border: 1px solid #ccc;
        border-radius: 10px;
    }

    .search-box__input input,
    .search-box__input .material-icons {
        display: block;
        justify-content: center;
        align-items: center;
    }

    .search-box__input input {
        border: 0;
        outline: none;
        font-size: 1.2em;
        width: 100%;
    }

    .search-box__input .material-icons {
        padding-right: 5px;
    }
</style>
