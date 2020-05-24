<template>
    <StackLayout>
<GridLayout columns="*,*" rows="*,*" width="100%" height="400">
    <card-view margin="10" col="0" row="0" backgroundColor="#dfe1e5">
        <DockLayout width="100%" height="200" stretchLastChild="false">
            <Label text="Clients" dock="top" height="60%" class="h3"/>
            <Button text="Manage clients" dock="bottom" height="40%" backgroundColor="green" class="cardBtn" @tap="navigate('Clients')"/>
            <!-- <Label text="Example button" dock="bottom" height="40%" backgroundColor="grey" class="cardBtn"/> -->
        </DockLayout>
    </card-view>
    <card-view margin="10" elevation="40" radius="1" col="1" row="0" backgroundColor="#dfe1e5">
        <DockLayout width="100%" height="200" stretchLastChild="false">
            <Label text="Bookings" dock="top" height="60%" backgroundColor="#dfe1e5" class="h3"/>
            <Button text="Manage bookings" dock="bottom" height="40%" backgroundColor="green" class="cardBtn" @tap="navigate('Bookings')"/>
            <!-- <Label text="Example button" dock="bottom" height="40%" backgroundColor="grey" class="cardBtn"/> -->
        </DockLayout>
    </card-view>
    <card-view margin="10" elevation="40" radius="1" col="0" row="1" backgroundColor="#dfe1e5">
        <DockLayout width="100%" height="200" stretchLastChild="false">
            <Label text="Classes" dock="top" height="60%" backgroundColor="#dfe1e5" class="h3"/>
            <Button text="Manage classes" dock="bottom" height="40%" backgroundColor="green" class="cardBtn" @tap="navigate('Classes')"/>
            <!-- <Label text="Example button" dock="bottom" height="40%" backgroundColor="grey" class="cardBtn"/> -->
        </DockLayout>
    </card-view>
    <!-- <card-view margin="10" col="1" row="1" backgroundColor="#dfe1e5">
        <DockLayout width="100%" height="200" stretchLastChild="false">
            <Label text="Scan QR code" dock="top" height="60%" backgroundColor="#dfe1e5" class="h3"/>
            <Button text="Scan now" dock="bottom" height="40%" backgroundColor="grey" class="cardBtn" @tap="navigate('Classes')"/>
            <Label text="Example button" dock="bottom" height="40%" backgroundColor="grey" class="cardBtn"/>
        </DockLayout>
    </card-view> -->
  </GridLayout>
    <card-view margin="10" padding="20" height="100" background="green">
        <Label :text="`You have ${todaysBookings.length} scheduled ${todaysBookings.length === 0 || todaysBookings.length > 1 ? 'bookings' : 'booking'} today`" class="h3 white"/>
    </card-view>
    <card-view margin="10" padding="20" height="100" background="green">
        <Label :text="`You have ${todaysClasses.length} scheduled ${todaysClasses.length === 0 || todaysClasses.length > 1 ? 'classes' : 'class'} today`" class="h3 white"/>
    </card-view>
    </StackLayout>
</template>

<script>
import Clients from '../screens/Clients.vue'
import Bookings from '../screens/Bookings.vue'
import Classes from '../screens/AdminClasses.vue'
    export default {
        computed: {
            username(){
                return this.$store.getters['username']
            },
            todaysBookings(){
                return this.$store.getters['todaysBookings']
            },
            todaysClasses(){
                return this.$store.getters['todaysClasses']
            }
        },
        created () {
            this.$store.dispatch('getTodaysBookingsForAdmin');
            this.$store.dispatch('getTodaysClassesForAdmin');
        },
        methods: {
            navigate() {
                alert({
                    title: "Button clicked",
                    message: "This method is all setuo",
                    okButtonText: "Close"
                })
            },
            navigate(screen){
                switch(screen) {
                    case 'Clients':
                        this.$navigateTo(Clients, {clearHistory: true})
                        break;
                    case 'Bookings':
                        this.$navigateTo(Bookings, {clearHistory: true})
                        break;
                    case 'Classes':
                        this.$navigateTo(Classes, {clearHistory: true})
                        break;
                }
            }
        },
    }
</script>

<style scoped>
.btn{
    background: black;
    color: white;
    width: 100%;
}
.white{
    color: #fff;
}
.h3 {
    font-weight: bold;
  font-size: 20;
  text-align: center;
}
.cardBtn{
    color: #000;
    text-align: center;
    font-size: 15;
    border-width: 4 0 0 0;
    border-color: green;
    border-radius: 0;
}
</style>