(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[16],{103:function(e,a,t){"use strict";t.d(a,"a",(function(){return d})),t.d(a,"c",(function(){return u})),t.d(a,"b",(function(){return f})),t.d(a,"d",(function(){return m})),t.d(a,"e",(function(){return p}));var r=t(12),n=t.n(r),l=t(22),i=t(11),c=t.n(i),s=t(32),o=t(0),d=function(e){return function(){var a=Object(l.a)(n.a.mark((function a(t){var r,l,i;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:o.e}),a.prev=3,a.next=6,c.a.post("https://libidoonbackend.herokuapp.com/api/challengeType",l,r);case 6:i=a.sent,t({type:o.f,payload:i.data.challengeType}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:o.d}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()},u=function(e){return function(){var a=Object(l.a)(n.a.mark((function a(t){var r,l,i,d,u;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:o.S}),a.prev=3,i=e.id,d=i,a.next=8,c.a.put("https://libidoonbackend.herokuapp.com/api/challengeType/".concat(d),l,r);case 8:u=a.sent,t({type:o.T,payload:u.data.challengeType}),a.next=16;break;case 12:a.prev=12,a.t0=a.catch(3),t({type:o.R}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 16:case"end":return a.stop()}}),a,null,[[3,12]])})));return function(e){return a.apply(this,arguments)}}()},f=function(e){return function(){var a=Object(l.a)(n.a.mark((function a(t){var r,l,i;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r={headers:{"Content-Type":"application/json"}},t({type:o.A}),a.prev=2,l=e._id,a.next=6,c.a.delete("https://libidoonbackend.herokuapp.com/api/challengeType/".concat(l),r);case 6:i=a.sent,t({type:o.B,payload:i.data.success}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(2),t({type:o.z}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[2,10]])})));return function(e){return a.apply(this,arguments)}}()},m=function(){return function(){var e=Object(l.a)(n.a.mark((function e(a){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a({type:o.kb}),e.prev=1,e.next=4,c.a.get("https://libidoonbackend.herokuapp.com/api/challengeType");case 4:t=e.sent,a({type:o.lb,payload:t.data.challengeTypes}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),a({type:o.jb}),a(Object(s.a)("Error ".concat(e.t0),"danger"));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(a){return e.apply(this,arguments)}}()},p=function(e){return function(){var a=Object(l.a)(n.a.mark((function a(t){var r,l,i;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r={headers:{"Content-Type":"application/json"}},l=JSON.stringify(e),t({type:o.Ib}),a.prev=3,a.next=6,c.a.post("https://libidoonbackend.herokuapp.com/api/challengeType/select",l,r);case 6:i=a.sent,t({type:o.Jb,payload:i.data.challengeType}),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(3),t({type:o.Hb}),t(Object(s.a)("Error ".concat(a.t0),"danger"));case 14:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e){return a.apply(this,arguments)}}()}},104:function(e,a,t){"use strict";var r=t(6),n=t(10),l=t(93),i=t.n(l),c=t(2),s=t.n(c),o=t(94),d=["xl","lg","md","sm","xs"],u=s.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,c=e.noGutters,u=e.as,f=void 0===u?"div":u,m=Object(n.a)(e,["bsPrefix","className","noGutters","as"]),p=Object(o.a)(t,"row"),b=p+"-cols",v=[];return d.forEach((function(e){var a,t=m[e];delete m[e];var r="xs"!==e?"-"+e:"";null!=(a=null!=t&&"object"===typeof t?t.cols:t)&&v.push(""+b+r+"-"+a)})),s.a.createElement(f,Object(r.a)({ref:a},m,{className:i.a.apply(void 0,[l,p,c&&"no-gutters"].concat(v))}))}));u.displayName="Row",u.defaultProps={noGutters:!1},a.a=u},106:function(e,a,t){"use strict";var r=t(6),n=t(10),l=t(93),i=t.n(l),c=t(2),s=t.n(c),o=(t(95),t(3)),d=t.n(o),u={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},f=s.a.forwardRef((function(e,a){var t=e.as,l=void 0===t?"div":t,c=e.className,o=e.type,d=void 0===o?"valid":o,u=e.tooltip,f=void 0!==u&&u,m=Object(n.a)(e,["as","className","type","tooltip"]);return s.a.createElement(l,Object(r.a)({},m,{ref:a,className:i()(c,d+"-"+(f?"tooltip":"feedback"))}))}));f.displayName="Feedback",f.propTypes=u;var m=f,p=s.a.createContext({controlId:void 0}),b=t(94),v=s.a.forwardRef((function(e,a){var t=e.id,l=e.bsPrefix,o=e.bsCustomPrefix,d=e.className,u=e.type,f=void 0===u?"checkbox":u,m=e.isValid,v=void 0!==m&&m,h=e.isInvalid,y=void 0!==h&&h,x=e.isStatic,O=e.as,j=void 0===O?"input":O,N=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"]),g=Object(c.useContext)(p),E=g.controlId,P=g.custom?[o,"custom-control-input"]:[l,"form-check-input"],w=P[0],k=P[1];return l=Object(b.a)(w,k),s.a.createElement(j,Object(r.a)({},N,{ref:a,type:f,id:t||E,className:i()(d,l,v&&"is-valid",y&&"is-invalid",x&&"position-static")}))}));v.displayName="FormCheckInput";var h=v,y=s.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.bsCustomPrefix,o=e.className,d=e.htmlFor,u=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(c.useContext)(p),m=f.controlId,v=f.custom?[l,"custom-control-label"]:[t,"form-check-label"],h=v[0],y=v[1];return t=Object(b.a)(h,y),s.a.createElement("label",Object(r.a)({},u,{ref:a,htmlFor:d||m,className:i()(o,t)}))}));y.displayName="FormCheckLabel";var x=y,O=s.a.forwardRef((function(e,a){var t=e.id,l=e.bsPrefix,o=e.bsCustomPrefix,d=e.inline,u=void 0!==d&&d,f=e.disabled,v=void 0!==f&&f,y=e.isValid,O=void 0!==y&&y,j=e.isInvalid,N=void 0!==j&&j,g=e.feedbackTooltip,E=void 0!==g&&g,P=e.feedback,w=e.className,k=e.style,C=e.title,I=void 0===C?"":C,T=e.type,F=void 0===T?"checkbox":T,R=e.label,S=e.children,V=e.custom,L=e.as,A=void 0===L?"input":L,_=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"]),z="switch"===F||V,G=z?[o,"custom-control"]:[l,"form-check"],M=G[0],J=G[1];l=Object(b.a)(M,J);var q=Object(c.useContext)(p).controlId,D=Object(c.useMemo)((function(){return{controlId:t||q,custom:z}}),[q,z,t]),B=null!=R&&!1!==R&&!S,H=s.a.createElement(h,Object(r.a)({},_,{type:"switch"===F?"checkbox":F,ref:a,isValid:O,isInvalid:N,isStatic:!B,disabled:v,as:A}));return s.a.createElement(p.Provider,{value:D},s.a.createElement("div",{style:k,className:i()(w,l,z&&"custom-"+F,u&&l+"-inline")},S||s.a.createElement(s.a.Fragment,null,H,B&&s.a.createElement(x,{title:I},R),(O||N)&&s.a.createElement(m,{type:O?"valid":"invalid",tooltip:E},P))))}));O.displayName="FormCheck",O.Input=h,O.Label=x;var j=O,N=s.a.forwardRef((function(e,a){var t=e.id,l=e.bsPrefix,o=e.bsCustomPrefix,d=e.className,u=e.isValid,f=e.isInvalid,m=e.lang,v=e.as,h=void 0===v?"input":v,y=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"]),x=Object(c.useContext)(p),O=x.controlId,j=x.custom?[o,"custom-file-input"]:[l,"form-control-file"],N=j[0],g=j[1];return l=Object(b.a)(N,g),s.a.createElement(h,Object(r.a)({},y,{ref:a,id:t||O,type:"file",lang:m,className:i()(d,l,u&&"is-valid",f&&"is-invalid")}))}));N.displayName="FormFileInput";var g=N,E=s.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.bsCustomPrefix,o=e.className,d=e.htmlFor,u=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(c.useContext)(p),m=f.controlId,v=f.custom?[l,"custom-file-label"]:[t,"form-file-label"],h=v[0],y=v[1];return t=Object(b.a)(h,y),s.a.createElement("label",Object(r.a)({},u,{ref:a,htmlFor:d||m,className:i()(o,t),"data-browse":u["data-browse"]}))}));E.displayName="FormFileLabel";var P=E,w=s.a.forwardRef((function(e,a){var t=e.id,l=e.bsPrefix,o=e.bsCustomPrefix,d=e.disabled,u=void 0!==d&&d,f=e.isValid,v=void 0!==f&&f,h=e.isInvalid,y=void 0!==h&&h,x=e.feedbackTooltip,O=void 0!==x&&x,j=e.feedback,N=e.className,E=e.style,w=e.label,k=e.children,C=e.custom,I=e.lang,T=e["data-browse"],F=e.as,R=void 0===F?"div":F,S=e.inputAs,V=void 0===S?"input":S,L=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"]),A=C?[o,"custom"]:[l,"form-file"],_=A[0],z=A[1];l=Object(b.a)(_,z);var G=Object(c.useContext)(p).controlId,M=Object(c.useMemo)((function(){return{controlId:t||G,custom:C}}),[G,C,t]),J=null!=w&&!1!==w&&!k,q=s.a.createElement(g,Object(r.a)({},L,{ref:a,isValid:v,isInvalid:y,disabled:u,as:V,lang:I}));return s.a.createElement(p.Provider,{value:M},s.a.createElement(R,{style:E,className:i()(N,l,C&&"custom-file")},k||s.a.createElement(s.a.Fragment,null,C?s.a.createElement(s.a.Fragment,null,q,J&&s.a.createElement(P,{"data-browse":T},w)):s.a.createElement(s.a.Fragment,null,J&&s.a.createElement(P,null,w),q),(v||y)&&s.a.createElement(m,{type:v?"valid":"invalid",tooltip:O},j))))}));w.displayName="FormFile",w.Input=g,w.Label=P;var k=w,C=(t(4),s.a.forwardRef((function(e,a){var t,l,o=e.bsPrefix,d=e.bsCustomPrefix,u=e.type,f=e.size,m=e.htmlSize,v=e.id,h=e.className,y=e.isValid,x=void 0!==y&&y,O=e.isInvalid,j=void 0!==O&&O,N=e.plaintext,g=e.readOnly,E=e.custom,P=e.as,w=void 0===P?"input":P,k=Object(n.a)(e,["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),C=Object(c.useContext)(p).controlId,I=E?[d,"custom"]:[o,"form-control"],T=I[0],F=I[1];if(o=Object(b.a)(T,F),N)(l={})[o+"-plaintext"]=!0,t=l;else if("file"===u){var R;(R={})[o+"-file"]=!0,t=R}else if("range"===u){var S;(S={})[o+"-range"]=!0,t=S}else if("select"===w&&E){var V;(V={})[o+"-select"]=!0,V[o+"-select-"+f]=f,t=V}else{var L;(L={})[o]=!0,L[o+"-"+f]=f,t=L}return s.a.createElement(w,Object(r.a)({},k,{type:u,size:m,ref:a,readOnly:g,id:v||C,className:i()(h,t,x&&"is-valid",j&&"is-invalid")}))})));C.displayName="FormControl";var I=Object.assign(C,{Feedback:m}),T=s.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,o=e.children,d=e.controlId,u=e.as,f=void 0===u?"div":u,m=Object(n.a)(e,["bsPrefix","className","children","controlId","as"]);t=Object(b.a)(t,"form-group");var v=Object(c.useMemo)((function(){return{controlId:d}}),[d]);return s.a.createElement(p.Provider,{value:v},s.a.createElement(f,Object(r.a)({},m,{ref:a,className:i()(l,t)}),o))}));T.displayName="FormGroup";var F=T,R=t(99),S=s.a.forwardRef((function(e,a){var t=e.as,l=void 0===t?"label":t,o=e.bsPrefix,d=e.column,u=e.srOnly,f=e.className,m=e.htmlFor,v=Object(n.a)(e,["as","bsPrefix","column","srOnly","className","htmlFor"]),h=Object(c.useContext)(p).controlId;o=Object(b.a)(o,"form-label");var y="col-form-label";"string"===typeof d&&(y=y+"-"+d);var x=i()(f,o,u&&"sr-only",d&&y);return m=m||h,d?s.a.createElement(R.a,Object(r.a)({as:"label",className:x,htmlFor:m},v)):s.a.createElement(l,Object(r.a)({ref:a,className:x,htmlFor:m},v))}));S.displayName="FormLabel",S.defaultProps={column:!1,srOnly:!1};var V=S,L=s.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,c=e.as,o=void 0===c?"small":c,d=e.muted,u=Object(n.a)(e,["bsPrefix","className","as","muted"]);return t=Object(b.a)(t,"form-text"),s.a.createElement(o,Object(r.a)({},u,{ref:a,className:i()(l,t,d&&"text-muted")}))}));L.displayName="FormText";var A=L,_=s.a.forwardRef((function(e,a){return s.a.createElement(j,Object(r.a)({},e,{ref:a,type:"switch"}))}));_.displayName="Switch",_.Input=j.Input,_.Label=j.Label;var z=_,G=t(100),M=Object(G.a)("form-row"),J=s.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.inline,c=e.className,o=e.validated,d=e.as,u=void 0===d?"form":d,f=Object(n.a)(e,["bsPrefix","inline","className","validated","as"]);return t=Object(b.a)(t,"form"),s.a.createElement(u,Object(r.a)({},f,{ref:a,className:i()(c,o&&"was-validated",l&&t+"-inline")}))}));J.displayName="Form",J.defaultProps={inline:!1},J.Row=M,J.Group=F,J.Control=I,J.Check=j,J.File=k,J.Switch=z,J.Label=V,J.Text=A;a.a=J},201:function(e,a,t){"use strict";t.r(a);var r=t(14),n=t(15),l=t(17),i=t(16),c=t(2),s=t.n(c),o=t(99),d=t(106),u=t(104),f=t(157),m=(t(96),t(225)),p=t(30),b=t(103),v=function(e){Object(l.a)(t,e);var a=Object(i.a)(t);function t(e){var n;return Object(r.a)(this,t),(n=a.call(this,e)).handleChange=function(e){console.log("targeting state "+e.target.id+" with value "+e.target.value),n.setState({[e.target.id]:e.target.value})},n.onSubmit=function(e){e.preventDefault(),n.props.editChallengeType(n.state)},n.state={id:"",identifier:"",name:""},n}return Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.challengeType.challengeType;if(e){var a=e._id,t=e.identifier,r=e.name;this.setState({id:a,identifier:t,name:r})}else this.props.history.push("/dashboard/default")}},{key:"componentWillReceiveProps",value:function(e){var a=e.challengeType.challengeType;a||(console.log("".concat(a)),this.setState({id:"",identifier:"",name:""}))}},{key:"render",value:function(){var e=this.props.challengeType.challengeType;return console.log(e),s.a.createElement("div",{className:"main-content w-80"},s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-12"},s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-header card-header-danger"},s.a.createElement("h4",{className:"card-title "},"Actualizar tipo de reto")),s.a.createElement("div",{className:"card-body"},s.a.createElement(o.a,{className:"w-80"},s.a.createElement(d.a,{onSubmit:this.onSubmit,md:12},s.a.createElement(u.a,null,s.a.createElement(o.a,{mb:4},s.a.createElement(d.a.Group,null,s.a.createElement(d.a.Label,null,"Identificador*"),s.a.createElement(d.a.Control,{onChange:this.handleChange,value:this.state.identifier,id:"identifier",type:"text",placeholder:"Identificador"}))),s.a.createElement(o.a,{mb:4},s.a.createElement(d.a.Group,null,s.a.createElement(d.a.Label,null,"T\xedtulo*"),s.a.createElement(d.a.Control,{onChange:this.handleChange,value:this.state.name,id:"name",type:"text",placeholder:"T\xedtulo..."})))),s.a.createElement(o.a,{md:8},s.a.createElement(f.a,{variant:"danger",type:"submit"},"ACTUALIZAR"))))))))))}}]),t}(c.Component);a.default=Object(p.b)((function(e){return{challengeType:e.challengeType}}),{editChallengeType:b.c})(Object(m.a)(v))},95:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(){for(var e=arguments.length,a=Array(e),t=0;t<e;t++)a[t]=arguments[t];function r(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=null;return a.forEach((function(e){if(null==n){var a=e.apply(void 0,t);null!=a&&(n=a)}})),n}return(0,l.default)(r)};var r,n=t(97),l=(r=n)&&r.__esModule?r:{default:r};e.exports=a.default},96:function(e,a,t){},97:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){function a(a,t,r,n,l,i){var c=n||"<<anonymous>>",s=i||r;if(null==t[r])return a?new Error("Required "+l+" `"+s+"` was not specified in `"+c+"`."):null;for(var o=arguments.length,d=Array(o>6?o-6:0),u=6;u<o;u++)d[u-6]=arguments[u];return e.apply(void 0,[t,r,c,l,s].concat(d))}var t=a.bind(null,!1);return t.isRequired=a.bind(null,!0),t},e.exports=a.default},99:function(e,a,t){"use strict";var r=t(6),n=t(10),l=t(93),i=t.n(l),c=t(2),s=t.n(c),o=t(94),d=["xl","lg","md","sm","xs"],u=s.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,c=e.as,u=void 0===c?"div":c,f=Object(n.a)(e,["bsPrefix","className","as"]),m=Object(o.a)(t,"col"),p=[],b=[];return d.forEach((function(e){var a,t,r,n=f[e];if(delete f[e],"object"===typeof n&&null!=n){var l=n.span;a=void 0===l||l,t=n.offset,r=n.order}else a=n;var i="xs"!==e?"-"+e:"";a&&p.push(!0===a?""+m+i:""+m+i+"-"+a),null!=r&&b.push("order"+i+"-"+r),null!=t&&b.push("offset"+i+"-"+t)})),p.length||p.push(m),s.a.createElement(u,Object(r.a)({},f,{ref:a,className:i.a.apply(void 0,[l].concat(p,b))}))}));u.displayName="Col",a.a=u}}]);
//# sourceMappingURL=16.28edb43b.chunk.js.map