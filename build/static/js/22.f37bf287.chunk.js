(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[22],{138:function(e,t,a){"use strict";a.d(t,"d",(function(){return u})),a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return m})),a.d(t,"e",(function(){return p})),a.d(t,"c",(function(){return h}));var r=a(12),n=a.n(r),c=a(22),o=a(11),s=a.n(o),l=a(32),i=a(0),u=function(){return function(){var e=Object(c.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:i.Y}),e.prev=1,e.next=4,s.a.get("https://libidoonbackend.herokuapp.com/api/user");case 4:a=e.sent,t({type:i.Z,payload:a.data.users}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),t({type:i.X}),t(Object(l.a)("Error ".concat(e.t0),"danger"));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(a){var r,c,o,u;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{"Content-Type":"application/json"}},a({type:i.o}),c=e._id,o=JSON.stringify(e),t.prev=4,t.next=7,s.a.put("https://libidoonbackend.herokuapp.com/api/user/block/".concat(c),o,r);case 7:u=t.sent,a({type:i.p,payload:u.data.success}),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(4),a({type:i.n}),a(Object(l.a)("Error ".concat(t.t0),"danger"));case 15:case"end":return t.stop()}}),t,null,[[4,11]])})));return function(e){return t.apply(this,arguments)}}()},m=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(a){var r,c,o;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{"Content-Type":"application/json"}},a({type:i.A}),c=e._id,t.prev=3,t.next=6,s.a.delete("https://libidoonbackend.herokuapp.com/api/user/delete/".concat(c),r);case 6:o=t.sent,a({type:i.B,payload:o.data.success}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),a({type:i.z}),a(Object(l.a)("Error ".concat(t.t0),"danger"));case 14:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}()},p=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(a){var r,c,o;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{"Content-Type":"application/json"}},a({type:i.qb}),c=JSON.stringify(e),t.prev=3,t.next=6,s.a.post("https://libidoonbackend.herokuapp.com/api/user/select",c,r);case 6:o=t.sent,a({type:i.rb,payload:o.data.user}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),a({type:i.pb}),a(Object(l.a)("Error ".concat(t.t0),"danger"));case 14:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}()},h=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(a){var r,c,o,u;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{"Content-Type":"application/json"}},a({type:i.M}),c=e.params,o=JSON.stringify(e),t.prev=4,t.next=7,s.a.put("https://libidoonbackend.herokuapp.com/api/user/coins/".concat(c),o,r);case 7:u=t.sent,a({type:i.N,payload:u.data.user}),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(4),a({type:i.L}),a(Object(l.a)("Error ".concat(t.t0),"danger"));case 15:case"end":return t.stop()}}),t,null,[[4,11]])})));return function(e){return t.apply(this,arguments)}}()}},198:function(e,t,a){"use strict";a.r(t);var r=a(14),n=a(15),c=a(17),o=a(16),s=a(2),l=a.n(s),i=a(227),u=(a(96),a(222)),d=a(30),m=a(138),p=a(229),h=a(99),b=a(156),E=function(e){Object(c.a)(s,e);var t=Object(o.a)(s);function s(e){var a;return Object(r.a)(this,s),(a=t.call(this,e)).onSubmit=function(e){e.preventDefault()},a.state={blockShow:!1,deleteShow:!1,blocked:!1,deleted:!1},a}return Object(n.a)(s,[{key:"componentDidMount",value:function(){this.props.loadUsers()}},{key:"componentWillReceiveProps",value:function(e){e.user.deleted&&(console.log("".concat(this.props.user)),this.setState({deleted:e.user.deleted})),e.user.blocked&&(console.log("".concat(this.props.user)),this.setState({blocked:e.user.blocked}))}},{key:"handleshow",value:function(){this.setState({blockShow:!this.state.blockShow})}},{key:"deleteShow",value:function(){this.setState({deleteShow:!this.state.deleteShow})}},{key:"render",value:function(){var e=this,t=this.props.user;console.log(t);var r=a(146);return l.a.createElement("div",{className:"main-content"},l.a.createElement("div",{className:"container-fluid"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-12"},l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-header card-header-danger"},l.a.createElement("h4",{className:"card-title "},"Listado de Usuarios"),l.a.createElement("p",{className:"card-category"},"Seleccione un campo para editar")),l.a.createElement("div",{className:"card-body"},l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",{className:"table table-hover"},l.a.createElement("thead",null,l.a.createElement("th",null,"Usuario"),l.a.createElement("th",null,"Genero"),l.a.createElement("th",null,"Orientacion"),l.a.createElement("th",null,"F. Nacimiento"),l.a.createElement("th",null,"N\xfamero de Monedas"),l.a.createElement("th",null)),l.a.createElement("tbody",null,t.users.map((function(t,a){return a<15?l.a.createElement("tr",{key:a},l.a.createElement("td",null,t.profile.name),l.a.createElement("td",null,t.profile.genre),l.a.createElement("td",null,t.profile.orientation),l.a.createElement("td",null,r(t.profile.birthdate,"dd/mm/yy")),l.a.createElement("td",null,t.profile.coins),l.a.createElement("td",{class:"td-actions text-right"},l.a.createElement(i.a,{title:"A\xf1adir/Sustraer monedas"},l.a.createElement("button",{onClick:function(){e.props.selectUser(t),e.props.history.push("/dashboard/addcoins")},"aria-label":"A\xf1adir/Sustraer monedas"},l.a.createElement("i",{class:"material-icons warning"},"account_balance_wallet"))),l.a.createElement(i.a,{title:"Bloquear  "},l.a.createElement("button",{"aria-label":"Bloquear",onClick:function(){e.handleshow(),e.props.selectUser(t)}},l.a.createElement("i",{class:"material-icons danger"},"block"))),l.a.createElement(i.a,{title:"Bloquear"},l.a.createElement("button",{onClick:function(){e.deleteShow(),e.props.selectUser(t)},"aria-label":"Borrar"},l.a.createElement("i",{class:"material-icons danger"},"close"))))):null})))))))))),l.a.createElement(p.a,{show:this.state.blockShow,onHide:function(){e.handleshow()}},l.a.createElement(p.a.Header,{className:"border"},l.a.createElement(h.a,{md:12,className:"text-center"},this.state.deleted?l.a.createElement("i",{className:"material-icons error-outline"},"check_circle"):l.a.createElement("i",{className:"material-icons error-outline"},"error"))),l.a.createElement(p.a.Body,{className:"border"},l.a.createElement(h.a,{md:12,className:"text-center"}),this.state.blocked?l.a.createElement(h.a,{md:12,className:"text-center"},l.a.createElement("h4",{className:"title"},"Bloqueado"),l.a.createElement("h5",{className:"subTile"},"El usuario ha sido bloqueado")):l.a.createElement(h.a,{md:12,className:"text-center"},l.a.createElement("h4",{className:"title"},"\xbfDesea bloquear el usuario?"))),l.a.createElement(p.a.Footer,{className:"border"},this.state.blocked?l.a.createElement("div",{className:"container-footer"},l.a.createElement(b.a,{onClick:function(){e.handleshow()},className:"bottom-danger"},"Ok")):l.a.createElement("div",{className:"container-footer"},l.a.createElement(b.a,{className:"bottom-primary",onClick:function(){e.handleshow()}},"No Bloquear"),l.a.createElement(b.a,{onClick:function(){var t=e.props.user.user;e.props.blockUser(t)},className:"bottom-danger"},"Bloquear")))),l.a.createElement(p.a,{show:this.state.deleteShow,onHide:function(){e.deleteShow()}},l.a.createElement(p.a.Header,{className:"border"},l.a.createElement(h.a,{md:12,className:"text-center"},this.state.deleted?l.a.createElement("i",{className:"material-icons error-outline"},"check_circle"):l.a.createElement("i",{className:"material-icons error-outline"},"error"))),l.a.createElement(p.a.Body,{className:"border"},this.state.deleted?l.a.createElement(h.a,{md:12,className:"text-center"},l.a.createElement("h4",{className:"title"},"Borrado"),l.a.createElement("h5",{className:"subTile"},"El usuario ha sido borrado")):l.a.createElement(h.a,{md:12,className:"text-center"},l.a.createElement("h4",{className:"title"},"\xbfEstas seguro de que quieres borrar este usuario?"),l.a.createElement("h5",{className:"subTitle"},"No podr\xe1 recuperar los usuarios borrados"))),l.a.createElement(p.a.Footer,{className:"border"},this.state.deleted?l.a.createElement("div",{className:"container-footer"},l.a.createElement(b.a,{onClick:function(){e.deleteShow()},className:"bottom-danger"},"Ok")):l.a.createElement("div",{className:"container-footer"},l.a.createElement(b.a,{className:"bottom-primary",onClick:function(){e.deleteShow()}},"No Borrar"),l.a.createElement(b.a,{onClick:function(){var t=e.props.user.user;e.props.deleteUser(t)},className:"bottom-danger"},"Borrar")))))}}]),s}(s.Component);t.default=Object(d.b)((function(e){return{auth:e.auth,user:e.user}}),{loadUsers:m.d,selectUser:m.e,blockUser:m.a,deleteUser:m.b})(Object(u.a)(E))},96:function(e,t,a){}}]);
//# sourceMappingURL=22.f37bf287.chunk.js.map