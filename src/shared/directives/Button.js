export default {
    bind(el, binding) {
        el.className += ` app-btn btn-${binding.value}`;
    },
};
