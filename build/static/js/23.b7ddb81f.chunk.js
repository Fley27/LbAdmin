(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[23],{105:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"c",(function(){return d})),a.d(t,"b",(function(){return p})),a.d(t,"d",(function(){return m})),a.d(t,"e",(function(){return h}));var n=a(12),r=a.n(n),c=a(22),l=a(11),o=a.n(l),s=a(32),i=a(0),u=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},c=JSON.stringify(e),a({type:i.b}),t.prev=3,t.next=6,o.a.post("http://localhost:5000/api/challengeCategory",c,n);case 6:l=t.sent,a({type:i.c,payload:l.data.challengeCategory}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(3),a({type:i.a});case 13:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},c=JSON.stringify(e),a({type:i.P}),t.prev=3,t.next=6,o.a.put("http://localhost:5000/api/challengeCategory",c,n);case 6:l=t.sent,a({type:i.Q,payload:l.data}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),a({type:i.O}),a(Object(s.a)("Error ".concat(t.t0),"danger"));case 14:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}()},p=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},a({type:i.x}),t.prev=2,c=e._id,t.next=6,o.a.delete("http://localhost:5000/api/challengeCategory/".concat(c),n);case 6:l=t.sent,a({type:i.y,payload:l.data.success}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(2),a({type:i.w}),a(Object(s.a)("Error ".concat(t.t0),"danger"));case 14:case"end":return t.stop()}}),t,null,[[2,10]])})));return function(e){return t.apply(this,arguments)}}()},m=function(){return function(){var e=Object(c.a)(r.a.mark((function e(t){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:i.hb}),e.prev=1,e.next=4,o.a.get("http://localhost:5000/api/challengeCategory");case 4:a=e.sent,t({type:i.ib,payload:a.data.challengeCategories}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),t({type:i.gb}),t(Object(s.a)("Error ".concat(e.t0),"danger"));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},h=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json"}},c=JSON.stringify(e),a({type:i.Fb}),t.prev=3,t.next=6,o.a.post("http://localhost:5000/api/challengeCategory/select",c,n);case 6:l=t.sent,a({type:i.Gb,payload:l.data.challengeCategory}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),a({type:i.Eb}),a(Object(s.a)("Error ".concat(t.t0),"danger"));case 14:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}()}},197:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(15),c=a(17),l=a(16),o=a(2),s=a.n(o),i=a(230),u=(a(96),a(225)),d=a(30),p=a(105),m=a(99),h=a(157),g=a(232),y=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={deleteShow:!1,deleted:!1},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.props.loadChallengeCategory()}},{key:"componentWillReceiveProps",value:function(e){var t=e.challengeCategory.deleted;t&&(console.log("".concat(t)),this.setState({deleted:t}))}},{key:"deleteShow",value:function(){this.setState({deleteShow:!this.state.deleteShow})}},{key:"render",value:function(){var e=this,t=this.props.challengeCategory.challengeCategories;return console.log(this.props.challengeCategory),s.a.createElement("div",{className:"main-content"},s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-12"},s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-header card-header-danger"},s.a.createElement("h4",{className:"card-title "},"Listado de Tipo de Retos"),s.a.createElement("p",{className:"card-category"},"Seleccione un campo para editar")),s.a.createElement("div",{className:"card-body"},s.a.createElement(m.a,{md:12},s.a.createElement(h.a,{onClick:function(){e.props.history.push("/challenge/addchallengecategoria")},className:"btn-danger text-center"},"Crear")),s.a.createElement(m.a,null,t?s.a.createElement("div",{className:"table-responsive"},s.a.createElement("table",{className:"table table-hover"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"Identificador"),s.a.createElement("th",null,"T\xedtulo"),s.a.createElement("th",null))),s.a.createElement("tbody",null,t.map((function(t,a){return a<5?s.a.createElement("tr",{key:a},s.a.createElement("td",null,t.identifier),s.a.createElement("td",null,t.name),s.a.createElement("td",{className:"td-actions text-right"},s.a.createElement(i.a,{title:"Edit"},s.a.createElement("button",{onClick:function(){e.props.selectChallengeCategory(t),e.props.history.push("/dashboard/editchallengecategory")},"aria-label":"Edit"},s.a.createElement("i",{className:"material-icons warning"},"edit"))),s.a.createElement(i.a,{title:"Borrar"},s.a.createElement("button",{onClick:function(){e.props.selectChallengeCategory(t),e.deleteShow()},"aria-label":"Borrar"},s.a.createElement("i",{className:"material-icons danger"},"close"))))):null}))))):s.a.createElement(m.a,{className:"text-center"},s.a.createElement("p",null,s.a.createElement("strong",null,"Challenge Category's list is empty"))))))))),s.a.createElement(g.a,{show:this.state.deleteShow,onHide:function(){e.deleteShow()}},s.a.createElement(g.a.Header,{className:"border"},s.a.createElement(m.a,{md:12,className:"text-center"},this.state.deleted?s.a.createElement("i",{className:"material-icons error-outline"},"check_circle"):s.a.createElement("i",{className:"material-icons error-outline"},"error"))),s.a.createElement(g.a.Body,{className:"border"},this.state.deleted?s.a.createElement(m.a,{md:12,className:"text-center"},s.a.createElement("h4",{className:"title"},"Borrado"),s.a.createElement("h5",{className:"subTile"},"Ha sido borrado")):s.a.createElement(m.a,{md:12,className:"text-center"},s.a.createElement("h4",{className:"title"},"\xbfEstas seguro de que quieres borrar esta categoria?"),s.a.createElement("h5",{className:"subTitle"},"No podr\xe1 recuperar los datos borrados"))),s.a.createElement(g.a.Footer,{className:"border"},this.state.deleted?s.a.createElement("div",{className:"container-footer"},s.a.createElement(h.a,{onClick:function(){e.deleteShow()},className:"bottom-danger"},"Ok")):s.a.createElement("div",{className:"container-footer"},s.a.createElement(h.a,{className:"bottom-primary",onClick:function(){e.deleteShow()}},"No Borrar"),s.a.createElement(h.a,{onClick:function(){var t=e.props.challengeCategory.challengeCategory;e.props.deleteChallengeCategory(t)},className:"bottom-danger"},"Borrar")))))}}]),a}(o.Component);t.default=Object(d.b)((function(e){return{challengeCategory:e.challengeCategory}}),{loadChallengeCategory:p.d,selectChallengeCategory:p.e,deleteChallengeCategory:p.b})(Object(u.a)(y))},96:function(e,t,a){}}]);
//# sourceMappingURL=23.b7ddb81f.chunk.js.map