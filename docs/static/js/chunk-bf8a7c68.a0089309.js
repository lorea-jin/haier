(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bf8a7c68"],{"14d9":function(e,t,a){"use strict";var l=a("23e7"),r=a("7b0b"),c=a("07fa"),o=a("3a34"),n=a("3511"),s=a("d039"),i=s((function(){return 4294967297!==[].push.call({length:4294967296},1)})),b=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},d=i||!b();l({target:"Array",proto:!0,arity:1,forced:d},{push:function(e){var t=r(this),a=c(t),l=arguments.length;n(a+l);for(var s=0;s<l;s++)t[a]=arguments[s],a++;return o(t,a),a}})},b56c:function(e,t,a){"use strict";a("efad")},cc8b:function(e,t,a){"use strict";a.r(t);var l=a("7a23");const r={class:"container-Box"},c={class:"mainbox"},o={class:"left",id:"table"},n={class:"leftContent Content"},s={id:"table1",ref:"table1"},i={id:"table",class:"elBox"},b={id:"table",class:"elBox"},d={class:"fail"};function h(e,t,a,h,u,p){const f=Object(l["resolveComponent"])("el-col"),m=Object(l["resolveComponent"])("el-table-column"),j=Object(l["resolveComponent"])("el-table"),O=Object(l["resolveComponent"])("el-row");return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",r,[Object(l["createElementVNode"])("section",c,[Object(l["createVNode"])(O,{class:"oneLine"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(f,{span:12},{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("div",o,[Object(l["createElementVNode"])("div",n,[Object(l["createElementVNode"])("table",s,null,512)])])]),_:1}),Object(l["createVNode"])(f,{span:12,class:"right"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(O,{class:"RightBox"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(f,null,{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("div",i,[Object(l["createVNode"])(j,{data:u.listRightTopdata},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(m,{prop:"Caption",label:"",align:"center"}),Object(l["createVNode"])(m,{prop:"value1",label:"一次性合格率",align:"center"}),Object(l["createVNode"])(m,{prop:"value2",label:"返修合格率",align:"center"})]),_:1},8,["data"])])]),_:1})]),_:1}),Object(l["createVNode"])(O,{class:"RightBox"},{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("div",b,[Object(l["createVNode"])(j,{data:u.listRightBottomdata},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(m,{prop:"Caption",label:"",align:"center"}),Object(l["createVNode"])(m,{prop:"value1",label:"已检测数量",align:"center"}),Object(l["createVNode"])(m,{prop:"value2",label:"不合格数量",align:"center"},{default:Object(l["withCtx"])(e=>[Object(l["createElementVNode"])("span",d,Object(l["toDisplayString"])(e.row.value2),1)]),_:1}),Object(l["createVNode"])(m,{prop:"value3",label:"一次性合格率",align:"center"})]),_:1},8,["data"])])]),_:1})]),_:1})]),_:1})])])}a("14d9");var u=a("1b67");const p={Series:""},f={Series:"",Model:"产品型号",ModelID:"机编",Param1:"冷媒类型",Param2:"预抽真空",Param3:"抽真空",Param4:"泄露真空度",Param5:"充注量",Param6:"判定结果",Param7:"人工扫描合格率"};var m={name:"index04",props:{searchDate:{type:String}},components:{},data(){return{tableData:[],listRightTopdata:[],listRightBottomdata:[]}},created(){let e=this.searchDate?this.searchDate:new Date;this.getTable(e)},methods:{async getTable(e){console.log(e);const{Data:t}=await u.getTable04;this.tableData=t.Part1Objects,this.listRightTopdata=this.changeToElTableData(t.Part2Objects),this.listRightBottomdata=this.changeToElTableData(t.Part3Objects),this.tableData=[f,...this.tableData],this.generateTable(this.$refs.table1,this.tableData),this.generateTableHead(this.$refs.table1,this.tableData)},indexMethod(e){return e+1+"#"},changeToElTableData(e){let t=[];for(let a=0;a<e[0].Members.length;a++){let l=e[0].Members[a].Caption,r={Caption:l};for(let t=0;t<e.length;t++){let l=e[t].Members[a].Value;r["value"+(t+1)]=l}t.push(r)}return t},generateTable(e,t){for(const a in t[0])if("Series"!==a){let l=e.insertRow();for(const e of t){let t=l.insertCell(),r=document.createTextNode(e[a]);"Param6"==a&&"TRUE"==e[a]?(l.className="result",t.style.color="#00ff1c"):"Param6"==a&&"FALSE"==e[a]&&(l.className="result",t.style.color="#ff0000"),t.appendChild(r)}}},generateTableHead(e,t){let a=e.createTHead(),l=a.insertRow();for(let r of t){let e=document.createElement("th"),t=document.createTextNode(r["Series"]);e.appendChild(t),l.appendChild(e)}},delWithRight(e){let t=e.map((e,t)=>{for(const a in e.Members)e["Value"+a]=e.Members[a].Value,0==t&&(p["Value"+a]=e.Members[a].Caption);return delete e.Members,{...e}});return t}},mounted(){},watch:{},computed:{},filters:{},beforeUnmount(){this.$refs.table1.remove()}},j=(a("b56c"),a("6b0d")),O=a.n(j);const g=O()(m,[["render",h],["__scopeId","data-v-76d18e2e"]]);t["default"]=g},efad:function(e,t,a){}}]);
//# sourceMappingURL=chunk-bf8a7c68.a0089309.js.map