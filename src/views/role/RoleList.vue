<template>
  <v-container>
    <v-row>
        <v-col cols="12">

            <v-data-table
                :headers="headers"
                :items="desserts"
                sort-by="calories"
                class="elevation-1"
            >
                <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>All Roles</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click.stop="addRoleDialog"
                        >
                        Add Role
                    </v-btn>

                      <!-- create role form -->
                      <v-form ref="rform">
                        <modal mdalTitle="Add New Role" :dialog="dialog" @closeDialog="closeDialog">
                              <!-- content -->
                              <template v-slot:content>
                                <v-row>
                                  <v-col cols="12">
                                      <v-text-field
                                          label="Role name"
                                          type="text"
                                          v-model="form.name"
                                          :rules="nameRules"
                                      ></v-text-field>
                                  </v-col>
                                </v-row>
                              </template>
                              <!-- content end -->

                              <!-- action btn -->
                              <template v-slot:acton>
                                <v-btn
                                    color="green white--text darken-1"
                                    success
                                    @click.prevent="addRole"
                                    type="submit"
                                >
                                    Submit
                                </v-btn>
                              </template>
                              <!-- action btn end -->

                              </modal>
                      </v-form>
                      <!-- create role form end -->

                    <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
                </template>

                <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="initialize"
                >
                    Reset
                </v-btn>
                </template>

            </v-data-table>

        </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      form: {
          name: '',
      },
      nameRules: [
          v => !!v || 'Name is required',
      ],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      roles: [],
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',

      },
    }),
    created () {
      this.initialize();
    },
  
    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'Super Admin',
          },
          {
            name: 'Admin',
          },
          {
            name: 'Editor',
          },

        ]
      },
      addRoleDialog(){
        this.dialog = true;
      },
      addRole(){
        if(this.$refs.rform.validate()){
            console.log(this.form);
        }
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDialog(){
        this.dialog = false;
      },

      
    },
  }
</script>

<style>

</style>