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
                <DockLayout stretchLastChild="true" height="100%">
                    <Label text="Create a new class" dock="top" backgroundColor="#E48A8A" class="h2"/>
                    <Button text="Create" dock="bottom" @tap="createClass" class="cardBtn"/>
                    <StackLayout dock="center" width="100%" height="100%">
                        <Label class="h4" text="Class title:" />
                        <TextField v-model="title" class="form-input"/>
                        <Label text="Pick a date:" class="h4"/>
                        <DatePicker v-model="selectedDate" :minDate="currentDate" width="100%"/>
                        <Label text="Pick a time:" class="h4"/>
                        <TimePicker v-model="selectedTime" minuteInterval="15" width="100%"/>
                        <Label class="h4" text="Class length:" />
                        <TextField v-model="length" class="form-input"/>
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
            selectedDate: new Date(),
            currentDate: new Date(),
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
        createClass(){
            let self = this
            if (this.title === '' || this.selectedTime === '' || this.length === ''){
                alert({
                    title: "Error",
                    message: "Please make sure that a title, date, time and class length has been provided",
                    okButtonText: "Try again!"
                }).then(() => {
                    console.log("Alert dialog closed");
                });
            } else {
                let bookingDate = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth()+1 < 10 ? `0${this.selectedDate.getMonth()+1}` : this.selectedDate.getMonth()+1}-${this.selectedDate.getDate() < 10 ? `0${this.selectedDate.getDate()}` : this.selectedDate.getDate()}`
                let bookingTime = `${this.selectedTime.getHours() < 10 ? '0' + this.selectedTime.getHours() : this.selectedTime.getHours()}:${this.selectedTime.getMinutes() === 0 ? '00' : this.selectedTime.getMinutes()}:00`
                confirm({
                    title: "Confirm Booking",
                    message: `Your are making a class for ${bookingDate} @ ${bookingTime}`,
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(result => {
                    if (result){
                        let data = {
                            title: this.title,
                            date: bookingDate,
                            time: bookingTime,
                            class_length: this.length,
                            going: 0
                        }
                        console.log(data)
                        this.$store.dispatch('createClass', data)
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
    .form-input{
        background: white;
        color: black;
        margin: 10;
        padding: 15;
        width: 95%;
        border-width: 2;
        border-color: #F1F1F1;
        margin-bottom: 10;
    }
</style>
