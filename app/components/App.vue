<template>
    <Page>
        <!-- <ActionBar> -->
            <!-- <ActionBar :title="username" @tap="$refs.drawer.nativeView.showDrawer()"> -->
                <!-- <ActionItem @tap="onScan"
                    ios.systemIcon="15" ios.position="left"
                    text="scan" android.position="popup">
                </ActionItem> -->
                <!-- <ActionItem @tap="onScan"
                    ios.systemIcon="15" ios.position="right"
                    text="scan" android.position="popup">
                </ActionItem>
            </ActionBar> -->
            <!-- <GridLayout width="100%" columns="auto, *, auto">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="username"  col="1"/>
                <ActionItem tap="onScan"
                    ios.systemIcon="15" ios.position="right"
                    text="delete" android.position="popup">
                </ActionItem>
            </!--> 
        <!-- </ActionBar> -->

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Image src="https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/68552254_2454309237996011_5327587307811766272_n.jpg?_nc_cat=103&_nc_ohc=W1IbRi9OR3UAX_xTibT&_nc_ht=scontent-lht6-1.xx&oh=ae30324059657845a02a53b29d658d70&oe=5E926E39" stretch="fill" width="100%" height="250"/>

                <Label class="drawer-item" text="Item 1"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>

            <StackLayout ~mainContent class="main-content">
                <FlexboxLayout flexDirection="column" class="hero-container">
                    <Label class="body" textWrap="true">Next up: {{ firstBooking }} </Label>
                </FlexboxLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
import actionBar from '../components/actionBar.vue'
  export default {
      components: {
          actionBar,
      },
    data() {
      return {
        msg: 'Hello World!'
      }
    },
    computed: {
        firstBooking(){
            return this.$store.getters['firstUserBooking']
        },
        bookings(){
            return this.$store.getters['bookings']
        }
    },
    created () {
        this.$store.dispatch('getUserInformation');;
    },
    methods: {
        onScan() {
            alert({
                title: "Are you sure you want to scan?",
                message: "This will open your phone's camera",
                okButtonText: "Ok"
            }).then(() => {
                console.log("Alert dialog closed");
            });
        }
    },
  }
</script>

<style scoped>
    Page{
        background: red;
    }
    ActionBar {
        background: red;
        color: #fff;
    }
    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: red;
        color: #000;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
    .main-content{
        width: 100%;
        height: 300;
    }
    .hero-container{
        width: 100%;
        height:100%;
        background: #fff;
        padding: 20;
        border-radius: 0 0 0 30;
    }
    .hero-content{
        color: #333;
    }
</style>
