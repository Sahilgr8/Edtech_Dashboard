<template>
    <q-page class=" tw-bg-gray-300">
        <div class=" tw-p-4">
            <q-card class=" tw-w-full tw-bg-blue-700 tw-text-white tw-mb-2 tw-text-base"><q-card-section>ANALYTICS</q-card-section></q-card>
            <q-table :columns="column" :data="performance_data" title="Test Performance" :rows-per-page-options="false">
                <template v-slot:top-right>
                    <q-select outlined dense v-model="subject" :options="subjects" @input="changeData()" class=" xs:tw-mt-2 md:tw-mt-0 tw-w-40"/>
                </template>
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
            </q-table>
        </div>
    </q-page>
</template>

<script>
export default {
    name:'studentAnalytics',
    data(){
        return{
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
    methods:{
        changeData(){
            if(this.subject=='ALL'){
                this.performance_data=this.data
            }else if(this.subject!='ALL'){
                this.performance_data=this.data.filter(e=>e.subject==this.subject)
            }
        }
    },
    created(){
        this.performance_data=this.data
    }
}
</script>