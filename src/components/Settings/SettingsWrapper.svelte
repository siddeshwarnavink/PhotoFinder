<div class="wrapper">
    <slot />
</div>

<style>
    .wrapper {
        margin: 0 20em;
        margin-top: 24px;
    }

    @media (max-width: 600px) {
        .wrapper {
            margin: 0 12px;
        }
    }
</style>
