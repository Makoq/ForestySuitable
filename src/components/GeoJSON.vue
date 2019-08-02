<template>
   <main>
          <v-chart 
          :options="geo"
                    />
     
   </main>

</template>

<script>
import ECharts from 'vue-echarts'
 
import xianMap from '../data/china.json'

import 'echarts/lib/chart/map'
import 'echarts/lib/component/title.js'
import 'echarts/lib/component/tooltip.js'

ECharts.registerMap('china', xianMap);

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    

    return {
        geo:{ 
          title:{
            text:"china",
          },

          tooltip: {
            trigger: 'item' 
          },

          center: [115.97, 29.71],
          zoom:2,
          type:"map",
          roam:true,
          series:[
                  {
                    name:"china",
                    type: "map",
                    map: "china",
                    itemStyle: {
                      normal: {
                        areaColor: "rgba(23, 27, 57,0)",
                        borderColor: "#9dfff6",
                        borderWidth: 1
                      }
                    },
                    data: this.initMapData(xianMap)
                  }
                ]


        },
        d:1,
    
    }
  },
  methods:{


    initMapData(mapJson) {
        var mapData = [];
        for (var i = 0; i < mapJson.features.length; i++) {
          mapData.push({
            // name: mapJson.features[i].properties.name,
            // level: mapJson.features[i].properties.level,
            //id:mapJson.features[i].id
          });
        }
        return mapData;
    }

  },
  mounted(){
    this.initEChart;

    

    // this.data=new Object
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 
.echarts{
   
  /* width: 100%;
  height: 100%; */
  position:absolute;
  height: 100%;
  width: 100%;
  background-color: black;
   
}
   
</style>
