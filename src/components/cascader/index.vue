<template>
  <div class="example-wrap">
    <Cascader
      v-model="selectedDept"
      :options="departmentOptions"
      title="统计范围："
      @change="handleChange"
    ></Cascader>
  </div>
</template>

<script>
import Cascader from "./cascader.vue";

export default {
  components: {
    Cascader,
  },
  data() {
    return {
      selectedDept: [],
      departmentOptions: [
        {
          id: 1,
          label: "国信证券股份有限公司",
          children: [
            {
              id: 2,
              label: "技术管理部",
              children: [
                {
                  id: 3,
                  label: "技术与架构组",
                  children: [
                    {
                      id: 5,
                      label: "技术管理部",
                    },
                  ],
                },
                { id: 4, label: "前端与后端组" },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleChange(v) {
      console.log("1111", v);
    },
  },
};
</script>

<style scoped>
.example-wrap {
  width: 100%;
  padding: 20px;
  height: 1100px;
  display: block;
}
</style>
