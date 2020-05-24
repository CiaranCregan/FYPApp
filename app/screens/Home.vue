<template>
    <Page>
            <ActionBar>
                <GridLayout class="nav" width="100%" columns="auto, *">
                    <Image v-if="showMenu" src="~/Images/menu.png" stretch="fill" width="30 " @tap="openSidebar"/>
                    <Label class="title" :text="username" col="1" />
                </GridLayout>
            </ActionBar>
            <PullToRefresh @refresh="refreshList">
                <ScrollView>
                    <RadSideDrawer ref="drawer">
                        <StackLayout ~drawerContent backgroundColor="#d9544d">
                            <!-- ADMIN LINKS WILL GO IN HERE -->
                            <AdminHomeLinks v-if="isAdmin" />
                            <!-- CITIZEN LINKS WILL GO IN HERE -->
                            <CitizenHomeLinks v-if="!isAdmin" />
                        </StackLayout>
                        <StackLayout ~mainContent class="main-content">
                            <!-- ADMIN SECTION WILL GO IN HERE -->
                            <Admin v-if="isAdmin"/>
                            <!-- CITIZEN SECTION WILL GO IN HERE -->
                            <Citizen v-if="!isAdmin"/>
                        </StackLayout>
                    </RadSideDrawer>
                </ScrollView>
            </PullToRefresh>
    </Page>
</template>

<script >
import AdminHomeLinks from '../components/SidebarLinks/AdminHome.vue'
import CitizenHomeLinks from '../components/SidebarLinks/CitizenHome.vue'
import Admin from '../Flows/Admin.vue'
import Citizen from '../Flows/Citizen.vue'
import Login from './Login.vue'
// import Classes from '../screens/Classess.vue'
  export default {
    data() {
      return {
        showMenu: true
      }
    },
    components: {
        AdminHomeLinks, CitizenHomeLinks, Admin, Citizen
    },
    computed: {
        isAdmin(){
            return this.$store.getters['isAdmin']
        },
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        firstBooking(){
            return this.$store.getters['firstUserBooking']
        },
        bookings(){
            return this.$store.getters['bookings']
        }
    },
    mounted () {
        if(this.$store.getters['accessToken'] === ''){
            this.$navigateTo(Login, {clearHistory: true})
        };
    },
    created () {
        this.$store.dispatch('getUserInformation');
    },
    methods: {
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
            // this.showMenu = false
        },
        closeSidebar(){
            this.$refs.drawer.nativeView.closeDrawer();
            this.showMenu = true
        },
        refreshList(args) {
            let pullRefresh = args.object;
            let self = this
            setTimeout(function() {
                self.$store.dispatch('getTodaysBookingsForAdmin');
                self.$store.dispatch('getTodaysClassesForAdmin');
                pullRefresh.refreshing = false
            }, 1000);
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
        refresh(){
            this.$store.dispatch('getUserInformation')
        }
    },
  }
</script>

<style>
    ActionBar {
        background: green;
        color: #fff;
    }
    .title {
        text-align: left;
        padding-left: 16;
    }
    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 22;
    }
    .border-props {
        margin-top: 10;
        padding: 20;
        border-width: 3;
        border-color: #ededed;
        border-radius: 50;
    }
    .border{
        margin-top: 10;
        border-width: 5 0 0 0;
        border-color: #ededed;
    }
    .main-content{
        width: 100%;
        height: auto;
    }
 
</style>
