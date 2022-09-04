<button>
    <slot />
</button>

<style>
    button {
        width: 100%;
        padding: 8px 25px;
        font-weight: bold;
        font-size: 1.2rem;
        background-color: #ec2e67;
        color: #fff;
        border: none;
        border-radius: 12px;
        box-shadow: 0 4px #999;
        cursor: pointer;
        outline: none;
    }

    button:hover {
        background-color: #df265d;
    }

    button:active {
        background-color: #df265d;
        box-shadow: 0 1px #666;
        transform: translateY(4px);
    }
</style>
