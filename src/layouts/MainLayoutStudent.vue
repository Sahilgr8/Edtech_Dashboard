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

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="230"
      class=" tw-bg-white tw-text-gray-800"
    >
    <div class=" bg-primary tw-text-white tw-h-13 tw-text-lg tw-font-medium tw-text-center tw-pt-3 tw-border-r tw-border-white"><router-link to="/">INCENTIUS</router-link></div>
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
        <!-- <q-item
        clickable
        exact
        class=" hover:tw-text-blue-700"
        to="/adminAnalytics"
      >
              <q-item-section
                avatar
              >
                <q-icon name="analytics" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Analytics</q-item-label>
              </q-item-section>
        </q-item> -->
        <!-- <q-item
        clickable
        class=" hover:tw-text-blue-700"
        to="/filemaster"
      >
              <q-item-section
                avatar
              >
                <q-icon name="source" />
              </q-item-section>

              <q-item-section>
                <q-item-label>File Master</q-item-label>
              </q-item-section>
              
        </q-item> -->
        <!-- <q-item
        clickable
        class=" hover:tw-text-blue-700"
        to="/mdm"
      >
              <q-item-section
                avatar
              >
                <q-icon name="rate_review" />
              </q-item-section>

              <q-item-section>
                <q-item-label>MDM Review</q-item-label>
              </q-item-section>
              
        </q-item> -->
        <!-- <q-item
        clickable
        class=" hover:tw-text-blue-700"
        to="/mdmrequest"
      >
              <q-item-section
                avatar
              >
                <q-icon name="published_with_changes" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Change Request</q-item-label>
              </q-item-section>
              
        </q-item> -->
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
  }
}
</script>
