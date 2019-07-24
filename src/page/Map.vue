<template>
    <div id="map" ref="mapcontainer"  >
       <h1 style="margin-left:5%;position:fixed;z-index:2"><strong>Foresty Suitable Land Web System</strong></h1>
       <!-- <div id="nodelist"></div> -->
        <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
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
          map:null    
      };
  },
  methods:{
      clickInfo(){

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
/* #nodelist{
    z-index: 1;
    height: 100px;
    width: 800px; 
    background: white;
    opacity: .7;
    margin-left: 45%;
    margin-top: 0;
    position: fixed;   
    -moz-outline-radius: .6;
     
} */
#nodelist:hover{
    opacity: 1;
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
</style>
