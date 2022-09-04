<script>
    import { createEventDispatcher } from "svelte";

    export let src;
    export let alt;

    const dispatch = createEventDispatcher();

    function onFeedClickHandler() {
        dispatch("click");
    }
</script>

<div class="container" on:click={onFeedClickHandler}>
    <div class="feed-photo" style="background-image: url('{src}');" />
    <div class="caption">
        <div class="text">{alt}</div>
    </div>
</div>

<style>
    .container {
        position: relative;
    }

    .container:hover .feed-photo {
        opacity: 0.3;
    }

    .container:hover .caption {
        opacity: 1;
    }

    .feed-photo,
    .caption {
        transition: opacity 500ms ease;
    }

    .feed-photo {
        width: 300px;
        height: 300px;
        cursor: pointer;
        background-position: center center;
        background-repeat: no-repeat;
    }

    .caption {
        cursor: pointer;
        transition: 0.5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }

    @media (max-width: 600px) {
        .container {
            margin-bottom: 12px;
        }

        .feed-photo {
            width: 100%;
        }
    }
</style>
