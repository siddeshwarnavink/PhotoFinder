<script>
    import { onMount } from "svelte";

    import Spinner from "../components/Shared/Spinner.svelte";
    import FeedGrid from "../components/Feed/FeedGrid.svelte";
    import FeedGridItem from "../components/Feed/FeedGridItem.svelte";
    import FeedLightbox from "../components/Feed/FeedLightbox.svelte";
    import PageJumbotron from "../components/Shared/PageJumbotron.svelte";
    import Layout from "../components/Layout.svelte";
    import VisibilityDetect from "../components/Hidden/VisibilityDetect.svelte";
    import { searchQuery } from "../searchQuery-store";

    let initialLoading = false;
    let lazyLoading = false;
    let photoFeed = [];
    let selectedFeed = {};
    let currentPage = 1;
    let maxPages = 2;

    onMount(() => {
        fetchFeedHandler();

        searchQuery.subscribe((searchQuery) => {
            if (searchQuery.submitted) {
                fetchFeedHandler(searchQuery.query);
            }
        });
    });

    function syncPagesState(jsonData) {
        currentPage = jsonData.page;
        maxPages = Math.floor(jsonData.total_results / jsonData.per_page);
    }

    function fetchFeedHandler(query = "") {
        if (currentPage > 1) {
            lazyLoading = true;
        } else {
            initialLoading = true;
        }

        let url = `https://api.pexels.com/v1/search?per_page=12&query=${query}&page=${currentPage}`;

        if (query.trim() === "") {
            url = `https://api.pexels.com/v1/search?per_page=12&query=Nature&page=${currentPage}`;
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
                if (currentPage > 1) {
                    lazyLoading = false;
                } else {
                    initialLoading = false;
                }

                if (currentPage > 1) {
                    photoFeed = photoFeed.concat(json.photos);
                } else {
                    photoFeed = json.photos;
                }
                syncPagesState(json);
            });
    }

    function lazyLoadHandler() {
        if (currentPage + 1 <= maxPages) {
            currentPage += 1;
            fetchFeedHandler();
        }
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
        {#if initialLoading}
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

            {#if lazyLoading}
                <Spinner />
            {/if}
            <VisibilityDetect on:visible={lazyLoadHandler} />
        {/if}
    </div>
</Layout>
