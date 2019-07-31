

  export const wms = {
    path: "/wms",
    name: "wms",
    component: () => import("../components/Map")
  };

  export const geoJSON = {
    path: "/geojson",
    name: "GeoJSON",
    component: () => import("../components/GeoJSON")
  };

  export const page404 = {
    path: "/*",
    name: "error-404",
    meta: {
      title: "404-页面不存在"
    },
    component: () => import("../page/errorPage/404")
  };

  export const page500 = {
    path: "/500",
    meta: {
      title: "500-服务端错误"
    },
    name: "error-500",
    component: () => import("../page/errorPage/500")
  };


  export const routes=[
      
      wms,
      geoJSON,
      page404,
      page500,
      
  ]
