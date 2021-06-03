<template>
    <q-page class=" tw-bg-gray-300">
        <div class=" tw-p-4">
            <div class=" tw-flex tw-flex-row tw-justify-between"><div class=" tw-text-xl tw-font-bold tw-text-gray-800 tw-pl-3 tw-pt-2">ANALYTICS</div>
            <div><q-select outlined dense v-model="subject" :options="subjects" @input="changeData()" class=" tw-mb-3 tw-w-40 tw-bg-white"/></div></div>
            <div class=" tw-grid tw-grid-cols-2 tw-gap-4">
            <div class=" tw-col-span-2"><q-table :columns="column" :data="performance_data" title="Test Performance" :rows-per-page-options="false">
                <template v-slot:body-cell-correct="props">
                    <q-td :props="props">
                        <q-badge class=" tw-bg-green-600">
                            {{props.value}}
                        </q-badge>
                    </q-td>
                </template>
                <template v-slot:body-cell-wrong="props">
                    <q-td :props="props">
                        <q-badge class=" tw-bg-red-600">
                            {{props.value}}
                        </q-badge>
                    </q-td>
                </template>
            </q-table></div>
                <div class=" tw-h-96"><q-card><q-card-section class=" tw-h-96"><IEcharts :option="performanceChart" :resizable="true"/></q-card-section></q-card></div>
                <div v-if="subject!='ALL'"><q-card><q-card-section class=" tw-h-96"><IEcharts :option="testChart" :resizable="true"/></q-card-section></q-card></div>
                <div v-else><q-card><q-card-section class=" tw-h-96"><AllTest :testData1="testData1" :testData2="testData2" :testData3="testData3" :testData4="testData4" :testData5="testData5" :testData6="testData6"/></q-card-section></q-card></div>
            </div>
        </div>
    </q-page>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js';
import AllTest from './AllTestChart.vue'
export default {
    name:'studentAnalytics',
    components:{IEcharts,AllTest},
    data(){
        return{
            no_of_tests:[],
            testData:[],
            good:0,
            above_avg:0,
            below_avg:0,
            subject:'ALL',
            subjects:['ALL','Maths','Science','English','Hindi','Social Studies'],
            column:[
                {
                name: 'subject',
                required: true,
                label: "Subjects",
                align: 'left',
                field: row => row.subject,
                format: val => `${val}`,
                },
                { name:'test', align: 'center', label: 'Tests', field: 'test'},
                { name: 'Marks', label: 'Marks', field: 'Marks',align:'center',sortable:true},
                { name: 'correct', label: 'No Of Correct Answers', field: 'correct',align:'center'},
                { name: 'wrong', label: 'No Of Wrong Answers', field: 'wrong',align:'center'}
            ],
            performance_data:[],
            data:[{test:'Test 1',subject:'Maths',Marks:60,correct:6,wrong:4},{test:'Test 2',subject:'Maths',Marks:50,correct:5,wrong:5},{test:'Test 3',subject:'Maths',Marks:45,correct:3,wrong:7},{test:'Test 4',subject:'Maths',Marks:90,correct:9,wrong:1},{test:'Test 5',subject:'Maths',Marks:80,correct:8,wrong:2},{test:'Test 6',subject:'Maths',Marks:100,correct:10,wrong:0},
            {test:'Test 1',subject:'Science',Marks:70,correct:7,wrong:3},{test:'Test 2',subject:'Science',Marks:90,correct:9,wrong:1},{test:'Test 3',subject:'Science',Marks:40,correct:4,wrong:6},
            {test:'Test 1',subject:'English',Marks:90,correct:9,wrong:1},{test:'Test 2',subject:'English',Marks:70,correct:7,wrong:3},{test:'Test 3',subject:'English',Marks:55,correct:5,wrong:5},{test:'Test 4',subject:'English',Marks:100,correct:10,wrong:0},{test:'Test 5',subject:'English',Marks:65,correct:6,wrong:4},
            {test:'Test 1',subject:'Hindi',Marks:90,correct:9,wrong:1},{test:'Test 2',subject:'Hindi',Marks:75,correct:8,wrong:2},
            {test:'Test 1',subject:'Social Studies',Marks:60,correct:7,wrong:3},{test:'Test 2',subject:'Social Studies',Marks:95,correct:9,wrong:1},{test:'Test 3',subject:'Social Studies',Marks:75,correct:7,wrong:3}]
        }
    },
    computed:{
        performanceChart(){
            return {
                media:[{
                    query:{minWidth:200},
                    option:{
                        series:[{
                            label:{
                                show:false
                            }
                        }]
                    }
                },{
                    query:{minWidth:470},
                    option:{
                         series:[{
                            label:{
                                show:true
                            }
                        }]
                    }
                }],
                title:{
                    text:'Overall Tests Performance'
                },
                legend: {
                    bottom:12
                },
                tooltip:{},
                series: [
                    {
                        name: 'Students Performance',
                        type: 'pie',
                        radius: [48, 96],
                        center: ['50%', '50%'],
                        label:{
                            show:true,
                            // formatter:'{b} : {d}',
                            fontSize:14
                        },
                        data: [
                            {value:this.good, name: 'Good'},
                            {value:this.above_avg, name: 'Above average'},
                            {value:this.below_avg, name: 'Below average'}
                        ]
                    }
                ]
            }
        },
        testChart(){
            return{
                title: {
                    text: 'Test Details',
                },
                tooltip: {
                },
                legend: {
                    data:[this.subject],
                    top:'bottom'
                },
                xAxis: [
                    {
                        type: 'category',
                        data:this.no_of_tests,
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
                        name:this.subject,
                        type:'bar',
                        data:this.testData
                    }
                ]
            }
        },
        
    },
    methods:{
        changeData(){
            if(this.subject=='ALL'){
                this.performance_data=this.data
                let td1=[]
                let td2=[]
                let td3=[]
                let td4=[]
                let td5=[]
                let td6=[]
                let mark=0
                for(let i=0;i<this.performance_data.length;i++){
                    mark=mark+this.performance_data[i].Marks
                    if(this.performance_data[i].test=='Test 1'){
                        td1.push(this.performance_data[i].Marks)
                    }else if(this.performance_data[i].test=='Test 2'){
                        td2.push(this.performance_data[i].Marks)
                    }else if(this.performance_data[i].test=='Test 3'){
                        td3.push(this.performance_data[i].Marks)
                    }else if(this.performance_data[i].test=='Test 4'){
                        td4.push(this.performance_data[i].Marks)
                    }else if(this.performance_data[i].test=='Test 5'){
                        td5.push(this.performance_data[i].Marks)
                    }else if(this.performance_data[i].test=='Test 6'){
                        td6.push(this.performance_data[i].Marks)
                    }
                }
                this.testData1=td1
                this.testData2=td2
                this.testData3=td3
                this.testData4=td4
                this.testData5=td5
                this.testData6=td6
                let avgMark=mark/this.performance_data.length
                let aavg=0
                let bavg=0
                let gd=0
                for(let i=0;i<this.performance_data.length;i++){
                    if(this.performance_data[i].Marks>=avgMark && this.performance_data[i].Marks<80){
                        aavg=aavg+1
                    }else if(this.performance_data[i].Marks<avgMark && this.performance_data[i].Marks>=40){
                        bavg=bavg+1
                    }else if(this.performance_data[i].Marks>=80){
                        gd=gd+1
                    }
                }
                this.above_avg=aavg
                this.below_avg=bavg
                this.good=gd
            }else if(this.subject!='ALL'){
                this.performance_data=this.data.filter(e=>e.subject==this.subject)
                let nt=[]
                let td=[]
                let mark=0
                for(let i=0;i<this.performance_data.length;i++){
                    mark=mark+this.performance_data[i].Marks
                    nt.push(this.performance_data[i].test)
                    td.push(this.performance_data[i].Marks)
                }
                this.no_of_tests=nt
                this.testData=td
                let avgMark=mark/this.performance_data.length
                let aavg=0
                let bavg=0
                let gd=0
                for(let i=0;i<this.performance_data.length;i++){
                    if(this.performance_data[i].Marks>=avgMark && this.performance_data[i].Marks<90){
                        aavg=aavg+1
                    }else if(this.performance_data[i].Marks<avgMark && this.performance_data[i].Marks>=40){
                        bavg=bavg+1
                    }else if(this.performance_data[i].Marks>=90){
                        gd=gd+1
                    }
                }
                this.above_avg=aavg
                this.below_avg=bavg
                this.good=gd
            }
        }
    },
    created(){
        this.performance_data=this.data
        let td1=[]
        let td2=[]
        let td3=[]
        let td4=[]
        let td5=[]
        let td6=[]
        let mark=0
        for(let i=0;i<this.performance_data.length;i++){
            mark=mark+this.performance_data[i].Marks
            if(this.performance_data[i].test=='Test 1'){
                td1.push(this.performance_data[i].Marks)
            }else if(this.performance_data[i].test=='Test 2'){
                td2.push(this.performance_data[i].Marks)
            }else if(this.performance_data[i].test=='Test 3'){
                td3.push(this.performance_data[i].Marks)
            }else if(this.performance_data[i].test=='Test 4'){
                td4.push(this.performance_data[i].Marks)
            }else if(this.performance_data[i].test=='Test 5'){
                td5.push(this.performance_data[i].Marks)
            }else if(this.performance_data[i].test=='Test 6'){
                td6.push(this.performance_data[i].Marks)
            }
        }
        this.testData1=td1
        this.testData2=td2
        this.testData3=td3
        this.testData4=td4
        this.testData5=td5
        this.testData6=td6
        let avgMark=mark/this.performance_data.length
        let aavg=0
                let bavg=0
                let gd=0
                for(let i=0;i<this.performance_data.length;i++){
                    if(this.performance_data[i].Marks>=avgMark && this.performance_data[i].Marks<90){
                        aavg=aavg+1
                    }else if(this.performance_data[i].Marks<avgMark && this.performance_data[i].Marks>=40){
                        bavg=bavg+1
                    }else if(this.performance_data[i].Marks>=90){
                        gd=gd+1
                    }
                }
                this.above_avg=aavg
                this.below_avg=bavg
                this.good=gd
    },
}
</script>