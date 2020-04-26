<template>
    <StackLayout>
        <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>
        <!-- <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/> -->
        <Label class="drawer-item border" text="Profile" @tap="redirect('Profile')"/>
    </StackLayout>
</template>

<script>
import Profile from '../../screens/Profile.vue'
    export default {
        methods: {
            redirect(screen){
                switch(screen) {
                    case 'Profile':
                        this.$navigateTo(Profile, {clearHistory: true})
                        break;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>