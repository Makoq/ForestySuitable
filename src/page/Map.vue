<template>

   
    <div id="map" ref="mapcontainer"  >
       <div id="nodelist">info</div>
       
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

export default {
 
  data(){
      return{
          map:null    
      };
  },
  methods:{
      clickInfo(){

      }
  },
  
  mounted(){
       this.map=new Map({
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

        document.getElementById('nodelist').innerHTML = "Loading... please wait...";
        
        var view = that.map.getView();
        var viewResolution = view.getResolution();
        var source = foresty_point
        
        var url = source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, view.getProjection(),
          {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50});

        if (url) {
          document.getElementById('nodelist').innerHTML = '<iframe seamless style="width:800px;border:none;margin-left:50%" src="' + url + '"></iframe>';
        }
       
   

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
#nodelist{
    z-index: 2;
    /* height: 200px;
    width: 800px;  */
    position: fixed;   
     
}
 
</style>
