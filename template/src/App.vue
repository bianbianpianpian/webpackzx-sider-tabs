<template>
  <div id="app">
    {{#router}}
    <div v-if="CONFIG_ROLE !== null">
      <THeader></THeader>
      <div :class="isOrgApp ? 'main' : 'main no-header-sider'">
        <tSider v-if="isOrgApp" @siderChange="siderChange" :router="router"></tSider>
        <div class="content" v-if="isOrgApp">
          <Tabs v-if="router" class="ml10 main-tabs" style="width:98%;" type="card" closable @on-tab-remove="handleTabRemove" v-model="router" :animated="false">
              <TabPane :label="item.name" :name="item.router" v-for="item in routers" :key="item.router">
                <router-view :name="item.router"></router-view>
              </TabPane>
          </Tabs>
          <div v-if="!router" class="welcome">
            <h1>
              欢迎进入demo平台
            </h1>
          </div>
        </div>
        <div class="content" v-if="!isOrgApp">
          <router-view :name="routerOrgApp"></router-view>
        </div>
      </div>
    </div>
    <div v-if="no_auth === true" class="no-auth">
      <div>
        暂无权限，请联系管理员！咚咚号：fpe
      </div>
    </div>
    {{else}}
    <Demo/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import Demo from './components/Demo'
{{/unless}}
import THeader from '@/common-components/THeader'
import TSider from '@/common-components/TSider'
import { CONFIG, CONFIG_ROLE, CONFIG_IS_AUTH } from './services/config'
export default {
  name: 'App',
  components: {
    THeader,
    TSider{{#router}}{{else}},
    Demo{{/router}}
  },
  data () {
    return {
      CONFIG_ROLE: null,
      no_auth: false,
      routers: [],
      router: '',
      isOrgApp: CONFIG.getQueryString('isOrgApp') === 'false' ? false : 1,
      routerOrgApp: location.hash.substring(2)
    }
  },
  methods: {
    siderChange (item) {
      this.router = item.router
      let isEist = this.routers.some((it) => {
        return it.router == this.router
      })
      if (!isEist) {
        this.routers.push({
          router: item.router,
          name: item.name
        })
      }
    },
    handleTabRemove (name) {
      this.routers.map((it, index) => {
        if (it.router == name) {
          this.routers.splice(index, 1)
          if (index == 0) {
            if (this.routers.length > 0) {
              this.router = this.routers[0].router
            } else {
              this.router = ''
            }
          } else {
            this.router = this.routers[index - 1].router
          }
        }
      })
      // console.log('删除', name, this.routers)
    },
    loadData () {
      window.$.ajax({
        url: CONFIG.URL.querypermcontent,
        type: 'GET',
        data: {
          systemid: 'fulfillment-cost'
        },
        // dataType: 'jsonp',
        xhrFields: {
          withCredentials: true
        },
        success: (res, textStatus, jqXHR) => {
          // console.log('ok!!!!', res)
          // res = res.data
          // console.log('前端配置', CONFIG_ROLE)
          if (res.statusCode === 1) {
            let CONFIG_ROLE_RES = res.data
            // console.log('????', CONFIG_ROLE_RES)
            let tmp = {}
            // console.log('获取权限ok', CONFIG_ROLE_RES)
            for (let i = 0; i < CONFIG_ROLE.length; i++) {
              for (let j = 0; j < CONFIG_ROLE_RES.length; j++) {
                if (CONFIG_ROLE[i].id === CONFIG_ROLE_RES[j].id) {
                  CONFIG_ROLE[i].checked = CONFIG_ROLE_RES[j].checked
                  if (CONFIG_ROLE[i].checked === 'true') {
                    tmp[CONFIG_ROLE[i].id] = true
                  } else {
                    tmp[CONFIG_ROLE[i].id] = false
                  }
                }
              }
            }
            window.CONFIG_ROLE = this.CONFIG_ROLE = tmp
            // console.log(this.CONFIG_ROLE)
          } else {
            this.no_auth = true
          }
        },
        error: (xhr, textStatus) => {
          console.log('错误')
          // this.no_auth = true
          this.$Message.error('获取权限失败!')
        }
      })
    }
  },
  mounted () {
    if (CONFIG_IS_AUTH) {
      this.loadData()
    } else {
      let tmp = {}
      for (let i = 0; i < CONFIG_ROLE.length; i++) {
        tmp[CONFIG_ROLE[i].id] = CONFIG_ROLE[i].checked
      }
      window.CONFIG_ROLE = this.CONFIG_ROLE = tmp
    }
  }
}
</script>

