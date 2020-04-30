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
                        <card-view margin="10" col="1" row="1" backgroundColor="green">
                            <StackLayout>
                                <Label :text="`There are ${classes.going} people going to this class already`" class="card"/>
                                <WrapLayout backgroundColor="#3c495e">
                                    <Button v-if="!confirmsForThisClass" text="Book Class" width="100%" backgroundColor="orange" class="btn" @tap="bookClass(classes.id, userId)"/>
                                    <Button v-if="confirmsForThisClass" text="Remove Booking" width="100%" backgroundColor="red" class="btn" @tap="removeBooking(classes.id, userId)"/>
                                </WrapLayout>
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
        userId(){
            return this.$store.getters['userId']
        },
        confirmsForThisClass(){
            let going = this.$store.getters['getConfirmsForClass']

            let confirm = going.filter( confirm => confirm.user_id === this.userId )

            // for(var i = 0; i < going.length; i++) {
            //     if (going[i].user_id === this.userId) {
            //         return true
            //     } else {
            //         return false
            //     }
            //     // return false
            // }

            return confirm.length > 0 ? true : false
        }
    },
    created (){
        this.$store.dispatch('getConfimsForThisClass', this.classes.id);
    },
    methods: {
        openSidebar(){
            this.$refs.drawer.nativeView.showDrawer();
        },
        removeBooking(cId, uId){
            let data = {
                class_id: cId,
                user_id: uId
            }
            this.$store.dispatch('removeBooking', data)
            .then(() => {
                alert({
                    title: "Your booking has been removed",
                    message: "Thank you for removing your booking. I am sad to see you go, it would have been an awesome class. You can always book again.",
                    okButtonText: "Ok"
                }).then(() => {
                    this.$navigateTo(CitizenClasses, {clearHistory: true})
                });
            })
            .catch((err) => {
                console.log(err)
            })
        },
        bookClass(cId, uId){
            let data = {
                class_id: cId,
                user_id: uId
            }
            this.$store.dispatch('confirmBooking', data)
            .then(() => {
                alert({
                    title: "Your booking has been confirmed",
                    message: "Thank you for joining this class. This will be an extra workout for you. I'm glad to see",
                    okButtonText: "Ok"
                }).then(() => {
                    this.$navigateTo(CitizenClasses, {clearHistory: true})
                });
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
