(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"1a1f":function(n,e){n.exports='\n<p class="hello">Hello {{name}}!</p>\n'},EOdA:function(n,e,o){"use strict";o.r(e),o("OgUz"),e.default={initData:function(){return{name:"Volankey"}}}},ap6i:function(n,e,o){var t=o("ePNk");"string"==typeof t&&(t=[[n.i,t,""]]);o("aET+")(t,{hmr:!0,transform:void 0,insertInto:void 0}),t.locals&&(n.exports=t.locals)},ePNk:function(n,e,o){(n.exports=o("I1BE")(!0)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.hello {\n  color: skyblue;\n}\n\n","",{version:3,sources:["/Users/hakusakaitekimac/Documents/百度IFE SAN/src/compoents/hello.san?be1903a4"],names:[],mappings:";;;;;;;;;;;;;;;;AAgBA;EACA,eAAA;CACA",file:"hello.san",sourcesContent:["<template>\n    <p class=\"hello\">Hello {{name}}!</p>\n</template>\n<script>\n    import san from 'san';\n\n    export  default{\n        initData: function () {\n            return {\n                name: 'Volankey'\n            };\n        }\n    };\n<\/script>  \n\n<style>\n    .hello {\n      color: skyblue;\n    }\n\n</style>\n"],sourceRoot:""}])},sIjb:function(n,e,o){var t,s,a={};o("ap6i"),(t=o("EOdA"))&&t.__esModule&&Object.keys(t).length>1&&console.warn("[san-loader] src/compoents/hello.san: named exports in *.san files are ignored."),s=o("1a1f");var l={};t&&(l=t.__esModule?t.default:t),s&&(l.template=s);var r=o("OgUz").defineComponent(l);n.exports=r,n.exports.__esModule&&(n.exports=n.exports.default),r.computed||(r.computed={}),Object.keys(a).forEach(function(n){var e=a[n];r.computed[n]=function(){return e}})},tjUo:function(n,e,o){"use strict";var t;(new(((t=o("sIjb"))&&t.__esModule?t:{default:t}).default)).attach(document.getElementById("app"))}},[["tjUo",0,1]]]);