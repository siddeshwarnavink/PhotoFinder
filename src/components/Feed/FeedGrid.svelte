<div class="wrapper">
    <div class="feed-grid">
        <slot />
    </div>
</div>

<style>
    .wrapper {
        margin: 0 20em;
        margin-top: 24px;
    }

    .wrapper .feed-grid {
        display: grid;
        grid-template-columns: auto auto auto auto;
        row-gap: 12px;
        background-position: center center;
        background-repeat: no-repeat;
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

        .wrapper .feed-grid {
            display: block;
        }
    }

    @media (min-width: 650px) and (max-width: 945px) {
        .wrapper {
            margin: 0 3em;
            margin-top: 24px;
        }

        .wrapper .feed-grid {
            grid-template-columns: auto auto;
        }
    }

    @media (min-width: 945px) and (max-width: 1230px) {
        .wrapper .feed-grid {
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
