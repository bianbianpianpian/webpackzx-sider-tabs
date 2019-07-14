<template>
	<div class="v-sider">
		<Menu ref="menu" mode="vertical" :theme="theme1" :active-name="activeName" :open-names="activeOpenName">
			<a href="javascript:void(0);" class="fold-menu" @click="fold=!fold">
				<span v-if="!fold"><Icon type="ios-arrow-up" /> 全部折叠</span>
				<span v-if="fold"><Icon type="ios-arrow-down" /> 全部展开</span>
			</a>
			<Submenu name="1" v-if="menuData1.some(item => CONFIG_ROLE[item.role])">
				<template slot="title">
	                <Icon type="navicon"></Icon> 一级菜单1
	            </template>
			    <MenuItem v-for="(item, index) in menuData1" :key="index" :name="item.name" v-if="CONFIG_ROLE[item.role]" @click.native="siderChange(item.router, item.title)">
			        <Icon type="ios-circle-outline"></Icon> \{{ item.title }}
			    </MenuItem>
			</Submenu>
		</Menu>
	</div>
</template>
<script>
export default {
  name: 'TSider',
  props: {
    router: ''
  },
  data () {
    return {
      theme1: 'light',
      fold: false,
      // activeName: this.$route.name,
      activeName: '',
      activeOpenName: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      menuData1: [
        {
          router: 'demo',
          name: '1-1',
          title: '例1',
          role: 'STANDARDLOGISTICSCOST'
        }
      ],
      menuData2: [],
      CONFIG_ROLE: window.CONFIG_ROLE
    }
  },
  methods: {
    siderChange (router, name) {
      this.$emit('siderChange', {router: router, name: name})
    }
  },
  watch: {
    router (to, from) {
      // console.log('new', to)
      if (!to) {
        this.activeName = ''
      }
      let menu = [1]
      for (let i = 0; i < menu.length; i++) {
        this['menuData' + menu[i]].map((item) => {
          if (item.router == to) {
            this.activeName = item.name
          }
        })
      }
    },
    fold (to, from) {
      if (to) {
        this.activeOpenName = []
      } else {
        this.activeOpenName = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      }
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  }
}
</script>