<template>
    <StackLayout>
        <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>
        <!-- <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/> -->
        <Label class="drawer-item border" text="Profile" @tap="redirect('Profile')"/>
        <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/>
        <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
    </StackLayout>
</template>

<script>
import Profile from '../../screens/Profile.vue'
import CitizenClasses from '../../screens/CitizenClasses.vue'
import CitizenBookings from '../../screens/CitizenBookings.vue'
    export default {
        methods: {
            redirect(screen){
                switch(screen) {
                    case 'Profile':
                        this.$navigateTo(Profile, {clearHistory: true})
                        break;
                    case 'Classes':
                        this.$navigateTo(CitizenClasses, {clearHistory: true})
                        break;
                    case 'Bookings':
                        this.$navigateTo(CitizenBookings, {clearHistory: true})
                        break;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>