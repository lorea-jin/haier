(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11a44ecb"],{"083a":function(e,t,a){"use strict";var r=a("0d51"),o=TypeError;e.exports=function(e,t){if(!delete e[t])throw o("Cannot delete property "+r(t)+" of "+r(e))}},"13d5":function(e,t,a){"use strict";var r=a("23e7"),o=a("d58f").left,i=a("a640"),l=a("2d00"),c=a("605d"),s=!c&&l>79&&l<83,n=s||!i("reduce");r({target:"Array",proto:!0,forced:n},{reduce:function(e){var t=arguments.length;return o(this,e,t,t>1?arguments[1]:void 0)}})},"14d9":function(e,t,a){"use strict";var r=a("23e7"),o=a("7b0b"),i=a("07fa"),l=a("3a34"),c=a("3511"),s=a("d039"),n=s((function(){return 4294967297!==[].push.call({length:4294967296},1)})),d=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},h=n||!d();r({target:"Array",proto:!0,arity:1,forced:h},{push:function(e){var t=o(this),a=i(t),r=arguments.length;c(a+r);for(var s=0;s<r;s++)t[a]=arguments[s],a++;return l(t,a),a}})},"3c65":function(e,t,a){"use strict";var r=a("23e7"),o=a("7b0b"),i=a("07fa"),l=a("3a34"),c=a("083a"),s=a("3511"),n=1!==[].unshift(0),d=function(){try{Object.defineProperty([],"length",{writable:!1}).unshift()}catch(e){return e instanceof TypeError}},h=n||!d();r({target:"Array",proto:!0,arity:1,forced:h},{unshift:function(e){var t=o(this),a=i(t),r=arguments.length;if(r){s(a+r);var n=a;while(n--){var d=n+r;n in t?t[d]=t[n]:c(t,d)}for(var h=0;h<r;h++)t[h]=arguments[h]}return l(t,a+r)}})},"52e4":function(e,t,a){"use strict";a("7e2c")},"536a":function(e,t,a){"use strict";a.r(t);var r=a("7a23");const o=e=>(Object(r["pushScopeId"])("data-v-7916e282"),e=e(),Object(r["popScopeId"])(),e),i={class:"container-Box"},l={class:"mainbox"},c={class:"left",id:"table"},s={class:"leftContent Content"},n={id:"table1",ref:"table1"},d={id:"table"},h=o(()=>Object(r["createElementVNode"])("div",{class:"chartsHead"},[Object(r["createElementVNode"])("div",{class:"item total"},[Object(r["createElementVNode"])("div",{class:"number"},Object(r["toDisplayString"])(798)),Object(r["createElementVNode"])("div",null,[Object(r["createElementVNode"])("div",{class:"numberCircle"},"Total production"),Object(r["createElementVNode"])("div",null,"生产总数")])]),Object(r["createElementVNode"])("div",{class:"item PiepassNo"},[Object(r["createElementVNode"])("div",{class:"number"},Object(r["toDisplayString"])(694)),Object(r["createElementVNode"])("div",null,[Object(r["createElementVNode"])("div",{class:"numberCircle"},"Qualified quantity"),Object(r["createElementVNode"])("div",null,"合格数量")])])],-1)),f={ref:"echartPieleRef1",class:"echarts"},b={ref:"echartTableRef",class:"echarts"};function u(e,t,a,o,u,p){const m=Object(r["resolveComponent"])("el-col"),O=Object(r["resolveComponent"])("el-table-column"),g=Object(r["resolveComponent"])("el-table"),v=Object(r["resolveComponent"])("el-row");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",i,[Object(r["createElementVNode"])("section",l,[Object(r["createVNode"])(v,{class:"oneLine"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(m,{span:12},{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("div",c,[Object(r["createElementVNode"])("div",s,[Object(r["createElementVNode"])("table",n,null,512)])])]),_:1}),Object(r["createVNode"])(m,{span:12,class:"right"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(v,{class:"RightBox"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(m,null,{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("div",d,[Object(r["createVNode"])(g,{data:u.listRightTopdata},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(O,{prop:"Caption",label:"",align:"center"}),Object(r["createVNode"])(O,{prop:"value1",label:"一次性合格率",align:"center"}),Object(r["createVNode"])(O,{prop:"value2",label:"返修合格率",align:"center"})]),_:1},8,["data"])])]),_:1})]),_:1}),Object(r["createVNode"])(v,{class:"RightBox chartsRow"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(m,{span:10,class:"listCharts"},{default:Object(r["withCtx"])(()=>[h,Object(r["createElementVNode"])("div",f,null,512)]),_:1}),Object(r["createVNode"])(m,{span:14},{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("div",b,null,512)]),_:1})]),_:1})]),_:1})]),_:1})])])}a("3c65"),a("13d5"),a("14d9");var p=a("365c");const m={Series:"",Model:"产品型号",ModelID:"机编",Param1:"接地",Param2:"绝缘",Param3:"耐压",Param4:"泄漏",Param5:"判定结果",Param6:"人工扫描合格率"};var O={name:"index06",props:{searchDate:{type:String}},components:{},data(){return{tableData:[],listRightTopdata:[],listRightBottomdata:[],dateArr:[],productNo:[],passNo:[],productNoTotal:0,passNoTotal:0,passRate:""}},created(){let e=this.searchDate?this.searchDate:new Date;this.getTable(e)},methods:{async getTable(e){const{Data:t}=await Object(p["f"])(e);this.tableData=t.Part1Objects,this.listRightTopdata=this.changeToElTableData(t.Part2Objects),this.listRightBottomdata=this.changeToElTableData(t.Part3Objects),this.tableData.unshift(m),this.generateTable(this.$refs.table1,this.tableData),this.generateTableHead(this.$refs.table1,this.tableData),this.dateArr=this.listRightBottomdata.map(e=>e.Caption.slice(5)),this.productNo=this.listRightBottomdata.map(e=>e.value1),this.passNo=this.listRightBottomdata.map(e=>e.value2),this.productNoTotal=this.productNo.reduce((e,t)=>e+t,0),this.passNoTotal=this.passNo.reduce((e,t)=>e+t,0),this.passRate=(this.passNoTotal/this.productNoTotal*100).toFixed(0),this.getChartsOption();let a={rate:this.passRate,surplus:100-this.passRate,name:"合格数量"};this.getPieOption(a)},indexMethod(e){return e+1+"#"},getChartsOption(){let e={tooltip:{},grid:{left:"0%",right:"1%",bottom:"5%",top:"15%",containLabel:!0},xAxis:{data:this.dateArr,axisTick:{show:!1},axisLine:{lineStyle:{color:"#7e8c97"}},axisLabel:{color:"#fff"}},legend:{textStyle:{color:"#fff"},data:[{name:"生产数量",itemStyle:{color:"#307cd0"}},{name:"合格数量",itemStyle:{color:"#26d1ad"}}]},yAxis:{splitLine:{show:!0,lineStyle:{type:"dashed",color:"#7e8c97"}},axisLine:{lineStyle:{type:"dashed",color:"#fff"}}},series:[{name:"生产数量",type:"bar",data:this.productNo,itemStyle:{color:new this.$echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#307cd0"},{offset:.5,color:"#2667a6"},{offset:1,color:"#123148"}])}},{name:"合格数量",type:"bar",data:this.passNo,itemStyle:{color:new this.$echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#26d1ad"},{offset:.5,color:"#20a18d"},{offset:1,color:"#123148"}])}}]};this.getChartTable("echartTableRef",e)},getPieOption(e,t="#3bdfbc"){let a={series:[{name:e.rate,type:"pie",radius:["50%","60%"],hoverAnimation:!0,avoidLabelOverlap:!1,label:{show:!0,position:"center",fontSize:20,color:"#fff",fontWeight:"bold",formatter:"{c}%"},emphasis:{label:{show:!0,fontSize:20,color:"#fff",fontWeight:"bold"}},labelLine:{show:!1},data:[{value:this.passRate,name:"合格数量",itemStyle:{color:t}},{value:100-this.passRate,name:"剩余",itemStyle:{color:"#74869b"},emphasis:{disabled:!0,color:"#74869b"}}]}]};this.getChartTable("echartPieleRef1",a)},getChartTable(e,t){this.$nextTick(()=>{if(this.$refs[e]){const a=this.$echarts.init(this.$refs[e]);a.clear(),a.setOption(t),window.onresize=()=>{a.resize()}}})},formatter(e){return this.getTime(e.Date)},getTime(e){var t=new Date(e),a=t.getFullYear(),r=t.getMonth()+1,o=t.getDate();return a+"-"+this.fillZero(r)+"-"+this.fillZero(o)},fillZero(e){var t;return t=e<10?"0"+e:e,t},changeToElTableData(e){let t=[];for(let a=0;a<e[0].Members.length;a++){let r=e[0].Members[a].Caption,o={Caption:r};for(let t=0;t<e.length;t++){let r=e[t].Members[a].Value;o["value"+(t+1)]=r}t.push(o)}return t},generateTable(e,t){for(const a in t[0])if("Series"!==a){let r=e.insertRow();for(const e of t){let t=r.insertCell(),o=document.createTextNode(e[a]);"Param6"==a&&"TRUE"==e[a]?(r.className="result",t.style.color="#00ff1c"):"Param6"==a&&"FALSE"==e[a]&&(r.className="result",t.style.color="#ff0000"),t.appendChild(o)}}},generateTableHead(e,t){let a=e.createTHead(),r=a.insertRow();for(let o of t){let e=document.createElement("th"),t=document.createTextNode(o["Series"]);e.appendChild(t),r.appendChild(e)}}},mounted(){},watch:{},computed:{},filters:{}},g=(a("52e4"),a("6b0d")),v=a.n(g);const j=v()(O,[["render",u],["__scopeId","data-v-7916e282"]]);t["default"]=j},"605d":function(e,t,a){(function(t){var r=a("c6b6");e.exports="undefined"!=typeof t&&"process"==r(t)}).call(this,a("4362"))},"7e2c":function(e,t,a){},a640:function(e,t,a){"use strict";var r=a("d039");e.exports=function(e,t){var a=[][e];return!!a&&r((function(){a.call(null,t||function(){return 1},1)}))}},d58f:function(e,t,a){var r=a("59ed"),o=a("7b0b"),i=a("44ad"),l=a("07fa"),c=TypeError,s=function(e){return function(t,a,s,n){r(a);var d=o(t),h=i(d),f=l(d),b=e?f-1:0,u=e?-1:1;if(s<2)while(1){if(b in h){n=h[b],b+=u;break}if(b+=u,e?b<0:f<=b)throw c("Reduce of empty array with no initial value")}for(;e?b>=0:f>b;b+=u)b in h&&(n=a(n,h[b],b,d));return n}};e.exports={left:s(!1),right:s(!0)}}}]);
//# sourceMappingURL=chunk-11a44ecb.37043d48.js.map