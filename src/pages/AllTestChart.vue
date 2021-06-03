<template>
    <IEcharts :option="alltestChart" :resizable="true"/>
</template>

<script>

import IEcharts from 'vue-echarts-v3/src/full.js';
export default {
    name:'allTestChart',
    components:{IEcharts},
    props:{
        testData1:[],
        testData2:[],
        testData3:[],
        testData4:[],
        testData5:[],
        testData6:[]
    },
    computed:{
        alltestChart(){
            return{
                title: {
                    text: 'Test Details',
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    data:['Test 1','Test 2','Test 3','Test 4','Test 5','Test 6'],
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
                        min:0,
                        max:100,
                        interval:25,
                        axisLabel:{
                            formatter:'{value}%'
                        }
                    }
                ],
                series: [
                    {
                        name:'Test 1',
                        type:'bar',
                        data:this.testData1
                    },
                    {
                        name:'Test 2',
                        type:'bar',
                        data:this.testData2
                    },
                    {
                        name:'Test 3',
                        type:'bar',
                        data:this.testData3
                    },
                    {
                        name:'Test 4',
                        type:'bar',
                        data:this.testData4
                    },
                    {
                        name:'Test 5',
                        type:'bar',
                        data:this.testData5
                    },
                    {
                        name:'Test 6',
                        type:'bar',
                        data:this.testData6
                    }
                ]
            }
        },
    }
}
</script>