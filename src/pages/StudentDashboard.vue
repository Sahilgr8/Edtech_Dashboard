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
          <q-card><q-card-section class=" tw-h-98"><IEcharts :option="barTests" :resizable="true"/></q-card-section></q-card>
        </div>
        <div class=" xs:tw-col-span-1 md:tw-col-span-2">
          <q-card><q-card-section class=" tw-h-98"><IEcharts :option="avgMarks" :resizable="true"/></q-card-section></q-card>
        </div>
      </div>
  </q-page>
</template>

<script>

import IEcharts from 'vue-echarts-v3/src/full.js';

export default {
  name: 'PageIndex',
  components:{IEcharts},
  data(){
    return{
      total_tests:0,
      attempted_tests:0,
      data:[{subject:'Maths',total:10,attempted:6},{subject:'Science',total:10,attempted:3},{subject:'English',total:6,attempted:5},{subject:'Hindi',total:6,attempted:2},{subject:'Social Studies',total:8,attempted:3}]
    }
  },
  computed:{
    barTests(){
            return{
              media:[{query:{minWidth:256,maxWidth:320},option:{xAxis:{axisLabel:{interval:1}}}}],
                title: {
                    text: 'Test Details',
                },
                tooltip: {
                },
                legend: {
                    data:['Total Tests','Total Tests Attempted'],
                    top:'bottom'
                },
                xAxis: [
                    {
                        type: 'category',
                        data:['Maths','Science','English','Hindi','Social Studies'],
                        axisLabel:{
                            interval:0
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                    }
                ],
                series: [
                    {
                        name:'Total Tests',
                        type:'bar',
                        data:[10,10,6,6,8]
                    },{
                        name:'Total Tests Attempted',
                        type:'bar',
                        data:[6,3,5,2,3]
                    }
                    // ,{
                    //     name:'Average Marks',
                    //     type:'bar',
                    //     data:[70.83,72,71.66,80,77.5]
                    // }
                ]
            }
        },
        avgMarks(){
            return{
              media:[{query:{minWidth:256,maxWidth:320},option:{xAxis:{axisLabel:{interval:1}}}}],
                title: {
                    text: 'AVG Marks',
                },
                tooltip: {
                },
                xAxis: [
                    {
                        type: 'category',
                        data:['Maths','Science','English','Hindi','Social Studies'],
                        axisLabel:{
                            interval:0
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min:0,
                        max:100,
                        interval:25,
                        axisLabel:{
                          formatter:'{value} %'
                        }
                    }
                ],
                color:['#73c0de'],
                series: [
                  {
                        name:'Average Marks',
                        type:'bar',
                        data:[70.83,72,71.66,80,77.5],
                    }
                ]
            }
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
