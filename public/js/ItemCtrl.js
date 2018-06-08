//===============ITEM CONTROLLER==================
export const ItemCtrl = (function(){

    const InvoiceItem = function(id, itemType, itemDescription, itemQuantity, itemUnitPrice, itemAmount){
        this.id = id;
        this.itemType = itemType;
        this.itemDescription = itemDescription;
        this.itemQuantity = itemQuantity;
        this.itemUnitPrice = itemUnitPrice;
        this.itemAmount = itemAmount;
    }
    
 
    let invoiceData = {
        salesPerson: null,
        invoiceId: null,
        issueDate: null,
        dueDate: null,
        subject: null,
        invoiceItems: [],
        vendorTo: null,
        comments: null,
        subtotal: null,
        taxRate: null,
        taxAmount: null,
        payments: null,
        amountDue: null,
        status: 'Due',
        user: null
    }
    
    //Public Methods
    return {
        setInvoiceData: (retrievedData)=>{

            invoiceData = retrievedData;
            return invoiceData;
        },
        addItems: (itemInputs)=> {
            let newItem,
                ID,
                quantity,
                unitprice,
                itemAmount;

            
            //Add auto-increment id
            if(invoiceData.invoiceItems.length > 0){
                ID = invoiceData.invoiceItems[invoiceData.invoiceItems.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            quantity = parseInt(itemInputs.quantity);
            unitprice = parseFloat(itemInputs.unitPrice);
            itemAmount = parseFloat(itemInputs.amount);
            
            newItem = new InvoiceItem(ID, itemInputs.itemType, itemInputs.description, quantity, unitprice, itemAmount);
            
            invoiceData.invoiceItems.push(newItem);
            
            return newItem;
            
        },
        addInvoice: (vendorID, invoiceInfo)=> {
            let today = new Date().getTime();
            
            invoiceData.salesPerson = invoiceInfo.salesPerson;
            invoiceData.invoiceId = invoiceInfo.invoiceID;
            invoiceData.issueDate = invoiceInfo.issueDate;
            invoiceData.dueDate = invoiceInfo.dueDate;
            invoiceData.subject = invoiceInfo.subject;
            invoiceData.vendorTo = vendorID;
            invoiceData.comments = invoiceInfo.comments;
            invoiceData.subtotal = invoiceInfo.subtotal;
            invoiceData.taxRate = invoiceInfo.taxRate;
            invoiceData.taxAmount = invoiceInfo.taxAmount;
            invoiceData.payments = invoiceInfo.payments;
            invoiceData.amountDue = invoiceInfo.amountDue;
            invoiceData.user = invoiceInfo.user;
            if(invoiceInfo.amountDue === 0){
                invoiceData.status = 'Paid';
            }else if(invoiceInfo.amountDue > 0 && today > invoiceInfo.dueDate){
                invoiceData.status = 'Past Due';
            }else {
                invoiceData.status = 'Due';
            }
            
            return invoiceData;

        },
        calcSubtotal: ()=>{
            let invItems = invoiceData.invoiceItems,
                subtotal = 0;

            if(invItems.length > 0){
                invItems.forEach(item => {
                    subtotal += item.itemAmount;
                });
            }

            return subtotal;
        },
        updateInvoiceItem:(itemID, newInput)=>{

            let itemQuantity = parseInt(newInput.quantity),
                unitPrice = parseFloat(newInput.unitPrice),
                itemAmount = parseFloat(newInput.amount);

            invoiceData.invoiceItems.forEach(item=>{
                if(item.id === itemID){
                    item.itemAmount = itemAmount;
                    item.itemDescription = newInput.description;
                    item.itemQuantity = itemQuantity;
                    item.itemType = newInput.itemType;
                    item.itemUnitPrice = unitPrice;
                }    
            }); 


        },
        deleteInvoiceItem: (itemId)=> {

               invoiceData.invoiceItems.splice(itemId, 1);
               
        },
        retrieveInvoiceItems: ()=>{
            return invoiceData.invoiceItems;
        }      
    }

})();