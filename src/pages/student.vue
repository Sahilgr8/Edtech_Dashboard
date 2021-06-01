<template>
    <q-page class=" tw-bg-gray-300 tw-p-4">
        <q-table title="List Of Students" :data="data" :columns="columns" :rows-per-page-options="false">
            <template v-slot:top-right>
                <q-btn icon="add" label="NEW STUDENT" @click="show1=true" color="primary" class=" tw-mr-4" flat/>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template v-slot:body-cell-action="props">
                <q-td :props="props"><q-btn icon-right="edit" class=" tw-mr-4" @click="edit(props.value)" color="green" dense /><q-btn icon-right="delete" color="red-5" @click="del(props.value)" dense /></q-td>
            </template>
        </q-table>
        <q-dialog v-model="show1">
            <q-card style="max-width: 1500px;width:800px;height:380px">
            <q-card-section>
                <div class=" tw-text-gray-900 tw-font-bold tw-text-lg m-2 tw-mb-5">Enter New Student's Details</div>
                <div class=" tw-grid tw-grid-cols-1 tw-gap-1">
                <div><q-input outlined dense label="Enter Student Name *" type="text" v-model="sname" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"/></div>
                <div><q-select outlined dense label="Select Class *" v-model="sclas" :options="classList"/></div>
                <div><q-input outlined dense label="Enter Mobile Number *" type="text" class=" tw-mt-5" v-model="smob" lazy-rules :rules="[ val => val.length==10 || 'Please type valid mobile number']"/></div>
                <div><q-select outlined dense label="Select Division *" v-model="sdiv" :options="divList"/></div>
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn icon="save" label="save" class=" tw-mr-2" color="green" @click="addNew()"/>
            </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="show">
            <q-card style="max-width: 1500px;width:800px;height:380px">
            <q-card-section>
                <div class=" tw-text-gray-900 tw-font-bold tw-text-lg tw-mb-5">Edit Student Detail</div>
                <div class=" tw-grid tw-grid-cols-1 tw-gap-1">
                <div><q-input outlined dense label="Student Name *" type="text" v-model="name" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"/></div>
                <div><q-select outlined dense label="Class *" v-model="clas" :options="classList"/></div>
                <div><q-input outlined dense label="Mobile Number *" class="tw-mt-5" v-model="mob" lazy-rules :rules="[ val => val.length==10 || 'Please type valid mobile number']"/></div>
                <div><q-select outlined dense label="Division *" v-model="div" :options="divList"/></div>
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn icon="save" label="save" class=" tw-mr-2" color="green" @click="save()"/>
            </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>

import studentDetails from 'src/assets/student_details.json'

export default {
    name:'student',
    data(){
        return{
            show1:false,
            show:false,
            filter:'',
            act:0,
            name:'',
            clas:'',
            mob:'',
            div:'',
            sname:'',
            sclas:null,
            smob:'',
            sdiv:'',
            classList:[1,2,3,4,5,6,7,8,9,10],
            divList:['A','B','C','D','E'],
            data:studentDetails,
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
                { name: 'mobile', label: 'Mobile Number', field: 'mobile',align:'center'},
                { name: 'div', label: 'Division', field: 'div',align:'center'},
                {name:'action',label:'Action',field:'action',align:'center'}
            ],
        }
    },
    methods:{
        del(val){
            this.data=this.data.filter(e=>e.action!=val)
            this.$q.notify({
                        color: 'red',
                        textColor: 'white',
                        icon: 'delete',
                        message: 'Record Deleted'
                    })
        },
        edit(val){
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].action==val){
                    this.name=this.data[i].name
                    this.mob=this.data[i].mobile
                    this.clas=this.data[i].class
                    this.div=this.data[i].div
                    this.act=val
                }
            }
            this.show=true
        },
        save(){
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].action==this.act){
                    this.data[i].name=this.name
                    this.data[i].mobile=this.mob
                    this.data[i].class=this.clas
                    this.data[i].div=this.div
                    this.data[i].action=this.act
                }
            }
            this.show=false
            this.$q.notify({
                        color: 'green',
                        textColor: 'white',
                        icon: 'edit',
                        message: 'Record Edited Successfully'
                    })
        },
        addNew(){
            if(this.sname!='' && this.sclas!=null && this.smob!=0 && this.sdiv!=null){
                let a={}
                a["name"]=this.sname
                a["class"]=this.sclas
                a["mobile"]=this.smob
                a["div"]=this.sdiv
                a["action"]=this.data[this.data.length-1].action+1
                this.data.push(a)
                this.show1=false
                this.$q.notify({
                        color: 'green',
                        textColor: 'white',
                        icon: 'saved',
                        message: 'Record Added Successfully .'
                    })
            }
            else{
                this.$q.notify({
                        color: 'red',
                        textColor: 'white',
                        icon: 'error',
                        message: 'Oops !!! Please fill in all the required details to save .'
                    })
            }
        }
    },
}
</script>