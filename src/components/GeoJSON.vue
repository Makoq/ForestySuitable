<template>
   
     <chart :options="map"
              :init-options="initOptions"/>
   
</template>

<script>
 import qs from 'qs'

import ECharts from 'vue-echarts'
 


import xianMap from '../../public/data/china.json'
ECharts.registerMap('china', xianMap)
import 'echarts/lib/chart/map'
import 'echarts/lib/component/title.js'

export default {
  components: {
    chart: ECharts
  },
  data () {
    
let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
        map:{
            title: {
                text: '极坐标双数值轴',
                left:'center'
              },
            series: [
                {
                  // coordinateSystem: 'polar',
                  name: 'line',
                  type: 'map',
                  // showSymbol: false,
                  data: [ 
                  {name: '北京',value: this.randomData() },
                  {name: '天津',value: this.randomData() },
                  {name: '上海',value: this.randomData() },
                  {name: '重庆',value: this.randomData() },
                  {name: '河北',value: this.randomData() },
                  {name: '河南',value: this.randomData() },
                  {name: '云南',value: this.randomData() },
                  {name: '辽宁',value: this.randomData() },
                  {name: '黑龙江',value: this.randomData() },]
                }
               ],
               
        },
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
    }
  },
  methods:{
    initEChart(){
      
    },
    randomData() {
      return Math.round(Math.random()*1000);
    }
  },
  mounted(){
    this.initEChart;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .echarts {
  width: 100%;
  height: 100%;
}
.main{
  height: 100%;
  width:100%
}
</style>
