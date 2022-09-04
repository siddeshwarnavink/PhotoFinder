<script>
    import ToggleSwitch from "../Shared/ToggleSwitch.svelte";

    export let label;
</script>

<div class="setting-item">
    <span class="setting-label">{label}</span>

    <div style="flex: 1;"></div>

    <ToggleSwitch />
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
</style>