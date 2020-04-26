<template>
    <Page>
        <StackLayout>
            <FlexBoxLayout flexDirection="column" justifyContent="center" class="form">
                <StackLayout class="container">
                    <FlexBoxLayout alignItems="center" class="border-bottom">
                        <TextField v-model="fullName" hint="Full name" class="form-input"/>
                    </FlexBoxLayout>
                    <FlexBoxLayout alignItems="center">
                        <TextField v-model="username" hint="Emaill address" class="form-input"/>
                    </FlexBoxLayout>
                    <FlexBoxLayout alignItems="center">
                        <TextField v-model="password" hint="Password" secure="true" class="form-input"/>
                    </FlexBoxLayout>

                    <Button text="Register account" class="btn-register" @tap="register"/>

                    <FlexBoxLayout alignItems="center" justifyContent="space-between">
                        <Label horizontalAlignment="left" text="" />
                        <Label horizontalAlignment="right" text="Already an account?" class="register-link" @tap="this.$navigateBack"/>
                    </FlexBoxLayout>
                </StackLayout>
            </FlexBoxLayout>
        </StackLayout>
    </Page>
</template>

<script >
import Login from './Login.vue'
export default {
    data() {
        return {
                fullName: '',
                username: '',
                password: ''
        }
    },
    methods: {
        register(){
            let data = {
                name: this.fullName,
                email: this.username,
                password: this.password
            }
            this.$store.dispatch('register', data)
            .then((res) => {
                this.$navigateTo(Login, {clearHistory: true})
            })
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
.btn-register{
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