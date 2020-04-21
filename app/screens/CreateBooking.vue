<template>
    <Page>
        <ActionBar>
            <GridLayout class="nav" width="100%" columns="auto, *">
                <Image v-if="showMenu" src="https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png" stretch="fill" width="30" @tap="openSidebar"/>
                <Label class="title" :text="username" col="1" />
            </GridLayout>
        </ActionBar>
        <ScrollView>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#d9544d">
                <Image src="https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="ADMIN SCREEN, DONT CLICK'" @tap="redirect('Home')"/>
                <!-- <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/> -->
            </StackLayout>

            <StackLayout ~mainContent class="content">
                <DockLayout stretchLastChild="true" height="100%">
                    <Label text="Create a new booking" dock="top" backgroundColor="#E48A8A" class="h2"/>
                    <Button text="Complete" dock="bottom" @tap="createBooking" class="cardBtn"/>
                    <StackLayout dock="center" width="100%" height="100%">
                        <Label text="Select user:" class="h4"/>
                        <ListPicker :items="users" v-model="selectedUser" width="50%"/>
                        <Label text="Pick a date:" class="h4"/>
                        <DatePicker v-model="selectedDate" :minDate="currentDate" width="50%"/>
                        <Label text="Pick a time:" class="h4"/>
                        <TimePicker v-model="selectedTime" minuteInterval="15" width="50%"/>
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
            showMenu: true,
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
            if (this.selectedUser === 0 || this.selectedTime === ''){
                alert({
                    title: "Error",
                    message: "Please make sure that a user, date & time has been selected",
                    okButtonText: "Try again!"
                }).then(() => {
                    console.log("Alert dialog closed");
                });
            } else {
                let bookingDate = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth()+1}-${this.selectedDate.getDate()}`
                let bookingTime = `${this.selectedTime.getHours() < 10 ? '0' + this.selectedTime.getHours() : this.selectedTime.getHours()}:${this.selectedTime.getMinutes() === 0 ? '00' : this.selectedTime.getMinutes()}:00`
                confirm({
                    title: "Confirm Booking",
                    message: `Your are making a booking for ${this.users[this.selectedUser]} on ${bookingDate} @ ${bookingTime}`,
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(result => {
                    console.log(result);
                });
            }
        },
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
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
</style>
