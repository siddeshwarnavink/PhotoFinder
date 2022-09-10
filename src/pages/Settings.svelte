<script>
    import Layout from "../components/Layout.svelte";
    import SettingItem from "../components/Settings/SettingItem.svelte";
    import SettingsWrapper from "../components/Settings/SettingsWrapper.svelte";
    import PageJumbotron from "../components/Shared/PageJumbotron.svelte";
    import { settings } from "../settings-store";

    let settingsList = [];

    settings.subscribe((settings) => {
        settingsList = settings;
    });
</script>

<Layout>
    <PageJumbotron caption="Settings" />

    <SettingsWrapper>
        {#each settingsList as settingItem}
            <SettingItem
                label={settingItem.label}
                settingCode={settingItem.id}
                value={settingItem.value}
            />
        {/each}
    </SettingsWrapper>
</Layout>
