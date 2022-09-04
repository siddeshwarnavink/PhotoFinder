import { writable } from "svelte/store";

export const notifications = writable([]);

export const pushNotification = (message) => {
    let newNotificationIndex;

    notifications.update(notificationList => {
        const updatedNotificationList = [...notificationList];

        newNotificationIndex = updatedNotificationList.length;

        updatedNotificationList.push({ message });
        return updatedNotificationList;
    });

    setTimeout(() => {
        notifications.update(notificationList => {
            const updatedNotificationList = [...notificationList];

            updatedNotificationList.splice(newNotificationIndex, 1);
            return updatedNotificationList;
        });
    }, 2000);
} 