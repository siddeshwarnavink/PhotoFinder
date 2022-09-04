<script>
    import { Link } from "svelte-routing";

    export let to = "";

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
    <slot />
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
</style>
