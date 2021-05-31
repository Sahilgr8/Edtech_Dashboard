<template>
    <q-page class="q-pa-md tw-bg-gray-300">
        <q-card>
            <q-card-section>
    <q-table
      grid
      title="List of Teachers"
      :data="data"
      :columns="columns"
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
                <div>
                    <div class=" tw-opacity-50 tw-font-medium tw-text-xs">Teacher's Name</div>
                <div class=" tw-text-card">{{props.row.name}}</div>
                <div class=" tw-opacity-50 tw-font-medium tw-text-xs">Class</div>
                <div class=" tw-text-card">{{props.row.class}}
                    <q-popup-edit v-model="props.row.class">
                        <q-input v-model="props.row.class" dense autofocus counter/>
                    </q-popup-edit>
                </div>
                <div class=" tw-opacity-50 tw-font-medium tw-text-xs">Subjects Taught</div>
                <div class=" tw-text-card"> {{props.row.subjects}}
                    <q-popup-edit v-model="props.row.subjects">
                        <q-input v-model="props.row.subjects" dense autofocus counter/>
                    </q-popup-edit>
                </div>
                <div class=" tw-opacity-50 tw-font-medium tw-text-xs">Divisions</div>
                <div class=" tw-text-card">{{props.row.div}}
                    <q-popup-edit v-model="props.row.div">
                        <q-input v-model="props.row.div" dense autofocus counter/>
                    </q-popup-edit></div></div>
                <div><q-btn icon="delete_outlined" class=" tw--mr-8" flat @click="remove(props.row.name)"/></div>
                    </div>
              </q-card-section>
            </q-card>

      </template>
    </q-table>
            </q-card-section>
        </q-card>
    <q-dialog v-model="show">
        <q-card>
            <q-card-section>
                <div class=" tw-text-gray-900 tw-font-bold tw-text-lg m-2">Enter New Teacher's Details</div>
                <div class=" tw-grid tw-grid-cols-1 tw-gap-2 tw-mt-2">
                <div><q-input outlined dense label="Enter Teacher's Name *" type="text" v-model="name"/></div>
                <div><q-input outlined dense label="Class *" type="text" v-model="clas"/></div>
                <div><q-input outlined dense label="Subjects Taught *" type="text" v-model="sub"/></div>
                <div><q-input outlined dense label="Divisions *" type="text" v-model="div"/></div>
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn icon="save" label="save" color="green" @click="save()" dense/>
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
            pagination: {
                rowsPerPage:10
            },
            filter:'',
            data:[{id:1,name:'Sushma Singh',class:'5',subjects:"Maths , Science ",div:"A , D"},{id:2,name:'Shilpa Joslin',class:'5',subjects:"English , Hindi",div:"A , D"},{id:3,name:'Nidhi Vyas',class:'5',subjects:"Maths , Science",div:"B , C"},{id:4,name:'Jyoti Patil',class:'5',subjects:"Maths , Science ",div:"A , D"},{id:5,name:'Anil Tiwari',class:'5',subjects:"English , Hindi",div:"A , D"},{id:6,name:'Suraj Vyas',class:'5',subjects:"Maths , Science",div:"B , C"}],
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
            div:'',
            clas:'',
            sub:''
        }
    },
    methods:{
        remove(id){
            this.data =  this.data.filter(e=>e.name!=id)
        },
        save(){
            let a={}
            a["name"]=this.name
            a["class"]=this.clas
            a["subjects"]=this.sub
            a["div"]=this.div
            this.data.push(a)
            this.show=false
        }
    }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 229px
</style>