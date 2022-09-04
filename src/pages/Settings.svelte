<script>
    import SettingItem from "../components/Settings/SettingItem.svelte";
    import SettingsWrapper from "../components/Settings/SettingsWrapper.svelte";
    import PageJumbotron from "../components/Shared/PageJumbotron.svelte";
    import defaultSettings from "../defaultSettings";
</script>

<PageJumbotron caption="Settings" />

<SettingsWrapper>
    {#each defaultSettings as settingItem}
        <SettingItem
            label={settingItem.label}
            settingCode={settingItem.id}
            defaultValue={settingItem.defaultValue}
        />
    {/each}
</SettingsWrapper>
