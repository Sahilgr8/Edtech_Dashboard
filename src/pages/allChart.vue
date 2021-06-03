<template>
    <IEcharts :option="alltestBar" style="height:320px" :resizable="true"/>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js';
export default {
    name:'allChart',
    props:{
        test1:[],
        test2:[],
        test3:[]
    },
    components:{IEcharts},
    computed:{
        alltestBar(){
            return{
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    data: ['Test 1', 'Test 2','Test 3'],
                    top:'bottom'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Maths','Science','English','Hindi','Social Studies'],
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
                series: [
                    {
                        name:'Test 1',
                        type:'bar',
                        data:this.test1
                    },
                    {
                        name:'Test 2',
                        type:'bar',
                        data:this.test2
                    },
                    {
                        name:'Test 3',
                        type:'bar',
                        data:this.test3
                    }
                ]
            }
        }
    }
}
</script>