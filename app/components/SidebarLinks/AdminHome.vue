<template>
    <StackLayout>
        <Image src="https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>
        <!-- <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/> -->
        <Label class="drawer-item border" text="Clients" @tap="navigate('Clients')"/>
        <Label class="drawer-item" text="Bookings" @tap="navigate('Bookings')"/>
    </StackLayout>
</template>

<script>
import Clients from '../../screens/Clients.vue'
import Bookings from '../../screens/Bookings.vue'
    export default {
        methods: {
            navigate(screen){
                switch(screen) {
                    case 'Clients':
                        this.$navigateTo(Clients, {clearHistory: true})
                        break;
                    case 'Bookings':
                        this.$navigateTo(Bookings, {clearHistory: true})
                        break;
                    // default:
                    //     this.$navigateTo(App, {clearHistory: true})
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>