<template>
    <Page>
        <ActionBar>
            <GridLayout class="nav" width="100%" columns="auto, *">
                <Image v-if="showMenu" src="~/Images/menu.png" stretch="fill" width="30" @tap="openSidebar"/>
                <Label class="title" :text="username" col="1" />
            </GridLayout>
        </ActionBar>
        <ScrollView>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#d9544d">
                <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
                <Label class="drawer-item" text="Clients" @tap="redirect('Clients')"/>
                <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/>
            </StackLayout>
            <StackLayout ~mainContent class="content">
                    <Button text="Create new booking" @tap="createBooking" class="cardBtn"/>
                    <Label text="Todays bookings" class="h2"/>
                    <ActivityIndicator :busy="loading" color="red" width="100" height="100" v-if="loading"/>
                    <StackLayout height="2" backgroundColor="Black" class="divider"></StackLayout>
                    <StackLayout v-if="todaysBookings.length === 0">
                        <Label text="No bookings for today" class="card"/>
                    </StackLayout>
                    <StackLayout v-else>
                        <card-view margin="10" col="1" row="1" backgroundColor="green" v-for="(bookings, index) in todaysBookings" :key="index">
                            <StackLayout>
                                <Label :text="bookings.username" class="card"/>
                                <Label :text="`${showFormattedTime(bookings.time)} at ${bookings.time}`" class="card"/>
                                <WrapLayout backgroundColor="#3c495e">
                                    <Button text="Update" width="50%" backgroundColor="orange" class="btn" @tap="editBooking(bookings)"/>
                                    <Button text="Remove" width="50%" backgroundColor="red" class="btn" @tap="deleteBooking(bookings.id)"/>
                                </WrapLayout>
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
import Clients from '../screens/Clients.vue'
import CreateBooking from '../screens/CreateBooking.vue'
import Classes from '../screens/AdminClasses.vue'

import EditBooking from '../screens/EditBooking.vue'
  export default {
    data() {
        return {
            showMenu: true,
            selectedDate: '',
            selectedTime: '',
            loading: false
        }
    },
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        todaysBookings(){
            return this.$store.getters['todaysBookings']
        }
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
        editBooking(booking){
            this.$navigateTo(EditBooking, {
                props: {
                    booking: booking
                }
            })
        },
        deleteBooking(id){
            confirm({
                title: "Delete booking",
                message: "Are you sure you want to remove this booking?",
                okButtonText: "Delete",
                cancelButtonText: "Cancel"
            }).then(result => {
                if (result){
                    this.$store.dispatch('removeClientBooking', id)
                    .then((res) => {
                        this.$store.dispatch('getTodaysBookingsForAdmin');
                    })
                    .catch((err) => {
                        console.log(err)
                        alert('Something has gone wrong. Please try again')
                    })
                }
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
    .cardBtn{
        background: black;
        color: white;
        width: 95%;
        padding: 20;
        margin-top: 15;
        margin-bottom: 10;
    }
    .btn{
        color: white;
    }
</style>
