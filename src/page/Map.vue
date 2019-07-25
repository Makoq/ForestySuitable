<template>
    <div id="map" ref="mapcontainer"  >
       <!--head title -->
       <h1 style="margin-left:5%;position:fixed;z-index:2"><strong>Foresty Suitable Land  Web System</strong></h1>
        
        <!-- popup -->
        <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
        </div>

        <!-- search part -->
        <div   class="search-panel">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item   >
                    <el-input v-model="searchData" placeholder="种名搜索.."></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle @click="searchBySpecieName"></el-button>
                </el-form-item>
            </el-form>
          
        <el-collapse v-model="activeSearchRe"   >
                <el-collapse-item title=" 检索结果" name="1" style="width:100%:margin:5px;">
                        <el-table
             
                :data="searchResult.data"
                height="550"
                stripe
                border
                style="width: 100%; ">
                <el-table-column
                    prop="SpecieName"
                    label="种名"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="Distribute"
                    label="分布地区"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="FirstForestyArea"
                    label="温度带"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="SuitableSoil"
                    label="适地特征"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="SuitableAltitude"
                    label="海拔"
                    width="80">
                </el-table-column>
             
                


                </el-table>
       
                </el-collapse-item>
        </el-collapse>
              

        </div>
    </div>
     
  

</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
 
//ScaleLine
import {defaults as defaultControls,ScaleLine} from 'ol/control.js';
import 'ol/ol.css';
import Overlay from 'ol/Overlay';


 

export default {
 
  data(){
      return{
          map:null,
          searchData:'',
          searchResult:'',
          activeSearchRe:[]
           
      };
  },
  methods:{
      searchBySpecieName(){
          let vue=this
          if(this.searchData.length===0){
              this.searchResult=[]
          }else{
                this.$axios.get('/search',{
                            params:{
                                keyWord:this.searchData
                            }
                        })
                        .then(res=>{
                            if(res){
                                vue.searchResult=res
                                vue.activeSearchRe.push('1')
                                //   this.$refs.sr.$el.style.display='bolck'
                            }
                        });
          }
          

      }
  },
  
  mounted(){
      
       

      var container = document.getElementById('popup');
      var content = document.getElementById('popup-content');
      var closer = document.getElementById('popup-closer');

    var overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
            duration: 250
            }
        });
    closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };


       this.map=new Map({
        overlays: [overlay],
        target:'map',
        controls: defaultControls().extend([
                            
            ]),
        layers:[
               new TileLayer({
                  
                      source:new OSM()
                   
               })
           ],
        view:new View({
            projection:'EPSG:4326',
            center:[106.064839,35.548857],
            zoom:5
        }),
         
       });   

// 添加OGC的地图服务
       var foresty_point=new TileWMS({
             url: 'http://localhost:8081/geoserver/myGeo/wms',
                        params: {
                            'LAYERS': 'foresty_point',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 

        var province=new TileWMS({
             url: 'http://localhost:8081/geoserver/myGeo/wms',
                        params: {
                            'LAYERS': 'province',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 


       var layer_foresty_point=new TileLayer({
           source:foresty_point
       });

       var layer_province=new TileLayer({
           source:province
       });

       this.map.addLayer(layer_province);
       this.map.addLayer(layer_foresty_point);
       //添加地图控件
       this.map.addControl(new ScaleLine());

        let that=this
        this.map.on('singleclick', function(evt) {

         var coordinate = evt.coordinate;   

        // document.getElementById('nodelist').innerHTML = "Loading... please wait...";
        
        var view = that.map.getView();
        var viewResolution = view.getResolution();
        var source = foresty_point
        
        
        //获取要素属性信息
        var url = source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, view.getProjection(),
          {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50});

        if (url) {
        //   document.getElementById('nodelist').innerHTML = '<iframe seamless id="iframe" style="width:800px;height:200px;border:none;margin-left:10%" src="' + url + '"></iframe>';
        }
        content.innerHTML= '<div style="height:100% auto;width:100% auto "> <iframe seamless id="iframe" border:none;margin-left:10%" src="' + url + '"></iframe></div>';
        overlay.setPosition(coordinate);

      });



       
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #map{
      
     height:100% ;
     width: 100%;
     position: relative;
     /* margin:0px; */
     /* padding: 0px; */
 }
#map .ol-overlaycontainer-stopevent {
    display: none;
}

.hiddenResultPanel{
     visibility: hidden;
 }
 .searchResultShow{

     height: 600px;
     width: 100%;
     overflow-y:scroll ;
     /* overflow-x:scroll ; */

 }
 
  
 


 .ol-popup {
        position: absolute;
        background-color: white;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 12px;
        left: -50px;
        min-width: 280px;
      }
      .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }
      .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
      }
      .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
      }
      .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
      }
      .ol-popup-closer:after {
        content: "✖";
      }



      .search-panel{
        width: 470px;
        position: fixed;
        z-index: 2;
        margin-left: 70%;
        margin-top: 40px;
      }
</style>
