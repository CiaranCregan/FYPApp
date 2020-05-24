<template>
    <Page>
        <ActionBar>
            <GridLayout class="nav" width="100%" columns="auto, *">
                <Image v-if="showMenu" src="~/Images/menu.png" stretch="fill" width="30" @tap="openSidebar"/>
                <Label class="title" :text="username" col="1" />
            </GridLayout>
        </ActionBar>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="green">
                <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
                <Label class="drawer-item" text="Clients" @tap="redirect('Clients')"/>
                <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
                <Label class="drawer-item" text="Logout" @tap="logout"/>
            </StackLayout>

            <StackLayout ~mainContent class="main-content">
                <FlexboxLayout flexDirection="column" class="hero-container">
                    <Label class="body" textWrap="true">Hello from the classes screen </Label>
                </FlexboxLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import Clients from '../screens/Clients.vue'
import Bookings from '../screens/Bookings.vue'

import Login from '../screens/Login.vue'
  export default {
    data() {
        return {
            showMenu: true
        }
    },
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        }
    },
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
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
        },
        closeSidebar(){
            this.$refs.drawer.nativeView.closeDrawer();
        },
        onScan() {
            alert({
                title: "Are you sure you want to scan?",
                message: "This will open your phone's camera",
                okButtonText: "Ok"
            }).then(() => {
                console.log("Alert dialog closed");
            });
        },
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
                    break;
                case 'Clients':
                    this.$navigateTo(Clients, {clearHistory: true})
                    break;
                case 'Booking':
                    this.$navigateTo(Booking, {clearHistory: true})
                    break;

                default:
                    this.$navigateTo(App, {clearHistory: true})
            }
        }
    }
  }
</script>

<style scoped>
    
</style>
