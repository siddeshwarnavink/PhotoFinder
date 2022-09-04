import { writable } from "svelte/store";

import defaultSettings from "./defaultSettings";

export const settings = writable([...defaultSettings]);

export const fetchPastSettings = () => {
    if (localStorage.settings) {
        settings.update(() => {
            return JSON.parse(localStorage.settings);
        });
    } else {
        localStorage.settings = JSON.stringify([...defaultSettings]);
    }
}

export const updateSetting = (id, newValue) => {
    settings.update((settingsList) => {
        const updatedSettingsList = settingsList.map(settingItem => {
            if (settingItem.id === id) {
                return {
                    ...settingItem,
                    value: newValue
                };
            }

            return settingItem;
        });


        localStorage.settings = JSON.stringify(updatedSettingsList);

        return updatedSettingsList;
    });
}