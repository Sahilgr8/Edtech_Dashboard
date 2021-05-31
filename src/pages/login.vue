<template>
      <q-layout class=" tw-bg-gray-300">
        <q-page class=" flex flex-center">
          <q-card class=" tw-h-98 xs:tw-w-70 sm::tw-w-96 md:tw-w-100 tw-shadow-md">
            <div class=" tw-text-center tw-text-2xl tw-font-medium tw-p-4 tw-bg-blue-600 tw-text-white"><q-icon name="school" class=" tw-mr-2" size="40px"/>EDTECH LOGIN</div>
              <q-tabs
                v-model="tab"
                inline-label
                class="bg-grey-3 text-grey-7"
                active-color="primary"
                indicator-color="primary"
                align="justify"
              >
                <q-tab name="admin" label="ADMIN" icon="admin_panel_settings"/>
                <q-tab name="student" label="STUDENT"  icon="person"/>
              </q-tabs>
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="admin" class=" tw-p-8">
                    <q-form @submit="validateAdmin()">
                      <q-input class=" tw-mt-3" placeholder="Enter your username *" label="Username"  v-model="aUser" type="text" :rules="[val => !!val || 'Field is required']">
                        <template v-slot:append>
                          <q-icon
                            name="mail_outline"
                          />
                        </template>
                      </q-input>
                      <q-input placeholder="Enter your password *" label="Password" v-model="aPass" :type="isPwd ? 'password' : 'text'" class=" tw-mt-4" :rules="[val => !!val || 'Field is required']">
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                      <q-btn type="submit" icon="login" label="LOGIN" color="green" class=" tw-float-right tw-mt-6 tw-mb-4"/>
                    </q-form>
                </q-tab-panel>

                <q-tab-panel name="student" class=" tw-p-8">
                  <q-form @submit="validateStudent()">
                    <q-input class=" tw-mt-3" placeholder="Enter your username" label="Username" v-model="sUser" type="text" :rules="[val => !!val || 'Field is required']">
                      <template v-slot:append>
                          <q-icon
                            name="mail_outline"
                          />
                        </template>
                    </q-input>
                    <q-input placeholder="Enter your password" label="Password" v-model="sPass" :type="isPwd1 ? 'password' : 'text'" class=" tw-mt-4" :rules="[val => !!val || 'Field is required']">
                      <template v-slot:append>
                          <q-icon
                            :name="isPwd1 ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd1 = !isPwd1"
                          />
                        </template>
                    </q-input>
                    <q-btn type="submit" icon="login" label="LOGIN" color="green" class=" tw-float-right tw-mt-6 tw-mb-4"/>
                  </q-form>
                </q-tab-panel>
              </q-tab-panels>
          </q-card>
        </q-page>
      </q-layout>
</template>

<script>
export default {
    name:'login',
    data(){
        return{
            isPwd: true,
            isPwd1: true,
            tab:'admin',
            aUser:'admin',
            aPass:'admin',
            sUser:'student',
            sPass:'student'
        }
    },
    methods:{
      validateAdmin(){
        if(this.aUser!='admin' || this.aPass!='admin'){
          this.$q.notify({
                        color: 'red',
                        textColor: 'white',
                        icon: 'error',
                        message: 'Invalid Credentials ! Please try again .'
                    })
        }else{
          this.$store.commit("setAuthentication",true)
          this.$router.replace({name:'admin'})
          this.$q.notify({
                        color: 'green',
                        textColor: 'white',
                        icon: 'verified',
                        message: 'Login Successful'
                    })
        }
      },
      validateStudent(){
        if(this.sUser!='student' || this.sPass!='student'){
          this.$q.notify({
                        color: 'red',
                        textColor: 'white',
                        icon: 'error',
                        message: 'Invalid Credentials ! Please try again .'
                    })
        }else{
          this.$store.commit("setAuthentication",true)
          this.$router.replace({name:'student'})
          this.$q.notify({
                        color: 'green',
                        textColor: 'white',
                        icon: 'verified',
                        message: 'Login Successful'
                    })
        }
      }
    }
}
</script>