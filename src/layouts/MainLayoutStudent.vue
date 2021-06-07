<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-icon size="30px" class=" tw-mr-1" name="school"/> EDTech
        </q-toolbar-title>


          <div class=" tw-w-40 cursor-pointer">
              <div class=" tw-flex tw-flex-row hover:tw-bg-blue-600 tw-h-13">
                <div class=" tw-pl-3 tw-mr-3 tw-pt-2"><img src="http://demo.incentius.com/data-investigation-tool-demo/dist/img/user2-160x160.jpg" class=" tw-h-8 tw-w-8 tw-rounded-full"/></div>
                <div class=" tw-text-base tw-pt-3 ">Vera Farlham</div>
              </div>
            <q-menu>
              <div class="tw-w-72 bg-primary tw-h-50">
                
                <div class="  tw-border-t tw-border-white tw-pt-3 tw-pb-3 tw-cursor-pointer"><center><img src="http://demo.incentius.com/data-investigation-tool-demo/dist/img/user2-160x160.jpg" class=" tw-h-20 tw-w-20 tw-rounded-full"/>
                <div class=" tw-text-white tw-text-base tw-mt-3">Vera Farlham</div><div class=" tw-text-white tw-text-xs">Class : 5th  |  Divison : B</div> 
                </center>
                </div>
                <q-separator class=" tw-bg-gray-200"/>
              <div class=" tw-py-2"><center><q-btn class=" tw-bg-gray-200 tw-text-black" @click="logOut()" icon="logout" size="12px" label="Log Out"></q-btn></center></div>
              </div>
            </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="230"
      class=" tw-bg-white tw-text-gray-800"
    >
    <div class=" bg-primary tw-text-white tw-h-13 tw-text-lg tw-font-medium tw-text-center tw-pt-3 tw-border-r tw-border-white">INCENTIUS</div>
      <q-list>
        <q-item
        clickable
        exact
        class=" hover:tw-text-blue-700"
        to="/student"
      >
              <q-item-section
                avatar
              >
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Dashboard</q-item-label>
              </q-item-section>
      </q-item>
          <q-item
        clickable
        exact
        class=" hover:tw-text-blue-700"
        to="/studentAnalytics"
      >
              <q-item-section
                avatar
              >
                <q-icon name="analytics" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Analytics</q-item-label>
              </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: { },
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  methods:{
    logOut(){
      this.$store.commit("setAuthentication",false)
      this.$router.push({name:'login'})
      this.$q.notify({
                        color: 'blue-9',
                        textColor: 'white',
                        icon: 'logout',
                        message:"You've been Logged out"
                    })
    }
  }
}
</script>
