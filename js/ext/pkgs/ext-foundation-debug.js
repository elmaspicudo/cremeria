/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.DomHelper
 * <p>The DomHelper class provides a layer of abstraction from DOM and transparently supports creating
 * elements via DOM or using HTML fragments. It also has the ability to create HTML fragment templates
 * from your DOM building code.</p>
 *
 * <p><b><u>DomHelper element specification object</u></b></p>
 * <p>A specification object is used when creating elements. Attributes of this object
 * are assumed to be element attributes, except for 4 special attributes:
 * <div class="mdetail-params"><ul>
 * <li><b><tt>tag</tt></b> : <div class="sub-desc">The tag name of the element</div></li>
 * <li><b><tt>children</tt></b> : or <tt>cn</tt><div class="sub-desc">An array of the
 * same kind of element definition objects to be created and appended. These can be nested
 * as deep as you want.</div></li>
 * <li><b><tt>cls</tt></b> : <div class="sub-desc">The class attribute of the element.
 * This will end up being either the "class" attribute on a HTML fragment or className
 * for a DOM node, depending on whether DomHelper is using fragments or DOM.</div></li>
 * <li><b><tt>html</tt></b> : <div class="sub-desc">The innerHTML for the element</div></li>
 * </ul></div></p>
 *
 * <p><b><u>Insertion methods</u></b></p>
 * <p>Commonly used insertion methods:
 * <div class="mdetail-params"><ul>
 * <li><b><tt>{@link #append}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #insertBefore}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #insertAfter}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #overwrite}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #createTemplate}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #insertHtml}</tt></b> : <div class="sub-desc"></div></li>
 * </ul></div></p>
 *
 * <p><b><u>Example</u></b></p>
 * <p>This is an example, where an unordered list with 3 children items is appended to an existing
 * element with id <tt>'my-div'</tt>:<br>
 <pre><code>
var dh = Ext.DomHelper; // create shorthand alias
// specification object
var spec = {
    id: 'my-ul',
    tag: 'ul',
    cls: 'my-list',
    // append children after creating
    children: [     // may also specify 'cn' instead of 'children'
        {tag: 'li', id: 'item0', html: 'List Item 0'},
        {tag: 'li', id: 'item1', html: 'List Item 1'},
        {tag: 'li', id: 'item2', html: 'List Item 2'}
    ]
};
var list = dh.append(
    'my-div', // the context element 'my-div' can either be the id or the actual node
    spec      // the specification object
);
 </code></pre></p>
 * <p>Element creation specification parameters in this class may also be passed as an Array of
 * specification objects. This can be used to insert multiple sibling nodes into an existing
 * container very efficiently. For example, to add more list items to the example above:<pre><code>
dh.append('my-ul', [
    {tag: 'li', id: 'item3', html: 'List Item 3'},
    {tag: 'li', id: 'item4', html: 'List Item 4'}
]);
 * </code></pre></p>
 *
 * <p><b><u>Templating</u></b></p>
 * <p>The real power is in the built-in templating. Instead of creating or appending any elements,
 * <tt>{@link #createTemplate}</tt> returns a Template object which can be used over and over to
 * insert new elements. Revisiting the example above, we could utilize templating this time:
 * <pre><code>
// create the node
var list = dh.append('my-div', {tag: 'ul', cls: 'my-list'});
// get template
var tpl = dh.createTemplate({tag: 'li', id: 'item{0}', html: 'List Item {0}'});

for(var i = 0; i < 5, i++){
    tpl.append(list, [i]); // use template to append to the actual node
}
 * </code></pre></p>
 * <p>An example using a template:<pre><code>
var html = '<a id="{0}" href="{1}" class="nav">{2}</a>';

var tpl = new Ext.DomHelper.createTemplate(html);
tpl.append('blog-roll', ['link1', 'http://www.jackslocum.com/', "Jack&#39;s Site"]);
tpl.append('blog-roll', ['link2', 'http://www.dustindiaz.com/', "Dustin&#39;s Site"]);
 * </code></pre></p>
 *
 * <p>The same example using named parameters:<pre><code>
var html = '<a id="{id}" href="{url}" class="nav">{text}</a>';

var tpl = new Ext.DomHelper.createTemplate(html);
tpl.append('blog-roll', {
    id: 'link1',
    url: 'http://www.jackslocum.com/',
    text: "Jack&#39;s Site"
});
tpl.append('blog-roll', {
    id: 'link2',
    url: 'http://www.dustindiaz.com/',
    text: "Dustin&#39;s Site"
});
 * </code></pre></p>
 *
 * <p><b><u>Compiling Templates</u></b></p>
 * <p>Templates are applied using regular expressions. The performance is great, but if
 * you are adding a bunch of DOM elements using the same template, you can increase
 * performance even further by {@link Ext.Template#compile "compiling"} the template.
 * The way "{@link Ext.Template#compile compile()}" works is the template is parsed and
 * broken up at the different variable points and a dynamic function is created and eval'ed.
 * The generated function performs string concatenation of these parts and the passed
 * variables instead of using regular expressions.
 * <pre><code>
var html = '<a id="{id}" href="{url}" class="nav">{text}</a>';

var tpl = new Ext.DomHelper.createTemplate(html);
tpl.compile();

//... use template like normal
 * </code></pre></p>
 *
 * <p><b><u>Performance Boost</u></b></p>
 * <p>DomHelper will transparently create HTML fragments when it can. Using HTML fragments instead
 * of DOM can significantly boost performance.</p>
 * <p>Element creation specification parameters may also be strings. If {@link #useDom} is <tt>false</tt>,
 * then the string is used as innerHTML. If {@link #useDom} is <tt>true</tt>, a string specification
 * results in the creation of a text node. Usage:</p>
 * <pre><code>
Ext.DomHelper.useDom = true; // force it to use DOM; reduces performance
 * </code></pre>
 * @singleton
 */
Ext.DomHelper = function(){
    var tempTableEl = null,
        emptyTags = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
        tableRe = /^table|tbody|tr|td$/i,
        confRe = /tag|children|cn|html$/i,
        tableElRe = /td|tr|tbody/i,
        cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
        endRe = /end/i,
        pub,
        // kill repeat to save bytes
        afterbegin = 'afterbegin',
        afterend = 'afterend',
        beforebegin = 'beforebegin',
        beforeend = 'beforeend',
        ts = '<table>',
        te = '</table>',
        tbs = ts+'<tbody>',
        tbe = '</tbody>'+te,
        trs = tbs + '<tr>',
        tre = '</tr>'+tbe;

    // private
    function doInsert(el, o, returnElement, pos, sibling, append){
        var newNode = pub.insertHtml(pos, Ext.getDom(el), createHtml(o));
        return returnElement ? Ext.get(newNode, true) : newNode;
    }

    // build as innerHTML where available
    function createHtml(o){
        var b = '',
            attr,
            val,
            key,
            keyVal,
            cn;

        if(typeof o == "string"){
            b = o;
        } else if (Ext.isArray(o)) {
            for (var i=0; i < o.length; i++) {
                if(o[i]) {
                    b += createHtml(o[i]);
                }
            };
        } else {
            b += '<' + (o.tag = o.tag || 'div');
            for (attr in o) {
                val = o[attr];
                if(!confRe.test(attr)){
                    if (typeof val == "object") {
                        b += ' ' + attr + '="';
                        for (key in val) {
                            b += key + ':' + val[key] + ';';
                        };
                        b += '"';
                    }else{
                        b += ' ' + ({cls : 'class', htmlFor : 'for'}[attr] || attr) + '="' + val + '"';
                    }
                }
            };
            // Now either just close the tag or try to add children and close the tag.
            if (emptyTags.test(o.tag)) {
                b += '/>';
            } else {
                b += '>';
                if ((cn = o.children || o.cn)) {
                    b += createHtml(cn);
                } else if(o.html){
                    b += o.html;
                }
                b += '</' + o.tag + '>';
            }
        }
        return b;
    }

    function ieTable(depth, s, h, e){
        tempTableEl.innerHTML = [s, h, e].join('');
        var i = -1,
            el = tempTableEl,
            ns;
        while(++i < depth){
            el = el.firstChild;
        }
//      If the result is multiple siblings, then encapsulate them into one fragment.
        if(ns = el.nextSibling){
            var df = document.createDocumentFragment();
            while(el){
                ns = el.nextSibling;
                df.appendChild(el);
                el = ns;
            }
            el = df;
        }
        return el;
    }

    /**
     * @ignore
     * Nasty code for IE's broken table implementation
     */
    function insertIntoTable(tag, where, el, html) {
        var node,
            before;

        tempTableEl = tempTableEl || document.createElement('div');

        if(tag == 'td' && (where == afterbegin || where == beforeend) ||
           !tableElRe.test(tag) && (where == beforebegin || where == afterend)) {
            return;
        }
        before = where == beforebegin ? el :
                 where == afterend ? el.nextSibling :
                 where == afterbegin ? el.firstChild : null;

        if (where == beforebegin || where == afterend) {
            el = el.parentNode;
        }

        if (tag == 'td' || (tag == 'tr' && (where == beforeend || where == afterbegin))) {
            node = ieTable(4, trs, html, tre);
        } else if ((tag == 'tbody' && (where == beforeend || where == afterbegin)) ||
                   (tag == 'tr' && (where == beforebegin || where == afterend))) {
            node = ieTable(3, tbs, html, tbe);
        } else {
            node = ieTable(2, ts, html, te);
        }
        el.insertBefore(node, before);
        return node;
    }


    pub = {
        /**
         * Returns the markup for the passed Element(s) config.
         * @param {Object} o The DOM object spec (and children)
         * @return {String}
         */
        markup : function(o){
            return createHtml(o);
        },

        /**
         * Applies a style specification to an element.
         * @param {String/HTMLElement} el The element to apply styles to
         * @param {String/Object/Function} styles A style specification string e.g. 'width:100px', or object in the form {width:'100px'}, or
         * a function which returns such a specification.
         */
        applyStyles : function(el, styles){
            if(styles){
                var i = 0,
                    len,
                    style,
                    matches;

                el = Ext.fly(el);
                if(typeof styles == "function"){
                    styles = styles.call();
                }
                if(typeof styles == "string"){
                    while((matches = cssRe.exec(styles))){
                        el.setStyle(matches[1], matches[2]);
                    }
                }else if (typeof styles == "object"){
                    el.setStyle(styles);
                }
            }
        },

        /**
         * Inserts an HTML fragment into the DOM.
         * @param {String} where Where to insert the html in relation to el - beforeBegin, afterBegin, beforeEnd, afterEnd.
         * @param {HTMLElement} el The context element
         * @param {String} html The HTML fragment
         * @return {HTMLElement} The new node
         */
        insertHtml : function(where, el, html){
            var hash = {},
                hashVal,
                setStart,
                range,
                frag,
                rangeEl,
                rs;

            where = where.toLowerCase();
            // add these here because they are used in both branches of the condition.
            hash[beforebegin] = ['BeforeBegin', 'previousSibling'];
            hash[afterend] = ['AfterEnd', 'nextSibling'];

            if (el.insertAdjacentHTML) {
                if(tableRe.test(el.tagName) && (rs = insertIntoTable(el.tagName.toLowerCase(), where, el, html))){
                    return rs;
                }
                // add these two to the hash.
                hash[afterbegin] = ['AfterBegin', 'firstChild'];
                hash[beforeend] = ['BeforeEnd', 'lastChild'];
                if ((hashVal = hash[where])) {
                    el.insertAdjacentHTML(hashVal[0], html);
                    return el[hashVal[1]];
                }
            } else {
                range = el.ownerDocument.createRange();
                setStart = 'setStart' + (endRe.test(where) ? 'After' : 'Before');
                if (hash[where]) {
                    range[setStart](el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, where == beforebegin ? el : el.nextSibling);
                    return el[(where == beforebegin ? 'previous' : 'next') + 'Sibling'];
                } else {
                    rangeEl = (where == afterbegin ? 'first' : 'last') + 'Child';
                    if (el.firstChild) {
                        range[setStart](el[rangeEl]);
                        frag = range.createContextualFragment(html);
                        if(where == afterbegin){
                            el.insertBefore(frag, el.firstChild);
                        }else{
                            el.appendChild(frag);
                        }
                    } else {
                        el.innerHTML = html;
                    }
                    return el[rangeEl];
                }
            }
            throw 'Illegal insertion point -> "' + where + '"';
        },

        /**
         * Creates new DOM element(s) and inserts them before el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        insertBefore : function(el, o, returnElement){
            return doInsert(el, o, returnElement, beforebegin);
        },

        /**
         * Creates new DOM element(s) and inserts them after el.
         * @param {Mixed} el The context element
         * @param {Object} o The DOM object spec (and children)
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        insertAfter : function(el, o, returnElement){
            return doInsert(el, o, returnElement, afterend, 'nextSibling');
        },

        /**
         * Creates new DOM element(s) and inserts them as the first child of el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        insertFirst : function(el, o, returnElement){
            return doInsert(el, o, returnElement, afterbegin, 'firstChild');
        },

        /**
         * Creates new DOM element(s) and appends them to el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        append : function(el, o, returnElement){
            return doInsert(el, o, returnElement, beforeend, '', true);
        },

        /**
         * Creates new DOM element(s) and overwrites the contents of el with them.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        overwrite : function(el, o, returnElement){
            el = Ext.getDom(el);
            el.innerHTML = createHtml(o);
            return returnElement ? Ext.get(el.firstChild) : el.firstChild;
        },

        createHtml : createHtml
    };
    return pub;
}();
/**
 * @class Ext.DomHelper
 */
Ext.apply(Ext.DomHelper,
function(){
    var pub,
        afterbegin = 'afterbegin',
        afterend = 'afterend',
        beforebegin = 'beforebegin',
        beforeend = 'beforeend',
        confRe = /tag|children|cn|html$/i;

    // private
    function doInsert(el, o, returnElement, pos, sibling, append){
        el = Ext.getDom(el);
        var newNode;
        if (pub.useDom) {
            newNode = createDom(o, null);
            if (append) {
                el.appendChild(newNode);
            } else {
                (sibling == 'firstChild' ? el : el.parentNode).insertBefore(newNode, el[sibling] || el);
            }
        } else {
            newNode = Ext.DomHelper.insertHtml(pos, el, Ext.DomHelper.createHtml(o));
        }
        return returnElement ? Ext.get(newNode, true) : newNode;
    }

    // build as dom
    /** @ignore */
    function createDom(o, parentNode){
        var el,
            doc = document,
            useSet,
            attr,
            val,
            cn;

        if (Ext.isArray(o)) {                       // Allow Arrays of siblings to be inserted
            el = doc.createDocumentFragment(); // in one shot using a DocumentFragment
            for (var i = 0, l = o.length; i < l; i++) {
                createDom(o[i], el);
            }
        } else if (typeof o == 'string') {         // Allow a string as a child spec.
            el = doc.createTextNode(o);
        } else {
            el = doc.createElement( o.tag || 'div' );
            useSet = !!el.setAttribute; // In IE some elements don't have setAttribute
            for (var attr in o) {
                if(!confRe.test(attr)){
                    val = o[attr];
                    if(attr == 'cls'){
                        el.className = val;
                    }else{
                        if(useSet){
                            el.setAttribute(attr, val);
                        }else{
                            el[attr] = val;
                        }
                    }
                }
            }
            Ext.DomHelper.applyStyles(el, o.style);

            if ((cn = o.children || o.cn)) {
                createDom(cn, el);
            } else if (o.html) {
                el.innerHTML = o.html;
            }
        }
        if(parentNode){
           parentNode.appendChild(el);
        }
        return el;
    }

    pub = {
        /**
         * Creates a new Ext.Template from the DOM object spec.
         * @param {Object} o The DOM object spec (and children)
         * @return {Ext.Template} The new template
         */
        createTemplate : function(o){
            var html = Ext.DomHelper.createHtml(o);
            return new Ext.Template(html);
        },

        /** True to force the use of DOM instead of html fragments @type Boolean */
        useDom : false,

        /**
         * Creates new DOM element(s) and inserts them before el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         * @hide (repeat)
         */
        insertBefore : function(el, o, returnElement){
            return doInsert(el, o, returnElement, beforebegin);
        },

        /**
         * Creates new DOM element(s) and inserts them after el.
         * @param {Mixed} el The context element
         * @param {Object} o The DOM object spec (and children)
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         * @hide (repeat)
         */
        insertAfter : function(el, o, returnElement){
            return doInsert(el, o, returnElement, afterend, 'nextSibling');
        },

        /**
         * Creates new DOM element(s) and inserts them as the first child of el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         * @hide (repeat)
         */
        insertFirst : function(el, o, returnElement){
            return doInsert(el, o, returnElement, afterbegin, 'firstChild');
        },

        /**
         * Creates new DOM element(s) and appends them to el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         * @hide (repeat)
         */
        append: function(el, o, returnElement){
            return doInsert(el, o, returnElement, beforeend, '', true);
        },

        /**
         * Creates new DOM element(s) without inserting them to the document.
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @return {HTMLElement} The new uninserted node
         */
        createDom: createDom
    };
    return pub;
}());
/**
 * @class Ext.Template
 * <p>Represents an HTML fragment template. Templates may be {@link #compile precompiled}
 * for greater performance.</p>
 * <p>For example usage {@link #Template see the constructor}.</p>
 *
 * @constructor
 * An instance of this class may be created by passing to the constructor either
 * a single argument, or multiple arguments:
 * <div class="mdetail-params"><ul>
 * <li><b>single argument</b> : String/Array
 * <div class="sub-desc">
 * The single argument may be either a String or an Array:<ul>
 * <li><tt>String</tt> : </li><pre><code>
var t = new Ext.Template("&lt;div>Hello {0}.&lt;/div>");
t.{@link #append}('some-element', ['foo']);
 * </code></pre>
 * <li><tt>Array</tt> : </li>
 * An Array will be combined with <code>join('')</code>.
<pre><code>
var t = new Ext.Template([
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name:trim} {value:ellipsis(10)}&lt;/span&gt;',
    '&lt;/div&gt;',
]);
t.{@link #compile}();
t.{@link #append}('some-element', {id: 'myid', cls: 'myclass', name: 'foo', value: 'bar'});
</code></pre>
 * </ul></div></li>
 * <li><b>multiple arguments</b> : String, Object, Array, ...
 * <div class="sub-desc">
 * Multiple arguments will be combined with <code>join('')</code>.
 * <pre><code>
var t = new Ext.Template(
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name} {value}&lt;/span&gt;',
    '&lt;/div&gt;',
    // a configuration object:
    {
        compiled: true,      // {@link #compile} immediately
        disableFormats: true // See Notes below.
    }
);
 * </code></pre>
 * <p><b>Notes</b>:</p>
 * <div class="mdetail-params"><ul>
 * <li>Formatting and <code>disableFormats</code> are not applicable for Ext Core.</li>
 * <li>For a list of available format functions, see {@link Ext.util.Format}.</li>
 * <li><code>disableFormats</code> reduces <code>{@link #apply}</code> time
 * when no formatting is required.</li>
 * </ul></div>
 * </div></li>
 * </ul></div>
 * @param {Mixed} config
 */
Ext.Template = function(html){
    var me = this,
        a = arguments,
        buf = [],
        v;

    if (Ext.isArray(html)) {
        html = html.join("");
    } else if (a.length > 1) {
        for(var i = 0, len = a.length; i < len; i++){
            v = a[i];
            if(typeof v == 'object'){
                Ext.apply(me, v);
            } else {
                buf.push(v);
            }
        };
        html = buf.join('');
    }

    /**@private*/
    me.html = html;
    /**
     * @cfg {Boolean} compiled Specify <tt>true</tt> to compile the template
     * immediately (see <code>{@link #compile}</code>).
     * Defaults to <tt>false</tt>.
     */
    if (me.compiled) {
        me.compile();
    }
};
Ext.Template.prototype = {
    /**
     * @cfg {RegExp} re The regular expression used to match template variables.
     * Defaults to:<pre><code>
     * re : /\{([\w-]+)\}/g                                     // for Ext Core
     * re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g      // for Ext JS
     * </code></pre>
     */
    re : /\{([\w-]+)\}/g,
    /**
     * See <code>{@link #re}</code>.
     * @type RegExp
     * @property re
     */

    /**
     * Returns an HTML fragment of this template with the specified <code>values</code> applied.
     * @param {Object/Array} values
     * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
     * or an object (i.e. <code>{foo: 'bar'}</code>).
     * @return {String} The HTML fragment
     */
    applyTemplate : function(values){
        var me = this;

        return me.compiled ?
                me.compiled(values) :
                me.html.replace(me.re, function(m, name){
                    return values[name] !== undefined ? values[name] : "";
                });
    },

    /**
     * Sets the HTML used as the template and optionally compiles it.
     * @param {String} html
     * @param {Boolean} compile (optional) True to compile the template (defaults to undefined)
     * @return {Ext.Template} this
     */
    set : function(html, compile){
        var me = this;
        me.html = html;
        me.compiled = null;
        return compile ? me.compile() : me;
    },

    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ext.Template} this
     */
    compile : function(){
        var me = this,
            sep = Ext.isGecko ? "+" : ",";

        function fn(m, name){
            name = "values['" + name + "']";
            return "'"+ sep + '(' + name + " == undefined ? '' : " + name + ')' + sep + "'";
        }

        eval("this.compiled = function(values){ return " + (Ext.isGecko ? "'" : "['") +
             me.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +
             (Ext.isGecko ?  "';};" : "'].join('');};"));
        return me;
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) as the first child of el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertFirst: function(el, values, returnElement){
        return this.doInsert('afterBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) before el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertBefore: function(el, values, returnElement){
        return this.doInsert('beforeBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) after el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertAfter : function(el, values, returnElement){
        return this.doInsert('afterEnd', el, values, returnElement);
    },

    /**
     * Applies the supplied <code>values</code> to the template and appends
     * the new node(s) to the specified <code>el</code>.
     * <p>For example usage {@link #Template see the constructor}.</p>
     * @param {Mixed} el The context element
     * @param {Object/Array} values
     * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
     * or an object (i.e. <code>{foo: 'bar'}</code>).
     * @param {Boolean} returnElement (optional) true to return an Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    append : function(el, values, returnElement){
        return this.doInsert('beforeEnd', el, values, returnElement);
    },

    doInsert : function(where, el, values, returnEl){
        el = Ext.getDom(el);
        var newNode = Ext.DomHelper.insertHtml(where, el, this.applyTemplate(values));
        return returnEl ? Ext.get(newNode, true) : newNode;
    },

    /**
     * Applies the supplied values to the template and overwrites the content of el with the new node(s).
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    overwrite : function(el, values, returnElement){
        el = Ext.getDom(el);
        el.innerHTML = this.applyTemplate(values);
        return returnElement ? Ext.get(el.firstChild, true) : el.firstChild;
    }
};
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified <code>values</code> applied.
 * @param {Object/Array} values
 * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
 * or an object (i.e. <code>{foo: 'bar'}</code>).
 * @return {String} The HTML fragment
 * @member Ext.Template
 * @method apply
 */
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;

/**
 * Creates a template from the passed element's value (<i>display:none</i> textarea, preferred) or innerHTML.
 * @param {String/HTMLElement} el A DOM element or its id
 * @param {Object} config A configuration object
 * @return {Ext.Template} The created template
 * @static
 */
Ext.Template.from = function(el, config){
    el = Ext.getDom(el);
    return new Ext.Template(el.value || el.innerHTML, config || '');
};
/**
 * @class Ext.Template
 */
Ext.apply(Ext.Template.prototype, {
    /**
     * @cfg {Boolean} disableFormats Specify <tt>true</tt> to disable format
     * functions in the template. If the template does not contain
     * {@link Ext.util.Format format functions}, setting <code>disableFormats</code>
     * to true will reduce <code>{@link #apply}</code> time. Defaults to <tt>false</tt>.
     * <pre><code>
var t = new Ext.Template(
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name} {value}&lt;/span&gt;',
    '&lt;/div&gt;',
    {
        compiled: true,      // {@link #compile} immediately
        disableFormats: true // reduce <code>{@link #apply}</code> time since no formatting
    }
);
     * </code></pre>
     * For a list of available format functions, see {@link Ext.util.Format}.
     */
    disableFormats : false,
    /**
     * See <code>{@link #disableFormats}</code>.
     * @type Boolean
     * @property disableFormats
     */

    /**
     * The regular expression used to match template variables
     * @type RegExp
     * @property
     * @hide repeat doc
     */
    re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
    argsRe : /^\s*['"](.*)["']\s*$/,
    compileARe : /\\/g,
    compileBRe : /(\r\n|\n)/g,
    compileCRe : /'/g,

    /**
     * Returns an HTML fragment of this template with the specified values applied.
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @return {String} The HTML fragment
     * @hide repeat doc
     */
    applyTemplate : function(values){
        var me = this,
            useF = me.disableFormats !== true,
            fm = Ext.util.Format,
            tpl = me;

        if(me.compiled){
            return me.compiled(values);
        }
        function fn(m, name, format, args){
            if (format && useF) {
                if (format.substr(0, 5) == "this.") {
                    return tpl.call(format.substr(5), values[name], values);
                } else {
                    if (args) {
                        // quoted values are required for strings in compiled templates,
                        // but for non compiled we need to strip them
                        // quoted reversed for jsmin
                        var re = me.argsRe;
                        args = args.split(',');
                        for(var i = 0, len = args.length; i < len; i++){
                            args[i] = args[i].replace(re, "$1");
                        }
                        args = [values[name]].concat(args);
                    } else {
                        args = [values[name]];
                    }
                    return fm[format].apply(fm, args);
                }
            } else {
                return values[name] !== undefined ? values[name] : "";
            }
        }
        return me.html.replace(me.re, fn);
    },

    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ext.Template} this
     * @hide repeat doc
     */
    compile : function(){
        var me = this,
            fm = Ext.util.Format,
            useF = me.disableFormats !== true,
            sep = Ext.isGecko ? "+" : ",",
            body;

        function fn(m, name, format, args){
            if(format && useF){
                args = args ? ',' + args : "";
                if(format.substr(0, 5) != "this."){
                    format = "fm." + format + '(';
                }else{
                    format = 'this.call("'+ format.substr(5) + '", ';
                    args = ", values";
                }
            }else{
                args= ''; format = "(values['" + name + "'] == undefined ? '' : ";
            }
            return "'"+ sep + format + "values['" + name + "']" + args + ")"+sep+"'";
        }

        // branched to use + in gecko and [].join() in others
        if(Ext.isGecko){
            body = "this.compiled = function(values){ return '" +
                   me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn) +
                    "';};";
        }else{
            body = ["this.compiled = function(values){ return ['"];
            body.push(me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn));
            body.push("'].join('');};");
            body = body.join('');
        }
        eval(body);
        return me;
    },

    // private function used to call members
    call : function(fnName, value, allValues){
        return this[fnName](value, allValues);
    }
});
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
/*
 * This is code is also distributed under MIT license for use
 * with jQuery and prototype JavaScript libraries.
 */
/**
 * @class Ext.DomQuery
Provides high performance selector/xpath processing by compiling queries into reusable functions. New pseudo classes and matchers can be plugged. It works on HTML and XML documents (if a content node is passed in).
<p>
DomQuery supports most of the <a href="http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#selectors">CSS3 selectors spec</a>, along with some custom selectors and basic XPath.</p>

<p>
All selectors, attribute filters and pseudos below can be combined infinitely in any order. For example "div.foo:nth-child(odd)[@foo=bar].bar:first" would be a perfectly valid selector. Node filters are processed in the order in which they appear, which allows you to optimize your queries for your document structure.
</p>
<h4>Element Selectors:</h4>
<ul class="list">
    <li> <b>*</b> any element</li>
    <li> <b>E</b> an element with the tag E</li>
    <li> <b>E F</b> All descendent elements of E that have the tag F</li>
    <li> <b>E > F</b> or <b>E/F</b> all direct children elements of E that have the tag F</li>
    <li> <b>E + F</b> all elements with the tag F that are immediately preceded by an element with the tag E</li>
    <li> <b>E ~ F</b> all elements with the tag F that are preceded by a sibling element with the tag E</li>
</ul>
<h4>Attribute Selectors:</h4>
<p>The use of &#64; and quotes are optional. For example, div[&#64;foo='bar'] is also a valid attribute selector.</p>
<ul class="list">
    <li> <b>E[foo]</b> has an attribute "foo"</li>
    <li> <b>E[foo=bar]</b> has an attribute "foo" that equals "bar"</li>
    <li> <b>E[foo^=bar]</b> has an attribute "foo" that starts with "bar"</li>
    <li> <b>E[foo$=bar]</b> has an attribute "foo" that ends with "bar"</li>
    <li> <b>E[foo*=bar]</b> has an attribute "foo" that contains the substring "bar"</li>
    <li> <b>E[foo%=2]</b> has an attribute "foo" that is evenly divisible by 2</li>
    <li> <b>E[foo!=bar]</b> has an attribute "foo" that does not equal "bar"</li>
</ul>
<h4>Pseudo Classes:</h4>
<ul class="list">
    <li> <b>E:first-child</b> E is the first child of its parent</li>
    <li> <b>E:last-child</b> E is the last child of its parent</li>
    <li> <b>E:nth-child(<i>n</i>)</b> E is the <i>n</i>th child of its parent (1 based as per the spec)</li>
    <li> <b>E:nth-child(odd)</b> E is an odd child of its parent</li>
    <li> <b>E:nth-child(even)</b> E is an even child of its parent</li>
    <li> <b>E:only-child</b> E is the only child of its parent</li>
    <li> <b>E:checked</b> E is an element that is has a checked attribute that is true (e.g. a radio or checkbox) </li>
    <li> <b>E:first</b> the first E in the resultset</li>
    <li> <b>E:last</b> the last E in the resultset</li>
    <li> <b>E:nth(<i>n</i>)</b> the <i>n</i>th E in the resultset (1 based)</li>
    <li> <b>E:odd</b> shortcut for :nth-child(odd)</li>
    <li> <b>E:even</b> shortcut for :nth-child(even)</li>
    <li> <b>E:contains(foo)</b> E's innerHTML contains the substring "foo"</li>
    <li> <b>E:nodeValue(foo)</b> E contains a textNode with a nodeValue that equals "foo"</li>
    <li> <b>E:not(S)</b> an E element that does not match simple selector S</li>
    <li> <b>E:has(S)</b> an E element that has a descendent that matches simple selector S</li>
    <li> <b>E:next(S)</b> an E element whose next sibling matches simple selector S</li>
    <li> <b>E:prev(S)</b> an E element whose previous sibling matches simple selector S</li>
    <li> <b>E:any(S1|S2|S2)</b> an E element which matches any of the simple selectors S1, S2 or S3//\\</li>
</ul>
<h4>CSS Value Selectors:</h4>
<ul class="list">
    <li> <b>E{display=none}</b> css value "display" that equals "none"</li>
    <li> <b>E{display^=none}</b> css value "display" that starts with "none"</li>
    <li> <b>E{display$=none}</b> css value "display" that ends with "none"</li>
    <li> <b>E{display*=none}</b> css value "display" that contains the substring "none"</li>
    <li> <b>E{display%=2}</b> css value "display" that is evenly divisible by 2</li>
    <li> <b>E{display!=none}</b> css value "display" that does not equal "none"</li>
</ul>
 * @singleton
 */
Ext.DomQuery = function(){
    var cache = {}, 
    	simpleCache = {}, 
    	valueCache = {},
    	nonSpace = /\S/,
    	trimRe = /^\s+|\s+$/g,
    	tplRe = /\{(\d+)\}/g,
    	modeRe = /^(\s?[\/>+~]\s?|\s|$)/,
    	tagTokenRe = /^(#)?([\w-\*]+)/,
    	nthRe = /(\d*)n\+?(\d*)/, 
    	nthRe2 = /\D/,
    	// This is for IE MSXML which does not support expandos.
	// IE runs the same speed using setAttribute, however FF slows way down
	// and Safari completely fails so they need to continue to use expandos.
	isIE = window.ActiveXObject ? true : false,
	key = 30803;
    
    // this eval is stop the compressor from
    // renaming the variable to something shorter
    eval("var batch = 30803;");    	

    // Retrieve the child node from a particular
    // parent at the specified index.
    function child(parent, index){
        var i = 0,
            n = parent.firstChild;
        while(n){
            if(n.nodeType == 1){
               if(++i == index){
                   return n;
               }
            }
            n = n.nextSibling;
        }
        return null;
    }

    // retrieve the next element node
    function next(n){	
        while((n = n.nextSibling) && n.nodeType != 1);
        return n;
    }

    // retrieve the previous element node 
    function prev(n){
        while((n = n.previousSibling) && n.nodeType != 1);
        return n;
    }

    // Mark each child node with a nodeIndex skipping and
    // removing empty text nodes.
    function children(parent){
        var n = parent.firstChild,
	    nodeIndex = -1,
	    nextNode;
	while(n){
	    nextNode = n.nextSibling;
	    // clean worthless empty nodes.
	    if(n.nodeType == 3 && !nonSpace.test(n.nodeValue)){
		parent.removeChild(n);
	    }else{
		// add an expando nodeIndex
		n.nodeIndex = ++nodeIndex;
	    }
	    n = nextNode;
	}
	return this;
    }


    // nodeSet - array of nodes
    // cls - CSS Class
    function byClassName(nodeSet, cls){
        if(!cls){
            return nodeSet;
        }
        var result = [], ri = -1;
        for(var i = 0, ci; ci = nodeSet[i]; i++){
            if((' '+ci.className+' ').indexOf(cls) != -1){
                result[++ri] = ci;
            }
        }
        return result;
    };

    function attrValue(n, attr){
	// if its an array, use the first node.
        if(!n.tagName && typeof n.length != "undefined"){
            n = n[0];
        }
        if(!n){
            return null;
        }

        if(attr == "for"){
            return n.htmlFor;
        }
        if(attr == "class" || attr == "className"){
            return n.className;
        }
        return n.getAttribute(attr) || n[attr];

    };


    // ns - nodes
    // mode - false, /, >, +, ~
    // tagName - defaults to "*"
    function getNodes(ns, mode, tagName){
        var result = [], ri = -1, cs;
        if(!ns){
            return result;
        }
        tagName = tagName || "*";
	// convert to array
        if(typeof ns.getElementsByTagName != "undefined"){
            ns = [ns];
        }
	
	// no mode specified, grab all elements by tagName
	// at any depth
        if(!mode){
            for(var i = 0, ni; ni = ns[i]; i++){
                cs = ni.getElementsByTagName(tagName);
                for(var j = 0, ci; ci = cs[j]; j++){
                    result[++ri] = ci;
                }
            }
	// Direct Child mode (/ or >)
	// E > F or E/F all direct children elements of E that have the tag 	
        } else if(mode == "/" || mode == ">"){
            var utag = tagName.toUpperCase();
            for(var i = 0, ni, cn; ni = ns[i]; i++){
                cn = ni.childNodes;
                for(var j = 0, cj; cj = cn[j]; j++){
                    if(cj.nodeName == utag || cj.nodeName == tagName  || tagName == '*'){
                        result[++ri] = cj;
                    }
                }
            }
	// Immediately Preceding mode (+)
	// E + F all elements with the tag F that are immediately preceded by an element with the tag E
        }else if(mode == "+"){
            var utag = tagName.toUpperCase();
            for(var i = 0, n; n = ns[i]; i++){
                while((n = n.nextSibling) && n.nodeType != 1);
                if(n && (n.nodeName == utag || n.nodeName == tagName || tagName == '*')){
                    result[++ri] = n;
                }
            }
	// Sibling mode (~)
	// E ~ F all elements with the tag F that are preceded by a sibling element with the tag E
        }else if(mode == "~"){
            var utag = tagName.toUpperCase();
            for(var i = 0, n; n = ns[i]; i++){
                while((n = n.nextSibling)){
                    if (n.nodeName == utag || n.nodeName == tagName || tagName == '*'){
                        result[++ri] = n;
                    }
                }
            }
        }
        return result;
    }

    function concat(a, b){
        if(b.slice){
            return a.concat(b);
        }
        for(var i = 0, l = b.length; i < l; i++){
            a[a.length] = b[i];
        }
        return a;
    }

    function byTag(cs, tagName){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!tagName){
            return cs;
        }
        var result = [], ri = -1;
        tagName = tagName.toLowerCase();
        for(var i = 0, ci; ci = cs[i]; i++){
            if(ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName){
                result[++ri] = ci;
            }
        }
        return result;
    }

    function byId(cs, id){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!id){
            return cs;
        }
        var result = [], ri = -1;
        for(var i = 0, ci; ci = cs[i]; i++){
            if(ci && ci.id == id){
                result[++ri] = ci;
                return result;
            }
        }
        return result;
    }

    // operators are =, !=, ^=, $=, *=, %=, |= and ~=
    // custom can be "{"
    function byAttribute(cs, attr, value, op, custom){
        var result = [], 
            ri = -1, 
            useGetStyle = custom == "{",	    
            fn = Ext.DomQuery.operators[op],	    
            a,	    
            innerHTML;
        for(var i = 0, ci; ci = cs[i]; i++){
	    // skip non-element nodes.
            if(ci.nodeType != 1){
                continue;
            }
	    
            innerHTML = ci.innerHTML;
            // we only need to change the property names if we're dealing with html nodes, not XML
            if(innerHTML !== null && innerHTML !== undefined){
                if(useGetStyle){
                    a = Ext.DomQuery.getStyle(ci, attr);
                } else if (attr == "class" || attr == "className"){
                    a = ci.className;
                } else if (attr == "for"){
                    a = ci.htmlFor;
                } else if (attr == "href"){
		    // getAttribute href bug
		    // http://www.glennjones.net/Post/809/getAttributehrefbug.htm
                    a = ci.getAttribute("href", 2);
                } else{
                    a = ci.getAttribute(attr);
                }
            }else{
                a = ci.getAttribute(attr);
            }
            if((fn && fn(a, value)) || (!fn && a)){
                result[++ri] = ci;
            }
        }
        return result;
    }

    function byPseudo(cs, name, value){
        return Ext.DomQuery.pseudos[name](cs, value);
    }

    function nodupIEXml(cs){
        var d = ++key, 
            r;
        cs[0].setAttribute("_nodup", d);
        r = [cs[0]];
        for(var i = 1, len = cs.length; i < len; i++){
            var c = cs[i];
            if(!c.getAttribute("_nodup") != d){
                c.setAttribute("_nodup", d);
                r[r.length] = c;
            }
        }
        for(var i = 0, len = cs.length; i < len; i++){
            cs[i].removeAttribute("_nodup");
        }
        return r;
    }

    function nodup(cs){
        if(!cs){
            return [];
        }
        var len = cs.length, c, i, r = cs, cj, ri = -1;
        if(!len || typeof cs.nodeType != "undefined" || len == 1){
            return cs;
        }
        if(isIE && typeof cs[0].selectSingleNode != "undefined"){
            return nodupIEXml(cs);
        }
        var d = ++key;
        cs[0]._nodup = d;
        for(i = 1; c = cs[i]; i++){
            if(c._nodup != d){
                c._nodup = d;
            }else{
                r = [];
                for(var j = 0; j < i; j++){
                    r[++ri] = cs[j];
                }
                for(j = i+1; cj = cs[j]; j++){
                    if(cj._nodup != d){
                        cj._nodup = d;
                        r[++ri] = cj;
                    }
                }
                return r;
            }
        }
        return r;
    }

    function quickDiffIEXml(c1, c2){
        var d = ++key,
            r = [];
        for(var i = 0, len = c1.length; i < len; i++){
            c1[i].setAttribute("_qdiff", d);
        }        
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i].getAttribute("_qdiff") != d){
                r[r.length] = c2[i];
            }
        }
        for(var i = 0, len = c1.length; i < len; i++){
           c1[i].removeAttribute("_qdiff");
        }
        return r;
    }

    function quickDiff(c1, c2){
        var len1 = c1.length,
        	d = ++key,
        	r = [];
        if(!len1){
            return c2;
        }
        if(isIE && typeof c1[0].selectSingleNode != "undefined"){
            return quickDiffIEXml(c1, c2);
        }        
        for(var i = 0; i < len1; i++){
            c1[i]._qdiff = d;
        }        
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i]._qdiff != d){
                r[r.length] = c2[i];
            }
        }
        return r;
    }

    function quickId(ns, mode, root, id){
        if(ns == root){
           var d = root.ownerDocument || root;
           return d.getElementById(id);
        }
        ns = getNodes(ns, mode, "*");
        return byId(ns, id);
    }

    return {
        getStyle : function(el, name){
            return Ext.fly(el).getStyle(name);
        },
        /**
         * Compiles a selector/xpath query into a reusable function. The returned function
         * takes one parameter "root" (optional), which is the context node from where the query should start.
         * @param {String} selector The selector/xpath query
         * @param {String} type (optional) Either "select" (the default) or "simple" for a simple selector match
         * @return {Function}
         */
        compile : function(path, type){
            type = type || "select";

	    // setup fn preamble
            var fn = ["var f = function(root){\n var mode; ++batch; var n = root || document;\n"],
		mode,		
		lastPath,
            	matchers = Ext.DomQuery.matchers,
            	matchersLn = matchers.length,
            	modeMatch,
            	// accept leading mode switch
            	lmode = path.match(modeRe);
            
            if(lmode && lmode[1]){
                fn[fn.length] = 'mode="'+lmode[1].replace(trimRe, "")+'";';
                path = path.replace(lmode[1], "");
            }
	    
            // strip leading slashes
            while(path.substr(0, 1)=="/"){
                path = path.substr(1);
            }

            while(path && lastPath != path){
                lastPath = path;
                var tokenMatch = path.match(tagTokenRe);
                if(type == "select"){
                    if(tokenMatch){
			// ID Selector
                        if(tokenMatch[1] == "#"){
                            fn[fn.length] = 'n = quickId(n, mode, root, "'+tokenMatch[2]+'");';			
                        }else{
                            fn[fn.length] = 'n = getNodes(n, mode, "'+tokenMatch[2]+'");';
                        }
                        path = path.replace(tokenMatch[0], "");
                    }else if(path.substr(0, 1) != '@'){
                        fn[fn.length] = 'n = getNodes(n, mode, "*");';
                    }
		// type of "simple"
                }else{
                    if(tokenMatch){
                        if(tokenMatch[1] == "#"){
                            fn[fn.length] = 'n = byId(n, "'+tokenMatch[2]+'");';
                        }else{
                            fn[fn.length] = 'n = byTag(n, "'+tokenMatch[2]+'");';
                        }
                        path = path.replace(tokenMatch[0], "");
                    }
                }
                while(!(modeMatch = path.match(modeRe))){
                    var matched = false;
                    for(var j = 0; j < matchersLn; j++){
                        var t = matchers[j];
                        var m = path.match(t.re);
                        if(m){
                            fn[fn.length] = t.select.replace(tplRe, function(x, i){
				return m[i];
			    });
                            path = path.replace(m[0], "");
                            matched = true;
                            break;
                        }
                    }
                    // prevent infinite loop on bad selector
                    if(!matched){
                        throw 'Error parsing selector, parsing failed at "' + path + '"';
                    }
                }
                if(modeMatch[1]){
                    fn[fn.length] = 'mode="'+modeMatch[1].replace(trimRe, "")+'";';
                    path = path.replace(modeMatch[1], "");
                }
            }
	    // close fn out
            fn[fn.length] = "return nodup(n);\n}";
	    
	    // eval fn and return it
            eval(fn.join(""));
            return f;
        },

        /**
         * Selects a group of elements.
         * @param {String} selector The selector/xpath query (can be a comma separated list of selectors)
         * @param {Node/String} root (optional) The start of the query (defaults to document).
         * @return {Array} An Array of DOM elements which match the selector. If there are
         * no matches, and empty Array is returned.
         */
	jsSelect: function(path, root, type){
	    // set root to doc if not specified.
	    root = root || document;
	    
            if(typeof root == "string"){
                root = document.getElementById(root);
            }
            var paths = path.split(","),
            	results = [];
		
	    // loop over each selector
            for(var i = 0, len = paths.length; i < len; i++){		
                var subPath = paths[i].replace(trimRe, "");
		// compile and place in cache
                if(!cache[subPath]){
                    cache[subPath] = Ext.DomQuery.compile(subPath);
                    if(!cache[subPath]){
                        throw subPath + " is not a valid selector";
                    }
                }
                var result = cache[subPath](root);
                if(result && result != document){
                    results = results.concat(result);
                }
            }
	    
	    // if there were multiple selectors, make sure dups
	    // are eliminated
            if(paths.length > 1){
                return nodup(results);
            }
            return results;
        },
	isXml: function(el) {
	    var docEl = (el ? el.ownerDocument || el : 0).documentElement;
	    return docEl ? docEl.nodeName !== "HTML" : false;
	},
        select : document.querySelectorAll ? function(path, root, type) {
	    root = root || document;
	    if (!Ext.DomQuery.isXml(root)) {
		try {
		    var cs = root.querySelectorAll(path);
		    return Ext.toArray(cs);
		}
		catch (ex) {}		
	    }	    
	    return Ext.DomQuery.jsSelect.call(this, path, root, type);
	} : function(path, root, type) {
	    return Ext.DomQuery.jsSelect.call(this, path, root, type);
	},

        /**
         * Selects a single element.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @return {Element} The DOM element which matched the selector.
         */
        selectNode : function(path, root){
            return Ext.DomQuery.select(path, root)[0];
        },

        /**
         * Selects the value of a node, optionally replacing null with the defaultValue.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @param {String} defaultValue
         * @return {String}
         */
        selectValue : function(path, root, defaultValue){
            path = path.replace(trimRe, "");
            if(!valueCache[path]){
                valueCache[path] = Ext.DomQuery.compile(path, "select");
            }
            var n = valueCache[path](root), v;
            n = n[0] ? n[0] : n;
            	    
	    // overcome a limitation of maximum textnode size
	    // Rumored to potentially crash IE6 but has not been confirmed.
	    // http://reference.sitepoint.com/javascript/Node/normalize
	    // https://developer.mozilla.org/En/DOM/Node.normalize	    
            if (typeof n.normalize == 'function') n.normalize();
            
            v = (n && n.firstChild ? n.firstChild.nodeValue : null);
            return ((v === null||v === undefined||v==='') ? defaultValue : v);
        },

        /**
         * Selects the value of a node, parsing integers and floats. Returns the defaultValue, or 0 if none is specified.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @param {Number} defaultValue
         * @return {Number}
         */
        selectNumber : function(path, root, defaultValue){
            var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
            return parseFloat(v);
        },

        /**
         * Returns true if the passed element(s) match the passed simple selector (e.g. div.some-class or span:first-child)
         * @param {String/HTMLElement/Array} el An element id, element or array of elements
         * @param {String} selector The simple selector to test
         * @return {Boolean}
         */
        is : function(el, ss){
            if(typeof el == "string"){
                el = document.getElementById(el);
            }
            var isArray = Ext.isArray(el),
            	result = Ext.DomQuery.filter(isArray ? el : [el], ss);
            return isArray ? (result.length == el.length) : (result.length > 0);
        },

        /**
         * Filters an array of elements to only include matches of a simple selector (e.g. div.some-class or span:first-child)
         * @param {Array} el An array of elements to filter
         * @param {String} selector The simple selector to test
         * @param {Boolean} nonMatches If true, it returns the elements that DON'T match
         * the selector instead of the ones that match
         * @return {Array} An Array of DOM elements which match the selector. If there are
         * no matches, and empty Array is returned.
         */
        filter : function(els, ss, nonMatches){
            ss = ss.replace(trimRe, "");
            if(!simpleCache[ss]){
                simpleCache[ss] = Ext.DomQuery.compile(ss, "simple");
            }
            var result = simpleCache[ss](els);
            return nonMatches ? quickDiff(result, els) : result;
        },

        /**
         * Collection of matching regular expressions and code snippets.
         * Each capture group within () will be replace the {} in the select
         * statement as specified by their index.
         */
        matchers : [{
                re: /^\.([\w-]+)/,
                select: 'n = byClassName(n, " {1} ");'
            }, {
                re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
                select: 'n = byPseudo(n, "{1}", "{2}");'
            },{
                re: /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
                select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
            }, {
                re: /^#([\w-]+)/,
                select: 'n = byId(n, "{1}");'
            },{
                re: /^@([\w-]+)/,
                select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
            }
        ],

        /**
         * Collection of operator comparison functions. The default operators are =, !=, ^=, $=, *=, %=, |= and ~=.
         * New operators can be added as long as the match the format <i>c</i>= where <i>c</i> is any character other than space, &gt; &lt;.
         */
        operators : {
            "=" : function(a, v){
                return a == v;
            },
            "!=" : function(a, v){
                return a != v;
            },
            "^=" : function(a, v){
                return a && a.substr(0, v.length) == v;
            },
            "$=" : function(a, v){
                return a && a.substr(a.length-v.length) == v;
            },
            "*=" : function(a, v){
                return a && a.indexOf(v) !== -1;
            },
            "%=" : function(a, v){
                return (a % v) == 0;
            },
            "|=" : function(a, v){
                return a && (a == v || a.substr(0, v.length+1) == v+'-');
            },
            "~=" : function(a, v){
                return a && (' '+a+' ').indexOf(' '+v+' ') != -1;
            }
        },

        /**
         * <p>Object hash of "pseudo class" filter functions which are used when filtering selections. Each function is passed
         * two parameters:</p><div class="mdetail-params"><ul>
         * <li><b>c</b> : Array<div class="sub-desc">An Array of DOM elements to filter.</div></li>
         * <li><b>v</b> : String<div class="sub-desc">The argument (if any) supplied in the selector.</div></li>
         * </ul></div>
         * <p>A filter function returns an Array of DOM elements which conform to the pseudo class.</p>
         * <p>In addition to the provided pseudo classes listed above such as <code>first-child</code> and <code>nth-child</code>,
         * developers may add additional, custom psuedo class filters to select elements according to application-specific requirements.</p>
         * <p>For example, to filter <code>&lt;a></code> elements to only return links to <i>external</i> resources:</p>
         * <code><pre>
Ext.DomQuery.pseudos.external = function(c, v){
    var r = [], ri = -1;
    for(var i = 0, ci; ci = c[i]; i++){
//      Include in result set only if it's a link to an external resource
        if(ci.hostname != location.hostname){
            r[++ri] = ci;
        }
    }
    return r;
};</pre></code>
         * Then external links could be gathered with the following statement:<code><pre>
var externalLinks = Ext.select("a:external");
</code></pre>
         */
        pseudos : {
            "first-child" : function(c){
                var r = [], ri = -1, n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.previousSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "last-child" : function(c){
                var r = [], ri = -1, n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.nextSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nth-child" : function(c, a) {
                var r = [], ri = -1,
                	m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a),
                	f = (m[1] || 1) - 0, l = m[2] - 0;
                for(var i = 0, n; n = c[i]; i++){
                    var pn = n.parentNode;
                    if (batch != pn._batch) {
                        var j = 0;
                        for(var cn = pn.firstChild; cn; cn = cn.nextSibling){
                            if(cn.nodeType == 1){
                               cn.nodeIndex = ++j;
                            }
                        }
                        pn._batch = batch;
                    }
                    if (f == 1) {
                        if (l == 0 || n.nodeIndex == l){
                            r[++ri] = n;
                        }
                    } else if ((n.nodeIndex + l) % f == 0){
                        r[++ri] = n;
                    }
                }

                return r;
            },

            "only-child" : function(c){
                var r = [], ri = -1;;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(!prev(ci) && !next(ci)){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "empty" : function(c){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var cns = ci.childNodes, j = 0, cn, empty = true;
                    while(cn = cns[j]){
                        ++j;
                        if(cn.nodeType == 1 || cn.nodeType == 3){
                            empty = false;
                            break;
                        }
                    }
                    if(empty){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "contains" : function(c, v){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if((ci.textContent||ci.innerText||'').indexOf(v) != -1){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nodeValue" : function(c, v){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.firstChild && ci.firstChild.nodeValue == v){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "checked" : function(c){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.checked == true){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "not" : function(c, ss){
                return Ext.DomQuery.filter(c, ss, true);
            },

            "any" : function(c, selectors){
                var ss = selectors.split('|'),
                	r = [], ri = -1, s;
                for(var i = 0, ci; ci = c[i]; i++){
                    for(var j = 0; s = ss[j]; j++){
                        if(Ext.DomQuery.is(ci, s)){
                            r[++ri] = ci;
                            break;
                        }
                    }
                }
                return r;
            },

            "odd" : function(c){
                return this["nth-child"](c, "odd");
            },

            "even" : function(c){
                return this["nth-child"](c, "even");
            },

            "nth" : function(c, a){
                return c[a-1] || [];
            },

            "first" : function(c){
                return c[0] || [];
            },

            "last" : function(c){
                return c[c.length-1] || [];
            },

            "has" : function(c, ss){
                var s = Ext.DomQuery.select,
                	r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(s(ss, ci).length > 0){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "next" : function(c, ss){
                var is = Ext.DomQuery.is,
                	r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = next(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "prev" : function(c, ss){
                var is = Ext.DomQuery.is,
                	r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = prev(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return r;
            }
        }
    };
}();

/**
 * Selects an array of DOM nodes by CSS/XPath selector. Shorthand of {@link Ext.DomQuery#select}
 * @param {String} path The selector/xpath query
 * @param {Node} root (optional) The start of the query (defaults to document).
 * @return {Array}
 * @member Ext
 * @method query
 */
Ext.query = Ext.DomQuery.select;
/**
 * @class Ext.util.DelayedTask
 * <p> The DelayedTask class provides a convenient way to "buffer" the execution of a method,
 * performing setTimeout where a new timeout cancels the old timeout. When called, the
 * task will wait the specified time period before executing. If durng that time period,
 * the task is called again, the original call will be cancelled. This continues so that
 * the function is only called a single time for each iteration.</p>
 * <p>This method is especially useful for things like detecting whether a user has finished
 * typing in a text field. An example would be performing validation on a keypress. You can
 * use this class to buffer the keypress events for a certain number of milliseconds, and
 * perform only if they stop for that amount of time.  Usage:</p><pre><code>
var task = new Ext.util.DelayedTask(function(){
    alert(Ext.getDom('myInputField').value.length);
});
// Wait 500ms before calling our function. If the user presses another key 
// during that 500ms, it will be cancelled and we'll wait another 500ms.
Ext.get('myInputField').on('keypress', function(){
    task.{@link #delay}(500); 
});
 * </code></pre> 
 * <p>Note that we are using a DelayedTask here to illustrate a point. The configuration
 * option <tt>buffer</tt> for {@link Ext.util.Observable#addListener addListener/on} will
 * also setup a delayed task for you to buffer events.</p> 
 * @constructor The parameters to this constructor serve as defaults and are not required.
 * @param {Function} fn (optional) The default function to call.
 * @param {Object} scope The default scope (The <code><b>this</b></code> reference) in which the
 * function is called. If not specified, <code>this</code> will refer to the browser window.
 * @param {Array} args (optional) The default Array of arguments.
 */
Ext.util.DelayedTask = function(fn, scope, args){
    var me = this,
    	id,    	
    	call = function(){
    		clearInterval(id);
	        id = null;
	        fn.apply(scope, args || []);
	    };
	    
    /**
     * Cancels any pending timeout and queues a new one
     * @param {Number} delay The milliseconds to delay
     * @param {Function} newFn (optional) Overrides function passed to constructor
     * @param {Object} newScope (optional) Overrides scope passed to constructor. Remember that if no scope
     * is specified, <code>this</code> will refer to the browser window.
     * @param {Array} newArgs (optional) Overrides args passed to constructor
     */
    me.delay = function(delay, newFn, newScope, newArgs){
        me.cancel();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        id = setInterval(call, delay);
    };

    /**
     * Cancel the last queued timeout
     */
    me.cancel = function(){
        if(id){
            clearInterval(id);
            id = null;
        }
    };
};(function(){

var EXTUTIL = Ext.util,
    EACH = Ext.each,
    TRUE = true,
    FALSE = false;
/**
 * @class Ext.util.Observable
 * Base class that provides a common interface for publishing events. Subclasses are expected to
 * to have a property "events" with all the events defined, and, optionally, a property "listeners"
 * with configured listeners defined.<br>
 * For example:
 * <pre><code>
Employee = Ext.extend(Ext.util.Observable, {
    constructor: function(config){
        this.name = config.name;
        this.addEvents({
            "fired" : true,
            "quit" : true
        });

        // Copy configured listeners into *this* object so that the base class&#39;s
        // constructor will add them.
        this.listeners = config.listeners;

        // Call our superclass constructor to complete construction process.
        Employee.superclass.constructor.call(this, config)
    }
});
</code></pre>
 * This could then be used like this:<pre><code>
var newEmployee = new Employee({
    name: employeeName,
    listeners: {
        quit: function() {
            // By default, "this" will be the object that fired the event.
            alert(this.name + " has quit!");
        }
    }
});
</code></pre>
 */
EXTUTIL.Observable = function(){
    /**
     * @cfg {Object} listeners (optional) <p>A config object containing one or more event handlers to be added to this
     * object during initialization.  This should be a valid listeners config object as specified in the
     * {@link #addListener} example for attaching multiple handlers at once.</p>
     * <br><p><b><u>DOM events from ExtJs {@link Ext.Component Components}</u></b></p>
     * <br><p>While <i>some</i> ExtJs Component classes export selected DOM events (e.g. "click", "mouseover" etc), this
     * is usually only done when extra value can be added. For example the {@link Ext.DataView DataView}'s
     * <b><code>{@link Ext.DataView#click click}</code></b> event passing the node clicked on. To access DOM
     * events directly from a Component's HTMLElement, listeners must be added to the <i>{@link Ext.Component#getEl Element}</i> after the Component
     * has been rendered. A plugin can simplify this step:<pre><code>
// Plugin is configured with a listeners config object.
// The Component is appended to the argument list of all handler functions.
Ext.DomObserver = Ext.extend(Object, {
    constructor: function(config) {
        this.listeners = config.listeners ? config.listeners : config;
    },

    // Component passes itself into plugin&#39;s init method
    init: function(c) {
        var p, l = this.listeners;
        for (p in l) {
            if (Ext.isFunction(l[p])) {
                l[p] = this.createHandler(l[p], c);
            } else {
                l[p].fn = this.createHandler(l[p].fn, c);
            }
        }

        // Add the listeners to the Element immediately following the render call
        c.render = c.render.{@link Function#createSequence createSequence}(function() {
            var e = c.getEl();
            if (e) {
                e.on(l);
            }
        });
    },

    createHandler: function(fn, c) {
        return function(e) {
            fn.call(this, e, c);
        };
    }
});

var combo = new Ext.form.ComboBox({

    // Collapse combo when its element is clicked on
    plugins: [ new Ext.DomObserver({
        click: function(evt, comp) {
            comp.collapse();
        }
    })],
    store: myStore,
    typeAhead: true,
    mode: 'local',
    triggerAction: 'all'
});
     * </code></pre></p>
     */
    var me = this, e = me.events;
    if(me.listeners){
        me.on(me.listeners);
        delete me.listeners;
    }
    me.events = e || {};
};

EXTUTIL.Observable.prototype = {
    // private
    filterOptRe : /^(?:scope|delay|buffer|single)$/,

    /**
     * <p>Fires the specified event with the passed parameters (minus the event name).</p>
     * <p>An event may be set to bubble up an Observable parent hierarchy (See {@link Ext.Component#getBubbleTarget})
     * by calling {@link #enableBubble}.</p>
     * @param {String} eventName The name of the event to fire.
     * @param {Object...} args Variable number of parameters are passed to handlers.
     * @return {Boolean} returns false if any of the handlers return false otherwise it returns true.
     */
    fireEvent : function(){
        var a = Array.prototype.slice.call(arguments, 0),
            ename = a[0].toLowerCase(),
            me = this,
            ret = TRUE,
            ce = me.events[ename],
            cc,
            q,
            c;
        if (me.eventsSuspended === TRUE) {
            if (q = me.eventQueue) {
                q.push(a);
            }
        }
        else if(typeof ce == 'object') {
            if (ce.bubble){
                if(ce.fire.apply(ce, a.slice(1)) === FALSE) {
                    return FALSE;
                }
                c = me.getBubbleTarget && me.getBubbleTarget();
                if(c && c.enableBubble) {
                    cc = c.events[ename];
                    if(!cc || typeof cc != 'object' || !cc.bubble) {
                        c.enableBubble(ename);
                    }
                    return c.fireEvent.apply(c, a);
                }
            }
            else {
                a.shift();
                ret = ce.fire.apply(ce, a);
            }
        }
        return ret;
    },

    /**
     * Appends an event handler to this object.
     * @param {String}   eventName The name of the event to listen for.
     * @param {Function} handler The method the event invokes.
     * @param {Object}   scope (optional) The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to the object which fired the event.</b>
     * @param {Object}   options (optional) An object containing handler configuration.
     * properties. This may contain any of the following properties:<ul>
     * <li><b>scope</b> : Object<div class="sub-desc">The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to the object which fired the event.</b></div></li>
     * <li><b>delay</b> : Number<div class="sub-desc">The number of milliseconds to delay the invocation of the handler after the event fires.</div></li>
     * <li><b>single</b> : Boolean<div class="sub-desc">True to add a handler to handle just the next firing of the event, and then remove itself.</div></li>
     * <li><b>buffer</b> : Number<div class="sub-desc">Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</div></li>
     * <li><b>target</b> : Observable<div class="sub-desc">Only call the handler if the event was fired on the target Observable, <i>not</i>
     * if the event was bubbled up from a child Observable.</div></li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * Using the options argument, it is possible to combine different types of listeners:<br>
     * <br>
     * A delayed, one-time listener.
     * <pre><code>
myDataView.on('click', this.onClick, this, {
single: true,
delay: 100
});</code></pre>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
     * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple handlers.
     * <p>
     * <pre><code>
myGridPanel.on({
'click' : {
    fn: this.onClick,
    scope: this,
    delay: 100
},
'mouseover' : {
    fn: this.onMouseOver,
    scope: this
},
'mouseout' : {
    fn: this.onMouseOut,
    scope: this
}
});</code></pre>
 * <p>
 * Or a shorthand syntax:<br>
 * <pre><code>
myGridPanel.on({
'click' : this.onClick,
'mouseover' : this.onMouseOver,
'mouseout' : this.onMouseOut,
 scope: this
});</code></pre>
     */
    addListener : function(eventName, fn, scope, o){
        var me = this,
            e,
            oe,
            isF,
        ce;
        if (typeof eventName == 'object') {
            o = eventName;
            for (e in o){
                oe = o[e];
                if (!me.filterOptRe.test(e)) {
                    me.addListener(e, oe.fn || oe, oe.scope || o.scope, oe.fn ? oe : o);
                }
            }
        } else {
            eventName = eventName.toLowerCase();
            ce = me.events[eventName] || TRUE;
            if (typeof ce == 'boolean') {
                me.events[eventName] = ce = new EXTUTIL.Event(me, eventName);
            }
            ce.addListener(fn, scope, typeof o == 'object' ? o : {});
        }
    },

    /**
     * Removes an event handler.
     * @param {String}   eventName The type of event the handler was associated with.
     * @param {Function} handler   The handler to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
     * @param {Object}   scope     (optional) The scope originally specified for the handler.
     */
    removeListener : function(eventName, fn, scope){
        var ce = this.events[eventName.toLowerCase()];
        if (typeof ce == 'object') {
            ce.removeListener(fn, scope);
        }
    },

    /**
     * Removes all listeners for this object
     */
    purgeListeners : function(){
        var events = this.events,
            evt,
            key;
        for(key in events){
            evt = events[key];
            if(typeof evt == 'object'){
                evt.clearListeners();
            }
        }
    },

    /**
     * Adds the specified events to the list of events which this Observable may fire.
     * @param {Object|String} o Either an object with event names as properties with a value of <code>true</code>
     * or the first event name string if multiple event names are being passed as separate parameters.
     * @param {string} Optional. Event name if multiple event names are being passed as separate parameters.
     * Usage:<pre><code>
this.addEvents('storeloaded', 'storecleared');
</code></pre>
     */
    addEvents : function(o){
        var me = this;
        me.events = me.events || {};
        if (typeof o == 'string') {
            var a = arguments,
                i = a.length;
            while(i--) {
                me.events[a[i]] = me.events[a[i]] || TRUE;
            }
        } else {
            Ext.applyIf(me.events, o);
        }
    },

    /**
     * Checks to see if this object has any listeners for a specified event
     * @param {String} eventName The name of the event to check for
     * @return {Boolean} True if the event is being listened for, else false
     */
    hasListener : function(eventName){
        var e = this.events[eventName.toLowerCase()];
        return typeof e == 'object' && e.listeners.length > 0;
    },

    /**
     * Suspend the firing of all events. (see {@link #resumeEvents})
     * @param {Boolean} queueSuspended Pass as true to queue up suspended events to be fired
     * after the {@link #resumeEvents} call instead of discarding all suspended events;
     */
    suspendEvents : function(queueSuspended){
        this.eventsSuspended = TRUE;
        if(queueSuspended && !this.eventQueue){
            this.eventQueue = [];
        }
    },

    /**
     * Resume firing events. (see {@link #suspendEvents})
     * If events were suspended using the <tt><b>queueSuspended</b></tt> parameter, then all
     * events fired during event suspension will be sent to any listeners now.
     */
    resumeEvents : function(){
        var me = this,
            queued = me.eventQueue || [];
        me.eventsSuspended = FALSE;
        delete me.eventQueue;
        EACH(queued, function(e) {
            me.fireEvent.apply(me, e);
        });
    }
};

var OBSERVABLE = EXTUTIL.Observable.prototype;
/**
 * Appends an event handler to this object (shorthand for {@link #addListener}.)
 * @param {String}   eventName     The type of event to listen for
 * @param {Function} handler       The method the event invokes
 * @param {Object}   scope         (optional) The scope (<code><b>this</b></code> reference) in which the handler function is executed.
 * <b>If omitted, defaults to the object which fired the event.</b>
 * @param {Object}   options       (optional) An object containing handler configuration.
 * @method
 */
OBSERVABLE.on = OBSERVABLE.addListener;
/**
 * Removes an event handler (shorthand for {@link #removeListener}.)
 * @param {String}   eventName     The type of event the handler was associated with.
 * @param {Function} handler       The handler to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
 * @param {Object}   scope         (optional) The scope originally specified for the handler.
 * @method
 */
OBSERVABLE.un = OBSERVABLE.removeListener;

/**
 * Removes <b>all</b> added captures from the Observable.
 * @param {Observable} o The Observable to release
 * @static
 */
EXTUTIL.Observable.releaseCapture = function(o){
    o.fireEvent = OBSERVABLE.fireEvent;
};

function createTargeted(h, o, scope){
    return function(){
        if(o.target == arguments[0]){
            h.apply(scope, Array.prototype.slice.call(arguments, 0));
        }
    };
};

function createBuffered(h, o, l, scope){
    l.task = new EXTUTIL.DelayedTask();
    return function(){
        l.task.delay(o.buffer, h, scope, Array.prototype.slice.call(arguments, 0));
    };
};

function createSingle(h, e, fn, scope){
    return function(){
        e.removeListener(fn, scope);
        return h.apply(scope, arguments);
    };
};

function createDelayed(h, o, l, scope){
    return function(){
        var task = new EXTUTIL.DelayedTask();
        if(!l.tasks) {
            l.tasks = [];
        }
        l.tasks.push(task);
        task.delay(o.delay || 10, h, scope, Array.prototype.slice.call(arguments, 0));
    };
};

EXTUTIL.Event = function(obj, name){
    this.name = name;
    this.obj = obj;
    this.listeners = [];
};

EXTUTIL.Event.prototype = {
    addListener : function(fn, scope, options){
        var me = this,
            l;
        scope = scope || me.obj;
        if(!me.isListening(fn, scope)){
            l = me.createListener(fn, scope, options);
            if(me.firing){ // if we are currently firing this event, don't disturb the listener loop
                me.listeners = me.listeners.slice(0);
            }
            me.listeners.push(l);
        }
    },

    createListener: function(fn, scope, o){
        o = o || {}, scope = scope || this.obj;
        var l = {
            fn: fn,
            scope: scope,
            options: o
        }, h = fn;
        if(o.target){
            h = createTargeted(h, o, scope);
        }
        if(o.delay){
            h = createDelayed(h, o, l, scope);
        }
        if(o.single){
            h = createSingle(h, this, fn, scope);
        }
        if(o.buffer){
            h = createBuffered(h, o, l, scope);
        }
        l.fireFn = h;
        return l;
    },

    findListener : function(fn, scope){
        var list = this.listeners,
            i = list.length,
            l;

        scope = scope || this.obj;
        while(i--){
            l = list[i];
            if(l){
                if(l.fn == fn && l.scope == scope){
                    return i;
                }
            }
        }
        return -1;
    },

    isListening : function(fn, scope){
        return this.findListener(fn, scope) != -1;
    },

    removeListener : function(fn, scope){
        var index,
            l,
            k,
            me = this,
            ret = FALSE;
        if((index = me.findListener(fn, scope)) != -1){
            if (me.firing) {
                me.listeners = me.listeners.slice(0);
            }
            l = me.listeners[index];
            if(l.task) {
                l.task.cancel();
                delete l.task;
            }
            k = l.tasks && l.tasks.length;
            if(k) {
                while(k--) {
                    l.tasks[k].cancel();
                }
                delete l.tasks;
            }
            me.listeners.splice(index, 1);
            ret = TRUE;
        }
        return ret;
    },

    // Iterate to stop any buffered/delayed events
    clearListeners : function(){
        var me = this,
            l = me.listeners,
            i = l.length;
        while(i--) {
            me.removeListener(l[i].fn, l[i].scope);
        }
    },

    fire : function(){
        var me = this,
            listeners = me.listeners,
            len = listeners.length,
            i = 0,
            l;

        if(len > 0){
            me.firing = TRUE;
            var args = Array.prototype.slice.call(arguments, 0);
            for (; i < len; i++) {
                l = listeners[i];
                if(l && l.fireFn.apply(l.scope || me.obj || window, args) === FALSE) {
                    return (me.firing = FALSE);
                }
            }
        }
        me.firing = FALSE;
        return TRUE;
    }

};
})();
/**
 * @class Ext.util.Observable
 */
Ext.apply(Ext.util.Observable.prototype, function(){
    // this is considered experimental (along with beforeMethod, afterMethod, removeMethodListener?)
    // allows for easier interceptor and sequences, including cancelling and overwriting the return value of the call
    // private
    function getMethodEvent(method){
        var e = (this.methodEvents = this.methodEvents ||
        {})[method], returnValue, v, cancel, obj = this;

        if (!e) {
            this.methodEvents[method] = e = {};
            e.originalFn = this[method];
            e.methodName = method;
            e.before = [];
            e.after = [];

            var makeCall = function(fn, scope, args){
                if((v = fn.apply(scope || obj, args)) !== undefined){
                    if (typeof v == 'object') {
                        if(v.returnValue !== undefined){
                            returnValue = v.returnValue;
                        }else{
                            returnValue = v;
                        }
                        cancel = !!v.cancel;
                    }
                    else
                        if (v === false) {
                            cancel = true;
                        }
                        else {
                            returnValue = v;
                        }
                }
            };

            this[method] = function(){
                var args = Array.prototype.slice.call(arguments, 0),
                    b;
                returnValue = v = undefined;
                cancel = false;

                for(var i = 0, len = e.before.length; i < len; i++){
                    b = e.before[i];
                    makeCall(b.fn, b.scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }

                if((v = e.originalFn.apply(obj, args)) !== undefined){
                    returnValue = v;
                }

                for(var i = 0, len = e.after.length; i < len; i++){
                    b = e.after[i];
                    makeCall(b.fn, b.scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }
                return returnValue;
            };
        }
        return e;
    }

    return {
        // these are considered experimental
        // allows for easier interceptor and sequences, including cancelling and overwriting the return value of the call
        // adds an 'interceptor' called before the original method
        beforeMethod : function(method, fn, scope){
            getMethodEvent.call(this, method).before.push({
                fn: fn,
                scope: scope
            });
        },

        // adds a 'sequence' called after the original method
        afterMethod : function(method, fn, scope){
            getMethodEvent.call(this, method).after.push({
                fn: fn,
                scope: scope
            });
        },

        removeMethodListener: function(method, fn, scope){
            var e = this.getMethodEvent(method);
            for(var i = 0, len = e.before.length; i < len; i++){
                if(e.before[i].fn == fn && e.before[i].scope == scope){
                    e.before.splice(i, 1);
                    return;
                }
            }
            for(var i = 0, len = e.after.length; i < len; i++){
                if(e.after[i].fn == fn && e.after[i].scope == scope){
                    e.after.splice(i, 1);
                    return;
                }
            }
        },

        /**
         * Relays selected events from the specified Observable as if the events were fired by <tt><b>this</b></tt>.
         * @param {Object} o The Observable whose events this object is to relay.
         * @param {Array} events Array of event names to relay.
         */
        relayEvents : function(o, events){
            var me = this;
            function createHandler(ename){
                return function(){
                    return me.fireEvent.apply(me, [ename].concat(Array.prototype.slice.call(arguments, 0)));
                };
            }
            for(var i = 0, len = events.length; i < len; i++){
                var ename = events[i];
                me.events[ename] = me.events[ename] || true;
                o.on(ename, createHandler(ename), me);
            }
        },

        /**
         * <p>Enables events fired by this Observable to bubble up an owner hierarchy by calling
         * <code>this.getBubbleTarget()</code> if present. There is no implementation in the Observable base class.</p>
         * <p>This is commonly used by Ext.Components to bubble events to owner Containers. See {@link Ext.Component.getBubbleTarget}. The default
         * implementation in Ext.Component returns the Component's immediate owner. But if a known target is required, this can be overridden to
         * access the required target more quickly.</p>
         * <p>Example:</p><pre><code>
Ext.override(Ext.form.Field, {
    //  Add functionality to Field&#39;s initComponent to enable the change event to bubble
    initComponent : Ext.form.Field.prototype.initComponent.createSequence(function() {
        this.enableBubble('change');
    }),

    //  We know that we want Field&#39;s events to bubble directly to the FormPanel.
    getBubbleTarget : function() {
        if (!this.formPanel) {
            this.formPanel = this.findParentByType('form');
        }
        return this.formPanel;
    }
});

var myForm = new Ext.formPanel({
    title: 'User Details',
    items: [{
        ...
    }],
    listeners: {
        change: function() {
            // Title goes red if form has been modified.
            myForm.header.setStyle('color', 'red');
        }
    }
});
</code></pre>
         * @param {String/Array} events The event name to bubble, or an Array of event names.
         */
        enableBubble : function(events){
            var me = this;
            if(!Ext.isEmpty(events)){
                events = Ext.isArray(events) ? events : Array.prototype.slice.call(arguments, 0);
                for(var i = 0, len = events.length; i < len; i++){
                    var ename = events[i];
                    ename = ename.toLowerCase();
                    var ce = me.events[ename] || true;
                    if (typeof ce == 'boolean') {
                        ce = new Ext.util.Event(me, ename);
                        me.events[ename] = ce;
                    }
                    ce.bubble = true;
                }
            }
        }
    };
}());


/**
 * Starts capture on the specified Observable. All events will be passed
 * to the supplied function with the event name + standard signature of the event
 * <b>before</b> the event is fired. If the supplied function returns false,
 * the event will not fire.
 * @param {Observable} o The Observable to capture events from.
 * @param {Function} fn The function to call when an event is fired.
 * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the Observable firing the event.
 * @static
 */
Ext.util.Observable.capture = function(o, fn, scope){
    o.fireEvent = o.fireEvent.createInterceptor(fn, scope);
};


/**
 * Sets observability on the passed class constructor.<p>
 * <p>This makes any event fired on any instance of the passed class also fire a single event through
 * the <i>class</i> allowing for central handling of events on many instances at once.</p>
 * <p>Usage:</p><pre><code>
Ext.util.Observable.observeClass(Ext.data.Connection);
Ext.data.Connection.on('beforerequest', function(con, options) {
    console.log('Ajax request made to ' + options.url);
});</code></pre>
 * @param {Function} c The class constructor to make observable.
 * @param {Object} listeners An object containing a series of listeners to add. See {@link #addListener}.
 * @static
 */
Ext.util.Observable.observeClass = function(c, listeners){
    if(c){
      if(!c.fireEvent){
          Ext.apply(c, new Ext.util.Observable());
          Ext.util.Observable.capture(c.prototype, c.fireEvent, c);
      }
      if(typeof listeners == 'object'){
          c.on(listeners);
      }
      return c;
   }
};
/**
 * @class Ext.EventManager
 * Registers event handlers that want to receive a normalized EventObject instead of the standard browser event and provides
 * several useful events directly.
 * See {@link Ext.EventObject} for more details on normalized event objects.
 * @singleton
 */

Ext.EventManager = function(){
    var docReadyEvent,
        docReadyProcId,
        docReadyState = false,
        DETECT_NATIVE = Ext.isGecko || Ext.isWebKit || Ext.isSafari,
        E = Ext.lib.Event,
        D = Ext.lib.Dom,
        DOC = document,
        WINDOW = window,
        DOMCONTENTLOADED = "DOMContentLoaded",
        COMPLETE = 'complete',
        propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,
        /*
         * This cache is used to hold special js objects, the document and window, that don't have an id. We need to keep
         * a reference to them so we can look them up at a later point.
         */
        specialElCache = [];

     function getId(el){
        var id = false,
            i = 0,
            len = specialElCache.length,
            id = false,
            skip = false,
            o;
        if(el){
            if(el.getElementById || el.navigator){
                // look up the id
                for(; i < len; ++i){
                    o = specialElCache[i];
                    if(o.el === el){
                        id = o.id;
                        break;
                    }
                }
                if(!id){
                    // for browsers that support it, ensure that give the el the same id
                    id = Ext.id(el);
                    specialElCache.push({
                        id: id,
                        el: el
                    });
                    skip = true;
                }
            }else{
                id = Ext.id(el);
            }
            if(!Ext.elCache[id]){
                Ext.Element.addToCache(new Ext.Element(el), id);
                if(skip){
                    Ext.elCache[id].skipGC = true;
                }
            }
        }
        return id;
     };

    /// There is some jquery work around stuff here that isn't needed in Ext Core.
    function addListener(el, ename, fn, task, wrap, scope){
        el = Ext.getDom(el);
        var id = getId(el),
            es = Ext.elCache[id].events,
            wfn;

        wfn = E.on(el, ename, wrap);
        es[ename] = es[ename] || [];

        /* 0 = Original Function,
           1 = Event Manager Wrapped Function,
           2 = Scope,
           3 = Adapter Wrapped Function,
           4 = Buffered Task
        */
        es[ename].push([fn, wrap, scope, wfn, task]);

        // this is a workaround for jQuery and should somehow be removed from Ext Core in the future
        // without breaking ExtJS.

        // workaround for jQuery
        if(el.addEventListener && ename == "mousewheel"){
            var args = ["DOMMouseScroll", wrap, false];
            el.addEventListener.apply(el, args);
            Ext.EventManager.addListener(WINDOW, 'unload', function(){
                el.removeEventListener.apply(el, args);
            });
        }

        // fix stopped mousedowns on the document
        if(el == DOC && ename == "mousedown"){
            Ext.EventManager.stoppedMouseDownEvent.addListener(wrap);
        }
    };

    function doScrollChk(){
        /* Notes:
             'doScroll' will NOT work in a IFRAME/FRAMESET.
             The method succeeds but, a DOM query done immediately after -- FAILS.
          */
        if(window != top){
            return false;
        }

        try{
            DOC.documentElement.doScroll('left');
        }catch(e){
             return false;
        }

        fireDocReady();
        return true;
    }
    /**
     * @return {Boolean} True if the document is in a 'complete' state (or was determined to
     * be true by other means). If false, the state is evaluated again until canceled.
     */
    function checkReadyState(e){

        if(Ext.isIE && doScrollChk()){
            return true;
        }
        if(DOC.readyState == COMPLETE){
            fireDocReady();
            return true;
        }
        docReadyState || (docReadyProcId = setTimeout(arguments.callee, 2));
        return false;
    }

    var styles;
    function checkStyleSheets(e){
        styles || (styles = Ext.query('style, link[rel=stylesheet]'));
        if(styles.length == DOC.styleSheets.length){
            fireDocReady();
            return true;
        }
        docReadyState || (docReadyProcId = setTimeout(arguments.callee, 2));
        return false;
    }

    function OperaDOMContentLoaded(e){
        DOC.removeEventListener(DOMCONTENTLOADED, arguments.callee, false);
        checkStyleSheets();
    }

    function fireDocReady(e){
        if(!docReadyState){
            docReadyState = true; //only attempt listener removal once

            if(docReadyProcId){
                clearTimeout(docReadyProcId);
            }
            if(DETECT_NATIVE) {
                DOC.removeEventListener(DOMCONTENTLOADED, fireDocReady, false);
            }
            if(Ext.isIE && checkReadyState.bindIE){  //was this was actually set ??
                DOC.detachEvent('onreadystatechange', checkReadyState);
            }
            E.un(WINDOW, "load", arguments.callee);
        }
        if(docReadyEvent && !Ext.isReady){
            Ext.isReady = true;
            docReadyEvent.fire();
            docReadyEvent.listeners = [];
        }

    };

    function initDocReady(){
        docReadyEvent || (docReadyEvent = new Ext.util.Event());
        if (DETECT_NATIVE) {
            DOC.addEventListener(DOMCONTENTLOADED, fireDocReady, false);
        }
        /*
         * Handle additional (exceptional) detection strategies here
         */
        if (Ext.isIE){
            //Use readystatechange as a backup AND primary detection mechanism for a FRAME/IFRAME
            //See if page is already loaded
            if(!checkReadyState()){
                checkReadyState.bindIE = true;
                DOC.attachEvent('onreadystatechange', checkReadyState);
            }

        }else if(Ext.isOpera ){
            /* Notes:
               Opera needs special treatment needed here because CSS rules are NOT QUITE
               available after DOMContentLoaded is raised.
            */

            //See if page is already loaded and all styleSheets are in place
            (DOC.readyState == COMPLETE && checkStyleSheets()) ||
                DOC.addEventListener(DOMCONTENTLOADED, OperaDOMContentLoaded, false);

        }else if (Ext.isWebKit){
            //Fallback for older Webkits without DOMCONTENTLOADED support
            checkReadyState();
        }
        // no matter what, make sure it fires on load
        E.on(WINDOW, "load", fireDocReady);
    };

    function createTargeted(h, o){
        return function(){
            var args = Ext.toArray(arguments);
            if(o.target == Ext.EventObject.setEvent(args[0]).target){
                h.apply(this, args);
            }
        };
    };

    function createBuffered(h, o, task){
        return function(e){
            // create new event object impl so new events don't wipe out properties
            task.delay(o.buffer, h, null, [new Ext.EventObjectImpl(e)]);
        };
    };

    function createSingle(h, el, ename, fn, scope){
        return function(e){
            Ext.EventManager.removeListener(el, ename, fn, scope);
            h(e);
        };
    };

    function createDelayed(h, o, fn){
        return function(e){
            var task = new Ext.util.DelayedTask(h);
            if(!fn.tasks) {
                fn.tasks = [];
            }
            fn.tasks.push(task);
            task.delay(o.delay || 10, h, null, [new Ext.EventObjectImpl(e)]);
        };
    };

    function listen(element, ename, opt, fn, scope){
        var o = (!opt || typeof opt == "boolean") ? {} : opt,
            el = Ext.getDom(element), task;

        fn = fn || o.fn;
        scope = scope || o.scope;

        if(!el){
            throw "Error listening for \"" + ename + '\". Element "' + element + '" doesn\'t exist.';
        }
        function h(e){
            // prevent errors while unload occurring
            if(!Ext){// !window[xname]){  ==> can't we do this?
                return;
            }
            e = Ext.EventObject.setEvent(e);
            var t;
            if (o.delegate) {
                if(!(t = e.getTarget(o.delegate, el))){
                    return;
                }
            } else {
                t = e.target;
            }
            if (o.stopEvent) {
                e.stopEvent();
            }
            if (o.preventDefault) {
               e.preventDefault();
            }
            if (o.stopPropagation) {
                e.stopPropagation();
            }
            if (o.normalized) {
                e = e.browserEvent;
            }

            fn.call(scope || el, e, t, o);
        };
        if(o.target){
            h = createTargeted(h, o);
        }
        if(o.delay){
            h = createDelayed(h, o, fn);
        }
        if(o.single){
            h = createSingle(h, el, ename, fn, scope);
        }
        if(o.buffer){
            task = new Ext.util.DelayedTask(h);
            h = createBuffered(h, o, task);
        }

        addListener(el, ename, fn, task, h, scope);
        return h;
    };

    var pub = {
        /**
         * Appends an event handler to an element.  The shorthand version {@link #on} is equivalent.  Typically you will
         * use {@link Ext.Element#addListener} directly on an Element in favor of calling this version.
         * @param {String/HTMLElement} el The html element or id to assign the event handler to.
         * @param {String} eventName The name of the event to listen for.
         * @param {Function} handler The handler function the event invokes. This function is passed
         * the following parameters:<ul>
         * <li>evt : EventObject<div class="sub-desc">The {@link Ext.EventObject EventObject} describing the event.</div></li>
         * <li>t : Element<div class="sub-desc">The {@link Ext.Element Element} which was the target of the event.
         * Note that this may be filtered by using the <tt>delegate</tt> option.</div></li>
         * <li>o : Object<div class="sub-desc">The options object from the addListener call.</div></li>
         * </ul>
         * @param {Object} scope (optional) The scope (<b><code>this</code></b> reference) in which the handler function is executed. <b>Defaults to the Element</b>.
         * @param {Object} options (optional) An object containing handler configuration properties.
         * This may contain any of the following properties:<ul>
         * <li>scope : Object<div class="sub-desc">The scope (<b><code>this</code></b> reference) in which the handler function is executed. <b>Defaults to the Element</b>.</div></li>
         * <li>delegate : String<div class="sub-desc">A simple selector to filter the target or look for a descendant of the target</div></li>
         * <li>stopEvent : Boolean<div class="sub-desc">True to stop the event. That is stop propagation, and prevent the default action.</div></li>
         * <li>preventDefault : Boolean<div class="sub-desc">True to prevent the default action</div></li>
         * <li>stopPropagation : Boolean<div class="sub-desc">True to prevent event propagation</div></li>
         * <li>normalized : Boolean<div class="sub-desc">False to pass a browser event to the handler function instead of an Ext.EventObject</div></li>
         * <li>delay : Number<div class="sub-desc">The number of milliseconds to delay the invocation of the handler after te event fires.</div></li>
         * <li>single : Boolean<div class="sub-desc">True to add a handler to handle just the next firing of the event, and then remove itself.</div></li>
         * <li>buffer : Number<div class="sub-desc">Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
         * by the specified number of milliseconds. If the event fires again within that time, the original
         * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</div></li>
         * <li>target : Element<div class="sub-desc">Only call the handler if the event was fired on the target Element, <i>not</i> if the event was bubbled up from a child node.</div></li>
         * </ul><br>
         * <p>See {@link Ext.Element#addListener} for examples of how to use these options.</p>
         */
        addListener : function(element, eventName, fn, scope, options){
            if(typeof eventName == 'object'){
                var o = eventName, e, val;
                for(e in o){
                    val = o[e];
                    if(!propRe.test(e)){
                        if(Ext.isFunction(val)){
                            // shared options
                            listen(element, e, o, val, o.scope);
                        }else{
                            // individual options
                            listen(element, e, val);
                        }
                    }
                }
            } else {
                listen(element, eventName, options, fn, scope);
            }
        },

        /**
         * Removes an event handler from an element.  The shorthand version {@link #un} is equivalent.  Typically
         * you will use {@link Ext.Element#removeListener} directly on an Element in favor of calling this version.
         * @param {String/HTMLElement} el The id or html element from which to remove the listener.
         * @param {String} eventName The name of the event.
         * @param {Function} fn The handler function to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
         * @param {Object} scope If a scope (<b><code>this</code></b> reference) was specified when the listener was added,
         * then this must refer to the same object.
         */
        removeListener : function(el, eventName, fn, scope){
            el = Ext.getDom(el);
            var id = getId(el),
                f = el && (Ext.elCache[id].events)[eventName] || [],
                wrap, i, l, k, len, fnc;

            for (i = 0, len = f.length; i < len; i++) {

                /* 0 = Original Function,
                   1 = Event Manager Wrapped Function,
                   2 = Scope,
                   3 = Adapter Wrapped Function,
                   4 = Buffered Task
                */
                if (Ext.isArray(fnc = f[i]) && fnc[0] == fn && (!scope || fnc[2] == scope)) {
                    if(fnc[4]) {
                        fnc[4].cancel();
                    }
                    k = fn.tasks && fn.tasks.length;
                    if(k) {
                        while(k--) {
                            fn.tasks[k].cancel();
                        }
                        delete fn.tasks;
                    }
                    wrap = fnc[1];
                    E.un(el, eventName, E.extAdapter ? fnc[3] : wrap);

                    // jQuery workaround that should be removed from Ext Core
                    if(wrap && el.addEventListener && eventName == "mousewheel"){
                        el.removeEventListener("DOMMouseScroll", wrap, false);
                    }

                    // fix stopped mousedowns on the document
                    if(wrap && el == DOC && eventName == "mousedown"){
                        Ext.EventManager.stoppedMouseDownEvent.removeListener(wrap);
                    }

                    f.splice(i, 1);
                    if (f.length === 0) {
                        delete Ext.elCache[id].events[eventName];
                    }
                    for (k in Ext.elCache[id].events) {
                        return false;
                    }
                    Ext.elCache[id].events = {};
                    return false;
                }
            }
        },

        /**
         * Removes all event handers from an element.  Typically you will use {@link Ext.Element#removeAllListeners}
         * directly on an Element in favor of calling this version.
         * @param {String/HTMLElement} el The id or html element from which to remove all event handlers.
         */
        removeAll : function(el){
            el = Ext.getDom(el);
            var id = getId(el),
                ec = Ext.elCache[id] || {},
                es = ec.events || {},
                f, i, len, ename, fn, k, wrap;

            for(ename in es){
                if(es.hasOwnProperty(ename)){
                    f = es[ename];
                    /* 0 = Original Function,
                       1 = Event Manager Wrapped Function,
                       2 = Scope,
                       3 = Adapter Wrapped Function,
                       4 = Buffered Task
                    */
                    for (i = 0, len = f.length; i < len; i++) {
                        fn = f[i];
                        if(fn[4]) {
                            fn[4].cancel();
                        }
                        if(fn[0].tasks && (k = fn[0].tasks.length)) {
                            while(k--) {
                                fn[0].tasks[k].cancel();
                            }
                            delete fn.tasks;
                        }
                        wrap =  fn[1];
                        E.un(el, ename, E.extAdapter ? fn[3] : wrap);

                        // jQuery workaround that should be removed from Ext Core
                        if(el.addEventListener && wrap && ename == "mousewheel"){
                            el.removeEventListener("DOMMouseScroll", wrap, false);
                        }

                        // fix stopped mousedowns on the document
                        if(wrap && el == DOC &&  ename == "mousedown"){
                            Ext.EventManager.stoppedMouseDownEvent.removeListener(wrap);
                        }
                    }
                }
            }
            if (Ext.elCache[id]) {
                Ext.elCache[id].events = {};
            }
        },

        getListeners : function(el, eventName) {
            el = Ext.getDom(el);
            var id = getId(el),
                ec = Ext.elCache[id] || {},
                es = ec.events || {},
                results = [];
            if (es && es[eventName]) {
                return es[eventName];
            } else {
                return null;
            }
        },

        purgeElement : function(el, recurse, eventName) {
            el = Ext.getDom(el);
            var id = getId(el),
                ec = Ext.elCache[id] || {},
                es = ec.events || {},
                i, f, len;
            if (eventName) {
                if (es && es.hasOwnProperty(eventName)) {
                    f = es[eventName];
                    for (i = 0, len = f.length; i < len; i++) {
                        Ext.EventManager.removeListener(el, eventName, f[i][0]);
                    }
                }
            } else {
                Ext.EventManager.removeAll(el);
            }
            if (recurse && el && el.childNodes) {
                for (i = 0, len = el.childNodes.length; i < len; i++) {
                    Ext.EventManager.purgeElement(el.childNodes[i], recurse, eventName);
                }
            }
        },

        _unload : function() {
            var el;
            for (el in Ext.elCache) {
                Ext.EventManager.removeAll(el);
            }
            delete Ext.elCache;
            delete Ext.Element._flyweights;

            // Abort any outstanding Ajax requests
            var c,
                conn,
                tid,
                ajax = Ext.lib.Ajax;
            (typeof ajax.conn == 'object') ? conn = ajax.conn : conn = {};
            for (tid in conn) {
                c = conn[tid];
                if (c) {
                    ajax.abort({conn: c, tId: tid});
                }
            }
        },
        /**
         * Adds a listener to be notified when the document is ready (before onload and before images are loaded). Can be
         * accessed shorthanded as Ext.onReady().
         * @param {Function} fn The method the event invokes.
         * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
         * @param {boolean} options (optional) Options object as passed to {@link Ext.Element#addListener}. It is recommended that the options
         * <code>{single: true}</code> be used so that the handler is removed on first invocation.
         */
        onDocumentReady : function(fn, scope, options){
            if(Ext.isReady){ // if it already fired or document.body is present
                docReadyEvent || (docReadyEvent = new Ext.util.Event());
                docReadyEvent.addListener(fn, scope, options);
                docReadyEvent.fire();
                docReadyEvent.listeners = [];
            }else{
                if(!docReadyEvent){
                    initDocReady();
                }
                options = options || {};
                options.delay = options.delay || 1;
                docReadyEvent.addListener(fn, scope, options);
            }
        },

        /**
         * Forces a document ready state transition for the framework.  Used when Ext is loaded
         * into a DOM structure AFTER initial page load (Google API or other dynamic load scenario.
         * Any pending 'onDocumentReady' handlers will be fired (if not already handled).
         */
        fireDocReady  : fireDocReady
    };
     /**
     * Appends an event handler to an element.  Shorthand for {@link #addListener}.
     * @param {String/HTMLElement} el The html element or id to assign the event handler to
     * @param {String} eventName The name of the event to listen for.
     * @param {Function} handler The handler function the event invokes.
     * @param {Object} scope (optional) (<code>this</code> reference) in which the handler function executes. <b>Defaults to the Element</b>.
     * @param {Object} options (optional) An object containing standard {@link #addListener} options
     * @member Ext.EventManager
     * @method on
     */
    pub.on = pub.addListener;
    /**
     * Removes an event handler from an element.  Shorthand for {@link #removeListener}.
     * @param {String/HTMLElement} el The id or html element from which to remove the listener.
     * @param {String} eventName The name of the event.
     * @param {Function} fn The handler function to remove. <b>This must be a reference to the function passed into the {@link #on} call.</b>
     * @param {Object} scope If a scope (<b><code>this</code></b> reference) was specified when the listener was added,
     * then this must refer to the same object.
     * @member Ext.EventManager
     * @method un
     */
    pub.un = pub.removeListener;

    pub.stoppedMouseDownEvent = new Ext.util.Event();
    return pub;
}();
/**
  * Adds a listener to be notified when the document is ready (before onload and before images are loaded). Shorthand of {@link Ext.EventManager#onDocumentReady}.
  * @param {Function} fn The method the event invokes.
  * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
  * @param {boolean} options (optional) Options object as passed to {@link Ext.Element#addListener}. It is recommended that the options
  * <code>{single: true}</code> be used so that the handler is removed on first invocation.
  * @member Ext
  * @method onReady
 */
Ext.onReady = Ext.EventManager.onDocumentReady;


//Initialize doc classes
(function(){

    var initExtCss = function(){
        // find the body element
        var bd = document.body || document.getElementsByTagName('body')[0];
        if(!bd){ return false; }
        var cls = [' ',
                Ext.isIE ? "ext-ie " + (Ext.isIE6 ? 'ext-ie6' : (Ext.isIE7 ? 'ext-ie7' : 'ext-ie8'))
                : Ext.isGecko ? "ext-gecko " + (Ext.isGecko2 ? 'ext-gecko2' : 'ext-gecko3')
                : Ext.isOpera ? "ext-opera"
                : Ext.isWebKit ? "ext-webkit" : ""];

        if(Ext.isSafari){
            cls.push("ext-safari " + (Ext.isSafari2 ? 'ext-safari2' : (Ext.isSafari3 ? 'ext-safari3' : 'ext-safari4')));
        }else if(Ext.isChrome){
            cls.push("ext-chrome");
        }

        if(Ext.isMac){
            cls.push("ext-mac");
        }
        if(Ext.isLinux){
            cls.push("ext-linux");
        }

        if(Ext.isStrict || Ext.isBorderBox){ // add to the parent to allow for selectors like ".ext-strict .ext-ie"
            var p = bd.parentNode;
            if(p){
                p.className += Ext.isStrict ? ' ext-strict' : ' ext-border-box';
            }
        }
        bd.className += cls.join(' ');
        return true;
    }

    if(!initExtCss()){
        Ext.onReady(initExtCss);
    }
})();


/**
 * @class Ext.EventObject
 * Just as {@link Ext.Element} wraps around a native DOM node, Ext.EventObject
 * wraps the browser's native event-object normalizing cross-browser differences,
 * such as which mouse button is clicked, keys pressed, mechanisms to stop
 * event-propagation along with a method to prevent default actions from taking place.
 * <p>For example:</p>
 * <pre><code>
function handleClick(e, t){ // e is not a standard event object, it is a Ext.EventObject
    e.preventDefault();
    var target = e.getTarget(); // same as t (the target HTMLElement)
    ...
}
var myDiv = {@link Ext#get Ext.get}("myDiv");  // get reference to an {@link Ext.Element}
myDiv.on(         // 'on' is shorthand for addListener
    "click",      // perform an action on click of myDiv
    handleClick   // reference to the action handler
);
// other methods to do the same:
Ext.EventManager.on("myDiv", 'click', handleClick);
Ext.EventManager.addListener("myDiv", 'click', handleClick);
 </code></pre>
 * @singleton
 */
Ext.EventObject = function(){
    var E = Ext.lib.Event,
        // safari keypress events for special keys return bad keycodes
        safariKeys = {
            3 : 13, // enter
            63234 : 37, // left
            63235 : 39, // right
            63232 : 38, // up
            63233 : 40, // down
            63276 : 33, // page up
            63277 : 34, // page down
            63272 : 46, // delete
            63273 : 36, // home
            63275 : 35  // end
        },
        // normalize button clicks
        btnMap = Ext.isIE ? {1:0,4:1,2:2} :
                (Ext.isWebKit ? {1:0,2:1,3:2} : {0:0,1:1,2:2});

    Ext.EventObjectImpl = function(e){
        if(e){
            this.setEvent(e.browserEvent || e);
        }
    };

    Ext.EventObjectImpl.prototype = {
           /** @private */
        setEvent : function(e){
            var me = this;
            if(e == me || (e && e.browserEvent)){ // already wrapped
                return e;
            }
            me.browserEvent = e;
            if(e){
                // normalize buttons
                me.button = e.button ? btnMap[e.button] : (e.which ? e.which - 1 : -1);
                if(e.type == 'click' && me.button == -1){
                    me.button = 0;
                }
                me.type = e.type;
                me.shiftKey = e.shiftKey;
                // mac metaKey behaves like ctrlKey
                me.ctrlKey = e.ctrlKey || e.metaKey || false;
                me.altKey = e.altKey;
                // in getKey these will be normalized for the mac
                me.keyCode = e.keyCode;
                me.charCode = e.charCode;
                // cache the target for the delayed and or buffered events
                me.target = E.getTarget(e);
                // same for XY
                me.xy = E.getXY(e);
            }else{
                me.button = -1;
                me.shiftKey = false;
                me.ctrlKey = false;
                me.altKey = false;
                me.keyCode = 0;
                me.charCode = 0;
                me.target = null;
                me.xy = [0, 0];
            }
            return me;
        },

        /**
         * Stop the event (preventDefault and stopPropagation)
         */
        stopEvent : function(){
            var me = this;
            if(me.browserEvent){
                if(me.browserEvent.type == 'mousedown'){
                    Ext.EventManager.stoppedMouseDownEvent.fire(me);
                }
                E.stopEvent(me.browserEvent);
            }
        },

        /**
         * Prevents the browsers default handling of the event.
         */
        preventDefault : function(){
            if(this.browserEvent){
                E.preventDefault(this.browserEvent);
            }
        },

        /**
         * Cancels bubbling of the event.
         */
        stopPropagation : function(){
            var me = this;
            if(me.browserEvent){
                if(me.browserEvent.type == 'mousedown'){
                    Ext.EventManager.stoppedMouseDownEvent.fire(me);
                }
                E.stopPropagation(me.browserEvent);
            }
        },

        /**
         * Gets the character code for the event.
         * @return {Number}
         */
        getCharCode : function(){
            return this.charCode || this.keyCode;
        },

        /**
         * Returns a normalized keyCode for the event.
         * @return {Number} The key code
         */
        getKey : function(){
            return this.normalizeKey(this.keyCode || this.charCode)
        },

        // private
        normalizeKey: function(k){
            return Ext.isSafari ? (safariKeys[k] || k) : k;
        },

        /**
         * Gets the x coordinate of the event.
         * @return {Number}
         */
        getPageX : function(){
            return this.xy[0];
        },

        /**
         * Gets the y coordinate of the event.
         * @return {Number}
         */
        getPageY : function(){
            return this.xy[1];
        },

        /**
         * Gets the page coordinates of the event.
         * @return {Array} The xy values like [x, y]
         */
        getXY : function(){
            return this.xy;
        },

        /**
         * Gets the target for the event.
         * @param {String} selector (optional) A simple selector to filter the target or look for an ancestor of the target
         * @param {Number/Mixed} maxDepth (optional) The max depth to
                search as a number or element (defaults to 10 || document.body)
         * @param {Boolean} returnEl (optional) True to return a Ext.Element object instead of DOM node
         * @return {HTMLelement}
         */
        getTarget : function(selector, maxDepth, returnEl){
            return selector ? Ext.fly(this.target).findParent(selector, maxDepth, returnEl) : (returnEl ? Ext.get(this.target) : this.target);
        },

        /**
         * Gets the related target.
         * @return {HTMLElement}
         */
        getRelatedTarget : function(){
            return this.browserEvent ? E.getRelatedTarget(this.browserEvent) : null;
        },

        /**
         * Normalizes mouse wheel delta across browsers
         * @return {Number} The delta
         */
        getWheelDelta : function(){
            var e = this.browserEvent;
            var delta = 0;
            if(e.wheelDelta){ /* IE/Opera. */
                delta = e.wheelDelta/120;
            }else if(e.detail){ /* Mozilla case. */
                delta = -e.detail/3;
            }
            return delta;
        },

        /**
        * Returns true if the target of this event is a child of el.  Unless the allowEl parameter is set, it will return false if if the target is el.
        * Example usage:<pre><code>
        // Handle click on any child of an element
        Ext.getBody().on('click', function(e){
            if(e.within('some-el')){
                alert('Clicked on a child of some-el!');
            }
        });

        // Handle click directly on an element, ignoring clicks on child nodes
        Ext.getBody().on('click', function(e,t){
            if((t.id == 'some-el') && !e.within(t, true)){
                alert('Clicked directly on some-el!');
            }
        });
        </code></pre>
         * @param {Mixed} el The id, DOM element or Ext.Element to check
         * @param {Boolean} related (optional) true to test if the related target is within el instead of the target
         * @param {Boolean} allowEl {optional} true to also check if the passed element is the target or related target
         * @return {Boolean}
         */
        within : function(el, related, allowEl){
            if(el){
                var t = this[related ? "getRelatedTarget" : "getTarget"]();
                return t && ((allowEl ? (t == Ext.getDom(el)) : false) || Ext.fly(el).contains(t));
            }
            return false;
        }
     };

    return new Ext.EventObjectImpl();
}();
/**
* @class Ext.EventManager
*/
Ext.apply(Ext.EventManager, function(){
   var resizeEvent,
       resizeTask,
       textEvent,
       textSize,
       D = Ext.lib.Dom,
       propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,
       curWidth = 0,
       curHeight = 0,
       // note 1: IE fires ONLY the keydown event on specialkey autorepeat
       // note 2: Safari < 3.1, Gecko (Mac/Linux) & Opera fire only the keypress event on specialkey autorepeat
       // (research done by @Jan Wolter at http://unixpapa.com/js/key.html)
       useKeydown = Ext.isWebKit ?
                   Ext.num(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1]) >= 525 :
                   !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera);

   return {
       // private
       doResizeEvent: function(){
           var h = D.getViewHeight(),
               w = D.getViewWidth();

            //whacky problem in IE where the resize event will fire even though the w/h are the same.
            if(curHeight != h || curWidth != w){
               resizeEvent.fire(curWidth = w, curHeight = h);
            }
       },

       /**
        * Adds a listener to be notified when the browser window is resized and provides resize event buffering (100 milliseconds),
        * passes new viewport width and height to handlers.
        * @param {Function} fn      The handler function the window resize event invokes.
        * @param {Object}   scope   The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
        * @param {boolean}  options Options object as passed to {@link Ext.Element#addListener}
        */
       onWindowResize : function(fn, scope, options){
           if(!resizeEvent){
               resizeEvent = new Ext.util.Event();
               resizeTask = new Ext.util.DelayedTask(this.doResizeEvent);
               Ext.EventManager.on(window, "resize", this.fireWindowResize, this);
           }
           resizeEvent.addListener(fn, scope, options);
       },

       // exposed only to allow manual firing
       fireWindowResize : function(){
           if(resizeEvent){
               resizeTask.delay(100);
           }
       },

       /**
        * Adds a listener to be notified when the user changes the active text size. Handler gets called with 2 params, the old size and the new size.
        * @param {Function} fn      The function the event invokes.
        * @param {Object}   scope   The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
        * @param {boolean}  options Options object as passed to {@link Ext.Element#addListener}
        */
       onTextResize : function(fn, scope, options){
           if(!textEvent){
               textEvent = new Ext.util.Event();
               var textEl = new Ext.Element(document.createElement('div'));
               textEl.dom.className = 'x-text-resize';
               textEl.dom.innerHTML = 'X';
               textEl.appendTo(document.body);
               textSize = textEl.dom.offsetHeight;
               setInterval(function(){
                   if(textEl.dom.offsetHeight != textSize){
                       textEvent.fire(textSize, textSize = textEl.dom.offsetHeight);
                   }
               }, this.textResizeInterval);
           }
           textEvent.addListener(fn, scope, options);
       },

       /**
        * Removes the passed window resize listener.
        * @param {Function} fn        The method the event invokes
        * @param {Object}   scope    The scope of handler
        */
       removeResizeListener : function(fn, scope){
           if(resizeEvent){
               resizeEvent.removeListener(fn, scope);
           }
       },

       // private
       fireResize : function(){
           if(resizeEvent){
               resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
           }
       },

        /**
        * The frequency, in milliseconds, to check for text resize events (defaults to 50)
        */
       textResizeInterval : 50,

       /**
        * Url used for onDocumentReady with using SSL (defaults to Ext.SSL_SECURE_URL)
        */
       ieDeferSrc : false,

       // protected for use inside the framework
       // detects whether we should use keydown or keypress based on the browser.
       useKeydown: useKeydown
   };
}());

Ext.EventManager.on = Ext.EventManager.addListener;


Ext.apply(Ext.EventObjectImpl.prototype, {
   /** Key constant @type Number */
   BACKSPACE: 8,
   /** Key constant @type Number */
   TAB: 9,
   /** Key constant @type Number */
   NUM_CENTER: 12,
   /** Key constant @type Number */
   ENTER: 13,
   /** Key constant @type Number */
   RETURN: 13,
   /** Key constant @type Number */
   SHIFT: 16,
   /** Key constant @type Number */
   CTRL: 17,
   CONTROL : 17, // legacy
   /** Key constant @type Number */
   ALT: 18,
   /** Key constant @type Number */
   PAUSE: 19,
   /** Key constant @type Number */
   CAPS_LOCK: 20,
   /** Key constant @type Number */
   ESC: 27,
   /** Key constant @type Number */
   SPACE: 32,
   /** Key constant @type Number */
   PAGE_UP: 33,
   PAGEUP : 33, // legacy
   /** Key constant @type Number */
   PAGE_DOWN: 34,
   PAGEDOWN : 34, // legacy
   /** Key constant @type Number */
   END: 35,
   /** Key constant @type Number */
   HOME: 36,
   /** Key constant @type Number */
   LEFT: 37,
   /** Key constant @type Number */
   UP: 38,
   /** Key constant @type Number */
   RIGHT: 39,
   /** Key constant @type Number */
   DOWN: 40,
   /** Key constant @type Number */
   PRINT_SCREEN: 44,
   /** Key constant @type Number */
   INSERT: 45,
   /** Key constant @type Number */
   DELETE: 46,
   /** Key constant @type Number */
   ZERO: 48,
   /** Key constant @type Number */
   ONE: 49,
   /** Key constant @type Number */
   TWO: 50,
   /** Key constant @type Number */
   THREE: 51,
   /** Key constant @type Number */
   FOUR: 52,
   /** Key constant @type Number */
   FIVE: 53,
   /** Key constant @type Number */
   SIX: 54,
   /** Key constant @type Number */
   SEVEN: 55,
   /** Key constant @type Number */
   EIGHT: 56,
   /** Key constant @type Number */
   NINE: 57,
   /** Key constant @type Number */
   A: 65,
   /** Key constant @type Number */
   B: 66,
   /** Key constant @type Number */
   C: 67,
   /** Key constant @type Number */
   D: 68,
   /** Key constant @type Number */
   E: 69,
   /** Key constant @type Number */
   F: 70,
   /** Key constant @type Number */
   G: 71,
   /** Key constant @type Number */
   H: 72,
   /** Key constant @type Number */
   I: 73,
   /** Key constant @type Number */
   J: 74,
   /** Key constant @type Number */
   K: 75,
   /** Key constant @type Number */
   L: 76,
   /** Key constant @type Number */
   M: 77,
   /** Key constant @type Number */
   N: 78,
   /** Key constant @type Number */
   O: 79,
   /** Key constant @type Number */
   P: 80,
   /** Key constant @type Number */
   Q: 81,
   /** Key constant @type Number */
   R: 82,
   /** Key constant @type Number */
   S: 83,
   /** Key constant @type Number */
   T: 84,
   /** Key constant @type Number */
   U: 85,
   /** Key constant @type Number */
   V: 86,
   /** Key constant @type Number */
   W: 87,
   /** Key constant @type Number */
   X: 88,
   /** Key constant @type Number */
   Y: 89,
   /** Key constant @type Number */
   Z: 90,
   /** Key constant @type Number */
   CONTEXT_MENU: 93,
   /** Key constant @type Number */
   NUM_ZERO: 96,
   /** Key constant @type Number */
   NUM_ONE: 97,
   /** Key constant @type Number */
   NUM_TWO: 98,
   /** Key constant @type Number */
   NUM_THREE: 99,
   /** Key constant @type Number */
   NUM_FOUR: 100,
   /** Key constant @type Number */
   NUM_FIVE: 101,
   /** Key constant @type Number */
   NUM_SIX: 102,
   /** Key constant @type Number */
   NUM_SEVEN: 103,
   /** Key constant @type Number */
   NUM_EIGHT: 104,
   /** Key constant @type Number */
   NUM_NINE: 105,
   /** Key constant @type Number */
   NUM_MULTIPLY: 106,
   /** Key constant @type Number */
   NUM_PLUS: 107,
   /** Key constant @type Number */
   NUM_MINUS: 109,
   /** Key constant @type Number */
   NUM_PERIOD: 110,
   /** Key constant @type Number */
   NUM_DIVISION: 111,
   /** Key constant @type Number */
   F1: 112,
   /** Key constant @type Number */
   F2: 113,
   /** Key constant @type Number */
   F3: 114,
   /** Key constant @type Number */
   F4: 115,
   /** Key constant @type Number */
   F5: 116,
   /** Key constant @type Number */
   F6: 117,
   /** Key constant @type Number */
   F7: 118,
   /** Key constant @type Number */
   F8: 119,
   /** Key constant @type Number */
   F9: 120,
   /** Key constant @type Number */
   F10: 121,
   /** Key constant @type Number */
   F11: 122,
   /** Key constant @type Number */
   F12: 123,

   /** @private */
   isNavKeyPress : function(){
       var me = this,
           k = this.normalizeKey(me.keyCode);
       return (k >= 33 && k <= 40) ||  // Page Up/Down, End, Home, Left, Up, Right, Down
       k == me.RETURN ||
       k == me.TAB ||
       k == me.ESC;
   },

   isSpecialKey : function(){
       var k = this.normalizeKey(this.keyCode);
       return (this.type == 'keypress' && this.ctrlKey) ||
       this.isNavKeyPress() ||
       (k == this.BACKSPACE) || // Backspace
       (k >= 16 && k <= 20) || // Shift, Ctrl, Alt, Pause, Caps Lock
       (k >= 44 && k <= 46);   // Print Screen, Insert, Delete
   },

   getPoint : function(){
       return new Ext.lib.Point(this.xy[0], this.xy[1]);
   },

   /**
    * Returns true if the control, meta, shift or alt key was pressed during this event.
    * @return {Boolean}
    */
   hasModifier : function(){
       return ((this.ctrlKey || this.altKey) || this.shiftKey);
   }
});/**
 * @class Ext.Element
 * <p>Encapsulates a DOM element, adding simple DOM manipulation facilities, normalizing for browser differences.</p>
 * <p>All instances of this class inherit the methods of {@link Ext.Fx} making visual effects easily available to all DOM elements.</p>
 * <p>Note that the events documented in this class are not Ext events, they encapsulate browser events. To
 * access the underlying browser event, see {@link Ext.EventObject#browserEvent}. Some older
 * browsers may not support the full range of events. Which events are supported is beyond the control of ExtJs.</p>
 * Usage:<br>
<pre><code>
// by id
var el = Ext.get("my-div");

// by DOM element reference
var el = Ext.get(myDivElement);
</code></pre>
 * <b>Animations</b><br />
 * <p>When an element is manipulated, by default there is no animation.</p>
 * <pre><code>
var el = Ext.get("my-div");

// no animation
el.setWidth(100);
 * </code></pre>
 * <p>Many of the functions for manipulating an element have an optional "animate" parameter.  This
 * parameter can be specified as boolean (<tt>true</tt>) for default animation effects.</p>
 * <pre><code>
// default animation
el.setWidth(100, true);
 * </code></pre>
 *
 * <p>To configure the effects, an object literal with animation options to use as the Element animation
 * configuration object can also be specified. Note that the supported Element animation configuration
 * options are a subset of the {@link Ext.Fx} animation options specific to Fx effects.  The supported
 * Element animation configuration options are:</p>
<pre>
Option    Default   Description
--------- --------  ---------------------------------------------
{@link Ext.Fx#duration duration}  .35       The duration of the animation in seconds
{@link Ext.Fx#easing easing}    easeOut   The easing method
{@link Ext.Fx#callback callback}  none      A function to execute when the anim completes
{@link Ext.Fx#scope scope}     this      The scope (this) of the callback function
</pre>
 *
 * <pre><code>
// Element animation options object
var opt = {
    {@link Ext.Fx#duration duration}: 1,
    {@link Ext.Fx#easing easing}: 'elasticIn',
    {@link Ext.Fx#callback callback}: this.foo,
    {@link Ext.Fx#scope scope}: this
};
// animation with some options set
el.setWidth(100, opt);
 * </code></pre>
 * <p>The Element animation object being used for the animation will be set on the options
 * object as "anim", which allows you to stop or manipulate the animation. Here is an example:</p>
 * <pre><code>
// using the "anim" property to get the Anim object
if(opt.anim.isAnimated()){
    opt.anim.stop();
}
 * </code></pre>
 * <p>Also see the <tt>{@link #animate}</tt> method for another animation technique.</p>
 * <p><b> Composite (Collections of) Elements</b></p>
 * <p>For working with collections of Elements, see {@link Ext.CompositeElement}</p>
 * @constructor Create a new Element directly.
 * @param {String/HTMLElement} element
 * @param {Boolean} forceNew (optional) By default the constructor checks to see if there is already an instance of this element in the cache and if there is it returns the same instance. This will skip that check (useful for extending this class).
 */
(function(){
var DOC = document;

Ext.Element = function(element, forceNew){
    var dom = typeof element == "string" ?
              DOC.getElementById(element) : element,
        id;

    if(!dom) return null;

    id = dom.id;

    if(!forceNew && id && Ext.elCache[id]){ // element object already exists
        return Ext.elCache[id].el;
    }

    /**
     * The DOM element
     * @type HTMLElement
     */
    this.dom = dom;

    /**
     * The DOM element ID
     * @type String
     */
    this.id = id || Ext.id(dom);
};

var D = Ext.lib.Dom,
    DH = Ext.DomHelper,
    E = Ext.lib.Event,
    A = Ext.lib.Anim,
    El = Ext.Element,
    EC = Ext.elCache;

El.prototype = {
    /**
     * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function)
     * @param {Object} o The object with the attributes
     * @param {Boolean} useSet (optional) false to override the default setAttribute to use expandos.
     * @return {Ext.Element} this
     */
    set : function(o, useSet){
        var el = this.dom,
            attr,
            val,
            useSet = (useSet !== false) && !!el.setAttribute;

        for(attr in o){
            if (o.hasOwnProperty(attr)) {
                val = o[attr];
                if (attr == 'style') {
                    DH.applyStyles(el, val);
                } else if (attr == 'cls') {
                    el.className = val;
                } else if (useSet) {
                    el.setAttribute(attr, val);
                } else {
                    el[attr] = val;
                }
            }
        }
        return this;
    },

//  Mouse events
    /**
     * @event click
     * Fires when a mouse click is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event contextmenu
     * Fires when a right click is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event dblclick
     * Fires when a mouse double click is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event mousedown
     * Fires when a mousedown is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event mouseup
     * Fires when a mouseup is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event mouseover
     * Fires when a mouseover is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event mousemove
     * Fires when a mousemove is detected with the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event mouseout
     * Fires when a mouseout is detected with the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event mouseenter
     * Fires when the mouse enters the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event mouseleave
     * Fires when the mouse leaves the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */

//  Keyboard events
    /**
     * @event keypress
     * Fires when a keypress is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event keydown
     * Fires when a keydown is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event keyup
     * Fires when a keyup is detected within the element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */


//  HTML frame/object events
    /**
     * @event load
     * Fires when the user agent finishes loading all content within the element. Only supported by window, frames, objects and images.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event unload
     * Fires when the user agent removes all content from a window or frame. For elements, it fires when the target element or any of its content has been removed.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event abort
     * Fires when an object/image is stopped from loading before completely loaded.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event error
     * Fires when an object/image/frame cannot be loaded properly.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event resize
     * Fires when a document view is resized.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event scroll
     * Fires when a document view is scrolled.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */

//  Form events
    /**
     * @event select
     * Fires when a user selects some text in a text field, including input and textarea.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event change
     * Fires when a control loses the input focus and its value has been modified since gaining focus.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event submit
     * Fires when a form is submitted.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event reset
     * Fires when a form is reset.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event focus
     * Fires when an element receives focus either via the pointing device or by tab navigation.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event blur
     * Fires when an element loses focus either via the pointing device or by tabbing navigation.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */

//  User Interface events
    /**
     * @event DOMFocusIn
     * Where supported. Similar to HTML focus event, but can be applied to any focusable element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event DOMFocusOut
     * Where supported. Similar to HTML blur event, but can be applied to any focusable element.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event DOMActivate
     * Where supported. Fires when an element is activated, for instance, through a mouse click or a keypress.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */

//  DOM Mutation events
    /**
     * @event DOMSubtreeModified
     * Where supported. Fires when the subtree is modified.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event DOMNodeInserted
     * Where supported. Fires when a node has been added as a child of another node.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event DOMNodeRemoved
     * Where supported. Fires when a descendant node of the element is removed.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event DOMNodeRemovedFromDocument
     * Where supported. Fires when a node is being removed from a document.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event DOMNodeInsertedIntoDocument
     * Where supported. Fires when a node is being inserted into a document.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event DOMAttrModified
     * Where supported. Fires when an attribute has been modified.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */
    /**
     * @event DOMCharacterDataModified
     * Where supported. Fires when the character data has been modified.
     * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
     * @param {HtmlElement} t The target of the event.
     * @param {Object} o The options configuration passed to the {@link #addListener} call.
     */

    /**
     * The default unit to append to CSS values where a unit isn't provided (defaults to px).
     * @type String
     */
    defaultUnit : "px",

    /**
     * Returns true if this element matches the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @return {Boolean} True if this element matches the selector, else false
     */
    is : function(simpleSelector){
        return Ext.DomQuery.is(this.dom, simpleSelector);
    },

    /**
     * Tries to focus the element. Any exceptions are caught and ignored.
     * @param {Number} defer (optional) Milliseconds to defer the focus
     * @return {Ext.Element} this
     */
    focus : function(defer, /* private */ dom) {
        var me = this,
            dom = dom || me.dom;
        try{
            if(Number(defer)){
                me.focus.defer(defer, null, [null, dom]);
            }else{
                dom.focus();
            }
        }catch(e){}
        return me;
    },

    /**
     * Tries to blur the element. Any exceptions are caught and ignored.
     * @return {Ext.Element} this
     */
    blur : function() {
        try{
            this.dom.blur();
        }catch(e){}
        return this;
    },

    /**
     * Returns the value of the "value" attribute
     * @param {Boolean} asNumber true to parse the value as a number
     * @return {String/Number}
     */
    getValue : function(asNumber){
        var val = this.dom.value;
        return asNumber ? parseInt(val, 10) : val;
    },

    /**
     * Appends an event handler to this element.  The shorthand version {@link #on} is equivalent.
     * @param {String} eventName The name of event to handle.
     * @param {Function} fn The handler function the event invokes. This function is passed
     * the following parameters:<ul>
     * <li><b>evt</b> : EventObject<div class="sub-desc">The {@link Ext.EventObject EventObject} describing the event.</div></li>
     * <li><b>el</b> : HtmlElement<div class="sub-desc">The DOM element which was the target of the event.
     * Note that this may be filtered by using the <tt>delegate</tt> option.</div></li>
     * <li><b>o</b> : Object<div class="sub-desc">The options object from the addListener call.</div></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to this Element.</b>.
     * @param {Object} options (optional) An object containing handler configuration properties.
     * This may contain any of the following properties:<ul>
     * <li><b>scope</b> Object : <div class="sub-desc">The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to this Element.</b></div></li>
     * <li><b>delegate</b> String: <div class="sub-desc">A simple selector to filter the target or look for a descendant of the target. See below for additional details.</div></li>
     * <li><b>stopEvent</b> Boolean: <div class="sub-desc">True to stop the event. That is stop propagation, and prevent the default action.</div></li>
     * <li><b>preventDefault</b> Boolean: <div class="sub-desc">True to prevent the default action</div></li>
     * <li><b>stopPropagation</b> Boolean: <div class="sub-desc">True to prevent event propagation</div></li>
     * <li><b>normalized</b> Boolean: <div class="sub-desc">False to pass a browser event to the handler function instead of an Ext.EventObject</div></li>
     * <li><b>target</b> Ext.Element: <div class="sub-desc">Only call the handler if the event was fired on the target Element, <i>not</i> if the event was bubbled up from a child node.</div></li>
     * <li><b>delay</b> Number: <div class="sub-desc">The number of milliseconds to delay the invocation of the handler after the event fires.</div></li>
     * <li><b>single</b> Boolean: <div class="sub-desc">True to add a handler to handle just the next firing of the event, and then remove itself.</div></li>
     * <li><b>buffer</b> Number: <div class="sub-desc">Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</div></li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * In the following examples, the shorthand form {@link #on} is used rather than the more verbose
     * addListener.  The two are equivalent.  Using the options argument, it is possible to combine different
     * types of listeners:<br>
     * <br>
     * A delayed, one-time listener that auto stops the event and adds a custom argument (forumId) to the
     * options object. The options object is available as the third parameter in the handler function.<div style="margin: 5px 20px 20px;">
     * Code:<pre><code>
el.on('click', this.onClick, this, {
    single: true,
    delay: 100,
    stopEvent : true,
    forumId: 4
});</code></pre></p>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
     * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple handlers.</p>
     * <p>
     * Code:<pre><code>
el.on({
    'click' : {
        fn: this.onClick,
        scope: this,
        delay: 100
    },
    'mouseover' : {
        fn: this.onMouseOver,
        scope: this
    },
    'mouseout' : {
        fn: this.onMouseOut,
        scope: this
    }
});</code></pre>
     * <p>
     * Or a shorthand syntax:<br>
     * Code:<pre><code></p>
el.on({
    'click' : this.onClick,
    'mouseover' : this.onMouseOver,
    'mouseout' : this.onMouseOut,
    scope: this
});
     * </code></pre></p>
     * <p><b>delegate</b></p>
     * <p>This is a configuration option that you can pass along when registering a handler for
     * an event to assist with event delegation. Event delegation is a technique that is used to
     * reduce memory consumption and prevent exposure to memory-leaks. By registering an event
     * for a container element as opposed to each element within a container. By setting this
     * configuration option to a simple selector, the target element will be filtered to look for
     * a descendant of the target.
     * For example:<pre><code>
// using this markup:
&lt;div id='elId'>
    &lt;p id='p1'>paragraph one&lt;/p>
    &lt;p id='p2' class='clickable'>paragraph two&lt;/p>
    &lt;p id='p3'>paragraph three&lt;/p>
&lt;/div>
// utilize event delegation to registering just one handler on the container element:
el = Ext.get('elId');
el.on(
    'click',
    function(e,t) {
        // handle click
        console.info(t.id); // 'p2'
    },
    this,
    {
        // filter the target element to be a descendant with the class 'clickable'
        delegate: '.clickable'
    }
);
     * </code></pre></p>
     * @return {Ext.Element} this
     */
    addListener : function(eventName, fn, scope, options){
        Ext.EventManager.on(this.dom,  eventName, fn, scope || this, options);
        return this;
    },

    /**
     * Removes an event handler from this element.  The shorthand version {@link #un} is equivalent.
     * <b>Note</b>: if a <i>scope</i> was explicitly specified when {@link #addListener adding} the
     * listener, the same scope must be specified here.
     * Example:
     * <pre><code>
el.removeListener('click', this.handlerFn);
// or
el.un('click', this.handlerFn);
</code></pre>
     * @param {String} eventName The name of the event from which to remove the handler.
     * @param {Function} fn The handler function to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
     * @param {Object} scope If a scope (<b><code>this</code></b> reference) was specified when the listener was added,
     * then this must refer to the same object.
     * @return {Ext.Element} this
     */
    removeListener : function(eventName, fn, scope){
        Ext.EventManager.removeListener(this.dom,  eventName, fn, scope || this);
        return this;
    },

    /**
     * Removes all previous added listeners from this element
     * @return {Ext.Element} this
     */
    removeAllListeners : function(){
        Ext.EventManager.removeAll(this.dom);
        return this;
    },

    /**
     * Recursively removes all previous added listeners from this element and its children
     * @return {Ext.Element} this
     */
    purgeAllListeners : function() {
        Ext.EventManager.purgeElement(this, true);
        return this;
    },
    /**
     * @private Test if size has a unit, otherwise appends the default
     */
    addUnits : function(size){
        if(size === "" || size == "auto" || size === undefined){
            size = size || '';
        } else if(!isNaN(size) || !unitPattern.test(size)){
            size = size + (this.defaultUnit || 'px');
        }
        return size;
    },

    /**
     * <p>Updates the <a href="http://developer.mozilla.org/en/DOM/element.innerHTML">innerHTML</a> of this Element
     * from a specified URL. Note that this is subject to the <a href="http://en.wikipedia.org/wiki/Same_origin_policy">Same Origin Policy</a></p>
     * <p>Updating innerHTML of an element will <b>not</b> execute embedded <tt>&lt;script></tt> elements. This is a browser restriction.</p>
     * @param {Mixed} options. Either a sring containing the URL from which to load the HTML, or an {@link Ext.Ajax#request} options object specifying
     * exactly how to request the HTML.
     * @return {Ext.Element} this
     */
    load : function(url, params, cb){
        Ext.Ajax.request(Ext.apply({
            params: params,
            url: url.url || url,
            callback: cb,
            el: this.dom,
            indicatorText: url.indicatorText || ''
        }, Ext.isObject(url) ? url : {}));
        return this;
    },

    /**
     * Tests various css rules/browsers to determine if this element uses a border box
     * @return {Boolean}
     */
    isBorderBox : function(){
        return noBoxAdjust[(this.dom.tagName || "").toLowerCase()] || Ext.isBorderBox;
    },

    /**
     * <p>Removes this element's dom reference.  Note that event and cache removal is handled at {@link Ext#removeNode}</p>
     */
    remove : function(){
        var me = this,
            dom = me.dom;

        if (dom) {
            delete me.dom;
            Ext.removeNode(dom);
        }
    },

    /**
     * Sets up event handlers to call the passed functions when the mouse is moved into and out of the Element.
     * @param {Function} overFn The function to call when the mouse enters the Element.
     * @param {Function} outFn The function to call when the mouse leaves the Element.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the functions are executed. Defaults to the Element's DOM element.
     * @param {Object} options (optional) Options for the listener. See {@link Ext.util.Observable#addListener the <tt>options</tt> parameter}.
     * @return {Ext.Element} this
     */
    hover : function(overFn, outFn, scope, options){
        var me = this;
        me.on('mouseenter', overFn, scope || me.dom, options);
        me.on('mouseleave', outFn, scope || me.dom, options);
        return me;
    },

    /**
     * Returns true if this element is an ancestor of the passed element
     * @param {HTMLElement/String} el The element to check
     * @return {Boolean} True if this element is an ancestor of el, else false
     */
    contains : function(el){
        return !el ? false : Ext.lib.Dom.isAncestor(this.dom, el.dom ? el.dom : el);
    },

    /**
     * Returns the value of a namespaced attribute from the element's underlying DOM node.
     * @param {String} namespace The namespace in which to look for the attribute
     * @param {String} name The attribute name
     * @return {String} The attribute value
     * @deprecated
     */
    getAttributeNS : function(ns, name){
        return this.getAttribute(name, ns);
    },

    /**
     * Returns the value of an attribute from the element's underlying DOM node.
     * @param {String} name The attribute name
     * @param {String} namespace (optional) The namespace in which to look for the attribute
     * @return {String} The attribute value
     */
    getAttribute : Ext.isIE ? function(name, ns){
        var d = this.dom,
            type = typeof d[ns + ":" + name];

        if(['undefined', 'unknown'].indexOf(type) == -1){
            return d[ns + ":" + name];
        }
        return d[name];
    } : function(name, ns){
        var d = this.dom;
        return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name) || d.getAttribute(name) || d[name];
    },

    /**
    * Update the innerHTML of this element
    * @param {String} html The new HTML
    * @return {Ext.Element} this
     */
    update : function(html) {
        if (this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    }
};

var ep = El.prototype;

El.addMethods = function(o){
   Ext.apply(ep, o);
};

/**
 * Appends an event handler (shorthand for {@link #addListener}).
 * @param {String} eventName The name of event to handle.
 * @param {Function} fn The handler function the event invokes.
 * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the handler function is executed.
 * @param {Object} options (optional) An object containing standard {@link #addListener} options
 * @member Ext.Element
 * @method on
 */
ep.on = ep.addListener;

/**
 * Removes an event handler from this element (see {@link #removeListener} for additional notes).
 * @param {String} eventName The name of the event from which to remove the handler.
 * @param {Function} fn The handler function to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
 * @param {Object} scope If a scope (<b><code>this</code></b> reference) was specified when the listener was added,
 * then this must refer to the same object.
 * @return {Ext.Element} this
 * @member Ext.Element
 * @method un
 */
ep.un = ep.removeListener;

/**
 * true to automatically adjust width and height settings for box-model issues (default to true)
 */
ep.autoBoxAdjust = true;

// private
var unitPattern = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    docEl;

/**
 * @private
 */

/**
 * Retrieves Ext.Element objects.
 * <p><b>This method does not retrieve {@link Ext.Component Component}s.</b> This method
 * retrieves Ext.Element objects which encapsulate DOM elements. To retrieve a Component by
 * its ID, use {@link Ext.ComponentMgr#get}.</p>
 * <p>Uses simple caching to consistently return the same object. Automatically fixes if an
 * object was recreated with the same id via AJAX or DOM.</p>
 * @param {Mixed} el The id of the node, a DOM Node or an existing Element.
 * @return {Element} The Element object (or null if no matching element was found)
 * @static
 * @member Ext.Element
 * @method get
 */
El.get = function(el){
    var ex,
        elm,
        id;
    if(!el){ return null; }
    if (typeof el == "string") { // element id
        if (!(elm = DOC.getElementById(el))) {
            return null;
        }
        if (EC[el] && EC[el].el) {
            ex = EC[el].el;
            ex.dom = elm;
        } else {
            ex = El.addToCache(new El(elm));
        }
        return ex;
    } else if (el.tagName) { // dom element
        if(!(id = el.id)){
            id = Ext.id(el);
        }
        if (EC[id] && EC[id].el) {
            ex = EC[id].el;
            ex.dom = el;
        } else {
            ex = El.addToCache(new El(el));
        }
        return ex;
    } else if (el instanceof El) {
        if(el != docEl){
            // refresh dom element in case no longer valid,
            // catch case where it hasn't been appended

            // If an el instance is passed, don't pass to getElementById without some kind of id
            if (Ext.isIE && (el.id == undefined || el.id == '')) {
                el.dom = el.dom;
            } else {
                el.dom = DOC.getElementById(el.id) || el.dom;
            }
        }
        return el;
    } else if(el.isComposite) {
        return el;
    } else if(Ext.isArray(el)) {
        return El.select(el);
    } else if(el == DOC) {
        // create a bogus element object representing the document object
        if(!docEl){
            var f = function(){};
            f.prototype = El.prototype;
            docEl = new f();
            docEl.dom = DOC;
        }
        return docEl;
    }
    return null;
};

El.addToCache = function(el, id){
    id = id || el.id;
    EC[id] = {
        el:  el,
        data: {},
        events: {}
    };
    return el;
};

// private method for getting and setting element data
El.data = function(el, key, value){
    el = El.get(el);
    if (!el) {
        return null;
    }
    var c = EC[el.id].data;
    if(arguments.length == 2){
        return c[key];
    }else{
        return (c[key] = value);
    }
};

// private
// Garbage collection - uncache elements/purge listeners on orphaned elements
// so we don't hold a reference and cause the browser to retain them
function garbageCollect(){
    if(!Ext.enableGarbageCollector){
        clearInterval(El.collectorThreadId);
    } else {
        var eid,
            el,
            d,
            o;

        for(eid in EC){
            o = EC[eid];
            if(o.skipGC){
                continue;
            }
            el = o.el;
            d = el.dom;
            // -------------------------------------------------------
            // Determining what is garbage:
            // -------------------------------------------------------
            // !d
            // dom node is null, definitely garbage
            // -------------------------------------------------------
            // !d.parentNode
            // no parentNode == direct orphan, definitely garbage
            // -------------------------------------------------------
            // !d.offsetParent && !document.getElementById(eid)
            // display none elements have no offsetParent so we will
            // also try to look it up by it's id. However, check
            // offsetParent first so we don't do unneeded lookups.
            // This enables collection of elements that are not orphans
            // directly, but somewhere up the line they have an orphan
            // parent.
            // -------------------------------------------------------
            if(!d || !d.parentNode || (!d.offsetParent && !DOC.getElementById(eid))){
                if(Ext.enableListenerCollection){
                    Ext.EventManager.removeAll(d);
                }
                delete EC[eid];
            }
        }
        // Cleanup IE Object leaks
        if (Ext.isIE) {
            var t = {};
            for (eid in EC) {
                t[eid] = EC[eid];
            }
            EC = Ext.elCache = t;
        }
    }
}
El.collectorThreadId = setInterval(garbageCollect, 30000);

var flyFn = function(){};
flyFn.prototype = El.prototype;

// dom is optional
El.Flyweight = function(dom){
    this.dom = dom;
};

El.Flyweight.prototype = new flyFn();
El.Flyweight.prototype.isFlyweight = true;
El._flyweights = {};

/**
 * <p>Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference to this element -
 * the dom node can be overwritten by other code. Shorthand of {@link Ext.Element#fly}</p>
 * <p>Use this to make one-time references to DOM elements which are not going to be accessed again either by
 * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link Ext#get}
 * will be more appropriate to take advantage of the caching provided by the Ext.Element class.</p>
 * @param {String/HTMLElement} el The dom node or id
 * @param {String} named (optional) Allows for creation of named reusable flyweights to prevent conflicts
 * (e.g. internally Ext uses "_global")
 * @return {Element} The shared Element object (or null if no matching element was found)
 * @member Ext.Element
 * @method fly
 */
El.fly = function(el, named){
    var ret = null;
    named = named || '_global';

    if (el = Ext.getDom(el)) {
        (El._flyweights[named] = El._flyweights[named] || new El.Flyweight()).dom = el;
        ret = El._flyweights[named];
    }
    return ret;
};

/**
 * Retrieves Ext.Element objects.
 * <p><b>This method does not retrieve {@link Ext.Component Component}s.</b> This method
 * retrieves Ext.Element objects which encapsulate DOM elements. To retrieve a Component by
 * its ID, use {@link Ext.ComponentMgr#get}.</p>
 * <p>Uses simple caching to consistently return the same object. Automatically fixes if an
 * object was recreated with the same id via AJAX or DOM.</p>
 * Shorthand of {@link Ext.Element#get}
 * @param {Mixed} el The id of the node, a DOM Node or an existing Element.
 * @return {Element} The Element object (or null if no matching element was found)
 * @member Ext
 * @method get
 */
Ext.get = El.get;

/**
 * <p>Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference to this element -
 * the dom node can be overwritten by other code. Shorthand of {@link Ext.Element#fly}</p>
 * <p>Use this to make one-time references to DOM elements which are not going to be accessed again either by
 * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link Ext#get}
 * will be more appropriate to take advantage of the caching provided by the Ext.Element class.</p>
 * @param {String/HTMLElement} el The dom node or id
 * @param {String} named (optional) Allows for creation of named reusable flyweights to prevent conflicts
 * (e.g. internally Ext uses "_global")
 * @return {Element} The shared Element object (or null if no matching element was found)
 * @member Ext
 * @method fly
 */
Ext.fly = El.fly;

// speedy lookup for elements never to box adjust
var noBoxAdjust = Ext.isStrict ? {
    select:1
} : {
    input:1, select:1, textarea:1
};
if(Ext.isIE || Ext.isGecko){
    noBoxAdjust['button'] = 1;
}

})();
/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Stops the specified event(s) from bubbling and optionally prevents the default action
     * @param {String/Array} eventName an event / array of events to stop from bubbling
     * @param {Boolean} preventDefault (optional) true to prevent the default action too
     * @return {Ext.Element} this
     */
    swallowEvent : function(eventName, preventDefault){
        var me = this;
        function fn(e){
            e.stopPropagation();
            if(preventDefault){
                e.preventDefault();
            }
        }
        if(Ext.isArray(eventName)){
            Ext.each(eventName, function(e) {
                 me.on(e, fn);
            });
            return me;
        }
        me.on(eventName, fn);
        return me;
    },

    /**
     * Create an event handler on this element such that when the event fires and is handled by this element,
     * it will be relayed to another object (i.e., fired again as if it originated from that object instead).
     * @param {String} eventName The type of event to relay
     * @param {Object} object Any object that extends {@link Ext.util.Observable} that will provide the context
     * for firing the relayed event
     */
    relayEvent : function(eventName, observable){
        this.on(eventName, function(e){
            observable.fireEvent(eventName, e);
        });
    },

    /**
     * Removes worthless text nodes
     * @param {Boolean} forceReclean (optional) By default the element
     * keeps track if it has been cleaned already so
     * you can call this over and over. However, if you update the element and
     * need to force a reclean, you can pass true.
     */
    clean : function(forceReclean){
        var me = this,
            dom = me.dom,
            n = dom.firstChild,
            ni = -1;

        if(Ext.Element.data(dom, 'isCleaned') && forceReclean !== true){
            return me;
        }

        while(n){
            var nx = n.nextSibling;
            if(n.nodeType == 3 && !/\S/.test(n.nodeValue)){
                dom.removeChild(n);
            }else{
                n.nodeIndex = ++ni;
            }
            n = nx;
        }
        Ext.Element.data(dom, 'isCleaned', true);
        return me;
    },

    /**
     * Direct access to the Updater {@link Ext.Updater#update} method. The method takes the same object
     * parameter as {@link Ext.Updater#update}
     * @return {Ext.Element} this
     */
    load : function(){
        var um = this.getUpdater();
        um.update.apply(um, arguments);
        return this;
    },

    /**
    * Gets this element's {@link Ext.Updater Updater}
    * @return {Ext.Updater} The Updater
    */
    getUpdater : function(){
        return this.updateManager || (this.updateManager = new Ext.Updater(this));
    },

    /**
    * Update the innerHTML of this element, optionally searching for and processing scripts
    * @param {String} html The new HTML
    * @param {Boolean} loadScripts (optional) True to look for and process scripts (defaults to false)
    * @param {Function} callback (optional) For async script loading you can be notified when the update completes
    * @return {Ext.Element} this
     */
    update : function(html, loadScripts, callback){
        if (!this.dom) {
            return this;
        }
        html = html || "";

        if(loadScripts !== true){
            this.dom.innerHTML = html;
            if(typeof callback == 'function'){
                callback();
            }
            return this;
        }

        var id = Ext.id(),
            dom = this.dom;

        html += '<span id="' + id + '"></span>';

        Ext.lib.Event.onAvailable(id, function(){
            var DOC = document,
                hd = DOC.getElementsByTagName("head")[0],
                re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
                srcRe = /\ssrc=([\'\"])(.*?)\1/i,
                typeRe = /\stype=([\'\"])(.*?)\1/i,
                match,
                attrs,
                srcMatch,
                typeMatch,
                el,
                s;

            while((match = re.exec(html))){
                attrs = match[1];
                srcMatch = attrs ? attrs.match(srcRe) : false;
                if(srcMatch && srcMatch[2]){
                   s = DOC.createElement("script");
                   s.src = srcMatch[2];
                   typeMatch = attrs.match(typeRe);
                   if(typeMatch && typeMatch[2]){
                       s.type = typeMatch[2];
                   }
                   hd.appendChild(s);
                }else if(match[2] && match[2].length > 0){
                    if(window.execScript) {
                       window.execScript(match[2]);
                    } else {
                       window.eval(match[2]);
                    }
                }
            }
            el = DOC.getElementById(id);
            if(el){Ext.removeNode(el);}
            if(typeof callback == 'function'){
                callback();
            }
        });
        dom.innerHTML = html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
        return this;
    },

    // inherit docs, overridden so we can add removeAnchor
    removeAllListeners : function(){
        this.removeAnchor();
        Ext.EventManager.removeAll(this.dom);
        return this;
    },

    /**
     * Creates a proxy element of this element
     * @param {String/Object} config The class name of the proxy element or a DomHelper config object
     * @param {String/HTMLElement} renderTo (optional) The element or element id to render the proxy to (defaults to document.body)
     * @param {Boolean} matchBox (optional) True to align and size the proxy to this element now (defaults to false)
     * @return {Ext.Element} The new proxy element
     */
    createProxy : function(config, renderTo, matchBox){
        config = (typeof config == 'object') ? config : {tag : "div", cls: config};

        var me = this,
            proxy = renderTo ? Ext.DomHelper.append(renderTo, config, true) :
                               Ext.DomHelper.insertBefore(me.dom, config, true);

        if(matchBox && me.setBox && me.getBox){ // check to make sure Element.position.js is loaded
           proxy.setBox(me.getBox());
        }
        return proxy;
    }
});

Ext.Element.prototype.getUpdateManager = Ext.Element.prototype.getUpdater;
/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Gets the x,y coordinates specified by the anchor position on the element.
     * @param {String} anchor (optional) The specified anchor position (defaults to "c").  See {@link #alignTo}
     * for details on supported anchor positions.
     * @param {Boolean} local (optional) True to get the local (element top/left-relative) anchor position instead
     * of page coordinates
     * @param {Object} size (optional) An object containing the size to use for calculating anchor position
     * {width: (target width), height: (target height)} (defaults to the element's current size)
     * @return {Array} [x, y] An array containing the element's x and y coordinates
     */
    getAnchorXY : function(anchor, local, s){
        //Passing a different size is useful for pre-calculating anchors,
        //especially for anchored animations that change the el size.
		anchor = (anchor || "tl").toLowerCase();
        s = s || {};
        
        var me = this,        
        	vp = me.dom == document.body || me.dom == document,
        	w = s.width || vp ? Ext.lib.Dom.getViewWidth() : me.getWidth(),
        	h = s.height || vp ? Ext.lib.Dom.getViewHeight() : me.getHeight(),         	        	
        	xy,       	
        	r = Math.round,
        	o = me.getXY(),
        	scroll = me.getScroll(),
        	extraX = vp ? scroll.left : !local ? o[0] : 0,
        	extraY = vp ? scroll.top : !local ? o[1] : 0,
        	hash = {
	        	c  : [r(w * 0.5), r(h * 0.5)],
	        	t  : [r(w * 0.5), 0],
	        	l  : [0, r(h * 0.5)],
	        	r  : [w, r(h * 0.5)],
	        	b  : [r(w * 0.5), h],
	        	tl : [0, 0],	
	        	bl : [0, h],
	        	br : [w, h],
	        	tr : [w, 0]
        	};
        
        xy = hash[anchor];	
        return [xy[0] + extraX, xy[1] + extraY]; 
    },

    /**
     * Anchors an element to another element and realigns it when the window is resized.
     * @param {Mixed} element The element to align to.
     * @param {String} position The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @param {Boolean/Object} animate (optional) True for the default animation or a standard Element animation config object
     * @param {Boolean/Number} monitorScroll (optional) True to monitor body scroll and reposition. If this parameter
     * is a number, it is used as the buffer delay (defaults to 50ms).
     * @param {Function} callback The function to call after the animation finishes
     * @return {Ext.Element} this
     */
    anchorTo : function(el, alignment, offsets, animate, monitorScroll, callback){        
	    var me = this,
            dom = me.dom,
            scroll = !Ext.isEmpty(monitorScroll),
            action = function(){
                Ext.fly(dom).alignTo(el, alignment, offsets, animate);
                Ext.callback(callback, Ext.fly(dom));
            },
            anchor = this.getAnchor();
            
        // previous listener anchor, remove it
        this.removeAnchor();
        Ext.apply(anchor, {
            fn: action,
            scroll: scroll
        });

        Ext.EventManager.onWindowResize(action, null);
        
        if(scroll){
            Ext.EventManager.on(window, 'scroll', action, null,
                {buffer: !isNaN(monitorScroll) ? monitorScroll : 50});
        }
        action.call(me); // align immediately
        return me;
    },
    
    /**
     * Remove any anchor to this element. See {@link #anchorTo}.
     * @return {Ext.Element} this
     */
    removeAnchor : function(){
        var me = this,
            anchor = this.getAnchor();
            
        if(anchor && anchor.fn){
            Ext.EventManager.removeResizeListener(anchor.fn);
            if(anchor.scroll){
                Ext.EventManager.un(window, 'scroll', anchor.fn);
            }
            delete anchor.fn;
        }
        return me;
    },
    
    // private
    getAnchor : function(){
        var data = Ext.Element.data,
            dom = this.dom;
            if (!dom) {
                return;
            }
            var anchor = data(dom, '_anchor');
            
        if(!anchor){
            anchor = data(dom, '_anchor', {});
        }
        return anchor;
    },

    /**
     * Gets the x,y coordinates to align this element with another element. See {@link #alignTo} for more info on the
     * supported position values.
     * @param {Mixed} element The element to align to.
     * @param {String} position (optional, defaults to "tl-bl?") The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @return {Array} [x, y]
     */
    getAlignToXY : function(el, p, o){	    
        el = Ext.get(el);
        
        if(!el || !el.dom){
            throw "Element.alignToXY with an element that doesn't exist";
        }
        
        o = o || [0,0];
        p = (!p || p == "?" ? "tl-bl?" : (!/-/.test(p) && p !== "" ? "tl-" + p : p || "tl-bl")).toLowerCase();       
                
        var me = this,
        	d = me.dom,
        	a1,
        	a2,
        	x,
        	y,
        	//constrain the aligned el to viewport if necessary
        	w,
        	h,
        	r,
        	dw = Ext.lib.Dom.getViewWidth() -10, // 10px of margin for ie
        	dh = Ext.lib.Dom.getViewHeight()-10, // 10px of margin for ie
        	p1y,
        	p1x,        	
        	p2y,
        	p2x,
        	swapY,
        	swapX,
        	doc = document,
        	docElement = doc.documentElement,
        	docBody = doc.body,
        	scrollX = (docElement.scrollLeft || docBody.scrollLeft || 0)+5,
        	scrollY = (docElement.scrollTop || docBody.scrollTop || 0)+5,
        	c = false, //constrain to viewport
        	p1 = "", 
        	p2 = "",
        	m = p.match(/^([a-z]+)-([a-z]+)(\?)?$/);
        
        if(!m){
           throw "Element.alignTo with an invalid alignment " + p;
        }
        
        p1 = m[1]; 
        p2 = m[2]; 
        c = !!m[3];

        //Subtract the aligned el's internal xy from the target's offset xy
        //plus custom offset to get the aligned el's new offset xy
        a1 = me.getAnchorXY(p1, true);
        a2 = el.getAnchorXY(p2, false);

        x = a2[0] - a1[0] + o[0];
        y = a2[1] - a1[1] + o[1];

        if(c){    
	       w = me.getWidth();
           h = me.getHeight();
           r = el.getRegion();       
           //If we are at a viewport boundary and the aligned el is anchored on a target border that is
           //perpendicular to the vp border, allow the aligned el to slide on that border,
           //otherwise swap the aligned el to the opposite border of the target.
           p1y = p1.charAt(0);
           p1x = p1.charAt(p1.length-1);
           p2y = p2.charAt(0);
           p2x = p2.charAt(p2.length-1);
           swapY = ((p1y=="t" && p2y=="b") || (p1y=="b" && p2y=="t"));
           swapX = ((p1x=="r" && p2x=="l") || (p1x=="l" && p2x=="r"));          
           

           if (x + w > dw + scrollX) {
                x = swapX ? r.left-w : dw+scrollX-w;
           }
           if (x < scrollX) {
               x = swapX ? r.right : scrollX;
           }
           if (y + h > dh + scrollY) {
                y = swapY ? r.top-h : dh+scrollY-h;
            }
           if (y < scrollY){
               y = swapY ? r.bottom : scrollY;
           }
        }
        return [x,y];
    },

    /**
     * Aligns this element with another element relative to the specified anchor points. If the other element is the
     * document it aligns it to the viewport.
     * The position parameter is optional, and can be specified in any one of the following formats:
     * <ul>
     *   <li><b>Blank</b>: Defaults to aligning the element's top-left corner to the target's bottom-left corner ("tl-bl").</li>
     *   <li><b>One anchor (deprecated)</b>: The passed anchor position is used as the target element's anchor point.
     *       The element being aligned will position its top-left corner (tl) to that point.  <i>This method has been
     *       deprecated in favor of the newer two anchor syntax below</i>.</li>
     *   <li><b>Two anchors</b>: If two values from the table below are passed separated by a dash, the first value is used as the
     *       element's anchor point, and the second value is used as the target's anchor point.</li>
     * </ul>
     * In addition to the anchor points, the position parameter also supports the "?" character.  If "?" is passed at the end of
     * the position string, the element will attempt to align as specified, but the position will be adjusted to constrain to
     * the viewport if necessary.  Note that the element being aligned might be swapped to align to a different position than
     * that specified in order to enforce the viewport constraints.
     * Following are all of the supported anchor positions:
<pre>
Value  Description
-----  -----------------------------
tl     The top left corner (default)
t      The center of the top edge
tr     The top right corner
l      The center of the left edge
c      In the center of the element
r      The center of the right edge
bl     The bottom left corner
b      The center of the bottom edge
br     The bottom right corner
</pre>
Example Usage:
<pre><code>
// align el to other-el using the default positioning ("tl-bl", non-constrained)
el.alignTo("other-el");

// align the top left corner of el with the top right corner of other-el (constrained to viewport)
el.alignTo("other-el", "tr?");

// align the bottom right corner of el with the center left edge of other-el
el.alignTo("other-el", "br-l?");

// align the center of el with the bottom left corner of other-el and
// adjust the x position by -6 pixels (and the y position by 0)
el.alignTo("other-el", "c-bl", [-6, 0]);
</code></pre>
     * @param {Mixed} element The element to align to.
     * @param {String} position (optional, defaults to "tl-bl?") The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    alignTo : function(element, position, offsets, animate){
	    var me = this;
        return me.setXY(me.getAlignToXY(element, position, offsets),
          		        me.preanim && !!animate ? me.preanim(arguments, 3) : false);
    },
    
    // private ==>  used outside of core
    adjustForConstraints : function(xy, parent, offsets){
        return this.getConstrainToXY(parent || document, false, offsets, xy) ||  xy;
    },

    // private ==>  used outside of core
    getConstrainToXY : function(el, local, offsets, proposedXY){   
	    var os = {top:0, left:0, bottom:0, right: 0};

        return function(el, local, offsets, proposedXY){
            el = Ext.get(el);
            offsets = offsets ? Ext.applyIf(offsets, os) : os;

            var vw, vh, vx = 0, vy = 0;
            if(el.dom == document.body || el.dom == document){
                vw =Ext.lib.Dom.getViewWidth();
                vh = Ext.lib.Dom.getViewHeight();
            }else{
                vw = el.dom.clientWidth;
                vh = el.dom.clientHeight;
                if(!local){
                    var vxy = el.getXY();
                    vx = vxy[0];
                    vy = vxy[1];
                }
            }

            var s = el.getScroll();

            vx += offsets.left + s.left;
            vy += offsets.top + s.top;

            vw -= offsets.right;
            vh -= offsets.bottom;

            var vr = vx+vw;
            var vb = vy+vh;

            var xy = proposedXY || (!local ? this.getXY() : [this.getLeft(true), this.getTop(true)]);
            var x = xy[0], y = xy[1];
            var w = this.dom.offsetWidth, h = this.dom.offsetHeight;

            // only move it if it needs it
            var moved = false;

            // first validate right/bottom
            if((x + w) > vr){
                x = vr - w;
                moved = true;
            }
            if((y + h) > vb){
                y = vb - h;
                moved = true;
            }
            // then make sure top/left isn't negative
            if(x < vx){
                x = vx;
                moved = true;
            }
            if(y < vy){
                y = vy;
                moved = true;
            }
            return moved ? [x, y] : false;
        };
    }(),
	    
	    
	        
//         el = Ext.get(el);
//         offsets = Ext.applyIf(offsets || {}, {top : 0, left : 0, bottom : 0, right : 0});

//         var	me = this,
//         	doc = document,
//         	s = el.getScroll(),
//         	vxy = el.getXY(),
//         	vx = offsets.left + s.left, 
//         	vy = offsets.top + s.top,            	
//         	vw = -offsets.right, 
//         	vh = -offsets.bottom, 
//         	vr,
//         	vb,
//         	xy = proposedXY || (!local ? me.getXY() : [me.getLeft(true), me.getTop(true)]),
//         	x = xy[0],
//         	y = xy[1],
//         	w = me.dom.offsetWidth, h = me.dom.offsetHeight,
//         	moved = false; // only move it if it needs it
//       
//         	
//         if(el.dom == doc.body || el.dom == doc){
//             vw += Ext.lib.Dom.getViewWidth();
//             vh += Ext.lib.Dom.getViewHeight();
//         }else{
//             vw += el.dom.clientWidth;
//             vh += el.dom.clientHeight;
//             if(!local){                    
//                 vx += vxy[0];
//                 vy += vxy[1];
//             }
//         }

//         // first validate right/bottom
//         if(x + w > vx + vw){
//             x = vx + vw - w;
//             moved = true;
//         }
//         if(y + h > vy + vh){
//             y = vy + vh - h;
//             moved = true;
//         }
//         // then make sure top/left isn't negative
//         if(x < vx){
//             x = vx;
//             moved = true;
//         }
//         if(y < vy){
//             y = vy;
//             moved = true;
//         }
//         return moved ? [x, y] : false;
//    },
    
    /**
    * Calculates the x, y to center this element on the screen
    * @return {Array} The x, y values [x, y]
    */
    getCenterXY : function(){
        return this.getAlignToXY(document, 'c-c');
    },

    /**
    * Centers the Element in either the viewport, or another Element.
    * @param {Mixed} centerIn (optional) The element in which to center the element.
    */
    center : function(centerIn){
        return this.alignTo(centerIn || document, 'c-c');        
    }    
});
/**
 * @class Ext.Element
 */
Ext.Element.addMethods(function(){
	var PARENTNODE = 'parentNode',
		NEXTSIBLING = 'nextSibling',
		PREVIOUSSIBLING = 'previousSibling',
		DQ = Ext.DomQuery,
		GET = Ext.get;
	
	return {
		/**
	     * Looks at this node and then at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
	     * @param {String} selector The simple selector to test
	     * @param {Number/Mixed} maxDepth (optional) The max depth to search as a number or element (defaults to 50 || document.body)
	     * @param {Boolean} returnEl (optional) True to return a Ext.Element object instead of DOM node
	     * @return {HTMLElement} The matching DOM node (or null if no match was found)
	     */
	    findParent : function(simpleSelector, maxDepth, returnEl){
	        var p = this.dom,
	        	b = document.body, 
	        	depth = 0, 	        	
	        	stopEl;	        
            if(Ext.isGecko && Object.prototype.toString.call(p) == '[object XULElement]') {
                return null;
            }
	        maxDepth = maxDepth || 50;
	        if (isNaN(maxDepth)) {
	            stopEl = Ext.getDom(maxDepth);
	            maxDepth = Number.MAX_VALUE;
	        }
	        while(p && p.nodeType == 1 && depth < maxDepth && p != b && p != stopEl){
	            if(DQ.is(p, simpleSelector)){
	                return returnEl ? GET(p) : p;
	            }
	            depth++;
	            p = p.parentNode;
	        }
	        return null;
	    },
	
	    /**
	     * Looks at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
	     * @param {String} selector The simple selector to test
	     * @param {Number/Mixed} maxDepth (optional) The max depth to
	            search as a number or element (defaults to 10 || document.body)
	     * @param {Boolean} returnEl (optional) True to return a Ext.Element object instead of DOM node
	     * @return {HTMLElement} The matching DOM node (or null if no match was found)
	     */
	    findParentNode : function(simpleSelector, maxDepth, returnEl){
	        var p = Ext.fly(this.dom.parentNode, '_internal');
	        return p ? p.findParent(simpleSelector, maxDepth, returnEl) : null;
	    },
	
	    /**
	     * Walks up the dom looking for a parent node that matches the passed simple selector (e.g. div.some-class or span:first-child).
	     * This is a shortcut for findParentNode() that always returns an Ext.Element.
	     * @param {String} selector The simple selector to test
	     * @param {Number/Mixed} maxDepth (optional) The max depth to
	            search as a number or element (defaults to 10 || document.body)
	     * @return {Ext.Element} The matching DOM node (or null if no match was found)
	     */
	    up : function(simpleSelector, maxDepth){
	        return this.findParentNode(simpleSelector, maxDepth, true);
	    },
	
	    /**
	     * Creates a {@link Ext.CompositeElement} for child nodes based on the passed CSS selector (the selector should not contain an id).
	     * @param {String} selector The CSS selector
	     * @return {CompositeElement/CompositeElementLite} The composite element
	     */
	    select : function(selector){
	        return Ext.Element.select(selector, this.dom);
	    },
	
	    /**
	     * Selects child nodes based on the passed CSS selector (the selector should not contain an id).
	     * @param {String} selector The CSS selector
	     * @return {Array} An array of the matched nodes
	     */
	    query : function(selector){
	        return DQ.select(selector, this.dom);
	    },
	
	    /**
	     * Selects a single child at any depth below this element based on the passed CSS selector (the selector should not contain an id).
	     * @param {String} selector The CSS selector
	     * @param {Boolean} returnDom (optional) True to return the DOM node instead of Ext.Element (defaults to false)
	     * @return {HTMLElement/Ext.Element} The child Ext.Element (or DOM node if returnDom = true)
	     */
	    child : function(selector, returnDom){
	        var n = DQ.selectNode(selector, this.dom);
	        return returnDom ? n : GET(n);
	    },
	
	    /**
	     * Selects a single *direct* child based on the passed CSS selector (the selector should not contain an id).
	     * @param {String} selector The CSS selector
	     * @param {Boolean} returnDom (optional) True to return the DOM node instead of Ext.Element (defaults to false)
	     * @return {HTMLElement/Ext.Element} The child Ext.Element (or DOM node if returnDom = true)
	     */
	    down : function(selector, returnDom){
	        var n = DQ.selectNode(" > " + selector, this.dom);
	        return returnDom ? n : GET(n);
	    },
	
		 /**
	     * Gets the parent node for this element, optionally chaining up trying to match a selector
	     * @param {String} selector (optional) Find a parent node that matches the passed simple selector
	     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
	     * @return {Ext.Element/HTMLElement} The parent node or null
		 */
	    parent : function(selector, returnDom){
	        return this.matchNode(PARENTNODE, PARENTNODE, selector, returnDom);
	    },
	
	     /**
	     * Gets the next sibling, skipping text nodes
	     * @param {String} selector (optional) Find the next sibling that matches the passed simple selector
	     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
	     * @return {Ext.Element/HTMLElement} The next sibling or null
		 */
	    next : function(selector, returnDom){
	        return this.matchNode(NEXTSIBLING, NEXTSIBLING, selector, returnDom);
	    },
	
	    /**
	     * Gets the previous sibling, skipping text nodes
	     * @param {String} selector (optional) Find the previous sibling that matches the passed simple selector
	     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
	     * @return {Ext.Element/HTMLElement} The previous sibling or null
		 */
	    prev : function(selector, returnDom){
	        return this.matchNode(PREVIOUSSIBLING, PREVIOUSSIBLING, selector, returnDom);
	    },
	
	
	    /**
	     * Gets the first child, skipping text nodes
	     * @param {String} selector (optional) Find the next sibling that matches the passed simple selector
	     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
	     * @return {Ext.Element/HTMLElement} The first child or null
		 */
	    first : function(selector, returnDom){
	        return this.matchNode(NEXTSIBLING, 'firstChild', selector, returnDom);
	    },
	
	    /**
	     * Gets the last child, skipping text nodes
	     * @param {String} selector (optional) Find the previous sibling that matches the passed simple selector
	     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
	     * @return {Ext.Element/HTMLElement} The last child or null
		 */
	    last : function(selector, returnDom){
	        return this.matchNode(PREVIOUSSIBLING, 'lastChild', selector, returnDom);
	    },
	    
	    matchNode : function(dir, start, selector, returnDom){
	        var n = this.dom[start];
	        while(n){
	            if(n.nodeType == 1 && (!selector || DQ.is(n, selector))){
	                return !returnDom ? GET(n) : n;
	            }
	            n = n[dir];
	        }
	        return null;
	    }	
    }
}());/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Creates a {@link Ext.CompositeElement} for child nodes based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @param {Boolean} unique (optional) True to create a unique Ext.Element for each child (defaults to false, which creates a single shared flyweight object)
     * @return {CompositeElement/CompositeElementLite} The composite element
     */
    select : function(selector, unique){
        return Ext.Element.select(selector, unique, this.dom);
    }
});/**
 * @class Ext.Element
 */
Ext.Element.addMethods(
function() {
	var GETDOM = Ext.getDom,
		GET = Ext.get,
		DH = Ext.DomHelper;
	
	return {
	    /**
	     * Appends the passed element(s) to this element
	     * @param {String/HTMLElement/Array/Element/CompositeElement} el
	     * @return {Ext.Element} this
	     */
	    appendChild: function(el){        
	        return GET(el).appendTo(this);        
	    },
	
	    /**
	     * Appends this element to the passed element
	     * @param {Mixed} el The new parent element
	     * @return {Ext.Element} this
	     */
	    appendTo: function(el){        
	        GETDOM(el).appendChild(this.dom);        
	        return this;
	    },
	
	    /**
	     * Inserts this element before the passed element in the DOM
	     * @param {Mixed} el The element before which this element will be inserted
	     * @return {Ext.Element} this
	     */
	    insertBefore: function(el){  	          
	        (el = GETDOM(el)).parentNode.insertBefore(this.dom, el);
	        return this;
	    },
	
	    /**
	     * Inserts this element after the passed element in the DOM
	     * @param {Mixed} el The element to insert after
	     * @return {Ext.Element} this
	     */
	    insertAfter: function(el){
	        (el = GETDOM(el)).parentNode.insertBefore(this.dom, el.nextSibling);
	        return this;
	    },
	
	    /**
	     * Inserts (or creates) an element (or DomHelper config) as the first child of this element
	     * @param {Mixed/Object} el The id or element to insert or a DomHelper config to create and insert
	     * @return {Ext.Element} The new child
	     */
	    insertFirst: function(el, returnDom){
            el = el || {};
            if(el.nodeType || el.dom || typeof el == 'string'){ // element
                el = GETDOM(el);
                this.dom.insertBefore(el, this.dom.firstChild);
                return !returnDom ? GET(el) : el;
            }else{ // dh config
                return this.createChild(el, this.dom.firstChild, returnDom);
            }
        },
	
	    /**
	     * Replaces the passed element with this element
	     * @param {Mixed} el The element to replace
	     * @return {Ext.Element} this
	     */
	    replace: function(el){
	        el = GET(el);
	        this.insertBefore(el);
	        el.remove();
	        return this;
	    },
	
	    /**
	     * Replaces this element with the passed element
	     * @param {Mixed/Object} el The new element or a DomHelper config of an element to create
	     * @return {Ext.Element} this
	     */
	    replaceWith: function(el){
		    var me = this;
                
            if(el.nodeType || el.dom || typeof el == 'string'){
                el = GETDOM(el);
                me.dom.parentNode.insertBefore(el, me.dom);
            }else{
                el = DH.insertBefore(me.dom, el);
            }
	        
	        delete Ext.elCache[me.id];
	        Ext.removeNode(me.dom);      
	        me.id = Ext.id(me.dom = el);
	        Ext.Element.addToCache(me.isFlyweight ? new Ext.Element(me.dom) : me);     
            return me;
	    },
	    
		/**
		 * Creates the passed DomHelper config and appends it to this element or optionally inserts it before the passed child element.
		 * @param {Object} config DomHelper element config object.  If no tag is specified (e.g., {tag:'input'}) then a div will be
		 * automatically generated with the specified attributes.
		 * @param {HTMLElement} insertBefore (optional) a child element of this element
		 * @param {Boolean} returnDom (optional) true to return the dom node instead of creating an Element
		 * @return {Ext.Element} The new child element
		 */
		createChild: function(config, insertBefore, returnDom){
		    config = config || {tag:'div'};
		    return insertBefore ? 
		    	   DH.insertBefore(insertBefore, config, returnDom !== true) :	
		    	   DH[!this.dom.firstChild ? 'overwrite' : 'append'](this.dom, config,  returnDom !== true);
		},
		
		/**
		 * Creates and wraps this element with another element
		 * @param {Object} config (optional) DomHelper element config object for the wrapper element or null for an empty div
		 * @param {Boolean} returnDom (optional) True to return the raw DOM element instead of Ext.Element
		 * @return {HTMLElement/Element} The newly created wrapper element
		 */
		wrap: function(config, returnDom){        
		    var newEl = DH.insertBefore(this.dom, config || {tag: "div"}, !returnDom);
		    newEl.dom ? newEl.dom.appendChild(this.dom) : newEl.appendChild(this.dom);
		    return newEl;
		},
		
		/**
		 * Inserts an html fragment into this element
		 * @param {String} where Where to insert the html in relation to this element - beforeBegin, afterBegin, beforeEnd, afterEnd.
		 * @param {String} html The HTML fragment
		 * @param {Boolean} returnEl (optional) True to return an Ext.Element (defaults to false)
		 * @return {HTMLElement/Ext.Element} The inserted node (or nearest related if more than 1 inserted)
		 */
		insertHtml : function(where, html, returnEl){
		    var el = DH.insertHtml(where, this.dom, html);
		    return returnEl ? Ext.get(el) : el;
		}
	}
}());/**
 * @class Ext.Element
 */
Ext.apply(Ext.Element.prototype, function() {
	var GETDOM = Ext.getDom,
		GET = Ext.get,
		DH = Ext.DomHelper;
	
	return {	
		/**
	     * Inserts (or creates) the passed element (or DomHelper config) as a sibling of this element
	     * @param {Mixed/Object/Array} el The id, element to insert or a DomHelper config to create and insert *or* an array of any of those.
	     * @param {String} where (optional) 'before' or 'after' defaults to before
	     * @param {Boolean} returnDom (optional) True to return the raw DOM element instead of Ext.Element
	     * @return {Ext.Element} The inserted Element. If an array is passed, the last inserted element is returned.
	     */
	    insertSibling: function(el, where, returnDom){
	        var me = this,
	        	rt,
                isAfter = (where || 'before').toLowerCase() == 'after',
                insertEl;
	        	
	        if(Ext.isArray(el)){
                insertEl = me;
	            Ext.each(el, function(e) {
		            rt = Ext.fly(insertEl, '_internal').insertSibling(e, where, returnDom);
                    if(isAfter){
                        insertEl = rt;
                    }
	            });
	            return rt;
	        }
	                
	        el = el || {};
	       	
            if(el.nodeType || el.dom){
                rt = me.dom.parentNode.insertBefore(GETDOM(el), isAfter ? me.dom.nextSibling : me.dom);
                if (!returnDom) {
                    rt = GET(rt);
                }
            }else{
                if (isAfter && !me.dom.nextSibling) {
                    rt = DH.append(me.dom.parentNode, el, !returnDom);
                } else {                    
                    rt = DH[isAfter ? 'insertAfter' : 'insertBefore'](me.dom, el, !returnDom);
                }
            }
	        return rt;
	    }
    };
}());/**
 * @class Ext.Element
 */
Ext.Element.addMethods(function(){
    // local style camelizing for speed
    var propCache = {},
        camelRe = /(-[a-z])/gi,
        classReCache = {},
        view = document.defaultView,
        propFloat = Ext.isIE ? 'styleFloat' : 'cssFloat',
        opacityRe = /alpha\(opacity=(.*)\)/i,
        trimRe = /^\s+|\s+$/g,
        spacesRe = /\s+/,
        wordsRe = /\w/g,
        EL = Ext.Element,
        PADDING = "padding",
        MARGIN = "margin",
        BORDER = "border",
        LEFT = "-left",
        RIGHT = "-right",
        TOP = "-top",
        BOTTOM = "-bottom",
        WIDTH = "-width",
        MATH = Math,
        HIDDEN = 'hidden',
        ISCLIPPED = 'isClipped',
        OVERFLOW = 'overflow',
        OVERFLOWX = 'overflow-x',
        OVERFLOWY = 'overflow-y',
        ORIGINALCLIP = 'originalClip',
        // special markup used throughout Ext when box wrapping elements
        borders = {l: BORDER + LEFT + WIDTH, r: BORDER + RIGHT + WIDTH, t: BORDER + TOP + WIDTH, b: BORDER + BOTTOM + WIDTH},
        paddings = {l: PADDING + LEFT, r: PADDING + RIGHT, t: PADDING + TOP, b: PADDING + BOTTOM},
        margins = {l: MARGIN + LEFT, r: MARGIN + RIGHT, t: MARGIN + TOP, b: MARGIN + BOTTOM},
        data = Ext.Element.data;


    // private
    function camelFn(m, a) {
        return a.charAt(1).toUpperCase();
    }

    function chkCache(prop) {
        return propCache[prop] || (propCache[prop] = prop == 'float' ? propFloat : prop.replace(camelRe, camelFn));
    }

    return {
        // private  ==> used by Fx
        adjustWidth : function(width) {
            var me = this;
            var isNum = (typeof width == "number");
            if(isNum && me.autoBoxAdjust && !me.isBorderBox()){
               width -= (me.getBorderWidth("lr") + me.getPadding("lr"));
            }
            return (isNum && width < 0) ? 0 : width;
        },

        // private   ==> used by Fx
        adjustHeight : function(height) {
            var me = this;
            var isNum = (typeof height == "number");
            if(isNum && me.autoBoxAdjust && !me.isBorderBox()){
               height -= (me.getBorderWidth("tb") + me.getPadding("tb"));
            }
            return (isNum && height < 0) ? 0 : height;
        },


        /**
         * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
         * @param {String/Array} className The CSS class to add, or an array of classes
         * @return {Ext.Element} this
         */
        addClass : function(className){
            var me = this,
                i,
                len,
                v,
                cls = [];
            // Separate case is for speed
            if (!Ext.isArray(className)) {
                if (typeof className == 'string' && !this.hasClass(className)) {
                    me.dom.className += " " + className;
                }
            }
            else {
                for (i = 0, len = className.length; i < len; i++) {
                    v = className[i];
                    if (typeof v == 'string' && (' ' + me.dom.className + ' ').indexOf(' ' + v + ' ') == -1) {
                        cls.push(v);
                    }
                }
                if (cls.length) {
                    me.dom.className += " " + cls.join(" ");
                }
            }
            return me;
        },

        /**
         * Removes one or more CSS classes from the element.
         * @param {String/Array} className The CSS class to remove, or an array of classes
         * @return {Ext.Element} this
         */
        removeClass : function(className){
            var me = this,
                i,
                idx,
                len,
                cls,
                elClasses;
            if (!Ext.isArray(className)){
                className = [className];
            }
            if (me.dom && me.dom.className) {
                elClasses = me.dom.className.replace(trimRe, '').split(spacesRe);
                for (i = 0, len = className.length; i < len; i++) {
                    cls = className[i];
                    if (typeof cls == 'string') {
                        cls = cls.replace(trimRe, '');
                        idx = elClasses.indexOf(cls);
                        if (idx != -1) {
                            elClasses.splice(idx, 1);
                        }
                    }
                }
                me.dom.className = elClasses.join(" ");
            }
            return me;
        },

        /**
         * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
         * @param {String/Array} className The CSS class to add, or an array of classes
         * @return {Ext.Element} this
         */
        radioClass : function(className){
            var cn = this.dom.parentNode.childNodes,
                v,
                i,
                len;
            className = Ext.isArray(className) ? className : [className];
            for (i = 0, len = cn.length; i < len; i++) {
                v = cn[i];
                if (v && v.nodeType == 1) {
                    Ext.fly(v, '_internal').removeClass(className);
                }
            };
            return this.addClass(className);
        },

        /**
         * Toggles the specified CSS class on this element (removes it if it already exists, otherwise adds it).
         * @param {String} className The CSS class to toggle
         * @return {Ext.Element} this
         */
        toggleClass : function(className){
            return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
        },

        /**
         * Checks if the specified CSS class exists on this element's DOM node.
         * @param {String} className The CSS class to check for
         * @return {Boolean} True if the class exists, else false
         */
        hasClass : function(className){
            return className && (' '+this.dom.className+' ').indexOf(' '+className+' ') != -1;
        },

        /**
         * Replaces a CSS class on the element with another.  If the old name does not exist, the new name will simply be added.
         * @param {String} oldClassName The CSS class to replace
         * @param {String} newClassName The replacement CSS class
         * @return {Ext.Element} this
         */
        replaceClass : function(oldClassName, newClassName){
            return this.removeClass(oldClassName).addClass(newClassName);
        },

        isStyle : function(style, val) {
            return this.getStyle(style) == val;
        },

        /**
         * Normalizes currentStyle and computedStyle.
         * @param {String} property The style property whose value is returned.
         * @return {String} The current value of the style property for this element.
         */
        getStyle : function(){
            return view && view.getComputedStyle ?
                function(prop){
                    var el = this.dom,
                        v,
                        cs,
                        out,
                        display,
                        wk = Ext.isWebKit,
                        display;

                    if(el == document){
                        return null;
                    }
                    prop = chkCache(prop);
                    // Fix bug caused by this: https://bugs.webkit.org/show_bug.cgi?id=13343
                    if(wk && /marginRight/.test(prop)){
                        display = this.getStyle('display');
                        el.style.display = 'inline-block';
                    }
                    out = (v = el.style[prop]) ? v :
                           (cs = view.getComputedStyle(el, "")) ? cs[prop] : null;

                    // Webkit returns rgb values for transparent.
                    if(wk){
                        if(out == 'rgba(0, 0, 0, 0)'){
                            out = 'transparent';
                        }else if(display){
                            el.style.display = display;
                        }
                    }
                    return out;
                } :
                function(prop){
                    var el = this.dom,
                        m,
                        cs;

                    if(el == document) return null;
                    if (prop == 'opacity') {
                        if (el.style.filter.match) {
                            if(m = el.style.filter.match(opacityRe)){
                                var fv = parseFloat(m[1]);
                                if(!isNaN(fv)){
                                    return fv ? fv / 100 : 0;
                                }
                            }
                        }
                        return 1;
                    }
                    prop = chkCache(prop);
                    return el.style[prop] || ((cs = el.currentStyle) ? cs[prop] : null);
                };
        }(),

        /**
         * Return the CSS color for the specified CSS attribute. rgb, 3 digit (like #fff) and valid values
         * are convert to standard 6 digit hex color.
         * @param {String} attr The css attribute
         * @param {String} defaultValue The default value to use when a valid color isn't found
         * @param {String} prefix (optional) defaults to #. Use an empty string when working with
         * color anims.
         */
        getColor : function(attr, defaultValue, prefix){
            var v = this.getStyle(attr),
                color = (typeof prefix != 'undefined') ? prefix : '#',
                h;

            if(!v || /transparent|inherit/.test(v)){
                return defaultValue;
            }
            if(/^r/.test(v)){
                Ext.each(v.slice(4, v.length -1).split(','), function(s){
                    h = parseInt(s, 10);
                    color += (h < 16 ? '0' : '') + h.toString(16);
                });
            }else{
                v = v.replace('#', '');
                color += v.length == 3 ? v.replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3') : v;
            }
            return(color.length > 5 ? color.toLowerCase() : defaultValue);
        },

        /**
         * Wrapper for setting style properties, also takes single object parameter of multiple styles.
         * @param {String/Object} property The style property to be set, or an object of multiple styles.
         * @param {String} value (optional) The value to apply to the given property, or null if an object was passed.
         * @return {Ext.Element} this
         */
        setStyle : function(prop, value){
            var tmp,
                style,
                camel;
            if (typeof prop != 'object') {
                tmp = {};
                tmp[prop] = value;
                prop = tmp;
            }
            for (style in prop) {
                value = prop[style];
                style == 'opacity' ?
                    this.setOpacity(value) :
                    this.dom.style[chkCache(style)] = value;
            }
            return this;
        },

        /**
         * Set the opacity of the element
         * @param {Float} opacity The new opacity. 0 = transparent, .5 = 50% visibile, 1 = fully visible, etc
         * @param {Boolean/Object} animate (optional) a standard Element animation config object or <tt>true</tt> for
         * the default animation (<tt>{duration: .35, easing: 'easeIn'}</tt>)
         * @return {Ext.Element} this
         */
         setOpacity : function(opacity, animate){
            var me = this,
                s = me.dom.style;

            if(!animate || !me.anim){
                if(Ext.isIE){
                    var opac = opacity < 1 ? 'alpha(opacity=' + opacity * 100 + ')' : '',
                    val = s.filter.replace(opacityRe, '').replace(trimRe, '');

                    s.zoom = 1;
                    s.filter = val + (val.length > 0 ? ' ' : '') + opac;
                }else{
                    s.opacity = opacity;
                }
            }else{
                me.anim({opacity: {to: opacity}}, me.preanim(arguments, 1), null, .35, 'easeIn');
            }
            return me;
        },

        /**
         * Clears any opacity settings from this element. Required in some cases for IE.
         * @return {Ext.Element} this
         */
        clearOpacity : function(){
            var style = this.dom.style;
            if(Ext.isIE){
                if(!Ext.isEmpty(style.filter)){
                    style.filter = style.filter.replace(opacityRe, '').replace(trimRe, '');
                }
            }else{
                style.opacity = style['-moz-opacity'] = style['-khtml-opacity'] = '';
            }
            return this;
        },

        /**
         * Returns the offset height of the element
         * @param {Boolean} contentHeight (optional) true to get the height minus borders and padding
         * @return {Number} The element's height
         */
        getHeight : function(contentHeight){
            var me = this,
                dom = me.dom,
                hidden = Ext.isIE && me.isStyle('display', 'none'),
                h = MATH.max(dom.offsetHeight, hidden ? 0 : dom.clientHeight) || 0;

            h = !contentHeight ? h : h - me.getBorderWidth("tb") - me.getPadding("tb");
            return h < 0 ? 0 : h;
        },

        /**
         * Returns the offset width of the element
         * @param {Boolean} contentWidth (optional) true to get the width minus borders and padding
         * @return {Number} The element's width
         */
        getWidth : function(contentWidth){
            var me = this,
                dom = me.dom,
                hidden = Ext.isIE && me.isStyle('display', 'none'),
                w = MATH.max(dom.offsetWidth, hidden ? 0 : dom.clientWidth) || 0;
            w = !contentWidth ? w : w - me.getBorderWidth("lr") - me.getPadding("lr");
            return w < 0 ? 0 : w;
        },

        /**
         * Set the width of this Element.
         * @param {Mixed} width The new width. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS width style. Animation may <b>not</b> be used.
         * </ul></div>
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Ext.Element} this
         */
        setWidth : function(width, animate){
            var me = this;
            width = me.adjustWidth(width);
            !animate || !me.anim ?
                me.dom.style.width = me.addUnits(width) :
                me.anim({width : {to : width}}, me.preanim(arguments, 1));
            return me;
        },

        /**
         * Set the height of this Element.
         * <pre><code>
// change the height to 200px and animate with default configuration
Ext.fly('elementId').setHeight(200, true);

// change the height to 150px and animate with a custom configuration
Ext.fly('elId').setHeight(150, {
    duration : .5, // animation will have a duration of .5 seconds
    // will change the content to "finished"
    callback: function(){ this.{@link #update}("finished"); }
});
         * </code></pre>
         * @param {Mixed} height The new height. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels.)</li>
         * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
         * </ul></div>
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Ext.Element} this
         */
         setHeight : function(height, animate){
            var me = this;
            height = me.adjustHeight(height);
            !animate || !me.anim ?
                me.dom.style.height = me.addUnits(height) :
                me.anim({height : {to : height}}, me.preanim(arguments, 1));
            return me;
        },

        /**
         * Gets the width of the border(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing <tt>'lr'</tt> would get the border <b><u>l</u></b>eft width + the border <b><u>r</u></b>ight width.
         * @return {Number} The width of the sides passed added together
         */
        getBorderWidth : function(side){
            return this.addStyles(side, borders);
        },

        /**
         * Gets the width of the padding(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing <tt>'lr'</tt> would get the padding <b><u>l</u></b>eft + the padding <b><u>r</u></b>ight.
         * @return {Number} The padding of the sides passed added together
         */
        getPadding : function(side){
            return this.addStyles(side, paddings);
        },

        /**
         *  Store the current overflow setting and clip overflow on the element - use <tt>{@link #unclip}</tt> to remove
         * @return {Ext.Element} this
         */
        clip : function(){
            var me = this,
                dom = me.dom;

            if(!data(dom, ISCLIPPED)){
                data(dom, ISCLIPPED, true);
                data(dom, ORIGINALCLIP, {
                    o: me.getStyle(OVERFLOW),
                    x: me.getStyle(OVERFLOWX),
                    y: me.getStyle(OVERFLOWY)
                });
                me.setStyle(OVERFLOW, HIDDEN);
                me.setStyle(OVERFLOWX, HIDDEN);
                me.setStyle(OVERFLOWY, HIDDEN);
            }
            return me;
        },

        /**
         *  Return clipping (overflow) to original clipping before <tt>{@link #clip}</tt> was called
         * @return {Ext.Element} this
         */
        unclip : function(){
            var me = this,
                dom = me.dom;

            if(data(dom, ISCLIPPED)){
                data(dom, ISCLIPPED, false);
                var o = data(dom, ORIGINALCLIP);
                if(o.o){
                    me.setStyle(OVERFLOW, o.o);
                }
                if(o.x){
                    me.setStyle(OVERFLOWX, o.x);
                }
                if(o.y){
                    me.setStyle(OVERFLOWY, o.y);
                }
            }
            return me;
        },

        // private
        addStyles : function(sides, styles){
            var ttlSize = 0,
                sidesArr = sides.match(wordsRe),
                side,
                size,
                i,
                len = sidesArr.length;
            for (i = 0; i < len; i++) {
                side = sidesArr[i];
                size = side && parseInt(this.getStyle(styles[side]), 10);
                if (size) {
                    ttlSize += MATH.abs(size);
                }
            }
            return ttlSize;
        },

        margins : margins
    }
}()
);
/**
 * @class Ext.Element
 */

// special markup used throughout Ext when box wrapping elements
Ext.Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';

Ext.Element.addMethods(function(){
    var INTERNAL = "_internal",
        pxMatch = /(\d+\.?\d+)px/;
    return {
        /**
         * More flexible version of {@link #setStyle} for setting style properties.
         * @param {String/Object/Function} styles A style specification string, e.g. "width:100px", or object in the form {width:"100px"}, or
         * a function which returns such a specification.
         * @return {Ext.Element} this
         */
        applyStyles : function(style){
            Ext.DomHelper.applyStyles(this.dom, style);
            return this;
        },

        /**
         * Returns an object with properties matching the styles requested.
         * For example, el.getStyles('color', 'font-size', 'width') might return
         * {'color': '#FFFFFF', 'font-size': '13px', 'width': '100px'}.
         * @param {String} style1 A style name
         * @param {String} style2 A style name
         * @param {String} etc.
         * @return {Object} The style object
         */
        getStyles : function(){
            var ret = {};
            Ext.each(arguments, function(v) {
               ret[v] = this.getStyle(v);
            },
            this);
            return ret;
        },

        // private  ==> used by ext full
        setOverflow : function(v){
            var dom = this.dom;
            if(v=='auto' && Ext.isMac && Ext.isGecko2){ // work around stupid FF 2.0/Mac scroll bar bug
                dom.style.overflow = 'hidden';
                (function(){dom.style.overflow = 'auto';}).defer(1);
            }else{
                dom.style.overflow = v;
            }
        },

       /**
        * <p>Wraps the specified element with a special 9 element markup/CSS block that renders by default as
        * a gray container with a gradient background, rounded corners and a 4-way shadow.</p>
        * <p>This special markup is used throughout Ext when box wrapping elements ({@link Ext.Button},
        * {@link Ext.Panel} when <tt>{@link Ext.Panel#frame frame=true}</tt>, {@link Ext.Window}).  The markup
        * is of this form:</p>
        * <pre><code>
    Ext.Element.boxMarkup =
    &#39;&lt;div class="{0}-tl">&lt;div class="{0}-tr">&lt;div class="{0}-tc">&lt;/div>&lt;/div>&lt;/div>
     &lt;div class="{0}-ml">&lt;div class="{0}-mr">&lt;div class="{0}-mc">&lt;/div>&lt;/div>&lt;/div>
     &lt;div class="{0}-bl">&lt;div class="{0}-br">&lt;div class="{0}-bc">&lt;/div>&lt;/div>&lt;/div>&#39;;
        * </code></pre>
        * <p>Example usage:</p>
        * <pre><code>
    // Basic box wrap
    Ext.get("foo").boxWrap();

    // You can also add a custom class and use CSS inheritance rules to customize the box look.
    // 'x-box-blue' is a built-in alternative -- look at the related CSS definitions as an example
    // for how to create a custom box wrap style.
    Ext.get("foo").boxWrap().addClass("x-box-blue");
        * </code></pre>
        * @param {String} class (optional) A base CSS class to apply to the containing wrapper element
        * (defaults to <tt>'x-box'</tt>). Note that there are a number of CSS rules that are dependent on
        * this name to make the overall effect work, so if you supply an alternate base class, make sure you
        * also supply all of the necessary rules.
        * @return {Ext.Element} The outermost wrapping element of the created box structure.
        */
        boxWrap : function(cls){
            cls = cls || 'x-box';
            var el = Ext.get(this.insertHtml("beforeBegin", "<div class='" + cls + "'>" + String.format(Ext.Element.boxMarkup, cls) + "</div>"));        //String.format('<div class="{0}">'+Ext.Element.boxMarkup+'</div>', cls)));
            Ext.DomQuery.selectNode('.' + cls + '-mc', el.dom).appendChild(this.dom);
            return el;
        },

        /**
         * Set the size of this Element. If animation is true, both width and height will be animated concurrently.
         * @param {Mixed} width The new width. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS width style. Animation may <b>not</b> be used.
         * <li>A size object in the format <code>{width: widthValue, height: heightValue}</code>.</li>
         * </ul></div>
         * @param {Mixed} height The new height. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
         * </ul></div>
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Ext.Element} this
         */
        setSize : function(width, height, animate){
            var me = this;
            if(typeof width == 'object'){ // in case of object from getSize()
                height = width.height;
                width = width.width;
            }
            width = me.adjustWidth(width);
            height = me.adjustHeight(height);
            if(!animate || !me.anim){
                me.dom.style.width = me.addUnits(width);
                me.dom.style.height = me.addUnits(height);
            }else{
                me.anim({width: {to: width}, height: {to: height}}, me.preanim(arguments, 2));
            }
            return me;
        },

        /**
         * Returns either the offsetHeight or the height of this element based on CSS height adjusted by padding or borders
         * when needed to simulate offsetHeight when offsets aren't available. This may not work on display:none elements
         * if a height has not been set using CSS.
         * @return {Number}
         */
        getComputedHeight : function(){
            var me = this,
                h = Math.max(me.dom.offsetHeight, me.dom.clientHeight);
            if(!h){
                h = parseFloat(me.getStyle('height')) || 0;
                if(!me.isBorderBox()){
                    h += me.getFrameWidth('tb');
                }
            }
            return h;
        },

        /**
         * Returns either the offsetWidth or the width of this element based on CSS width adjusted by padding or borders
         * when needed to simulate offsetWidth when offsets aren't available. This may not work on display:none elements
         * if a width has not been set using CSS.
         * @return {Number}
         */
        getComputedWidth : function(){
            var w = Math.max(this.dom.offsetWidth, this.dom.clientWidth);
            if(!w){
                w = parseFloat(this.getStyle('width')) || 0;
                if(!this.isBorderBox()){
                    w += this.getFrameWidth('lr');
                }
            }
            return w;
        },

        /**
         * Returns the sum width of the padding and borders for the passed "sides". See getBorderWidth()
         for more information about the sides.
         * @param {String} sides
         * @return {Number}
         */
        getFrameWidth : function(sides, onlyContentBox){
            return onlyContentBox && this.isBorderBox() ? 0 : (this.getPadding(sides) + this.getBorderWidth(sides));
        },

        /**
         * Sets up event handlers to add and remove a css class when the mouse is over this element
         * @param {String} className
         * @return {Ext.Element} this
         */
        addClassOnOver : function(className){
            this.hover(
                function(){
                    Ext.fly(this, INTERNAL).addClass(className);
                },
                function(){
                    Ext.fly(this, INTERNAL).removeClass(className);
                }
            );
            return this;
        },

        /**
         * Sets up event handlers to add and remove a css class when this element has the focus
         * @param {String} className
         * @return {Ext.Element} this
         */
        addClassOnFocus : function(className){
            this.on("focus", function(){
                Ext.fly(this, INTERNAL).addClass(className);
            }, this.dom);
            this.on("blur", function(){
                Ext.fly(this, INTERNAL).removeClass(className);
            }, this.dom);
            return this;
        },

        /**
         * Sets up event handlers to add and remove a css class when the mouse is down and then up on this element (a click effect)
         * @param {String} className
         * @return {Ext.Element} this
         */
        addClassOnClick : function(className){
            var dom = this.dom;
            this.on("mousedown", function(){
                Ext.fly(dom, INTERNAL).addClass(className);
                var d = Ext.getDoc(),
                    fn = function(){
                        Ext.fly(dom, INTERNAL).removeClass(className);
                        d.removeListener("mouseup", fn);
                    };
                d.on("mouseup", fn);
            });
            return this;
        },

        /**
         * <p>Returns the dimensions of the element available to lay content out in.<p>
         * <p>If the element (or any ancestor element) has CSS style <code>display : none</code>, the dimensions will be zero.</p>
         * example:<pre><code>
        var vpSize = Ext.getBody().getViewSize();

        // all Windows created afterwards will have a default value of 90% height and 95% width
        Ext.Window.override({
            width: vpSize.width * 0.9,
            height: vpSize.height * 0.95
        });
        // To handle window resizing you would have to hook onto onWindowResize.
        * </code></pre>
        *
        * getViewSize utilizes clientHeight/clientWidth which excludes sizing of scrollbars.
        * To obtain the size including scrollbars, use getStyleSize
        *
        * Sizing of the document body is handled at the adapter level which handles special cases for IE and strict modes, etc.
        */

        getViewSize : function(){
            var doc = document,
                d = this.dom,
                isDoc = (d == doc || d == doc.body);

            // If the body, use Ext.lib.Dom
            if (isDoc) {
                var extdom = Ext.lib.Dom;
                return {
                    width : extdom.getViewWidth(),
                    height : extdom.getViewHeight()
                };

            // Else use clientHeight/clientWidth
            } else {
                return {
                    width : d.clientWidth,
                    height : d.clientHeight
                }
            }
        },

        /**
        * <p>Returns the dimensions of the element available to lay content out in.<p>
        *
        * getStyleSize utilizes prefers style sizing if present, otherwise it chooses the larger of offsetHeight/clientHeight and offsetWidth/clientWidth.
        * To obtain the size excluding scrollbars, use getViewSize
        *
        * Sizing of the document body is handled at the adapter level which handles special cases for IE and strict modes, etc.
        */

        getStyleSize : function(){
            var me = this,
                w, h,
                doc = document,
                d = this.dom,
                isDoc = (d == doc || d == doc.body),
                s = d.style;

            // If the body, use Ext.lib.Dom
            if (isDoc) {
                var extdom = Ext.lib.Dom;
                return {
                    width : extdom.getViewWidth(),
                    height : extdom.getViewHeight()
                }
            }
            // Use Styles if they are set
            if(s.width && s.width != 'auto'){
                w = parseFloat(s.width);
                if(me.isBorderBox()){
                   w -= me.getFrameWidth('lr');
                }
            }
            // Use Styles if they are set
            if(s.height && s.height != 'auto'){
                h = parseFloat(s.height);
                if(me.isBorderBox()){
                   h -= me.getFrameWidth('tb');
                }
            }
            // Use getWidth/getHeight if style not set.
            return {width: w || me.getWidth(true), height: h || me.getHeight(true)};
        },

        /**
         * Returns the size of the element.
         * @param {Boolean} contentSize (optional) true to get the width/size minus borders and padding
         * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
         */
        getSize : function(contentSize){
            return {width: this.getWidth(contentSize), height: this.getHeight(contentSize)};
        },

        /**
         * Forces the browser to repaint this element
         * @return {Ext.Element} this
         */
        repaint : function(){
            var dom = this.dom;
            this.addClass("x-repaint");
            setTimeout(function(){
                Ext.fly(dom).removeClass("x-repaint");
            }, 1);
            return this;
        },

        /**
         * Disables text selection for this element (normalized across browsers)
         * @return {Ext.Element} this
         */
        unselectable : function(){
            this.dom.unselectable = "on";
            return this.swallowEvent("selectstart", true).
                        applyStyles("-moz-user-select:none;-khtml-user-select:none;").
                        addClass("x-unselectable");
        },

        /**
         * Returns an object with properties top, left, right and bottom representing the margins of this element unless sides is passed,
         * then it returns the calculated width of the sides (see getPadding)
         * @param {String} sides (optional) Any combination of l, r, t, b to get the sum of those sides
         * @return {Object/Number}
         */
        getMargins : function(side){
            var me = this,
                key,
                hash = {t:"top", l:"left", r:"right", b: "bottom"},
                o = {};

            if (!side) {
                for (key in me.margins){
                    o[hash[key]] = parseFloat(me.getStyle(me.margins[key])) || 0;
                }
                return o;
            } else {
                return me.addStyles.call(me, side, me.margins);
            }
        }
    };
}());
/**
 * @class Ext.Element
 */
(function(){
var D = Ext.lib.Dom,
        LEFT = "left",
        RIGHT = "right",
        TOP = "top",
        BOTTOM = "bottom",
        POSITION = "position",
        STATIC = "static",
        RELATIVE = "relative",
        AUTO = "auto",
        ZINDEX = "z-index";

Ext.Element.addMethods({
	/**
      * Gets the current X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Number} The X position of the element
      */
    getX : function(){
        return D.getX(this.dom);
    },

    /**
      * Gets the current Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Number} The Y position of the element
      */
    getY : function(){
        return D.getY(this.dom);
    },

    /**
      * Gets the current position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Array} The XY position of the element
      */
    getXY : function(){
        return D.getXY(this.dom);
    },

    /**
      * Returns the offsets of this element from the passed element. Both element must be part of the DOM tree and not have display:none to have page coordinates.
      * @param {Mixed} element The element to get the offsets from.
      * @return {Array} The XY page offsets (e.g. [100, -200])
      */
    getOffsetsTo : function(el){
        var o = this.getXY(),
        	e = Ext.fly(el, '_internal').getXY();
        return [o[0]-e[0],o[1]-e[1]];
    },

    /**
     * Sets the X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Number} The X position of the element
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.Element} this
     */
    setX : function(x, animate){	    
	    return this.setXY([x, this.getY()], this.animTest(arguments, animate, 1));
    },

    /**
     * Sets the Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Number} The Y position of the element
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.Element} this
     */
    setY : function(y, animate){	    
	    return this.setXY([this.getX(), y], this.animTest(arguments, animate, 1));
    },

    /**
     * Sets the element's left position directly using CSS style (instead of {@link #setX}).
     * @param {String} left The left CSS property value
     * @return {Ext.Element} this
     */
    setLeft : function(left){
        this.setStyle(LEFT, this.addUnits(left));
        return this;
    },

    /**
     * Sets the element's top position directly using CSS style (instead of {@link #setY}).
     * @param {String} top The top CSS property value
     * @return {Ext.Element} this
     */
    setTop : function(top){
        this.setStyle(TOP, this.addUnits(top));
        return this;
    },

    /**
     * Sets the element's CSS right style.
     * @param {String} right The right CSS property value
     * @return {Ext.Element} this
     */
    setRight : function(right){
        this.setStyle(RIGHT, this.addUni