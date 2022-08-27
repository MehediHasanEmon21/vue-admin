<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title> Assign Role </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select
                  :items="rolesFormat"
                  label="Role"
                  v-model="roleId"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  @change="changeRole"
                ></v-select>
              </v-col>
              <v-col cols="6"></v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <thead class="primary">
                      <tr>
                        <th>Resource</th>
                        <th>Read</th>
                        <th>Write</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(r, index) in resources" :key="index">
                        <td>{{ r.resourceName }}</td>
                        <td><v-checkbox v-model="r.read"></v-checkbox></td>
                        <td><v-checkbox v-model="r.write"></v-checkbox></td>
                        <td><v-checkbox v-model="r.update"></v-checkbox></td>
                        <td><v-checkbox v-model="r.delete"></v-checkbox></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <div class="d-flex justify-end mr-5">
                  <v-btn @click.prevent="assignRole" color="success">
                    Assign
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { permissionResources, defaultpermissionResources } from "../../helper/data";
export default {
  name: "AssignRole",
  data() {
    return {
      resources: permissionResources,
      defaultResources: defaultpermissionResources,
      roleId: null,
    };
  },
  created() {
    this.roleList();
  },
  methods: {
    async roleList(id = 0) {
      try {
        let { data } = await this.$axios.get("/role");
        if (!data.error) {
          this.$store.dispatch("role/roleList", data.data);

          const index = id;
          const role = data.data[index];
          this.roleId = role.id;
          this.checkDefaultResourceExists(JSON.parse(role.permissions));
          
        } else {
          console.log("Something Went Wrong");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async assignRole() {
      try {
        let { data } = await this.$axios.post("/assign-role", {
          resources: JSON.stringify(this.resources),
          id: this.roleId,
        });
        if (!data.error) {
          this.checkDefaultResourceExists(JSON.parse(data.data.permissions));
          let findIndex = this.roles.findIndex((role) => data.data.id == role.id);
          this.roleList(findIndex);
          this.changeDeaultResourcesStatus();
          this.$root.vtoast.show({message: data.message, color: 'success'});
        } else {
          console.log("Something Went Wrong");
        }
      } catch (e) {
        console.log(e);
      }
    },
    changeRole() {
      const selectRole = this.roles.find((role) => role.id == this.roleId);
      this.checkDefaultResourceExists(JSON.parse(selectRole.permissions));
    },
    changeDeaultResourcesStatus(){
      this.defaultResources.map((res) => {
        res.read = false;
        res.write = false;
        res.update = false;
        res.delete = false;
      })
    },
    checkDefaultResourceExists(permissions){
      if (!permissions) {
        this.resources = this.defaultResources;
      } else {
        this.resources = permissions;
      }
    }
   
  },

  computed: {
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
  },
};
</script>

<style>
</style>