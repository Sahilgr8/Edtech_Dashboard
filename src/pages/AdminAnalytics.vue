<template>
    <q-page class=" tw-bg-gray-300">
        <div class=" tw-grid xs:tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-p-4">
            <div class=" xs:tw-col-span-1 md:tw-col-span-2">
                <q-table :data="top_students_data" :columns="columns" title="TOP 5 STUDENTS" :rows-per-page-options="false">
                    <template v-slot:top-right>
                        <q-select :options="classes" label="Class" class=" xs:tw-w-full md:tw-w-40 xs:tw-mt-2 md:tw-mt-0 xs:tw-mr-0 md:tw-mr-2" @input="changeData()" v-model="clas" outlined dense/>
                        <q-select :options="subjects" label="Subjects" class=" xs:tw-w-full md:tw-w-40 xs:tw-mt-2 md:tw-mt-0" @input="changeData()" v-model="subject" outlined dense/>
                    </template>
                </q-table>
            </div>
            <div><q-card><q-card-section class=" tw-h-96">
                <q-toolbar class=" tw--mt-2">
                        <q-toolbar-title class=" tw-font-bold tw-text-gray-700">
                           Overall Student Performance
                        </q-toolbar-title>
                    </q-toolbar><IEcharts class=" tw--mt-8" :option="performanceChart" :resizable="true"/></q-card-section></q-card></div>
            <div >
                <q-card>
                <q-card-section class=" tw-h-96">
                    <q-toolbar class=" tw--mt-2">
                        <q-toolbar-title class=" tw-font-bold tw-text-gray-700">
                           Test Details
                        </q-toolbar-title>
                        <q-select @input="changeChartData()" label="Class" dense outlined v-model="classs" class=" tw-w-40" :options="classes" />
                        <q-select @input="changeChartData()" label="Subjects" dense outlined v-model="subChart" class=" tw-ml-2 tw-w-40" :options="subjects" />
                    </q-toolbar>
                    <div v-if="this.subChart!='ALL'">
                    <IEcharts class=" tw--mt-1" style="height:320px" :option="testBar" :resizable="true"/></div>
                    <div v-else><AllChart  class=" tw--mt-1" :test1="test1" :test2="test2" :test3="test3"/></div></q-card-section></q-card></div>
                    <div class=" xs:tw-col-span-1 md:tw-col-span-2">
                        <q-table :data="bottom_students_data" :columns="columns" title="BOTTOM 5 STUDENTS" :rows-per-page-options="false">
                            <template v-slot:top-right>
                                <q-select :options="classes" label="Class" class=" xs:tw-w-full md:tw-w-40 xs:tw-mt-2 md:tw-mt-0 xs:tw-mr-0 md:tw-mr-2" @input="changeDataBot()" v-model="clasBot" outlined dense/>
                                <q-select :options="subjects" label="Subjects" class=" xs:tw-w-full md:tw-w-40 xs:tw-mt-2 md:tw-mt-0" @input="changeDataBot()" v-model="subjectBot" outlined dense/>
                            </template>
                        </q-table>
                    </div>
            <div class=" xs:tw-col-span-1 md:tw-col-span-2"><q-card><q-card-section class=" tw-h-80"><IEcharts :option="totalTests" :resizable="true"/></q-card-section></q-card></div>
        </div>
    </q-page>
</template>


<script>

import IEcharts from 'vue-echarts-v3/src/full.js';
import AllChart from './allChart.vue'
import studentDetails from 'src/assets/student_details.json'

export default {
    name:'adminAnalytics',
    components:{IEcharts,AllChart},
    data(){
        return{
            data:studentDetails,
            top_students_data:[],
            bottom_students_data:[],
            all_data:[],
            test1:[],
            test2:[],
            test3:[],
            below_avg:0,
            above_avg:0,
            good:0,
            // division:['ALL','A','B','C','D','E'],
            subjects:['ALL','Maths','Science','English','Hindi','Social Studies'],
            classes:['First','Second','Third','Fourth','Fifth'],
            classs:'First',
            clas:'First',
            subject:'ALL',
            subChart:'ALL',
            clasBot:'First',
            subjectBot:'ALL',
            // div:'ALL',
            testData:[],
            classData:[],
            columns: [
                {
                name: 'name',
                required: true,
                label: "Student's Name",
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                },
                { name: 'class', align: 'center', label: 'Class', field: 'class', sortable: true },
                { name: 'div', label: 'Division', field: 'div',align:'center'},
                { name: 'maths', label: 'Maths Marks', field: 'maths',align:'center'},
                { name: 'science', label: 'Science Marks', field: 'science',align:'center'},
                { name: 'english', label: 'English Marks', field: 'english',align:'center'},
                { name: 'hindi', label: 'Hindi Marks', field: 'hindi',align:'center'},
                { name: 'social', label: 'Social Studies Marks', field: 'social',align:'center'}
            ],
            col:[
                {
                name: 'subject',
                required: true,
                label: "Subjects",
                align: 'left',
                field: row => row.subject,
                format: val => `${val}`,
                },
                { name:'total', align: 'center', label: 'Total Tests', field: 'total'},
                { name: 'conducted', label: 'Total Tests Conducted', field: 'conducted',align:'center'}
            ],
            test_data:[{subject:'Maths',total:10,conducted:3},{subject:'Science',total:10,conducted:3},{subject:'English',total:6,conducted:3},{subject:'Hindi',total:6,conducted:3},{subject:'Social Studies',total:8,conducted:3}],
            total_tests:[],
            conducted_tests:[]
        }
    },
    methods:{
        changeData(){

            if(this.subject!='ALL' ){
                if(this.subject=='Maths'){
                    this.top_students_data=this.all_data.sort((a,b)=>b.maths-a.maths).filter(e=>e.class==this.clas).slice(0,5)
                }else if(this.subject=='Science'){
                    this.top_students_data=this.all_data.sort((a,b)=>b.science-a.science).filter(e=>e.class==this.clas).slice(0,5)
                }else if(this.subject=='English'){
                    this.top_students_data=this.all_data.sort((a,b)=>b.english-a.english).filter(e=>e.class==this.clas).slice(0,5)
                }else if(this.subject=='Hindi'){
                    this.top_students_data=this.all_data.sort((a,b)=>b.hindi-a.hindi).filter(e=>e.class==this.clas).slice(0,5)
                }else if(this.subject=='Social Studies'){
                    this.top_students_data=this.all_data.sort((a,b)=>b.social-a.social).filter(e=>e.class==this.clas).slice(0,5)
                }
            }else if(this.subject=='ALL' ){
                this.top_students_data=this.all_data.sort((a,b)=>b.total-a.total).filter(e=>e.class==this.clas).slice(0,5)
            }
        },
        changeDataBot(){
            if(this.subjectBot!='ALL' ){
                if(this.subjectBot=='Maths'){
                    this.bottom_students_data=this.all_data.sort((a,b)=>a.maths-b.maths).filter(e=>e.class==this.clasBot).slice(0,5)
                }else if(this.subjectBot=='Science'){
                    this.bottom_students_data=this.all_data.sort((a,b)=>a.science-b.science).filter(e=>e.class==this.clasBot).slice(0,5)
                }else if(this.subjectBot=='English'){
                    this.bottom_students_data=this.all_data.sort((a,b)=>a.english-b.english).filter(e=>e.class==this.clasBot).slice(0,5)
                }else if(this.subjectBot=='Hindi'){
                    this.bottom_students_data=this.all_data.sort((a,b)=>a.hindi-b.hindi).filter(e=>e.class==this.clasBot).slice(0,5)
                }else if(this.subjectBot=='Social Studies'){
                    this.bottom_students_data=this.all_data.sort((a,b)=>a.social-b.social).filter(e=>e.class==this.clasBot).slice(0,5)
                }
            }else if(this.subjectBot=='ALL' ){
                this.bottom_students_data=this.all_data.sort((a,b)=>a.total-b.total).filter(e=>e.class==this.clasBot).slice(0,5)
            }
        },
        changeChartData(){
            if(this.classs=='First'){
                this.test1=[64.8,69.8,70.8,70.7,69.5]
                this.test2=[70.4,70.1,70.3,70.2,71.1]
                this.test3=[69.5,68.2,69,70.2,70.1]
            }
            else if(this.classs=='Second'){
                this.test1=[74.6,82.3,66.7,90.3,74]
                this.test2=[70.6,78.3,80.7,89.3,79]
                this.test3=[71.6,86.3,69.7,94.3,80.3]
            }else if(this.classs=='Third'){
                this.test1=[79.6,87.3,62.7,92.3,79]
                this.test2=[64.6,82.3,66.7,90.3,74]
                this.test3=[74.6,87.3,86.7,90.3,64]
            }else if(this.classs=='Fourth'){
                this.test1=[64.6,62.3,66.7,70.3,74]
                this.test2=[84.6,89.3,76.7,80.3,54]
                this.test3=[64.6,72.3,86.7,70.3,64]
            }else if(this.classs=='Fifth'){
                this.test1=[84.6,82.3,66.7,90.3,74]
                this.test2=[74.6,87.3,76.7,80.3,78]
                this.test3=[63.6,81.3,69.7,84.3,83]
            }
            this.classData=this.data.filter(e=>e.class==this.classs)
                    if(this.subChart=='Maths'){
                        let d1=0
                        let d2=0
                        let d3=0
                        let d4=[]
                        for(let i=0;i<this.classData.length;i++){
                            d1=d1+this.classData[i].maths
                            d2=d2+this.classData[i].maths2
                            d3=d3+this.classData[i].maths3
                        }
                        d4.push(d1/this.classData.length)
                            d4.push(d2/this.classData.length)
                            d4.push(d3/this.classData.length)
                            this.testData=d4
                    }else if(this.subChart=='Science'){
                            let d1=0
                            let d2=0
                            let d3=0
                            let d4=[]
                            for(let i=0;i<this.classData.length;i++){
                            d1=d1+this.classData[i].science
                            d2=d2+this.classData[i].science2
                            d3=d3+this.classData[i].science3
                            }
                            d4.push(d1/this.classData.length)
                            d4.push(d2/this.classData.length)
                            d4.push(d3/this.classData.length)
                            this.testData=d4
                        }else if(this.subChart=='English'){
                            let d1=0
                            let d2=0
                            let d3=0
                            let d4=[]
                            for(let i=0;i<this.classData.length;i++){
                            d1=d1+this.classData[i].english
                            d2=d2+this.classData[i].english2
                            d3=d3+this.classData[i].english3
                            }
                            d4.push(d1/this.classData.length)
                            d4.push(d2/this.classData.length)
                            d4.push(d3/this.classData.length)
                            this.testData=d4
                        }else if(this.subChart=='Hindi'){
                            let d1=0
                            let d2=0
                            let d3=0
                            let d4=[]
                            for(let i=0;i<this.classData.length;i++){
                            d1=d1+this.classData[i].hindi
                            d2=d2+this.classData[i].hindi2
                            d3=d3+this.classData[i].hindi3
                            }
                            d4.push(d1/this.classData.length)
                            d4.push(d2/this.classData.length)
                            d4.push(d3/this.classData.length)
                            this.testData=d4
                        }else if(this.subChart=='Social Studies'){
                            let d1=0
                            let d2=0
                            let d3=0
                            let d4=[]
                            for(let i=0;i<this.classData.length;i++){
                                d1=d1+this.classData[i].social
                                d2=d2+this.classData[i].social2
                                d3=d3+this.classData[i].social3
                            }
                            d4.push(d1/this.classData.length)
                            d4.push(d2/this.classData.length)
                            d4.push(d3/this.classData.length)
                            this.testData=d4
                        }
                
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
                    text:'200',
                    subtext:'Total Students',
                    top:'center',
                    right:'center'
                },
                legend: {
                    bottom:12
                },
                tooltip:{},
                series: [
                    {
                        name: 'Students Performance',
                        type: 'pie',
                        radius: [54, 100],
                        center: ['50%', '50%'],
                        label:{
                            show:true,
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
        testBar(){
            return{
                tooltip: {
                },
                legend: {
                    data:[this.subChart],
                    top:'bottom'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Test 1','Test 2','Test 3'],
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
                        name:this.subChart,
                        type:'bar',
                        data:this.testData
                    }
                ]
            }
        },
        totalTests(){
            return{
                title: {
                    text: 'Total Tests',
                },
                tooltip: {
                },
                legend: {
                    data:['Total Tests','Conducted Tests'],
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
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name:'Total Tests',
                        type:'bar',
                        data:this.total_tests
                    },
                    {
                        name:'Conducted Tests',
                        type:'bar',
                        data:this.conducted_tests
                    }
                ]
            }
        }
    },
    created(){
        for(let i=0;i<this.test_data.length;i++){
            if(this.test_data[i].subject=='Maths'){
                    this.conducted_tests.push(this.test_data[i].conducted)
                    this.total_tests.push(this.test_data[i].total)
                }else if(this.test_data[i].subject=='Science'){
                    this.conducted_tests.push(this.test_data[i].conducted)
                    this.total_tests.push(this.test_data[i].total)
                }else if(this.test_data[i].subject=='English'){
                    this.conducted_tests.push(this.test_data[i].conducted)
                    this.total_tests.push(this.test_data[i].total)
                }else if(this.test_data[i].subject=='Hindi'){
                    this.conducted_tests.push(this.test_data[i].conducted)
                    this.total_tests.push(this.test_data[i].total)
                }else if(this.test_data[i].subject=='Social Studies'){
                    this.conducted_tests.push(this.test_data[i].conducted)
                    this.total_tests.push(this.test_data[i].total)
                }
        }

        let sumMaths1=0
        let sumScience1=0
        let sumHindi1=0
        let sumEnglish1=0
        let sumSocial1=0

        let gd=0
        let bavg=0
        let aavg=0
        for(let i=0;i<this.data.length;i++){
            sumMaths1=sumMaths1+this.data[i].maths
            sumScience1=sumScience1+this.data[i].science
            sumHindi1=sumHindi1+this.data[i].hindi
            sumEnglish1=sumEnglish1+this.data[i].english
            sumSocial1=sumSocial1+this.data[i].social

            let dat={}
            dat["name"]=this.data[i].name
            dat["class"]=this.data[i].class
            dat["div"]=this.data[i].div
            dat["maths"]=this.data[i].maths
            dat["science"]=this.data[i].science
            dat["english"]=this.data[i].english
            dat["hindi"]=this.data[i].hindi
            dat["social"]=this.data[i].social
            dat["total"]=(this.data[i].maths+this.data[i].social+this.data[i].hindi+this.data[i].english+this.data[i].science)/5
            this.all_data.push(dat)
        }
        this.test1=[64.8,69.8,70.8,70.7,69.5]
        this.test2=[70.4,70.1,70.3,70.2,71.1]
        this.test3=[69.5,68.2,69,70.2,70.1]

        let avg1=(sumMaths1/this.data.length+sumScience1/this.data.length+sumHindi1/this.data.length+sumEnglish1/this.data.length+sumSocial1/this.data.length)/5
        for(let j=0;j<this.data.length;j++){
            let sum=(this.data[j].maths+this.data[j].science+this.data[j].hindi+this.data[j].english+this.data[j].social)/5
            if( sum >= avg1  && sum<80){
                aavg=aavg+1
            }else if(sum<avg1 && sum>=40){
                bavg=bavg+1
            }else if(sum>=80){
                gd=gd+1
            }
        }
        this.good=gd
        this.below_avg=bavg
        this.above_avg=aavg

        this.top_students_data=this.all_data.sort((a,b)=>b.total-a.total).filter(e=>e.class=='First').slice(0,5)
        this.bottom_students_data=this.all_data.sort((a,b)=>a.total-b.total).filter(e=>e.class=='First').slice(0,5)
    }
}
</script>