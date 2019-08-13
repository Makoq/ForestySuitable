<template>
    <div id="map" ref="mapcontainer"  >
       <!--head title -->
       <h1 style="margin-left:5%;position:fixed;z-index:2"><strong>Web GIS System</strong></h1>
        
        <!-- popup -->
        <div id="popup" class="ol-popup" v-loading="loading">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content" ></div>
        </div>

        <!-- search part -->
        <!-- <div   class="search-panel">
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
              

        </div> -->
    </div>
     
  

</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
// import OSM from 'ol/source/OSM';

import XYZ from 'ol/source/XYZ'
//ScaleLine
import {defaults as defaultControls,ScaleLine} from 'ol/control.js';
import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import { setTimeout } from 'timers';
// import { async } from 'q';
// import { setTimeout } from 'timers';

// import AMap from 'amap-js'

export default {
 
  data(){
      return{
          map:null,
          searchData:'',
          searchResult:'',
          activeSearchRe:[],
          loading:false,
           
      };
  },
  methods:{
      searchBySpecieName(){
          let vue=this
          if(this.searchData.length===0){
              this.searchResult=[]
          }else{
                this.$axios.get('/api/search',{
                            params:{
                                keyWord:this.searchData
                            }
                        })
                        .then(res=>{
                            if(res){
                                vue.searchResult=res
                                vue.activeSearchRe.push('1')
                               
                            }
                        });
          }
          

      },
  
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
                  
                
                source: new XYZ({ //天地图
                url: "https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=fb1bfb9e06cd7681813a42f4c934e1ea"
                    })  
                                
               }),


            //    new TileLayer({                
            //          source:new OSM()                         
            //    }),


            //    new TileLayer({//高德
                  
            //         source: new XYZ({
            //         url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
            //         })              
            //    })


           ],
        view:new View({
            projection:'EPSG:4326',
            center:[118.934839,32.118857],
            zoom:16
        }),
         
       });   

// 添加OGC的地图服务


        var province=new TileWMS({
             url: 'http://localhost:8081/geoserver/myGeo/wms',
                        params: {
                            'LAYERS': 'province',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 
      

        var xianlinSt_Inte2019072500229=new TileWMS({
             url: 'http://localhost:8081/geoserver/lv/wms',
                        params: {
                            'LAYERS': 'xianlinSt_Inte2019072500229',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 
       var xianlinSt_Inte2019072500529=new TileWMS({
             url: 'http://localhost:8081/geoserver/lv/wms',
                        params: {
                            'LAYERS': 'xianlinSt_Inte2019072500529',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 
       var xianlinSt_Inte2019072500829=new TileWMS({
             url: 'http://localhost:8081/geoserver/lv/wms',
                        params: {
                            'LAYERS': 'xianlinSt_Inte2019072500829',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 
        var xianlinSt_Inte2019072501129=new TileWMS({
             url: 'http://localhost:8081/geoserver/lv/wms',
                        params: {
                            'LAYERS': 'xianlinSt_Inte2019072501129',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 

        var xianlinSt_Inte2019072501429=new TileWMS({
             url: 'http://localhost:8081/geoserver/lv/wms',
                        params: {
                            'LAYERS': 'xianlinSt_Inte2019072501429',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 
         var xianlinSt_Inte2019072501729=new TileWMS({
             url: 'http://localhost:8081/geoserver/lv/wms',
                        params: {
                            'LAYERS': 'xianlinSt_Inte2019072501729',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 

       var xianlinSt_Inte2019072502029=new TileWMS({
             url: 'http://localhost:8081/geoserver/lv/wms',
                        params: {
                            'LAYERS': 'xianlinSt_Inte2019072502029',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 

        var xianlinSt_Inte2019072502629=new TileWMS({
             url: 'http://localhost:8081/geoserver/lv/wms',
                        params: {
                            'LAYERS': 'xianlinSt_Inte2019072502629',
                            'TILED': true
                        },
                        serverType: 'geoserver'
       }); 


        var xianlinSt_Inte2019072502929=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072502929',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 

        var xianlinSt_Inte2019072503229=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072503229',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 




             var xianlinSt_Inte2019072503529=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072503529',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 

             var xianlinSt_Inte2019072503829=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072503829',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 

             var xianlinSt_Inte2019072504129=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072504129',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 
             var xianlinSt_Inte2019072504429=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072504429',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 
               var xianlinSt_Inte2019072504730=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072504730',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 
                var xianlinSt_Inte2019072505030=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072505030',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 
               var xianlinSt_Inte2019072505330=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072505330',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 
               var xianlinSt_Inte2019072505630=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072505630',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 
   var xianlinSt_Inte2019072505930=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'xianlinSt_Inte2019072505930',
                                    'TILED': true
                                },
                                serverType: 'geoserver'
            }); 






        var point_info=new TileWMS({
                    url: 'http://localhost:8081/geoserver/lv/wms',
                                params: {
                                    'LAYERS': 'poiInfo',
                                    'TILED': true
                                },
                                serverType: 'geoserver',
                            
            }); 

    //    var foresty_point=new TileWMS({
    //          url: 'http://localhost:8081/geoserver/myGeo/wms',
    //                     params: {
    //                         'LAYERS': 'foresty_point',
    //                         'TILED': true
    //                     },
    //                     serverType: 'geoserver'
    //    }); 
    //http://172.21.212.64:8080/geoserver/lv/wms?service=WMS&version=1.1.0&request=GetMap&layers=lv%3AxianlinSt_Inte2019071904432&bbox=118.88777803600007%2C32.08548504200004%2C118.94524301300005%2C32.13547557500003&width=768&height=668&srs=EPSG%3A4326&format=application/openlayers

       
        var layer_point_info=new TileLayer({
                source:point_info
        });
                        
        var layer_province=new TileLayer({
                source:province
        }); 

        // setTimeout(()=>{
        //     layer_point_info.state_.visible=false
        // // console.log(layer_province.state_.visible)
        // console.log("fal")


        // },2000) 
        // setTimeout(()=>{
        //     layer_point_info.state_.visible=true
        // // console.log(layer_province.state_.visible)
        // console.log("true")

        // },6000) 


       var layer_xianlinSt_Inte2019072500229=new TileLayer({
           source:xianlinSt_Inte2019072500229
       });
         var layer_xianlinSt_Inte2019072500529=new TileLayer({
           source:xianlinSt_Inte2019072500529
       });
          var layer_xianlinSt_Inte2019072500829=new TileLayer({
           source:xianlinSt_Inte2019072500829
       });
          var layer_xianlinSt_Inte2019072501129=new TileLayer({
           source:xianlinSt_Inte2019072501129
       });

         var layer_xianlinSt_Inte2019072501429=new TileLayer({
           source:xianlinSt_Inte2019072501429
       });

         var layer_xianlinSt_Inte2019072501729=new TileLayer({
           source:xianlinSt_Inte2019072501729
       });
         var layer_xianlinSt_Inte2019072502029=new TileLayer({
           source:xianlinSt_Inte2019072502029
       });

       var layer_xianlinSt_Inte2019072502629=new TileLayer({
           source:xianlinSt_Inte2019072502629
       });
       

       var layer_xianlinSt_Inte2019072502929=new TileLayer({
           source:xianlinSt_Inte2019072502929
       });

 var layer_xianlinSt_Inte2019072503229=new TileLayer({
           source:xianlinSt_Inte2019072503229
       });

        var layer_xianlinSt_Inte2019072503529=new TileLayer({
           source:xianlinSt_Inte2019072503529
       });
        var layer_xianlinSt_Inte2019072503829=new TileLayer({
           source:xianlinSt_Inte2019072503829
       });

        var layer_xianlinSt_Inte2019072504129=new TileLayer({
           source:xianlinSt_Inte2019072504129
       });

         var layer_xianlinSt_Inte2019072504429=new TileLayer({
           source:xianlinSt_Inte2019072504429
       });

           var layer_xianlinSt_Inte2019072504730=new TileLayer({
           source:xianlinSt_Inte2019072504730
       });

         var layer_xianlinSt_Inte2019072505030=new TileLayer({
           source:xianlinSt_Inte2019072505030
       });

       
         var layer_xianlinSt_Inte2019072505330=new TileLayer({
           source:xianlinSt_Inte2019072505330
       });


         var layer_xianlinSt_Inte2019072505630=new TileLayer({
           source:xianlinSt_Inte2019072505630
       });


         var layer_xianlinSt_Inte2019072505930=new TileLayer({
           source:xianlinSt_Inte2019072505930
       });









       
    //    this.map.addLayer(layer_province);
       this.map.addLayer(layer_point_info);
        // var  a=this


    //    setTimeout(()=>{
    //        a.map.removeLayer(layer_point_info)
    //        console.log("re")
    //    },2000)
       this.map.addLayer(layer_province);


            
        // let flag=true
        var the=this
       
        // setInterval(()=>{
        //     if(flag===true){
        //         the.map.removeLayer(layer_point_info)
        //         // a.map.removeLayer(layer_province)
        //          flag=false
        //         // console.log("re")
        //     }else{
        //         the.map.addLayer(layer_point_info)
        //         flag=true
        //         // console.log("ad")

        //     }
        // },1000)

       var arr=[
        layer_xianlinSt_Inte2019072500229,
       layer_xianlinSt_Inte2019072500529,
       layer_xianlinSt_Inte2019072500829,
       layer_xianlinSt_Inte2019072501129,
       layer_xianlinSt_Inte2019072501429,
       layer_xianlinSt_Inte2019072501729,
       layer_xianlinSt_Inte2019072502029,
       layer_xianlinSt_Inte2019072502629,
       layer_xianlinSt_Inte2019072502929,
       layer_xianlinSt_Inte2019072503229,
       layer_xianlinSt_Inte2019072503529,
       layer_xianlinSt_Inte2019072503829,
       layer_xianlinSt_Inte2019072504129,
       layer_xianlinSt_Inte2019072504429,
       layer_xianlinSt_Inte2019072504730,
       layer_xianlinSt_Inte2019072505030,
       layer_xianlinSt_Inte2019072505330,
       layer_xianlinSt_Inte2019072505630,
       layer_xianlinSt_Inte2019072505930,

       
       ]

        
    setTimeout(()=>{
        
              for(var i = 0; i < arr.length; i++ ){

                    (function(x){

                    setTimeout(function(){

                        // if(flag===true){
                        //     the.map.removeLayer(arr[x])
                        //     // a.map.removeLayer(layer_province)
                        //     flag=false
                        //     former=x
                        //     // console.log("re")
                        // }else{
                        //     the.map.addLayer(arr[x-1])
                        //     flag=true
                        //     // console.log("ad")

                        // }

                        if(x!=0){
                            the.map.removeLayer(arr[x-1])
                            // console.log(x)
                            the.map.addLayer(arr[x])
                        }else{
                            the.map.addLayer(arr[x])
                        }

                         console.log(x)
                    },x*6000)

                    })(i)

                
                }
               

    },5000)
      

       
       
                    
       
     
        // layer_point_info.state_visible=false


    //    this.map.addLayer(arr);


    //    this.map.addLayer(layer_xianlinSt_Inte2019072500529);
    //    this.map.addLayer(layer_xianlinSt_Inte2019072500829);
    //    this.map.addLayer(layer_xianlinSt_Inte2019072501129);
    //    this.map.addLayer(layer_xianlinSt_Inte2019072501429);
    //    this.map.addLayer(layer_xianlinSt_Inte2019072500229);

       


        // var k=0

        // setInterval(()=>{
        //     layer_province.state.visible=false
        //     console.log("false")
        // },2000)
        // setInterval(()=>{
        //     layer_province.state.visible=true
        //     console.log("true")

        // },4000)
        // setInterval(()=>{
        //     if(k!=arr.length-1){

                
        //         arr[k].state.visible=true
        //         console.log(k)

        //         console.log(arr[k])

        //         for(let i=0;i<arr.length;i++){
        //             if(i===k){
        //                 continue
        //             }
        //             arr[i].state.visible=false
        //         }

        //         setTimeout(()=>{
        //             arr[k].state.visible=false
        //         },4000)

        //         k++

        //     }else{
        //         k=0
        //     }


        // },6000)
       

// console.log(layer_xianlinSt_Inte2019072500229)


       //添加地图控件
       this.map.addControl(new ScaleLine());

        let that=this
        
        this.map.on('singleclick', function(evt) {

                var coordinate = evt.coordinate;   

                // document.getElementById('nodelist').innerHTML = "Loading... please wait...";
                
                var view = that.map.getView();
                var viewResolution = view.getResolution();
                var source = province
                
                
                //获取要素属性信息
                var url = source.getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50});


                overlay.setPosition(coordinate);
                that.loading=true;

                overlay.setPosition(coordinate);
                that.loading=true;
                if (url) {
                let arrurl=url.split('/')
                let url2=(arrurl.slice(4,arrurl.length)).join("/")
                    //获取wms属性，这里用webpack解决跨域
                    that.$axios.get('/geo/'+url2)
                    .then(res=>{
                        if(res.status===200){
                            
                            if(res.data.features.length==0){
                                that.$message("no location info..");
                                overlay.setPosition(undefined)
                            }
                            else if(res.data.features){
                                
                                content.innerHTML= '<h2>'+'<p>traffic jam level</p>'+res.data.features[0].properties.GRIDCODE+'</h2>';
                                that.loading=false
                            }
                        }
                        // console.log(res.data.features)
                    })

                }
                
                // overlay.setPosition(coordinate);

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
        background-color: #ffffffde;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #716f6f;
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
