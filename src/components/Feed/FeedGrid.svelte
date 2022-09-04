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

    @media (max-width: 600px) {
        .wrapper {
            margin: 0 12px;
        }

        .wrapper .feed-grid {
            display: block;
        }
    }
</style>
