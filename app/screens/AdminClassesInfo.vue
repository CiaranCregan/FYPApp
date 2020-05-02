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
                        <Label text="Clients that are booked into this class:" class="card"/>
                        <StackLayout height="2" backgroundColor="Black" class="divider"></StackLayout>
                        <Label text="No clients attending..." class="card" v-if="confirmsForThisClass.length == 0"/>
                        <card-view margin="10" col="1" row="1" backgroundColor="green" v-for="(going, index) in confirmsForThisClass" :key="index">
                            <StackLayout>
                                <Label :text="`${going[0].name}`" class="card"/>
                            </StackLayout>
                        </card-view>
            </StackLayout>
        </RadSideDrawer>
        </ScrollView>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
import CitizenClasses from '../screens/CitizenClasses.vue'

  export default {
      props: ['classes'],
    data() {
        return {
     
        }
    },
    computed: {
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        },
        confirmsForThisClass(){
            return this.$store.getters['getConfirmsForClass']
        }
    },
    created (){
        this.$store.dispatch('getConfimsForThisClass', this.classes.id);
    },
    methods: {
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
        },
        redirect(screen){
            switch(screen) {
                case 'Home':
                    this.$navigateTo(App, {clearHistory: true})
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
