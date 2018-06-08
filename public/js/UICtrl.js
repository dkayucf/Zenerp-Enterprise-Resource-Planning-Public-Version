//================UI CONTROLLER==================
export const UICtrl = (function(){
    //    const USStates = ItemCtrl.getUSStates();
        
        const UISelectors = {
            //Buttons
            addNewItem: '.addNewItem',
            updateItem: '.updateItem',
            backBtn: '.backBtn',
            saveInvoice: '.saveInvoice',
            editInvoice: '.editInvoice',
            deleteInvoice: '.deleteInvoice',
            invID: '.invID',
            draftStatusBtn: '.draftStatusBtn',
            publishStatusBtn: '.publishStatusBtn',
            updateStatusBtn: '.updateStatusBtn',
            generalBackBtn: '.generalBackBtn',
            
            //Inputs
            vendorName: '.vendorName',
            vendorEmail: '.vendorEmail',
            vendorPhone: '.vendorPhone',
            vendorAddress: '.vendorAddress',
            vendorCity: '.vendorCity',
            vendorZip: '.vendorZip',
            subtotal: '.subtotal',
            taxRate: '.taxRate',
            taxAmount: '.taxAmount',
            payments: '.payments',
            amountDue: '.amountDue',
            salesPerson: '.salesPerson',
            invoiceSubject: '.invoiceSubject',
            issueDate: '.issueDate',
            dueDate: '.dueDate',
            invoiceId: '.invoiceId',
            hiddenID: '.hiddenID',
            traderName: '#traderName',
            
            //Selects
            vendorSelect: '.vendorSelect',
            vendorState: '.vendorState',
            states: '.states',
            itemType: '.itemType',
            description: '.description',
            quantity: '.quantity',
            unitPrice: '.unitPrice',
            itemAmount: '.itemAmount',
            employeeStore: '.employeeStore',
            employeeDepartment: '.employeeDepartment',
            timeInterval: '.timeInterval',
            storeFilter: '.storeFilter',
            tradeeName: '#tradeeName',
            tradeeShift: '#tradeeShift',
    
            //CheckBoxes
            publishedCheck: '#publishedCheck',
            draftCheck: '#draftCheck',
            employmentStatus: '. employmentStatus',
            weeklyScheduleRequest: '#weeklyRequest',
            dailyScheduleRequest: '#dailyRequest',
            
            //TextAreas
            comments: '.comments',
            terms: '.terms',
            
            //Other
            invTabBody: '.invTabBody',
            invTabRow: '.invTabBody tr',
            invItemId: '.invItemId',
            alert: '.alert',
            alertContainer: '.alert-container'
            
            
        }
        
        //Public Methods
        return {
            displaySelectedVendor(data){
                document.querySelector(UISelectors.vendorName).value = data.vendorName;
                document.querySelector(UISelectors.vendorEmail).value = data.vendorEmail;
                document.querySelector(UISelectors.vendorPhone).value = data.vendorPhone;
                document.querySelector(UISelectors.vendorAddress).value = data.vendorAddress;
                document.querySelector(UISelectors.vendorCity).value = data.vendorCity;
                document.querySelector(UISelectors.vendorZip).value = data.vendorZip;
                document.querySelector(UISelectors.vendorState).value = data.vendorState;
    
                M.updateTextFields();   
            },
            displayFoundItems:(retrievedItem)=>{
                document.querySelector(UISelectors.invItemId).value = retrievedItem.id;
                document.querySelector(UISelectors.itemType).value = retrievedItem.itemType;
                document.querySelector(UISelectors.description).value = retrievedItem.itemDescription;
                document.querySelector(UISelectors.quantity).value = retrievedItem.itemQuantity;
                document.querySelector(UISelectors.unitPrice).value = retrievedItem.itemUnitPrice;
                document.querySelector(UISelectors.itemAmount).value = retrievedItem.itemAmount;
                M.updateTextFields(); 
            },
            displayNewItem: (newItem)=>{
                
                //Create table row element <tr>
               const tr = document.createElement('tr');
                
                //add id to tr
                tr.id = `item-${newItem.id}`;
                
                //add innerHTML to tr
                tr.innerHTML = `<td class="align-middle">${newItem.itemType}</td>
                                <td class="align-middle">${newItem.itemDescription}</td>
                                <td class="align-middle">${newItem.itemQuantity}</td>
                                <td class="align-middle">&dollar;${newItem.itemUnitPrice}</td>
                                <td class="align-middle">&dollar;${newItem.itemAmount}</td>
                                <td class="modifytd align-middle"><button class="btn  light-blue darken-2 editInvoiceItem mr-2" type="button"><i class="far fa-edit h5 mb-0"> </i></button>
                                <button class="btn red darken-4 deleteInvoiceItem" type="button"><i class="far fa-trash-alt h5 mb-0"></i></button></td>`;
                
                //Insert item
                document.querySelector(UISelectors.invTabBody).insertAdjacentElement('beforeend', tr);
            },
            displayUpdatedItem: (itemId, updatedItem)=>{
                
                let tableRows = document.querySelectorAll(UISelectors.invTabRow);
                
                tableRows = Array.from(tableRows);
      
                tableRows.forEach(row=> {
                    let rowId = parseInt(row.id.split('-')[1]);
                    
                    if(rowId === itemId){
                        row.innerHTML = `
                                    <td class="align-middle">${updatedItem.itemType}</td>
                                    <td class="align-middle">${updatedItem.description}</td>
                                    <td class="align-middle">${updatedItem.quantity}</td>
                                    <td class="align-middle">&dollar;${updatedItem.unitPrice}</td>
                                    <td class="align-middle">&dollar;${updatedItem.amount}</td>
                                    <td class="modifytd align-middle"><button class="btn  light-blue darken-2 editInvoiceItem mr-2" type="button"><i class="far fa-edit h5 mb-0"> </i></button>
                                    <button class="btn red darken-4 deleteInvoiceItem" type="button"><i class="far fa-trash-alt h5 mb-0"></i></button></td>`;
                    }
                }) 
            },
            displayEmployeeData: (data)=> {
    
                let empDepSelect = document.querySelector(UISelectors.employeeDepartment);
                let options = Array.from(empDepSelect.options);
                $(`select[id$='employeeDepartment'] option[value=${data.employeeDepartment}]`).attr("selected", true);
                $('#employeeDepartment').formSelect();
                
                let empStatusBoxes = Array.from(document.querySelectorAll('.employmentStatus'));
                
                empStatusBoxes.forEach(box => {
                    if(box.value === data.employmentStatus){
                        
                        box.checked = true;
                    }
                });
                
            },
            employeeHoursCard: (intervalStart, intervalEnd) =>{
    
                let params = (new URL(location)).searchParams,
                        employeeStore = params.get('storeID');
    
                fetch(`/schedules/hours?intervalStart=${intervalStart}&intervalEnd=${intervalEnd}&storeID=${employeeStore}`, {
                        method: 'GET',
                        credentials: 'same-origin'
                    })
                    .then(response => response.json())
                    .then(data => {
                      
                        let hoursUL = document.querySelector('.scheduledHours');
                        hoursUL.innerHTML = '';
                        data.forEach(datum => {
                            let hoursLI = document.createElement('LI');
                            hoursLI.className = 'collection-item';
                            let textNode = document.createTextNode(`${datum.employeeName}: ${datum.hours} Hours`);
                            hoursLI.appendChild(textNode);
                            hoursUL.appendChild(hoursLI);
                        })
                    })
                    .catch(err => console.log(err));
            },
            // displayCalendar: (employeeStore, resources, settings)=>{       
            //         if(!employeeStore){
            //             let params = (new URL(location)).searchParams,
            //             employeeStore = params.get('storeID');
            //         }
    
            //         fetch(`/schedules/build/load/${employeeStore}`, {
            //             method: 'GET',
            //             credentials: 'same-origin'
            //         })
            //             .then(response => response.json())
            //             .then(data => {
    
            //                 let publishedShifts = data.filter(pubShifts => {
            //                     if(pubShifts.className.indexOf('publishShift') !== -1){
            //                         return pubShifts;
            //                     }
            //                 });
            //                         //Instantiate the employee calendar and pass in the published shifts
            //                         $('#employeesCalendar').fullCalendar({                       
            //                             themeSystem: 'standard',
            //                             defaultView: 'timelineWeek',
            //                             firstDay: settings.firstDay,
            //                             allDaySlot: false,
            //                             slotEventOverlap: false,
            //                             columnHeaderFormat: 'ddd M.D YY',
            //                             header: {
            //                               left: 'prev,next,addEmployeeButton,scheduleSettings',
            //                               center: 'title',
            //                               right: 'timelineDay,timelineWeek,timelineMonth,listWeek'
            //                             },
            //                             minTime:  settings.minTime,
            //                             maxTime: settings.maxTime,
            //                             slotDuration: settings.slotDuration,
            //                             resourceLabelText: 'Departments',
            //                             resourceGroupField: 'department',
            //                             resources: resources,
            //                             editable: false,
            //                             overlap: false,
            //                             handleWindowResize: true,
            //                             displayEventTime:true,
            //                             displayEventEnd: true,
            //                             contentHeight: 500,
            //                             noEventsMessage: "No shifts to display",
            //                             resourceAreaWidth: "175px",
            //                             events: publishedShifts,
            //                             eventLimit: true,
            //                             eventOverlap: false,
            //                             selectOverlap: false,
            //                             eventRender: function(event, element) {
            //                                 let traderShiftStart = event.start._i,
            //                                     traderShiftEnd = event.end._i,
            //                                     intervalStart = moment(event.source.calendar.view.intervalStart).format('YYYY-MM-DD'),
            //                                     intervalEnd = moment(event.source.calendar.view.intervalEnd).subtract(1, 'days').format('YYYY-MM-DD');
            //                                 console.log(event);
    
            //                                 if(element[0].classList.contains('tradeShift')){
            //                                     element.find(".fc-bg").css("pointer-events","none");
            //                                     element.append(`<a class="right mr-2 yellow-text" href="/schedules/tradeShift?traderShiftID=${event._id}&employeeStore=${employeeStore}&resourceID=${event.resourceId}&intervalStart=${intervalStart}&intervalEnd=${intervalEnd}&traderShiftStart=${traderShiftStart}&traderShiftEnd=${traderShiftEnd}">Trade Shift</a>`);
            //                                 }
            //                             }
            //                         });
                            
    
            //             })
            //             .catch(err => console.log(err));
                       
            //             $('#managersCalendar').fullCalendar({
                            
            //                 themeSystem: 'standard',
            //                 defaultView: 'timelineWeek',
            //                 firstDay: settings.firstDay,
            //                 allDaySlot: false,
            //                 slotEventOverlap: false,
            //                 columnHeaderFormat: 'ddd M.D YY',
            //                 header: {
            //                   left: 'prev,next,addEmployeeButton,scheduleSettings',
            //                   center: 'title',
            //                   right: 'timelineDay,timelineWeek,timelineMonth,listWeek'
            //                 },
            //                 minTime:  settings.minTime,
            //                 maxTime: settings.maxTime,
            //                 slotDuration: settings.slotDuration,
            //                 resourceLabelText: 'Departments',
            //                 resourceGroupField: 'department',
            //                 resources: resources,
            //                 handleWindowResize: true,
            //                 displayEventTime:true,
            //                 displayEventEnd: true,
            //                 contentHeight: 500,
            //                 noEventsMessage: "No shifts to display",
            //                 resourceAreaWidth: "175px",
            //                 events: `/schedules/build/load/${employeeStore}`,
            //                 viewRender: function (view, element){
            //                     let intervalStart = moment(view.intervalStart._d).utc().format('YYYY-MM-DD');
            //                     let intervalEnd = moment(view.intervalEnd._d).format('YYYY-MM-DD');
            //                     UICtrl.employeeHoursCard(intervalStart, intervalEnd);
            //                 },
            //                 eventLimit: true,
            //                 eventOverlap: false,
            //                 editable: true,
            //                 selectable:true,
            //                 selectHelper: true,
            //                 selectOverlap: false,
            //                 eventRender: function(event, element) { 
            //                     let intervalStart = moment(event.source.calendar.view.intervalStart._d).utc().format('YYYY-MM-DD');
            //                    let intervalEnd = moment(event.source.calendar.view.intervalEnd._d).format('YYYY-MM-DD');

            //                     element.find(".fc-bg").css("pointer-events","none");
            //                     element.append("<i class='fas fa-times closeone right mr-2'></i>");
            //                     element.find(".closeone").click(function(){
            //                         fetch(`/schedules/build/shift/delete?eventID=${event._id}`, {
            //                                 method: 'delete',
            //                                 credentials: 'same-origin'
            //                             }).then(function(response) {
            //                                  return response.json();
            //                             }).then((data)=>{
            //                                 $('#managersCalendar').fullCalendar('removeEvents',event._id);
            //                                  $('#managersCalendar').fullCalendar('refetchEvents');
            //                                  UICtrl.employeeHoursCard(intervalStart, intervalEnd);
            //                             }).catch(function (error) {  
            //                                 console.log('Request failure: ', error);  
            //                             });
                                     
            //                     });
            //                 },
            //                 select: function(startDate, endDate, jsEvent, view, resource) {
            //                     let intervalStart = moment(view.intervalStart._d).utc().format('YYYY-MM-DD');
            //                     let intervalEnd = moment(view.intervalEnd._d).format('YYYY-MM-DD');
                                
            //                         let event = {
            //                                 user: resource.id,
            //                                 resourceId: resource.id,
            //                                 title: resource.title,
            //                                 department: resource.department,
            //                                 employeeStore: employeeStore,
            //                                 start:moment(startDate, 'YYYY-MM-DD H:mm:ss').format(),
            //                                 end: moment(endDate, 'YYYY-MM-DD H:mm:ss').format(),
            //                                 url: ``,
            //                                 className: 'draftShift',
            //                                 overlap: false,
            //                                 color: '#0288D1',
            //                                 shiftStatus: false
            //                             };
                                        
            //                             $('#managersCalendar').fullCalendar('renderEvent', event);
                                        
    
            //                             fetch('/schedules/build/shift/add', {
            //                                 method: 'POST',
            //                                 credentials: 'same-origin',
            //                                 headers: {
            //                                     'Accept': 'application/json',
            //                                     'Content-Type': 'application/json'
            //                                 },
            //                                 body: JSON.stringify(event)
            //                             }).then(function(response) {
            //                                  return response.json();
            //                             }).then((data)=>{
            //                                 $('#managersCalendar').fullCalendar('refetchEvents');
            //                                 UICtrl.employeeHoursCard(intervalStart, intervalEnd);
            //                             }).catch(function (error) {  
            //                                 console.log('Request failure: ', error);  
            //                             });
                                        
                                
            //                   },
                            
            //                 eventResize: function(event, delta, revertFunc) {
            //                    let intervalStart = moment(event.source.calendar.view.intervalStart._d).utc().format('YYYY-MM-DD');
            //                    let intervalEnd = moment(event.source.calendar.view.intervalEnd._d).format('YYYY-MM-DD');
    
            //                     let formattedEvent = {
            //                         shiftId: event._id,
            //                         user: event.resourceId,
            //                         resourceId: event.resourceId,
            //                         title: event.title,
            //                         department: event.department,
            //                         employeeStore: employeeStore,
            //                         start:moment(event.start, 'YYYY-MM-DD H:mm:ss').format(),
            //                         end: moment(event.end, 'YYYY-MM-DD H:mm:ss').format(),
            //                         url: event.url,
            //                         className: event.className[0],
            //                         overlap: false,
            //                         color: event.color,
            //                         shiftStatus: event.shiftStatus
            //                     };
                                
            //                     fetch('/schedules/build/shift/update', {
            //                             credentials: 'same-origin',
            //                             method: 'PUT',
            //                             headers: {
            //                                 'Accept': 'application/json',
            //                                 'Content-Type': 'application/json'
            //                             },
            //                             body: JSON.stringify(formattedEvent)
            //                         }).then(function(response) {
            //                              return response.json();
            //                         }).then((data)=>{
            //                             $('#managersCalendar').fullCalendar('refetchEvents');
            //                             UICtrl.employeeHoursCard(intervalStart, intervalEnd);
            //                         }).catch(function (error) {  
            //                             console.log('Request failure: ', error);  
            //                         });
            //                 },
            //                 eventDrop: function(event, delta, revertFunc) {
            //                     let intervalStart = moment(event.source.calendar.view.intervalStart._d).utc().format('YYYY-MM-DD');
            //                    let intervalEnd = moment(event.source.calendar.view.intervalEnd._d).format('YYYY-MM-DD');
                               
            //                     let formattedEvent = {
            //                         shiftId: event._id,
            //                         user: event.resourceId,
            //                         resourceId: event.resourceId,
            //                         title: event.title,
            //                         department: event.department,
            //                         employeeStore: employeeStore,
            //                         start:moment(event.start, 'YYYY-MM-DD H:mm:ss').format(),
            //                         end: moment(event.end, 'YYYY-MM-DD H:mm:ss').format(),
            //                         url: event.url,
            //                         className: event.className[0],
            //                         overlap: false,
            //                         color: event.color,
            //                         shiftStatus: event.shiftStatus
            //                     };
                                
            //                     fetch('/schedules/build/shift/update', {
            //                             method: 'PUT',
            //                             credentials: 'same-origin',
            //                             headers: {
            //                                 'Accept': 'application/json',
            //                                 'Content-Type': 'application/json'
            //                             },
            //                             body: JSON.stringify(formattedEvent)
            //                         }).then(function(response) {
            //                              return response.json();
            //                         }).then((data)=>{
            //                             $('#managersCalendar').fullCalendar('refetchEvents');
            //                             UICtrl.employeeHoursCard(intervalStart, intervalEnd);
            //                         }).catch(function (error) {  
            //                             console.log('Request failure: ', error);  
            //                         });
            //                 },
            //                 customButtons: {
            //                   addEmployeeButton: {
            //                     text: 'New Employee',
            //                     click: function() {
            //                         location.href = `/employees/add`;  
            //                     }
            //                   },
            //                   scheduleSettings: {
            //                     text: 'Settings',
            //                     click: function() {
            //                         let settingsModal = document.querySelector('#scheduleSettings');
                                  
            //                         let instance = M.Modal.getInstance(settingsModal);  
            //                         instance.open();
            //                         let form = document.querySelector('#settingsForm').action = `/schedules/settings?storeID=${employeeStore}`;
            //                     }
            //                   }
            //                 }
            //             });
    
            // },
            getItemInputs: ()=>{
                let regex = /(<([^>]+)>)/ig;
                let itemType = document.querySelector(UISelectors.itemType).value;
                let description = document.querySelector(UISelectors.description).value;
    
                return {
                    itemType: itemType.replace(regex, ""),
                    description: description.replace(regex, ""),
                    quantity: parseInt(document.querySelector(UISelectors.quantity).value),
                    unitPrice: parseFloat(document.querySelector(UISelectors.unitPrice).value),
                    amount: parseFloat(document.querySelector(UISelectors.itemAmount).value)
                    
                }
                
            },
            getInvoiceInfo: ()=> {
                return {
                    salesPerson: document.querySelector(UISelectors.salesPerson).value,
                    invoiceID: parseFloat(document.querySelector(UISelectors.invoiceId).value),
                    issueDate: Date.parse(document.querySelector(UISelectors.issueDate).value),
                    dueDate: Date.parse(document.querySelector(UISelectors.dueDate).value),
                    subject: document.querySelector(UISelectors.invoiceSubject).value,
                    comments: document.querySelector(UISelectors.comments).value,
                    subtotal: parseFloat(document.querySelector(UISelectors.subtotal).value),
                    taxRate: parseFloat(document.querySelector(UISelectors.taxRate).value),
                    taxAmount: parseFloat(document.querySelector(UISelectors.taxAmount).value),
                    payments: parseFloat(document.querySelector(UISelectors.payments).value),
                    amountDue: parseFloat(document.querySelector(UISelectors.amountDue).value),
                    user: document.querySelector(UISelectors.hiddenID).value
                }
            },
            getVendorSelect: ()=>{
                let vendSelect = document.querySelector(UISelectors.vendorSelect),
                    vendSelectVal = vendSelect.options[vendSelect.selectedIndex].value;
                return vendSelectVal;
            },
            editItemState: ()=>{
                document.querySelector(UISelectors.updateItem).style.display = 'block';
                document.querySelector(UISelectors.backBtn).style.display = 'block';
                document.querySelector(UISelectors.addNewItem).style.display = 'none';
            },
            displayItemState: ()=>{
                document.querySelector(UISelectors.updateItem).style.display = 'none';
                document.querySelector(UISelectors.backBtn).style.display = 'none';
                document.querySelector(UISelectors.addNewItem).style.display = 'block';
            },
            clearItemInputs: ()=> {
                document.querySelector(UISelectors.itemType).value = '';
                document.querySelector(UISelectors.description).value = '',
                document.querySelector(UISelectors.quantity).value = '',
                document.querySelector(UISelectors.unitPrice).value = '',
                document.querySelector(UISelectors.itemAmount).value = ''
            },
            clearAlerts: ()=> {
                let alerts = Array.from(document.querySelectorAll(UISelectors.alert)),
                    alertContainer = document.querySelector(UISelectors.alertContainer);
    
                if(alerts.length > 0){
                    setTimeout(()=>{
                        alerts.forEach(alert => {
                            alertContainer.remove(alert);
                        })
                    }, 10000);
                }
            },
            getSelectors: () => {
                return UISelectors;
            }
        }
    
    })();