(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[10],{103:function(e,a,t){"use strict";t.d(a,"a",(function(){return u})),t.d(a,"c",(function(){return p})),t.d(a,"b",(function(){return d})),t.d(a,"d",(function(){return m})),t.d(a,"e",(function(){return h}));var n=t(12),r=t.n(n),l=t(22),c=t(11),o=t.n(c),s=t(32),i=t(0),u=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.e}),a.prev=3,a.next=6,o.a.post("https://libidoonbackend.herokuapp.com/api/challengeType",l,n);case 6:c=a.sent,t({type:i.f,payload:c.data.challengeType}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:i.d}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()},p=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c,u,p;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.G}),a.prev=3,c=e.id,u=c,a.next=8,o.a.put("https://libidoonbackend.herokuapp.com/api/challengeType/".concat(u),l,n);case 8:p=a.sent,t({type:i.H,payload:p.data.challengeType}),a.next=16;break;case 12:a.prev=12,a.t0=a.catch(3),t({type:i.F}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 16:case"end":return a.stop()}}),a,null,[[3,12]])})));return function(e){return a.apply(this,arguments)}}()},d=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},t({type:i.u}),a.prev=2,l=e._id,a.next=6,o.a.delete("https://libidoonbackend.herokuapp.com/api/challengeType/".concat(l),n);case 6:c=a.sent,t({type:i.v,payload:c.data.success}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(2),t({type:i.t}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[2,10]])})));return function(e){return a.apply(this,arguments)}}()},m=function(){return function(){var e=Object(l.a)(r.a.mark((function e(a){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a({type:i.S}),e.prev=1,e.next=4,o.a.get("https://libidoonbackend.herokuapp.com/api/challengeType");case 4:t=e.sent,a({type:i.T,payload:t.data.challengeTypes}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),a({type:i.R}),a(Object(s.a)("Error ".concat(e.t0),"danger"));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(a){return e.apply(this,arguments)}}()},h=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.kb}),a.prev=3,a.next=6,o.a.post("https://libidoonbackend.herokuapp.com/api/challengeType/select",l,n);case 6:c=a.sent,t({type:i.lb,payload:c.data.challengeType}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:i.jb}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()}},104:function(e,a,t){"use strict";t.d(a,"a",(function(){return u})),t.d(a,"c",(function(){return p})),t.d(a,"b",(function(){return d})),t.d(a,"d",(function(){return m})),t.d(a,"e",(function(){return h}));var n=t(12),r=t.n(n),l=t(22),c=t(11),o=t.n(c),s=t(32),i=t(0),u=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.b}),a.prev=3,a.next=6,o.a.post("http://localhost:5000/api/challengeCategory",l,n);case 6:c=a.sent,t({type:i.c,payload:c.data.challengeCategory}),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:i.a});case 13:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()},p=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.D}),a.prev=3,a.next=6,o.a.put("http://localhost:5000/api/challengeCategory",l,n);case 6:c=a.sent,t({type:i.E,payload:c.data}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:i.C}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()},d=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},t({type:i.r}),a.prev=2,l=e._id,a.next=6,o.a.delete("http://localhost:5000/api/challengeCategory/".concat(l),n);case 6:c=a.sent,t({type:i.s,payload:c.data.success}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(2),t({type:i.q}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[2,10]])})));return function(e){return a.apply(this,arguments)}}()},m=function(){return function(){var e=Object(l.a)(r.a.mark((function e(a){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a({type:i.P}),e.prev=1,e.next=4,o.a.get("http://localhost:5000/api/challengeCategory");case 4:t=e.sent,a({type:i.Q,payload:t.data.challengeCategories}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),a({type:i.O}),a(Object(s.a)("Error ".concat(e.t0),"danger"));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(a){return e.apply(this,arguments)}}()},h=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.hb}),a.prev=3,a.next=6,o.a.post("http://localhost:5000/api/challengeCategory/select",l,n);case 6:c=a.sent,t({type:i.ib,payload:c.data.challengeCategory}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:i.gb}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()}},109:function(e,a,t){},110:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var n=t(12),r=t.n(n),l=t(22),c=t(11),o=t.n(c),s=(t(32),t(0)),i=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"multipart/form-data"}},t({type:s.ub}),a.prev=2,a.next=5,o.a.post("https://libidoonbackend.herokuapp.com/api/image/upload",e,n);case 5:l=a.sent,t({type:s.vb,payload:l.data}),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(2),t({type:s.tb});case 12:case"end":return a.stop()}}),a,null,[[2,9]])})));return function(e){return a.apply(this,arguments)}}()}},114:function(e,a,t){"use strict";t.d(a,"a",(function(){return u})),t.d(a,"c",(function(){return p})),t.d(a,"b",(function(){return d})),t.d(a,"d",(function(){return m})),t.d(a,"e",(function(){return h}));var n=t(12),r=t.n(n),l=t(22),c=t(11),o=t.n(c),s=t(32),i=t(0),u=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.h}),a.prev=3,a.next=6,o.a.post("https://libidoonbackend.herokuapp.com/api/challenge",l,n);case 6:c=a.sent,t({type:i.i,payload:c.data.challenge}),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:i.g});case 13:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()},p=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.J}),a.prev=3,a.next=6,o.a.put("https://libidoonbackend.herokuapp.com/api/challenge/",l,n);case 6:c=a.sent,t({type:i.K,payload:c.data}),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:i.I});case 13:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()},d=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},t({type:i.x}),a.prev=2,l=e._id,a.next=6,o.a.delete("https://libidoonbackend.herokuapp.com/api/challenge/".concat(l),n);case 6:c=a.sent,t({type:i.y,payload:c.data.success}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(2),t({type:i.w}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[2,10]])})));return function(e){return a.apply(this,arguments)}}()},m=function(){return function(){var e=Object(l.a)(r.a.mark((function e(a){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a({type:i.V}),e.prev=1,e.next=4,o.a.get("https://libidoonbackend.herokuapp.com/api/challenge");case 4:t=e.sent,a({type:i.W,payload:t.data.challenges}),a(Object(s.a)("Exito","primary")),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),a({type:i.U}),a(Object(s.a)("Error ".concat(e.t0),"danger"));case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(a){return e.apply(this,arguments)}}()},h=function(e){return function(){var a=Object(l.a)(r.a.mark((function a(t){var n,l,c;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:i.nb}),a.prev=3,a.next=6,o.a.post("https://libidoonbackend.herokuapp.com/api/challenge/select",l,n);case 6:c=a.sent,t({type:i.ob,payload:c.data.challenge}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:i.mb}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()}},133:function(e,a,t){"use strict";var n=t(2),r=t.n(n),l=t(108),c=t(99),o=t(113);t(109);a.a=function(e){return e.answers.map((function(a,t){var n="image-".concat(t),s=a.image,i="tag-".concat(t),u=a.placeholder;return r.a.createElement("div",{key:a.index,className:"cont"},r.a.createElement(l.a,{className:"textarea "},r.a.createElement(c.a,{md:4},r.a.createElement(l.a,null,r.a.createElement(c.a,null,r.a.createElement(o.a.Group,null,r.a.createElement(o.a.Label,null,"Imagen ",t+1),r.a.createElement("label",{htmlFor:n,className:"custom-file-upload"},r.a.createElement("i",{className:"material-icons "},"attach_file")),r.a.createElement("input",{id:n,name:"image","data-id":t,onChange:e.HandleChange,type:"file"}))),r.a.createElement(c.a,null,r.a.createElement("div",{style:{height:50,width:50,borderRadius:5,marginTop:28,boxShadow:"0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}},r.a.createElement("div",{style:{overflow:"hidden",height:50,width:50},className:"image-container w-auto"},r.a.createElement("img",{src:s,alt:"",style:{height:50,width:50}})))))),r.a.createElement(c.a,{md:6},r.a.createElement(o.a.Group,null,r.a.createElement(o.a.Label,null,"Descripcion de la repuesta*"),r.a.createElement(o.a.Control,{id:i,name:"description",placeholder:u,"data-id":t,onChange:e.HandleChange,as:"textarea",rows:"3",cols:"20"}))),r.a.createElement(c.a,{md:2},r.a.createElement("div",{style:{marginTop:28},className:"form small"},0===t?r.a.createElement("button",{style:{width:30,height:30,overflow:"hidden",borderRadius:50,display:"flex",justifyContent:"center",outline:"none"},onClick:function(){return e.add()},type:"button",className:"btn-primary"},r.a.createElement("i",{className:"fa fa-plus-circle","aria-hidden":"true",style:{margin:"auto 0",outline:"none"}})):r.a.createElement("button",{className:"btn-danger",onClick:function(){return e.delete(a)},type:"button",style:{width:30,height:30,overflow:"hidden",borderRadius:50,display:"flex",justifyContent:"center",outline:"none"}},r.a.createElement("i",{className:"fa fa-minus-circle ","aria-hidden":"true",style:{margin:"auto 0",outline:"none"}}))))))}))}},134:function(e,a,t){"use strict";var n=t(1),r=t(164),l=t(2),c=t.n(l),o=t(158),s=t.n(o),i=t(163);t(135),t(136);a.a=function(e){var a=e.HandleChange,t=e.items,l=e.label,o=Object(r.a)(e,["HandleChange","items","label"]),u={control:function(e){return Object(n.a)(Object(n.a)({},e),{},{background:"#f4f7fa",minHeight:50})},option:function(e,a){var t=a.data,r=a.isDisabled,l=a.isFocused,c=a.isSelected,o=s()(t.color);return Object(n.a)(Object(n.a)({},e),{},{backgroundColor:r?null:c?t.color:l?o.alpha(.1).css():null,color:r?"#ccc":c?s.a.contrast(o,"white")>2?"white":"black":t.color,cursor:r?"not-allowed":"default",":active":Object(n.a)(Object(n.a)({},e[":active"]),{},{backgroundColor:!r&&(c?t.color:o.alpha(.3).css())})})},multiValue:function(e,a){var t=a.data,r=s()(t.color);return Object(n.a)(Object(n.a)({},e),{},{backgroundColor:r.alpha(.1).css()})},multiValueLabel:function(e,a){var t=a.data;return Object(n.a)(Object(n.a)({},e),{},{color:t.color})},multiValueRemove:function(e,a){var t=a.data;return Object(n.a)(Object(n.a)({},e),{},{color:t.color,":hover":{backgroundColor:t.color,color:"white"}})}};return c.a.createElement("div",{className:"combo-group"},c.a.createElement("label",{className:"label"},l),c.a.createElement(i.a,Object.assign({isMulti:!0,closeMenuOnSelect:!1,onChange:a},o,{options:t,styles:u})))}},135:function(e,a,t){},136:function(e,a,t){},137:function(e,a){a.Orientation=[{value:"Heterosexual",label:"Heterosexual",color:"black"},{value:"Heteroflexible",label:"Heteroflexible",color:"black"},{value:"Bisexual",label:"Bisexual",color:"black"},{value:"Gay",label:"Gay",color:"black"},{value:"Lesbiana",label:"Lesbiana",color:"black"},{value:"Pansexual",label:"Pansexual",color:"black"}],a.Pair=[{value:"Mujer Heterosexual",label:"Mujer Heterosexual",color:"black"},{value:"Mujer Heteroflexible",label:"Mujer Heteroflexible",color:"black"},{value:"Mujer Bisexual",label:"Mujer Bisexual",color:"black"},{value:"Mujer Lesbiana",label:"Mujer Lesbiana",color:"black"},{value:"Mujer Pansexual",label:"Mujer Pansexual",color:"black"},{value:"Hombre Heterosexual",label:"Hombre Heterosexual",color:"black"},{value:"Hombre Heteroflexible",label:"Hombre Heteroflexible",color:"black"},{value:"Hombre Bisexual",label:"Hombre Bisexual",color:"black"},{value:"Hombre Gay",label:"Hombre Gay",color:"black"},{value:"Hombre Pansexual",label:"Hombre Pansexual",color:"black"}]},188:function(e,a,t){"use strict";t.r(a);var n=t(13),r=t(14),l=t(15),c=t(17),o=t(16),s=t(2),i=t.n(s),u=t(113),p=t(99),d=t(108),m=t(156),h=t(133),b=(t(96),t(222)),g=t(30),f=t(114),v=t(104),y=t(103),E=t(110),x=t(134),C=t(137),w=function(e){Object(c.a)(t,e);var a=Object(o.a)(t);function t(e){var l;return Object(r.a)(this,t),(l=a.call(this,e)).handleChange=function(e){console.log("targeting state "+e.target.id+" with value "+e.target.value),l.setState({[e.target.id]:e.target.value})},l.HandleChange=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;console.group("Value Changed"),l.setState({[a.name]:e}),console.groupEnd()},l.onSubmit=function(e){e.preventDefault();var a=[],t=[],n=[],r=l.state.answers,c={};c.title=l.state.title,c.cost=l.state.cost,c.description=l.state.description,c.appUsage=l.state.appUsage,c.profileType=l.state.profileType,c.answerType=l.state.answerType,c.DurationHours=l.state.DurationHours,c.category=l.state.category;var o=l.props.challengeType.challengeTypes;c.type=o[l.state.type]._id;var s=c;(c={}).senderSex=l.state.senderSex,c.receiverSex=l.state.receiverSex,l.state.senderOrientation.map((function(e){t.push(e.value)})),l.state.receiverOrientation.map((function(e){a.push(e.value),console.log(e)})),c.senderOrientation=t,c.receiverOrientation=a;var i=c;c={},l.state.senderPair.map((function(e){n.push(e.value),console.log(e)})),l.state.receiverPair.map((function(e){n.push(e.value),console.log(e)})),c.senderPair=n,c.receiverPair=[];var u=c;(c={}).challengeData=s,c.challengeAnswerData=r,c.challengeIndividualData=i,c.challengePairData=u,l.props.addChallenge(c)},l.Change=function(e){if(["description"].includes(e.target.name)){var a=Object(n.a)(l.state.answers);console.log("just logging"),a[e.target.dataset.id][e.target.name]=e.target.value}else if(["image"].includes(e.target.name)){console.log("just logging");var t=new FormData;t.append("file",e.target.files[0]),l.props.uploadImage(t),console.log("https://libidoonbackend.herokuapp.com/".concat(e.target.files[0].name)),Object(n.a)(l.state.answers)[e.target.dataset.id][e.target.name]="https://libidoonbackend.herokuapp.com/".concat(e.target.files[0].name)}},l.addNewRow=function(e){l.state.answers.length<6&&l.setState((function(e){return{answers:[].concat(Object(n.a)(e.answers),[{index:Math.random(),image:"",description:""}])}}))},l.deteteRow=function(e){l.setState({answers:l.state.answers.filter((function(a,t){return e!==t}))})},l.state={title:"",description:"",cost:"",category:"",type:"",appUsage:"Citas Reales",profileType:"",senderSex:"",receiverSex:"",answers:[{index:Math.random(),image:"",description:"",placeholder:""}],senderOrientation:[],receiverOrientation:[],senderPair:[],receiverPair:[],answerType:"Texto",filename:"",DurationHours:""},l}return Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.loadChallengeType(),this.props.loadChallengeCategory()}},{key:"componentWillReceiveProps",value:function(e){var a=e.challenge.challenge;a&&(console.log("".concat(a)),this.setState({description:"",cost:"",category:"",type:"",appUsage:"Citas Reales",profileType:"",senderSex:"",receiverSex:"",answers:[{index:Math.random(),image:"",description:""}],senderOrientation:[],receiverOrientation:[],senderPair:[],receiverPair:[],answerType:"Texto",filename:"",DurationHours:""}),this.props.history.push("/dashboard/challenge"));var t=e.image.upload;t&&this.setState({filename:t.filename})}},{key:"clickOnDelete",value:function(e){this.setState({answers:this.state.answers.filter((function(a){return a!==e}))})}},{key:"render",value:function(){var e=this.props.challengeType.challengeTypes,a=this.props.challengeCategory.challengeCategories;return console.log(e),console.log(a),console.log(this.state.answers.map((function(e){return e.image}))),i.a.createElement("div",{className:"main-content"},i.a.createElement("div",{className:"container-fluid"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-md-12"},i.a.createElement("div",{className:"card"},i.a.createElement("div",{className:"card-header card-header-danger"},i.a.createElement("h4",{className:"card-title "},"Crear nuevos retos")),i.a.createElement("div",{className:"card-body"},i.a.createElement(u.a,{className:"mb-form",onSubmit:this.onSubmit,md:12},i.a.createElement(p.a,{className:"w-80"},i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"w-40 outline-none"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Titulo*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.title,id:"title",type:"text",placeholder:"Titulo..."}))),i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Coste*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.cost,id:"cost",type:"number",placeholder:"Coste..."}))))),i.a.createElement(p.a,{className:"w-80"},i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Categoria*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.category,id:"category",as:"select",className:"mb-3"},i.a.createElement("option",{value:""},"Seleccionar una categoria"),a?a.map((function(e,a){return i.a.createElement("option",{value:e._id},e.name)})):null))),i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Tipologia*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.type,id:"type",as:"select",className:"mb-3"},i.a.createElement("option",{value:""},"Seleccionar una tipologia"),e?e.map((function(e,a){return i.a.createElement("option",{value:a},e.name)})):null))))),i.a.createElement(p.a,{className:"w-80"},i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Uso de la App*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.appUsage,id:"appUsage",as:"select",className:"mb-3"},i.a.createElement("option",{value:"Citas Reales"},"Citas Reales"),i.a.createElement("option",{value:"Ciber Sexo"},"Ciber Sexo")))),i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Tipo de Perfil*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.profileType,id:"profileType",as:"select",className:"mb-3"},i.a.createElement("option",{value:""},"Seleccionar un tipo de prefil"),i.a.createElement("option",{value:"Soltero"},"Soltero"),i.a.createElement("option",{value:"Pareja"},"Pareja")))))),"Soltero"===this.state.profileType?i.a.createElement(p.a,{className:"w-80"},i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Sexo Remitante*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.senderSex,id:"senderSex",as:"select",className:"mb-3"},i.a.createElement("option",{value:""},"Selecciona"),i.a.createElement("option",{value:"Hombre"},"Hombre"),i.a.createElement("option",{value:"Mujer"},"Mujer")))),i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Sexo Destinatario*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.receiverSex,id:"receiverSex",as:"select",className:"mb-3"},i.a.createElement("option",{value:""},"Selecciona"),i.a.createElement("option",{value:"Hombre"},"Hombre"),i.a.createElement("option",{value:"Mujer"},"Mujer"))))),i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"w-40"},i.a.createElement(x.a,{name:"senderOrientation",label:"Orientacion Remitante",items:C.Orientation,HandleChange:this.HandleChange})),i.a.createElement(p.a,{className:"w-40"},i.a.createElement(x.a,{name:"receiverOrientation",label:"Orientacion Destinatario",items:C.Orientation,HandleChange:this.HandleChange})))):"Pareja"===this.state.profileType?i.a.createElement(p.a,{className:"w-80"},i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"w-40"},i.a.createElement(x.a,{name:"senderPair",label:"Pareja Remitante",items:C.Pair,HandleChange:this.HandleChange})),i.a.createElement(p.a,{className:"w-40"},i.a.createElement(x.a,{name:"receiverPair",label:"Pareja Destinatario",items:C.Pair,HandleChange:this.HandleChange})))):null,i.a.createElement(p.a,{className:"w-80"},i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Temporizador*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.DurationHours,id:"DurationHours",as:"select",placeholder:"Tiempo de expiracion..."},i.a.createElement("option",{value:"24"},"1 dia"),i.a.createElement("option",{value:"48"},"2 dia "),i.a.createElement("option",{value:"72"},"3 dia "),i.a.createElement("option",{value:"96"},"4 dia "),i.a.createElement("option",{value:"120"},"5 dia ")))),"imagen"==this.state.type?null:i.a.createElement(p.a,{className:"w-40"},i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Tipo de Respuesta*"),i.a.createElement(u.a.Control,{onChange:this.handleChange,value:this.state.answerType,id:"answerType",as:"select",className:"mb-3"},i.a.createElement("option",{value:"Texto"},"Texto"),i.a.createElement("option",{value:"Imagen"},"Imagen")))))),i.a.createElement(p.a,null,i.a.createElement(d.a,{className:"textarea "},i.a.createElement(p.a,null,i.a.createElement(u.a.Group,null,i.a.createElement(u.a.Label,null,"Descripcion del reto*"),i.a.createElement(u.a.Control,{id:"description",onChange:this.handleChange,value:this.state.description,as:"textarea",rows:"8",cols:"50"}))))),"0"===this.state.type?i.a.createElement(p.a,null,i.a.createElement(p.a,null,i.a.createElement("h4",null,i.a.createElement("strong",null,"Agrega las respuestas del reto"))),i.a.createElement(p.a,null,i.a.createElement(h.a,{add:this.addNewRow.bind(this),delete:this.clickOnDelete.bind(this),HandleChange:this.Change,type:this.state.answers,answers:this.state.answers}))):null,i.a.createElement(p.a,{md:8},i.a.createElement(m.a,{variant:"danger",type:"submit"},"GUARDAR")))))))))}}]),t}(s.Component);a.default=Object(g.b)((function(e){return{challengeType:e.challengeType,challengeCategory:e.challengeCategory,image:e.image,challenge:e.challenge}}),{addChallenge:f.a,loadChallengeCategory:v.d,loadChallengeType:y.d,uploadImage:E.a})(Object(b.a)(w))},96:function(e,a,t){}}]);
//# sourceMappingURL=10.ea02df46.chunk.js.map