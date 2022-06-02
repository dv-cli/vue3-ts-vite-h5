<template>
  <button class="test" @click="handleTest">点击发送请求</button>

  <router-view v-show="!visible" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import http from "@/utils/http/request";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const params = { modules: "statisGradeCityDetail,diseaseh5Shelf" };
    const router = useRouter();
    let visible = ref(false);
    const handleTest = () => {
      http
        .get("/newsqa/v1/query/inner/publish/modules/list", { params })
        .then(res => {
          console.log("res", res);
        })
        .catch(() => {
          router.push({ name: "error" });
        })
        .finally(() => {
          console.log("finlish");
          router.push({ name: "example" });
        });
    };
    return {
      visible,
      handleTest,
    };
  },
});
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.test {
  color: @test-color;
}
</style>
