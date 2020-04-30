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
                <!-- Non editable -->
                <Label class="h4" text="Name:" />
                <TextField :text="name" class="form-input" isEnabled="false"/>
                <Label class="h4" text="Username:" />
                <TextField text="Username" class="form-input" isEnabled="false"/>
                <!-- Editable -->
                <Label class="h4" text="Date of Birth:" />
                <TextField v-model="dob" class="form-input"/>
                <Label class="h4" text="Mobile number:" />
                <TextField v-model="mobileNumber" keyboardType="phone" class="form-input"/>
                <Label class="h4" text="Height:" />
                <TextField v-model="height" keyboardType="number" class="form-input"/>
                <Label class="h4" text="Weight:" />
                <TextField v-model="weight" keyboardType="number" class="form-input"/>
                <Label class="h4" text="Your weight goal:" />
                <TextField v-model="weightGoal" keyboardType="number" class="form-input"/>
                <Label class="h4" text="Action Plan:" />
                <TextField v-model="actionPlan" keyboardType="number" class="form-input"/>

                <Button text="Update profile" @tap="createBooking" class="cardBtn"/>
            </StackLayout>
        </RadSideDrawer>
        </ScrollView>
    </Page>
</template>

<script >
import App from '../screens/Home.vue'
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
    computed: {
        name(){
            return this.$store.getters['name']
        },
        username(){
            return `Welcome, ${this.$store.getters['username']}`
        }
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
</style>
