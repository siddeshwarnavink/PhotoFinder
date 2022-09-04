<script>
    import FeedLightbox from "../components/Feed/FeedLightbox.svelte";
    import FavouritesGrid from "../components/Favourites/FavouritesGrid.svelte";
    import FavouritesItem from "../components/Favourites/FavouritesItem.svelte";
    import Popup from "../components/Shared/Popup.svelte";
    import PageJumbotron from "../components/Shared/PageJumbotron.svelte";
    import { favourites, removeFavourite } from "../favourite-store";
    import { pushNotification } from "../notification-store";
    import { settings } from "../settings-store";

    let favouriteList = [];
    let currentRemoveFeed = null;
    let selectedFeed = {};
    let shouldShowPopupWhenRemoveFavourite = true;

    favourites.subscribe((favList) => {
        favouriteList = [...favList];
    });

    settings.subscribe((settingsList) => {
        const showPopupSetting = settingsList.find(
            (setting) => setting.id === "show-popup-unfavourite"
        );

        if (showPopupSetting) {
            shouldShowPopupWhenRemoveFavourite = showPopupSetting.value;
        }
    });

    function showRemoveFromFavouritePopupHandler(feedId) {
        currentRemoveFeed = feedId;

        if (!shouldShowPopupWhenRemoveFavourite) {
            removeFeedFromFavouriteHandler();
        }
    }

    function viewFeedHandler(feedData) {
        selectedFeed = feedData;
    }

    function closeSelectedFeedHandler() {
        selectedFeed = {};
    }

    function removeFeedFromFavouriteHandler() {
        pushNotification("Photo removed from favorites.");

        removeFavourite(currentRemoveFeed);
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
