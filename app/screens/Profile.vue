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
            <StackLayout ~drawerContent backgroundColor="green">
                <Image src="~/Images/profile.png" stretch="fill" width="50%" height="150" class="border-props image-padding"/>
                <Label class="drawer-item border" text="Home" @tap="redirect('Home')"/>
                <Label class="drawer-item" text="Classes" @tap="redirect('Classes')"/>
                <Label class="drawer-item" text="Bookings" @tap="redirect('Bookings')"/>
                <Label class="drawer-item" text="Logout" @tap="logout"/>
            </StackLayout>
            <StackLayout ~mainContent class="content">
                <!-- Non editable -->
                <Label class="h4" text="Name:" />
                <TextField :text="name" class="form-input-disabled" isEnabled="false"/>
                <Label class="h4" text="Username:" />
                <TextField :text="email" class="form-input-disabled" isEnabled="false"/>
                <!-- Editable -->
                <Label class="h4" text="Date of Birth:" />
                <TextField v-model="dob" class="form-input"/>
                <Label class="h4" text="Mobile number:" />
                <TextField v-model="mobileNumber" keyboardType="phone" class="form-input"/>
                <Label class="h4" text="Height:" />
                <TextField v-model="height" class="form-input"/>
                <Label class="h4" text="Weight:" />
                <TextField v-model="weight" class="form-input"/>
                <Label class="h4" text="Your weight goal:" />
                <TextField v-model="weightGoal" class="form-input"/>
                <Label class="h4" text="Action Plan:" />
                <TextView v-model="actionPlan" class="form-input" maxLength="150"/>

                <Button text="Update profile" @tap="updateProfileInformation" class="cardBtn"/>
            </StackLayout>
        </RadSideDrawer>
        </ScrollView>
    </Page>
</template>

<script >
import axios from 'axios'
import App from '../screens/Home.vue'
import Bookings from '../screens/CitizenBookings.vue'
import Classes from '../screens/CitizenClasses.vue'

import Login from '../screens/Login.vue'

  export default {
    data() {
        return {
            dob: '',
            mobileNumber: '',
            height: '',
            weight: '',
            weightGoal: '',
            actionPlan: ''
        }   
    },
    created () {
        let id = this.$store.getters['userId']
        axios.get('http://127.0.0.1:8888/example-project/public/api/user/profile/' + id)
            .then((response) => {
                if (response.data.length > 0){
                    this.dob = response.data[0].dob
                    this.mobileNumber = response.data[0].mobile_number
                    this.height = response.data[0].height
                    this.weight = response.data[0].weight
                    this.weightGoal = response.data[0].goal_weight
                    this.actionPlan = response.data[0].action_plan
                }
            })
            .catch((error) => {
                console.log(error)
        })
    },
    computed: {
        name(){
            return this.$store.getters['name']
        },
        email(){
            return this.$store.getters['email']
        },
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        }
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
        updateProfileInformation(){
            let data = {
                dob : this.dob,
                mobile_number : this.mobileNumber,
                height : this.height,
                weight : this.weight,
                goal_weight : this.weightGoal,
                action_plan : this.actionPlan
            }
            this.$store.dispatch('updateProfileInformation', data)
                .then((res) => {
                    alert({
                        title: "Profile updates",
                        message: "Your profile has been updated successfully",
                        okButtonText: "Ok"
                    }).then(() => {
                        this.$navigateTo(App, {clearHistory: true})
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
                case 'Bookings':
                    this.$navigateTo(Bookings, {clearHistory: true})
                    break;
                case 'Classes':
                    this.$navigateTo(Classes, {clearHistory: true})
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
    .h4{
        font-size: 18;
        margin-top: 10;
        margin-left: 10;
    }
    .cardBtn{
        background: black;
        color: white;
        width: 95%;
        padding: 20;
        margin-top: 15;
        margin-bottom: 10;
    }
    .form-input{
        background: white;
        color: black;
        margin: 10;
        padding: 15;
        width: 95%;
        border-width: 2;
        border-color: #F1F1F1;
        margin-bottom: 10;
    }
    .form-input-disabled{
        background: #F1F1F1;
        color: black;
        margin: 10;
        padding: 15;
        width: 95%;
        border-width: 2;
        border-color: #F1F1F1;
        margin-bottom: 10;
    }
</style>
