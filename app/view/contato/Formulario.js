Ext.onReady(function() {

    // Add the additional 'advanced' VTypes
    Ext.apply(Ext.form.field.VTypes, {

        daterange: function(val, field) {


           // console.log(Ext.Date.add(val, Ext.Date.DAY,1));
            var date = field.parseDate(val);

            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
                
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date; 
                
            }
            /*
             * Always return true since we're only using this vtype to set the
             * min/max allowed values (these are tested for after the vtype test)
             */
            return true;
        },

        daterangeText: 'Start date must be less than end date',

    });
});

Ext.override(Ext.form.Basic, {
    setValues: function(values) {
        var me = this,
            fields = this.getFields(),
            v, vLen, val, field, idx;
    
        function setVal(fieldId, val) {
              for(idx in fields.items) {
                field = fields.items[idx];
                if(field.id == fieldId || field.getName() == fieldId) {
                    field.setValue(val);
                    
                    if (me.trackResetOnLoad) {
                        field.resetOriginalValue();
                    }
                }
            } 
        }
        
        if (Ext.isArray(values)) {
            // array of objects
            vLen = values.length;


            for (v = 0; v < vLen; v++) {
                val = values[v];
                setVal(val.id, val.value);
            }
            
        } else {
            // object hash
            Ext.iterate(values, setVal);
        }
        
        return this;
    }
});

Ext.define('ExtMVC.view.contato.Formulario', {
    extend: 'Ext.window.Window',
    alias : 'widget.contatoform',

    requires: ['Ext.form.Panel','Ext.form.field.Text','Ext.form.field.Date','Ext.form.field.VTypes'],

    title : 'Edit/Crate Contact',
    layout: 'fit',
    autoShow: true,
    width: 480,
    
    iconCls: 'icon-user',

    initComponent: function() { 
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [
					{
					    xtype: 'textfield',
					    name : 'id',
					    fieldLabel: 'id',
					    hidden:true
					},    
                    
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    },
                     

                      {
                       xtype: 'fieldcontainer',
                       layout: 'hbox',
                       fieldLabel: 'Dates',
                       defaults: {
                         flex: 1,
                         xtype: 'datefield',
                         dateFormat: 'Y-m-d',
                       },
                       items: [
                        {
                            xtype: 'datefield',
                            name: 'date1',
                            dateFormat: 'Y-m-d',
                            itemId: 'date1',
                            vtype: 'daterange',
                            endDateField: 'date2' // id of the end date field
                            
                        },
                        {
                            xtype: 'datefield',
                            name: 'date2',
                            dateFormat: 'Y-m-d',
                            itemId: 'date2',
                            vtype: 'daterange',
                            startDateField: 'date1', // id of the start date field
                            endDateField: 'date3' // id of the end date field


                            
                        },

                        {
                            xtype: 'datefield',
                            name: 'date3',
                            dateFormat: 'Y-m-d',
                            itemId: 'date3',
                            vtype: 'daterange',
                            startDateField: 'date2' // id of the start date field
                            //endDateField: 'date2' // id of the end date field
                           
                        }
                       ]
                      },
                     
                       {
                            xtype: 'displayfield',
                            name: 'date1',
                            fieldLabel: 'Date 1',
                            
                            
                        },
                        {
                            xtype: 'displayfield',
                            name: 'date2',
                            fieldLabel: 'Date 2',
                            
                            
                        },

                        {
                            xtype: 'displayfield',
                            name: 'date3',
                            fieldLabel: 'Date 3',
                            
                           
                        } 
                    
                ]
            }
        ];
        //console.log(Ext.form.findField('email'));
        //console.log(this.date3);
        //console.log(form.getForm().getValues());
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'save',
                action: 'save'
            },{
                iconCls: 'icon-reset',
                text: 'Cancel',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});


