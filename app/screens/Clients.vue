<template>
    <Page>
        <ActionBar>
            <GridLayout class="nav" width="100%" columns="auto, *">
                <Image v-if="showMenu" src="https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png" stretch="fill" width="30" @tap="openSidebar"/>
                <Label class="title" :text="username" col="1" />
            </GridLayout>
        </ActionBar>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#d9544d">
                <Image src="https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
                <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
                <!-- <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/> -->
            </StackLayout>

            <StackLayout ~mainContent class="content">
                <Label :text='users.length' />
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import Bookings from '../screens/Bookings.vue'
  export default {
    data() {
        return {
            showMenu: true,
            selectedDate: '',
            selectedTime: ''
        }
    },
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        users(){
            return this.$store.getters['showUsers']
        }
    },
    created () {
        this.$store.dispatch('getAllClients');
    },
    methods: {
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
        createBooking(){

            alert(this.selectedTime);
        },
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
                    break;
                case 'Bookings':
                    this.$navigateTo(Bookings, {clearHistory: true})
                    break;
                // default:
                //     this.$navigateTo(App, {clearHistory: true})
            }
        }
    }
  }
</script>

<style scoped>
    .content{
        width: 100%;
        height: auto;
    }
    .cardBtn{
        background: black;
        color: white;
        width: 95%;
        padding: 20;
        margin-bottom: 15;
    }
</style>
