<script>
    import { onMount } from "svelte";

    import Spinner from "../components/Shared/Spinner.svelte";
    import FeedGrid from "../components/Feed/FeedGrid.svelte";
    import FeedGridItem from "../components/Feed/FeedGridItem.svelte";
    import FeedLightbox from "../components/Feed/FeedLightbox.svelte";

    let isLoading = false;
    let photoFeed = [];
    let selectedFeed = {};

    onMount(() => {
        isLoading = true;

        fetch("https://api.pexels.com/v1/search?query=landscape", {
            headers: {
                Authorization:
                    "563492ad6f91700001000001d887955a8b9a4f91950ade4a232e87d8",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                isLoading = false;
                photoFeed = json.photos;
            });
    });

    function viewFeedHandler(feedData) {
        selectedFeed = feedData;
    }

    function closeSelectedFeedHandler() {
        selectedFeed = {}   
    }
</script>

<header>
    <h1 class="page-caption">Gallery feed</h1>
    <p class="page-subcaption">Our collections of quality photos!</p>
</header>

<FeedLightbox
    show={Object.keys(selectedFeed).length > 0}
    selectedFeed={selectedFeed}
    on:close={closeSelectedFeedHandler}
/>

<div class="wrapper">
    {#if isLoading}
        <Spinner />
    {:else}
        <FeedGrid>
            {#each photoFeed as photo}
                <FeedGridItem
                    src={photo.src.medium}
                    alt={photo.alt}
                    on:click={() => viewFeedHandler(photo)}
                />
            {/each}
        </FeedGrid>
    {/if}
</div>

<style>
    header {
        padding: 24px 0;
    }

    .page-caption,
    .page-subcaption {
        text-align: center;
    }

    .page-caption {
        font-size: 2em;
    }

    .page-subcaption {
        margin: 0;
        padding: 0;
    }
</style>
