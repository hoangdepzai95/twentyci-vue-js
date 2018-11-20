<template>
    <div class="form-item" :class="{ 'has-error': hasError }">
        <input v-model="value" :type="type" v-input :name="name" @input="onChange" v-if="type !== 'text-area'" :placeholder="placeHolder"/>
        <textarea v-model="value" v-input :name="name" @input="onChange" v-if="type === 'text-area'" :placeholder="placeHolder"/>
        <p class="text-danger">{{ errText }}</p>
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'Input',
    props: ['validators', 'name', 'type', 'errText', 'placeHolder', 'defaultValue'],
    data: () => {
        return {
            hasError: false,
            value: ''
        }
    },

    beforeMount() {
        this.$parent.registerInput(this);
        this.value = this.defaultValue;
        this.$parent.onChange(this.name, this.value);
    },

    methods: {
        onChange($event) {
            const value = $event.target.value;

            this.value = value;
            this.$parent.onChange(this.name, value);
            this.validate();
        },

        validate() {
            if (this.validators && this.validators.length) {
                this.hasError = !this.validators.every((validator) => validator(this.value));
                return !this.hasError;
            }

            return false;
        }
    }
}

</script>

<style scoped lang="scss">
    .form-item {
        margin-bottom: 5px;
        .text-danger {
            margin: 0;
            line-height: 1.5;
            visibility: hidden;
        }

        &.has-error {
            .text-danger {
                visibility: visible;
            }
            .app-input {
                border-color: $danger-color;
            }
        }

    }

    textarea {
        min-height: 250px;
    }

</style>
