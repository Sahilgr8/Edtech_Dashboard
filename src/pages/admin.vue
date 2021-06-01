<template>
    <q-page class="q-pa-md tw-bg-gray-300">
    <q-table
      grid
      title="List of Teachers"
      :data="data"
      :columns="columns"
      class=" tw-bg-white tw-p-3"
      :filter="filter"
      :pagination.sync="pagination"
      :rows-per-page-options="false"
    >
      <template v-slot:top-right>
          <q-btn icon="add" label="NEW TEACHER" color="primary" @click="show=true" class=" tw-mr-2" flat/>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
          <q-card class="my-card tw-m-1">
              <q-card-section>
                <div class=" tw-flex tw-flex-row tw-justify-between">
                    <div class=" tw-cursor-pointer tw-w-96" @click="editDetails(props.row.name)">
                        <div class=" tw-opacity-50 tw-font-medium tw-text-xs">Teacher's Name</div>
                        <div class=" tw-text-card">{{props.row.name}}</div>
                        <div class=" tw-opacity-50 tw-font-medium tw-text-xs">Class</div>
                        <div class=" tw-text-card" v-for="(val,index) in props.row.class" :key="index">
                            <span v-if="index!=props.row.class.length-1" class=" tw-float-left">{{val}} ,&nbsp;</span>
                            <span v-else class=" tw-float-left">{{val}}</span>
                        </div>
                        <div class=" tw-clear-left tw-opacity-50 tw-font-medium tw-text-xs">Subjects Taught</div>
                        <div class=" tw-text-card" v-for="(val,index) in props.row.subjects" :key="index">
                            <span v-if="index!=props.row.subjects.length-1" class=" tw-float-left">{{val}} ,&nbsp;</span>
                            <span v-else class=" tw-float-left">{{val}}</span>
                        </div>
                        <div class=" tw-clear-left tw-opacity-50 tw-font-medium tw-text-xs">Divisions</div>
                        <div class=" tw-text-card" v-for="(val,index) in props.row.div" :key="index">
                            <span v-if="index!=props.row.div.length-1" class=" tw-float-left">{{val}} ,&nbsp;</span>
                            <span v-else class=" tw-float-left">{{val}}</span>
                        </div>
                    </div>
                    <div><q-btn icon="delete_outlined" dense class=" tw--mr-5" flat @click="remove(props.row.name)"/></div>
                </div>
              </q-card-section>
            </q-card>
      </template>
    </q-table>
    <q-dialog v-model="show1">
        <q-card style="max-width: 1500px;width:800px;height:380px">
            <q-card-section>
                <div class=" tw-text-gray-900 tw-font-bold tw-text-lg m-2 tw-mb-5">Edit Teacher Details</div>
                <div class=" tw-grid tw-grid-cols-1 tw-gap-1">
                <div><q-input outlined dense label="Teacher Name *" type="text" v-model="ename" lazy-rules :rules="[ val => val.length>0 || 'Please type something']"/></div>
                <div><q-select outlined dense label="Class *"  v-model="eclas" :options="classList" multiple use-chips/></div>
                <div><q-select outlined dense label="Subjects Taught *" class=" tw-mt-4" v-model="esub" :options="subList" multiple use-chips/></div>
                <div><q-select outlined dense label="Divisions *" class=" tw-mt-4" v-model="ediv" :options="divList" multiple use-chips /></div>
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn icon="save" label="save" class=" tw-mr-2" color="green" @click="save1()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="show">
        <q-card style="max-width: 1500px;width:800px;height:380px">
            <q-card-section>
                <div class=" tw-text-gray-900 tw-font-bold tw-text-lg m-2 tw-mb-5">Enter New Teacher's Details</div>
                <div class=" tw-grid tw-grid-cols-1 tw-gap-1">
                <div><q-input outlined dense label="Enter Teacher's Name *" type="text" v-model="name" lazy-rules :rules="[ val => val.length>0 || 'Please type something']"/></div>
                <div><q-select outlined dense label="Select Class *" v-model="clas" :options="classList" multiple use-chips/></div>
                <div><q-select outlined dense label="Select Subjects Taught *" class=" tw-mt-5" v-model="sub" :options="subList" multiple use-chips/></div>
                <div><q-select outlined dense label="Select Divisions *" class=" tw-mt-5" v-model="div" :options="divList" multiple use-chips /></div>
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn icon="save" label="save" class=" tw-mr-2" color="green" @click="save()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    </q-page>
</template>

<script>
export default {
    name:'admin',
    data(){
        return{
            show:false,
            show1:false,
            pagination: {
                rowsPerPage:10
            },
            classList:[1,2,3,4,5,6,7,8,9,10],
            divList:['A','B','C','D','E'],
            subList:['Maths','Science','English','Hindi','Social Studies'],
            filter:'',
            data:[{id:1,name:'Sushma Singh',class:[5,3],subjects:["Maths","Science"],div:["A","D"]},{id:2,name:'Shilpa Joslin',class:[8,9],subjects:["English","Hindi"],div:["C","E"]},{id:3,name:'Nidhi Vyas',class:[6,10],subjects:["Social Studies","Science"],div:["B","C"]},{id:4,name:'Jyoti Patil',class:[2,3],subjects:["Maths","Science"],div:["A","D"]},{id:5,name:'Anil Tiwari',class:[4,5],subjects:["English","Hindi"],div:["A","D"]},{id:6,name:'Suraj Vyas',class:[7,8],subjects:["Maths","Science"],div:["B","C"]}],
            columns: [
                {
                name: 'name',
                required: true,
                label: "Teacher's Name",
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                },
                { name: 'class', align: 'center', label: 'Class', field: 'class', sortable: true },
                { name: 'subjects', label: 'Subjects Taught', field: 'subjects'},
                { name: 'div', label: 'Divisions', field: 'div' }
            ],
            name:'',
            div:null,
            clas:null,
            sub:null,
            ename:'',
            ediv:'',
            eclas:'',
            esub:'',
            ids:0,
        }
    },
    methods:{
        remove(id){
            this.data =  this.data.filter(e=>e.name!=id)
            this.$q.notify({
                        color: 'red',
                        textColor: 'white',
                        icon: 'delete',
                        message: 'Record Deleted'
                    })
        },
        save(){
            if(this.name!='' && this.clas!=null && this.sub!=null && this.div!=null){
                let a={}
                a["name"]=this.name
                a["class"]=this.clas
                a["subjects"]=this.sub
                a["div"]=this.div
                a["id"]=this.data[this.data.length-1].id+1
                this.data.push(a)
                this.show=false
                this.$q.notify({
                        color: 'green',
                        textColor: 'white',
                        icon: 'save',
                        message: 'Record Added Successfully'
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
        },
        editDetails(name){
            this.show1=true
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].name==name){
                    this.ename=name
                    this.esub=this.data[i].subjects
                    this.eclas=this.data[i].class
                    this.ediv=this.data[i].div
                    this.ids=this.data[i].id
                }
            }
        },
        save1(){
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].id==this.ids){
                    this.data[i].name=this.ename
                    this.data[i].subjects=this.esub
                    this.data[i].class=this.eclas
                    this.data[i].div=this.ediv
                }
            }
            this.show1=false
            this.$q.notify({
                        color: 'green',
                        textColor: 'white',
                        icon: 'edit',
                        message: 'Record Edited Successfully .'
                    })
        }
    }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 238px
</style>