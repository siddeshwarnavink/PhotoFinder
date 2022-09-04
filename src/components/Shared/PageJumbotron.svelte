<script>
    export let caption = "";
    export let subcaption = "";
</script>

<header>
    <h1 class="page-caption">{caption}</h1>
    <p class="page-subcaption">{subcaption}</p>
</header>

<style>
    header {
        padding: 24px 0;
    }

    .page-caption,
    .page-subcaption {
        text-align: center;
    }

    .page-caption {
        font-size: 2em;
    }

    .page-subcaption {
        margin: 0;
        padding: 0;
    }
</style>
