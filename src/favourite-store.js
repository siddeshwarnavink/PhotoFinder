import { writable } from "svelte/store";

export const favourites = writable([]);

export const addFavourite = feedItem => {
    favourites.update((favouriteList) => {
        const updatedFavouriteList = [...favouriteList];

        if (
            !updatedFavouriteList.find(
                (feed) => feed.id === feedItem.id
            )
        ) {
            updatedFavouriteList.push(feedItem);
        }

        return updatedFavouriteList;
    });
};

export const removeFavourite = feedId => {
    favourites.update((favList) => {
        const updatedFavList = favList.filter(
            (feedItem) => feedItem.id !== feedId
        );
        return updatedFavList;
    });
}