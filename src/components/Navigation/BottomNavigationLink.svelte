<script>
    import { Link } from "svelte-routing";

    import { settings } from "../../settings-store";

    export let to = "";
    export let label;
    export let icon;

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
    <div class="nav-link" class:darkMode={isDarkMode}>
        <span class="material-icons">{icon}</span>
        <span class="nav-label">{label}</span>
    </div>
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
        display: flex;
        flex-direction: column;
        text-align: center;
        color: #000;
    }

    .nav-link.darkMode {
        color: #fff;
    }

    .material-icons,
    .nav-label {
        display: block;
    }

    .nav-label {
        font-size: 0.8em;
    }
</style>
