<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>All Users</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click.stop="addUserDialog"
              >
                Add User
              </v-btn>

              <!-- create User form -->
              <v-form ref="uform">
                <modal
                  mdalTitle="Add New User"
                  :dialog="dialog"
                  @closeDialog="closeDialog"
                >
                  <!-- content -->
                  <template v-slot:content>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Name"
                          type="text"
                          v-model="form.name"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Email"
                          type="text"
                          v-model="form.email"
                          :rules="emailRules"
                        ></v-text-field>
                        <small style="color: red" v-if="errors['email']">
                          {{ errors["email"][0] }}
                        </small>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Password"
                          type="password"
                          v-model="form.password"
                          :rules="passwordRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Confirm Password"
                          type="password"
                          v-model="form.confirmPassword"
                          :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                            :items="rolesFormat"
                            label="Role"
                            v-model="form.role_id"
                            item-text="text"
                            item-value="value"
                            :rules="[v => !!v || 'Role is required']"
                            dense
                        ></v-select>
                      </v-col>
                    </v-row>
                  </template>
                  <!-- content end -->

                  <!-- action btn -->
                  <template v-slot:acton>
                    <v-btn
                      color="green white--text darken-1"
                      success
                      @click.prevent="addUser"
                      type="submit"
                    >
                      Submit
                    </v-btn>
                  </template>
                  <!-- action btn end -->
                </modal>
              </v-form>
              <!-- create User form end -->

              <!-- edit User form -->
              <v-form ref="ueform">
                <modal
                  mdalTitle="Edit User"
                  :dialog="editDialouge"
                  @closeDialog="closeEditDialog"
                >
                  <!-- content -->
                  <template v-slot:content>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Name"
                          type="text"
                          v-model="form.name"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Email"
                          type="text"
                          v-model="form.email"
                          :rules="emailRules"
                        ></v-text-field>
                        <small style="color: red" v-if="errors['email']">
                          {{ errors["email"][0] }}
                        </small>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                            :items="rolesFormat"
                            label="Role"
                            v-model="form.role_id"
                            item-text="text"
                            item-value="value"
                            :rules="[v => !!v || 'Role is required']"
                            dense
                        ></v-select>
                      </v-col>
                    </v-row>
                  </template>
                  <!-- content end -->

                  <!-- action btn -->
                  <template v-slot:acton>
                    <v-btn
                      color="green white--text darken-1"
                      success
                      @click.prevent="updateUser"
                      type="submit"
                    >
                      Update
                    </v-btn>
                  </template>
                  <!-- action btn end -->
                </modal>
              </v-form>
              <!-- edit User form end -->

              <!-- delete User modal -->
              <delete-modal
                :dialogDelete="dialogDelete"
                @closeDeleteDialog="closeDeleteDialog"
              >
                <template v-slot:deleteContent>
                  Are you sure you want to delete this User?
                </template>
                <template v-slot:deleteAction>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                </template>
              </delete-modal>
              <!-- delete User end -->
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editUser(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteUserDialog(item.id)">
              mdi-delete
            </v-icon>
          </template>

          <template v-slot:no-data>
            <v-simple-table>
                <template v-slot:default>
                <tbody>
                    <tr>
                        <td colspan="4">No Data Found</td>
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
    dialog: false,
    editDialouge: false,
    dialogDelete: false,
    form: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role_id: "",
    },
    nameRules: [(v) => !!v || "Name is required"],
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [(v) => !!v || "Password is required"],
    confirmPasswordRules: [(v) => !!v || "Confirm Password is required"],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Email",
        align: "start",
        sortable: false,
        value: "email",
      },
      {
        text: "Role",
        align: "start",
        sortable: false,
        value: "role.name",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    errors: {},
    user_id: "",
  }),
  created() {
    this.userList();
    this.roleList();
  },

  methods: {

    async userList() {
      try {
        let { data } = await this.$axios.get("/user");
        if (!data.error) {
          this.$store.dispatch("user/userList", data.data);
        } else {
          console.log("Something Went Wrong");
        }
      } catch (e) {
        console.log(e);
      }
    },
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

    async addUser() {
      if (this.$refs.uform.validate()) {
        try {
          let { data } = await this.$axios.post("/user", this.form);
          if (!data.error) {
            this.userList();
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

    async editUser(id) {
      this.user_id = id;
      this.editDialouge = true;
      try {
        let { data } = await this.$axios.get(`/user/${this.user_id}`);
        if (!data.error) {
          this.form = data.data;
        } else {
          console.log("Something Went Wrong");
        }
      } catch (err) {
        console.log(err);
      }
      
    },

    async updateUser() {
      if (this.$refs.ueform.validate()) {
        try {
          let { data } = await this.$axios.put(
            `/user/${this.form.id}`,
            this.form
          );
          if (!data.error) {
            this.userList();
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
        let { data } = await this.$axios.delete(`/user/${this.user_id}`);

        if (!data.error) {
          this.userList();
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
      this.form.email = "";
      this.form.password = "";
      this.form.confirmPassword = "";
      this.form.role_id = "";
      this.$refs.uform.reset();
    },

    editClear() {
      this.form = {};
      this.$refs.ueform.reset();
    },

    addUserDialog() {
      this.dialog = true;
    },

    deleteUserDialog(id) {
      this.dialogDelete = true;
      this.user_id = id;
    },

    closeDeleteDialog() {
      this.dialogDelete = false;
    },

    closeDialog() {
      this.dialog = false;
      this.errors = {};
      this.$refs.uform.reset();
    },

    closeEditDialog() {
      this.editDialouge = false;
      this.errors = {};
      this.$refs.ueform.reset();
    },

  },
  computed: {
    ...mapGetters({
      users: "user/getUsers",
    }),
    ...mapGetters({
      roles: "role/getRoles",
    }),
    rolesFormat() {
      const allRoles = [];
      this.roles.map((role) => {
        let data = {
          text: role.name,
          value: role.id,
        };
        allRoles.push(data);
      });
      return allRoles;
    },
     passwordConfirmationRule() {
      return () =>
        this.form.password === this.form.confirmPassword || "Password must match";
    }
  },
};
</script>

<style></style>
