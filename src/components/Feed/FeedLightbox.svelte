<script>
    import { createEventDispatcher } from "svelte";
    import { useLazyImage as lazyImage } from "svelte-lazy-image";

    import { favourites } from "../../favourite-store";

    import Backdrop from "../Shared/Backdrop.svelte";
    import Button from "../Shared/Button.svelte";

    export let show = false;
    export let hideFavouriteButton = false;
    export let selectedFeed;

    const dispatch = createEventDispatcher();

    function closeLightboxHandler() {
        dispatch("close");
    }

    function addToFavouriteHandler() {
        favourites.update((favouriteList) => {
            const updatedFavouriteList = [...favouriteList];

            if (
                !updatedFavouriteList.find(
                    (feed) => feed.id === selectedFeed.id
                )
            ) {
                updatedFavouriteList.push(selectedFeed);
            }

            return updatedFavouriteList;
        });
    }
</script>

{#if show}
    <Backdrop on:click={closeLightboxHandler} />
    <img
        src={selectedFeed.src.medium}
        data-src={selectedFeed.src.original}
        alt={selectedFeed.alt}
        use:lazyImage={{ threshold: 0.5 }}
    />

    {#if !hideFavouriteButton}
        <div class="feed-action">
            <Button on:click={addToFavouriteHandler}>Add to favourite</Button>
        </div>
    {/if}
{/if}

<style>
    img,
    .feed-action {
        z-index: 200;
        position: fixed;
    }

    img {
        left: 0;
        right: 0;
        margin: 5% auto;
        width: 50%;
        top: 0%;
    }

    .feed-action {
        bottom: 12%;
        left: 44%;
    }
</style>
