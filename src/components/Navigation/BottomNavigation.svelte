<script>
    import BottomNavigationLink from "./BottomNavigationLink.svelte";
    import { settings } from "../../settings-store";

    let isDarkMode = false;

    settings.subscribe((settingsList) => {
        const darkModeSetting = settingsList.find(
            (setting) => setting.id === "dark-mode"
        );

        isDarkMode = darkModeSetting.value;
    });
</script>

<div class="bottom-navigation" class:darkMode={isDarkMode}>
    <BottomNavigationLink to="/" icon="collections" label="Gallery" />
    <BottomNavigationLink to="/favourites" icon="star" label="Favourites" />
    <BottomNavigationLink to="/settings" icon="settings" label="Settings" />
</div>

<style>
    .bottom-navigation {
        display: none;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: white;
        justify-content: space-around;
    }

    .bottom-navigation.darkMode {
        background-color: #1a1a1a;
    }

    @media (max-width: 905px) {
        .bottom-navigation {
            display: flex;
        }
    }
</style>
