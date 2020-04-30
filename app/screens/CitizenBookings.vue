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
            <StackLayout ~drawerContent backgroundColor="#d9544d">
                <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
            </StackLayout>
            <StackLayout ~mainContent class="content">
                    <!-- <Button text="View all your bookings" @tap="viewAllBookings" class="cardBtn"/>
                    <Label text="Todays bookings:" class="h2"/>
                    <StackLayout height="2" backgroundColor="Black" class="divider"></StackLayout> -->
                    <GridLayout margin="10" columns="*, *">
                        <Button text="View future bookings" @tap="viewAllFutureBookings" row="0" col="0" class="cardleft"/>
                        <Button text="View past bookings" @tap="viewAllPastBookings" row="0" col="1"  class="cardright"/>
                        <!-- <Label margin="10" text="0,0" row="0" col="0" />
                        <Label margin="10" text="0,1" row="0" col="1" /> -->
                    </GridLayout>
                    <!-- <Button text="View all your bookings" @tap="viewAllBookings" class="cardBtn"/> -->
                    <Label text="Todays bookings" class="h2"/>
                    <!-- <ActivityIndicator :busy="loading" color="red" width="100" height="100" v-if="loading"/> -->
                    <StackLayout height="2" backgroundColor="Black" class="divider"></StackLayout>
                    <StackLayout v-if="todaysBookings.length === 0">
                        <Label text="No bookings for today" class="card"/>
                    </StackLayout>
                    <StackLayout>
                        <card-view margin="10" col="1" row="1" backgroundColor="green" v-for="(bookings, index) in todaysBookings" :key="index">
                            <StackLayout>
                                <Label :text="`${showFormattedTime(bookings.time)} at ${bookings.time}`" class="card"/>
                            </StackLayout>
                        </card-view>
                    </StackLayout>
            </StackLayout>
        </RadSideDrawer>
        </ScrollView>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import FutureBookings from '../screens/CitizenBookingsFuture.vue'
import PastBookings from '../screens/CitizenBookingsPast.vue'

  export default {
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        todaysBookings(){
            return this.$store.getters['bookings']
        }
    },
    methods: {
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
        },
        viewAllFutureBookings(){
            this.$navigateTo(FutureBookings)
        },
        viewAllPastBookings(){
            this.$navigateTo(PastBookings)
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
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
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
        font-size: 30;
        margin-left: 10;
    }
    .divider{
        width: 98%;
        margin-top: 5;
        margin-bottom: 5;
    }
    .card{
        width: 95%;
        margin: 20;
        color: #000;
        font-size: 20;
    }
    .card-inner{
        width: 95%;
        margin-left: 20;
        color: #000;
        font-size: 15;
    }
    .cardleft{
        background: #275DAD;
        color: white;
        width: 95%;
        padding: 20;
        margin-left: 5;
        font-size: 20;
    }
    .cardright{
        background: #3A7CA5;
        color: white;
        width: 95%;
        padding: 20;
        margin-left: 5;
        font-size: 20;
    }
    .btn{
        color: white;
    }
</style>
