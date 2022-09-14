<script>
    import { onMount } from "svelte";
    import { _ } from "svelte-i18n";

    import SettingItem from "../components/Settings/SettingItem.svelte";
    import SettingsWrapper from "../components/Settings/SettingsWrapper.svelte";
    import PageJumbotron from "../components/Shared/PageJumbotron.svelte";
    import { settings } from "../settings-store";
    import { searchQuery } from "../searchQuery-store";

    let settingsList = [];

    onMount(() => {
        searchQuery.update((prevSearchQuery) => {
            return {
                ...prevSearchQuery,
                showSearch: false,
            };
        });
    });

    settings.subscribe((settings) => {
        settingsList = settings;
    });
</script>

<PageJumbotron caption={$_("settingsPage.caption")} />

<SettingsWrapper>
    {#each settingsList as settingItem}
        <SettingItem
            labelKey={settingItem.labelKey}
            settingCode={settingItem.id}
            value={settingItem.value}
        />
    {/each}
</SettingsWrapper>
