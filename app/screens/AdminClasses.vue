<template>
    <Page>
        <ActionBar>
            <GridLayout class="nav" width="100%" columns="auto, *">
                <Image v-if="showMenu" src="~/Images/menu.png" stretch="fill" width="30" @tap="openSidebar"/>
                <Label class="title" :text="username" col="1" />
            </GridLayout>
        </ActionBar>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#d9544d">
                <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
                <Label class="drawer-item" text="Clients" @tap="redirect('Clients')"/>
                <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
            </StackLayout>

            <StackLayout ~mainContent class="content">
                <Button text="Create new class" @tap="createBooking" class="cardBtn"/>
                <Label text="Todays classes" class="h2"/>
                <StackLayout height="2" backgroundColor="Black" class="divider"></StackLayout>
                <StackLayout v-if="todaysClasses.length === 0">
                        <Label text="No bookings for today" class="card"/>
                    </StackLayout>
                    <StackLayout v-else>
                        <card-view margin="10" col="1" row="1" backgroundColor="green" v-for="(classes, index) in todaysClasses" :key="index">
                            <StackLayout>
                                <Label :text="`${classes.title}`" class="card"/>
                                <Label :text="`${showFormattedTime(classes.time)} at ${classes.time} - ${classes.class_length} minutes`" class="card"/>
                                <!-- <Label :text="`Amount of Clients going: ${classes.going}`"/> -->
                                <WrapLayout backgroundColor="#3c495e">
                                    <Button text="View" width="33%" backgroundColor="orange" @tap="viewClassInfo(classes)" class="btn"/>
                                    <Button text="Update" width="33%" backgroundColor="pink" @tap="updateClass(classes)" class="btn"/>
                                    <Button text="Remove" width="34%" backgroundColor="red" @tap="deleteClass(classes.id)" class="btn"/>
                                </WrapLayout>
                            </StackLayout>
                        </card-view>
                    </StackLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import Clients from '../screens/Clients.vue'
import Bookings from '../screens/Bookings.vue'
import Classes from '../screens/AdminClasses.vue'

import CreateClass from '../screens/CreateClass.vue'
import ClassInformation from '../screens/AdminClassesInfo.vue'
import UpdateClass from '../screens/UpdateClass.vue'
  export default {
    data() {
        return {
            showMenu: true,
            title: '',
            selectedDate: '',
            selectedTime: '',
            length: '',
            selectedIndex: 0
        }
    },
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        todaysClasses(){
            return this.$store.getters['todaysClasses']
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
        updateClass(classes){
            this.$navigateTo(UpdateClass, { props: {
                    classes: classes
                    }
            })
        },
        createBooking(){
            this.$navigateTo(CreateClass)
        },
        deleteClass(id){
            confirm({
                title: "Delete class",
                message: "Are you sure you want to remove this class?",
                okButtonText: "Delete",
                cancelButtonText: "Cancel"
            }).then(result => {
                if (result){
                    this.$store.dispatch('removeClass', id)
                    .then((res) => {
                        this.$store.dispatch('getTodaysClassesForAdmin');
                    })
                    .catch((err) => {
                        alert('Something has gone wrong. Please try again')
                    })
                }
            });
        },
        viewClassInfo(classes){
            this.$navigateTo(ClassInformation, {
                props: {
                    classes: classes
                }
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
    .cardBtn{
        background: black;
        color: white;
        width: 95%;
        padding: 20;
        margin-top: 15;
        margin-bottom: 10;
    }
</style>