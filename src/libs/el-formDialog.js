import ElFormDialog from "./el-formDialog.vue";
import ElFormChen from './el-form-chen.vue';

ElFormDialog.install = function (Vue) {
  Vue.component(ElFormDialog.name, ElFormDialog)
  Vue.component(ElFormChen.name, ElFormChen)
}

export default ElFormDialog
