<template>
    <Page>
        <ActionBar>
            <GridLayout class="nav" width="100%" columns="auto, *">
                <Image v-if="showMenu" src="~/Images/menu.png" stretch="fill" width="30" @tap="openSidebar"/>
                <Label class="title" :text="username" col="1" />
            </GridLayout>
        </ActionBar>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="green">
                <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>

                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
                <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
                <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/>
                <Label class="drawer-item" text="Logout" @tap="logout"/>
            </StackLayout>

            <StackLayout ~mainContent class="content">
                <StackLayout v-if="users.length === 0">
                    <Label text="No users have registered yet"/>
                </StackLayout>
                <StackLayout v-else>
                    <card-view margin="10" padding="20" background="green" v-for="(user, index) in users" :key="index" @tap="loadUserBookings(user.id)">
                        <Label :text="user.name" class="card"/>
                    </card-view>
                </StackLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import Bookings from '../screens/Bookings.vue'
import Classes from '../screens/AdminClasses.vue'

import AdminClientsView from '../screens/AdminClientview.vue'

import Login from '../screens/Login.vue'
  export default {
    data() {
        return {
            showMenu: true,
            selectedDate: '',
            selectedTime: ''
        }
    },
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        users(){
            return this.$store.getters['showUsers']
        }
    },
    created () {
        this.$store.dispatch('getAllClients');
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
                .then((res) => {
                    this.$navigateTo(Login, {clearHistory: true})
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
        },
        loadUserBookings(id){
            this.$navigateTo(AdminClientsView, {
                props: {
                    userId: id
                }
            })
        },
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
                    break;
                case 'Bookings':
                    this.$navigateTo(Bookings, {clearHistory: true})
                    break;
                case 'Classes':
                    this.$navigateTo(Classes, {clearHistory: true})
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
    .card{
        margin: 20;
        color: #fff;
        font-size: 20;
    }
    .cardBtn{
        background: black;
        color: white;
        width: 95%;
        padding: 20;
        margin-bottom: 15;
    }
</style>
