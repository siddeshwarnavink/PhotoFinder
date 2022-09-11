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

    @media not (min-width: 1500px) {
        .wrapper {
            margin: 0;
            margin-top: 24px;
        }
    }

    @media (max-width: 600px) {
        .wrapper {
            margin: 0 12px;
        }

        .wrapper .favourites-grid {
            display: block;
        }
    }

    @media (min-width: 650px) and (max-width: 945px) {
        .wrapper {
            margin: 0 3em;
            margin-top: 24px;
        }

        .wrapper .favourites-grid {
            grid-template-columns: auto auto;
        }
    }

    @media (min-width: 945px) and (max-width: 1230px) {
        .wrapper .favourites-grid {
            grid-template-columns: auto auto auto;
        }

        .wrapper {
            margin: 0 5em;
            margin-top: 24px;
        }
    }

    @media (min-width: 1200px) and (max-width: 1400px) {
        .wrapper {
            margin: 0 2em;
            margin-top: 24px;
        }
    }

    @media (min-width: 1400px) and (max-width: 1800px) {
        .wrapper {
            margin: 0 10em;
            margin-top: 24px;
        }
    }
</style>
