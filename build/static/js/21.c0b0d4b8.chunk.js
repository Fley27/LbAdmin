(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[21],{103:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"c",(function(){return d})),a.d(t,"b",(function(){return u})),a.d(t,"d",(function(){return m})),a.d(t,"e",(function(){return h}));var n=a(12),r=a.n(n),c=a(22),l=a(11),o=a.n(l),s=a(32),i=a(0),p=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},c=JSON.stringify(e),a({type:i.e}),t.prev=3,t.next=6,o.a.post("https://libidoonbackend.herokuapp.com/api/challengeType",c,n);case 6:l=t.sent,a({type:i.f,payload:l.data.challengeType}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),a({type:i.d}),a(Object(s.a)("Error ".concat(t.t0),"danger"));case 14:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l,p,d;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},c=JSON.stringify(e),a({type:i.G}),t.prev=3,l=e.id,p=l,t.next=8,o.a.put("https://libidoonbackend.herokuapp.com/api/challengeType/".concat(p),c,n);case 8:d=t.sent,a({type:i.H,payload:d.data.challengeType}),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(3),a({type:i.F}),a(Object(s.a)("Error ".concat(t.t0),"danger"));case 16:case"end":return t.stop()}}),t,null,[[3,12]])})));return function(e){return t.apply(this,arguments)}}()},u=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},a({type:i.u}),t.prev=2,c=e._id,t.next=6,o.a.delete("https://libidoonbackend.herokuapp.com/api/challengeType/".concat(c),n);case 6:l=t.sent,a({type:i.v,payload:l.data.success}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(2),a({type:i.t}),a(Object(s.a)("Error ".concat(t.t0),"danger"));case 14:case"end":return t.stop()}}),t,null,[[2,10]])})));return function(e){return t.apply(this,arguments)}}()},m=function(){return function(){var e=Object(c.a)(r.a.mark((function e(t){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:i.S}),e.prev=1,e.next=4,o.a.get("https://libidoonbackend.herokuapp.com/api/challengeType");case 4:a=e.sent,t({type:i.T,payload:a.data.challengeTypes}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),t({type:i.R}),t(Object(s.a)("Error ".concat(e.t0),"danger"));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},h=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},c=JSON.stringify(e),a({type:i.kb}),t.prev=3,t.next=6,o.a.post("https://libidoonbackend.herokuapp.com/api/challengeType/select",c,n);case 6:l=t.sent,a({type:i.lb,payload:l.data.challengeType}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),a({type:i.jb}),a(Object(s.a)("Error ".concat(t.t0),"danger"));case 14:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}()}},197:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(15),c=a(17),l=a(16),o=a(2),s=a.n(o),i=a(227),p=(a(96),a(222)),d=a(30),u=a(103),m=a(99),h=a(156),y=a(229),b=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={deleteShow:!1,deleted:!1},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.props.loadChallengeType()}},{key:"componentWillReceiveProps",value:function(e){var t=e.challengeType.deleted;t&&(console.log("".concat(t)),this.setState({deleted:t}))}},{key:"deleteShow",value:function(){this.setState({deleteShow:!this.state.deleteShow})}},{key:"render",value:function(){var e=this,t=this.props.challengeType.challengeTypes;return console.log(this.props.challengeType),s.a.createElement("div",{className:"main-content"},s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-12"},s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-header card-header-danger"},s.a.createElement("h4",{className:"card-title "},"Listado de Tipo de Retos"),s.a.createElement("p",{className:"card-category"},"Seleccione un campo para editar")),s.a.createElement("div",{className:"card-body"},s.a.createElement(m.a,{md:12},s.a.createElement(h.a,{onClick:function(){e.props.history.push("/challenge/addchallengetype")},className:"btn-danger text-center"},"Crear")),s.a.createElement(m.a,null,s.a.createElement("div",{className:"table-responsive"},s.a.createElement("table",{className:"table table-hover"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"Identificador"),s.a.createElement("th",null,"T\xedtulo"),s.a.createElement("th",null))),s.a.createElement("tbody",null,t.map((function(t,a){return a<5?s.a.createElement("tr",{key:a},s.a.createElement("td",null,t.identifier),s.a.createElement("td",null,t.name),s.a.createElement("td",{className:"td-actions text-right"},s.a.createElement(i.a,{title:"editar"},s.a.createElement("button",{"aria-label":"Editar",onClick:function(){e.props.selectChallengeType(t),e.props.history.push("/challenge/editchallengetype")}},s.a.createElement("i",{className:"material-icons warning"},"edit"))),s.a.createElement(i.a,{title:"Borrar"},s.a.createElement("button",{onClick:function(){e.props.selectChallengeType(t),e.deleteShow()},"aria-label":"Borrar"},s.a.createElement("i",{className:"material-icons danger"},"close"))))):null}))))))))))),s.a.createElement(y.a,{show:this.state.deleteShow,onHide:function(){e.deleteShow()}},s.a.createElement(y.a.Header,{className:"border"},s.a.createElement(m.a,{md:12,className:"text-center"},this.state.deleted?s.a.createElement("i",{className:"material-icons error-outline"},"check_circle"):s.a.createElement("i",{className:"material-icons error-outline"},"error"))),s.a.createElement(y.a.Body,{className:"border"},this.state.deleted?s.a.createElement(m.a,{md:12,className:"text-center"},s.a.createElement("h4",{className:"title"},"Borrado"),s.a.createElement("h5",{className:"subTile"},"Ese tipo de reto ha sido borrado")):s.a.createElement(m.a,{md:12,className:"text-center"},s.a.createElement("h4",{className:"title"},"\xbfEstas seguro de que quieres borrar este tipo de reto?"),s.a.createElement("h5",{className:"subTitle"},"No podr\xe1 recuperar los datos borrados"))),s.a.createElement(y.a.Footer,{className:"border"},this.state.deleted?s.a.createElement("div",{className:"container-footer"},s.a.createElement(h.a,{onClick:function(){e.deleteShow()},className:"bottom-danger"},"Ok")):s.a.createElement("div",{className:"container-footer"},s.a.createElement(h.a,{className:"bottom-primary",onClick:function(){e.deleteShow()}},"No Borrar"),s.a.createElement(h.a,{onClick:function(){var t=e.props.challengeType.challengeType;e.props.deleteChallengeType(t)},className:"bottom-danger"},"Borrar")))))}}]),a}(o.Component);t.default=Object(d.b)((function(e){return{challengeType:e.challengeType}}),{loadChallengeType:u.d,selectChallengeType:u.e,deleteChallengeType:u.b})(Object(p.a)(b))},96:function(e,t,a){}}]);
//# sourceMappingURL=21.c0b0d4b8.chunk.js.map