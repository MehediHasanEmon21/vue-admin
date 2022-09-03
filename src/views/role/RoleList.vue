<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="roles"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>All Roles</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click.stop="addRoleDialog"
                v-if="isWritePermitted"
              >
                Add Role
              </v-btn>

              <!-- create role form -->
              <v-form ref="rform">
                <modal
                  mdalTitle="Add New Role"
                  :dialog="dialog"
                  @closeDialog="closeDialog"
                >
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
                        <small style="color: red" v-if="errors['name']">
                          {{ errors["name"][0] }}
                        </small>
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

              <!-- edit role form -->
              <v-form ref="reform">
                <modal
                  mdalTitle="Edit Role"
                  :dialog="editDialouge"
                  @closeDialog="closeEditDialog"
                >
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
                        <small style="color: red" v-if="errors['name']">
                          {{ errors["name"][0] }}
                        </small>
                      </v-col>
                    </v-row>
                  </template>
                  <!-- content end -->

                  <!-- action btn -->
                  <template v-slot:acton>
                    <v-btn
                      color="green white--text darken-1"
                      success
                      @click.prevent="updateRole"
                      type="submit"
                    >
                      Update
                    </v-btn>
                  </template>
                  <!-- action btn end -->
                </modal>
              </v-form>
              <!-- edit role form end -->

              <!-- delete role modal -->
              <delete-modal
                :dialogDelete="dialogDelete"
                @closeDeleteDialog="closeDeleteDialog"
              >
                <template v-slot:deleteContent>
                  Are you sure you want to delete this Role?
                </template>
                <template v-slot:deleteAction>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                </template>
              </delete-modal>
              <!-- delete role end -->
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon small v-if="isUpdatePermitted" class="mr-2" @click="editRole(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon small v-if="isDeletePermitted" @click="deleteRoleDialog(item.id)">
              mdi-delete
            </v-icon>
          </template>

          <template v-slot:no-data>
            <v-simple-table>
                <template v-slot:default>
                <tbody>
                    <tr>
                        <td colspan="2">No Data Found</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    snackbar: {
      status: false,
      message: '',
      color: ''
    },
    dialog: false,
    editDialouge: false,
    dialogDelete: false,
    form: {
      name: "",
    },
    nameRules: [(v) => !!v || "Name is required"],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    errors: {},
    roleId: "",
  }),
  created() {
    this.roleList();
  },

  methods: {

    async roleList() {
      try {
        let { data } = await this.$axios.get("/role");
        if (!data.error) {
          this.$store.dispatch("role/roleList", data.data);
        } else {
          console.log("Something Went Wrong");
        }
      } catch (e) {
        console.log(e);
      }
    },

    async addRole() {
      if (this.$refs.rform.validate()) {
        try {
          let { data } = await this.$axios.post("/role", this.form);
          console.log(data);
          if (!data.error) {
            this.roleList();
            this.closeDialog();
            this.clear();
            this.$root.vtoast.show({message: data.message, color: 'success'});
          } else {
            this.$root.vtoast.show({message: data.message, color: 'red'});
          }
        } catch (err) {
          this.errors = err.response.data.errors;
        }
      }
    },

    async editRole(id) {
      this.roleId = id;
      this.editDialouge = true;
      try {
        let { data } = await this.$axios.get(`/role/${this.roleId}`);
        if (!data.error) {
          this.form = data.data;
        } else {
          console.log("Something Went Wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },

    async updateRole() {
      if (this.$refs.reform.validate()) {
        try {
          let { data } = await this.$axios.put(
            `/role/${this.form.id}`,
            this.form
          );
          if (!data.error) {
            this.roleList();
            this.closeEditDialog();
            this.editClear();
            this.$root.vtoast.show({message: data.message, color: 'success'});
          } else {
            this.$root.vtoast.show({message: data.message, color: 'error'});
          }
        } catch (err) {
          console.log(err);
        }
      }
    },

    async deleteItemConfirm() {
      try {
        let { data } = await this.$axios.delete(`/role/${this.roleId}`);

        if (!data.error) {
          this.roleList();
          this.closeDeleteDialog();
          this.$root.vtoast.show({message: data.message, color: 'success'});
        } else {
          this.$root.vtoast.show({message: data.message, color: 'error'});
        }
      } catch (err) {
        console.log(err);
      }
    },

    clear() {
      this.form.name = "";
      this.$refs.reform.reset();
    },

    editClear() {
      this.form = {};
      this.$refs.reform.reset();
    },

    addRoleDialog() {
      this.dialog = true;
    },

    deleteRoleDialog(id) {
      this.dialogDelete = true;
      this.roleId = id;
    },

    closeDeleteDialog() {
      this.dialogDelete = false;
    },

    closeDialog() {
      this.dialog = false;
      this.errors = {};
      this.$refs.rform.reset();
    },

    closeEditDialog() {
      this.editDialouge = false;
      this.errors = {};
      this.$refs.reform.reset();
    },

  },
  computed: {
    ...mapGetters({
      roles: "role/getRoles",
    }),
  },
};
</script>

<style></style>
