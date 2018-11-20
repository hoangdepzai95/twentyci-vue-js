<template>
    <div class="login-form-wrapper">
        <div class="login-form">
            <app-form ref="form" @submit="submit">
                <form-input type="text" name="userName" err-text="Please enter user name" :validators="validators.userName" place-holder="user name">
                </form-input>
                <form-input type="password" place-holder="password" name="password" err-text="Please enter password" :validators="validators.password">
                </form-input>
                <button v-button="'primary'" class="login-btn">Login</button>
                <p class="text-danger" :class="{ hide: !wrongInfo }">Invalid user name or password</p>
            </app-form>
        </div>
    </div>
</template>

<script>
import api from '../mocks/mock-api';
import { Validators } from '../util';

export default {
    name: 'Login',
    data: () => {
        return {
            validators:{
                userName: [Validators.required],
                password: [Validators.required]
            },

            wrongInfo: false
        }
    },

    methods: {
        submit() {
            const form = this.$refs.form;

            if (form.validate()) {
                const formData = form.getFormData();
                this.login(formData.userName, formData.password);
            }

        },

        login(userName, password) {
            this.wrongInfo = false;

            api.login(userName, password)
                .then((res) => {
                    localStorage.setItem('token', res.token);
                    this.$root.loggedIn = true;

                    this.$router.push(this.$router.currentRoute.query['redirect'] || '/post-list');
                })
                .catch(() => {
                    this.wrongInfo = true;
                });
        }
    }
}
</script>

<style scoped lang="scss">
    .login-form-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-form {
        width: 350px;
        .login-btn {
            width: 100%;
        }

        .wrong-info {
            visibility: visible;
        }
        background-color: #fff;
        box-shadow: rgba(235,232,232,.498039) 0 1px 4px 0;
        padding: 100px 16px;
    }

    .text-danger {
        margin-top: 5px;
    }

    .hide {
        visibility: hidden;
    }

    @media only screen and (max-width: 360px) {
        .login-form {
            width: 300px;
        }
    }

</style>
