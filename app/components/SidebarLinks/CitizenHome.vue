<template>
    <StackLayout>
        <Image src="https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>
        <!-- <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/> -->
        <Label class="drawer-item border" text="Classes" @tap="redirect('Classes')"/>
    </StackLayout>
</template>

<script>
import Classes from '../../screens/Classess.vue'
    export default {
        methods: {
            redirect(screen){
                switch(screen) {
                    case 'App':
                        this.$navigateTo(App, {clearHistory: true})
                        break;
                    case 'Classes':
                        this.$navigateTo(Classes, {clearHistory: true})
                        break;
                    default:
                        this.$navigateTo(App, {clearHistory: true})
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>