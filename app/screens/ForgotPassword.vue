<template>
    <Page>
        <StackLayout>
            <FlexBoxLayout flexDirection="column" justifyContent="center" class="form">
                <StackLayout class="container">
                    <FlexBoxLayout alignItems="center" class="border-bottom">
                        <TextField v-model="username" hint="Enter username" class="form-input"/>
                    </FlexBoxLayout>

                    <Button text="Forgot password" class="btn-register" @tap="forgotPassword"/>

                    <FlexBoxLayout alignItems="center" justifyContent="space-between">
                        <Label horizontalAlignment="left" text="" />
                        <Label horizontalAlignment="right" text="Cancel" class="cancel-link" @tap="forgotPassword"/>
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
                username: '',
        }
    },
    methods: {
        forgotPassword(){
            this.$navigateTo(Login, {clearHistory: true})
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
.cancel-link{
    color: #C0C0C0;
}
</style>