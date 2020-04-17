<template>
    <Page>
        <StackLayout>
            <FlexBoxLayout flexDirection="column" justifyContent="center" class="form">
                <StackLayout class="container">
                    <FlexBoxLayout alignItems="center" class="border-bottom">
                        <TextField v-model="username" hint="Email" class="form-input"/>
                    </FlexBoxLayout>
                    <FlexBoxLayout alignItems="center">
                        <TextField v-model="password" hint="Password" secure="true" class="form-input"/>
                    </FlexBoxLayout>

                    <Button text="Login" class="btn-login" @tap="login"/>

                    <FlexBoxLayout alignItems="center" justifyContent="space-between">
                        <Label horizontalAlignment="left" text="Forgotten password?" @tap="ForgotPassword"/>
                        <Label horizontalAlignment="right" text="Register now" class="register-link" @tap="register"/>
                    </FlexBoxLayout>
                </StackLayout>
            </FlexBoxLayout>
        </StackLayout>
    </Page>
</template>

<script >
import App from './Home.vue'
import Register from './Register.vue'
import ForgotPassword from './ForgotPassword.vue'

export default {
    data() {
        return {
                username: '',
                password: ''
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {username: this.username, password: this.password})
            .then(() => {
                if(this.$store.getters['accessToken'] !== ''){
                    this.$navigateTo(App, {clearHistory: true})
                } else {
                    alert({
                        title: "Oops!",
                        message: "Login failed, please try again.",
                        okButtonText: "Try again"
                    })
                }; 
            })
        },
        register(){
            this.$navigateTo(Register)
        },
        ForgotPassword(){
            this.$navigateTo(ForgotPassword, {clearHistory: true})
        }
    },
}
</script>

<style scoped>
Page {
    background: linear-gradient(to bottom, black, red);
}
.title{
    width: 100%;
    text-align: center;
    margin-left: 140;
    margin-right: 140;
    margin-bottom: 20;
}
.form{
    height: 100%;
}
.container{
    margin-left:20;
    margin-right: 20;
}
.logo-container{
    width: 150;
    margin-bottom: 50;
}
.form-input{
    background: white;
    color: black;
    placeholder-color: black;
    padding: 15;
    width: 100%;
    border-color: white;
    margin-bottom: 10;
}
.btn-login{
    background: black;
    color: white;
    width: 100%;
    padding: 15;
    margin-bottom: 20;
}
.register-link{
    color: #C0C0C0;
}
</style>