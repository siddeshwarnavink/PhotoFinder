import { writable } from "svelte/store";

export const favourites = writable([]);

export const fetchPastFavourites = () => {
    if (localStorage.favourites) {
        favourites.update(() => {
            return JSON.parse(localStorage.favourites);
        });
    } else {
        localStorage.favourites = JSON.stringify([]);
    }
}

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

        localStorage.favourites = JSON.stringify(updatedFavouriteList);

        return updatedFavouriteList;
    });
};

export const removeFavourite = feedId => {
    favourites.update((favList) => {
        const updatedFavList = favList.filter(
            (feedItem) => feedItem.id !== feedId
        );

        localStorage.favourites = JSON.stringify(updatedFavList);

        return updatedFavList;
    });
}