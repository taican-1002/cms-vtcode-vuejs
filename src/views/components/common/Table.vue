<template>
  <div class="table-responsive p-0">
    <table class="table align-items-center mb-0">
      <thead>
        <tr>
          <slot name="tableThead"></slot>
        </tr>
      </thead>
      <tbody>
        <slot name="tableTbody"></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
