<template>
  <div id="app">
    <el-button @click="dialog.visible = true">打开</el-button>
    <ElFormDialog
      ref="formDialog"
      :labelPosition="dialog.top"
      :visible="dialog.visible"
      :type="dialog.type"
      :title="dialog.title"
      :formConfig="dialog.formConfig"
      :formData="dialog.formData"
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
      defaultFormConfig: [
        {
          type: "input", // 控件类型 input/select
          key: "name", // 键名
          label: "输入框", // 控件名称
          required: true, // 是否必须
          span: 12, // 控件整体占用宽度（同col）
          placeholder: "请输入",
          defaultValue: "默认值", // 默认值
          style: "width: 100%", // 控件样式
          disabled: true,
          events: {
            // 事件同el-input事件 https://element.eleme.cn/#/zh-CN/component/input#input-events
            blur: this.handle,
            focus: this.handle,
            change: this.handle,
            input: this.handle,
            clear: this.handle,
          },
        },
        {
          type: "number", // 控件类型 input/select
          key: "code", // 键名
          label: "数字输入框", // 控件名称
          required: true, // 是否必须
          span: 12, // 控件整体占用宽度（同col）
          controls: false,
          placeholder: "请输入",
          defaultValue: "", // 默认值
          style: "width: 100%", // 控件样式
          events: {
            // 事件同el-input事件 https://element.eleme.cn/#/zh-CN/component/input#input-events
            blur: this.handle,
            focus: this.handle,
            change: this.handle,
            input: this.handle,
            clear: this.handle,
          },
        },
        {
          type: "select",
          key: "projectId",
          label: "下拉",
          required: true,
          span: 12,
          placeholder: "请选择",
          style: "width: 100%",
          optionLabelKey: "label",
          optionValueKey: "value",
          options: [
            {
              label: "青岛POC",
              value: 1,
            },
            {
              label: "青烟厂智能安全生产监管平台",
              value: 2,
            },
            {
              label: "D-AIOT平台全局测试",
              value: 3,
            },
          ],
          events: {
            // 事件同el-select事件https://element.eleme.cn/#/zh-CN/component/select#select-events
            change: this.handle,
            "visible-change": this.handle,
            "remove-tag": this.handle,
            blur: this.handle,
            focus: this.handle,
            clear: this.handle,
          },
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
          options: [
            {
              id: 1,
              name: "电机-非直连",
            },
            {
              id: 2,
              name: "ONVIF摄像头",
            },
            {
              id: 3,
              name: "大数据关联产品",
            },
          ],
          addFormConfig: [
            {
              type: "select",
              key: "parentId",
              label: "父级设备",
              required: true,
              span: 24,
              placeholder: "请选择父级设备",
              style: "width: 100%",
              optionLabelKey: "label",
              optionValueKey: "value",
              options: [
                {
                  label: "父级设备",
                  value: 1,
                },
              ],
            },
          ],
          events: {
            change: this.handleProduct,
          },
        },
        {
          type: "checkbox",
          key: "checkbox",
          label: "多选框",
          required: true,
          span: 24,
          placeholder: "请选择",
          style: "width: 100%",
          optionLabelKey: "label",
          optionValueKey: "value",
          defaultValue: [1],
          options: [
            {
              label: "青岛POC",
              value: 1,
            },
            {
              label: "青烟厂智能安全生产监管平台",
              value: 2,
            },
            {
              label: "D-AIOT平台全局测试",
              value: 3,
            },
          ],
        },
        {
          type: "radio",
          key: "radio",
          label: "单选",
          required: true,
          span: 24,
          placeholder: "请选择项目归属",
          style: "width: 100%",
          optionLabelKey: "label",
          optionValueKey: "value",
          defaultValue: 1,
          options: [
            {
              label: "青岛POC",
              value: 1,
            },
            {
              label: "青烟厂智能安全生产监管平台",
              value: 2,
            },
            {
              label: "D-AIOT平台全局测试",
              value: 3,
            },
          ],
          events: {
            // 事件同el-select事件https://element.eleme.cn/#/zh-CN/component/select#select-events
            change: this.handle,
            "visible-change": this.handle,
            "remove-tag": this.handle,
            blur: this.handle,
            focus: this.handle,
            clear: this.handle,
          },
        },
        {
          type: "datetime",
          key: "date",
          label: "日期",
          span: 24,
          rows: 4,
          maxlength: 200,
          disabled: false,
          placeholder: "请选择日期",
          style: "width: 100%",
        },
        {
          type: "switch",
          key: "switch",
          label: "开关",
          span: 24,
          rows: 4,
          maxlength: 200,
          required: true,
          disabled: true,
          placeholder: "请选择",
          style: "width: 100%",
        },
        {
          type: "slider",
          key: "slider",
          label: "滑块",
          span: 24,
          rows: 4,
          maxlength: 200,
          disabled: false,
          placeholder: "请选择",
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
      ],
      dialog: {
        top: "",
        visible: false,
        isLoading: false,
        type: "edit",
        title: "表单模态框",
        labelPosition: "top",
        formConfig: [],
        formData: {},
        addAttrs: [],
        onsubmit: () => {},
      },
    };
  },
  created() {
    this.dialog.formConfig = [...this.defaultFormConfig];
  },
  methods: {
    handle(val, config, index, treatedFormConfig, formData, srcFormData) {},
    // 动态新增/减少控件
    handleProduct(
      val,
      config,
      index,
      treatedFormConfig,
      formData,
      srcFormData
    ) {
      let formConfig = [...this.defaultFormConfig];
      formConfig.splice(index + 1, 0, ...(config.addFormConfig || []));

      this.dialog.formConfig = formConfig;
      this.dialog.formData = formData;
    },
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
