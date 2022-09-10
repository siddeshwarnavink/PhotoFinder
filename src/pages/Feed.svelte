<script>
    import { onMount } from "svelte";

    import Spinner from "../components/Shared/Spinner.svelte";
    import FeedGrid from "../components/Feed/FeedGrid.svelte";
    import FeedGridItem from "../components/Feed/FeedGridItem.svelte";
    import FeedLightbox from "../components/Feed/FeedLightbox.svelte";
    import PageJumbotron from "../components/Shared/PageJumbotron.svelte";
    import Layout from "../components/Layout.svelte";
    import { searchQuery } from "../searchQuery-store";

    let isLoading = false;
    let photoFeed = [];
    let selectedFeed = {};

    onMount(() => {
        fetchFeedHandler();

        searchQuery.subscribe((searchQuery) => {
            if (searchQuery.submitted) {
                fetchFeedHandler(searchQuery.query);
            }
        });
    });

    function fetchFeedHandler(query = "") {
        isLoading = true;

        let url = "https://api.pexels.com/v1/search?query=" + query;

        if (query.trim() === "") {
            url = "https://api.pexels.com/v1/search?query=Nature";
        } else {
            searchQuery.update((prevSearchQuery) => {
                return {
                    ...prevSearchQuery,
                    submitted: false,
                };
            });
        }

        fetch(url, {
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
    }

    function viewFeedHandler(feedData) {
        selectedFeed = feedData;
    }

    function closeSelectedFeedHandler() {
        selectedFeed = {};
    }
</script>

<Layout showSearch={true}>
    <PageJumbotron
        caption="Gallery feed"
        subcaption="Our collections of quality photos!"
    />

    <FeedLightbox
        show={Object.keys(selectedFeed).length > 0}
        {selectedFeed}
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
</Layout>
