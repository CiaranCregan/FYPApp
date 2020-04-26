<template>
    <StackLayout>
        <GridLayout columns="*,*" rows="*,*" width="100%" height="400">
            <card-view margin="10" col="0" row="0" backgroundColor="#275DAD">
                <DockLayout width="100%" height="200" stretchLastChild="false">
                    <Label text="Profile" dock="top" height="60%" class="h3"/>
                    <Button text="Manage My Profile" dock="bottom" height="40%" backgroundColor="#3A7CA5" class="cardBtn" @tap="navigate('Profile')"/>
                </DockLayout>
            </card-view>
            <card-view margin="10" col="1" row="0" backgroundColor="#275DAD">
                <DockLayout width="100%" height="200" stretchLastChild="false">
                    <Label text="Classes" dock="top" height="60%" class="h3"/>
                    <Button text="View Classes" dock="bottom" height="40%" backgroundColor="#3A7CA5" class="cardBtn" @tap="navigate('Classes')"/>
                </DockLayout>
            </card-view>
        </GridLayout>
    </StackLayout>
</template>

<script>
import Profile from '../screens/Profile.vue'
import CitizenClasses from '../screens/CitizenClasses.vue'
    export default {
        computed: {
            username(){
                return this.$store.getters['username']
            },
            todaysBookings(){
                return this.$store.getters['todaysBookings']
            }
        },
        created () {
            this.$store.dispatch('getTodaysBookingsForAdmin');
        },
        methods: {
            navigate(screen){
                switch(screen) {
                    case 'Profile':
                        this.$navigateTo(Profile, {clearHistory: true})
                        break;
                    case 'Classes':
                        this.$navigateTo(CitizenClasses, {clearHistory: true})
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
    border-color: #7CA5B8;
    border-radius: 0;
}
</style>