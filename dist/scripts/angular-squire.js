(function(){angular.module("angular-squire",[]).directive("squire",function(){return{restrict:"E",require:"ngModel",scope:{height:"@height",width:"@width",body:"=body",placeholder:"@placeholder",editorClass:"@editorClass"},replace:!0,transclude:!0,templateUrl:"/modules/angular-squire/editor.html",controller:["$scope",function(e){var n;return n=!0,e.isEditorVisible=function(){return n},e.editorVisibility=this.editorVisibility=function(t){var i;return 1!==arguments.length?n:(n=t,t&&null!=(i=e.editor)?i.focus():void 0)}}],link:function(e,n,t,i){var r,s,a,l,o,c,d,u,v;return a=e.editor=null,s="http://",r="angular-squire-iframe",l=function(){return angular.element(a.getSelection().commonAncestorContainer).closest("a").attr("href")},e.canRemoveLink=function(){var e;return e=l(),e&&e!==s},e.canAddLink=function(){return e.data.link&&e.data.link!==s},e.data={link:s},e.$on("$destroy",function(){return null!=a?a.destroy():void 0}),e.showPlaceholder=function(){return i.$isEmpty(i.$viewValue)},e.popoverHide=function(n,t){var i;return i=function(){return angular.element(n.target).closest(".popover-visible").removeClass("popover-visible"),e.action(t)},n.keyCode?13===n.keyCode?i():void 0:i()},e.popoverShow=function(t){var i,r;i=angular.element(t.currentTarget),angular.element(t.target).closest(".squire-popover").length||i.hasClass("popover-visible")||(i.addClass("popover-visible"),e.data.link=/>A\b/.test(a.getPath())||a.hasFormat("A")?l():s,r=n.find(".squire-popover").find("input").focus().end(),r.css({left:-1*(r.width()/2)+i.width()/2+2}))},u=function(n){return e.$evalAsync(function(){return i.$setViewValue(n)})},i.$render=function(){return a.setHTML(i.$viewValue||"")},i.$isEmpty=function(e){return angular.isString(e)?0===angular.element("<div>"+e+"</div>").text().trim().length:!e},v=function(n){var t;return t=n.head,_.each(angular.element("link"),function(e){var i;return i=n.createElement("link"),i.setAttribute("href",e.href),i.setAttribute("type","text/css"),i.setAttribute("rel","stylesheet"),t.appendChild(i)}),n.childNodes[0].className=r+" ",e.editorClass?n.childNodes[0].className+=e.editorClass:void 0},o=n.find("iframe"),d=n.find(".menu"),c=function(){var t,r;return t=o[0].contentWindow.document,r=0,v(t),i.$setPristine(),a=e.editor=new Squire(t),a.defaultBlockTag="P",a.addEventListener("input",function(){return r+=1,r>2?u(a.getHTML()):void 0}),a.addEventListener("focus",function(){return n.addClass("focus"),e.editorVisibility(!0)}),a.addEventListener("blur",function(){return n.removeClass("focus"),i.$pristine&&!i.$isEmpty(i.$viewValue)?i.$setTouched():i.$setPristine()}),a.addEventListener("pathChange",function(){var e,t;return e=a.getPath(),/>A\b/.test(e)||a.hasFormat("A")?n.find(".add-link").addClass("active"):n.find(".add-link").removeClass("active"),d.attr("class","menu "+(null!=(t=e.split("BODY")[1])?t.replace(/>|\.|html|body|div/gi," ").toLowerCase():void 0))}),a.alignRight=function(){return a.setTextAlignment("right")},a.alignCenter=function(){return a.setTextAlignment("center")},a.alignLeft=function(){return a.setTextAlignment("left")},a.alignJustify=function(){return a.setTextAlignment("justify")},a.makeHeading=function(){return a.setFontSize("2em"),a.bold()}},/WebKit\//.test(navigator.userAgent)?c():o.on("load",c),Squire.prototype.testPresenceinSelection=function(e,n,t,i){var r,s;return r=this.getPath(),s=i.test(r)|this.hasFormat(t),e===n&&s},e.action=function(n){var t,i,r,l;if(a)if(l={value:n,testBold:a.testPresenceinSelection("bold",n,"B",/>B\b/),testItalic:a.testPresenceinSelection("italic",n,"I",/>I\b/),testUnderline:a.testPresenceinSelection("underline",n,"U",/>U\b/),testOrderedList:a.testPresenceinSelection("makeOrderedList",n,"OL",/>OL\b/),testUnorderedList:a.testPresenceinSelection("makeUnorderedList",n,"UL",/>UL\b/),testLink:a.testPresenceinSelection("removeLink",n,"A",/>A\b/),testQuote:a.testPresenceinSelection("increaseQuoteLevel",n,"blockquote",/>blockquote\b/),isNotValue:function(e){return e===n&&""!==this.value}},l.testBold||l.testItalic||l.testUnderline||l.testOrderedList||l.testUnorderedList||l.testQuote||l.testLink){if(l.testBold&&a.removeBold(),l.testItalic&&a.removeItalic(),l.testUnderline&&a.removeUnderline(),l.testOrderedList&&a.removeList(),l.testUnorderedList&&a.removeList(),l.testQuote&&a.decreaseQuoteLevel(),l.testLink)return a.removeLink(),a.focus()}else if(!l.isNotValue("removeLink")){if("makeLink"===n){if(!e.canAddLink())return;return t=angular.element(a.getSelection().commonAncestorContainer).closest("a")[0],t&&(i=o[0].contentWindow.document.createRange(),i.selectNodeContents(t),r=o[0].contentWindow.getSelection(),r.removeAllRanges(),r.addRange(i)),a.makeLink(e.data.link,{target:"_blank",title:e.data.link,rel:"nofollow"}),e.data.link=s,a.focus()}return a[n](),a.focus()}}}}}).directive("squireCover",function(){return{restrict:"E",replace:!0,transclude:!0,require:"^squire",template:'<ng-transclude ng-show="isCoverVisible()"\n    ng-click=\'hideCover()\'\n    class="angular-squire-cover">\n</ng-transclude>',link:function(e,n,t,i){var r;return r=!0,e.isCoverVisible=function(){return r},e.hideCover=function(){return r=!1,i.editorVisibility(!0)},i.editorVisibility(!r),e.$watch(function(){return i.editorVisibility()},function(e){return r=!e})}}}).directive("squireControls",function(){return{restrict:"E",scope:!1,replace:!0,transclude:!0,require:"^squire",template:'<ng-transclude ng-show="isControlsVisible()"\n    class="angular-squire-controls">\n</ng-transclude>',link:function(e,n,t,i){return e.isControlsVisible=function(){return i.editorVisibility()}}}})}).call(this),angular.module("angular-squire").run(["$templateCache",function(e){e.put("/modules/angular-squire/editor.html",'<div class=\'angular-squire\'>\n    <div ng-class="{\'editor-hide\': !isEditorVisible()}" class=\'editor-container\'>\n        <div class="menu">\n            <div class="group">\n                <div title=\'Bold\' ng-click="action(\'bold\')" class="item bold">\n                    <i class="fa fa-bold"></i>\n                </div>\n                <div title=\'Italic\' ng-click="action(\'italic\')" class="item italic">\n                    <i class="fa fa-italic"></i>\n                </div>\n                <div title=\'Underline\' ng-click="action(\'underline\')" class="item underline">\n                    <i class="fa fa-underline"></i>\n                </div>\n            </div>\n            <div class="group">\n                <div title=\'Insert Link\' class="item add-link" ng-click="popoverShow($event)">\n                    <i class="fa fa-link"></i>\n                    <div class="squire-popover">\n                        <div class="arrow"></div>\n                        <div class="content">\n                            <div class="title">Insert Link</div>\n                            <input type="text"\n                                id="edit-link"\n                                placeholder="Link URL"\n                                ng-model="data.link"\n                                ng-keydown="popoverHide($event, \'makeLink\')" />\n                            <button class="double r" ng-show="canRemoveLink()"\n                                ng-click="popoverHide($event, \'removeLink\')">\n                                <span class="fa fa-remove"></span> Remove Link\n                            </button>\n                            <button class="double l" ng-show="canRemoveLink()"\n                                ng-class="{disabled: !canAddLink()}"\n                                ng-click="popoverHide($event, \'makeLink\')">\n                                <span class="fa fa-edit"></span> Update Link\n                            </button>\n                            <button ng-hide="canRemoveLink()"\n                                ng-class="{disabled: !canAddLink()}"\n                                ng-click="popoverHide($event, \'makeLink\')">\n                                <span class="fa fa-plus"></span> Insert Link\n                            </button>\n                        </div>\n                        <div class="squire-popover-overlay" ng-click="popoverHide($event, \'makeLink\')"></div>\n                    </div>\n                </div>\n                <div title=\'Insert Numbered List\' ng-click="action(\'makeOrderedList\')" class="item olist">\n                    <i class="fa fa-list-ol"></i>\n                </div>\n                <div title=\'Insert List\' ng-click="action(\'makeUnorderedList\')" class="item ulist">\n                    <i class="fa fa-list-ul"></i>\n                </div>\n                <div title=\'Quote\' ng-click="action(\'increaseQuoteLevel\')" class="item quote">\n                    <i class="fa fa-quote-right"></i>\n                </div>\n            </div>\n\n            <div class="group">\n                <div title=\'Header\' ng-click="action(\'makeHeading\')" class="item header">\n                    <i class="fa fa-header"></i>\n                </div>\n                <div title=\'Align Left\' ng-click="action(\'alignLeft\')" class="item aleft">\n                    <i class="fa fa-align-left"></i>\n                </div>\n                <div title=\'Align Center\' ng-click="action(\'alignCenter\')" class="item acenter">\n                    <i class="fa fa-align-center"></i>\n                </div>\n                <div title=\'Align Right\' ng-click="action(\'alignRight\')" class="item aright">\n                    <i class="fa fa-align-right"></i>\n                </div>\n            </div>\n\n            <div class="group">\n                <div title=\'Undo\' ng-click="action(\'undo\')" class="item">\n                    <i class="fa fa-undo"></i>\n                </div>\n                <div title=\'Redo\' ng-click="action(\'redo\')" class="item">\n                    <i class="fa fa-repeat"></i>\n                </div>\n            </div>\n        </div>\n\n        <div class=\'angular-squire-wrapper\' ng-style=\'{width: width, height: height}\'>\n            <div class=\'placeholder\'>\n                <div ng-show=\'showPlaceholder()\'>{{ placeholder }}</div>\n            </div>\n            <iframe frameborder=\'0\' border=\'0\' marginwidth=\'0\' marginheight=\'0\' src=\'about:blank\'></iframe>\n        </div>\n    </div>\n    <ng-transclude></ng-transclude>\n</div>\n')}]);