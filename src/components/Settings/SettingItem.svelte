<script>
    import { _ } from "svelte-i18n";

    import ToggleSwitch from "../Shared/ToggleSwitch.svelte";
    import { updateSetting } from "../../settings-store";

    export let settingCode;
    export let labelKey;
    export let value;

    function settingOnChangeHandler(event) {
        updateSetting(settingCode, event.detail.checked);
    }
</script>

<div class="setting-item">
    <span class="setting-label"
        >{$_(`settingsPage.settingOptionsLabel.${labelKey}`)}</span
    >

    <div style="flex: 1;" />

    <ToggleSwitch checked={value} on:change={settingOnChangeHandler} />
</div>

<style>
    .setting-item {
        width: 100%;
        display: flex;
        padding: 14px 0;
    }

    .setting-item .setting-label {
        display: block;
        font-weight: bold;
        font-size: 1.2rem;
    }

    @media (max-width: 600px) {
        .setting-item .setting-label {
            font-size: 1rem;
            max-width: 70vw;
        }
    }
</style>
