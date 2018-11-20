export const Validators = {
    minLength(minLength) {
        return (value) => {
            return (value || '').length >= minLength;
        };
    },

    maxLength(maxLength) {
        return (value) => {
            return (value || '').length <= maxLength;
        };
    },

    required(value) {
        return !!value;
    }

};
