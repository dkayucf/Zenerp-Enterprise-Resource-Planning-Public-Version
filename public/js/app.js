import { ItemCtrl } from './ItemCtrl.js';
import { UICtrl } from './UICtrl.js';
import { Schedule } from './Schedule.js';


//==============APP CONTROLLER=================
const AppCtrl = (function(ItemCtrl, UICtrl){
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    let quantity = document.querySelector(UISelectors.quantity),
        unitPrice = document.querySelector(UISelectors.unitPrice),
        taxRate = document.querySelector(UISelectors.taxRate),
        payments = document.querySelector(UISelectors.payments),
        addNewItemVar = document.querySelector(UISelectors.addNewItem),
        invTabBody = document.querySelector(UISelectors.invTabBody),
        backBtn = document.querySelector(UISelectors.backBtn),
        updateItemVar = document.querySelector(UISelectors.updateItem),
        saveInvoiceVar = document.querySelector(UISelectors.saveInvoice),
        vendorSelect = document.querySelector(UISelectors.vendorSelect),
        editInvoice = document.querySelector(UISelectors.editInvoice),
        deleteInvoice= document.querySelector(UISelectors.deleteInvoice),
        employeeStore = document.querySelector(UISelectors.employeeStore),
        storeNameSelect = document.querySelector('#storeNameSelect'),
        draftCheck = document.querySelector(UISelectors.draftCheck),
        publishedCheck = document.querySelector(UISelectors.publishedCheck),
        draftStatusBtn = document.querySelector(UISelectors.draftStatusBtn),
        publishStatusBtn = document.querySelector(UISelectors.publishStatusBtn),
        updateStatusBtn = document.querySelector(UISelectors.updateStatusBtn),
        comments = document.querySelector('#comments'),
        closeBtn = document.querySelector('.closeBtn'),
        generalBackBtn = document.querySelector(UISelectors.generalBackBtn),
        weeklyScheduleRequest = document.querySelector(UISelectors.weeklyScheduleRequest),
        dailyScheduleRequest = document.querySelector(UISelectors.dailyScheduleRequest),
        tradeeName = document.querySelector(UISelectors.tradeeName),
        traderName = document.querySelector(UISelectors.traderName),
        tradeeShift = document.querySelector(UISelectors.tradeeShift);
        

    const loadEventListeners = ()=>{
        
        /*----------------INPUT Events-----------------*/
        
        //Calculate Item Amount
        if(quantity){
            quantity.addEventListener('input', calcItemAmount);    
        }
        
        if(unitPrice){
            unitPrice.addEventListener('input', calcItemAmount);    
        }
        
        
        //Calculate Amounts
        if(taxRate){
            taxRate.addEventListener('input', calcAmounts);    
        }
        
        
        //Calculate Payments
        if(payments){
            payments.addEventListener('input', calcAmounts);    
        }
        
        
        /*----------------CLICK Events-----------------*/
        if(publishedCheck){
            publishedCheck.addEventListener('click', ()=> {
                draftStatusBtn.disabled = true;
                publishStatusBtn.disabled = false;
                updateStatusBtn.disabled = false;
            })
        }

        if(draftCheck){
            draftCheck.addEventListener('click', ()=> {
                publishStatusBtn.disabled = true;
                draftStatusBtn.disabled = false;
                updateStatusBtn.disabled = true;
                comments.disabled = false;
            });
        }

        if(updateStatusBtn){
            updateStatusBtn.addEventListener('click', (e)=> {
                e.preventDefault();
                publishCurrentSchedule();
            });
        }

        if(dailyScheduleRequest)
            dailyScheduleRequest.addEventListener('click', () => {
                document.querySelector('.dateRepeat').style.display = "none";
            });

        if(weeklyScheduleRequest)
            weeklyScheduleRequest.addEventListener('click', ()=> {
                document.querySelector('.dateRepeat').style.display = "flex";
            });

        if(generalBackBtn)
            generalBackBtn.addEventListener('click', ()=>{
                window.history.back();
            });
        
        if(addNewItemVar){
            addNewItemVar.addEventListener('click', addNewItem);
        }
        
        
        if(invTabBody){
            invTabBody.addEventListener('click', editInvoiceItem);
        }
        
        if(closeBtn){
            let sidenav = document.querySelector('.sidenav');
            let options = {
                draggable: true,
                onCloseEnd: function(){
                    sidenav.style.overflow = "hidden";
                },
                onOpenStart: function(){
                    sidenav.style.overflow = "visible";
                }
            };

            let instance = M.Sidenav.init(sidenav, options).open();
        }

        if(backBtn){
            backBtn.addEventListener('click', ()=>{
            UICtrl.displayItemState();
            UICtrl.clearItemInputs(); 
            });    
        } 
        
        //Update Item click
        if(updateItemVar){
            updateItemVar.addEventListener('click', updateInvoiceItem);
        }
        
        //Save Invoice
        if(saveInvoiceVar){
            saveInvoiceVar.addEventListener('click', saveInvoice);    
        }
        
        /*----------------CHANGE Events-----------------*/
        if(vendorSelect){
            vendorSelect.addEventListener('change', (e) => {
                let selectedVendor = e.target;
                let selectVendVal = selectedVendor.options[selectedVendor.selectedIndex].value;
                
                if(selectVendVal !== '0'){
                    fetch(`/vendors/data/${selectVendVal}`, {
                        method: 'GET',
                        credentials: 'same-origin'
                    })
                      .then(function(response) {
                        return response.json();
                      })
                      .then(function(data) {
                
                        UICtrl.displaySelectedVendor(data);
                      });
                }
                

            });    
        }
        
        if(employeeStore){
            employeeStore.addEventListener('change', (e)=>{
                let employeeStoreID = e.target.options[e.target.selectedIndex].value;
                fetch(`/employees/data/${employeeStoreID}`, {
                    method: 'GET',
                    credentials: 'same-origin'
                })
                .then((response)=>{
                    return response.json();
                }).then((data)=>{
                    let departmentsArray = data.departments.departments;
                    let departmentsSelect = document.querySelector(UISelectors.employeeDepartment);
                    
                    departmentsArray.forEach(department => {
                        let option = document.createElement("option");
                            option.text = department.departmentName;
                            option.value = department._id;
                            departmentsSelect.appendChild(option);
                    });

                });
            });
        }


        if(storeNameSelect){
            storeNameSelect.addEventListener('change', (e) => {
                let storeID = e.target.options[e.target.selectedIndex].value;
                
                getCalendarData(storeID);
            });
        }

        if(tradeeName){
            tradeeName.addEventListener('change', e => {
                let tradeeID = e.target.options[e.target.selectedIndex].value;
                getTradeeShifts(tradeeID);
            });
        }
            
        


    }//End of load event listeners
 
    //Add new invoice Item
     const addNewItem = ()=> {
        
        //get input values from UI
        const itemInputs = UICtrl.getItemInputs();
        
        if(itemInputs.itemType !== '' && itemInputs.description !== '' && itemInputs.quantity !== '' && itemInputs.unitPrice !== ''){
            
            //Add Item to data structure
            const addItem = ItemCtrl.addItems(itemInputs);

            //Disply new item in ui
            UICtrl.displayNewItem(addItem);
            
            //Clear item inputs
            UICtrl.clearItemInputs();
            
            //Calculate subtotal
            const subTotal = ItemCtrl.calcSubtotal();
            
            //update UI subtotal
            document.querySelector(UISelectors.subtotal).value = subTotal.toFixed(2);
            
            calcAmounts();
            M.updateTextFields();
            
        }
        
    }
     //Update Invoice Items
     const updateInvoiceItem = ()=>{
        const itemId = parseInt(document.querySelector(UISelectors.invItemId).value),
              updatedInputs = UICtrl.getItemInputs();
        
        if(ItemCtrl.retrieveInvoiceItems().length > 0){

            ItemCtrl.updateInvoiceItem(itemId, updatedInputs);
            
        }
 
       //Calculate subtotal
        const subTotal = ItemCtrl.calcSubtotal();

        //update UI subtotal
        document.querySelector(UISelectors.subtotal).value = subTotal.toFixed(2);
        
        
        UICtrl.displayUpdatedItem(itemId, updatedInputs);
        
        //clear item inputs
        UICtrl.clearItemInputs();
        
        UICtrl.displayItemState();

        calcAmounts();

    }
     //Edit Invoice ITems
      const editInvoiceItem = (e)=>{
        let parentId,
            itemId,
            retrievedStorage;

          
          if(e.target.classList.contains('deleteInvoiceItem') || e.target.classList.contains('fa-trash-alt')){
              if(e.target.classList.contains('deleteInvoiceItem')){
                  parentId = e.target.parentElement.parentElement;
              } else {
                  parentId = e.target.parentElement.parentElement.parentElement;
              }
              
              itemId = parseInt(parentId.id.split('-')[1]);
              
              parentId.parentNode.removeChild(parentId);
              
              ItemCtrl.deleteInvoiceItem(itemId);
              
              
          }else {
                //get item id
            if(e.target.parentElement.classList.contains('fa-edit')){
                parentId = e.target.parentElement.parentElement.parentElement.parentElement.id;
            }else if(e.target.parentElement.classList.contains('editInvoiceItem')){
                parentId = e.target.parentElement.parentElement.parentElement.id;
            }else if(e.target.parentElement.classList.contains('modifytd')){
                parentId = e.target.parentElement.parentElement.id;
            }
        
            itemId = parseInt(parentId.split('-')[1]);

            //Retrieve Item data from either local storage or datastructure
            if(ItemCtrl.retrieveInvoiceItems().length > 0){

                retrievedStorage = ItemCtrl.retrieveInvoiceItems()[itemId];  

                UICtrl.displayFoundItems(retrievedStorage);

                UICtrl.editItemState();

            }   
          }
          
            
        
    }
    
    //Calculate Invoice Amounts (SUBTOTAL, TAX, AMOUNT DUE ETC...)
     const calcAmounts = ()=>{
            let subTotal = parseFloat(document.querySelector(UISelectors.subtotal).value),
                taxRate = parseFloat(document.querySelector(UISelectors.taxRate).value),
                taxAmount = document.querySelector(UISelectors.taxAmount),
                payments = document.querySelector(UISelectors.payments).value,
                amountDue = document.querySelector(UISelectors.amountDue),
                totalDue;
            if(subTotal === '' || taxRate === ''){
                taxAmount.value = 0;
            } else if(taxRate < 1){    
                if(payments){
                    totalDue = (subTotal + (subTotal * taxRate) - payments).toFixed(2);
                    taxAmount.value = (subTotal * taxRate).toFixed(2);
                    amountDue.value = Math.abs(totalDue);
                }else {
                    totalDue = (subTotal + (subTotal * taxRate)).toFixed(2);
                    taxAmount.value = (subTotal * taxRate).toFixed(2);
                    amountDue.value = Math.abs(totalDue);
                }

            } else if(taxRate >= 1){
                if(payments){
                    taxRate = taxRate/100;
                    totalDue = (subTotal + (subTotal * taxRate) - payments).toFixed(2);
                    taxAmount.value = (subTotal * taxRate).toFixed(2);
                    amountDue.value = Math.abs(totalDue);
                }else{
                    taxRate = taxRate/100;
                    totalDue = (subTotal + (subTotal * taxRate)).toFixed(2);
                    taxAmount.value = (subTotal * taxRate).toFixed(2);
                    amountDue.value = Math.abs(totalDue);
                }
            }
            M.updateTextFields();
        }
    
    //Calc Invoice ITEM amount
    const calcItemAmount = ()=> {
        let quantity = document.querySelector(UISelectors.quantity).value,
              unitPrice = document.querySelector(UISelectors.unitPrice).value,
              itemAmount;
            
        if(quantity !== "" && unitPrice !== ""){
            itemAmount = parseFloat((quantity * unitPrice).toFixed(2));
            document.querySelector(UISelectors.itemAmount).value = itemAmount;
            M.updateTextFields();
        }else {
            document.querySelector(UISelectors.itemAmount).value = '';
        }
    }
    
    //Save Invoice
    const saveInvoice = ()=> {
        //get vendor inputs
        const vendorID = UICtrl.getVendorSelect();
        
        //get other invoice info
        const invoiceInfo = UICtrl.getInvoiceInfo();
        
        //add invoice to data structure
        const addInvoice = JSON.stringify(ItemCtrl.addInvoice(vendorID, invoiceInfo));  

        postInvoice(addInvoice);
          
          
    }
    
    //Save Invoice POST request
    const postInvoice = (invoice)=>{
        fetch('/invoices/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: invoice
          }).then(function(response) {
            return response.json();
          }).then((data)=>{
            if(data.status === "success"){
                location.reload();
            }
          }).catch(function (error) {  
              console.log('Request failure: ', error);  
            });
    }
    
    //GET Invoice Data Request
    const getInvoiceData = ()=>{
        let invoiceID = document.querySelector(UISelectors.invID);

        if(invoiceID){
            let id = invoiceID.value;
            fetch(`/invoices/data/${id}`, {
                    method: 'GET',
                    credentials: 'same-origin'
                }).then(function(response) {
                    return response.json();
                }).then((data)=>{
                    let setData = ItemCtrl.setInvoiceData(data.invoiceData);    
                
                }).catch(function (error) {  
                    console.log('Request failure: ', error);  
                });    
         }
    }

    //GET JSON employee data to update the employeedepartment selects and employee status
    const getEmployeeData = ()=> {
        let params = (new URL(location)).searchParams,
        employeeID = params.get('employeeID');

        if(employeeID){
            fetch(`/employees/edit/profile?id=${employeeID}`, {
                method: 'GET',
                credentials: 'same-origin'
            }).then(function(response) {
                return response.json();
            }).then((data)=>{
                UICtrl.displayEmployeeData(data);       
            }).catch(function (error) {  
                console.log('Request failure: ', error);  
            });
        }
    }

    
    

    //GET Calendar Data Request
    const getCalendarData = (storeID) => {
        
        let employeeStore;
        if(storeID){
            //StoreID is coming from the select box value on the "Owner Role" Schedule Builder route
            employeeStore = storeID;
        }else {
            //Get the employee store ID number out of the params
            let params = (new URL(location)).searchParams;
            employeeStore = params.get('storeID');
        }
       

        if(employeeStore){
            //Fetch all of the employess data that have to storeID of the passed in employee storeID
            fetch(`/schedules/build/store/${employeeStore}`, {
                method: 'GET',
                credentials: 'same-origin'
                }).then(function(response) {
                    return response.json();
                }).then((data)=>{
                    
                    let resources = data.resources;
                    let settings = data.settings;
                    if(settings === null){
                        settings = {
                            firstDay: 1,
                            minTime: '06:00:00',
                            maxTime: '24:00:00',
                            slotDuration: '00:60:00'
                        }
                    }
                    Schedule.displayCalendar(employeeStore, resources, settings);  
                
                }).catch(function (error) {  
                    console.log('Request failure: ', error);  
                });  
        }
    }
  


    //Publish current schedule PUT REQUEST
    const publishCurrentSchedule = ()=> {
        let managerComments = document.querySelector('#comments').value;

        //Get the current store ID number out of the params
        let params = (new URL(location)).searchParams;
        employeeStore = params.get('storeID');
        
        let data = {
            employeeStore: employeeStore,
            managerComments: managerComments,
            shiftStatus: true,
            className: "publishShift"
        }

        fetch('/schedules/build/published', {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function(response) {
                 return response.json();
            }).then((data)=>{
                let loader = Array.from(document.querySelectorAll('.loader'));
                let cardAfter = Array.from(document.querySelectorAll('.card-after'));
                loader.forEach(x => {
                    x.style.display = 'block';
                });
                cardAfter.forEach(x => {
                    x.style.display = 'block';
                });
                setTimeout(()=>{
                    loader.forEach(x => {
                        x.style.display = 'none';
                    });
                    cardAfter.forEach(x => {
                        x.style.display = 'none';
                    });

                    let draftShits = Array.from(document.querySelectorAll('.draftShift'));

                    draftShits.forEach(shift => {
                        shift.classList.add('publishShift');
                        shift.classList.remove('draftShift');
                        document.querySelector(UISelectors.publishStatusBtn).disabled = true;
                        let managerComments = document.querySelector('#comments').disabled = true;
                        document.querySelector(UISelectors.updateStatusBtn).disabled = true;
                    });
                }, 3000);
                
            }).catch(function (error) {  
                console.log('Request failure: ', error);  
            });
    }

    const getTradeeShifts = tradeeID => {
        let weekStart = traderName.getAttribute('data-weekstart');
        let weekEnd = traderName.getAttribute('data-weekend');
       
        fetch(`/schedules/tradeShift/data?tradeeID=${tradeeID}&weekStart=${weekStart}&weekEnd=${weekEnd}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                tradeeShift.innerHTML = '';
                let defaultOption = document.createElement("option");
                defaultOption.text = 'Select Shift...';
                tradeeShift.appendChild(defaultOption);
                data.forEach(datum => {
                    let option = document.createElement("option");
                    option.text = datum.tradeeShift;
                    option.value = datum.tradeeShiftID;
                    tradeeShift.appendChild(option);
                });
            })
            .catch(err => console.log(err));
    }


    
    //Public Methods
    return {
        init: () => {
            loadEventListeners();
            getInvoiceData();
            getCalendarData();
            getEmployeeData();
            UICtrl.clearAlerts();
         
        }
    }

})(ItemCtrl, UICtrl);

AppCtrl.init();