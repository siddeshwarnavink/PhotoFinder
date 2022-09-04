<script>
    import { Link } from "svelte-routing";

    import { settings } from "../../settings-store";

    export let to = "";

    let isDarkMode = false;

    settings.subscribe((settingsList) => {
        const darkModeSetting = settingsList.find(
            (setting) => setting.id === "dark-mode"
        );

        isDarkMode = darkModeSetting.value;
    });

    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive =
            href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        // The object returned here is spread on the anchor element's attributes
        if (isActive) {
            return { class: "nav-link active" };
        }
        return { class: "nav-link" };
    }
</script>

<Link {to} {getProps}>
    <span class="nav-link" class:darkMode={isDarkMode}>
        <slot />
    </span>
</Link>

<style>
    :global(a) {
        text-decoration: none;
        padding: 12px 16px;
        outline: none;
    }

    :global(a.active) .nav-link {
        color: #ec2e67;
        font-weight: bold;
    }

    .nav-link {
        color: #000;
    }

    .nav-link.darkMode {
        color: #fff;
    }
</style>
