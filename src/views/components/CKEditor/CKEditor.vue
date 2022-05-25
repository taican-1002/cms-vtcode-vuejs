<template>
  <textarea id="editor1" name="editor1"></textarea>
</template>

<script>
import { onMounted, ref, watch } from "vue";
export default {
  name: "CKEditor",
  props: ["content"],
  setup(props, { emit }) {
    const content = ref(props.content);
    let CKEditor;
    onMounted(() => {
      //initialize ckeditor
      CKEditor = window.CKEDITOR.replace("editor1");
      //setting data
      CKEditor.setData(content.value);
      //on change event
      CKEditor.on("change", () => {
        emit("send-content", CKEditor.getData());
      });
    });
    watch(content, () => {
      if (content.value !== CKEditor.getData()) {
        CKEditor.setData(content.value);
      }
    });
  },
};
</script>

<style></style>
