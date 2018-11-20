<template>
    <form @submit="onSubmit">
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'Form',
    data: () => {
        return {
            hasError: false,
            formData: {},
            inputs: []
        }
    },
    methods: {
        onChange(name, value) {
            this.formData[name] = value;
        },

        registerInput(input) {
            this.inputs.push(input);
        },

        validate() {
            return this.inputs.every((input) => input.validate());
        },

        getFormData() {
            return {...this.formData};
        },

        onSubmit($event) {
            $event.preventDefault();
            this.$emit('submit');
        }
    }
}
</script>
