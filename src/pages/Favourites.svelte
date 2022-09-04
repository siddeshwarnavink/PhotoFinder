<script>
    import FeedLightbox from "../components/Feed/FeedLightbox.svelte";
    import FavouritesGrid from "../components/Favourites/FavouritesGrid.svelte";
    import FavouritesItem from "../components/Favourites/FavouritesItem.svelte";
    import Popup from "../components/Shared/Popup.svelte";
    import { favourites } from "../favourite-store";
    import { pushNotification } from "../notification-store";

    let favouriteList = [];
    let currentRemoveFeed = null;
    let selectedFeed = {};

    favourites.subscribe((favList) => {
        favouriteList = [...favList];
    });

    function showRemoveFromFavouritePopupHandler(feedId) {
        currentRemoveFeed = feedId;
    }

    function viewFeedHandler(feedData) {
        selectedFeed = feedData;
    }

    function closeSelectedFeedHandler() {
        selectedFeed = {};
    }

    function removeFeedFromFavouriteHandler() {
        pushNotification("Photo removed from favorites.");

        favourites.update((favList) => {
            const updatedFavList = favList.filter(
                (feedItem) => feedItem.id !== currentRemoveFeed
            );
            return updatedFavList;
        });
        currentRemoveFeed = null;
    }
</script>

<Popup show={currentRemoveFeed} on:toggle={removeFeedFromFavouriteHandler}>
    <p>Are you sure to remove from favourite?</p>
</Popup>

<FeedLightbox
    show={Object.keys(selectedFeed).length > 0}
    hideFavouriteButton={true}
    {selectedFeed}
    on:close={closeSelectedFeedHandler}
/>

<header>
    <h1 class="page-caption">Favourites</h1>
    {#if favouriteList.length === 0}
        <p class="page-subcaption">No favourite added.</p>
    {/if}
</header>

<FavouritesGrid>
    {#each favouriteList as feedData}
        <FavouritesItem
            {feedData}
            on:remove={() => showRemoveFromFavouritePopupHandler(feedData.id)}
            on:viewFeed={() => viewFeedHandler(feedData)}
        />
    {/each}
</FavouritesGrid>

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
