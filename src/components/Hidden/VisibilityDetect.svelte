<script>
    import { onMount, onDestroy, createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let lastVisibleAt = new Date(Date.now());

    function checkVisible(el) {
        const rect = el.getBoundingClientRect();
        const viewHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight
        );

        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

    function onScrollHandler() {
        if (checkVisible(document.getElementById("visibilityBox"))) {
            if (lastVisibleAt.getTime() < new Date().getTime() + 2000) {
                dispatch("visible");
                lastVisibleAt = new Date(Date.now());
            }
        }
    }

    onMount(() => {
        setTimeout(() => {
            document.addEventListener("scroll", onScrollHandler);
        }, 200);
    });

    onDestroy(() => {
        document.removeEventListener("scroll", onScrollHandler);
    });
</script>

<div id="visibilityBox" />
