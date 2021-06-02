<template>
  <q-page class="tw-bg-gray-300 q-pa-md">
      <div class=" tw-grid xs:tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
        <div>
          <q-card class=" tw-bg-blue-700 tw-text-white">
            <q-card-section>
              <div class=" tw-flex tw-flex-row tw-justify-between">
                <div>
                  <div class=" tw-mb-2 tw-font-medium tw-text-base">Total Tests Assigned</div>
                  <div class=" tw-text-lg">{{total_tests}}</div>
                </div>
                <div class=" tw-pt-2"><q-icon size="40px" name="assignment" /></div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div>
          <q-card class=" tw-bg-green-600 tw-text-white">
            <q-card-section>
              <div class=" tw-flex tw-flex-row tw-justify-between">
                <div>
                  <div class=" tw-mb-2 tw-font-medium tw-text-base">Total Tests Attempted</div>
                  <div class=" tw-text-lg">{{attempted_tests}}</div>
                </div>
                <div class=" tw-pt-2"><q-icon size="40px" name="assignment_turned_in" /></div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class=" xs:tw-col-span-1 md:tw-col-span-2">
          <q-table title="TEST DETAILS" :columns="column" :data="data" hide-bottom/>
        </div>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
      total_tests:0,
      attempted_tests:0,
      column:[
                {
                name: 'subject',
                required: true,
                label: "Subjects",
                align: 'left',
                field: row => row.subject,
                format: val => `${val}`,
                },
                { name:'total', align: 'center', label: 'Total Tests', field: 'total'},
                { name: 'attempted', label: 'Total Tests attempted', field: 'attempted',align:'center'}
            ],
      data:[{subject:'Maths',total:10,attempted:6},{subject:'Science',total:10,attempted:3},{subject:'English',total:6,attempted:5},{subject:'Hindi',total:6,attempted:2},{subject:'Social Studies',total:8,attempted:3}]
    }
  },
  created(){
    for(let i=0;i<this.data.length;i++){
      this.total_tests=this.total_tests+this.data[i].total
      this.attempted_tests=this.attempted_tests+this.data[i].attempted
    }
  }
}
</script>
