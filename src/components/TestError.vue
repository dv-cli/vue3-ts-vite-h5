<script lang="tsx">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const root = ref("error");

    return () => <div>{root.value}</div>;
  },
});
</script>
