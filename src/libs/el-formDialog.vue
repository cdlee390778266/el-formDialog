<template>
  <div>
    <el-dialog
      top="50px"
      modal-append-to-body
      :title="title || '模态框'"
      :visible="visible"
      :width="width || '800px'"
      :destroyOnClose="destroyOnClose"
      :closeOnClickModal="closeOnClickModal"
      @close="$listeners.closedialog"
    >
      <ElFormChen v-bind="$attrs" v-on="$listeners" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ElFormDialogChen",
  props: {
    visible: {
      // 显示/隐藏
      type: Boolean,
      default: false,
    },
    title: {
      // 标题
      type: String,
      default: "",
    },
    width: {
      // 宽度
      type: String,
      default: "",
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      // 点击遮罩是否关闭弹窗
      type: Boolean,
      default: false,
    },
  },
};
</script>
