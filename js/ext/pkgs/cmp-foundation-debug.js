/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.ComponentMgr
 * <p>Provides a registry of all Components (instances of {@link Ext.Component} or any subclass
 * thereof) on a page so that they can be easily accessed by {@link Ext.Component component}
 * {@link Ext.Component#id id} (see {@link #get}, or the convenience method {@link Ext#getCmp Ext.getCmp}).</p>
 * <p>This object also provides a registry of available Component <i>classes</i>
 * indexed by a mnemonic code known as the Component's {@link Ext.Component#xtype xtype}.
 * The <code>{@link Ext.Component#xtype xtype}</code> provides a way to avoid instantiating child Components
 * when creating a full, nested config object for a complete Ext page.</p>
 * <p>A child Component may be specified simply as a <i>config object</i>
 * as long as the correct <code>{@link Ext.Component#xtype xtype}</code> is specified so that if and when the Component
 * needs rendering, the correct type can be looked up for lazy instantiation.</p>
 * <p>For a list of all available <code>{@link Ext.Component#xtype xtypes}</code>, see {@link Ext.Component}.</p>
 * @singleton
 */
Ext.ComponentMgr = function(){
    var all = new Ext.util.MixedCollection();
    var types = {};
    var ptypes = {};

    return {
        /**
         * Registers a component.
         * @param {Ext.Component} c The component
         */
        register : function(c){
            all.add(c);
        },

        /**
         * Unregisters a component.
         * @param {Ext.Component} c The component
         */
        unregister : function(c){
            all.remove(c);
        },

        /**
         * Returns a component by {@link Ext.Component#id id}.
         * For additional details see {@link Ext.util.MixedCollection#get}.
         * @param {String} id The component {@link Ext.Component#id id}
         * @return Ext.Component The Component, <code>undefined</code> if not found, or <code>null</code> if a
         * Class was found.
         */
        get : function(id){
            return all.get(id);
        },

        /**
         * Registers a function that will be called when a Component with the specified id is added to ComponentMgr. This will happen on instantiation.
         * @param {String} id The component {@link Ext.Component#id id}
         * @param {Function} fn The callback function
         * @param {Object} scope The scope (<code>this</code> reference) in which the callback is executed. Defaults to the Component.
         */
        onAvailable : function(id, fn, scope){
            all.on("add", function(index, o){
                if(o.id == id){
                    fn.call(scope || o, o);
                    all.un("add", fn, scope);
                }
            });
        },

        /**
         * The MixedCollection used internally for the component cache. An example usage may be subscribing to
         * events on the MixedCollection to monitor addition or removal.  Read-only.
         * @type {MixedCollection}
         */
        all : all,
        
        /**
         * The xtypes that have been registered with the component manager.
         * @type {Object}
         */
        types : types,
        
        /**
         * The ptypes that have been registered with the component manager.
         * @type {Object}
         */
        ptypes: ptypes,
        
        /**
         * Checks if a Component type is registered.
         * @param {Ext.Component} xtype The mnemonic string by which the Component class may be looked up
         * @return {Boolean} Whether the type is registered.
         */
        isRegistered : function(xtype){
            return types[xtype] !== undefined;    
        },
        
        /**
         * Checks if a Plugin type is registered.
         * @param {Ext.Component} ptype The mnemonic string by which the Plugin class may be looked up
         * @return {Boolean} Whether the type is registered.
         */
        isPluginRegistered : function(ptype){
            return ptypes[ptype] !== undefined;    
        },        

        /**
         * <p>Registers a new Component constructor, keyed by a new
         * {@link Ext.Component#xtype}.</p>
         * <p>Use this method (or its alias {@link Ext#reg Ext.reg}) to register new
         * subclasses of {@link Ext.Component} so that lazy instantiation may be used when specifying
         * child Components.
         * see {@link Ext.Container#items}</p>
         * @param {String} xtype The mnemonic string by which the Component class may be looked up.
         * @param {Constructor} cls The new Component class.
         */
        registerType : function(xtype, cls){
            types[xtype] = cls;
            cls.xtype = xtype;
        },

        /**
         * Creates a new Component from the specified config object using the
         * config object's {@link Ext.component#xtype xtype} to determine the class to instantiate.
         * @param {Object} config A configuration object for the Component you wish to create.
         * @param {Constructor} defaultType The constructor to provide the default Component type if
         * the config object does not contain a <code>xtype</code>. (Optional if the config contains a <code>xtype</code>).
         * @return {Ext.Component} The newly instantiated Component.
         */
        create : function(config, defaultType){
            return config.render ? config : new types[config.xtype || defaultType](config);
        },

        /**
         * <p>Registers a new Plugin constructor, keyed by a new
         * {@link Ext.Component#ptype}.</p>
         * <p>Use this method (or its alias {@link Ext#preg Ext.preg}) to register new
         * plugins for {@link Ext.Component}s so that lazy instantiation may be used when specifying
         * Plugins.</p>
         * @param {String} ptype The mnemonic string by which the Plugin class may be looked up.
         * @param {Constructor} cls The new Plugin class.
         */
        registerPlugin : function(ptype, cls){
            ptypes[ptype] = cls;
            cls.ptype = ptype;
        },

        /**
         * Creates a new Plugin from the specified config object using the
         * config object's {@link Ext.component#ptype ptype} to determine the class to instantiate.
         * @param {Object} config A configuration object for the Plugin you wish to create.
         * @param {Constructor} defaultType The constructor to provide the default Plugin type if
         * the config object does not contain a <code>ptype</code>. (Optional if the config contains a <code>ptype</code>).
         * @return {Ext.Component} The newly instantiated Plugin.
         */
        createPlugin : function(config, defaultType){
            var PluginCls = ptypes[config.ptype || defaultType];
            if (PluginCls.init) {
                return PluginCls;                
            } else {
                return new PluginCls(config);
            }            
        }
    };
}();

/**
 * Shorthand for {@link Ext.ComponentMgr#registerType}
 * @param {String} xtype The {@link Ext.component#xtype mnemonic string} by which the Component class
 * may be looked up.
 * @param {Constructor} cls The new Component class.
 * @member Ext
 * @method reg
 */
Ext.reg = Ext.ComponentMgr.registerType; // this will be called a lot internally, shorthand to keep the bytes down
/**
 * Shorthand for {@link Ext.ComponentMgr#registerPlugin}
 * @param {String} ptype The {@link Ext.component#ptype mnemonic string} by which the Plugin class
 * may be looked up.
 * @param {Constructor} cls The new Plugin class.
 * @member Ext
 * @method preg
 */
Ext.preg = Ext.ComponentMgr.registerPlugin;
/**
 * Shorthand for {@link Ext.ComponentMgr#create}
 * Creates a new Component from the specified config object using the
 * config object's {@link Ext.component#xtype xtype} to determine the class to instantiate.
 * @param {Object} config A configuration object for the Component you wish to create.
 * @param {Constructor} defaultType The constructor to provide the default Component type if
 * the config object does not contain a <code>xtype</code>. (Optional if the config contains a <code>xtype</code>).
 * @return {Ext.Component} The newly instantiated Component.
 * @member Ext
 * @method create
 */
Ext.create = Ext.ComponentMgr.create;/**
 * @class Ext.Component
 * @extends Ext.util.Observable
 * <p>Base class for all Ext components.  All subclasses of Component may participate in the automated
 * Ext component lifecycle of creation, rendering and destruction which is provided by the {@link Ext.Container Container} class.
 * Components may be added to a Container through the {@link Ext.Container#items items} config option at the time the Container is created,
 * or they may be added dynamically via the {@link Ext.Container#add add} method.</p>
 * <p>The Component base class has built-in support for basic hide/show and enable/disable behavior.</p>
 * <p>All Components are registered with the {@link Ext.ComponentMgr} on construction so that they can be referenced at any time via
 * {@link Ext#getCmp}, passing the {@link #id}.</p>
 * <p>All user-developed visual widgets that are required to participate in automated lifecycle and size management should subclass Component (or
 * {@link Ext.BoxComponent} if managed box model handling is required, ie height and width management).</p>
 * <p>See the <a href="http://extjs.com/learn/Tutorial:Creating_new_UI_controls">Creating new UI controls</a> tutorial for details on how
 * and to either extend or augment ExtJs base classes to create custom Components.</p>
 * <p>Every component has a specific xtype, which is its Ext-specific type name, along with methods for checking the
 * xtype like {@link #getXType} and {@link #isXType}. This is the list of all valid xtypes:</p>
 * <pre>
xtype            Class
-------------    ------------------
box              {@link Ext.BoxComponent}
button           {@link Ext.Button}
buttongroup      {@link Ext.ButtonGroup}
colorpalette     {@link Ext.ColorPalette}
component        {@link Ext.Component}
container        {@link Ext.Container}
cycle            {@link Ext.CycleButton}
dataview         {@link Ext.DataView}
datepicker       {@link Ext.DatePicker}
editor           {@link Ext.Editor}
editorgrid       {@link Ext.grid.EditorGridPanel}
flash            {@link Ext.FlashComponent}
grid             {@link Ext.grid.GridPanel}
listview         {@link Ext.ListView}
panel            {@link Ext.Panel}
progress         {@link Ext.ProgressBar}
propertygrid     {@link Ext.grid.PropertyGrid}
slider           {@link Ext.Slider}
spacer           {@link Ext.Spacer}
splitbutton      {@link Ext.SplitButton}
tabpanel         {@link Ext.TabPanel}
treepanel        {@link Ext.tree.TreePanel}
viewport         {@link Ext.ViewPort}
window           {@link Ext.Window}

Toolbar components
---------------------------------------
paging           {@link Ext.PagingToolbar}
toolbar          {@link Ext.Toolbar}
tbbutton         {@link Ext.Toolbar.Button}        (deprecated; use button)
tbfill           {@link Ext.Toolbar.Fill}
tbitem           {@link Ext.Toolbar.Item}
tbseparator      {@link Ext.Toolbar.Separator}
tbspacer         {@link Ext.Toolbar.Spacer}
tbsplit          {@link Ext.Toolbar.SplitButton}   (deprecated; use splitbutton)
tbtext           {@link Ext.Toolbar.TextItem}

Menu components
---------------------------------------
menu             {@link Ext.menu.Menu}
colormenu        {@link Ext.menu.ColorMenu}
datemenu         {@link Ext.menu.DateMenu}
menubaseitem     {@link Ext.menu.BaseItem}
menucheckitem    {@link Ext.menu.CheckItem}
menuitem         {@link Ext.menu.Item}
menuseparator    {@link Ext.menu.Separator}
menutextitem     {@link Ext.menu.TextItem}

Form components
---------------------------------------
form             {@link Ext.form.FormPanel}
checkbox         {@link Ext.form.Checkbox}
checkboxgroup    {@link Ext.form.CheckboxGroup}
combo            {@link Ext.form.ComboBox}
datefield        {@link Ext.form.DateField}
displayfield     {@link Ext.form.DisplayField}
field            {@link Ext.form.Field}
fieldset         {@link Ext.form.FieldSet}
hidden           {@link Ext.form.Hidden}
htmleditor       {@link Ext.form.HtmlEditor}
label            {@link Ext.form.Label}
numberfield      {@link Ext.form.NumberField}
radio            {@link Ext.form.Radio}
radiogroup       {@link Ext.form.RadioGroup}
textarea         {@link Ext.form.TextArea}
textfield        {@link Ext.form.TextField}
timefield        {@link Ext.form.TimeField}
trigger          {@link Ext.form.TriggerField}

Chart components
---------------------------------------
chart            {@link Ext.chart.Chart}
barchart         {@link Ext.chart.BarChart}
cartesianchart   {@link Ext.chart.CartesianChart}
columnchart      {@link Ext.chart.ColumnChart}
linechart        {@link Ext.chart.LineChart}
piechart         {@link Ext.chart.PieChart}

Store xtypes
---------------------------------------
arraystore       {@link Ext.data.ArrayStore}
directstore      {@link Ext.data.DirectStore}
groupingstore    {@link Ext.data.GroupingStore}
jsonstore        {@link Ext.data.JsonStore}
simplestore      {@link Ext.data.SimpleStore}      (deprecated; use arraystore)
store            {@link Ext.data.Store}
xmlstore         {@link Ext.data.XmlStore}
</pre>
 * @constructor
 * @param {Ext.Element/String/Object} config The configuration options may be specified as either:
 * <div class="mdetail-params"><ul>
 * <li><b>an element</b> :
 * <p class="sub-desc">it is set as the internal element and its id used as the component id</p></li>
 * <li><b>a string</b> :
 * <p class="sub-desc">it is assumed to be the id of an existing element and is used as the component id</p></li>
 * <li><b>anything else</b> :
 * <p class="sub-desc">it is assumed to be a standard config object and is applied to the component</p></li>
 * </ul></div>
 */
Ext.Component = function(config){
    config = config || {};
    if(config.initialConfig){
        if(config.isAction){           // actions
            this.baseAction = config;
        }
        config = config.initialConfig; // component cloning / action set up
    }else if(config.tagName || config.dom || Ext.isString(config)){ // element object
        config = {applyTo: config, id: config.id || config};
    }

    /**
     * This Component's initial configuration specification. Read-only.
     * @type Object
     * @property initialConfig
     */
    this.initialConfig = config;

    Ext.apply(this, config);
    this.addEvents(
        /**
         * @event added
         * Fires when a component is added to an Ext.Container
         * @param {Ext.Component} this
         * @param {Ext.Container} ownerCt Container which holds the component
         * @param {number} index Position at which the component was added
         */
        'added',
        /**
         * @event disable
         * Fires after the component is disabled.
         * @param {Ext.Component} this
         */
        'disable',
        /**
         * @event enable
         * Fires after the component is enabled.
         * @param {Ext.Component} this
         */
        'enable',
        /**
         * @event beforeshow
         * Fires before the component is shown by calling the {@link #show} method.
         * Return false from an event handler to stop the show.
         * @param {Ext.Component} this
         */
        'beforeshow',
        /**
         * @event show
         * Fires after the component is shown when calling the {@link #show} method.
         * @param {Ext.Component} this
         */
        'show',
        /**
         * @event beforehide
         * Fires before the component is hidden by calling the {@link #hide} method.
         * Return false from an event handler to stop the hide.
         * @param {Ext.Component} this
         */
        'beforehide',
        /**
         * @event hide
         * Fires after the component is hidden.
         * Fires after the component is hidden when calling the {@link #hide} method.
         * @param {Ext.Component} this
         */
        'hide',
        /**
         * @event removed
         * Fires when a component is removed from an Ext.Container
         * @param {Ext.Component} this
         * @param {Ext.Container} ownerCt Container which holds the component
         */
        'removed',
        /**
         * @event beforerender
         * Fires before the component is {@link #rendered}. Return false from an
         * event handler to stop the {@link #render}.
         * @param {Ext.Component} this
         */
        'beforerender',
        /**
         * @event render
         * Fires after the component markup is {@link #rendered}.
         * @param {Ext.Component} this
         */
        'render',
        /**
         * @event afterrender
         * <p>Fires after the component rendering is finished.</p>
         * <p>The afterrender event is fired after this Component has been {@link #rendered}, been postprocesed
         * by any afterRender method defined for the Component, and, if {@link #stateful}, after state
         * has been restored.</p>
         * @param {Ext.Component} this
         */
        'afterrender',
        /**
         * @event beforedestroy
         * Fires before the component is {@link #destroy}ed. Return false from an event handler to stop the {@link #destroy}.
         * @param {Ext.Component} this
         */
        'beforedestroy',
        /**
         * @event destroy
         * Fires after the component is {@link #destroy}ed.
         * @param {Ext.Component} this
         */
        'destroy',
        /**
         * @event beforestaterestore
         * Fires before the state of the component is restored. Return false from an event handler to stop the restore.
         * @param {Ext.Component} this
         * @param {Object} state The hash of state values returned from the StateProvider. If this
         * event is not vetoed, then the state object is passed to <b><tt>applyState</tt></b>. By default,
         * that simply copies property values into this Component. The method maybe overriden to
         * provide custom state restoration.
         */
        'beforestaterestore',
        /**
         * @event staterestore
         * Fires after the state of the component is restored.
         * @param {Ext.Component} this
         * @param {Object} state The hash of state values returned from the StateProvider. This is passed
         * to <b><tt>applyState</tt></b>. By default, that simply copies property values into this
         * Component. The method maybe overriden to provide custom state restoration.
         */
        'staterestore',
        /**
         * @event beforestatesave
         * Fires before the state of the component is saved to the configured state provider. Return false to stop the save.
         * @param {Ext.Component} this
         * @param {Object} state The hash of state values. This is determined by calling
         * <b><tt>getState()</tt></b> on the Component. This method must be provided by the
         * developer to return whetever representation of state is required, by default, Ext.Component
         * has a null implementation.
         */
        'beforestatesave',
        /**
         * @event statesave
         * Fires after the state of the component is saved to the configured state provider.
         * @param {Ext.Component} this
         * @param {Object} state The hash of state values. This is determined by calling
         * <b><tt>getState()</tt></b> on the Component. This method must be provided by the
         * developer to return whetever representation of state is required, by default, Ext.Component
         * has a null implementation.
         */
        'statesave'
    );
    this.getId();
    Ext.ComponentMgr.register(this);
    Ext.Component.superclass.constructor.call(this);

    if(this.baseAction){
        this.baseAction.addComponent(this);
    }

    this.initComponent();

    if(this.plugins){
        if(Ext.isArray(this.plugins)){
            for(var i = 0, len = this.plugins.length; i < len; i++){
                this.plugins[i] = this.initPlugin(this.plugins[i]);
            }
        }else{
            this.plugins = this.initPlugin(this.plugins);
        }
    }

    if(this.stateful !== false){
        this.initState();
    }

    if(this.applyTo){
        this.applyToMarkup(this.applyTo);
        delete this.applyTo;
    }else if(this.renderTo){
        this.render(this.renderTo);
        delete this.renderTo;
    }
};

// private
Ext.Component.AUTO_ID = 1000;

Ext.extend(Ext.Component, Ext.util.Observable, {
    // Configs below are used for all Components when rendered by FormLayout.
    /**
     * @cfg {String} fieldLabel <p>The label text to display next to this Component (defaults to '').</p>
     * <br><p><b>Note</b>: this config is only used when this Component is rendered by a Container which
     * has been configured to use the <b>{@link Ext.layout.FormLayout FormLayout}</b> layout manager (e.g.
     * {@link Ext.form.FormPanel} or specifying <tt>layout:'form'</tt>).</p><br>
     * <p>Also see <tt>{@link #hideLabel}</tt> and
     * {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl}.</p>
     * Example use:<pre><code>
new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name'
    }]
});
</code></pre>
     */
    /**
     * @cfg {String} labelStyle <p>A CSS style specification string to apply directly to this field's
     * label.  Defaults to the container's labelStyle value if set (e.g.,
     * <tt>{@link Ext.layout.FormLayout#labelStyle}</tt> , or '').</p>
     * <br><p><b>Note</b>: see the note for <code>{@link #clearCls}</code>.</p><br>
     * <p>Also see <code>{@link #hideLabel}</code> and
     * <code>{@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl}.</code></p>
     * Example use:<pre><code>
new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name',
        labelStyle: 'font-weight:bold;'
    }]
});
</code></pre>
     */
    /**
     * @cfg {String} labelSeparator <p>The separator to display after the text of each
     * <tt>{@link #fieldLabel}</tt>.  This property may be configured at various levels.
     * The order of precedence is:
     * <div class="mdetail-params"><ul>
     * <li>field / component level</li>
     * <li>container level</li>
     * <li>{@link Ext.layout.FormLayout#labelSeparator layout level} (defaults to colon <tt>':'</tt>)</li>
     * </ul></div>
     * To display no separator for this field's label specify empty string ''.</p>
     * <br><p><b>Note</b>: see the note for <tt>{@link #clearCls}</tt>.</p><br>
     * <p>Also see <tt>{@link #hideLabel}</tt> and
     * {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl}.</p>
     * Example use:<pre><code>
new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    layoutConfig: {
        labelSeparator: '~'   // layout config has lowest priority (defaults to ':')
    },
    {@link Ext.layout.FormLayout#labelSeparator labelSeparator}: '>>',     // config at container level
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Field 1',
        labelSeparator: '...' // field/component level config supersedes others
    },{
        xtype: 'textfield',
        fieldLabel: 'Field 2' // labelSeparator will be '='
    }]
});
</code></pre>
     */
    /**
     * @cfg {Boolean} hideLabel <p><tt>true</tt> to completely hide the label element
     * ({@link #fieldLabel label} and {@link #labelSeparator separator}). Defaults to <tt>false</tt>.
     * By default, even if you do not specify a <tt>{@link #fieldLabel}</tt> the space will still be
     * reserved so that the field will line up with other fields that do have labels.
     * Setting this to <tt>true</tt> will cause the field to not reserve that space.</p>
     * <br><p><b>Note</b>: see the note for <tt>{@link #clearCls}</tt>.</p><br>
     * Example use:<pre><code>
new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    items: [{
        xtype: 'textfield'
        hideLabel: true
    }]
});
</code></pre>
     */
    /**
     * @cfg {String} clearCls <p>The CSS class used to to apply to the special clearing div rendered
     * directly after each form field wrapper to provide field clearing (defaults to
     * <tt>'x-form-clear-left'</tt>).</p>
     * <br><p><b>Note</b>: this config is only used when this Component is rendered by a Container
     * which has been configured to use the <b>{@link Ext.layout.FormLayout FormLayout}</b> layout
     * manager (e.g. {@link Ext.form.FormPanel} or specifying <tt>layout:'form'</tt>) and either a
     * <tt>{@link #fieldLabel}</tt> is specified or <tt>isFormField=true</tt> is specified.</p><br>
     * <p>See {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl} also.</p>
     */
    /**
     * @cfg {String} itemCls
     * <p><b>Note</b>: this config is only used when this Component is rendered by a Container which
     * has been configured to use the <b>{@link Ext.layout.FormLayout FormLayout}</b> layout manager (e.g.
     * {@link Ext.form.FormPanel} or specifying <tt>layout:'form'</tt>).</p><br>
     * <p>An additional CSS class to apply to the div wrapping the form item
     * element of this field.  If supplied, <tt>itemCls</tt> at the <b>field</b> level will override
     * the default <tt>itemCls</tt> supplied at the <b>container</b> level. The value specified for
     * <tt>itemCls</tt> will be added to the default class (<tt>'x-form-item'</tt>).</p>
     * <p>Since it is applied to the item wrapper (see
     * {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl}), it allows
     * you to write standard CSS rules that can apply to the field, the label (if specified), or
     * any other element within the markup for the field.</p>
     * <br><p><b>Note</b>: see the note for <tt>{@link #fieldLabel}</tt>.</p><br>
     * Example use:<pre><code>
// Apply a style to the field&#39;s label:
&lt;style>
    .required .x-form-item-label {font-weight:bold;color:red;}
&lt;/style>

new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name',
        itemCls: 'required' //this label will be styled
    },{
        xtype: 'textfield',
        fieldLabel: 'Favorite Color'
    }]
});
</code></pre>
     */

    /**
     * @cfg {String} id
     * <p>The <b>unique</b> id of this component (defaults to an {@link #getId auto-assigned id}).
     * You should assign an id if you need to be able to access the component later and you do
     * not have an object reference available (e.g., using {@link Ext}.{@link Ext#getCmp getCmp}).</p>
     * <p>Note that this id will also be used as the element id for the containing HTML element
     * that is rendered to the page for this component. This allows you to write id-based CSS
     * rules to style the specific instance of this component uniquely, and also to select
     * sub-elements using this component's id as the parent.</p>
     * <p><b>Note</b>: to avoid complications imposed by a unique <tt>id</tt> also see
     * <code>{@link #itemId}</code> and <code>{@link #ref}</code>.</p>
     * <p><b>Note</b>: to access the container of an item see <code>{@link #ownerCt}</code>.</p>
     */
    /**
     * @cfg {String} itemId
     * <p>An <tt>itemId</tt> can be used as an alternative way to get a reference to a component
     * when no object reference is available.  Instead of using an <code>{@link #id}</code> with
     * {@link Ext}.{@link Ext#getCmp getCmp}, use <code>itemId</code> with
     * {@link Ext.Container}.{@link Ext.Container#getComponent getComponent} which will retrieve
     * <code>itemId</code>'s or <tt>{@link #id}</tt>'s. Since <code>itemId</code>'s are an index to the
     * container's internal MixedCollection, the <code>itemId</code> is scoped locally to the container --
     * avoiding potential conflicts with {@link Ext.ComponentMgr} which requires a <b>unique</b>
     * <code>{@link #id}</code>.</p>
     * <pre><code>
var c = new Ext.Panel({ //
    {@link Ext.BoxComponent#height height}: 300,
    {@link #renderTo}: document.body,
    {@link Ext.Container#layout layout}: 'auto',
    {@link Ext.Container#items items}: [
        {
            itemId: 'p1',
            {@link Ext.Panel#title title}: 'Panel 1',
            {@link Ext.BoxComponent#height height}: 150
        },
        {
            itemId: 'p2',
            {@link Ext.Panel#title title}: 'Panel 2',
            {@link Ext.BoxComponent#height height}: 150
        }
    ]
})
p1 = c.{@link Ext.Container#getComponent getComponent}('p1'); // not the same as {@link Ext#getCmp Ext.getCmp()}
p2 = p1.{@link #ownerCt}.{@link Ext.Container#getComponent getComponent}('p2'); // reference via a sibling
     * </code></pre>
     * <p>Also see <tt>{@link #id}</tt> and <code>{@link #ref}</code>.</p>
     * <p><b>Note</b>: to access the container of an item see <tt>{@link #ownerCt}</tt>.</p>
     */
    /**
     * @cfg {String} xtype
     * The registered <tt>xtype</tt> to create. This config option is not used when passing
     * a config object into a constructor. This config option is used only when
     * lazy instantiation is being used, and a child item of a Container is being
     * specified not as a fully instantiated Component, but as a <i>Component config
     * object</i>. The <tt>xtype</tt> will be looked up at render time up to determine what
     * type of child Component to create.<br><br>
     * The predefined xtypes are listed {@link Ext.Component here}.
     * <br><br>
     * If you subclass Components to create your own Components, you may register
     * them using {@link Ext.ComponentMgr#registerType} in order to be able to
     * take advantage of lazy instantiation and rendering.
     */
    /**
     * @cfg {String} ptype
     * The registered <tt>ptype</tt> to create. This config option is not used when passing
     * a config object into a constructor. This config option is used only when
     * lazy instantiation is being used, and a Plugin is being
     * specified not as a fully instantiated Component, but as a <i>Component config
     * object</i>. The <tt>ptype</tt> will be looked up at render time up to determine what
     * type of Plugin to create.<br><br>
     * If you create your own Plugins, you may register them using
     * {@link Ext.ComponentMgr#registerPlugin} in order to be able to
     * take advantage of lazy instantiation and rendering.
     */
    /**
     * @cfg {String} cls
     * An optional extra CSS class that will be added to this component's Element (defaults to '').  This can be
     * useful for adding customized styles to the component or any of its children using standard CSS rules.
     */
    /**
     * @cfg {String} overCls
     * An optional extra CSS class that will be added to this component's Element when the mouse moves
     * over the Element, and removed when the mouse moves out. (defaults to '').  This can be
     * useful for adding customized 'active' or 'hover' styles to the component or any of its children using standard CSS rules.
     */
    /**
     * @cfg {String} style
     * A custom style specification to be applied to this component's Element.  Should be a valid argument to
     * {@link Ext.Element#applyStyles}.
     * <pre><code>
new Ext.Panel({
    title: 'Some Title',
    renderTo: Ext.getBody(),
    width: 400, height: 300,
    layout: 'form',
    items: [{
        xtype: 'textarea',
        style: {
            width: '95%',
            marginBottom: '10px'
        }
    },
        new Ext.Button({
            text: 'Send',
            minWidth: '100',
            style: {
                marginBottom: '10px'
            }
        })
    ]
});
     * </code></pre>
     */
    /**
     * @cfg {String} ctCls
     * <p>An optional extra CSS class that will be added to this component's container. This can be useful for
     * adding customized styles to the container or any of its children using standard CSS rules.  See
     * {@link Ext.layout.ContainerLayout}.{@link Ext.layout.ContainerLayout#extraCls extraCls} also.</p>
     * <p><b>Note</b>: <tt>ctCls</tt> defaults to <tt>''</tt> except for the following class
     * which assigns a value by default:
     * <div class="mdetail-params"><ul>
     * <li>{@link Ext.layout.Box Box Layout} : <tt>'x-box-layout-ct'</tt></li>
     * </ul></div>
     * To configure the above Class with an extra CSS class append to the default.  For example,
     * for BoxLayout (Hbox and Vbox):<pre><code>
     * ctCls: 'x-box-layout-ct custom-class'
     * </code></pre>
     * </p>
     */
    /**
     * @cfg {Boolean} disabled
     * Render this component disabled (default is false).
     */
    disabled : false,
    /**
     * @cfg {Boolean} hidden
     * Render this component hidden (default is false). If <tt>true</tt>, the
     * {@link #hide} method will be called internally.
     */
    hidden : false,
    /**
     * @cfg {Object/Array} plugins
     * An object or array of objects that will provide custom functionality for this component.  The only
     * requirement for a valid plugin is that it contain an init method that accepts a reference of type Ext.Component.
     * When a component is created, if any plugins are available, the component will call the init method on each
     * plugin, passing a reference to itself.  Each plugin can then call methods or respond to events on the
     * component as needed to provide its functionality.
     */
    /**
     * @cfg {Mixed} applyTo
     * <p>Specify the id of the element, a DOM element or an existing Element corresponding to a DIV
     * that is already present in the document that specifies some structural markup for this
     * component.</p><div><ul>
     * <li><b>Description</b> : <ul>
     * <div class="sub-desc">When <tt>applyTo</tt> is used, constituent parts of the component can also be specified
     * by id or CSS class name within the main element, and the component being created may attempt
     * to create its subcomponents from that markup if applicable.</div>
     * </ul></li>
     * <li><b>Notes</b> : <ul>
     * <div class="sub-desc">When using this config, a call to render() is not required.</div>
     * <div class="sub-desc">If applyTo is specified, any value passed for {@link #renderTo} will be ignored and the target
     * element's parent node will automatically be used as the component's container.</div>
     * </ul></li>
     * </ul></div>
     */
    /**
     * @cfg {Mixed} renderTo
     * <p>Specify the id of the element, a DOM element or an existing Element that this component
     * will be rendered into.</p><div><ul>
     * <li><b>Notes</b> : <ul>
     * <div class="sub-desc">Do <u>not</u> use this option if the Component is to be a child item of
     * a {@link Ext.Container Container}. It is the responsibility of the
     * {@link Ext.Container Container}'s {@link Ext.Container#layout layout manager}
     * to render and manage its child items.</div>
     * <div class="sub-desc">When using this config, a call to render() is not required.</div>
     * </ul></li>
     * </ul></div>
     * <p>See <tt>{@link #render}</tt> also.</p>
     */
    /**
     * @cfg {Boolean} stateful
     * <p>A flag which causes the Component to attempt to restore the state of
     * internal properties from a saved state on startup. The component must have
     * either a <code>{@link #stateId}</code> or <code>{@link #id}</code> assigned
     * for state to be managed. Auto-generated ids are not guaranteed to be stable
     * across page loads and cannot be relied upon to save and restore the same
     * state for a component.<p>
     * <p>For state saving to work, the state manager's provider must have been
     * set to an implementation of {@link Ext.state.Provider} which overrides the
     * {@link Ext.state.Provider#set set} and {@link Ext.state.Provider#get get}
     * methods to save and recall name/value pairs. A built-in implementation,
     * {@link Ext.state.CookieProvider} is available.</p>
     * <p>To set the state provider for the current page:</p>
     * <pre><code>
Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
    expires: new Date(new Date().getTime()+(1000*60*60*24*7)), //7 days from now
}));
     * </code></pre>
     * <p>A stateful Component attempts to save state when one of the events
     * listed in the <code>{@link #stateEvents}</code> configuration fires.</p>
     * <p>To save state, a stateful Component first serializes its state by
     * calling <b><code>getState</code></b>. By default, this function does
     * nothing. The developer must provide an implementation which returns an
     * object hash which represents the Component's restorable state.</p>
     * <p>The value yielded by getState is passed to {@link Ext.state.Manager#set}
     * which uses the configured {@link Ext.state.Provider} to save the object
     * keyed by the Component's <code>{@link stateId}</code>, or, if that is not
     * specified, its <code>{@link #id}</code>.</p>
     * <p>During construction, a stateful Component attempts to <i>restore</i>
     * its state by calling {@link Ext.state.Manager#get} passing the
     * <code>{@link #stateId}</code>, or, if that is not specified, the
     * <code>{@link #id}</code>.</p>
     * <p>The resulting object is passed to <b><code>applyState</code></b>.
     * The default implementation of <code>applyState</code> simply copies
     * properties into the object, but a developer may override this to support
     * more behaviour.</p>
     * <p>You can perform extra processing on state save and restore by attaching
     * handlers to the {@link #beforestaterestore}, {@link #staterestore},
     * {@link #beforestatesave} and {@link #statesave} events.</p>
     */
    /**
     * @cfg {String} stateId
     * The unique id for this component to use for state management purposes
     * (defaults to the component id if one was set, otherwise null if the
     * component is using a generated id).
     * <p>See <code>{@link #stateful}</code> for an explanation of saving and
     * restoring Component state.</p>
     */
    /**
     * @cfg {Array} stateEvents
     * <p>An array of events that, when fired, should trigger this component to
     * save its state (defaults to none). <code>stateEvents</code> may be any type
     * of event supported by this component, including browser or custom events
     * (e.g., <tt>['click', 'customerchange']</tt>).</p>
     * <p>See <code>{@link #stateful}</code> for an explanation of saving and
     * restoring Component state.</p>
     */
    /**
     * @cfg {Mixed} autoEl
     * <p>A tag name or {@link Ext.DomHelper DomHelper} spec used to create the {@link #getEl Element} which will
     * encapsulate this Component.</p>
     * <p>You do not normally need to specify this. For the base classes {@link Ext.Component}, {@link Ext.BoxComponent},
     * and {@link Ext.Container}, this defaults to <b><tt>'div'</tt></b>. The more complex Ext classes use a more complex
     * DOM structure created by their own onRender methods.</p>
     * <p>This is intended to allow the developer to create application-specific utility Components encapsulated by
     * different DOM elements. Example usage:</p><pre><code>
{
    xtype: 'box',
    autoEl: {
        tag: 'img',
        src: 'http://www.example.com/example.jpg'
    }
}, {
    xtype: 'box',
    autoEl: {
        tag: 'blockquote',
        html: 'autoEl is cool!'
    }
}, {
    xtype: 'container',
    autoEl: 'ul',
    cls: 'ux-unordered-list',
    items: {
        xtype: 'box',
        autoEl: 'li',
        html: 'First list item'
    }
}
</code></pre>
     */
    autoEl : 'div',

    /**
     * @cfg {String} disabledClass
     * CSS class added to the component when it is disabled (defaults to 'x-item-disabled').
     */
    disabledClass : 'x-item-disabled',
    /**
     * @cfg {Boolean} allowDomMove
     * Whether the component can move the Dom node when rendering (defaults to true).
     */
    allowDomMove : true,
    /**
     * @cfg {Boolean} autoShow
     * True if the component should check for hidden classes (e.g. 'x-hidden' or 'x-hide-display') and remove
     * them on render (defaults to false).
     */
    autoShow : false,
    /**
     * @cfg {String} hideMode
     * <p>How this component should be hidden. Supported values are <tt>'visibility'</tt>
     * (css visibility), <tt>'offsets'</tt> (negative offset position) and <tt>'display'</tt>
     * (css display).</p>
     * <br><p><b>Note</b>: the default of <tt>'display'</tt> is generally preferred
     * since items are automatically laid out when they are first shown (no sizing
     * is done while hidden).</p>
     */
    hideMode : 'display',
    /**
     * @cfg {Boolean} hideParent
     * True to hide and show the component's container when hide/show is called on the component, false to hide
     * and show the component itself (defaults to false).  For example, this can be used as a shortcut for a hide
     * button on a window by setting hide:true on the button when adding it to its parent container.
     */
    hideParent : false,
    /**
     * <p>The {@link Ext.Element} which encapsulates this Component. Read-only.</p>
     * <p>This will <i>usually</i> be a &lt;DIV> element created by the class's onRender method, but
     * that may be overridden using the <code>{@link #autoEl}</code> config.</p>
     * <br><p><b>Note</b>: this element will not be available until this Component has been rendered.</p><br>
     * <p>To add listeners for <b>DOM events</b> to this Component (as opposed to listeners
     * for this Component's own Observable events), see the {@link Ext.util.Observable#listeners listeners}
     * config for a suggestion, or use a render listener directly:</p><pre><code>
new Ext.Panel({
    title: 'The Clickable Panel',
    listeners: {
        render: function(p) {
            // Append the Panel to the click handler&#39;s argument list.
            p.getEl().on('click', handlePanelClick.createDelegate(null, [p], true));
        },
        single: true  // Remove the listener after first invocation
    }
});
</code></pre>
     * <p>See also <tt>{@link #getEl getEl}</p>
     * @type Ext.Element
     * @property el
     */
    /**
     * This Component's owner {@link Ext.Container Container} (defaults to undefined, and is set automatically when
     * this Component is added to a Container).  Read-only.
     * <p><b>Note</b>: to access items within the Container see <tt>{@link #itemId}</tt>.</p>
     * @type Ext.Container
     * @property ownerCt
     */
    /**
     * True if this component is hidden. Read-only.
     * @type Boolean
     * @property hidden
     */
    /**
     * True if this component is disabled. Read-only.
     * @type Boolean
     * @property disabled
     */
    /**
     * True if this component has been rendered. Read-only.
     * @type Boolean
     * @property rendered
     */
    rendered : false,

    /**
     * @cfg {String} contentEl
     * <p>Optional. Specify an existing HTML element, or the <code>id</code> of an existing HTML element to use as the content
     * for this component.</p>
     * <ul>
     * <li><b>Description</b> :
     * <div class="sub-desc">This config option is used to take an existing HTML element and place it in the layout element
     * of a new component (it simply moves the specified DOM element <i>after the Component is rendered</i> to use as the content.</div></li>
     * <li><b>Notes</b> :
     * <div class="sub-desc">The specified HTML element is appended to the layout element of the component <i>after any configured
     * {@link #html HTML} has been inserted</i>, and so the document will not contain this element at the time the {@link #render} event is fired.</div>
     * <div class="sub-desc">The specified HTML element used will not participate in any <code><b>{@link Ext.Container#layout layout}</b></code>
     * scheme that the Component may use. It is just HTML. Layouts operate on child <code><b>{@link Ext.Container#items items}</b></code>.</div>
     * <div class="sub-desc">Add either the <code>x-hidden</code> or the <code>x-hide-display</code> CSS class to
     * prevent a brief flicker of the content before it is rendered to the panel.</div></li>
     * </ul>
     */
    /**
     * @cfg {String/Object} html
     * An HTML fragment, or a {@link Ext.DomHelper DomHelper} specification to use as the layout element
     * content (defaults to ''). The HTML content is added after the component is rendered,
     * so the document will not contain this HTML at the time the {@link #render} event is fired.
     * This content is inserted into the body <i>before</i> any configured {@link #contentEl} is appended.
     */

    /**
     * @cfg {Mixed} tpl
     * An <bold>{@link Ext.Template}</bold>, <bold>{@link Ext.XTemplate}</bold>
     * or an array of strings to form an Ext.XTemplate.
     * Used in conjunction with the <code>{@link #data}</code> and
     * <code>{@link #tplWriteMode}</code> configurations.
     */

    /**
     * @cfg {String} tplWriteMode The Ext.(X)Template method to use when
     * updating the content area of the Component. Defaults to <tt>'overwrite'</tt>
     * (see <code>{@link Ext.XTemplate#overwrite}</code>).
     */
    tplWriteMode : 'overwrite',

    /**
     * @cfg {Mixed} data
     * The initial set of data to apply to the <code>{@link #tpl}</code> to
     * update the content area of the Component.
     */
    
    /**
     * @cfg {Array} bubbleEvents
     * <p>An array of events that, when fired, should be bubbled to any parent container.
     * See {@link Ext.util.Observable#enableBubble}.
     * Defaults to <tt>[]</tt>.
     */
    bubbleEvents: [],


    // private
    ctype : 'Ext.Component',

    // private
    actionMode : 'el',

    // private
    getActionEl : function(){
        return this[this.actionMode];
    },

    initPlugin : function(p){
        if(p.ptype && !Ext.isFunction(p.init)){
            p = Ext.ComponentMgr.createPlugin(p);
        }else if(Ext.isString(p)){
            p = Ext.ComponentMgr.createPlugin({
                ptype: p
            });
        }
        p.init(this);
        return p;
    },

    /* // protected
     * Function to be implemented by Component subclasses to be part of standard component initialization flow (it is empty by default).
     * <pre><code>
// Traditional constructor:
Ext.Foo = function(config){
    // call superclass constructor:
    Ext.Foo.superclass.constructor.call(this, config);

    this.addEvents({
        // add events
    });
};
Ext.extend(Ext.Foo, Ext.Bar, {
   // class body
}

// initComponent replaces the constructor:
Ext.Foo = Ext.extend(Ext.Bar, {
    initComponent : function(){
        // call superclass initComponent
        Ext.Container.superclass.initComponent.call(this);

        this.addEvents({
            // add events
        });
    }
}
</code></pre>
     */
    initComponent : function(){
        /*
         * this is double processing, however it allows people to be able to do
         * Ext.apply(this, {
         *     listeners: {
         *         //here
         *     }
         * });
         * MyClass.superclass.initComponent.call(this);
         */
        if(this.listeners){
            this.on(this.listeners);
            delete this.listeners;
        }
        this.enableBubble(this.bubbleEvents);
    },

    /**
     * <p>Render this Component into the passed HTML element.</p>
     * <p><b>If you are using a {@link Ext.Container Container} object to house this Component, then
     * do not use the render method.</b></p>
     * <p>A Container's child Components are rendered by that Container's
     * {@link Ext.Container#layout layout} manager when the Container is first rendered.</p>
     * <p>Certain layout managers allow dynamic addition of child components. Those that do
     * include {@link Ext.layout.CardLayout}, {@link Ext.layout.AnchorLayout},
     * {@link Ext.layout.FormLayout}, {@link Ext.layout.TableLayout}.</p>
     * <p>If the Container is already rendered when a new child Component is added, you may need to call
     * the Container's {@link Ext.Container#doLayout doLayout} to refresh the view which causes any
     * unrendered child Components to be rendered. This is required so that you can add multiple
     * child components if needed while only refreshing the layout once.</p>
     * <p>When creating complex UIs, it is important to remember that sizing and positioning
     * of child items is the responsibility of the Container's {@link Ext.Container#layout layout} manager.
     * If you expect child items to be sized in response to user interactions, you must
     * configure the Container with a layout manager which creates and manages the type of layout you
     * have in mind.</p>
     * <p><b>Omitting the Container's {@link Ext.Container#layout layout} config means that a basic
     * layout manager is used which does nothing but render child components sequentially into the
     * Container. No sizing or positioning will be performed in this situation.</b></p>
     * @param {Element/HTMLElement/String} container (optional) The element this Component should be
     * rendered into. If it is being created from existing markup, this should be omitted.
     * @param {String/Number} position (optional) The element ID or DOM node index within the container <b>before</b>
     * which this component will be inserted (defaults to appending to the end of the container)
     */
    render : function(container, position){
        if(!this.rendered && this.fireEvent('beforerender', this) !== false){
            if(!container && this.el){
                this.el = Ext.get(this.el);
                container = this.el.dom.parentNode;
                this.allowDomMove = false;
            }
            this.container = Ext.get(container);
            if(this.ctCls){
                this.container.addClass(this.ctCls);
            }
            this.rendered = true;
            if(position !== undefined){
                if(Ext.isNumber(position)){
                    position = this.container.dom.childNodes[position];
                }else{
                    position = Ext.getDom(position);
                }
            }
            this.onRender(this.container, position || null);
            if(this.autoShow){
                this.el.removeClass(['x-hidden','x-hide-' + this.hideMode]);
            }
            if(this.cls){
                this.el.addClass(this.cls);
                delete this.cls;
            }
            if(this.style){
                this.el.applyStyles(this.style);
                delete this.style;
            }
            if(this.overCls){
                this.el.addClassOnOver(this.overCls);
            }
            this.fireEvent('render', this);


            // Populate content of the component with html, contentEl or
            // a tpl.
            var contentTarget = this.getContentTarget();
            if (this.html){
                contentTarget.update(Ext.DomHelper.markup(this.html));
                delete this.html;
            }
            if (this.contentEl){
                var ce = Ext.getDom(this.contentEl);
                Ext.fly(ce).removeClass(['x-hidden', 'x-hide-display']);
                contentTarget.appendChild(ce);
            }
            if (this.tpl) {
                if (!this.tpl.compile) {
                    this.tpl = new Ext.XTemplate(this.tpl);
                }
                if (this.data) {
                    this.tpl[this.tplWriteMode](contentTarget, this.data);
                    delete this.data;
                }
            }
            this.afterRender(this.container);


            if(this.hidden){
                // call this so we don't fire initial hide events.
                this.doHide();
            }
            if(this.disabled){
                // pass silent so the event doesn't fire the first time.
                this.disable(true);
            }

            if(this.stateful !== false){
                this.initStateEvents();
            }
            this.fireEvent('afterrender', this);
        }
        return this;
    },


    /**
     * Update the content area of a component.
     * @param {Mixed} htmlOrData
     * If this component has been configured with a template via the tpl config
     * then it will use this argument as data to populate the template.
     * If this component was not configured with a template, the components
     * content area will be updated via Ext.Element update
     * @param {Boolean} loadScripts
     * (optional) Only legitimate when using the html configuration. Defaults to false
     * @param {Function} callback
     * (optional) Only legitimate when using the html configuration. Callback to execute when scripts have finished loading
     */
    update: function(htmlOrData, loadScripts, cb) {
        var contentTarget = this.getContentTarget();
        if (this.tpl && typeof htmlOrData !== "string") {
            this.tpl[this.tplWriteMode](contentTarget, htmlOrData || {});
        } else {
            var html = Ext.isObject(htmlOrData) ? Ext.DomHelper.markup(htmlOrData) : htmlOrData;
            contentTarget.update(html, loadScripts, cb);
        }
    },


    /**
     * @private
     * Method to manage awareness of when components are added to their
     * respective Container, firing an added event.
     * References are established at add time rather than at render time.
     * @param {Ext.Container} container Container which holds the component
     * @param {number} pos Position at which the component was added
     */
    onAdded : function(container, pos) {
        this.ownerCt = container;
        this.initRef();
        this.fireEvent('added', this, container, pos);
    },

    /**
     * @private
     * Method to manage awareness of when components are removed from their
     * respective Container, firing an removed event. References are properly
     * cleaned up after removing a component from its owning container.
     */
    onRemoved : function() {
        this.removeRef();
        this.fireEvent('removed', this, this.ownerCt);
        delete this.ownerCt;
    },

    /**
     * @private
     * Method to establish a reference to a component.
     */
    initRef : function() {
        /**
         * @cfg {String} ref
         * <p>A path specification, relative to the Component's <code>{@link #ownerCt}</code>
         * specifying into which ancestor Container to place a named reference to this Component.</p>
         * <p>The ancestor axis can be traversed by using '/' characters in the path.
         * For example, to put a reference to a Toolbar Button into <i>the Panel which owns the Toolbar</i>:</p><pre><code>
var myGrid = new Ext.grid.EditorGridPanel({
    title: 'My EditorGridPanel',
    store: myStore,
    colModel: myColModel,
    tbar: [{
        text: 'Save',
        handler: saveChanges,
        disabled: true,
        ref: '../saveButton'
    }],
    listeners: {
        afteredit: function() {
//          The button reference is in the GridPanel
            myGrid.saveButton.enable();
        }
    }
});
</code></pre>
         * <p>In the code above, if the <code>ref</code> had been <code>'saveButton'</code>
         * the reference would have been placed into the Toolbar. Each '/' in the <code>ref</code>
         * moves up one level from the Component's <code>{@link #ownerCt}</code>.</p>
         * <p>Also see the <code>{@link #added}</code> and <code>{@link #removed}</code> events.</p>
         */
        if(this.ref && !this.refOwner){
            var levels = this.ref.split('/'),
                last = levels.length,
                i = 0,
                t = this;

            while(t && i < last){
                t = t.ownerCt;
                ++i;
            }
            if(t){
                t[this.refName = levels[--i]] = this;
                /**
                 * @type Ext.Container
                 * @property refOwner
                 * The ancestor Container into which the {@link #ref} reference was inserted if this Component
                 * is a child of a Container, and has been configured with a <code>ref</code>.
                 */
                this.refOwner = t;
            }
        }
    },

    removeRef : function() {
        if (this.refOwner && this.refName) {
            delete this.refOwner[this.refName];
            delete this.refOwner;
        }
    },

    // private
    initState : function(){
        if(Ext.state.Manager){
            var id = this.getStateId();
            if(id){
                var state = Ext.state.Manager.get(id);
                if(state){
                    if(this.fireEvent('beforestaterestore', this, state) !== false){
                        this.applyState(Ext.apply({}, state));
                        this.fireEvent('staterestore', this, state);
                    }
                }
            }
        }
    },

    // private
    getStateId : function(){
        return this.stateId || ((/^(ext-comp-|ext-gen)/).test(String(this.id)) ? null : this.id);
    },

    // private
    initStateEvents : function(){
        if(this.stateEvents){
            for(var i = 0, e; e = this.stateEvents[i]; i++){
                this.on(e, this.saveState, this, {delay:100});
            }
        }
    },

    // private
    applyState : function(state){
        if(state){
            Ext.apply(this, state);
        }
    },

    // private
    getState : function(){
        return null;
    },

    // private
    saveState : function(){
        if(Ext.state.Manager && this.stateful !== false){
            var id = this.getStateId();
            if(id){
                var state = this.getState();
                if(this.fireEvent('beforestatesave', this, state) !== false){
                    Ext.state.Manager.set(id, state);
                    this.fireEvent('statesave', this, state);
                }
            }
        }
    },

    /**
     * Apply this component to existing markup that is valid. With this function, no call to render() is required.
     * @param {String/HTMLElement} el
     */
    applyToMarkup : function(el){
        this.allowDomMove = false;
        this.el = Ext.get(el);
        this.render(this.el.dom.parentNode);
    },

    /**
     * Adds a CSS class to the component's underlying element.
     * @param {string} cls The CSS class name to add
     * @return {Ext.Component} this
     */
    addClass : function(cls){
        if(this.el){
            this.el.addClass(cls);
        }else{
            this.cls = this.cls ? this.cls + ' ' + cls : cls;
        }
        return this;
    },

    /**
     * Removes a CSS class from the component's underlying element.
     * @param {string} cls The CSS class name to remove
     * @return {Ext.Component} this
     */
    removeClass : function(cls){
        if(this.el){
            this.el.removeClass(cls);
        }else if(this.cls){
            this.cls = this.cls.split(' ').remove(cls).join(' ');
        }
        return this;
    },

    // private
    // default function is not really useful
    onRender : function(ct, position){
        if(!this.el && this.autoEl){
            if(Ext.isString(this.autoEl)){
                this.el = document.createElement(this.autoEl);
            }else{
                var div = document.createElement('div');
                Ext.DomHelper.overwrite(div, this.autoEl);
                this.el = div.firstChild;
            }
            if (!this.el.id) {
                this.el.id = this.getId();
            }
        }
        if(this.el){
            this.el = Ext.get(this.el);
            if(this.allowDomMove !== false){
                ct.dom.insertBefore(this.el.dom, position);
                if (div) {
                    Ext.removeNode(div);
                    div = null;
                }
            }
        }
    },

    // private
    getAutoCreate : function(){
        var cfg = Ext.isObject(this.autoCreate) ?
                      this.autoCreate : Ext.apply({}, this.defaultAutoCreate);
        if(this.id && !cfg.id){
            cfg.id = this.id;
        }
        return cfg;
    },

    // private
    afterRender : Ext.emptyFn,

    /**
     * Destroys this component by purging any event listeners, removing the component's element from the DOM,
     * removing the component from its {@link Ext.Container} (if applicable) and unregistering it from
     * {@link Ext.ComponentMgr}.  Destruction is generally handled automatically by the framework and this method
     * should usually not need to be called directly.
     *
     */
    destroy : function(){
        if(!this.isDestroyed){
            if(this.fireEvent('beforedestroy', this) !== false){
                this.destroying = true;
                this.beforeDestroy();
                if(this.ownerCt && this.ownerCt.remove){
                    this.ownerCt.remove(this, false);
                }
                if(this.rendered){
                    this.el.remove();
                    if(this.actionMode == 'container' || this.removeMode == 'container'){
                        this.container.remove();
                    }
                }
                // Stop any buffered tasks
                if(this.focusTask && this.focusTask.cancel){
                    this.focusTask.cancel();
                }
                this.onDestroy();
                Ext.ComponentMgr.unregister(this);
                this.fireEvent('destroy', this);
                this.purgeListeners();
                this.destroying = false;
                this.isDestroyed = true;
            }
        }
    },

    deleteMembers : function(){
        var args = arguments;
        for(var i = 0, len = args.length; i < len; ++i){
            delete this[args[i]];
        }
    },

    // private
    beforeDestroy : Ext.emptyFn,

    // private
    onDestroy  : Ext.emptyFn,

    /**
     * <p>Returns the {@link Ext.Element} which encapsulates this Component.</p>
     * <p>This will <i>usually</i> be a &lt;DIV> element created by the class's onRender method, but
     * that may be overridden using the {@link #autoEl} config.</p>
     * <br><p><b>Note</b>: this element will not be available until this Component has been rendered.</p><br>
     * <p>To add listeners for <b>DOM events</b> to this Component (as opposed to listeners
     * for this Component's own Observable events), see the {@link #listeners} config for a suggestion,
     * or use a render listener directly:</p><pre><code>
new Ext.Panel({
    title: 'The Clickable Panel',
    listeners: {
        render: function(p) {
            // Append the Panel to the click handler&#39;s argument list.
            p.getEl().on('click', handlePanelClick.createDelegate(null, [p], true));
        },
        single: true  // Remove the listener after first invocation
    }
});
</code></pre>
     * @return {Ext.Element} The Element which encapsulates this Component.
     */
    getEl : function(){
        return this.el;
    },

    // private
    getContentTarget : function(){
        return this.el;
    },

    /**
     * Returns the <code>id</code> of this component or automatically generates and
     * returns an <code>id</code> if an <code>id</code> is not defined yet:<pre><code>
     * 'ext-comp-' + (++Ext.Component.AUTO_ID)
     * </code></pre>
     * @return {String} id
     */
    getId : function(){
        return this.id || (this.id = 'ext-comp-' + (++Ext.Component.AUTO_ID));
    },

    /**
     * Returns the <code>{@link #itemId}</code> of this component.  If an
     * <code>{@link #itemId}</code> was not assigned through configuration the
     * <code>id</code> is returned using <code>{@link #getId}</code>.
     * @return {String}
     */
    getItemId : function(){
        return this.itemId || this.getId();
    },

    /**
     * Try to focus this component.
     * @param {Boolean} selectText (optional) If applicable, true to also select the text in this component
     * @param {Boolean/Number} delay (optional) Delay the focus this number of milliseconds (true for 10 milliseconds)
     * @return {Ext.Component} this
     */
    focus : function(selectText, delay){
        if(delay){
            this.focusTask = new Ext.util.DelayedTask(this.focus, this, [selectText, false]);
            this.focusTask.delay(Ext.isNumber(delay) ? delay : 10);
            return;
        }
        if(this.rendered && !this.isDestroyed){
            this.el.focus();
            if(selectText === true){
                this.el.dom.select();
            }
        }
        return this;
    },

    // private
    blur : function(){
        if(this.rendered){
            this.el.blur();
        }
        return this;
    },

    /**
     * Disable this component and fire the 'disable' event.
     * @return {Ext.Component} this
     */
    disable : function(/* private */ silent){
        if(this.rendered){
            this.onDisable();
        }
        this.disabled = true;
        if(silent !== true){
            this.fireEvent('disable', this);
        }
        return this;
    },

    // private
    onDisable : function(){
        this.getActionEl().addClass(this.disabledClass);
        this.el.dom.disabled = true;
    },

    /**
     * Enable this component and fire the 'enable' event.
     * @return {Ext.Component} this
     */
    enable : function(){
        if(this.rendered){
            this.onEnable();
        }
        this.disabled = false;
        this.fireEvent('enable', this);
        return this;
    },

    // private
    onEnable : function(){
        this.getActionEl().removeClass(this.disabledClass);
        this.el.dom.disabled = false;
    },

    /**
     * Convenience function for setting disabled/enabled by boolean.
     * @param {Boolean} disabled
     * @return {Ext.Component} this
     */
    setDisabled : function(disabled){
        return this[disabled ? 'disable' : 'enable']();
    },

    /**
     * Show this component.  Listen to the '{@link #beforeshow}' event and return
     * <tt>false</tt> to cancel showing the component.  Fires the '{@link #show}'
     * event after showing the component.
     * @return {Ext.Component} this
     */
    show : function(){
        if(this.fireEvent('beforeshow', this) !== false){
            this.hidden = false;
            if(this.autoRender){
                this.render(Ext.isBoolean(this.autoRender) ? Ext.getBody() : this.autoRender);
            }
            if(this.rendered){
                this.onShow();
            }
            this.fireEvent('show', this);
        }
        return this;
    },

    // private
    onShow : function(){
        this.getVisibilityEl().removeClass('x-hide-' + this.hideMode);
    },

    /**
     * Hide this component.  Listen to the '{@link #beforehide}' event and return
     * <tt>false</tt> to cancel hiding the component.  Fires the '{@link #hide}'
     * event after hiding the component. Note this method is called internally if
     * the component is configured to be <code>{@link #hidden}</code>.
     * @return {Ext.Component} this
     */
    hide : function(){
        if(this.fireEvent('beforehide', this) !== false){
            this.doHide();
            this.fireEvent('hide', this);
        }
        return this;
    },

    // private
    doHide: function(){
        this.hidden = true;
        if(this.rendered){
            this.onHide();
        }
    },

    // private
    onHide : function(){
        this.getVisibilityEl().addClass('x-hide-' + this.hideMode);
    },

    // private
    getVisibilityEl : function(){
        return this.hideParent ? this.container : this.getActionEl();
    },

    /**
     * Convenience function to hide or show this component by boolean.
     * @param {Boolean} visible True to show, false to hide
     * @return {Ext.Component} this
     */
    setVisible : function(visible){
        return this[visible ? 'show' : 'hide']();
    },

    /**
     * Returns true if this component is visible.
     * @return {Boolean} True if this component is visible, false otherwise.
     */
    isVisible : function(){
        return this.rendered && this.getVisibilityEl().isVisible();
    },

    /**
     * Clone the current component using the original config values passed into this instance by default.
     * @param {Object} overrides A new config containing any properties to override in the cloned version.
     * An id property can be passed on this object, otherwise one will be generated to avoid duplicates.
     * @return {Ext.Component} clone The cloned copy of this component
     */
    cloneConfig : function(overrides){
        overrides = overrides || {};
        var id = overrides.id || Ext.id();
        var cfg = Ext.applyIf(overrides, this.initialConfig);
        cfg.id = id; // prevent dup id
        return new this.constructor(cfg);
    },

    /**
     * Gets the xtype for this component as registered with {@link Ext.ComponentMgr}. For a list of all
     * available xtypes, see the {@link Ext.Component} header. Example usage:
     * <pre><code>
var t = new Ext.form.TextField();
alert(t.getXType());  // alerts 'textfield'
</code></pre>
     * @return {String} The xtype
     */
    getXType : function(){
        return this.constructor.xtype;
    },

    /**
     * <p>Tests whether or not this Component is of a specific xtype. This can test whether this Component is descended
     * from the xtype (default) or whether it is directly of the xtype specified (shallow = true).</p>
     * <p><b>If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.</b></p>
     * <p>For a list of all available xtypes, see the {@link Ext.Component} header.</p>
     * <p>Example usage:</p>
     * <pre><code>
var t = new Ext.form.TextField();
var isText = t.isXType('textfield');        // true
var isBoxSubclass = t.isXType('box');       // true, descended from BoxComponent
var isBoxInstance = t.isXType('box', true); // false, not a direct BoxComponent instance
</code></pre>
     * @param {String} xtype The xtype to check for this Component
     * @param {Boolean} shallow (optional) False to check whether this Component is descended from the xtype (this is
     * the default), or true to check whether this Component is directly of the specified xtype.
     * @return {Boolean} True if this component descends from the specified xtype, false otherwise.
     */
    isXType : function(xtype, shallow){
        //assume a string by default
        if (Ext.isFunction(xtype)){
            xtype = xtype.xtype; //handle being passed the class, e.g. Ext.Component
        }else if (Ext.isObject(xtype)){
            xtype = xtype.constructor.xtype; //handle being passed an instance
        }

        return !shallow ? ('/' + this.getXTypes() + '/').indexOf('/' + xtype + '/') != -1 : this.constructor.xtype == xtype;
    },

    /**
     * <p>Returns this Component's xtype hierarchy as a slash-delimited string. For a list of all
     * available xtypes, see the {@link Ext.Component} header.</p>
     * <p><b>If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.</b></p>
     * <p>Example usage:</p>
     * <pre><code>
var t = new Ext.form.TextField();
alert(t.getXTypes());  // alerts 'component/box/field/textfield'
</code></pre>
     * @return {String} The xtype hierarchy string
     */
    getXTypes : function(){
        var tc = this.constructor;
        if(!tc.xtypes){
            var c = [], sc = this;
            while(sc && sc.constructor.xtype){
                c.unshift(sc.constructor.xtype);
                sc = sc.constructor.superclass;
            }
            tc.xtypeChain = c;
            tc.xtypes = c.join('/');
        }
        return tc.xtypes;
    },

    /**
     * Find a container above this component at any level by a custom function. If the passed function returns
     * true, the container will be returned.
     * @param {Function} fn The custom function to call with the arguments (container, this component).
     * @return {Ext.Container} The first Container for which the custom function returns true
     */
    findParentBy : function(fn) {
        for (var p = this.ownerCt; (p != null) && !fn(p, this); p = p.ownerCt);
        return p || null;
    },

    /**
     * Find a container above this component at any level by xtype or class
     * @param {String/Class} xtype The xtype string for a component, or the class of the component directly
     * @return {Ext.Container} The first Container which matches the given xtype or class
     */
    findParentByType : function(xtype) {
        return Ext.isFunction(xtype) ?
            this.findParentBy(function(p){
                return p.constructor === xtype;
            }) :
            this.findParentBy(function(p){
                return p.constructor.xtype === xtype;
            });
    },

    // protected
    getPositionEl : function(){
        return this.positionEl || this.el;
    },

    // private
    purgeListeners : function(){
        Ext.Component.superclass.purgeListeners.call(this);
        if(this.mons){
            this.on('beforedestroy', this.clearMons, this, {single: true});
        }
    },

    // private
    clearMons : function(){
        Ext.each(this.mons, function(m){
            m.item.un(m.ename, m.fn, m.scope);
        }, this);
        this.mons = [];
    },

    // private
    createMons: function(){
        if(!this.mons){
            this.mons = [];
            this.on('beforedestroy', this.clearMons, this, {single: true});
        }
    },

    /**
     * <p>Adds listeners to any Observable object (or Elements) which are automatically removed when this Component
     * is destroyed. Usage:</p><code><pre>
myGridPanel.mon(myGridPanel.getSelectionModel(), 'selectionchange', handleSelectionChange, null, {buffer: 50});
</pre></code>
     * <p>or:</p><code><pre>
myGridPanel.mon(myGridPanel.getSelectionModel(), {
    selectionchange: handleSelectionChange,
    buffer: 50
});
</pre></code>
     * @param {Observable|Element} item The item to which to add a listener/listeners.
     * @param {Object|String} ename The event name, or an object containing event name properties.
     * @param {Function} fn Optional. If the <code>ename</code> parameter was an event name, this
     * is the handler function.
     * @param {Object} scope Optional. If the <code>ename</code> parameter was an event name, this
     * is the scope (<code>this</code> reference) in which the handler function is executed.
     * @param {Object} opt Optional. If the <code>ename</code> parameter was an event name, this
     * is the {@link Ext.util.Observable#addListener addListener} options.
     */
    mon : function(item, ename, fn, scope, opt){
        this.createMons();
        if(Ext.isObject(ename)){
            var propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;

            var o = ename;
            for(var e in o){
                if(propRe.test(e)){
                    continue;
                }
                if(Ext.isFunction(o[e])){
                    // shared options
                    this.mons.push({
                        item: item, ename: e, fn: o[e], scope: o.scope
                    });
                    item.on(e, o[e], o.scope, o);
                }else{
                    // individual options
                    this.mons.push({
                        item: item, ename: e, fn: o[e], scope: o.scope
                    });
                    item.on(e, o[e]);
                }
            }
            return;
        }

        this.mons.push({
            item: item, ename: ename, fn: fn, scope: scope
        });
        item.on(ename, fn, scope, opt);
    },

    /**
     * Removes listeners that were added by the {@link #mon} method.
     * @param {Observable|Element} item The item from which to remove a listener/listeners.
     * @param {Object|String} ename The event name, or an object containing event name properties.
     * @param {Function} fn Optional. If the <code>ename</code> parameter was an event name, this
     * is the handler function.
     * @param {Object} scope Optional. If the <code>ename</code> parameter was an event name, this
     * is the scope (<code>this</code> reference) in which the handler function is executed.
     */
    mun : function(item, ename, fn, scope){
        var found, mon;
        this.createMons();
        for(var i = 0, len = this.mons.length; i < len; ++i){
            mon = this.mons[i];
            if(item === mon.item && ename == mon.ename && fn === mon.fn && scope === mon.scope){
                this.mons.splice(i, 1);
                item.un(ename, fn, scope);
                found = true;
                break;
            }
        }
        return found;
    },

    /**
     * Returns the next component in the owning container
     * @return Ext.Component
     */
    nextSibling : function(){
        if(this.ownerCt){
            var index = this.ownerCt.items.indexOf(this);
            if(index != -1 && index+1 < this.ownerCt.items.getCount()){
                return this.ownerCt.items.itemAt(index+1);
            }
        }
        return null;
    },

    /**
     * Returns the previous component in the owning container
     * @return Ext.Component
     */
    previousSibling : function(){
        if(this.ownerCt){
            var index = this.ownerCt.items.indexOf(this);
            if(index > 0){
                return this.ownerCt.items.itemAt(index-1);
            }
        }
        return null;
    },

    /**
     * Provides the link for Observable's fireEvent method to bubble up the ownership hierarchy.
     * @return {Ext.Container} the Container which owns this Component.
     */
    getBubbleTarget : function(){
        return this.ownerCt;
    }
});

Ext.reg('component', Ext.Component);/**
 * @class Ext.Action
 * <p>An Action is a piece of reusable functionality that can be abstracted out of any particular component so that it
 * can be usefully shared among multiple components.  Actions let you share handlers, configuration options and UI
 * updates across any components that support the Action interface (primarily {@link Ext.Toolbar}, {@link Ext.Button}
 * and {@link Ext.menu.Menu} components).</p>
 * <p>Aside from supporting the config object interface, any component that needs to use Actions must also support
 * the following method list, as these will be called as needed by the Action class: setText(string), setIconCls(string),
 * setDisabled(boolean), setVisible(boolean) and setHandler(function).</p>
 * Example usage:<br>
 * <pre><code>
// Define the shared action.  Each component below will have the same
// display text and icon, and will display the same message on click.
var action = new Ext.Action({
    {@link #text}: 'Do something',
    {@link #handler}: function(){
        Ext.Msg.alert('Click', 'You did something.');
    },
    {@link #iconCls}: 'do-something',
    {@link #itemId}: 'myAction'
});

var panel = new Ext.Panel({
    title: 'Actions',
    width: 500,
    height: 300,
    tbar: [
        // Add the action directly to a toolbar as a menu button
        action,
        {
            text: 'Action Menu',
            // Add the action to a menu as a text item
            menu: [action]
        }
    ],
    items: [
        // Add the action to the panel body as a standard button
        new Ext.Button(action)
    ],
    renderTo: Ext.getBody()
});

// Change the text for all components using the action
action.setText('Something else');

// Reference an action through a container using the itemId
var btn = panel.getComponent('myAction');
var aRef = btn.baseAction;
aRef.setText('New text');
</code></pre>
 * @constructor
 * @param {Object} config The configuration options
 */
Ext.Action = Ext.extend(Object, {
    /**
     * @cfg {String} text The text to set for all components using this action (defaults to '').
     */
    /**
     * @cfg {String} iconCls
     * The CSS class selector that specifies a background image to be used as the header icon for
     * all components using this action (defaults to '').
     * <p>An example of specifying a custom icon class would be something like:
     * </p><pre><code>
// specify the property in the config for the class:
     ...
     iconCls: 'do-something'

// css class that specifies background image to be used as the icon image:
.do-something { background-image: url(../images/my-icon.gif) 0 6px no-repeat !important; }
</code></pre>
     */
    /**
     * @cfg {Boolean} disabled True to disable all components using this action, false to enable them (defaults to false).
     */
    /**
     * @cfg {Boolean} hidden True to hide all components using this action, false to show them (defaults to false).
     */
    /**
     * @cfg {Function} handler The function that will be invoked by each component tied to this action
     * when the component's primary event is triggered (defaults to undefined).
     */
    /**
     * @cfg {String} itemId
     * See {@link Ext.Component}.{@link Ext.Component#itemId itemId}.
     */
    /**
     * @cfg {Object} scope The scope (<tt><b>this</b></tt> reference) in which the
     * <code>{@link #handler}</code> is executed. Defaults to this Button.
     */

    constructor : function(config){
        this.initialConfig = config;
        this.itemId = config.itemId = (config.itemId || config.id || Ext.id());
        this.items = [];
    },
    
    // private
    isAction : true,

    /**
     * Sets the text to be displayed by all components using this action.
     * @param {String} text The text to display
     */
    setText : function(text){
        this.initialConfig.text = text;
        this.callEach('setText', [text]);
    },

    /**
     * Gets the text currently displayed by all components using this action.
     */
    getText : function(){
        return this.initialConfig.text;
    },

    /**
     * Sets the icon CSS class for all components using this action.  The class should supply
     * a background image that will be used as the icon image.
     * @param {String} cls The CSS class supplying the icon image
     */
    setIconClass : function(cls){
        this.initialConfig.iconCls = cls;
        this.callEach('setIconClass', [cls]);
    },

    /**
     * Gets the icon CSS class currently used by all components using this action.
     */
    getIconClass : function(){
        return this.initialConfig.iconCls;
    },

    /**
     * Sets the disabled state of all components using this action.  Shortcut method
     * for {@link #enable} and {@link #disable}.
     * @param {Boolean} disabled True to disable the component, false to enable it
     */
    setDisabled : function(v){
        this.initialConfig.disabled = v;
        this.callEach('setDisabled', [v]);
    },

    /**
     * Enables all components using this action.
     */
    enable : function(){
        this.setDisabled(false);
    },

    /**
     * Disables all components using this action.
     */
    disable : function(){
        this.setDisabled(true);
    },

    /**
     * Returns true if the components using this action are currently disabled, else returns false.  
     */
    isDisabled : function(){
        return this.initialConfig.disabled;
    },

    /**
     * Sets the hidden state of all components using this action.  Shortcut method
     * for <code>{@link #hide}</code> and <code>{@link #show}</code>.
     * @param {Boolean} hidden True to hide the component, false to show it
     */
    setHidden : function(v){
        this.initialConfig.hidden = v;
        this.callEach('setVisible', [!v]);
    },

    /**
     * Shows all components using this action.
     */
    show : function(){
        this.setHidden(false);
    },

    /**
     * Hides all components using this action.
     */
    hide : function(){
        this.setHidden(true);
    },

    /**
     * Returns true if the components using this action are currently hidden, else returns false.  
     */
    isHidden : function(){
        return this.initialConfig.hidden;
    },

    /**
     * Sets the function that will be called by each Component using this action when its primary event is triggered.
     * @param {Function} fn The function that will be invoked by the action's components.  The function
     * will be called with no arguments.
     * @param {Object} scope The scope (<code>this</code> reference) in which the function is executed. Defaults to the Component firing the event.
     */
    setHandler : function(fn, scope){
        this.initialConfig.handler = fn;
        this.initialConfig.scope = scope;
        this.callEach('setHandler', [fn, scope]);
    },

    /**
     * Executes the specified function once for each Component currently tied to this action.  The function passed
     * in should accept a single argument that will be an object that supports the basic Action config/method interface.
     * @param {Function} fn The function to execute for each component
     * @param {Object} scope The scope (<code>this</code> reference) in which the function is executed.  Defaults to the Component.
     */
    each : function(fn, scope){
        Ext.each(this.items, fn, scope);
    },

    // private
    callEach : function(fnName, args){
        var cs = this.items;
        for(var i = 0, len = cs.length; i < len; i++){
            cs[i][fnName].apply(cs[i], args);
        }
    },

    // private
    addComponent : function(comp){
        this.items.push(comp);
        comp.on('destroy', this.removeComponent, this);
    },

    // private
    removeComponent : function(comp){
        this.items.remove(comp);
    },

    /**
     * Executes this action manually using the handler function specified in the original config object
     * or the handler function set with <code>{@link #setHandler}</code>.  Any arguments passed to this
     * function will be passed on to the handler function.
     * @param {Mixed} arg1 (optional) Variable number of arguments passed to the handler function
     * @param {Mixed} arg2 (optional)
     * @param {Mixed} etc... (optional)
     */
    execute : function(){
        this.initialConfig.handler.apply(this.initialConfig.scope || window, arguments);
    }
});
/**
 * @class Ext.Layer
 * @extends Ext.Element
 * An extended {@link Ext.Element} object that supports a shadow and shim, constrain to viewport and
 * automatic maintaining of shadow/shim positions.
 * @cfg {Boolean} shim False to disable the iframe shim in browsers which need one (defaults to true)
 * @cfg {String/Boolean} shadow True to automatically create an {@link Ext.Shadow}, or a string indicating the
 * shadow's display {@link Ext.Shadow#mode}. False to disable the shadow. (defaults to false)
 * @cfg {Object} dh DomHelper object config to create element with (defaults to {tag: 'div', cls: 'x-layer'}).
 * @cfg {Boolean} constrain False to disable constrain to viewport (defaults to true)
 * @cfg {String} cls CSS class to add to the element
 * @cfg {Number} zindex Starting z-index (defaults to 11000)
 * @cfg {Number} shadowOffset Number of pixels to offset the shadow (defaults to 4)
 * @cfg {Boolean} useDisplay
 * Defaults to use css offsets to hide the Layer. Specify <tt>true</tt>
 * to use css style <tt>'display:none;'</tt> to hide the Layer.
 * @constructor
 * @param {Object} config An object with config options.
 * @param {String/HTMLElement} existingEl (optional) Uses an existing DOM element. If the element is not found it creates it.
 */
(function(){
Ext.Layer = function(config, existingEl){
    config = config || {};
    var dh = Ext.DomHelper;
    var cp = config.parentEl, pel = cp ? Ext.getDom(cp) : document.body;
    if(existingEl){
        this.dom = Ext.getDom(existingEl);
    }
    if(!this.dom){
        var o = config.dh || {tag: 'div', cls: 'x-layer'};
        this.dom = dh.append(pel, o);
    }
    if(config.cls){
        this.addClass(config.cls);
    }
    this.constrain = config.constrain !== false;
    this.setVisibilityMode(Ext.Element.VISIBILITY);
    if(config.id){
        this.id = this.dom.id = config.id;
    }else{
        this.id = Ext.id(this.dom);
    }
    this.zindex = config.zindex || this.getZIndex();
    this.position('absolute', this.zindex);
    if(config.shadow){
        this.shadowOffset = config.shadowOffset || 4;
        this.shadow = new Ext.Shadow({
            offset : this.shadowOffset,
            mode : config.shadow
        });
    }else{
        this.shadowOffset = 0;
    }
    this.useShim = config.shim !== false && Ext.useShims;
    this.useDisplay = config.useDisplay;
    this.hide();
};

var supr = Ext.Element.prototype;

// shims are shared among layer to keep from having 100 iframes
var shims = [];

Ext.extend(Ext.Layer, Ext.Element, {

    getZIndex : function(){
        return this.zindex || parseInt((this.getShim() || this).getStyle('z-index'), 10) || 11000;
    },

    getShim : function(){
        if(!this.useShim){
            return null;
        }
        if(this.shim){
            return this.shim;
        }
        var shim = shims.shift();
        if(!shim){
            shim = this.createShim();
            shim.enableDisplayMode('block');
            shim.dom.style.display = 'none';
            shim.dom.style.visibility = 'visible';
        }
        var pn = this.dom.parentNode;
        if(shim.dom.parentNode != pn){
            pn.insertBefore(shim.dom, this.dom);
        }
        shim.setStyle('z-index', this.getZIndex()-2);
        this.shim = shim;
        return shim;
    },

    hideShim : function(){
        if(this.shim){
            this.shim.setDisplayed(false);
            shims.push(this.shim);
            delete this.shim;
        }
    },

    disableShadow : function(){
        if(this.shadow){
            this.shadowDisabled = true;
            this.shadow.hide();
            this.lastShadowOffset = this.shadowOffset;
            this.shadowOffset = 0;
        }
    },

    enableShadow : function(show){
        if(this.shadow){
            this.shadowDisabled = false;
            this.shadowOffset = this.lastShadowOffset;
            delete this.lastShadowOffset;
            if(show){
                this.sync(true);
            }
        }
    },

    // private
    // this code can execute repeatedly in milliseconds (i.e. during a drag) so
    // code size was sacrificed for effeciency (e.g. no getBox/setBox, no XY calls)
    sync : function(doShow){
        var shadow = this.shadow;
        if(!this.updating && this.isVisible() && (shadow || this.useShim)){
            var shim = this.getShim(),
                w = this.getWidth(),
                h = this.getHeight(),
                l = this.getLeft(true),
                t = this.getTop(true);

            if(shadow && !this.shadowDisabled){
                if(doShow && !shadow.isVisible()){
                    shadow.show(this);
                }else{
                    shadow.realign(l, t, w, h);
                }
                if(shim){
                    if(doShow){
                       shim.show();
                    }
                    // fit the shim behind the shadow, so it is shimmed too
                    var shadowAdj = shadow.el.getXY(), shimStyle = shim.dom.style,
                        shadowSize = shadow.el.getSize();
                    shimStyle.left = (shadowAdj[0])+'px';
                    shimStyle.top = (shadowAdj[1])+'px';
                    shimStyle.width = (shadowSize.width)+'px';
                    shimStyle.height = (shadowSize.height)+'px';
                }
            }else if(shim){
                if(doShow){
                   shim.show();
                }
                shim.setSize(w, h);
                shim.setLeftTop(l, t);
            }
        }
    },

    // private
    destroy : function(){
        this.hideShim();
        if(this.shadow){
            this.shadow.hide();
        }
        this.removeAllListeners();
        Ext.removeNode(this.dom);
        delete this.dom;
    },

    remove : function(){
        this.destroy();
    },

    // private
    beginUpdate : function(){
        this.updating = true;
    },

    // private
    endUpdate : function(){
        this.updating = false;
        this.sync(true);
    },

    // private
    hideUnders : function(negOffset){
        if(this.shadow){
            this.shadow.hide();
        }
        this.hideShim();
    },

    // private
    constrainXY : function(){
        if(this.constrain){
            var vw = Ext.lib.Dom.getViewWidth(),
                vh = Ext.lib.Dom.getViewHeight();
            var s = Ext.getDoc().getScroll();

            var xy = this.getXY();
            var x = xy[0], y = xy[1];
            var so = this.shadowOffset;
            var w = this.dom.offsetWidth+so, h = this.dom.offsetHeight+so;
            // only move it if it needs it
            var moved = false;
            // first validate right/bottom
            if((x + w) > vw+s.left){
                x = vw - w - so;
                moved = true;
            }
            if((y + h) > vh+s.top){
                y = vh - h - so;
                moved = true;
            }
            // then make sure top/left isn't negative
            if(x < s.left){
                x = s.left;
                moved = true;
            }
            if(y < s.top){
                y = s.top;
                moved = true;
            }
            if(moved){
                if(this.avoidY){
                    var ay = this.avoidY;
                    if(y <= ay && (y+h) >= ay){
                        y = ay-h-5;
                    }
                }
                xy = [x, y];
                this.storeXY(xy);
                supr.setXY.call(this, xy);
                this.sync();
            }
        }
        return this;
    },

    isVisible : function(){
        return this.visible;
    },

    // private
    showAction : function(){
        this.visible = true; // track visibility to prevent getStyle calls
        if(this.useDisplay === true){
            this.setDisplayed('');
        }else if(this.lastXY){
            supr.setXY.call(this, this.lastXY);
        }else if(this.lastLT){
            supr.setLeftTop.call(this, this.lastLT[0], this.lastLT[1]);
        }
    },

    // private
    hideAction : function(){
        this.visible = false;
        if(this.useDisplay === true){
            this.setDisplayed(false);
        }else{
            this.setLeftTop(-10000,-10000);
        }
    },

    // overridden Element method
    setVisible : function(v, a, d, c, e){
        if(v){
            this.showAction();
        }
        if(a && v){
            var cb = function(){
                this.sync(true);
                if(c){
                    c();
                }
            }.createDelegate(this);
            supr.setVisible.call(this, true, true, d, cb, e);
        }else{
            if(!v){
                this.hideUnders(true);
            }
            var cb = c;
            if(a){
                cb = function(){
                    this.hideAction();
                    if(c){
                        c();
                    }
                }.createDelegate(this);
            }
            supr.setVisible.call(this, v, a, d, cb, e);
            if(v){
                this.sync(true);
            }else if(!a){
                this.hideAction();
            }
        }
        return this;
    },

    storeXY : function(xy){
        delete this.lastLT;
        this.lastXY = xy;
    },

    storeLeftTop : function(left, top){
        delete this.lastXY;
        this.lastLT = [left, top];
    },

    // private
    beforeFx : function(){
        this.beforeAction();
        return Ext.Layer.superclass.beforeFx.apply(this, arguments);
    },

    // private
    afterFx : function(){
        Ext.Layer.superclass.afterFx.apply(this, arguments);
        this.sync(this.isVisible());
    },

    // private
    beforeAction : function(){
        if(!this.updating && this.shadow){
            this.shadow.hide();
        }
    },

    // overridden Element method
    setLeft : function(left){
        this.storeLeftTop(left, this.getTop(true));
        supr.setLeft.apply(this, arguments);
        this.sync();
        return this;
    },

    setTop : function(top){
        this.storeLeftTop(this.getLeft(true), top);
        supr.setTop.apply(this, arguments);
        this.sync();
        return this;
    },

    setLeftTop : function(left, top){
        this.storeLeftTop(left, top);
        supr.setLeftTop.apply(this, arguments);
        this.sync();
        return this;
    },

    setXY : function(xy, a, d, c, e){
        this.fixDisplay();
        this.beforeAction();
        this.storeXY(xy);
        var cb = this.createCB(c);
        supr.setXY.call(this, xy, a, d, cb, e);
        if(!a){
            cb();
        }
        return this;
    },

    // private
    createCB : function(c){
        var el = this;
        return function(){
            el.constrainXY();
            el.sync(true);
            if(c){
                c();
            }
        };
    },

    // overridden Element method
    setX : function(x, a, d, c, e){
        this.setXY([x, this.getY()], a, d, c, e);
        return this;
    },

    // overridden Element method
    setY : function(y, a, d, c, e){
        this.setXY([this.getX(), y], a, d, c, e);
        return this;
    },

    // overridden Element method
    setSize : function(w, h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setSize.call(this, w, h, a, d, cb, e);
        if(!a){
            cb();
        }
        return this;
    },

    // overridden Element method
    setWidth : function(w, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setWidth.call(this, w, a, d, cb, e);
        if(!a){
            cb();
        }
        return this;
    },

    // overridden Element method
    setHeight : function(h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setHeight.call(this, h, a, d, cb, e);
        if(!a){
            cb();
        }
        return this;
    },

    // overridden Element method
    setBounds : function(x, y, w, h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        if(!a){
            this.storeXY([x, y]);
            supr.setXY.call(this, [x, y]);
            supr.setSize.call(this, w, h, a, d, cb, e);
            cb();
        }else{
            supr.setBounds.call(this, x, y, w, h, a, d, cb, e);
        }
        return this;
    },

    /**
     * Sets the z-index of this layer and adjusts any shadow and shim z-indexes. The layer z-index is automatically
     * incremented by two more than the value passed in so that it always shows above any shadow or shim (the shadow
     * element, if any, will be assigned z-index + 1, and the shim element, if any, will be assigned the unmodified z-index).
     * @param {Number} zindex The new z-index to set
     * @return {this} The Layer
     */
    setZIndex : function(zindex){
        this.zindex = zindex;
        this.setStyle('z-index', zindex + 2);
        if(this.shadow){
            this.shadow.setZIndex(zindex + 1);
        }
        if(this.shim){
            this.shim.setStyle('z-index', zindex);
        }
        return this;
    }
});
})();
/**
 * @class Ext.Shadow
 * Simple class that can provide a shadow effect for any element.  Note that the element MUST be absolutely positioned,
 * and the shadow does not provide any shimming.  This should be used only in simple cases -- for more advanced
 * functionality that can also provide the same shadow effect, see the {@link Ext.Layer} class.
 * @constructor
 * Create a new Shadow
 * @param {Object} config The config object
 */
Ext.Shadow = function(config){
    Ext.apply(this, config);
    if(typeof this.mode != "string"){
        this.mode = this.defaultMode;
    }
    var o = this.offset, a = {h: 0};
    var rad = Math.floor(this.offset/2);
    switch(this.mode.toLowerCase()){ // all this hideous nonsense calculates the various offsets for shadows
        case "drop":
            a.w = 0;
            a.l = a.t = o;
            a.t -= 1;
            if(Ext.isIE){
                a.l -= this.offset + rad;
                a.t -= this.offset + rad;
                a.w -= rad;
                a.h -= rad;
                a.t += 1;
            }
        break;
        case "sides":
            a.w = (o*2);
            a.l = -o;
            a.t = o-1;
            if(Ext.isIE){
                a.l -= (this.offset - rad);
                a.t -= this.offset + rad;
                a.l += 1;
                a.w -= (this.offset - rad)*2;
                a.w -= rad + 1;
                a.h -= 1;
            }
        break;
        case "frame":
            a.w = a.h = (o*2);
            a.l = a.t = -o;
            a.t += 1;
            a.h -= 2;
            if(Ext.isIE){
                a.l -= (this.offset - rad);
                a.t -= (this.offset - rad);
                a.l += 1;
                a.w -= (this.offset + rad + 1);
                a.h -= (this.offset + rad);
                a.h += 1;
            }
        break;
    };

    this.adjusts = a;
};

Ext.Shadow.prototype = {
    /**
     * @cfg {String} mode
     * The shadow display mode.  Supports the following options:<div class="mdetail-params"><ul>
     * <li><b><tt>sides</tt></b> : Shadow displays on both sides and bottom only</li>
     * <li><b><tt>frame</tt></b> : Shadow displays equally on all four sides</li>
     * <li><b><tt>drop</tt></b> : Traditional bottom-right drop shadow</li>
     * </ul></div>
     */
    /**
     * @cfg {String} offset
     * The number of pixels to offset the shadow from the element (defaults to <tt>4</tt>)
     */
    offset: 4,

    // private
    defaultMode: "drop",

    /**
     * Displays the shadow under the target element
     * @param {Mixed} targetEl The id or element under which the shadow should display
     */
    show : function(target){
        target = Ext.get(target);
        if(!this.el){
            this.el = Ext.Shadow.Pool.pull();
            if(this.el.dom.nextSibling != target.dom){
                this.el.insertBefore(target);
            }
        }
        this.el.setStyle("z-index", this.zIndex || parseInt(target.getStyle("z-index"), 10)-1);
        if(Ext.isIE){
            this.el.dom.style.filter="progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="+(this.offset)+")";
        }
        this.realign(
            target.getLeft(true),
            target.getTop(true),
            target.getWidth(),
            target.getHeight()
        );
        this.el.dom.style.display = "block";
    },

    /**
     * Returns true if the shadow is visible, else false
     */
    isVisible : function(){
        return this.el ? true : false;  
    },

    /**
     * Direct alignment when values are already available. Show must be called at least once before
     * calling this method to ensure it is initialized.
     * @param {Number} left The target element left position
     * @param {Number} top The target element top position
     * @param {Number} width The target element width
     * @param {Number} height The target element height
     */
    realign : function(l, t, w, h){
        if(!this.el){
            return;
        }
        var a = this.adjusts, d = this.el.dom, s = d.style;
        var iea = 0;
        s.left = (l+a.l)+"px";
        s.top = (t+a.t)+"px";
        var sw = (w+a.w), sh = (h+a.h), sws = sw +"px", shs = sh + "px";
        if(s.width != sws || s.height != shs){
            s.width = sws;
            s.height = shs;
            if(!Ext.isIE){
                var cn = d.childNodes;
                var sww = Math.max(0, (sw-12))+"px";
                cn[0].childNodes[1].style.width = sww;
                cn[1].childNodes[1].style.width = sww;
                cn[2].childNodes[1].style.width = sww;
                cn[1].style.height = Math.max(0, (sh-12))+"px";
            }
        }
    },

    /**
     * Hides this shadow
     */
    hide : function(){
        if(this.el){
            this.el.dom.style.display = "none";
            Ext.Shadow.Pool.push(this.el);
            delete this.el;
        }
    },

    /**
     * Adjust the z-index of this shadow
     * @param {Number} zindex The new z-index
     */
    setZIndex : function(z){
        this.zIndex = z;
        if(this.el){
            this.el.setStyle("z-index", z);
        }
    }
};

// Private utility class that manages the internal Shadow cache
Ext.Shadow.Pool = function(){
    var p = [];
    var markup = Ext.isIE ?
                 '<div class="x-ie-shadow"></div>' :
                 '<div class="x-shadow"><div class="xst"><div class="xstl"></div><div class="xstc"></div><div class="xstr"></div></div><div class="xsc"><div class="xsml"></div><div class="xsmc"></div><div class="xsmr"></div></div><div class="xsb"><div class="xsbl"></div><div class="xsbc"></div><div class="xsbr"></div></div></div>';
    return {
        pull : function(){
            var sh = p.shift();
            if(!sh){
                sh = Ext.get(Ext.DomHelper.insertHtml("beforeBegin", document.body.firstChild, markup));
                sh.autoBoxAdjust = false;
            }
            return sh;
        },

        push : function(sh){
            p.push(sh);
        }
    };
}();/**
 * @class Ext.BoxComponent
 * @extends Ext.Component
 * <p>Base class for any {@link Ext.Component Component} that is to be sized as a box, using width and height.</p>
 * <p>BoxComponent provides automatic box model adjustments for sizing and positioning and will work correctly
 * within the Component rendering model.</p>
 * <p>A BoxComponent may be created as a custom Component which encapsulates any HTML element, either a pre-existing
 * element, or one that is created to your specifications at render time. Usually, to participate in layouts,
 * a Component will need to be a <b>Box</b>Component in order to have its width and height managed.</p>
 * <p>To use a pre-existing element as a BoxComponent, configure it so that you preset the <b>el</b> property to the
 * element to reference:<pre><code>
var pageHeader = new Ext.BoxComponent({
    el: 'my-header-div'
});</code></pre>
 * This may then be {@link Ext.Container#add added} to a {@link Ext.Container Container} as a child item.</p>
 * <p>To create a BoxComponent based around a HTML element to be created at render time, use the
 * {@link Ext.Component#autoEl autoEl} config option which takes the form of a
 * {@link Ext.DomHelper DomHelper} specification:<pre><code>
var myImage = new Ext.BoxComponent({
    autoEl: {
        tag: 'img',
        src: '/images/my-image.jpg'
    }
});</code></pre></p>
 * @constructor
 * @param {Ext.Element/String/Object} config The configuration options.
 * @xtype box
 */
Ext.BoxComponent = Ext.extend(Ext.Component, {

    // Configs below are used for all Components when rendered by BoxLayout.
    /**
     * @cfg {Number} flex
     * <p><b>Note</b>: this config is only used when this Component is rendered
     * by a Container which has been configured to use a <b>{@link Ext.layout.BoxLayout BoxLayout}.</b>
     * Each child Component with a <code>flex</code> property will be flexed either vertically (by a VBoxLayout)
     * or horizontally (by an HBoxLayout) according to the item's <b>relative</b> <code>flex</code> value
     * compared to the sum of all Components with <code>flex</flex> value specified. Any child items that have
     * either a <code>flex = 0</code> or <code>flex = undefined</code> will not be 'flexed' (the initial size will not be changed).
     */
    // Configs below are used for all Components when rendered by AnchorLayout.
    /**
     * @cfg {String} anchor <p><b>Note</b>: this config is only used when this Component is rendered
     * by a Container which has been configured to use an <b>{@link Ext.layout.AnchorLayout AnchorLayout} (or subclass thereof).</b>
     * based layout manager, for example:<div class="mdetail-params"><ul>
     * <li>{@link Ext.form.FormPanel}</li>
     * <li>specifying <code>layout: 'anchor' // or 'form', or 'absolute'</code></li>
     * </ul></div></p>
     * <p>See {@link Ext.layout.AnchorLayout}.{@link Ext.layout.AnchorLayout#anchor anchor} also.</p>
     */
    // tabTip config is used when a BoxComponent is a child of a TabPanel
    /**
     * @cfg {String} tabTip
     * <p><b>Note</b>: this config is only used when this BoxComponent is a child item of a TabPanel.</p>
     * A string to be used as innerHTML (html tags are accepted) to show in a tooltip when mousing over
     * the associated tab selector element. {@link Ext.QuickTips}.init()
     * must be called in order for the tips to render.
     */
    // Configs below are used for all Components when rendered by BorderLayout.
    /**
     * @cfg {String} region <p><b>Note</b>: this config is only used when this BoxComponent is rendered
     * by a Container which has been configured to use the <b>{@link Ext.layout.BorderLayout BorderLayout}</b>
     * layout manager (e.g. specifying <tt>layout:'border'</tt>).</p><br>
     * <p>See {@link Ext.layout.BorderLayout} also.</p>
     */
    // margins config is used when a BoxComponent is rendered by BorderLayout or BoxLayout.
    /**
     * @cfg {Object} margins <p><b>Note</b>: this config is only used when this BoxComponent is rendered
     * by a Container which has been configured to use the <b>{@link Ext.layout.BorderLayout BorderLayout}</b>
     * or one of the two <b>{@link Ext.layout.BoxLayout BoxLayout} subclasses.</b></p>
     * <p>An object containing margins to apply to this BoxComponent in the
     * format:</p><pre><code>
{
    top: (top margin),
    right: (right margin),
    bottom: (bottom margin),
    left: (left margin)
}</code></pre>
     * <p>May also be a string containing space-separated, numeric margin values. The order of the
     * sides associated with each value matches the way CSS processes margin values:</p>
     * <p><div class="mdetail-params"><ul>
     * <li>If there is only one value, it applies to all sides.</li>
     * <li>If there are two values, the top and bottom borders are set to the first value and the
     * right and left are set to the second.</li>
     * <li>If there are three values, the top is set to the first value, the left and right are set
     * to the second, and the bottom is set to the third.</li>
     * <li>If there are four values, they apply to the top, right, bottom, and left, respectively.</li>
     * </ul></div></p>
     * <p>Defaults to:</p><pre><code>
     * {top:0, right:0, bottom:0, left:0}
     * </code></pre>
     */
    /**
     * @cfg {Number} x
     * The local x (left) coordinate for this component if contained within a positioning container.
     */
    /**
     * @cfg {Number} y
     * The local y (top) coordinate for this component if contained within a positioning container.
     */
    /**
     * @cfg {Number} pageX
     * The page level x coordinate for this component if contained within a positioning container.
     */
    /**
     * @cfg {Number} pageY
     * The page level y coordinate for this component if contained within a positioning container.
     */
    /**
     * @cfg {Number} height
     * The height of this component in pixels (defaults to auto).
     * <b>Note</b> to express this dimension as a percentage or offset see {@link Ext.Component#anchor}.
     */
    /**
     * @cfg {Number} width
     * The width of this component in pixels (defaults to auto).
     * <b>Note</b> to express this dimension as a percentage or offset see {@link Ext.Component#anchor}.
     */
    /**
     * @cfg {Number} boxMinHeight
     * <p>The minimum value in pixels which this BoxComponent will set its height to.</p>
     * <p><b>Warning:</b> This will override any size management applied by layout managers.</p>
     */
    /**
     * @cfg {Number} boxMinWidth
     * <p>The minimum value in pixels which this BoxComponent will set its width to.</p>
     * <p><b>Warning:</b> This will override any size management applied by layout managers.</p>
     */
    /**
     * @cfg {Number} boxMaxHeight
     * <p>The maximum value in pixels which this BoxComponent will set its height to.</p>
     * <p><b>Warning:</b> This will override any size management applied by layout managers.</p>
     */
    /**
     * @cfg {Number} boxMaxWidth
     * <p>The maximum value in pixels which this BoxComponent will set its width to.</p>
     * <p><b>Warning:</b> This will override any size management applied by layout managers.</p>
     */
    /**
     * @cfg {Boolean} autoHeight
     * <p>True to use height:'auto', false to use fixed height (or allow it to be managed by its parent
     * Container's {@link Ext.Container#layout layout manager}. Defaults to false.</p>
     * <p><b>Note</b>: Although many components inherit this config option, not all will
     * function as expected with a height of 'auto'. Setting autoHeight:true means that the
     * browser will manage height based on the element's contents, and that Ext will not manage it at all.</p>
     * <p>If the <i>browser</i> is managing the height, be aware that resizes performed by the browser in response
     * to changes within the structure of the Component cannot be detected. Therefore changes to the height might
     * result in elements needing to be synchronized with the new height. Example:</p><pre><code>
var w = new Ext.Window({
    title: 'Window',
    width: 600,
    autoHeight: true,
    items: {
        title: 'Collapse Me',
        height: 400,
        collapsible: true,
        border: false,
        listeners: {
            beforecollapse: function() {
                w.el.shadow.hide();
            },
            beforeexpand: function() {
                w.el.shadow.hide();
            },
            collapse: function() {
                w.syncShadow();
            },
            expand: function() {
                w.syncShadow();
            }
        }
    }
}).show();
</code></pre>
     */
    /**
     * @cfg {Boolean} autoWidth
     * <p>True to use width:'auto', false to use fixed width (or allow it to be managed by its parent
     * Container's {@link Ext.Container#layout layout manager}. Defaults to false.</p>
     * <p><b>Note</b>: Although many components  inherit this config option, not all will
     * function as expected with a width of 'auto'. Setting autoWidth:true means that the
     * browser will manage width based on the element's contents, and that Ext will not manage it at all.</p>
     * <p>If the <i>browser</i> is managing the width, be aware that resizes performed by the browser in response
     * to changes within the structure of the Component cannot be detected. Therefore changes to the width might
     * result in elements needing to be synchronized with the new width. For example, where the target element is:</p><pre><code>
&lt;div id='grid-container' style='margin-left:25%;width:50%'>&lt;/div>
</code></pre>
     * A Panel rendered into that target element must listen for browser window resize in order to relay its
      * child items when the browser changes its width:<pre><code>
var myPanel = new Ext.Panel({
    renderTo: 'grid-container',
    monitorResize: true, // relay on browser resize
    title: 'Panel',
    height: 400,
    autoWidth: true,
    layout: 'hbox',
    layoutConfig: {
        align: 'stretch'
    },
    defaults: {
        flex: 1
    },
    items: [{
        title: 'Box 1',
    }, {
        title: 'Box 2'
    }, {
        title: 'Box 3'
    }],
});
</code></pre>
     */
    /**
     * @cfg {Boolean} autoScroll
     * <code>true</code> to use overflow:'auto' on the components layout element and show scroll bars automatically when
     * necessary, <code>false</code> to clip any overflowing content (defaults to <code>false</code>).
     */

    /* // private internal config
     * {Boolean} deferHeight
     * True to defer height calculations to an external component, false to allow this component to set its own
     * height (defaults to false).
     */

    // private
    initComponent : function(){
        Ext.BoxComponent.superclass.initComponent.call(this);
        this.addEvents(
            /**
             * @event resize
             * Fires after the component is resized.
             * @param {Ext.Component} this
             * @param {Number} adjWidth The box-adjusted width that was set
             * @param {Number} adjHeight The box-adjusted height that was set
             * @param {Number} rawWidth The width that was originally specified
             * @param {Number} rawHeight The height that was originally specified
             */
            'resize',
            /**
             * @event move
             * Fires after the component is moved.
             * @param {Ext.Component} this
             * @param {Number} x The new x position
             * @param {Number} y The new y position
             */
            'move'
        );
    },

    // private, set in afterRender to signify that the component has been rendered
    boxReady : false,
    // private, used to defer height settings to subclasses
    deferHeight: false,

    /**
     * Sets the width and height of this BoxComponent. This method fires the {@link #resize} event. This method can accept
     * either width and height as separate arguments, or you can pass a size object like <code>{width:10, height:20}</code>.
     * @param {Mixed} width The new width to set. This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new width in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS width style.</li>
     * <li>A size object in the format <code>{width: widthValue, height: heightValue}</code>.</li>
     * <li><code>undefined</code> to leave the width unchanged.</li>
     * </ul></div>
     * @param {Mixed} height The new height to set (not required if a size object is passed as the first arg).
     * This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new height in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
     * <li><code>undefined</code> to leave the height unchanged.</li>
     * </ul></div>
     * @return {Ext.BoxComponent} this
     */
    setSize : function(w, h){

        // support for standard size objects
        if(typeof w == 'object'){
            h = w.height;
            w = w.width;
        }
        if (Ext.isDefined(w) && Ext.isDefined(this.boxMinWidth) && (w < this.boxMinWidth)) {
            w = this.boxMinWidth;
        }
        if (Ext.isDefined(h) && Ext.isDefined(this.boxMinHeight) && (h < this.boxMinHeight)) {
            h = this.boxMinHeight;
        }
        if (Ext.isDefined(w) && Ext.isDefined(this.boxMaxWidth) && (w > this.boxMaxWidth)) {
            w = this.boxMaxWidth;
        }
        if (Ext.isDefined(h) && Ext.isDefined(this.boxMaxHeight) && (h > this.boxMaxHeight)) {
            h = this.boxMaxHeight;
        }
        // not rendered
        if(!this.boxReady){
            this.width  = w;
            this.height = h;
            return this;
        }

        // prevent recalcs when not needed
        if(this.cacheSizes !== false && this.lastSize && this.lastSize.width == w && this.lastSize.height == h){
            return this;
        }
        this.lastSize = {width: w, height: h};
        var adj = this.adjustSize(w, h),
            aw = adj.width,
            ah = adj.height,
            rz;
        if(aw !== undefined || ah !== undefined){ // this code is nasty but performs better with floaters
            rz = this.getResizeEl();
            if(!this.deferHeight && aw !== undefined && ah !== undefined){
                rz.setSize(aw, ah);
            }else if(!this.deferHeight && ah !== undefined){
                rz.setHeight(ah);
            }else if(aw !== undefined){
                rz.setWidth(aw);
            }
            this.onResize(aw, ah, w, h);
            this.fireEvent('resize', this, aw, ah, w, h);
        }
        return this;
    },

    /**
     * Sets the width of the component.  This method fires the {@link #resize} event.
     * @param {Mixed} width The new width to set. This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new width in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS width style.</li>
     * </ul></div>
     * @return {Ext.BoxComponent} this
     */
    setWidth : function(width){
        return this.setSize(width);
    },

    /**
     * Sets the height of the component.  This method fires the {@link #resize} event.
     * @param {Mixed} height The new height to set. This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new height in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS height style.</li>
     * <li><i>undefined</i> to leave the height unchanged.</li>
     * </ul></div>
     * @return {Ext.BoxComponent} this
     */
    setHeight : function(height){
        return this.setSize(undefined, height);
    },

    /**
     * Gets the current size of the component's underlying element.
     * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
     */
    getSize : function(){
        return this.getResizeEl().getSize();
    },

    /**
     * Gets the current width of the component's underlying element.
     * @return {Number}
     */
    getWidth : function(){
        return this.getResizeEl().getWidth();
    },

    /**
     * Gets the current height of the component's underlying element.
     * @return {Number}
     */
    getHeight : function(){
        return this.getResizeEl().getHeight();
    },

    /**
     * Gets the current size of the component's underlying element, including space taken by its margins.
     * @return {Object} An object containing the element's size {width: (element width + left/right margins), height: (element height + top/bottom margins)}
     */
    getOuterSize : function(){
        var el = this.getResizeEl();
        return {width: el.getWidth() + el.getMargins('lr'),
                height: el.getHeight() + el.getMargins('tb')};
    },

    /**
     * Gets the current XY position of the component's underlying element.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page XY (defaults to false)
     * @return {Array} The XY position of the element (e.g., [100, 200])
     */
    getPosition : function(local){
        var el = this.getPositionEl();
        if(local === true){
            return [el.getLeft(true), el.getTop(true)];
        }
        return this.xy || el.getXY();
    },

    /**
     * Gets the current box measurements of the component's underlying element.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page XY (defaults to false)
     * @return {Object} box An object in the format {x, y, width, height}
     */
    getBox : function(local){
        var pos = this.getPosition(local);
        var s = this.getSize();
        s.x = pos[0];
        s.y = pos[1];
        return s;
    },

    /**
     * Sets the current box measurements of the component's underlying element.
     * @param {Object} box An object in the format {x, y, width, height}
     * @return {Ext.BoxComponent} this
     */
    updateBox : function(box){
        this.setSize(box.width, box.height);
        this.setPagePosition(box.x, box.y);
        return this;
    },

    /**
     * <p>Returns the outermost Element of this Component which defines the Components overall size.</p>
     * <p><i>Usually</i> this will return the same Element as <code>{@link #getEl}</code>,
     * but in some cases, a Component may have some more wrapping Elements around its main
     * active Element.</p>
     * <p>An example is a ComboBox. It is encased in a <i>wrapping</i> Element which
     * contains both the <code>&lt;input></code> Element (which is what would be returned
     * by its <code>{@link #getEl}</code> method, <i>and</i> the trigger button Element.
     * This Element is returned as the <code>resizeEl</code>.
     * @return {Ext.Element} The Element which is to be resized by size managing layouts.
     */
    getResizeEl : function(){
        return this.resizeEl || this.el;
    },

    /**
     * Sets the overflow on the content element of the component.
     * @param {Boolean} scroll True to allow the Component to auto scroll.
     * @return {Ext.BoxComponent} this
     */
    setAutoScroll : function(scroll){
        if(this.rendered){
            this.getContentTarget().setOverflow(scroll ? 'auto' : '');
        }
        this.autoScroll = scroll;
        return this;
    },

    /**
     * Sets the left and top of the component.  To set the page XY position instead, use {@link #setPagePosition}.
     * This method fires the {@link #move} event.
     * @param {Number} left The new left
     * @param {Number} top The new top
     * @return {Ext.BoxComponent} this
     */
    setPosition : function(x, y){
        if(x && typeof x[1] == 'number'){
            y = x[1];
            x = x[0];
        }
        this.x = x;
        this.y = y;
        if(!this.boxReady){
            return this;
        }
        var adj = this.adjustPosition(x, y);
        var ax = adj.x, ay = adj.y;

        var el = this.getPositionEl();
        if(ax !== undefined || ay !== undefined){
            if(ax !== undefined && ay !== undefined){
                el.setLeftTop(ax, ay);
            }else if(ax !== undefined){
                el.setLeft(ax);
            }else if(ay !== undefined){
                el.setTop(ay);
            }
            this.onPosition(ax, ay);
            this.fireEvent('move', this, ax, ay);
        }
        return this;
    },

    /**
     * Sets the page XY position of the component.  To set the left and top instead, use {@link #setPosition}.
     * This method fires the {@link #move} event.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     * @return {Ext.BoxComponent} this
     */
    setPagePosition : function(x, y){
        if(x && typeof x[1] == 'number'){
            y = x[1];
            x = x[0];
        }
        this.pageX = x;
        this.pageY = y;
        if(!this.boxReady){
            return;
        }
        if(x === undefined || y === undefined){ // cannot translate undefined points
            return;
        }
        var p = this.getPositionEl().translatePoints(x, y);
        this.setPosition(p.left, p.top);
        return this;
    },

    // private
    afterRender : function(){
        Ext.BoxComponent.superclass.afterRender.call(this);
        if(this.resizeEl){
            this.resizeEl = Ext.get(this.resizeEl);
        }
        if(this.positionEl){
            this.positionEl = Ext.get(this.positionEl);
        }
        this.boxReady = true;
        Ext.isDefined(this.autoScroll) && this.setAutoScroll(this.autoScroll);
        this.setSize(this.width, this.height);
        if(this.x || this.y){
            this.setPosition(this.x, this.y);
        }else if(this.pageX || this.pageY){
            this.setPagePosition(this.pageX, this.pageY);
        }
    },

    /**
     * Force the component's size to recalculate based on the underlying element's current height and width.
     * @return {Ext.BoxComponent} this
     */
    syncSize : function(){
        delete this.lastSize;
        this.setSize(this.autoWidth ? undefined : this.getResizeEl().getWidth(), this.autoHeight ? undefined : this.getResizeEl().getHeight());
        return this;
    },

    /* // protected
     * Called after the component is resized, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a resize occurs.
     * @param {Number} adjWidth The box-adjusted width that was set
     * @param {Number} adjHeight The box-adjusted height that was set
     * @param {Number} rawWidth The width that was originally specified
     * @param {Number} rawHeight The height that was originally specified
     */
    onResize : function(adjWidth, adjHeight, rawWidth, rawHeight){
    },

    /* // protected
     * Called after the component is moved, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a move occurs.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     */
    onPosition : function(x, y){

    },

    // private
    adjustSize : function(w, h){
        if(this.autoWidth){
            w = 'auto';
        }
        if(this.autoHeight){
            h = 'auto';
        }
        return {width : w, height: h};
    },

    // private
    adjustPosition : function(x, y){
        return {x : x, y: y};
    }
});
Ext.reg('box', Ext.BoxComponent);


/**
 * @class Ext.Spacer
 * @extends Ext.BoxComponent
 * <p>Used to provide a sizable space in a layout.</p>
 * @constructor
 * @param {Object} config
 */
Ext.Spacer = Ext.extend(Ext.BoxComponent, {
    autoEl:'div'
});
Ext.reg('spacer', Ext.Spacer);/**
 * @class Ext.SplitBar
 * @extends Ext.util.Observable
 * Creates draggable splitter bar functionality from two elements (element to be dragged and element to be resized).
 * <br><br>
 * Usage:
 * <pre><code>
var split = new Ext.SplitBar("elementToDrag", "elementToSize",
                   Ext.SplitBar.HORIZONTAL, Ext.SplitBar.LEFT);
split.setAdapter(new Ext.SplitBar.AbsoluteLayoutAdapter("container"));
split.minSize = 100;
split.maxSize = 600;
split.animate = true;
split.on('moved', splitterMoved);
</code></pre>
 * @constructor
 * Create a new SplitBar
 * @param {Mixed} dragElement The element to be dragged and act as the SplitBar.
 * @param {Mixed} resizingElement The element to be resized based on where the SplitBar element is dragged
 * @param {Number} orientation (optional) Either Ext.SplitBar.HORIZONTAL or Ext.SplitBar.VERTICAL. (Defaults to HORIZONTAL)
 * @param {Number} placement (optional) Either Ext.SplitBar.LEFT or Ext.SplitBar.RIGHT for horizontal or
                        Ext.SplitBar.TOP or Ext.SplitBar.BOTTOM for vertical. (By default, this is determined automatically by the initial
                        position of the SplitBar).
 */
Ext.SplitBar = function(dragElement, resizingElement, orientation, placement, existingProxy){

    /** @private */
    this.el = Ext.get(dragElement, true);
    this.el.dom.unselectable = "on";
    /** @private */
    this.resizingEl = Ext.get(resizingElement, true);

    /**
     * @private
     * The orientation of the split. Either Ext.SplitBar.HORIZONTAL or Ext.SplitBar.VERTICAL. (Defaults to HORIZONTAL)
     * Note: If this is changed after creating the SplitBar, the placement property must be manually updated
     * @type Number
     */
    this.orientation = orientation || Ext.SplitBar.HORIZONTAL;

    /**
     * The increment, in pixels by which to move this SplitBar. When <i>undefined</i>, the SplitBar moves smoothly.
     * @type Number
     * @property tickSize
     */
    /**
     * The minimum size of the resizing element. (Defaults to 0)
     * @type Number
     */
    this.minSize = 0;

    /**
     * The maximum size of the resizing element. (Defaults to 2000)
     * @type Number
     */
    this.maxSize = 2000;

    /**
     * Whether to animate the transition to the new size
     * @type Boolean
     */
    this.animate = false;

    /**
     * Whether to create a transparent shim that overlays the page when dragging, enables dragging across iframes.
     * @type Boolean
     */
    this.useShim = false;

    /** @private */
    this.shim = null;

    if(!existingProxy){
        /** @private */
        this.proxy = Ext.SplitBar.createProxy(this.orientation);
    }else{
        this.proxy = Ext.get(existingProxy).dom;
    }
    /** @private */
    this.dd = new Ext.dd.DDProxy(this.el.dom.id, "XSplitBars", {dragElId : this.proxy.id});

    /** @private */
    this.dd.b4StartDrag = this.onStartProxyDrag.createDelegate(this);

    /** @private */
    this.dd.endDrag = this.onEndProxyDrag.createDelegate(this);

    /** @private */
    this.dragSpecs = {};

    /**
     * @private The adapter to use to positon and resize elements
     */
    this.adapter = new Ext.SplitBar.BasicLayoutAdapter();
    this.adapter.init(this);

    if(this.orientation == Ext.SplitBar.HORIZONTAL){
        /** @private */
        this.placement = placement || (this.el.getX() > this.resizingEl.getX() ? Ext.SplitBar.LEFT : Ext.SplitBar.RIGHT);
        this.el.addClass("x-splitbar-h");
    }else{
        /** @private */
        this.placement = placement || (this.el.getY() > this.resizingEl.getY() ? Ext.SplitBar.TOP : Ext.SplitBar.BOTTOM);
        this.el.addClass("x-splitbar-v");
    }

    this.addEvents(
        /**
         * @event resize
         * Fires when the splitter is moved (alias for {@link #moved})
         * @param {Ext.SplitBar} this
         * @param {Number} newSize the new width or height
         */
        "resize",
        /**
         * @event moved
         * Fires when the splitter is moved
         * @param {Ext.SplitBar} this
         * @param {Number} newSize the new width or height
         */
        "moved",
        /**
         * @event beforeresize
         * Fires before the splitter is dragged
         * @param {Ext.SplitBar} this
         */
        "beforeresize",

        "beforeapply"
    );

    Ext.SplitBar.superclass.constructor.call(this);
};

Ext.extend(Ext.SplitBar, Ext.util.Observable, {
    onStartProxyDrag : function(x, y){
        this.fireEvent("beforeresize", this);
        this.overlay =  Ext.DomHelper.append(document.body,  {cls: "x-drag-overlay", html: "&#160;"}, true);
        this.overlay.unselectable();
        this.overlay.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom.getViewHeight(true));
        this.overlay.show();
        Ext.get(this.proxy).setDisplayed("block");
        var size = this.adapter.getElementSize(this);
        this.activeMinSize = this.getMinimumSize();
        this.activeMaxSize = this.getMaximumSize();
        var c1 = size - this.activeMinSize;
        var c2 = Math.max(this.activeMaxSize - size, 0);
        if(this.orientation == Ext.SplitBar.HORIZONTAL){
            this.dd.resetConstraints();
            this.dd.setXConstraint(
                this.placement == Ext.SplitBar.LEFT ? c1 : c2,
                this.placement == Ext.SplitBar.LEFT ? c2 : c1,
                this.tickSize
            );
            this.dd.setYConstraint(0, 0);
        }else{
            this.dd.resetConstraints();
            this.dd.setXConstraint(0, 0);
            this.dd.setYConstraint(
                this.placement == Ext.SplitBar.TOP ? c1 : c2,
                this.placement == Ext.SplitBar.TOP ? c2 : c1,
                this.tickSize
            );
         }
        this.dragSpecs.startSize = size;
        this.dragSpecs.startPoint = [x, y];
        Ext.dd.DDProxy.prototype.b4StartDrag.call(this.dd, x, y);
    },

    /**
     * @private Called after the drag operation by the DDProxy
     */
    onEndProxyDrag : function(e){
        Ext.get(this.proxy).setDisplayed(false);
        var endPoint = Ext.lib.Event.getXY(e);
        if(this.overlay){
            Ext.destroy(this.overlay);
            delete this.overlay;
        }
        var newSize;
        if(this.orientation == Ext.SplitBar.HORIZONTAL){
            newSize = this.dragSpecs.startSize +
                (this.placement == Ext.SplitBar.LEFT ?
                    endPoint[0] - this.dragSpecs.startPoint[0] :
                    this.dragSpecs.startPoint[0] - endPoint[0]
                );
        }else{
            newSize = this.dragSpecs.startSize +
                (this.placement == Ext.SplitBar.TOP ?
                    endPoint[1] - this.dragSpecs.startPoint[1] :
                    this.dragSpecs.startPoint[1] - endPoint[1]
                );
        }
        newSize = Math.min(Math.max(newSize, this.activeMinSize), this.activeMaxSize);
        if(newSize != this.dragSpecs.startSize){
            if(this.fireEvent('beforeapply', this, newSize) !== false){
                this.adapter.setElementSize(this, newSize);
                this.fireEvent("moved", this, newSize);
                this.fireEvent("resize", this, newSize);
            }
        }
    },

    /**
     * Get the adapter this SplitBar uses
     * @return The adapter object
     */
    getAdapter : function(){
        return this.adapter;
    },

    /**
     * Set the adapter this SplitBar uses
     * @param {Object} adapter A SplitBar adapter object
     */
    setAdapter : function(adapter){
        this.adapter = adapter;
        this.adapter.init(this);
    },

    /**
     * Gets the minimum size for the resizing element
     * @return {Number} The minimum size
     */
    getMinimumSize : function(){
        return this.minSize;
    },

    /**
     * Sets the minimum size for the resizing element
     * @param {Number} minSize The minimum size
     */
    setMinimumSize : function(minSize){
        this.minSize = minSize;
    },

    /**
     * Gets the maximum size for the resizing element
     * @return {Number} The maximum size
     */
    getMaximumSize : function(){
        return this.maxSize;
    },

    /**
     * Sets the maximum size for the resizing element
     * @param {Number} maxSize The maximum size
     */
    setMaximumSize : function(maxSize){
        this.maxSize = maxSize;
    },

    /**
     * Sets the initialize size for the resizing element
     * @param {Number} size The initial size
     */
    setCurrentSize : function(size){
        var oldAnimate = this.animate;
        this.animate = false;
        this.adapter.setElementSize(this, size);
        this.animate = oldAnimate;
    },

    /**
     * Destroy this splitbar.
     * @param {Boolean} removeEl True to remove the element
     */
    destroy : function(removeEl){
        Ext.destroy(this.shim, Ext.get(this.proxy));
        this.dd.unreg();
        if(removeEl){
            this.el.remove();
        }
        this.purgeListeners();
    }
});

/**
 * @private static Create our own proxy element element. So it will be the same same size on all browsers, we won't use borders. Instead we use a background color.
 */
Ext.SplitBar.createProxy = function(dir){
    var proxy = new Ext.Element(document.createElement("div"));
    document.body.appendChild(proxy.dom);
    proxy.unselectable();
    var cls = 'x-splitbar-proxy';
    proxy.addClass(cls + ' ' + (dir == Ext.SplitBar.HORIZONTAL ? cls +'-h' : cls + '-v'));
    return proxy.dom;
};

/**
 * @class Ext.SplitBar.BasicLayoutAdapter
 * Default Adapter. It assumes the splitter and resizing element are not positioned
 * elements and only gets/sets the width of the element. Generally used for table based layouts.
 */
Ext.SplitBar.BasicLayoutAdapter = function(){
};

Ext.SplitBar.BasicLayoutAdapter.prototype = {
    // do nothing for now
    init : function(s){

    },
    /**
     * Called before drag operations to get the current size of the resizing element.
     * @param {Ext.SplitBar} s The SplitBar using this adapter
     */
     getElementSize : function(s){
        if(s.orientation == Ext.SplitBar.HORIZONTAL){
            return s.resizingEl.getWidth();
        }else{
            return s.resizingEl.getHeight();
        }
    },

    /**
     * Called after drag operations to set the size of the resizing element.
     * @param {Ext.SplitBar} s The SplitBar using this adapter
     * @param {Number} newSize The new size to set
     * @param {Function} onComplete A function to be invoked when resizing is complete
     */
    setElementSize : function(s, newSize, onComplete){
        if(s.orientation == Ext.SplitBar.HORIZONTAL){
            if(!s.animate){
                s.resizingEl.setWidth(newSize);
                if(onComplete){
                    onComplete(s, newSize);
                }
            }else{
                s.resizingEl.setWidth(newSize, true, .1, onComplete, 'easeOut');
            }
        }else{

            if(!s.animate){
                s.resizingEl.setHeight(newSize);
                if(onComplete){
                    onComplete(s, newSize);
                }
            }else{
                s.resizingEl.setHeight(newSize, true, .1, onComplete, 'easeOut');
            }
        }
    }
};

/**
 *@class Ext.SplitBar.AbsoluteLayoutAdapter
 * @extends Ext.SplitBar.BasicLayoutAdapter
 * Adapter that  moves the splitter element to align with the resized sizing element.
 * Used with an absolute positioned SplitBar.
 * @param {Mixed} container The container that wraps around the absolute positioned content. If it's
 * document.body, make sure you assign an id to the body element.
 */
Ext.SplitBar.AbsoluteLayoutAdapter = function(container){
    this.basic = new Ext.SplitBar.BasicLayoutAdapter();
    this.container = Ext.get(container);
};

Ext.SplitBar.AbsoluteLayoutAdapter.prototype = {
    init : function(s){
        this.basic.init(s);
    },

    getElementSize : function(s){
        return this.basic.getElementSize(s);
    },

    setElementSize : function(s, newSize, onComplete){
        this.basic.setElementSize(s, newSize, this.moveSplitter.createDelegate(this, [s]));
    },

    moveSplitter : function(s){
        var yes = Ext.SplitBar;
        switch(s.placement){
            case yes.LEFT:
                s.el.setX(s.resizingEl.getRight());
                break;
            case yes.RIGHT:
                s.el.setStyle("right", (this.container.getWidth() - s.resizingEl.getLeft()) + "px");
                break;
            case yes.TOP:
                s.el.setY(s.resizingEl.getBottom());
                break;
            case yes.BOTTOM:
                s.el.setY(s.resizingEl.getTop() - s.el.getHeight());
                break;
        }
    }
};

/**
 * Orientation constant - Create a vertical SplitBar
 * @static
 * @type Number
 */
Ext.SplitBar.VERTICAL = 1;

/**
 * Orientation constant - Create a horizontal SplitBar
 * @static
 * @type Number
 */
Ext.SplitBar.HORIZONTAL = 2;

/**
 * Placement constant - The resizing element is to the left of the splitter element
 * @static
 * @type Number
 */
Ext.SplitBar.LEFT = 1;

/**
 * Placement constant - The resizing element is to the right of the splitter element
 * @static
 * @type Number
 */
Ext.SplitBar.RIGHT = 2;

/**
 * Placement constant - The resizing element is positioned above the splitter element
 * @static
 * @type Number
 */
Ext.SplitBar.TOP = 3;

/**
 * Placement constant - The resizing element is positioned under splitter element
 * @static
 * @type Number
 */
Ext.SplitBar.BOTTOM = 4;
/**
 * @class Ext.Container
 * @extends Ext.BoxComponent
 * <p>Base class for any {@link Ext.BoxComponent} that may contain other Components. Containers handle the
 * basic behavior of containing items, namely adding, inserting and removing items.</p>
 *
 * <p>The most commonly used Container classes are {@link Ext.Panel}, {@link Ext.Window} and {@link Ext.TabPanel}.
 * If you do not need the capabilities offered by the aforementioned classes you can create a lightweight
 * Container to be encapsulated by an HTML element to your specifications by using the
 * <code><b>{@link Ext.Component#autoEl autoEl}</b></code> config option. This is a useful technique when creating
 * embedded {@link Ext.layout.ColumnLayout column} layouts inside {@link Ext.form.FormPanel FormPanels}
 * for example.</p>
 *
 * <p>The code below illustrates both how to explicitly create a Container, and how to implicitly
 * create one using the <b><code>'container'</code></b> xtype:<pre><code>
// explicitly create a Container
var embeddedColumns = new Ext.Container({
    autoEl: 'div',  // This is the default
    layout: 'column',
    defaults: {
        // implicitly create Container by specifying xtype
        xtype: 'container',
        autoEl: 'div', // This is the default.
        layout: 'form',
        columnWidth: 0.5,
        style: {
            padding: '10px'
        }
    },
//  The two items below will be Ext.Containers, each encapsulated by a &lt;DIV> element.
    items: [{
        items: {
            xtype: 'datefield',
            name: 'startDate',
            fieldLabel: 'Start date'
        }
    }, {
        items: {
            xtype: 'datefield',
            name: 'endDate',
            fieldLabel: 'End date'
        }
    }]
});</code></pre></p>
 *
 * <p><u><b>Layout</b></u></p>
 * <p>Container classes delegate the rendering of child Components to a layout
 * manager class which must be configured into the Container using the
 * <code><b>{@link #layout}</b></code> configuration property.</p>
 * <p>When either specifying child <code>{@link #items}</code> of a Container,
 * or dynamically {@link #add adding} Components to a Container, remember to
 * consider how you wish the Container to arrange those child elements, and
 * whether those child elements need to be sized using one of Ext's built-in
 * <b><code>{@link #layout}</code></b> schemes. By default, Containers use the
 * {@link Ext.layout.ContainerLayout ContainerLayout} scheme which only
 * renders child components, appending them one after the other inside the
 * Container, and <b>does not apply any sizing</b> at all.</p>
 * <p>A common mistake is when a developer neglects to specify a
 * <b><code>{@link #layout}</code></b> (e.g. widgets like GridPanels or
 * TreePanels are added to Containers for which no <code><b>{@link #layout}</b></code>
 * has been specified). If a Container is left to use the default
 * {@link Ext.layout.ContainerLayout ContainerLayout} scheme, none of its
 * child components will be resized, or changed in any way when the Container
 * is resized.</p>
 * <p>Certain layout managers allow dynamic addition of child components.
 * Those that do include {@link Ext.layout.CardLayout},
 * {@link Ext.layout.AnchorLayout}, {@link Ext.layout.FormLayout}, and
 * {@link Ext.layout.TableLayout}. For example:<pre><code>
//  Create the GridPanel.
var myNewGrid = new Ext.grid.GridPanel({
    store: myStore,
    columns: myColumnModel,
    title: 'Results', // the title becomes the title of the tab
});

myTabPanel.add(myNewGrid); // {@link Ext.TabPanel} implicitly uses {@link Ext.layout.CardLayout CardLayout}
myTabPanel.{@link Ext.TabPanel#setActiveTab setActiveTab}(myNewGrid);
 * </code></pre></p>
 * <p>The example above adds a newly created GridPanel to a TabPanel. Note that
 * a TabPanel uses {@link Ext.layout.CardLayout} as its layout manager which
 * means all its child items are sized to {@link Ext.layout.FitLayout fit}
 * exactly into its client area.
 * <p><b><u>Overnesting is a common problem</u></b>.
 * An example of overnesting occurs when a GridPanel is added to a TabPanel
 * by wrapping the GridPanel <i>inside</i> a wrapping Panel (that has no
 * <code><b>{@link #layout}</b></code> specified) and then add that wrapping Panel
 * to the TabPanel. The point to realize is that a GridPanel <b>is</b> a
 * Component which can be added directly to a Container. If the wrapping Panel
 * has no <code><b>{@link #layout}</b></code> configuration, then the overnested
 * GridPanel will not be sized as expected.<p>
 *
 * <p><u><b>Adding via remote configuration</b></u></p>
 *
 * <p>A server side script can be used to add Components which are generated dynamically on the server.
 * An example of adding a GridPanel to a TabPanel where the GridPanel is generated by the server
 * based on certain parameters:
 * </p><pre><code>
// execute an Ajax request to invoke server side script:
Ext.Ajax.request({
    url: 'gen-invoice-grid.php',
    // send additional parameters to instruct server script
    params: {
        startDate: Ext.getCmp('start-date').getValue(),
        endDate: Ext.getCmp('end-date').getValue()
    },
    // process the response object to add it to the TabPanel:
    success: function(xhr) {
        var newComponent = eval(xhr.responseText); // see discussion below
        myTabPanel.add(newComponent); // add the component to the TabPanel
        myTabPanel.setActiveTab(newComponent);
    },
    failure: function() {
        Ext.Msg.alert("Grid create failed", "Server communication failure");
    }
});
</code></pre>
 * <p>The server script needs to return an executable Javascript statement which, when processed
 * using <code>eval()</code>, will return either a config object with an {@link Ext.Component#xtype xtype},
 * or an instantiated Component. The server might return this for example:</p><pre><code>
(function() {
    function formatDate(value){
        return value ? value.dateFormat('M d, Y') : '';
    };

    var store = new Ext.data.Store({
        url: 'get-invoice-data.php',
        baseParams: {
            startDate: '01/01/2008',
            endDate: '01/31/2008'
        },
        reader: new Ext.data.JsonReader({
            record: 'transaction',
            idProperty: 'id',
            totalRecords: 'total'
        }, [
           'customer',
           'invNo',
           {name: 'date', type: 'date', dateFormat: 'm/d/Y'},
           {name: 'value', type: 'float'}
        ])
    });

    var grid = new Ext.grid.GridPanel({
        title: 'Invoice Report',
        bbar: new Ext.PagingToolbar(store),
        store: store,
        columns: [
            {header: "Customer", width: 250, dataIndex: 'customer', sortable: true},
            {header: "Invoice Number", width: 120, dataIndex: 'invNo', sortable: true},
            {header: "Invoice Date", width: 100, dataIndex: 'date', renderer: formatDate, sortable: true},
            {header: "Value", width: 120, dataIndex: 'value', renderer: 'usMoney', sortable: true}
        ],
    });
    store.load();
    return grid;  // return instantiated component
})();
</code></pre>
 * <p>When the above code fragment is passed through the <code>eval</code> function in the success handler
 * of the Ajax request, the code is executed by the Javascript processor, and the anonymous function
 * runs, and returns the instantiated grid component.</p>
 * <p>Note: since the code above is <i>generated</i> by a server script, the <code>baseParams</code> for
 * the Store, the metadata to allow generation of the Record layout, and the ColumnModel
 * can all be generated into the code since these are all known on the server.</p>
 *
 * @xtype container
 */
Ext.Container = Ext.extend(Ext.BoxComponent, {
    /**
     * @cfg {Boolean} monitorResize
     * True to automatically monitor window resize events to handle anything that is sensitive to the current size
     * of the viewport.  This value is typically managed by the chosen <code>{@link #layout}</code> and should not need
     * to be set manually.
     */
    /**
     * @cfg {String/Object} layout
     * <p><b>*Important</b>: In order for child items to be correctly sized and
     * positioned, typically a layout manager <b>must</b> be specified through
     * the <code>layout</code> configuration option.</p>
     * <br><p>The sizing and positioning of child {@link items} is the responsibility of
     * the Container's layout manager which creates and manages the type of layout
     * you have in mind.  For example:</p><pre><code>
new Ext.Window({
    width:300, height: 300,
    layout: 'fit', // explicitly set layout manager: override the default (layout:'auto')
    items: [{
        title: 'Panel inside a Window'
    }]
}).show();
     * </code></pre>
     * <p>If the {@link #layout} configuration is not explicitly specified for
     * a general purpose container (e.g. Container or Panel) the
     * {@link Ext.layout.ContainerLayout default layout manager} will be used
     * which does nothing but render child components sequentially into the
     * Container (no sizing or positioning will be performed in this situation).
     * Some container classes implicitly specify a default layout
     * (e.g. FormPanel specifies <code>layout:'form'</code>). Other specific
     * purpose classes internally specify/manage their internal layout (e.g.
     * GridPanel, TabPanel, TreePanel, Toolbar, Menu, etc.).</p>
     * <br><p><b><code>layout</code></b> may be specified as either as an Object or
     * as a String:</p><div><ul class="mdetail-params">
     *
     * <li><u>Specify as an Object</u></li>
     * <div><ul class="mdetail-params">
     * <li>Example usage:</li>
<pre><code>
layout: {
    type: 'vbox',
    padding: '5',
    align: 'left'
}
</code></pre>
     *
     * <li><code><b>type</b></code></li>
     * <br/><p>The layout type to be used for this container.  If not specified,
     * a default {@link Ext.layout.ContainerLayout} will be created and used.</p>
     * <br/><p>Valid layout <code>type</code> values are:</p>
     * <div class="sub-desc"><ul class="mdetail-params">
     * <li><code><b>{@link Ext.layout.AbsoluteLayout absolute}</b></code></li>
     * <li><code><b>{@link Ext.layout.AccordionLayout accordion}</b></code></li>
     * <li><code><b>{@link Ext.layout.AnchorLayout anchor}</b></code></li>
     * <li><code><b>{@link Ext.layout.ContainerLayout auto}</b></code> &nbsp;&nbsp;&nbsp; <b>Default</b></li>
     * <li><code><b>{@link Ext.layout.BorderLayout border}</b></code></li>
     * <li><code><b>{@link Ext.layout.CardLayout card}</b></code></li>
     * <li><code><b>{@link Ext.layout.ColumnLayout column}</b></code></li>
     * <li><code><b>{@link Ext.layout.FitLayout fit}</b></code></li>
     * <li><code><b>{@link Ext.layout.FormLayout form}</b></code></li>
     * <li><code><b>{@link Ext.layout.HBoxLayout hbox}</b></code></li>
     * <li><code><b>{@link Ext.layout.MenuLayout menu}</b></code></li>
     * <li><code><b>{@link Ext.layout.TableLayout table}</b></code></li>
     * <li><code><b>{@link Ext.layout.ToolbarLayout toolbar}</b></code></li>
     * <li><code><b>{@link Ext.layout.VBoxLayout vbox}</b></code></li>
     * </ul></div>
     *
     * <li>Layout specific configuration properties</li>
     * <br/><p>Additional layout specific configuration properties may also be
     * specified. For complete details regarding the valid config options for
     * each layout type, see the layout class corresponding to the <code>type</code>
     * specified.</p>
     *
     * </ul></div>
     *
     * <li><u>Specify as a String</u></li>
     * <div><ul class="mdetail-params">
     * <li>Example usage:</li>
<pre><code>
layout: 'vbox',
layoutConfig: {
    padding: '5',
    align: 'left'
}
</code></pre>
     * <li><code><b>layout</b></code></li>
     * <br/><p>The layout <code>type</code> to be used for this container (see list
     * of valid layout type values above).</p><br/>
     * <li><code><b>{@link #layoutConfig}</b></code></li>
     * <br/><p>Additional layout specific configuration properties. For complete
     * details regarding the valid config options for each layout type, see the
     * layout class corresponding to the <code>layout</code> specified.</p>
     * </ul></div></ul></div>
     */
    /**
     * @cfg {Object} layoutConfig
     * This is a config object containing properties specific to the chosen
     * <b><code>{@link #layout}</code></b> if <b><code>{@link #layout}</code></b>
     * has been specified as a <i>string</i>.</p>
     */
    /**
     * @cfg {Boolean/Number} bufferResize
     * When set to true (50 milliseconds) or a number of milliseconds, the layout assigned for this container will buffer
     * the frequency it calculates and does a re-layout of components. This is useful for heavy containers or containers
     * with a large quantity of sub-components for which frequent layout calls would be expensive. Defaults to <code>50</code>.
     */
    bufferResize: 50,

    /**
     * @cfg {String/Number} activeItem
     * A string component id or the numeric index of the component that should be initially activated within the
     * container's layout on render.  For example, activeItem: 'item-1' or activeItem: 0 (index 0 = the first
     * item in the container's collection).  activeItem only applies to layout styles that can display
     * items one at a time (like {@link Ext.layout.AccordionLayout}, {@link Ext.layout.CardLayout} and
     * {@link Ext.layout.FitLayout}).  Related to {@link Ext.layout.ContainerLayout#activeItem}.
     */
    /**
     * @cfg {Object/Array} items
     * <pre><b>** IMPORTANT</b>: be sure to <b>{@link #layout specify a <code>layout</code>} if needed ! **</b></pre>
     * <p>A single item, or an array of child Components to be added to this container,
     * for example:</p>
     * <pre><code>
// specifying a single item
items: {...},
layout: 'fit',    // specify a layout!

// specifying multiple items
items: [{...}, {...}],
layout: 'anchor', // specify a layout!
     * </code></pre>
     * <p>Each item may be:</p>
     * <div><ul class="mdetail-params">
     * <li>any type of object based on {@link Ext.Component}</li>
     * <li>a fully instanciated object or</li>
     * <li>an object literal that:</li>
     * <div><ul class="mdetail-params">
     * <li>has a specified <code>{@link Ext.Component#xtype xtype}</code></li>
     * <li>the {@link Ext.Component#xtype} specified is associated with the Component
     * desired and should be chosen from one of the available xtypes as listed
     * in {@link Ext.Component}.</li>
     * <li>If an <code>{@link Ext.Component#xtype xtype}</code> is not explicitly
     * specified, the {@link #defaultType} for that Container is used.</li>
     * <li>will be "lazily instanciated", avoiding the overhead of constructing a fully
     * instanciated Component object</li>
     * </ul></div></ul></div>
     * <p><b>Notes</b>:</p>
     * <div><ul class="mdetail-params">
     * <li>Ext uses lazy rendering. Child Components will only be rendered
     * should it become necessary. Items are automatically laid out when they are first
     * shown (no sizing is done while hidden), or in response to a {@link #doLayout} call.</li>
     * <li>Do not specify <code>{@link Ext.Panel#contentEl contentEl}</code>/
     * <code>{@link Ext.Panel#html html}</code> with <code>items</code>.</li>
     * </ul></div>
     */
    /**
     * @cfg {Object|Function} defaults
     * <p>This option is a means of applying default settings to all added items whether added through the {@link #items}
     * config or via the {@link #add} or {@link #insert} methods.</p>
     * <p>If an added item is a config object, and <b>not</b> an instantiated Component, then the default properties are
     * unconditionally applied. If the added item <b>is</b> an instantiated Component, then the default properties are
     * applied conditionally so as not to override existing properties in the item.</p>
     * <p>If the defaults option is specified as a function, then the function will be called using this Container as the
     * scope (<code>this</code> reference) and passing the added item as the first parameter. Any resulting object
     * from that call is then applied to the item as default properties.</p>
     * <p>For example, to automatically apply padding to the body of each of a set of
     * contained {@link Ext.Panel} items, you could pass: <code>defaults: {bodyStyle:'padding:15px'}</code>.</p>
     * <p>Usage:</p><pre><code>
defaults: {               // defaults are applied to items, not the container
    autoScroll:true
},
items: [
    {
        xtype: 'panel',   // defaults <b>do not</b> have precedence over
        id: 'panel1',     // options in config objects, so the defaults
        autoScroll: false // will not be applied here, panel1 will be autoScroll:false
    },
    new Ext.Panel({       // defaults <b>do</b> have precedence over options
        id: 'panel2',     // options in components, so the defaults
        autoScroll: false // will be applied here, panel2 will be autoScroll:true.
    })
]
     * </code></pre>
     */


    /** @cfg {Boolean} autoDestroy
     * If true the container will automatically destroy any contained component that is removed from it, else
     * destruction must be handled manually (defaults to true).
     */
    autoDestroy : true,

    /** @cfg {Boolean} forceLayout
     * If true the container will force a layout initially even if hidden or collapsed. This option
     * is useful for forcing forms to render in collapsed or hidden containers. (defaults to false).
     */
    forceLayout: false,

    /** @cfg {Boolean} hideBorders
     * True to hide the borders of each contained component, false to defer to the component's existing
     * border settings (defaults to false).
     */
    /** @cfg {String} defaultType
     * <p>The default {@link Ext.Component xtype} of child Components to create in this Container when
     * a child item is specified as a raw configuration object, rather than as an instantiated Component.</p>
     * <p>Defaults to <code>'panel'</code>, except {@link Ext.menu.Menu} which defaults to <code>'menuitem'</code>,
     * and {@link Ext.Toolbar} and {@link Ext.ButtonGroup} which default to <code>'button'</code>.</p>
     */
    defaultType : 'panel',

    /** @cfg {String} resizeEvent
     * The event to listen to for resizing in layouts. Defaults to <code>'resize'</code>.
     */
    resizeEvent: 'resize',

    /**
     * @cfg {Array} bubbleEvents
     * <p>An array of events that, when fired, should be bubbled to any parent container.
     * See {@link Ext.util.Observable#enableBubble}.
     * Defaults to <code>['add', 'remove']</code>.
     */
    bubbleEvents: ['add', 'remove'],

    // private
    initComponent : function(){
        Ext.Container.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event afterlayout
             * Fires when the components in this container are arranged by the associated layout manager.
             * @param {Ext.Container} this
             * @param {ContainerLayout} layout The ContainerLayout implementation for this container
             */
            'afterlayout',
            /**
             * @event beforeadd
             * Fires before any {@link Ext.Component} is added or inserted into the container.
             * A handler can return false to cancel the add.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component being added
             * @param {Number} index The index at which the component will be added to the container's items collection
             */
            'beforeadd',
            /**
             * @event beforeremove
             * Fires before any {@link Ext.Component} is removed from the container.  A handler can return
             * false to cancel the remove.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component being removed
             */
            'beforeremove',
            /**
             * @event add
             * @bubbles
             * Fires after any {@link Ext.Component} is added or inserted into the container.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component that was added
             * @param {Number} index The index at which the component was added to the container's items collection
             */
            'add',
            /**
             * @event remove
             * @bubbles
             * Fires after any {@link Ext.Component} is removed from the container.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component that was removed
             */
            'remove'
        );

        /**
         * The collection of components in this container as a {@link Ext.util.MixedCollection}
         * @type MixedCollection
         * @property items
         */
        var items = this.items;
        if(items){
            delete this.items;
            this.add(items);
        }
    },

    // private
    initItems : function(){
        if(!this.items){
            this.items = new Ext.util.MixedCollection(false, this.getComponentId);
            this.getLayout(); // initialize the layout
        }
    },

    // private
    setLayout : function(layout){
        if(this.layout && this.layout != layout){
            this.layout.setContainer(null);
        }
        this.layout = layout;
        this.initItems();
        layout.setContainer(this);
    },

    afterRender: function(){
        // Render this Container, this should be done before setLayout is called which
        // will hook onResize
        Ext.Container.superclass.afterRender.call(this);
        if(!this.layout){
            this.layout = 'auto';
        }
        if(Ext.isObject(this.layout) && !this.layout.layout){
            this.layoutConfig = this.layout;
            this.layout = this.layoutConfig.type;
        }
        if(Ext.isString(this.layout)){
            this.layout = new Ext.Container.LAYOUTS[this.layout.toLowerCase()](this.layoutConfig);
        }
        this.setLayout(this.layout);

        // If a CardLayout, the active item set
        if(this.activeItem !== undefined){
            var item = this.activeItem;
            delete this.activeItem;
            this.layout.setActiveItem(item);
        }

        // If we have no ownerCt, render and size all children
        if(!this.ownerCt){
            this.doLayout(false, true);
        }

        // This is a manually configured flag set by users in conjunction with renderTo.
        // Not to be confused with the flag by the same name used in Layouts.
        if(this.monitorResize === true){
            Ext.EventManager.onWindowResize(this.doLayout, this, [false]);
        }
    },

    /**
     * <p>Returns the Element to be used to contain the child Components of this Container.</p>
     * <p>An implementation is provided which returns the Container's {@link #getEl Element}, but
     * if there is a more complex structure to a Container, this may be overridden to return
     * the element into which the {@link #layout layout} renders child Components.</p>
     * @return {Ext.Element} The Element to render child Components into.
     */
    getLayoutTarget : function(){
        return this.el;
    },

    // private - used as the key lookup function for the items collection
    getComponentId : function(comp){
        return comp.getItemId();
    },

    /**
     * <p>Adds {@link Ext.Component Component}(s) to this Container.</p>
     * <br><p><b>Description</b></u> :
     * <div><ul class="mdetail-params">
     * <li>Fires the {@link #beforeadd} event before adding</li>
     * <li>The Container's {@link #defaults default config values} will be applied
     * accordingly (see <code>{@link #defaults}</code> for details).</li>
     * <li>Fires the {@link #add} event after the component has been added.</li>
     * </ul></div>
     * <br><p><b>Notes</b></u> :
     * <div><ul class="mdetail-params">
     * <li>If the Container is <i>already rendered</i> when <code>add</code>
     * is called, you may need to call {@link #doLayout} to refresh the view which causes
     * any unrendered child Components to be rendered. This is required so that you can
     * <code>add</code> multiple child components if needed while only refreshing the layout
     * once. For example:<pre><code>
var tb = new {@link Ext.Toolbar}();
tb.render(document.body);  // toolbar is rendered
tb.add({text:'Button 1'}); // add multiple items ({@link #defaultType} for {@link Ext.Toolbar Toolbar} is 'button')
tb.add({text:'Button 2'});
tb.{@link #doLayout}();             // refresh the layout
     * </code></pre></li>
     * <li><i>Warning:</i> Containers directly managed by the BorderLayout layout manager
     * may not be removed or added.  See the Notes for {@link Ext.layout.BorderLayout BorderLayout}
     * for more details.</li>
     * </ul></div>
     * @param {...Object/Array} component
     * <p>Either one or more Components to add or an Array of Components to add.  See
     * <code>{@link #items}</code> for additional information.</p>
     * @return {Ext.Component/Array} The Components that were added.
     */
    add : function(comp){
        this.initItems();
        var args = arguments.length > 1;
        if(args || Ext.isArray(comp)){
            var result = [];
            Ext.each(args ? arguments : comp, function(c){
                result.push(this.add(c));
            }, this);
            return result;
        }
        var c = this.lookupComponent(this.applyDefaults(comp));
        var index = this.items.length;
        if(this.fireEvent('beforeadd', this, c, index) !== false && this.onBeforeAdd(c) !== false){
            this.items.add(c);
            // *onAdded
            c.onAdded(this, index);
            this.onAdd(c);
            this.fireEvent('add', this, c, index);
        }
        return c;
    },

    onAdd : function(c){
        // Empty template method
    },

    // private
    onAdded : function(container, pos) {
        //overridden here so we can cascade down, not worth creating a template method.
        this.ownerCt = container;
        this.initRef();
        //initialize references for child items
        this.cascade(function(c){
            c.initRef();
        });
        this.fireEvent('added', this, container, pos);
    },

    /**
     * Inserts a Component into this Container at a specified index. Fires the
     * {@link #beforeadd} event before inserting, then fires the {@link #add} event after the
     * Component has been inserted.
     * @param {Number} index The index at which the Component will be inserted
     * into the Container's items collection
     * @param {Ext.Component} component The child Component to insert.<br><br>
     * Ext uses lazy rendering, and will only render the inserted Component should
     * it become necessary.<br><br>
     * A Component config object may be passed in order to avoid the overhead of
     * constructing a real Component object if lazy rendering might mean that the
     * inserted Component will not be rendered immediately. To take advantage of
     * this 'lazy instantiation', set the {@link Ext.Component#xtype} config
     * property to the registered type of the Component wanted.<br><br>
     * For a list of all available xtypes, see {@link Ext.Component}.
     * @return {Ext.Component} component The Component (or config object) that was
     * inserted with the Container's default config values applied.
     */
    insert : function(index, comp){
        this.initItems();
        var a = arguments, len = a.length;
        if(len > 2){
            var result = [];
            for(var i = len-1; i >= 1; --i) {
                result.push(this.insert(index, a[i]));
            }
            return result;
        }
        var c = this.lookupComponent(this.applyDefaults(comp));
        index = Math.min(index, this.items.length);
        if(this.fireEvent('beforeadd', this, c, index) !== false && this.onBeforeAdd(c) !== false){
            if(c.ownerCt == this){
                this.items.remove(c);
            }
            this.items.insert(index, c);
            c.onAdded(this, index);
            this.onAdd(c);
            this.fireEvent('add', this, c, index);
        }
        return c;
    },

    // private
    applyDefaults : function(c){
        var d = this.defaults;
        if(d){
            if(Ext.isFunction(d)){
                d = d.call(this, c);
            }
            if(Ext.isString(c)){
                c = Ext.ComponentMgr.get(c);
                Ext.apply(c, d);
            }else if(!c.events){
                Ext.applyIf(c, d);
            }else{
                Ext.apply(c, d);
            }
        }
        return c;
    },

    // private
    onBeforeAdd : function(item){
        if(item.ownerCt){
            item.ownerCt.remove(item, false);
        }
        if(this.hideBorders === true){
            item.border = (item.border === true);
        }
    },

    /**
     * Removes a component from this container.  Fires the {@link #beforeremove} event before removing, then fires
     * the {@link #remove} event after the component has been removed.
     * @param {Component/String} component The component reference or id to remove.
     * @param {Boolean} autoDestroy (optional) True to automatically invoke the removed Component's {@link Ext.Component#destroy} function.
     * Defaults to the value of this Container's {@link #autoDestroy} config.
     * @return {Ext.Component} component The Component that was removed.
     */
    remove : function(comp, autoDestroy){
        this.initItems();
        var c = this.getComponent(comp);
        if(c && this.fireEvent('beforeremove', this, c) !== false){
            this.doRemove(c, autoDestroy);
            this.fireEvent('remove', this, c);
        }
        return c;
    },

    onRemove: function(c){
        // Empty template method
    },

    // private
    doRemove: function(c, autoDestroy){
        var l = this.layout,
            hasLayout = l && this.rendered;

        if(hasLayout){
            l.onRemove(c);
        }
        this.items.remove(c);
        c.onRemoved();
        this.onRemove(c);
        if(autoDestroy === true || (autoDestroy !== false && this.autoDestroy)){
            c.destroy();
        }
        if(hasLayout){
            l.afterRemove(c);
        }
    },

    /**
     * Removes all components from this container.
     * @param {Boolean} autoDestroy (optional) True to automatically invoke the removed Component's {@link Ext.Component#destroy} function.
     * Defaults to the value of this Container's {@link #autoDestroy} config.
     * @return {Array} Array of the destroyed components
     */
    removeAll: function(autoDestroy){
        this.initItems();
        var item, rem = [], items = [];
        this.items.each(function(i){
            rem.push(i);
        });
        for (var i = 0, len = rem.length; i < len; ++i){
            item = rem[i];
            this.remove(item, autoDestroy);
            if(item.ownerCt !== this){
                items.push(item);
            }
        }
        return items;
    },

    /**
     * Examines this container's <code>{@link #items}</code> <b>property</b>
     * and gets a direct child component of this container.
     * @param {String/Number} comp This parameter may be any of the following:
     * <div><ul class="mdetail-params">
     * <li>a <b><code>String</code></b> : representing the <code>{@link Ext.Component#itemId itemId}</code>
     * or <code>{@link Ext.Component#id id}</code> of the child component </li>
     * <li>a <b><code>Number</code></b> : representing the position of the child component
     * within the <code>{@link #items}</code> <b>property</b></li>
     * </ul></div>
     * <p>For additional information see {@link Ext.util.MixedCollection#get}.
     * @return Ext.Component The component (if found).
     */
    getComponent : function(comp){
        if(Ext.isObject(comp)){
            comp = comp.getItemId();
        }
        return this.items.get(comp);
    },

    // private
    lookupComponent : function(comp){
        if(Ext.isString(comp)){
            return Ext.ComponentMgr.get(comp);
        }else if(!comp.events){
            return this.createComponent(comp);
        }
        return comp;
    },

    // private
    createComponent : function(config, defaultType){
        if (config.render) {
            return config;
        }
        // add in ownerCt at creation time but then immediately
        // remove so that onBeforeAdd can handle it
        var c = Ext.create(Ext.apply({
            ownerCt: this
        }, config), defaultType || this.defaultType);
        delete c.initialConfig.ownerCt;
        delete c.ownerCt;
        return c;
    },

    /**
     * @private
     * We can only lay out if there is a view area in which to layout.
     * display:none on the layout target, *or any of its parent elements* will mean it has no view area.
     */
    canLayout : function() {
        var el = this.getVisibilityEl();
        return el && el.dom && !el.isStyle("display", "none");
    },

    /**
     * Force this container's layout to be recalculated. A call to this function is required after adding a new component
     * to an already rendered container, or possibly after changing sizing/position properties of child components.
     * @param {Boolean} shallow (optional) True to only calc the layout of this component, and let child components auto
     * calc layouts as required (defaults to false, which calls doLayout recursively for each subcontainer)
     * @param {Boolean} force (optional) True to force a layout to occur, even if the item is hidden.
     * @return {Ext.Container} this
     */

    doLayout : function(shallow, force){
        var rendered = this.rendered,
            forceLayout = force || this.forceLayout;

        if(this.collapsed || !this.canLayout()){
            this.deferLayout = this.deferLayout || !shallow;
            if(!forceLayout){
                return;
            }
            shallow = shallow && !this.deferLayout;
        } else {
            delete this.deferLayout;
        }
        if(rendered && this.layout){
            this.layout.layout();
        }
        if(shallow !== true && this.items){
            var cs = this.items.items;
            for(var i = 0, len = cs.length; i < len; i++){
                var c = cs[i];
                if(c.doLayout){
                    c.doLayout(false, forceLayout);
                }
            }
        }
        if(rendered){
            this.onLayout(shallow, forceLayout);
        }
        // Initial layout completed
        this.hasLayout = true;
        delete this.forceLayout;
    },

    onLayout : Ext.emptyFn,

    // private
    shouldBufferLayout: function(){
        /*
         * Returns true if the container should buffer a layout.
         * This is true only if the container has previously been laid out
         * and has a parent container that is pending a layout.
         */
        var hl = this.hasLayout;
        if(this.ownerCt){
            // Only ever buffer if we've laid out the first time and we have one pending.
            return hl ? !this.hasLayoutPending() : false;
        }
        // Never buffer initial layout
        return hl;
    },

    // private
    hasLayoutPending: function(){
        // Traverse hierarchy to see if any parent container has a pending layout.
        var pending = false;
        this.ownerCt.bubble(function(c){
            if(c.layoutPending){
                pending = true;
                return false;
            }
        });
        return pending;
    },

    onShow : function(){
        // removes css classes that were added to hide
        Ext.Container.superclass.onShow.call(this);
        // If we were sized during the time we were hidden, layout.
        if(Ext.isDefined(this.deferLayout)){
            delete this.deferLayout;
            this.doLayout(true);
        }
    },

    /**
     * Returns the layout currently in use by the container.  If the container does not currently have a layout
     * set, a default {@link Ext.layout.ContainerLayout} will be created and set as the container's layout.
     * @return {ContainerLayout} layout The container's layout
     */
    getLayout : function(){
        if(!this.layout){
            var layout = new Ext.layout.AutoLayout(this.layoutConfig);
            this.setLayout(layout);
        }
        return this.layout;
    },

    // private
    beforeDestroy : function(){
        var c;
        if(this.items){
            while(c = this.items.first()){
                this.doRemove(c, true);
            }
        }
        if(this.monitorResize){
            Ext.EventManager.removeResizeListener(this.doLayout, this);
        }
        Ext.destroy(this.layout);
        Ext.Container.superclass.beforeDestroy.call(this);
    },

    /**
     * Bubbles up the component/container heirarchy, calling the specified function with each component. The scope (<i>this</i>) of
     * function call will be the scope provided or the current component. The arguments to the function
     * will be the args provided or the current component. If the function returns false at any point,
     * the bubble is stopped.
     * @param {Function} fn The function to call
     * @param {Object} scope (optional) The scope of the function (defaults to current node)
     * @param {Array} args (optional) The args to call the function with (default to passing the current component)
     * @return {Ext.Container} this
     */
    bubble : function(fn, scope, args){
        var p = this;
        while(p){
            if(fn.apply(scope || p, args || [p]) === false){
                break;
            }
            p = p.ownerCt;
        }
        return this;
    },

    /**
     * Cascades down the component/container heirarchy from this component (called first), calling the specified function with
     * each component. The scope (<i>this</i>) of
     * function call will be the scope provided or the current component. The arguments to the function
     * will be the args provided or the current component. If the function returns false at any point,
     * the cascade is stopped on that branch.
     * @param {Function} fn The function to call
     * @param {Object} scope (optional) The scope of the function (defaults to current component)
     * @param {Array} args (optional) The args to call the function with (defaults to passing the current component)
     * @return {Ext.Container} this
     */
    cascade : function(fn, scope, args){
        if(fn.apply(scope || this, args || [this]) !== false){
            if(this.items){
                var cs = this.items.items;
                for(var i = 0, len = cs.length; i < len; i++){
                    if(cs[i].cascade){
                        cs[i].cascade(fn, scope, args);
                    }else{
                        fn.apply(scope || cs[i], args || [cs[i]]);
                    }
                }
            }
        }
        return this;
    },

    /**
     * Find a component under this container at any level by id
     * @param {String} id
     * @return Ext.Component
     */
    findById : function(id){
        var m, ct = this;
        this.cascade(function(c){
            if(ct != c && c.id === id){
                m = c;
                return false;
            }
        });
        return m || null;
    },

    /**
     * Find a component under this container at any level by xtype or class
     * @param {String/Class} xtype The xtype string for a component, or the class of the component directly
     * @param {Boolean} shallow (optional) False to check whether this Component is descended from the xtype (this is
     * the default), or true to check whether this Component is directly of the specified xtype.
     * @return {Array} Array of Ext.Components
     */
    findByType : function(xtype, shallow){
        return this.findBy(function(c){
            return c.isXType(xtype, shallow);
        });
    },

    /**
     * Find a component under this container at any level by property
     * @param {String} prop
     * @param {String} value
     * @return {Array} Array of Ext.Components
     */
    find : function(prop, value){
        return this.findBy(function(c){
            return c[prop] === value;
        });
    },

    /**
     * Find a component under this container at any level by a custom function. If the passed function returns
     * true, the component will be included in the results. The passed function is called with the arguments (component, this container).
     * @param {Function} fn The function to call
     * @param {Object} scope (optional)
     * @return {Array} Array of Ext.Components
     */
    findBy : function(fn, scope){
        var m = [], ct = this;
        this.cascade(function(c){
            if(ct != c && fn.call(scope || c, c, ct) === true){
                m.push(c);
            }
        });
        return m;
    },

    /**
     * Get a component contained by this container (alias for items.get(key))
     * @param {String/Number} key The index or id of the component
     * @return {Ext.Component} Ext.Component
     */
    get : function(key){
        return this.items.get(key);
    }
});

Ext.Container.LAYOUTS = {};
Ext.reg('container', Ext.Container);
/**
 * @class Ext.layout.ContainerLayout
 * <p>This class is intended to be extended or created via the <tt><b>{@link Ext.Container#layout layout}</b></tt>
 * configuration property.  See <tt><b>{@link Ext.Container#layout}</b></tt> for additional details.</p>
 */
Ext.layout.ContainerLayout = Ext.extend(Object, {
    /**
     * @cfg {String} extraCls
     * <p>An optional extra CSS class that will be added to the container. This can be useful for adding
     * customized styles to the container or any of its children using standard CSS rules. See
     * {@link Ext.Component}.{@link Ext.Component#ctCls ctCls} also.</p>
     * <p><b>Note</b>: <tt>extraCls</tt> defaults to <tt>''</tt> except for the following classes
     * which assign a value by default:
     * <div class="mdetail-params"><ul>
     * <li>{@link Ext.layout.AbsoluteLayout Absolute Layout} : <tt>'x-abs-layout-item'</tt></li>
     * <li>{@link Ext.layout.Box Box Layout} : <tt>'x-box-item'</tt></li>
     * <li>{@link Ext.layout.ColumnLayout Column Layout} : <tt>'x-column'</tt></li>
     * </ul></div>
     * To configure the above Classes with an extra CSS class append to the default.  For example,
     * for ColumnLayout:<pre><code>
     * extraCls: 'x-column custom-class'
     * </code></pre>
     * </p>
     */
    /**
     * @cfg {Boolean} renderHidden
     * True to hide each contained item on render (defaults to false).
     */

    /**
     * A reference to the {@link Ext.Component} that is active.  For example, <pre><code>
     * if(myPanel.layout.activeItem.id == 'item-1') { ... }
     * </code></pre>
     * <tt>activeItem</tt> only applies to layout styles that can display items one at a time
     * (like {@link Ext.layout.AccordionLayout}, {@link Ext.layout.CardLayout}
     * and {@link Ext.layout.FitLayout}).  Read-only.  Related to {@link Ext.Container#activeItem}.
     * @type {Ext.Component}
     * @property activeItem
     */

    // private
    monitorResize:false,
    // private
    activeItem : null,

    constructor : function(config){
        this.id = Ext.id(null, 'ext-layout-');
        Ext.apply(this, config);
    },

    type: 'container',

    /* Workaround for how IE measures autoWidth elements.  It prefers bottom-up measurements
      whereas other browser prefer top-down.  We will hide all target child elements before we measure and
      put them back to get an accurate measurement.
    */
    IEMeasureHack : function(target, viewFlag) {
        var tChildren = target.dom.childNodes, tLen = tChildren.length, c, d = [], e, i, ret;
        for (i = 0 ; i < tLen ; i++) {
            c = tChildren[i];
            e = Ext.get(c);
            if (e) {
                d[i] = e.getStyle('display');
                e.setStyle({display: 'none'});
            }
        }
        ret = target ? target.getViewSize(viewFlag) : {};
        for (i = 0 ; i < tLen ; i++) {
            c = tChildren[i];
            e = Ext.get(c);
            if (e) {
                e.setStyle({display: d[i]});
            }
        }
        return ret;
    },

    // Placeholder for the derived layouts
    getLayoutTargetSize : Ext.EmptyFn,

    // private
    layout : function(){
        var ct = this.container, target = ct.getLayoutTarget();
        if(!(this.hasLayout || Ext.isEmpty(this.targetCls))){
            target.addClass(this.targetCls);
        }
        this.onLayout(ct, target);
        ct.fireEvent('afterlayout', ct, this);
    },

    // private
    onLayout : function(ct, target){
        this.renderAll(ct, target);
    },

    // private
    isValidParent : function(c, target){
        return target && c.getPositionEl().dom.parentNode == (target.dom || target);
    },

    // private
    renderAll : function(ct, target){
        var items = ct.items.items, i, c, len = items.length;
        for(i = 0; i < len; i++) {
            c = items[i];
            if(c && (!c.rendered || !this.isValidParent(c, target))){
                this.renderItem(c, i, target);
            }
        }
    },

    /**
     * @private
     * Renders the given Component into the target Element. If the Component is already rendered,
     * it is moved to the provided target instead.
     * @param {Ext.Component} c The Component to render
     * @param {Number} position The position within the target to render the item to
     * @param {Ext.Element} target The target Element
     */
    renderItem : function(c, position, target){
        if (c) {
            if (!c.rendered) {
                c.render(target, position);
                this.configureItem(c, position);
            } else if (!this.isValidParent(c, target)) {
                if (Ext.isNumber(position)) {
                    position = target.dom.childNodes[position];
                }
                
                target.dom.insertBefore(c.getPositionEl().dom, position || null);
                c.container = target;
                this.configureItem(c, position);
            }
        }
    },

    // private.
    // Get all rendered items to lay out.
    getRenderedItems: function(ct){
        var t = ct.getLayoutTarget(), cti = ct.items.items, len = cti.length, i, c, items = [];
        for (i = 0; i < len; i++) {
            if((c = cti[i]).rendered && this.isValidParent(c, t)){
                items.push(c);
            }
        };
        return items;
    },

    /**
     * @private
     * Applies extraCls and hides the item if renderHidden is true
     */
    configureItem: function(c, position){
        if (this.extraCls) {
            var t = c.getPositionEl ? c.getPositionEl() : c;
            t.addClass(this.extraCls);
        }
        
        // If we are forcing a layout, do so *before* we hide so elements have height/width
        if (c.doLayout && this.forceLayout) {
            c.doLayout();
        }
        if (this.renderHidden && c != this.activeItem) {
            c.hide();
        }
    },

    onRemove: function(c){
        if(this.activeItem == c){
            delete this.activeItem;
        }
        if(c.rendered && this.extraCls){
            var t = c.getPositionEl ? c.getPositionEl() : c;
            t.removeClass(this.extraCls);
        }
    },

    afterRemove: function(c){
        if(c.removeRestore){
            c.removeMode = 'container';
            delete c.removeRestore;
        }
    },

    // private
    onResize: function(){
        var ct = this.container,
            b;
        if(ct.collapsed){
            return;
        }
        if(b = ct.bufferResize && ct.shouldBufferLayout()){
            if(!this.resizeTask){
                this.resizeTask = new Ext.util.DelayedTask(this.runLayout, this);
                this.resizeBuffer = Ext.isNumber(b) ? b : 50;
            }
            ct.layoutPending = true;
            this.resizeTask.delay(this.resizeBuffer);
        }else{
            this.runLayout();
        }
    },

    runLayout: function(){
        var ct = this.container;
        this.layout();
        ct.onLayout();
        delete ct.layoutPending;
    },

    // private
    setContainer : function(ct){
        /**
         * This monitorResize flag will be renamed soon as to avoid confusion
         * with the Container version which hooks onWindowResize to doLayout
         *
         * monitorResize flag in this context attaches the resize event between
         * a container and it's layout
         */
        if(this.monitorResize && ct != this.container){
            var old = this.container;
            if(old){
                old.un(old.resizeEvent, this.onResize, this);
            }
            if(ct){
                ct.on(ct.resizeEvent, this.onResize, this);
            }
        }
        this.container = ct;
    },

    /**
     * Parses a number or string representing margin sizes into an object. Supports CSS-style margin declarations
     * (e.g. 10, "10", "10 10", "10 10 10" and "10 10 10 10" are all valid options and would return the same result)
     * @param {Number|String} v The encoded margins
     * @return {Object} An object with margin sizes for top, right, bottom and left
     */
    parseMargins : function(v){
        if (Ext.isNumber(v)) {
            v = v.toString();
        }
        var ms  = v.split(' '),
            len = ms.length;
            
        if (len == 1) {
            ms[1] = ms[2] = ms[3] = ms[0];
        } else if(len == 2) {
            ms[2] = ms[0];
            ms[3] = ms[1];
        } else if(len == 3) {
            ms[3] = ms[1];
        }
        
        return {
            top   :parseInt(ms[0], 10) || 0,
            right :parseInt(ms[1], 10) || 0,
            bottom:parseInt(ms[2], 10) || 0,
            left  :parseInt(ms[3], 10) || 0
        };
    },

    /**
     * The {@link Ext.Template Ext.Template} used by Field rendering layout classes (such as
     * {@link Ext.layout.FormLayout}) to create the DOM structure of a fully wrapped,
     * labeled and styled form Field. A default Template is supplied, but this may be
     * overriden to create custom field structures. The template processes values returned from
     * {@link Ext.layout.FormLayout#getTemplateArgs}.
     * @property fieldTpl
     * @type Ext.Template
     */
    fieldTpl: (function() {
        var t = new Ext.Template(
            '<div class="x-form-item {itemCls}" tabIndex="-1">',
                '<label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}</label>',
                '<div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">',
                '</div><div class="{clearCls}"></div>',
            '</div>'
        );
        t.disableFormats = true;
        return t.compile();
    })(),

    /*
     * Destroys this layout. This is a template method that is empty by default, but should be implemented
     * by subclasses that require explicit destruction to purge event handlers or remove DOM nodes.
     * @protected
     */
    destroy : function(){
        // Stop any buffered layout tasks
        if(this.resizeTask && this.resizeTask.cancel){
            this.resizeTask.cancel();
        }
        if(!Ext.isEmpty(this.targetCls)){
            var target = this.container.getLayoutTarget();
            if(target){
                target.removeClass(this.targetCls);
            }
        }
    }
});/**
 * @class Ext.layout.AutoLayout
 * <p>The AutoLayout is the default layout manager delegated by {@link Ext.Container} to
 * render any child Components when no <tt>{@link Ext.Container#layout layout}</tt> is configured into
 * a {@link Ext.Container Container}.</tt>.  AutoLayout provides only a passthrough of any layout calls
 * to any child containers.</p>
 */
Ext.layout.AutoLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: 'auto',

    monitorResize: true,

    onLayout : function(ct, target){
        Ext.layout.AutoLayout.superclass.onLayout.call(this, ct, target);
        var cs = this.getRenderedItems(ct), len = cs.length, i, c;
        for(i = 0; i < len; i++){
            c = cs[i];
            if (c.doLayout){
                // Shallow layout children
                c.doLayout(true);
            }
        }
    }
});

Ext.Container.LAYOUTS['auto'] = Ext.layout.AutoLayout;
/**
 * @class Ext.layout.FitLayout
 * @extends Ext.layout.ContainerLayout
 * <p>This is a base class for layouts that contain <b>a single item</b> that automatically expands to fill the layout's
 * container.  This class is intended to be extended or created via the <tt>layout:'fit'</tt> {@link Ext.Container#layout}
 * config, and should generally not need to be created directly via the new keyword.</p>
 * <p>FitLayout does not have any direct config options (other than inherited ones).  To fit a panel to a container
 * using FitLayout, simply set layout:'fit' on the container and add a single panel to it.  If the container has
 * multiple panels, only the first one will be displayed.  Example usage:</p>
 * <pre><code>
var p = new Ext.Panel({
    title: 'Fit Layout',
    layout:'fit',
    items: {
        title: 'Inner Panel',
        html: '&lt;p&gt;This is the inner panel content&lt;/p&gt;',
        border: false
    }
});
</code></pre>
 */
Ext.layout.FitLayout = Ext.extend(Ext.layout.ContainerLayout, {
    // private
    monitorResize:true,

    type: 'fit',

    getLayoutTargetSize : function() {
        var target = this.container.getLayoutTarget();
        if (!target) {
            return {};
        }
        // Style Sized (scrollbars not included)
        return target.getStyleSize();
    },

    // private
    onLayout : function(ct, target){
        Ext.layout.FitLayout.superclass.onLayout.call(this, ct, target);
        if(!ct.collapsed){
            this.setItemSize(this.activeItem || ct.items.itemAt(0), this.getLayoutTargetSize());
        }
    },

    // private
    setItemSize : function(item, size){
        if(item && size.height > 0){ // display none?
            item.setSize(size);
        }
    }
});
Ext.Container.LAYOUTS['fit'] = Ext.layout.FitLayout;/**
 * @class Ext.layout.CardLayout
 * @extends Ext.layout.FitLayout
 * <p>This layout manages multiple child Components, each fitted to the Container, where only a single child Component can be
 * visible at any given time.  This layout style is most commonly used for wizards, tab implementations, etc.
 * This class is intended to be extended or created via the layout:'card' {@link Ext.Container#layout} config,
 * and should generally not need to be created directly via the new keyword.</p>
 * <p>The CardLayout's focal method is {@link #setActiveItem}.  Since only one panel is displayed at a time,
 * the only way to move from one Component to the next is by calling setActiveItem, passing the id or index of
 * the next panel to display.  The layout itself does not provide a user interface for handling this navigation,
 * so that functionality must be provided by the developer.</p>
 * <p>In the following example, a simplistic wizard setup is demonstrated.  A button bar is added
 * to the footer of the containing panel to provide navigation buttons.  The buttons will be handled by a
 * common navigation routine -- for this example, the implementation of that routine has been ommitted since
 * it can be any type of custom logic.  Note that other uses of a CardLayout (like a tab control) would require a
 * completely different implementation.  For serious implementations, a better approach would be to extend
 * CardLayout to provide the custom functionality needed.  Example usage:</p>
 * <pre><code>
var navHandler = function(direction){
    // This routine could contain business logic required to manage the navigation steps.
    // It would call setActiveItem as needed, manage navigation button state, handle any
    // branching logic that might be required, handle alternate actions like cancellation
    // or finalization, etc.  A complete wizard implementation could get pretty
    // sophisticated depending on the complexity required, and should probably be
    // done as a subclass of CardLayout in a real-world implementation.
};

var card = new Ext.Panel({
    title: 'Example Wizard',
    layout:'card',
    activeItem: 0, // make sure the active item is set on the container config!
    bodyStyle: 'padding:15px',
    defaults: {
        // applied to each contained panel
        border:false
    },
    // just an example of one possible navigation scheme, using buttons
    bbar: [
        {
            id: 'move-prev',
            text: 'Back',
            handler: navHandler.createDelegate(this, [-1]),
            disabled: true
        },
        '->', // greedy spacer so that the buttons are aligned to each side
        {
            id: 'move-next',
            text: 'Next',
            handler: navHandler.createDelegate(this, [1])
        }
    ],
    // the panels (or "cards") within the layout
    items: [{
        id: 'card-0',
        html: '&lt;h1&gt;Welcome to the Wizard!&lt;/h1&gt;&lt;p&gt;Step 1 of 3&lt;/p&gt;'
    },{
        id: 'card-1',
        html: '&lt;p&gt;Step 2 of 3&lt;/p&gt;'
    },{
        id: 'card-2',
        html: '&lt;h1&gt;Congratulations!&lt;/h1&gt;&lt;p&gt;Step 3 of 3 - Complete&lt;/p&gt;'
    }]
});
</code></pre>
 */
Ext.layout.CardLayout = Ext.extend(Ext.layout.FitLayout, {
    /**
     * @cfg {Boolean} deferredRender
     * True to render each contained item at the time it becomes active, false to render all contained items
     * as soon as the layout is rendered (defaults to false).  If there is a significant amount of content or
     * a lot of heavy controls being rendered into panels that are not displayed by default, setting this to
     * true might improve performance.
     */
    deferredRender : false,

    /**
     * @cfg {Boolean} layoutOnCardChange
     * True to force a layout of the active item when the active card is changed. Defaults to false.
     */
    layoutOnCardChange : false,

    /**
     * @cfg {Boolean} renderHidden @hide
     */
    // private
    renderHidden : true,

    type: 'card',

    /**
     * Sets the active (visible) item in the layout.
     * @param {String/Number} item The string component id or numeric index of the item to activate
     */
    setActiveItem : function(item){
        var ai = this.activeItem,
            ct = this.container;
        item = ct.getComponent(item);

        // Is this a valid, different card?
        if(item && ai != item){

            // Changing cards, hide the current one
            if(ai){
                ai.hide();
                if (ai.hidden !== true) {
                    return false;
                }
                ai.fireEvent('deactivate', ai);
            }

            var layout = item.doLayout && (this.layoutOnCardChange || !item.rendered);

            // Change activeItem reference
            this.activeItem = item;

            // The container is about to get a recursive layout, remove any deferLayout reference
            // because it will trigger a redundant layout.
            delete item.deferLayout;

            // Show the new component
            item.show();

            this.layout();

            if(layout){
                item.doLayout();
            }
            item.fireEvent('activate', item);
        }
    },

    // private
    renderAll : function(ct, target){
        if(this.deferredRender){
            this.renderItem(this.activeItem, undefined, target);
        }else{
            Ext.layout.CardLayout.superclass.renderAll.call(this, ct, target);
        }
    }
});
Ext.Container.LAYOUTS['card'] = Ext.layout.CardLayout;
/**
 * @class Ext.layout.AnchorLayout
 * @extends Ext.layout.ContainerLayout
 * <p>This is a layout that enables anchoring of contained elements relative to the container's dimensions.
 * If the container is resized, all anchored items are automatically rerendered according to their
 * <b><tt>{@link #anchor}</tt></b> rules.</p>
 * <p>This class is intended to be extended or created via the layout:'anchor' {@link Ext.Container#layout}
 * config, and should generally not need to be created directly via the new keyword.</p>
 * <p>AnchorLayout does not have any direct config options (other than inherited ones). By default,
 * AnchorLayout will calculate anchor measurements based on the size of the container itself. However, the
 * container using the AnchorLayout can supply an anchoring-specific config property of <b>anchorSize</b>.
 * If anchorSize is specifed, the layout will use it as a virtual container for the purposes of calculating
 * anchor measurements based on it instead, allowing the container to be sized independently of the anchoring
 * logic if necessary.  For example:</p>
 * <pre><code>
var viewport = new Ext.Viewport({
    layout:'anchor',
    anchorSize: {width:800, height:600},
    items:[{
        title:'Item 1',
        html:'Content 1',
        width:800,
        anchor:'right 20%'
    },{
        title:'Item 2',
        html:'Content 2',
        width:300,
        anchor:'50% 30%'
    },{
        title:'Item 3',
        html:'Content 3',
        width:600,
        anchor:'-100 50%'
    }]
});
 * </code></pre>
 */
Ext.layout.AnchorLayout = Ext.extend(Ext.layout.ContainerLayout, {
    /**
     * @cfg {String} anchor
     * <p>This configuation option is to be applied to <b>child <tt>items</tt></b> of a container managed by
     * this layout (ie. configured with <tt>layout:'anchor'</tt>).</p><br/>
     *
     * <p>This value is what tells the layout how an item should be anchored to the container. <tt>items</tt>
     * added to an AnchorLayout accept an anchoring-specific config property of <b>anchor</b> which is a string
     * containing two values: the horizontal anchor value and the vertical anchor value (for example, '100% 50%').
     * The following types of anchor values are supported:<div class="mdetail-params"><ul>
     *
     * <li><b>Percentage</b> : Any value between 1 and 100, expressed as a percentage.<div class="sub-desc">
     * The first anchor is the percentage width that the item should take up within the container, and the
     * second is the percentage height.  For example:<pre><code>
// two values specified
anchor: '100% 50%' // render item complete width of the container and
                   // 1/2 height of the container
// one value specified
anchor: '100%'     // the width value; the height will default to auto
     * </code></pre></div></li>
     *
     * <li><b>Offsets</b> : Any positive or negative integer value.<div class="sub-desc">
     * This is a raw adjustment where the first anchor is the offset from the right edge of the container,
     * and the second is the offset from the bottom edge. For example:<pre><code>
// two values specified
anchor: '-50 -100' // render item the complete width of the container
                   // minus 50 pixels and
                   // the complete height minus 100 pixels.
// one value specified
anchor: '-50'      // anchor value is assumed to be the right offset value
                   // bottom offset will default to 0
     * </code></pre></div></li>
     *
     * <li><b>Sides</b> : Valid values are <tt>'right'</tt> (or <tt>'r'</tt>) and <tt>'bottom'</tt>
     * (or <tt>'b'</tt>).<div class="sub-desc">
     * Either the container must have a fixed size or an anchorSize config value defined at render time in
     * order for these to have any effect.</div></li>
     *
     * <li><b>Mixed</b> : <div class="sub-desc">
     * Anchor values can also be mixed as needed.  For example, to render the width offset from the container
     * right edge by 50 pixels and 75% of the container's height use:
     * <pre><code>
anchor: '-50 75%'
     * </code></pre></div></li>
     *
     *
     * </ul></div>
     */

    // private
    monitorResize : true,

    type : 'anchor',

    /**
     * @cfg {String} defaultAnchor
     *
     * default anchor for all child container items applied if no anchor or specific width is set on the child item.  Defaults to '100%'.
     *
     */
    defaultAnchor : '100%',

    parseAnchorRE : /^(r|right|b|bottom)$/i,

    getLayoutTargetSize : function() {
        var target = this.container.getLayoutTarget();
        if (!target) {
            return {};
        }
        // Style Sized (scrollbars not included)
        return target.getStyleSize();
    },

    // private
    onLayout : function(ct, target){
        Ext.layout.AnchorLayout.superclass.onLayout.call(this, ct, target);
        var size = this.getLayoutTargetSize();

        var w = size.width, h = size.height;

        if(w < 20 && h < 20){
            return;
        }

        // find the container anchoring size
        var aw, ah;
        if(ct.anchorSize){
            if(typeof ct.anchorSize == 'number'){
                aw = ct.anchorSize;
            }else{
                aw = ct.anchorSize.width;
                ah = ct.anchorSize.height;
            }
        }else{
            aw = ct.initialConfig.width;
            ah = ct.initialConfig.height;
        }

        var cs = this.getRenderedItems(ct), len = cs.length, i, c, a, cw, ch, el, vs, boxes = [];
        for(i = 0; i < len; i++){
            c = cs[i];
            el = c.getPositionEl();

            // If a child container item has no anchor and no specific width, set the child to the default anchor size
            if (!c.anchor && c.items && !Ext.isNumber(c.width) && !(Ext.isIE6 && Ext.isStrict)){
                c.anchor = this.defaultAnchor;
            }

            if(c.anchor){
                a = c.anchorSpec;
                if(!a){ // cache all anchor values
                    vs = c.anchor.split(' ');
                    c.anchorSpec = a = {
                        right: this.parseAnchor(vs[0], c.initialConfig.width, aw),
                        bottom: this.parseAnchor(vs[1], c.initialConfig.height, ah)
                    };
                }
                cw = a.right ? this.adjustWidthAnchor(a.right(w) - el.getMargins('lr'), c) : undefined;
                ch = a.bottom ? this.adjustHeightAnchor(a.bottom(h) - el.getMargins('tb'), c) : undefined;

                if(cw || ch){
                    boxes.push({
                        comp: c,
                        width: cw || undefined,
                        height: ch || undefined
                    });
                }
            }
        }
        for (i = 0, len = boxes.length; i < len; i++) {
            c = boxes[i];
            c.comp.setSize(c.width, c.height);
        }
    },

    // private
    parseAnchor : function(a, start, cstart){
        if(a && a != 'none'){
            var last;
            // standard anchor
            if(this.parseAnchorRE.test(a)){
                var diff = cstart - start;
                return function(v){
                    if(v !== last){
                        last = v;
                        return v - diff;
                    }
                }
            // percentage
            }else if(a.indexOf('%') != -1){
                var ratio = parseFloat(a.replace('%', ''))*.01;
                return function(v){
                    if(v !== last){
                        last = v;
                        return Math.floor(v*ratio);
                    }
                }
            // simple offset adjustment
            }else{
                a = parseInt(a, 10);
                if(!isNaN(a)){
                    return function(v){
                        if(v !== last){
                            last = v;
                            return v + a;
                        }
                    }
                }
            }
        }
        return false;
    },

    // private
    adjustWidthAnchor : function(value, comp){
        return value;
    },

    // private
    adjustHeightAnchor : function(value, comp){
        return value;
    }

    /**
     * @property activeItem
     * @hide
     */
});
Ext.Container.LAYOUTS['anchor'] = Ext.layout.AnchorLayout;
/**
 * @class Ext.layout.ColumnLayout
 * @extends Ext.layout.ContainerLayout
 * <p>This is the layout style of choice for creating structural layouts in a multi-column format where the width of
 * each column can be specified as a percentage or fixed width, but the height is allowed to vary based on the content.
 * This class is intended to be extended or created via the layout:'column' {@link Ext.Container#layout} config,
 * and should generally not need to be created directly via the new keyword.</p>
 * <p>ColumnLayout does not have any direct config options (other than inherited ones), but it does support a
 * specific config property of <b><tt>columnWidth</tt></b> that can be included in the config of any panel added to it.  The
 * layout will use the columnWidth (if present) or width of each panel during layout to determine how to size each panel.
 * If width or columnWidth is not specified for a given panel, its width will default to the panel's width (or auto).</p>
 * <p>The width property is always evaluated as pixels, and must be a number greater than or equal to 1.
 * The columnWidth property is always evaluated as a percentage, and must be a decimal value greater than 0 and
 * less than 1 (e.g., .25).</p>
 * <p>The basic rules for specifying column widths are pretty simple.  The logic makes two passes through the
 * set of contained panels.  During the first layout pass, all panels that either have a fixed width or none
 * specified (auto) are skipped, but their widths are subtracted from the overall container width.  During the second
 * pass, all panels with columnWidths are assigned pixel widths in proportion to their percentages based on
 * the total <b>remaining</b> container width.  In other words, percentage width panels are designed to fill the space
 * left over by all the fixed-width and/or auto-width panels.  Because of this, while you can specify any number of columns
 * with different percentages, the columnWidths must always add up to 1 (or 100%) when added together, otherwise your
 * layout may not render as expected.  Example usage:</p>
 * <pre><code>
// All columns are percentages -- they must add up to 1
var p = new Ext.Panel({
    title: 'Column Layout - Percentage Only',
    layout:'column',
    items: [{
        title: 'Column 1',
        columnWidth: .25
    },{
        title: 'Column 2',
        columnWidth: .6
    },{
        title: 'Column 3',
        columnWidth: .15
    }]
});

// Mix of width and columnWidth -- all columnWidth values must add up
// to 1. The first column will take up exactly 120px, and the last two
// columns will fill the remaining container width.
var p = new Ext.Panel({
    title: 'Column Layout - Mixed',
    layout:'column',
    items: [{
        title: 'Column 1',
        width: 120
    },{
        title: 'Column 2',
        columnWidth: .8
    },{
        title: 'Column 3',
        columnWidth: .2
    }]
});
</code></pre>
 */
Ext.layout.ColumnLayout = Ext.extend(Ext.layout.ContainerLayout, {
    // private
    monitorResize:true,

    type: 'column',

    extraCls: 'x-column',

    scrollOffset : 0,

    // private

    targetCls: 'x-column-layout-ct',

    isValidParent : function(c, target){
        return this.innerCt && c.getPositionEl().dom.parentNode == this.innerCt.dom;
    },

    getLayoutTargetSize : function() {
        var target = this.container.getLayoutTarget(), ret;
        if (target) {
            ret = target.getViewSize();

            // IE in strict mode will return a width of 0 on the 1st pass of getViewSize.
            // Use getStyleSize to verify the 0 width, the adjustment pass will then work properly
            // with getViewSize
            if (Ext.isIE && Ext.isStrict && ret.width == 0){
                ret =  target.getStyleSize();
            }

            ret.width -= target.getPadding('lr');
            ret.height -= target.getPadding('tb');
        }
        return ret;
    },

    renderAll : function(ct, target) {
        if(!this.innerCt){
            // the innerCt prevents wrapping and shuffling while
            // the container is resizing
            this.innerCt = target.createChild({cls:'x-column-inner'});
            this.innerCt.createChild({cls:'x-clear'});
        }
        Ext.layout.ColumnLayout.superclass.renderAll.call(this, ct, this.innerCt);
    },

    // private
    onLayout : function(ct, target){
        var cs = ct.items.items,
            len = cs.length,
            c,
            i,
            m,
            margins = [];

        this.renderAll(ct, target);

        var size = this.getLayoutTargetSize();

        if(size.width < 1 && size.height < 1){ // display none?
            return;
        }

        var w = size.width - this.scrollOffset,
            h = size.height,
            pw = w;

        this.innerCt.setWidth(w);

        // some columns can be percentages while others are fixed
        // so we need to make 2 passes

        for(i = 0; i < len; i++){
            c = cs[i];
            m = c.getPositionEl().getMargins('lr');
            margins[i] = m;
            if(!c.columnWidth){
                pw -= (c.getWidth() + m);
            }
        }

        pw = pw < 0 ? 0 : pw;

        for(i = 0; i < len; i++){
            c = cs[i];
            m = margins[i];
            if(c.columnWidth){
                c.setSize(Math.floor(c.columnWidth * pw) - m);
            }
        }

        // Browsers differ as to when they account for scrollbars.  We need to re-measure to see if the scrollbar
        // spaces were accounted for properly.  If not, re-layout.
        if (Ext.isIE) {
            if (i = target.getStyle('overflow') && i != 'hidden' && !this.adjustmentPass) {
                var ts = this.getLayoutTargetSize();
                if (ts.width != size.width){
                    this.adjustmentPass = true;
                    this.onLayout(ct, target);
                }
            }
        }
        delete this.adjustmentPass;
    }

    /**
     * @property activeItem
     * @hide
     */
});

Ext.Container.LAYOUTS['column'] = Ext.layout.ColumnLayout;
/**
 * @class Ext.layout.BorderLayout
 * @extends Ext.layout.ContainerLayout
 * <p>This is a multi-pane, application-oriented UI layout style that supports multiple
 * nested panels, automatic {@link Ext.layout.BorderLayout.Region#split split} bars between
 * {@link Ext.layout.BorderLayout.Region#BorderLayout.Region regions} and built-in
 * {@link Ext.layout.BorderLayout.Region#collapsible expanding and collapsing} of regions.</p>
 * <p>This class is intended to be extended or created via the <tt>layout:'border'</tt>
 * {@link Ext.Container#layout} config, and should generally not need to be created directly
 * via the new keyword.</p>
 * <p>BorderLayout does not have any direct config options (other than inherited ones).
 * All configuration options available for customizing the BorderLayout are at the
 * {@link Ext.layout.BorderLayout.Region} and {@link Ext.layout.BorderLayout.SplitRegion}
 * levels.</p>
 * <p>Example usage:</p>
 * <pre><code>
var myBorderPanel = new Ext.Panel({
    {@link Ext.Component#renderTo renderTo}: document.body,
    {@link Ext.BoxComponent#width width}: 700,
    {@link Ext.BoxComponent#height height}: 500,
    {@link Ext.Panel#title title}: 'Border Layout',
    {@link Ext.Container#layout layout}: 'border',
    {@link Ext.Container#items items}: [{
        {@link Ext.Panel#title title}: 'South Region is resizable',
        {@link Ext.layout.BorderLayout.Region#BorderLayout.Region region}: 'south',     // position for region
        {@link Ext.BoxComponent#height height}: 100,
        {@link Ext.layout.BorderLayout.Region#split split}: true,         // enable resizing
        {@link Ext.SplitBar#minSize minSize}: 75,         // defaults to {@link Ext.layout.BorderLayout.Region#minHeight 50}
        {@link Ext.SplitBar#maxSize maxSize}: 150,
        {@link Ext.layout.BorderLayout.Region#margins margins}: '0 5 5 5'
    },{
        // xtype: 'panel' implied by default
        {@link Ext.Panel#title title}: 'West Region is collapsible',
        {@link Ext.layout.BorderLayout.Region#BorderLayout.Region region}:'west',
        {@link Ext.layout.BorderLayout.Region#margins margins}: '5 0 0 5',
        {@link Ext.BoxComponent#width width}: 200,
        {@link Ext.layout.BorderLayout.Region#collapsible collapsible}: true,   // make collapsible
        {@link Ext.layout.BorderLayout.Region#cmargins cmargins}: '5 5 0 5', // adjust top margin when collapsed
        {@link Ext.Component#id id}: 'west-region-container',
        {@link Ext.Container#layout layout}: 'fit',
        {@link Ext.Panel#unstyled unstyled}: true
    },{
        {@link Ext.Panel#title title}: 'Center Region',
        {@link Ext.layout.BorderLayout.Region#BorderLayout.Region region}: 'center',     // center region is required, no width/height specified
        {@link Ext.Component#xtype xtype}: 'container',
        {@link Ext.Container#layout layout}: 'fit',
        {@link Ext.layout.BorderLayout.Region#margins margins}: '5 5 0 0'
    }]
});
</code></pre>
 * <p><b><u>Notes</u></b>:</p><div class="mdetail-params"><ul>
 * <li>Any container using the BorderLayout <b>must</b> have a child item with <tt>region:'center'</tt>.
 * The child item in the center region will always be resized to fill the remaining space not used by
 * the other regions in the layout.</li>
 * <li>Any child items with a region of <tt>west</tt> or <tt>east</tt> must have <tt>width</tt> defined
 * (an integer representing the number of pixels that the region should take up).</li>
 * <li>Any child items with a region of <tt>north</tt> or <tt>south</tt> must have <tt>height</tt> defined.</li>
 * <li>The regions of a BorderLayout are <b>fixed at render time</b> and thereafter, its child Components may not be removed or added</b>.  To add/remove
 * Components within a BorderLayout, have them wrapped by an additional Container which is directly
 * managed by the BorderLayout.  If the region is to be collapsible, the Container used directly
 * by the BorderLayout manager should be a Panel.  In the following example a Container (an Ext.Panel)
 * is added to the west region:
 * <div style="margin-left:16px"><pre><code>
wrc = {@link Ext#getCmp Ext.getCmp}('west-region-container');
wrc.{@link Ext.Panel#removeAll removeAll}();
wrc.{@link Ext.Container#add add}({
    title: 'Added Panel',
    html: 'Some content'
});
wrc.{@link Ext.Container#doLayout doLayout}();
 * </code></pre></div>
 * </li>
 * <li> To reference a {@link Ext.layout.BorderLayout.Region Region}:
 * <div style="margin-left:16px"><pre><code>
wr = myBorderPanel.layout.west;
 * </code></pre></div>
 * </li>
 * </ul></div>
 */
Ext.layout.BorderLayout = Ext.extend(Ext.layout.ContainerLayout, {
    // private
    monitorResize:true,
    // private
    rendered : false,

    type: 'border',

    targetCls: 'x-border-layout-ct',

    getLayoutTargetSize : function() {
        var target = this.container.getLayoutTarget();
        return target ? target.getViewSize() : {};
    },

    // private
    onLayout : function(ct, target){
        var collapsed, i, c, pos, items = ct.items.items, len = items.length;
        if(!this.rendered){
            collapsed = [];
            for(i = 0; i < len; i++) {
                c = items[i];
                pos = c.region;
                if(c.collapsed){
                    collapsed.push(c);
                }
                c.collapsed = false;
                if(!c.rendered){
                    c.render(target, i);
                    c.getPositionEl().addClass('x-border-panel');
                }
                this[pos] = pos != 'center' && c.split ?
                    new Ext.layout.BorderLayout.SplitRegion(this, c.initialConfig, pos) :
                    new Ext.layout.BorderLayout.Region(this, c.initialConfig, pos);
                this[pos].render(target, c);
            }
            this.rendered = true;
        }

        var size = this.getLayoutTargetSize();
        if(size.width < 20 || size.height < 20){ // display none?
            if(collapsed){
                this.restoreCollapsed = collapsed;
            }
            return;
        }else if(this.restoreCollapsed){
            collapsed = this.restoreCollapsed;
            delete this.restoreCollapsed;
        }

        var w = size.width, h = size.height,
            centerW = w, centerH = h, centerY = 0, centerX = 0,
            n = this.north, s = this.south, west = this.west, e = this.east, c = this.center,
            b, m, totalWidth, totalHeight;
        if(!c && Ext.layout.BorderLayout.WARN !== false){
            throw 'No center region defined in BorderLayout ' + ct.id;
        }

        if(n && n.isVisible()){
            b = n.getSize();
            m = n.getMargins();
            b.width = w - (m.left+m.right);
            b.x = m.left;
            b.y = m.top;
            centerY = b.height + b.y + m.bottom;
            centerH -= centerY;
            n.applyLayout(b);
        }
        if(s && s.isVisible()){
            b = s.getSize();
            m = s.getMargins();
            b.width = w - (m.left+m.right);
            b.x = m.left;
            totalHeight = (b.height + m.top + m.bottom);
            b.y = h - totalHeight + m.top;
            centerH -= totalHeight;
            s.applyLayout(b);
        }
        if(west && west.isVisible()){
            b = west.getSize();
            m = west.getMargins();
            b.height = centerH - (m.top+m.bottom);
            b.x = m.left;
            b.y = centerY + m.top;
            totalWidth = (b.width + m.left + m.right);
            centerX += totalWidth;
            centerW -= totalWidth;
            west.applyLayout(b);
        }
        if(e && e.isVisible()){
            b = e.getSize();
            m = e.getMargins();
            b.height = centerH - (m.top+m.bottom);
            totalWidth = (b.width + m.left + m.right);
            b.x = w - totalWidth + m.left;
            b.y = centerY + m.top;
            centerW -= totalWidth;
            e.applyLayout(b);
        }
        if(c){
            m = c.getMargins();
            var centerBox = {
                x: centerX + m.left,
                y: centerY + m.top,
                width: centerW - (m.left+m.right),
                height: centerH - (m.top+m.bottom)
            };
            c.applyLayout(centerBox);
        }
        if(collapsed){
            for(i = 0, len = collapsed.length; i < len; i++){
                collapsed[i].collapse(false);
            }
        }
        if(Ext.isIE && Ext.isStrict){ // workaround IE strict repainting issue
            target.repaint();
        }
        // Putting a border layout into an overflowed container is NOT correct and will make a second layout pass necessary.
        if (i = target.getStyle('overflow') && i != 'hidden' && !this.adjustmentPass) {
            var ts = this.getLayoutTargetSize();
            if (ts.width != size.width || ts.height != size.height){
                this.adjustmentPass = true;
                this.onLayout(ct, target);
            }
        }
        delete this.adjustmentPass;
    },

    destroy: function() {
        var r = ['north', 'south', 'east', 'west'], i, region;
        for (i = 0; i < r.length; i++) {
            region = this[r[i]];
            if(region){
                if(region.destroy){
                    region.destroy();
                }else if (region.split){
                    region.split.destroy(true);
                }
            }
        }
        Ext.layout.BorderLayout.superclass.destroy.call(this);
    }

    /**
     * @property activeItem
     * @hide
     */
});

/**
 * @class Ext.layout.BorderLayout.Region
 * <p>This is a region of a {@link Ext.layout.BorderLayout BorderLayout} that acts as a subcontainer
 * within the layout.  Each region has its own {@link Ext.layout.ContainerLayout layout} that is
 * independent of other regions and the containing BorderLayout, and can be any of the
 * {@link Ext.layout.ContainerLayout valid Ext layout types}.</p>
 * <p>Region size is managed automatically and cannot be changed by the user -- for
 * {@link #split resizable regions}, see {@link Ext.layout.BorderLayout.SplitRegion}.</p>
 * @constructor
 * Create a new Region.
 * @param {Layout} layout The {@link Ext.layout.BorderLayout BorderLayout} instance that is managing this Region.
 * @param {Object} config The configuration options
 * @param {String} position The region position.  Valid values are: <tt>north</tt>, <tt>south</tt>,
 * <tt>east</tt>, <tt>west</tt> and <tt>center</tt>.  Every {@link Ext.layout.BorderLayout BorderLayout}
 * <b>must have a center region</b> for the primary content -- all other regions are optional.
 */
Ext.layout.BorderLayout.Region = function(layout, config, pos){
    Ext.apply(this, config);
    this.layout = layout;
    this.position = pos;
    this.state = {};
    if(typeof this.margins == 'string'){
        this.margins = this.layout.parseMargins(this.margins);
    }
    this.margins = Ext.applyIf(this.margins || {}, this.defaultMargins);
    if(this.collapsible){
        if(typeof this.cmargins == 'string'){
            this.cmargins = this.layout.parseMargins(this.cmargins);
        }
        if(this.collapseMode == 'mini' && !this.cmargins){
            this.cmargins = {left:0,top:0,right:0,bottom:0};
        }else{
            this.cmargins = Ext.applyIf(this.cmargins || {},
                pos == 'north' || pos == 'south' ? this.defaultNSCMargins : this.defaultEWCMargins);
        }
    }
};

Ext.layout.BorderLayout.Region.prototype = {
    /**
     * @cfg {Boolean} animFloat
     * When a collapsed region's bar is clicked, the region's panel will be displayed as a floated
     * panel that will close again once the user mouses out of that panel (or clicks out if
     * <tt>{@link #autoHide} = false</tt>).  Setting <tt>{@link #animFloat} = false</tt> will
     * prevent the open and close of these floated panels from being animated (defaults to <tt>true</tt>).
     */
    /**
     * @cfg {Boolean} autoHide
     * When a collapsed region's bar is clicked, the region's panel will be displayed as a floated
     * panel.  If <tt>autoHide = true</tt>, the panel will automatically hide after the user mouses
     * out of the panel.  If <tt>autoHide = false</tt>, the panel will continue to display until the
     * user clicks outside of the panel (defaults to <tt>true</tt>).
     */
    /**
     * @cfg {String} collapseMode
     * <tt>collapseMode</tt> supports two configuration values:<div class="mdetail-params"><ul>
     * <li><b><tt>undefined</tt></b> (default)<div class="sub-desc">By default, {@link #collapsible}
     * regions are collapsed by clicking the expand/collapse tool button that renders into the region's
     * title bar.</div></li>
     * <li><b><tt>'mini'</tt></b><div class="sub-desc">Optionally, when <tt>collapseMode</tt> is set to
     * <tt>'mini'</tt> the region's split bar will also display a small collapse button in the center of
     * the bar. In <tt>'mini'</tt> mode the region will collapse to a thinner bar than in normal mode.
     * </div></li>
     * </ul></div></p>
     * <p><b>Note</b>: if a collapsible region does not have a title bar, then set <tt>collapseMode =
     * 'mini'</tt> and <tt>{@link #split} = true</tt> in order for the region to be {@link #collapsible}
     * by the user as the expand/collapse tool button (that would go in the title bar) will not be rendered.</p>
     * <p>See also <tt>{@link #cmargins}</tt>.</p>
     */
    /**
     * @cfg {Object} margins
     * An object containing margins to apply to the region when in the expanded state in the
     * format:<pre><code>
{
    top: (top margin),
    right: (right margin),
    bottom: (bottom margin),
    left: (left margin)
}</code></pre>
     * <p>May also be a string containing space-separated, numeric margin values. The order of the
     * sides associated with each value matches the way CSS processes margin values:</p>
     * <p><div class="mdetail-params"><ul>
     * <li>If there is only one value, it applies to all sides.</li>
     * <li>If there are two values, the top and bottom borders are set to the first value and the
     * right and left are set to the second.</li>
     * <li>If there are three values, the top is set to the first value, the left and right are set
     * to the second, and the bottom is set to the third.</li>
     * <li>If there are four values, they apply to the top, right, bottom, and left, respectively.</li>
     * </ul></div></p>
     * <p>Defaults to:</p><pre><code>
     * {top:0, right:0, bottom:0, left:0}
     * </code></pre>
     */
    /**
     * @cfg {Object} cmargins
     * An object containing margins to apply to the region when in the collapsed state in the
     * format:<pre><code>
{
    top: (top margin),
    right: (right margin),
    bottom: (bottom margin),
    left: (left margin)
}</code></pre>
     * <p>May also be a string containing space-separated, numeric margin values. The order of the
     * sides associated with each value matches the way CSS processes margin values.</p>
     * <p><ul>
     * <li>If there is only one value, it applies to all sides.</li>
     * <li>If there are two values, the top and bottom borders are set to the first value and the
     * right and left are set to the second.</li>
     * <li>If there are three values, the top is set to the first value, the left and right are set
     * to the second, and the bottom is set to the third.</li>
     * <li>If there are four values, they apply to the top, right, bottom, and left, respectively.</li>
     * </ul></p>
     */
    /**
     * @cfg {Boolean} collapsible
     * <p><tt>true</tt> to allow the user to collapse this region (defaults to <tt>false</tt>).  If
     * <tt>true</tt>, an expand/collapse tool button will automatically be rendered into the title
     * bar of the region, otherwise the button will not be shown.</p>
     * <p><b>Note</b>: that a title bar is required to display the collapse/expand toggle button -- if
     * no <tt>title</tt> is specified for the region's panel, the region will only be collapsible if
     * <tt>{@link #collapseMode} = 'mini'</tt> and <tt>{@link #split} = true</tt>.
     */
    collapsible : false,
    /**
     * @cfg {Boolean} split
     * <p><tt>true</tt> to create a {@link Ext.layout.BorderLayout.SplitRegion SplitRegion} and
     * display a 5px wide {@link Ext.SplitBar} between this region and its neighbor, allowing the user to
     * resize the regions dynamically.  Defaults to <tt>false</tt> creating a
     * {@link Ext.layout.BorderLayout.Region Region}.</p><br>
     * <p><b>Notes</b>:</p><div class="mdetail-params"><ul>
     * <li>this configuration option is ignored if <tt>region='center'</tt></li>
     * <li>when <tt>split == true</tt>, it is common to specify a
     * <tt>{@link Ext.SplitBar#minSize minSize}</tt> and <tt>{@link Ext.SplitBar#maxSize maxSize}</tt>
     * for the {@link Ext.BoxComponent BoxComponent} representing the region. These are not native
     * configs of {@link Ext.BoxComponent BoxComponent}, and are used only by this class.</li>
     * <li>if <tt>{@link #collapseMode} = 'mini'</tt> requires <tt>split = true</tt> to reserve space
     * for the collapse tool</tt></li>
     * </ul></div>
     */
    split:false,
    /**
     * @cfg {Boolean} floatable
     * <tt>true</tt> to allow clicking a collapsed region's bar to display the region's panel floated
     * above the layout, <tt>false</tt> to force the user to fully expand a collapsed region by
     * clicking the expand button to see it again (defaults to <tt>true</tt>).
     */
    floatable: true,
    /**
     * @cfg {Number} minWidth
     * <p>The minimum allowable width in pixels for this region (defaults to <tt>50</tt>).
     * <tt>maxWidth</tt> may also be specified.</p><br>
     * <p><b>Note</b>: setting the <tt>{@link Ext.SplitBar#minSize minSize}</tt> /
     * <tt>{@link Ext.SplitBar#maxSize maxSize}</tt> supersedes any specified
     * <tt>minWidth</tt> / <tt>maxWidth</tt>.</p>
     */
    minWidth:50,
    /**
     * @cfg {Number} minHeight
     * The minimum allowable height in pixels for this region (defaults to <tt>50</tt>)
     * <tt>maxHeight</tt> may also be specified.</p><br>
     * <p><b>Note</b>: setting the <tt>{@link Ext.SplitBar#minSize minSize}</tt> /
     * <tt>{@link Ext.SplitBar#maxSize maxSize}</tt> supersedes any specified
     * <tt>minHeight</tt> / <tt>maxHeight</tt>.</p>
     */
    minHeight:50,

    // private
    defaultMargins : {left:0,top:0,right:0,bottom:0},
    // private
    defaultNSCMargins : {left:5,top:5,right:5,bottom:5},
    // private
    defaultEWCMargins : {left:5,top:0,right:5,bottom:0},
    floatingZIndex: 100,

    /**
     * True if this region is collapsed. Read-only.
     * @type Boolean
     * @property
     */
    isCollapsed : false,

    /**
     * This region's panel.  Read-only.
     * @type Ext.Panel
     * @property panel
     */
    /**
     * This region's layout.  Read-only.
     * @type Layout
     * @property layout
     */
    /**
     * This region's layout position (north, south, east, west or center).  Read-only.
     * @type String
     * @property position
     */

    // private
    render : function(ct, p){
        this.panel = p;
        p.el.enableDisplayMode();
        this.targetEl = ct;
        this.el = p.el;

        var gs = p.getState, ps = this.position;
        p.getState = function(){
            return Ext.apply(gs.call(p) || {}, this.state);
        }.createDelegate(this);

        if(ps != 'center'){
            p.allowQueuedExpand = false;
            p.on({
                beforecollapse: this.beforeCollapse,
                collapse: this.onCollapse,
                beforeexpand: this.beforeExpand,
                expand: this.onExpand,
                hide: this.onHide,
                show: this.onShow,
                scope: this
            });
            if(this.collapsible || this.floatable){
                p.collapseEl = 'el';
                p.slideAnchor = this.getSlideAnchor();
            }
            if(p.tools && p.tools.toggle){
                p.tools.toggle.addClass('x-tool-collapse-'+ps);
                p.tools.toggle.addClassOnOver('x-tool-collapse-'+ps+'-over');
            }
        }
    },

    // private
    getCollapsedEl : function(){
        if(!this.collapsedEl){
            if(!this.toolTemplate){
                var tt = new Ext.Template(
                     '<div class="x-tool x-tool-{id}">&#160;</div>'
                );
                tt.disableFormats = true;
                tt.compile();
                Ext.layout.BorderLayout.Region.prototype.toolTemplate = tt;
            }
            this.collapsedEl = this.targetEl.createChild({
                cls: "x-layout-collapsed x-layout-collapsed-"+this.position,
                id: this.panel.id + '-xcollapsed'
            });
            this.collapsedEl.enableDisplayMode('block');

            if(this.collapseMode == 'mini'){
                this.collapsedEl.addClass('x-layout-cmini-'+this.position);
                this.miniCollapsedEl = this.collapsedEl.createChild({
                    cls: "x-layout-mini x-layout-mini-"+this.position, html: "&#160;"
                });
                this.miniCollapsedEl.addClassOnOver('x-layout-mini-over');
                this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
                this.collapsedEl.on('click', this.onExpandClick, this, {stopEvent:true});
            }else {
                if(this.collapsible !== false && !this.hideCollapseTool) {
                    var t = this.toolTemplate.append(
                            this.collapsedEl.dom,
                            {id:'expand-'+this.position}, true);
                    t.addClassOnOver('x-tool-expand-'+this.position+'-over');
                    t.on('click', this.onExpandClick, this, {stopEvent:true});
                }
                if(this.floatable !== false || this.titleCollapse){
                   this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
                   this.collapsedEl.on("click", this[this.floatable ? 'collapseClick' : 'onExpandClick'], this);
                }
            }
        }
        return this.collapsedEl;
    },

    // private
    onExpandClick : function(e){
        if(this.isSlid){
            this.panel.expand(false);
        }else{
            this.panel.expand();
        }
    },

    // private
    onCollapseClick : function(e){
        this.panel.collapse();
    },

    // private
    beforeCollapse : function(p, animate){
        this.lastAnim = animate;
        if(this.splitEl){
            this.splitEl.hide();
        }
        this.getCollapsedEl().show();
        var el = this.panel.getEl();
        this.originalZIndex = el.getStyle('z-index');
        el.setStyle('z-index', 100);
        this.isCollapsed = true;
        this.layout.layout();
    },

    // private
    onCollapse : function(animate){
        this.panel.el.setStyle('z-index', 1);
        if(this.lastAnim === false || this.panel.animCollapse === false){
            this.getCollapsedEl().dom.style.visibility = 'visible';
        }else{
            this.getCollapsedEl().slideIn(this.panel.slideAnchor, {duration:.2});
        }
        this.state.collapsed = true;
        this.panel.saveState();
    },

    // private
    beforeExpand : function(animate){
        if(this.isSlid){
            this.afterSlideIn();
        }
        var c = this.getCollapsedEl();
        this.el.show();
        if(this.position == 'east' || this.position == 'west'){
            this.panel.setSize(undefined, c.getHeight());
        }else{
            this.panel.setSize(c.getWidth(), undefined);
        }
        c.hide();
        c.dom.style.visibility = 'hidden';
        this.panel.el.setStyle('z-index', this.floatingZIndex);
    },

    // private
    onExpand : function(){
        this.isCollapsed = false;
        if(this.splitEl){
            this.splitEl.show();
        }
        this.layout.layout();
        this.panel.el.setStyle('z-index', this.originalZIndex);
        this.state.collapsed = false;
        this.panel.saveState();
    },

    // private
    collapseClick : function(e){
        if(this.isSlid){
           e.stopPropagation();
           this.slideIn();
        }else{
           e.stopPropagation();
           this.slideOut();
        }
    },

    // private
    onHide : function(){
        if(this.isCollapsed){
            this.getCollapsedEl().hide();
        }else if(this.splitEl){
            this.splitEl.hide();
        }
    },

    // private
    onShow : function(){
        if(this.isCollapsed){
            this.getCollapsedEl().show();
        }else if(this.splitEl){
            this.splitEl.show();
        }
    },

    /**
     * True if this region is currently visible, else false.
     * @return {Boolean}
     */
    isVisible : function(){
        return !this.panel.hidden;
    },

    /**
     * Returns the current margins for this region.  If the region is collapsed, the
     * {@link #cmargins} (collapsed margins) value will be returned, otherwise the
     * {@link #margins} value will be returned.
     * @return {Object} An object containing the element's margins: <tt>{left: (left
     * margin), top: (top margin), right: (right margin), bottom: (bottom margin)}</tt>
     */
    getMargins : function(){
        return this.isCollapsed && this.cmargins ? this.cmargins : this.margins;
    },

    /**
     * Returns the current size of this region.  If the region is collapsed, the size of the
     * collapsedEl will be returned, otherwise the size of the region's panel will be returned.
     * @return {Object} An object containing the element's size: <tt>{width: (element width),
     * height: (element height)}</tt>
     */
    getSize : function(){
        return this.isCollapsed ? this.getCollapsedEl().getSize() : this.panel.getSize();
    },

    /**
     * Sets the specified panel as the container element for this region.
     * @param {Ext.Panel} panel The new panel
     */
    setPanel : function(panel){
        this.panel = panel;
    },

    /**
     * Returns the minimum allowable width for this region.
     * @return {Number} The minimum width
     */
    getMinWidth: function(){
        return this.minWidth;
    },

    /**
     * Returns the minimum allowable height for this region.
     * @return {Number} The minimum height
     */
    getMinHeight: function(){
        return this.minHeight;
    },

    // private
    applyLayoutCollapsed : function(box){
        var ce = this.getCollapsedEl();
        ce.setLeftTop(box.x, box.y);
        ce.setSize(box.width, box.height);
    },

    // private
    applyLayout : function(box){
        if(this.isCollapsed){
            this.applyLayoutCollapsed(box);
        }else{
            this.panel.setPosition(box.x, box.y);
            this.panel.setSize(box.width, box.height);
        }
    },

    // private
    beforeSlide: function(){
        this.panel.beforeEffect();
    },

    // private
    afterSlide : function(){
        this.panel.afterEffect();
    },

    // private
    initAutoHide : function(){
        if(this.autoHide !== false){
            if(!this.autoHideHd){
                this.autoHideSlideTask = new Ext.util.DelayedTask(this.slideIn, this);
                this.autoHideHd = {
                    "mouseout": function(e){
                        if(!e.within(this.el, true)){
                            this.autoHideSlideTask.delay(500);
                        }
                    },
                    "mouseover" : function(e){
                        this.autoHideSlideTask.cancel();
                    },
                    scope : this
                };
            }
            this.el.on(this.autoHideHd);
            this.collapsedEl.on(this.autoHideHd);
        }
    },

    // private
    clearAutoHide : function(){
        if(this.autoHide !== false){
            this.el.un("mouseout", this.autoHideHd.mouseout);
            this.el.un("mouseover", this.autoHideHd.mouseover);
            this.collapsedEl.un("mouseout", this.autoHideHd.mouseout);
            this.collapsedEl.un("mouseover", this.autoHideHd.mouseover);
        }
    },

    // private
    clearMonitor : function(){
        Ext.getDoc().un("click", this.slideInIf, this);
    },

    /**
     * If this Region is {@link #floatable}, this method slides this Region into full visibility <i>over the top
     * of the center Region</i> where it floats until either {@link #slideIn} is called, or other regions of the layout
     * are clicked, or the mouse exits the Region.
     */
    slideOut : function(){
        if(this.isSlid || this.el.hasActiveFx()){
            return;
        }
        this.isSlid = true;
        var ts = this.panel.tools, dh, pc;
        if(ts && ts.toggle){
            ts.toggle.hide();
        }
        this.el.show();

        // Temporarily clear the collapsed flag so we can onResize the panel on the slide
        pc = this.panel.collapsed;
        this.panel.collapsed = false;

        if(this.position == 'east' || this.position == 'west'){
            // Temporarily clear the deferHeight flag so we can size the height on the slide
            dh = this.panel.deferHeight;
            this.panel.deferHeight = false;

            this.panel.setSize(undefined, this.collapsedEl.getHeight());

            // Put the deferHeight flag back after setSize
            this.panel.deferHeight = dh;
        }else{
            this.panel.setSize(this.collapsedEl.getWidth(), undefined);
        }

        // Put the collapsed flag back after onResize
        this.panel.collapsed = pc;

        this.restoreLT = [this.el.dom.style.left, this.el.dom.style.top];
        this.el.alignTo(this.collapsedEl, this.getCollapseAnchor());
        this.el.setStyle("z-index", this.floatingZIndex+2);
        this.panel.el.replaceClass('x-panel-collapsed', 'x-panel-floating');
        if(this.animFloat !== false){
            this.beforeSlide();
            this.el.slideIn(this.getSlideAnchor(), {
                callback: function(){
                    this.afterSlide();
                    this.initAutoHide();
                    Ext.getDoc().on("click", this.slideInIf, this);
                },
                scope: this,
                block: true
            });
        }else{
            this.initAutoHide();
             Ext.getDoc().on("click", this.slideInIf, this);
        }
    },

    // private
    afterSlideIn : function(){
        this.clearAutoHide();
        this.isSlid = false;
        this.clearMonitor();
        this.el.setStyle("z-index", "");
        this.panel.el.replaceClass('x-panel-floating', 'x-panel-collapsed');
        this.el.dom.style.left = this.restoreLT[0];
        this.el.dom.style.top = this.restoreLT[1];

        var ts = this.panel.tools;
        if(ts && ts.toggle){
            ts.toggle.show();
        }
    },

    /**
     * If this Region is {@link #floatable}, and this Region has been slid into floating visibility, then this method slides
     * this region back into its collapsed state.
     */
    slideIn : function(cb){
        if(!this.isSlid || this.el.hasActiveFx()){
            Ext.callback(cb);
            return;
        }
        this.isSlid = false;
        if(this.animFloat !== false){
            this.beforeSlide();
            this.el.slideOut(this.getSlideAnchor(), {
                callback: function(){
                    this.el.hide();
                    this.afterSlide();
                    this.afterSlideIn();
                    Ext.callback(cb);
                },
                scope: this,
                block: true
            });
        }else{
            this.el.hide();
            this.afterSlideIn();
        }
    },

    // private
    slideInIf : function(e){
        if(!e.within(this.el)){
            this.slideIn();
        }
    },

    // private
    anchors : {
        "west" : "left",
        "east" : "right",
        "north" : "top",
        "south" : "bottom"
    },

    // private
    sanchors : {
        "west" : "l",
        "east" : "r",
        "north" : "t",
        "south" : "b"
    },

    // private
    canchors : {
        "west" : "tl-tr",
        "east" : "tr-tl",
        "north" : "tl-bl",
        "south" : "bl-tl"
    },

    // private
    getAnchor : function(){
        return this.anchors[this.position];
    },

    // private
    getCollapseAnchor : function(){
        return this.canchors[this.position];
    },

    // private
    getSlideAnchor : function(){
        return this.sanchors[this.position];
    },

    // private
    getAlignAdj : function(){
        var cm = this.cmargins;
        switch(this.position){
            case "west":
                return [0, 0];
            break;
            case "east":
                return [0, 0];
            break;
            case "north":
                return [0, 0];
            break;
            case "south":
                return [0, 0];
            break;
        }
    },

    // private
    getExpandAdj : function(){
        var c = this.collapsedEl, cm = this.cmargins;
        switch(this.position){
            case "west":
                return [-(cm.right+c.getWidth()+cm.left), 0];
            break;
            case "east":
                return [cm.right+c.getWidth()+cm.left, 0];
            break;
            case "north":
                return [0, -(cm.top+cm.bottom+c.getHeight())];
            break;
            case "south":
                return [0, cm.top+cm.bottom+c.getHeight()];
            break;
        }
    },

    destroy : function(){
        if (this.autoHideSlideTask && this.autoHideSlideTask.cancel){
            this.autoHideSlideTask.cancel();
        }
        Ext.destroy(this.miniCollapsedEl, this.collapsedEl);
    }
};

/**
 * @class Ext.layout.BorderLayout.SplitRegion
 * @extends Ext.layout.BorderLayout.Region
 * <p>This is a specialized type of {@link Ext.layout.BorderLayout.Region BorderLayout region} that
 * has a built-in {@link Ext.SplitBar} for user resizing of regions.  The movement of the split bar
 * is configurable to move either {@link #tickSize smooth or incrementally}.</p>
 * @constructor
 * Create a new SplitRegion.
 * @param {Layout} layout The {@link Ext.layout.BorderLayout BorderLayout} instance that is managing this Region.
 * @param {Object} config The configuration options
 * @param {String} position The region position.  Valid values are: north, south, east, west and center.  Every
 * BorderLayout must have a center region for the primary content -- all other regions are optional.
 */
Ext.layout.BorderLayout.SplitRegion = function(layout, config, pos){
    Ext.layout.BorderLayout.SplitRegion.superclass.constructor.call(this, layout, config, pos);
    // prevent switch
    this.applyLayout = this.applyFns[pos];
};

Ext.extend(Ext.layout.BorderLayout.SplitRegion, Ext.layout.BorderLayout.Region, {
    /**
     * @cfg {Number} tickSize
     * The increment, in pixels by which to move this Region's {@link Ext.SplitBar SplitBar}.
     * By default, the {@link Ext.SplitBar SplitBar} moves smoothly.
     */
    /**
     * @cfg {String} splitTip
     * The tooltip to display when the user hovers over a
     * {@link Ext.layout.BorderLayout.Region#collapsible non-collapsible} region's split bar
     * (defaults to <tt>"Drag to resize."</tt>).  Only applies if
     * <tt>{@link #useSplitTips} = true</tt>.
     */
    splitTip : "Drag to resize.",
    /**
     * @cfg {String} collapsibleSplitTip
     * The tooltip to display when the user hovers over a
     * {@link Ext.layout.BorderLayout.Region#collapsible collapsible} region's split bar
     * (defaults to "Drag to resize. Double click to hide."). Only applies if
     * <tt>{@link #useSplitTips} = true</tt>.
     */
    collapsibleSplitTip : "Drag to resize. Double click to hide.",
    /**
     * @cfg {Boolean} useSplitTips
     * <tt>true</tt> 