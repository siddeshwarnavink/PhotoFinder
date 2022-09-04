<script>
    import FeedLightbox from "../components/Feed/FeedLightbox.svelte";
    import FavouritesGrid from "../components/Favourites/FavouritesGrid.svelte";
    import FavouritesItem from "../components/Favourites/FavouritesItem.svelte";
    import Popup from "../components/Shared/Popup.svelte";
    import PageJumbotron from "../components/Shared/PageJumbotron.svelte";
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

<PageJumbotron
    caption="Favourites"
    subcaption={favouriteList.length === 0 ? "No favourite added." : ""}
/>

<FavouritesGrid>
    {#each favouriteList as feedData}
        <FavouritesItem
            {feedData}
            on:remove={() => showRemoveFromFavouritePopupHandler(feedData.id)}
            on:viewFeed={() => viewFeedHandler(feedData)}
        />
    {/each}
</FavouritesGrid>
