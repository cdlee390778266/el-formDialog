<template>
  <div id="app">
    <el-button @click="dialog.visible = true">打开</el-button>
    <ElFormDialog
      ref="formDialog"
      :labelPosition="dialog.top"
      :visible="dialog.visible"
      :type="dialog.type"
      title="注册设备"
      :formConfirg="dialog.formConfirg"
      :formData="dialog.data"
      @closedialog="dialog.visible = false"
      @onsubmit=""
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      dialog: {
        top: "",
        visible: false,
        isLoading: false,
        type: "add",
        title: "模态框",
        labelPosition: "top",
        formConfirg: [
          {
            type: "input",
            key: "name",
            label: "设备名称",
            required: true,
            span: 24,
            placeholder: "请输入设备名称",
            style: "width: 100%",
          },
          {
            type: "select",
            key: "projectId",
            label: "归属项目",
            required: true,
            span: 24,
            placeholder: "请选择项目归属",
            style: "width: 100%",
            optionLabelKey: "name",
            optionValueKey: "id",
            options: [],
            changeFnKey: "changeProject",
          },
          {
            type: "select",
            key: "productId",
            label: "归属产品",
            required: true,
            span: 24,
            placeholder: "请选择产品归属",
            style: "width: 100%",
            optionLabelKey: "name",
            optionValueKey: "id",
            options: [],
            attrsObj: {
              label: "设备属性",
              key: "attrs",
              typeObj: {
                key: "",
                value: "",
              },
            },
          },

          {
            type: "textarea",
            key: "describe",
            label: "描述",
            span: 24,
            rows: 4,
            maxlength: 200,
            disabled: false,
            placeholder: "请输入描述",
            style: "width: 100%",
          },
          {
            type: "input",
            key: "_location_",
            label: "经纬度",
            span: 24,
            placeholder: "请选择",
            style: "width: 100%",
            click: this.checkMark,
          },
        ],
        formData: {},
        addAttrs: [],
        onsubmit: () => {},
      },
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
}
</style>
