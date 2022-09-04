<script>
    export let message;
</script>

<div class="notification">
    {message}
</div>

<style>
    .notification {
        padding: 10px 12px;
        color: #000;
        font-weight: bold;
        background-color: #ec2e67;
        margin-bottom: 12px;
        border-radius: 10px;
        z-index: 300;
    }

    @media (max-width: 600px) {
        .notification {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            margin-bottom: 0;
        }
    }
</style>
