<div class="wrapper">
    <div class="favourites-grid">
        <slot />
    </div>
</div>

<style>
    .wrapper {
        margin: 0 20em;
        margin-top: 24px;
    }

    .favourites-grid {
        display: grid;
        /* grid-auto-flow: column; */
        /* grid-auto-columns: minmax(0, 2fr); */
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: 24px;
        row-gap: 24px;
    }

    @media (max-width: 600px) {
        .wrapper {
            margin: 0 12px;
        }

        .wrapper .favourites-grid {
            display: block;
        }
    }
</style>
