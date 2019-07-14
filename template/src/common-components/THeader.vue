<template>
	<div class="layout v-header">
		<Menu mode="horizontal" :theme="theme1" :active-name="activeName">
			<div class="layout-logo">系统名称</div>
		</Menu>
	</div>
</template>
<script>
export default {
  name: 'THeader',
  data () {
    return {
      theme1: 'dark',
      activeName: this.$route.name,
      CONFIG_ROLE: window.CONFIG_ROLE
    }
  }
}
</script>