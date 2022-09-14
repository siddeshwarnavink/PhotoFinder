import { writable } from "svelte/store";

export const searchQuery = writable({
    query: "",
    submitted: false,
    showSearch: false
});