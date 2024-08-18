<script setup lang="ts">
import { usePermissionsStore } from '@/stores/permissions';
import { onMounted, ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useUsersStore } from '@/stores/users';
import router from '@/router';
import Permission from '@/entities/Permission';

const permissionStore = usePermissionsStore()
const userStore = useUsersStore()
const loading = ref(false)
onMounted(async function () {
  if (userStore.userView === null) {
    return router.push({ name: 'users.index' });
  }

  await loadPermissions(1);
});

const filter = ref('');
const totalPerPage = ref(50);

const loadPermissions = async (page: number = 1) => {
  loading.value = true;
  await permissionStore.getPaginate(page, filter.value, totalPerPage.value).finally(() => loading.value = false);
}

const hasPermission = (permissionName: string): boolean => {
  let hasPermission = false;
  userStore.userView?.permissions.forEach((permission: any) => {
    if (permission.name === permissionName) {
      hasPermission = true;
    }
  })

  return hasPermission;
}

const handleCheckboxChange = (permission: Permission, event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.checked) {
    userStore.addPermissionOfUser(permission);
    return;
  }
  userStore.removePermissionOfUser(permission);
}

const syncPermissions = () => {
  loading.value = true
  userStore.syncPermissions().then(() => {
    router.push({ name: 'users.index' })
  }).finally(() => loading.value = false)
}

</script>

<template>
  <h2 class="mt-4 text-4xl font-extrabold">Permissões do Usuário {{ userStore.userView?.name }}</h2>

  <div v-if="loading">Carregando...</div>

  <form action="#" method="get" @submit.prevent="loadPermissions(1)" class="flex mt-4">
    <input type="text" name="filter" placeholder="Filtrar" v-model="filter" class="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker">
    <select name="totalPerPage" v-model="totalPerPage" class="px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker">
      <option value="4">4</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <button type="submit" class="p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal">Filtrar</button>
  </form>

  <div class="mt-4 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            Name</th>
          <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            Descricão</th>
          <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        <tr v-for="permission in permissionStore.permissions" :key="permission.id">
          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{{
            permission.name }}</td>
          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{{
            permission.description }}</td>
          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
            <input type="checkbox" :checked="hasPermission(permission.name)" @click="handleCheckboxChange(permission, $event)">
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <form action="#" method="post" @submit.prevent="syncPermissions">
        <button type="submit" :disabled="loading" class="w-full px-4 py-2 mt-4 font-bold text-white border-b-4 rounded bg-slate-500 hover:bg-slate-400 border-slate-700 hover:border-slate-500">
          <span v-if="loading">Enviando...</span>
          <span v-else>Sincronizar Permissões</span>
        </button>
      </form>
    </div>
  </div>

  <pagination-component :data="permissionStore.meta" @loadPage="loadPermissions"></pagination-component>
</template>
