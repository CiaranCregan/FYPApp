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
                <Label class="drawer-item" text="Profile" @tap="redirect('Profile')"/>
                <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
            </StackLayout>
            <StackLayout ~mainContent class="content">
                    <StackLayout v-if="allClasses.length === 0">
                        <Label text="No classes have been created" class="card"/>
                    </StackLayout>
                    <StackLayout v-else>
                        <card-view margin="10" col="1" row="1" backgroundColor="green" v-for="(classes, index) in allClasses" :key="index">
                            <StackLayout>
                                <Label :text="`${classes.title}`" class="card" textWrap="true"/>
                                <Label :text="`${showFormattedTime(classes.time)} at ${classes.time} - ${classes.class_length} minutes`" class="card" textWrap="true"/>
                                <WrapLayout backgroundColor="#3c495e">
                                    <Button text="View Information" width="100%" backgroundColor="orange" class="btn" @tap="viewInformation(classes)"/>
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
import Profile from '../screens/Profile.vue'
import Bookings from '../screens/CitizenBookings.vue'

import MyClasses from '../screens/MyClasses.vue'
import ClassInformation from '../screens/ClassInformation.vue'
  export default {
    data() {
        return {
     
        }
    },
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        allClasses(){
            return this.$store.getters['allClasses']
        }
    },
    created (){
        this.$store.dispatch('getFutureClasses');
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
        myClasses(){
            this.$navigateTo(MyClasses)
        },
        viewInformation(classes){
            this.$navigateTo(ClassInformation, {
                props: {
                    classes: classes
                }
            })
        },
        bookClass(id){
            this.$store.dispatch('confirmBooking', id)
            .then(() => {
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
                case 'Bookings':
                    this.$navigateTo(Bookings, {clearHistory: true})
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
