(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, (window.Cesium || require('mars3d-cesium')), (window.turf || require('@turf/turf'))) :
  typeof define === 'function' && define.amd ? define(['exports', 'mars3d-cesium', '@turf/turf'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mars3d = {}, global.Cesium, global.turf));
})(this, (function (exports, Cesium, turf) { 
}));