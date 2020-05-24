<template>
    <Page>
        <ActionBar>
            <GridLayout class="nav" width="100%" columns="auto, *">
                <Image src="~/Images/menu.png" stretch="fill" width="30" @tap="openSidebar"/>
                <Label class="title" :text="username" col="1" />
            </GridLayout>
        </ActionBar>
        <ScrollView>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="green">
                <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
                <Label class="drawer-item" text="Profile" @tap="redirect('Profile')"/>
                <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/>
                <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
                <Label class="drawer-item" text="Logout" @tap="logout"/>
            </StackLayout>

            <StackLayout ~mainContent class="content">
                <!-- <Label class="h2" :text="pastBookings.length" /> -->
                <Label class="h2" textWrap="true" text="You have no past bookings. Get in contact with your trainer (Christopher) to get some sessions scheduled" v-if="pastBookings.length === 0"/>
                <card-view margin="10" padding="20" height="100" background="green" v-for="(booking, index) in pastBookings" :key="index">
                    <DockLayout stretchLastChild="true">
                        <Label :text="`${booking.date} at ${booking.time}`" dock="top"/>
                        <Label text="FAI Industrial Estate" dock="bottom"/>
                        <Label :text="showFormattedTime(booking.time)" dock="center" class="card"/>
                    </DockLayout>
                </card-view>
            </StackLayout>
        </RadSideDrawer>
        </ScrollView>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import Login from '../screens/Login.vue'
import Profile from '../screens/Profile.vue'
import CitizenBookings from '../screens/CitizenBookings.vue'
import MyClasses from '../screens/MyClasses.vue'
  export default {
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        pastBookings(){
            return this.$store.getters['pastbookings']
        }
    },
    created () {
        this.$store.dispatch('clientPastBookings');
    },
    methods: {
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
        },
        showFormattedTime(date){
            let newWord = date.split(":")
            if (newWord[0] < 12){
                return "Morning Session"
            } else if (newWord[0] >= 12 && newWord[0] < 16) {
                return 'Afternoon Session'
            } else {
                return 'Evening Session'
            }
        },
        logout(){
            this.$store.dispatch('logout')
                .then((res) => {
                    this.$navigateTo(Login, {clearHistory: true})
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
                    break;
                case 'Profile':
                    this.$navigateTo(Profile, {clearHistory: true})
                    break;
                case 'Classes':
                    this.$navigateTo(MyClasses, {clearHistory: true})
                    break;
                case 'Bookings':
                    this.$navigateTo(CitizenBookings, {clearHistory: true})
                    break;
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
    .h2{
        font-size: 25;
        text-align: center;
        padding: 20;
    }
    .card{
        margin: 5;
        color: #fff;
        font-size: 20;
        text-transform: capitalize;
    }
</style>
