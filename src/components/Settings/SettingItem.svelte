<script>
    import ToggleSwitch from "../Shared/ToggleSwitch.svelte";

    export let label;
    export let value;
</script>

<div class="setting-item">
    <span class="setting-label">{label}</span>

    <div style="flex: 1;" />

    <ToggleSwitch checked={value} />
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
