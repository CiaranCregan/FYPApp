<template>
    <Page>
        <ActionBar>
            <GridLayout class="nav" width="100%" columns="auto, *">
                <Image v-if="showMenu" src="~/Images/menu.png" stretch="fill" width="30" @tap="openSidebar"/>
                <Label class="title" :text="username" col="1" />
            </GridLayout>
        </ActionBar>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#d9544d">
                <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
                <Label class="drawer-item" text="Clients" @tap="redirect('Clients')"/>
                <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/>
            </StackLayout>

            <StackLayout ~mainContent class="content">
                <!-- <DockLayout stretchLastChild="true" height="100%">
                    <Label text="Create a new booking" dock="top" height="40" backgroundColor="#289062"/> -->
                    <Button text="Create new booking" @tap="createBooking" class="cardBtn"/>
                    <!-- <StackLayout dock="center" width="100%" height="100%">
                        <Label text="Pick a date:"/>
                        <DatePicker v-model="selectedDate" year="2018"/>
                        <Label text="Pick a time:"/>
                        <TimePicker v-model="selectedTime" minuteInterval="15"/>
                    </StackLayout>
                </DockLayout> -->
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import Clients from '../screens/Clients.vue'
import CreateBooking from '../screens/CreateBooking.vue'
import Classes from '../screens/AdminClasses.vue'
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
        }
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
            this.$navigateTo(CreateBooking)
        },
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
                    break;
                case 'Clients':
                    this.$navigateTo(Clients, {clearHistory: true})
                    break;
                case 'Classes':
                    this.$navigateTo(Classes, {clearHistory: true})
                    break;
                default:
                    this.$navigateTo(App, {clearHistory: true})
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
        margin-top: 15;
    }
</style>
