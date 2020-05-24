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
                <Label class="drawer-item" text="Clients" @tap="redirect('Clients')"/>
                <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
                <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/>
                <Label class="drawer-item" text="Logout" @tap="logout"/>
                <!-- <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/> -->
            </StackLayout>

            <StackLayout ~mainContent class="content">
                <DockLayout stretchLastChild="true" height="100%">
                    <Label :text="`Updating booking for ${booking.username}`" dock="top" backgroundColor="#E48A8A" class="h2"/>
                    <WrapLayout dock="bottom" v-if="edit" >
                        <Button text="Undo Edit" class="cardBtnOther" backgroundColor="red" @tap="removeEdit" />
                        <Button text="Update Booking" class="cardBtnOther" backgroundColor="green" @tap="createBooking" />
                        <!-- <Label text="second" width="30%" height="30%" backgroundColor="#1c6b48"/> -->
                    </WrapLayout>
                    <StackLayout dock="center" width="100%" height="100%">
                        <StackLayout v-if="!edit">
                            <Label :text="`Booking date: ${booking.date}`" class="h4"/>
                            <Label :text="`Booking time: ${booking.time}`" class="h4"/>
                            <Button text="Edit" class="cardBtn" @tap="editBooking" />
                        </StackLayout>
                        <StackLayout v-if="edit">
                            <Label text="Pick a date:" class="h4"/>
                            <DatePicker v-model="selectedDate" :minDate="currentDate" width="100%"/>
                            <Label text="Pick a time:" class="h4"/>
                            <TimePicker v-model="selectedTime" minuteInterval="30" width="100%"/>    
                        </StackLayout>
                    </StackLayout>
                </DockLayout>
            </StackLayout>
        </RadSideDrawer>
        </ScrollView>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import Classes from '../screens/AdminClasses.vue'
import Clients from  '../screens/Clients.vue'
import Bookings from '../screens/Bookings.vue'

import Login from '../screens/Login.vue'

  export default {
    props: ['booking'],
    data() {
        return {
            showMenu: true,
            edit: false,
            selectedDate: new Date(),
            currentDate: new Date(),
            selectedTime: ''
        }
    },
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        users(){
            return this.$store.getters['showListUsers']
        }
    },
    created () {
        console.log(this.booking)
        this.$store.dispatch('getAllClientsForDropBooking');
    },
    methods: {
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
        },
        editBooking(){
            this.edit = true
        },
        removeEdit(){
            this.edit = false
        },
        createBooking(){
            let self = this
            if (this.selectedTime === ''){
                alert({
                    title: "Error",
                    message: "A time hasn't been selected. Please select one",
                    okButtonText: "Try again!"
                }).then(() => {
                    console.log("Alert dialog closed");
                });
            } else {
                let bookingDate = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth()+1 < 10 ? `0${this.selectedDate.getMonth()+1}` : this.selectedDate.getMonth()+1}-${this.selectedDate.getDate() < 10 ? `0${this.selectedDate.getDate()}` : this.selectedDate.getDate()}`
                let bookingTime = `${this.selectedTime.getHours() < 10 ? '0' + this.selectedTime.getHours() : this.selectedTime.getHours()}:${this.selectedTime.getMinutes() === 0 ? '00' : this.selectedTime.getMinutes()}:00`
                confirm({
                    title: "Confirm Booking",
                    message: `Your are making a booking for ${this.users[this.selectedUser]} on ${bookingDate} @ ${bookingTime}`,
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(result => {
                    if (result){
                        let data = {
                            id: this.booking.id,
                            username: this.booking.username,
                            date: bookingDate,
                            booking_type: 'Private',
                            time: bookingTime
                        }
                        this.$store.dispatch('updateBookingForUser', data, this.booking.id)
                        .then((res) => {
                            this.$navigateTo(App, {clearHistory: true}) 
                        })
                        .catch((error) => {
                            if (error.response.status === 405){
                                alert(error.response.data)
                            }
                        })
                    }
                });
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
                case 'Clients':
                    this.$navigateTo(Clients, {clearHistory: true})
                    break;
                case 'Bookings':
                    this.$navigateTo(Bookings, {clearHistory: true})
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
        font-size: 25;
        text-align: center;
        padding: 20;
    }
    .h4{
        font-size: 25;
        text-align: center;
        padding: 10;
    }
    .cardBtn{
        background: black;
        color: white;
        width: 95%;
        padding: 20;
    }
    .cardBtnOther{
        color: white;
        width: 50%;
        padding: 20;
    }
</style>
