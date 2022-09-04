<script>
    import BottomNavigationLink from "./BottomNavigationLink.svelte";
</script>

<div class="bottom-navigation">
    <BottomNavigationLink to="/" icon="collections" label="Gallery" />
    <BottomNavigationLink to="/favourites" icon="star" label="Favourites" />
    <BottomNavigationLink to="/settings" icon="settings" label="Settings" />
</div>

<style>
    .bottom-navigation {
        display: none;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: white;
        justify-content: space-around;
    }

    @media (max-width: 600px) {
        .bottom-navigation {
            display: flex;
        }
    }
</style>