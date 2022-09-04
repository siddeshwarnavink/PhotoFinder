<script>
    import { Link } from "svelte-routing";

    export let to = "";
    export let label;
    export let icon;

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
    <div class="nav-link">
        <span class="material-icons">{icon}</span>
        <span class="nav-label">{label}</span>
    </div>
</Link>

<style>
    :global(a) {
        text-decoration: none;
        color: #000;
        padding: 12px 16px;
        outline: none;
    }

    :global(a.active) {
        color: #ec2e67;
        font-weight: bold;
    }

    .nav-link {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .material-icons,
    .nav-label {
        display: block;
    }

    .nav-label  {
        font-size: .8em;
    }
</style>
