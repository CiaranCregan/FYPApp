<template>
    <StackLayout>
        <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>
        <!-- <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/> -->
        <Label class="drawer-item border" text="Clients" @tap="navigate('Clients')"/>
        <Label class="drawer-item" text="Bookings" @tap="navigate('Bookings')"/>
        <Label class="drawer-item" text="Classes" @tap="navigate('Classes')"/>
        <Label class="drawer-item" text="Logout" @tap="logout"/>
    </StackLayout>
</template>

<script>
import Clients from '../../screens/Clients.vue'
import Bookings from '../../screens/Bookings.vue'
import Classes from '../../screens/AdminClasses.vue'

import Login from '../../screens/Login.vue'

    export default {
        methods: {
            logout(){
                this.$store.dispatch('logout')
                    .then((res) => {
                        this.$navigateTo(Login, {clearHistory: true})
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            navigate(screen){
                switch(screen) {
                    case 'Clients':
                        this.$navigateTo(Clients, {clearHistory: true})
                        break;
                    case 'Bookings':
                        this.$navigateTo(Bookings, {clearHistory: true})
                        break;
                    case 'Classes':
                        this.$navigateTo(Classes, {clearHistory: true})
                        break;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>