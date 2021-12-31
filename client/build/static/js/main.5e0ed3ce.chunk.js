(this["webpackJsonptic-tae-toe"]=this["webpackJsonptic-tae-toe"]||[]).push([[0],{197:function(e,t,n){},363:function(e,t,n){},364:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(175),s=n.n(a),o=(n(197),n(29)),i=n(35),u=n.n(i),j=n(55),l=n(17),b=n(1);function f(e){var t=e.click,n=e.val;e.row,e.col;return Object(b.jsx)("button",{className:"square",onClick:t,children:n})}var O=function(e){var t=e.square,n=e.onClick,r=e.len,c=function(e,c){return Object(b.jsx)(f,{val:t[e][c],click:function(){return n(e,c)},row:e,col:c},e*r+c)};return function(){for(var e=Array(r).fill(0).map((function(e){return new Array(r).fill(0)})),t=0;t<r;t++)for(var n=0;n<r;n++)e[t][n]=t*r+n;return e.map((function(t,n){return Object(b.jsx)("div",{className:"board-row",children:(r=n,e[0].map((function(e,t){return c(r,t)})))},t);var r}))}()},m=Object(r.createContext)(),h=function(e,t,n,r){return function(e,t,n,r){for(var c=0,a=t;n>=0&&n<15&&t-1>=0&&e[t-1][n]===r;)c++,t--;for(;n>=0&&n<15&&a+1<15&&e[a+1][n]===r;)c++,a++;return c}(e,t,n,r)+1>=5||function(e,t,n,r){for(var c=0,a=n;t>=0&&t<15&&n-1>=0&&e[t][n-1]===r;)c++,n--;for(;t>=0&&t<15&&n+1<15&&e[t][a+1]===r;)c++,a++;return c}(e,t,n,r)+1>=5||function(e,t,n,r){for(var c=0,a=t,s=n;a+1<15&&s+1<15&&e[a+1][s+1]===r;)a++,s++,c++;for(;t-1>=0&&n-1>=0&&e[t-1][n-1]===r;)t--,n--,c++;return c}(e,t,n,r)+1>=5||function(e,t,n,r){for(var c=0,a=t,s=n;a-1>=0&&s+1<15&&e[a-1][s+1]===r;)a--,s++,c++;for(;t+1<15&&n-1>=0&&e[t+1][n-1]===r;)t++,n--,c++;return c}(e,t,n,r)+1>=5},x=Object(r.forwardRef)((function(e,t){var n=e.socket,c=e.username,a=e.room,s=e.full,i=Object(r.useContext)(m),f=Object(o.a)(i,2),x=(f[0],f[1]),d=Object(r.useState)({stepNum:0,xIsNext:!0,history:[{username:null,square:Array(15).fill(null).map((function(e){return new Array(15).fill(null)}))}],curX:0,curY:0,isWin:!1,winner:null,room:a}),p=Object(o.a)(d,2),v=p[0],N=p[1];Object(r.useEffect)((function(){n.on("receive_chess",(function(e){console.log(e),N((function(t){return Object(l.a)(Object(l.a)({},t),e)}))}))}),[n]);var y=function(){var e=Object(j.a)(u.a.mark((function e(t){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s){e.next=2;break}return e.abrupt("return");case 2:return r=Object(l.a)(Object(l.a)({},v),{},{stepNum:t,xIsNext:t%2===0,isWin:!1,winner:null}),console.log(r),e.next=6,n.emit("retrieve_chess",r);case 6:N(Object(l.a)(Object(l.a)({},v),r));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(j.a)(u.a.mark((function e(t,r){var o,i,j,b;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s){e.next=2;break}return e.abrupt("return");case 2:if(o=v.history.slice(0,v.stepNum+1),i=o[o.length-1],console.log(v.history),i.username!==c){e.next=7;break}return e.abrupt("return");case 7:if(j=JSON.parse(JSON.stringify(i.square)),!0!==w(j,t,r)&&!j[t][r]){e.next=10;break}return e.abrupt("return");case 10:return j[t][r]=v.xIsNext?"X":"O",b=Object(l.a)(Object(l.a)({},v),{},{stepNum:o.length,xIsNext:!v.xIsNext,history:o.concat([{square:j,username:c}]),curX:t,curY:r,room:a}),e.next=14,n.emit("set_chess",b);case 14:N(Object(l.a)(Object(l.a)({},v),b));case 15:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),w=function(e,t,r){if(!0===v.isWin)return!0;var c=v.xIsNext?"X":"O";if(h(e,t,r,c)){var a=v.history.slice(0,v.stepNum+1);e[t][r]=c;var s=Object(l.a)(Object(l.a)({},v),{},{isWin:!0,winner:c,stepNum:a.length,xIsNext:!v.xIsNext,history:a.concat([{square:e}]),curX:t,curY:r});return n.emit("win_chess",s),N(Object(l.a)(Object(l.a)({},v),s)),!0}return!1},k=v.history,C=k[v.stepNum],I=k.map((function(e,t){var n=t?"Go to move #".concat(t):"Go to game start";return Object(b.jsx)("li",{children:Object(b.jsx)("button",{onClick:function(){y(t)},children:n})},t)}));return Object(b.jsxs)("div",{className:"game",children:[Object(b.jsx)("div",{className:"game-board",children:Object(b.jsx)(O,{square:C.square,onClick:function(e,t){return g(e,t)},len:15})}),Object(b.jsxs)("div",{className:"game-info",children:[Object(b.jsxs)("div",{children:["Username:",c]}),Object(b.jsxs)("div",{children:["ChessRoom:",a]}),Object(b.jsx)("div",{children:function(e){var t=v.winner;return t?"Winner is ".concat(t):"Next player: ".concat(v.xIsNext?"X":"O")}()}),Object(b.jsx)("div",{children:"---Location: \n row:".concat(v.curX," \n col:").concat(v.curY,"----")}),Object(b.jsx)("button",{onClick:function(){x((function(){return!1}));var e={username:c,room:a};n.emit("leave",e)},children:"Log out"}),Object(b.jsx)("ol",{children:I})]})]})})),d=x,p=n(124),v=n(191);var N=function(e){var t=e.socket,n=e.username,c=e.room,a=Object(r.useState)(""),s=Object(o.a)(a,2),i=s[0],l=s[1],f=Object(r.useState)([]),O=Object(o.a)(f,2),m=O[0],h=O[1],x=function(){var e=Object(j.a)(u.a.mark((function e(){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===i){e.next=6;break}return r={name:n,room:c,message:i,time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()},e.next=4,t.emit("send_message",r);case 4:h((function(e){return[].concat(Object(p.a)(e),[r])})),l("");case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(j.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:13===t.keyCode&&x();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){t.on("receive_message",(function(e){console.log(e),h((function(t){return[].concat(Object(p.a)(t),[e])}))}))}),[t]),Object(b.jsxs)("div",{className:"chat-window",children:[Object(b.jsx)("div",{className:"chat-header",children:Object(b.jsx)("p",{children:"Chess Room"})}),Object(b.jsx)("div",{className:"chat-body",children:Object(b.jsx)(v.a,{className:"message-container",children:m.map((function(e,t){return Object(b.jsx)("div",{className:"message",id:n===e.name?"you":"other",children:Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{className:"message-content",children:Object(b.jsx)("p",{children:e.message})}),Object(b.jsxs)("div",{className:"message-meta",children:[Object(b.jsx)("p",{id:"time",children:e.time}),Object(b.jsx)("p",{id:"author",children:e.name})]})]})},t)}))})}),Object(b.jsxs)("div",{className:"chat-footer",children:[Object(b.jsx)("input",{type:"text",placeholder:"Hey...",onChange:function(e){l(e.target.value)},onKeyUp:d,value:i}),Object(b.jsx)("button",{onClick:x,children:"\u25ba"})]})]})},y=n(192),g=(n(363),Object(y.a)("https://tic-socket.herokuapp.com/"));var w=function(){var e=Object(r.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),s=Object(o.a)(a,2),i=s[0],u=s[1],j=Object(r.useState)(!1),l=Object(o.a)(j,2),f=l[0],O=l[1],h=Object(r.useState)(!1),x=Object(o.a)(h,2),p=x[0],v=x[1],y=function(){""!==n&&""!==i&&(g.emit("join_room",{user:n,room:i}),g.on("full",(function(e){e&&v(!0)})),O(!0))};return Object(b.jsx)("div",{className:"App",children:Object(b.jsx)(m.Provider,{value:[f,O],children:f?Object(b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(b.jsx)(d,{socket:g,username:n,room:i,full:p}),Object(b.jsx)(N,{socket:g,username:n,room:i})]}):Object(b.jsxs)("div",{className:"joinChatContainer",children:[Object(b.jsx)("h3",{children:"Join a Chess"}),Object(b.jsx)("input",{type:"text",placeholder:"John",onChange:function(e){c(e.target.value)}}),Object(b.jsx)("input",{type:"text",placeholder:"Room ID",onChange:function(e){u(e.target.value)},onKeyUp:function(e){13===e.keyCode&&y()}}),Object(b.jsx)("button",{onClick:y,children:"Join a room"})]})})})};s.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(w,{})}),document.getElementById("root"))}},[[364,1,2]]]);
//# sourceMappingURL=main.5e0ed3ce.chunk.js.map