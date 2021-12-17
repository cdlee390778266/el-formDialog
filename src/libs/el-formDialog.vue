<template>
  <div>
    <el-dialog
      top="50px"
      modal-append-to-body
      :title="title || '模态框'"
      :visible="visible"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :width="width || '800px'"
      @close="closedialog"
    >
      <div class="formdialog" v-loading="isLoading">
        <el-form
          :model="form"
          :rules="rules"
          :labelWidth="labelWidth"
          :label-position="labelPosition"
          ref="form"
        >
          <el-row :gutter="20">
            <el-col
              v-for="(config, index) in treatedFormConfig.filter(
                (config) => !config.hidden
              )"
              :key="config.key"
              :span="config.span"
              :style="config.itemStyle || ''"
            >
              <slot
                v-if="config.type === 'slot'"
                :name="config.slotName"
                :$data="$data"
              />
              <div
                v-else-if="config.type === 'text'"
                class="dflex text-left mgb10"
                :style="config.style"
              >
                <div style="width: 140px">
                  <span class="mgr10">{{ config.label }}</span>
                </div>
                <div class="flex"></div>
              </div>

              <el-form-item
                v-else
                :label="`${config.label}`"
                :prop="config.key"
              >
                <el-input
                  v-if="config.type === 'input'"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                />
                <el-input-number
                  v-if="config.type === 'number'"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                />
                <el-input
                  v-if="config.type === 'textarea'"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                >
                </el-input>

                <el-checkbox-group
                  v-if="config.type === 'checkbox'"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                >
                  <el-checkbox
                    v-for="item in config.options"
                    :key="
                      config.optionValueKey
                        ? item[config.optionValueKey]
                        : item.value
                    "
                    :label="
                      config.optionValueKey
                        ? item[config.optionValueKey]
                        : item.value
                    "
                  >
                    {{
                      config.optionLabelKey
                        ? item[config.optionLabelKey]
                        : item.label
                    }}
                  </el-checkbox>
                </el-checkbox-group>

                <el-radio-group
                  v-if="config.type === 'radio'"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                >
                  <el-radio
                    v-for="item in config.options"
                    :key="
                      config.optionValueKey
                        ? item[config.optionValueKey]
                        : item.value
                    "
                    :label="
                      config.optionValueKey
                        ? item[config.optionValueKey]
                        : item.value
                    "
                  >
                    {{
                      config.optionLabelKey
                        ? item[config.optionLabelKey]
                        : item.label
                    }}
                  </el-radio>
                </el-radio-group>

                <el-select
                  v-if="config.type === 'select'"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                >
                  <el-option
                    v-for="item in config.options"
                    :key="
                      config.optionValueKey
                        ? item[config.optionValueKey]
                        : item.value
                    "
                    :label="
                      config.optionLabelKey
                        ? item[config.optionLabelKey]
                        : item.label
                    "
                    :value="
                      config.optionValueKey
                        ? item[config.optionValueKey]
                        : item.value
                    "
                  />
                </el-select>
                <el-date-picker
                  v-if="
                    [
                      'year',
                      'month',
                      'date',
                      'dates',
                      'week',
                      'datetime',
                      'datetimerange',
                      'daterange',
                      'monthrange',
                    ].includes(config.type)
                  "
                  :type="config.type"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                >
                </el-date-picker>
                <el-switch
                  v-if="config.type === 'switch'"
                  type="date"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                >
                </el-switch>
                <el-slider
                  v-if="config.type === 'slider'"
                  type="date"
                  v-model="form[config.key]"
                  v-bind="config"
                  :disabled="type === 'view' || config.disabled"
                  v-on="eventsAddParams(config.events, config, index)"
                >
                </el-slider>
                <el-upload
                  v-if="config.type === 'file'"
                  :accept="config.accept || '.jpg,.png'"
                  :action="config.fileServerUrl || fileServerUrl"
                  :disabled="
                    type === 'view' || config.readonly || config.disabled
                  "
                  :class="{
                    'upload-disabled':
                      type === 'view' || config.readonly || config.disabled,
                  }"
                  class="avatar-uploader pos-relative"
                  :show-file-list="config.showFileList || false"
                  :on-success="(res, file) => handleSuccess(res, file, config)"
                  :before-upload="(file) => beforeUpload(file, config)"
                  :on-progress="
                    (event, file, fileList) =>
                      onProgress(event, file, fileList, config)
                  "
                  :on-error="onError(config)"
                >
                  <template v-if="form[config.key]">
                    <img
                      v-if="config.fileType !== 'file'"
                      :src="form[config.key]"
                      class="avatar"
                    />
                    <span class="ellipsis" v-else>
                      <i class="el-icon-document"></i>{{ form[config.key] }}
                    </span>
                  </template>
                  <div v-else>
                    <el-button
                      size="small"
                      type="primary"
                      :disabled="
                        type === 'view' || config.readonly || config.disabled
                      "
                      >点击上传</el-button
                    >
                    <span class="fc-gray">{{ config.tip }}</span>
                  </div>
                  <el-progress
                    class="my-progress"
                    :style="{ opacity: config.showProgerss ? 1 : 0 }"
                    :show-text="false"
                    :percentage="config.filePercentage"
                  ></el-progress>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-center mgt20">
          <el-button @click="closedialog">取 消</el-button>
          <el-button v-if="type !== 'view'" type="primary" @click="onsubmit"
            >保 存</el-button
          >
          <slot name="addBtns" :$data="{ ...$data }" />
        </div>
        <slot name="tip" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ElFormDialog",
  data() {
    return {
      isLoading: false,
      form: {},
      rules: {},
      treatedFormConfig: [],
      addAttrsKey: "",
      saveFormConfig: [],
      attrs: [],
      saveRules: {},
      saveForm: {},
      dataType: "",
      config: null,
      index: 0,
    };
  },
  props: {
    visible: {
      // 显示/隐藏
      type: Boolean,
      default: false,
    },
    type: {
      // 类型
      type: String,
      default: "add", // add or edit or view
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
    labelPosition: {
      type: String,
      default: "",
    },
    labelWidth: {
      // 标签宽度
      type: String,
      default: "140px",
    },
    formConfig: {
      type: Array,
      default: () => [],
    },
    formData: {
      // 表单数据
      type: Object,
      default: () => {},
    },
    addAttrs: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    visible() {
      this.init();
    },
    formConfig() {
      console.log(12321321);
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.visible) return;
      let form = {};
      let rules = {};
      this.form = {};
      this.rules = {};
      this.treatedFormConfig = [];
      this.addAttrsKey = "";
      this.saveFormConfig = [];
      this.attrs = this.addAttrs || [];
      this.saveRules = {};
      this.saveForm = {};
      this.dataType = "";

      let _this = this;
      this.treatedFormConfig = [...this.formConfig];
      this.treatedFormConfig.forEach((config, index) => {
        if (config.type === "text") return;
        form[config.key] =
          this.formData[config.key] || this.formData[config.key] == 0
            ? this.formData[config.key]
            : config.defaultValue || config.defaultValue == undefined
            ? config.defaultValue
            : "";
        // 如果有追加参数
        if (config.addKeys && config.addKeys.length) {
          config.addKeys.forEach((key) => {
            form[key] = this.formData[key] || "";
          });
        }
        // 如果是必填，则生成规则
        let rule = {
          required: !!config.required,
        };
        if (config.validator) {
          rule.validator = config.validator;
        } else {
          rule.message = config.errorMsg || config.placeholder;
        }
        rules[config.key] = rule;

        // 如果是日期，并且有配置日期选择限制
        if (
          config.type === "date" &&
          config.disabledDateFormKey &&
          config.operator
        ) {
          config.pickerOptions = {
            disabledDate(time) {
              if (_this.form[config.disabledDateFormKey]) {
                let date = new Date(_this.form[config.disabledDateFormKey]);
                let val =
                  config.operator === ">"
                    ? time.getTime() > date.getTime()
                    : time.getTime() < date.getTime();
                return date ? val : false;
              }
              return false;
            },
          };
        }

        // 如果有数据类型, 则保存相关数据
        if (config.selectType && config.selectType === "dataType") {
          this.dataType = this.formData[config.key];
          this.config = config;
          this.index = index;
        }
      });
      this.form = form;

      this.rules = rules;
      this.reset();
      // 保存formConfig,rules,form
      this.saveFormConfig = [...this.formConfig];
      this.saveRules = {
        ...this.rules,
      };
      this.saveForm = {
        ...form,
      };
    },
    // 给事件回调函数添加参数
    eventsAddParams(events, config, index) {
      let rEvents = {};

      for (const key in events) {
        rEvents[key] = () => {
          events[key](
            this.form[config.key],
            config,
            index,
            this.treatedFormConfig,
            this.form,
            this.formData
          );
        };
      }
      return rEvents;
    },
    handleSuccess(res, file, config) {
      if (config.addKeys && config.addKeys[0]) {
        // 如果有参数，则返回值保存到第一个追加参数里
        this.form[config.addKeys[0]] = res.data;
        this.form[config.key] = file.name;
      } else {
        this.form[config.key] = res.data;
      }
      config.filePercentage = 100;
      config.showProgerss = false;
      this.$nextTick(() => (config.filePercentage = 0));
    },
    beforeUpload(file, config) {
      console.log(11, config, file);
      if (config.accept) {
        let acceptArr = config.accept.split(",");
        let acceptTypeArr = [];
        acceptArr.forEach((str) => {
          if (str) {
            let arr = str.split(".");
            let typeName = arr[1] || "";
            typeName && acceptTypeArr.push(typeName);
          }
        });

        let fileTypeName = "";
        if (file.name) {
          let arr = file.name.split(".");
          fileTypeName = arr[arr.length - 1];
        }

        if (acceptTypeArr.length && !acceptTypeArr.includes(fileTypeName)) {
          this.$message.error(`只支持格式为${acceptTypeArr.join("、")}的文件`);
          return false;
        }
      }

      const limitNum = config.limitSize || 1;
      const limitSize = file.size / 1024 / 1024 < limitNum;

      if (!limitSize) {
        this.$message.error(`文件不得超过 ${limitNum}MB!`);
        return;
      }
      this.$set(config, "filePercentage", 0);
      config.isShowProgerss && this.$set(config, "showProgerss", true);
      return limitSize;
    },
    // 上传进度
    onProgress(event, file, fileList, config) {
      config.filePercentage = file.percentage;
    },
    // 上传失败
    onError(config) {
      setTimeout(() => {
        config.showProgerss = false;
        config.filePercentage = 0;
      }, 1000);
    },
    reset() {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    },
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    },
    onsubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {
            ...this.form,
          };

          // 如果有新增属性，则把新增的属性组装进数组里
          if (this.attrs && this.attrs.length) {
            let attrs = [];
            this.attrs.forEach((item) => {
              attrs.push({
                key: item.key,
                value: this.form[`attrs_${item.key}`],
              });
            });
            data[this.addAttrsKey ? this.addAttrsKey : "attrs"] = attrs;
          }
          this.$emit("onsubmit", this.type, data, this.formData);
          // this.$emit("closedialog");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closedialog() {
      this.hideLoading();
      this.$emit("closedialog");
      return false;
    },
  },
};
</script>
<style lang="less" scoped>
.dflex {
  display: flex;
}
.flex {
  flex: 1;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.mgb10 {
  margin-bottom: 10px;
}
.mgt20 {
  margin-top: 20px;
}
/deep/ .el-dialog__body {
  padding: 0px 0px 20px 0px;
}
/deep/ .el-form-item__label {
  height: 34px;
}

/deep/ .el-input-number input {
  text-align: left;
}

/deep/ .el-slider {
  padding: 0 10px;
}

.formdialog {
  margin-top: 30px;
}

.el-form {
  padding: 0px 20px;
  margin: 10px 0;
  min-height: 100px;
  max-height: calc(100vh - 290px) !important;
  overflow-y: auto;
}

.dsc {
  height: 45px;
  background: #f7f9fc;
  padding-left: 10px;
  line-height: 45px;
  // font-size: 0.72917vw;
  color: rgb(51, 119, 255);
  i {
    color: rgb(51, 119, 255);
  }
}
.my-progress {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 200px;
}
.upload-disabled {
  .fc-gray,
  .ellipsis {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
