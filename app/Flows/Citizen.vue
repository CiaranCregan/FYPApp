<template>
    <StackLayout>
        <GridLayout columns="*,*" rows="*,*" width="100%" height="400">
            <card-view margin="10" col="0" row="0" backgroundColor="#dfe1e5">
                <DockLayout width="100%" height="200" stretchLastChild="false">
                    <Label text="Profile" dock="top" height="60%" class="h3"/>
                    <Button text="Manage My Profile" dock="bottom" height="40%" backgroundColor="green" class="cardBtn" @tap="navigate('Profile')"/>
                </DockLayout>
            </card-view>
            <card-view margin="10" col="1" row="0" backgroundColor="#dfe1e5">
                <DockLayout width="100%" height="200" stretchLastChild="false">
                    <Label text="Classes" dock="top" height="60%" class="h3"/>
                    <Button text="View Classes" dock="bottom" height="40%" backgroundColor="green" class="cardBtn" @tap="navigate('Classes')"/>
                </DockLayout>
            </card-view>
            <card-view margin="10" col="0" row="1" backgroundColor="#dfe1e5">
                <DockLayout width="100%" height="200" stretchLastChild="false">
                    <Label text="Bookings" dock="top" height="60%" class="h3"/>
                    <Button text="View my Bookings" dock="bottom" height="40%" backgroundColor="green" class="cardBtn" @tap="navigate('Bookings')"/>
                </DockLayout>
            </card-view>
        </GridLayout>
        <card-view margin="10" padding="20" height="100" background="green" @tap="navigate('Bookings')">
            <Label :text="firstBooking" class="h3" textWrap="true"/>
        </card-view>
    </StackLayout>
</template>

<script>
import Profile from '../screens/Profile.vue'
import MyClasses from '../screens/MyClasses.vue'
import CitizenBookings from '../screens/CitizenBookings.vue'
    export default {
        computed: {
            username(){
                return this.$store.getters['username']
            },
            firstBooking(){
                return this.$store.getters['firstUserBooking']
            },
            userId(){
                return this.$store.getters['userId']
            },
            myclasses(){
                return this.$store.getters['getConfirmsForClass']
            }
        },
        created () {
            console.log(this.userId)
            this.$store.dispatch('getTodaysBookingsForAdmin');
            // this.$store.dispatch('classesConfirmed')
        },
        methods: {
            navigate(screen){
                switch(screen) {
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
    border-color: #dfe1e5;
    border-radius: 0;
}
</style>