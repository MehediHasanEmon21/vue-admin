let permissionResources = [
    {
      resourceName: "Dashboard",
      read: false,
      write: false,
      update: false,
      delete: false,
      name: "/admin/dashboard",
    },
    {
      resourceName: "Role",
      read: false,
      write: false,
      update: false,
      delete: false,
      name: "/admin/role",
    },
    {
      resourceName: "AssignRole",
      read: false,
      write: false,
      update: false,
      delete: false,
      name: "/admin/assign-role",
    },
  ]

  let defaultpermissionResources = [
    {
      resourceName: "Dashboard",
      read: false,
      write: false,
      update: false,
      delete: false,
      name: "/admin/dashboard",
    },
    {
      resourceName: "Role",
      read: false,
      write: false,
      update: false,
      delete: false,
      name: "/admin/role",
    },
    {
      resourceName: "AssignRole",
      read: false,
      write: false,
      update: false,
      delete: false,
      name: "/admin/assign-role",
    },
  ]

  export { permissionResources, defaultpermissionResources }