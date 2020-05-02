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
                <!-- <Label class="drawer-item" text="Clients" @tap="redirect('Clients')"/>
                <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/> -->
            </StackLayout>

            <StackLayout ~mainContent class="content">
                <DockLayout stretchLastChild="true" height="100%">
                    <Label text="Create a new booking" dock="top" backgroundColor="#E48A8A" class="h2"/>
                    <Button text="Complete" dock="bottom" @tap="createBooking" class="cardBtn"/>
                    <StackLayout dock="center" width="100%" height="100%">
                        <Label text="Select user:" class="h4"/>
                        <ListPicker :items="users" v-model="selectedUser" width="100%"/>
                        <Label text="Pick a date:" class="h4"/>
                        <DatePicker v-model="selectedDate" :minDate="currentDate" width="100%"/>
                        <Label text="Pick a time:" class="h4"/>
                        <TimePicker v-model="selectedTime" minuteInterval="15" width="100%"/>
                    </StackLayout>
                </DockLayout>
            </StackLayout>
        </RadSideDrawer>
        </ScrollView>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
  export default {
    data() {
        return {
            selectedUser: 0,
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
        // let todaysDate = new Date();
        // let today = `${todaysDate.getFullYear()} ${todaysDate.getMonth()+1} ${todaysDate.getDate()}`
        // let todaysHour = todaysDate.getHours() < 10 ? '0' + todaysDate.getHours() : todaysDate.getHours()
        // let todaysMinute = todaysDate.getMinutes()
        // let todaysSeconds = '00'

        // let todayFormatted = `${today} ${todaysHour}:${todaysMinute}:${todaysSeconds}`
        // // console.log(todayFormatted)
        // this.selectedTime = todayFormatted
        this.$store.dispatch('getAllClientsForDropBooking');
    },
    methods: {
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
        },
        createBooking(){
            let self = this
            if (this.selectedUser === 0 || this.selectedTime === ''){
                alert({
                    title: "Error",
                    message: "Please make sure that a user, date & time has been selected",
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
                            username: this.users[this.selectedUser],
                            date: bookingDate,
                            booking_type: 'Private',
                            time: bookingTime
                        }
                        this.$store.dispatch('createBookingForUser', data)
                        .then((res) => {
                            this.$navigateTo(App, {clearHistory: true}) 
                        })
                        .catch((error) => {
                            if (error.response.status === 405){
                                alert(error.response.data)
                            }
                        })
                    }
                        // this.$store.dispatch('createBookingForUser', {username: this.users[this.selectedUser], date: bookingDate, booking_type: 'Private', time: bookingTime})
                });
                // console.log(bookingDate)
            }
        },
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
                    break;
                // case 'Classes':
                //     this.$navigateTo(Classes, {clearHistory: true})
                //     break;
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
    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
