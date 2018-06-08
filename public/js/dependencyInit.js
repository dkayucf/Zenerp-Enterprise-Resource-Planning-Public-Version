//  M.AutoInit();
        var elem = document.querySelector('.sidenav');
        var collapseElem = document.querySelector('.collapsible');
        var elemSelect = Array.from(document.querySelectorAll('select'));
        var dropElem = Array.from(document.querySelectorAll('.dropdown-trigger'));
        var fixedElemBtn = document.querySelector('.fixed-action-btn');
        var datePicker = Array.from(document.querySelectorAll('.datepicker'));
        var paralaxElems = document.querySelectorAll('.parallax');
        var modalElems = document.querySelectorAll('.modal');
        var tabs = document.querySelectorAll('.tabs');
        var sideNavInit = document.querySelectorAll('.sidenav');
        var timePicker = document.querySelectorAll('.timepicker');

        M.Collapsible.init(collapseElem);
        M.Tabs.init(tabs);
        M.FloatingActionButton.init(fixedElemBtn);
        M.Parallax.init(paralaxElems);
        M.Modal.init(modalElems);
        M.Sidenav.init(sideNavInit);

        timePicker.forEach(x=>{
            M.Timepicker.init(x);
        });

        dropElem.forEach(x=>{
             M.Dropdown.init(x);
        });

        elemSelect.forEach(x => {
            M.FormSelect.init(x);
        });

        datePicker.forEach(x => {
            M.Datepicker.init(x);
        });



        //Init itlTelInput
        $("#phone").intlTelInput({
            hiddenInput: "full_phone",
            utilsScript:'/js/vendors/utils.js'
        });


    $(document).ready(function(){
        $('.states').autocomplete({
            data: {
                "Alabama" : null,
                "Alaska" : null,
                "American Samoa" : null,
                "Arizona" : null,
                "Arkansas" : null,
                "California" : null,
                "Colorado" : null,
                "Connecticut" : null,
                "Delaware" : null,
                "District Of Columbia" : null,
                "Federated States Of Micronesia" : null,
                "Florida" : null,
                "Georgia" : null,
                "Guam" : null,
                "Hawaii" : null,
                "Idaho" : null,
                "Illinois" : null,
                "Indiana" : null,
                "Iowa" : null,
                "Kansas" : null,
                "Kentucky" : null,
                "Louisiana" : null,
                "Maine" : null,
                "Marshall Islands" : null,
                "Maryland" : null,
                "Massachusetts" : null,
                "Michigan" : null,
                "Minnesota" : null,
                "Mississippi" : null,
                "Missouri" : null,
                "Montana" : null,
                "Nebraska" : null,
                "Nevada" : null,
                "New Hampshire" : null,
                "New Jersey" : null,
                "New Mexico" : null,
                "New York" : null,
                "North Carolina" : null,
                "North Dakota" : null,
                "Northern Mariana Islands" : null,
                "Ohio" : null,
                "Oklahoma" : null,
                "Oregon" : null,
                "Palau" : null,
                "Pennsylvania" : null,
                "Puerto Rico" : null,
                "Rhode Island" : null,
                "South Carolina" : null,
                "South Dakota" : null,
                "Tennessee" : null,
                "Texas" : null,
                "Utah" : null,
                "Vermont" : null,
                "Virgin Islands" : null,
                "Virginia" : null,
                "Washington" : null,
                "West Virginia" : null,
                "Wisconsin" : null,
                "Wyoming" : null
            } 
        });
        });
        
        //Invoice DataTable
    $(document).ready(function() {
        $('#invoicesTable').DataTable({
            dom: 'Bfrtip',
            destroy: true,
            orderCellsTop: true,
            autoWidth: true,
            fixedHeader: true,
            rowReorder: true,
            responsive: true,
            colReorder: true,
            buttons: [
                { 
                    extend: 'copy',
                     className: 'btn  light-blue darken-2' 
                },
                { 
                    extend: 'excel',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-excel m-1"></i>Excel',
                    titleAttr: 'Excel'
                },
                { 
                    extend: 'csv',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-alt mr-1"></i>csv',
                    titleAttr: 'CSV' 
                },
                { 
                    extend: 'pdf',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-pdf mr-1"></i>pdf',
                    titleAttr: 'PDF',
                    download: 'open' 
                },
                { 
                    extend: 'print',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="fas fa-print mr-1"></i>Print',
                    titleAttr: 'Print'
                }
            ]
        });
    } );

    //Schedule Request Table
    $(document).ready(function() {
        $('#scheduleRequestsTable').DataTable({
            dom: 'Bfrtip',
            destroy: true,
            orderCellsTop: true,
            autoWidth: true,
            fixedHeader: true,
            rowReorder: true,
            colReorder: true,
            buttons: [
                { 
                    extend: 'copy',
                     className: 'btn  light-blue darken-2' 
                },
                { 
                    extend: 'excel',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-excel m-1"></i>Excel',
                    titleAttr: 'Excel'
                },
                { 
                    extend: 'csv',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-alt mr-1"></i>csv',
                    titleAttr: 'CSV' 
                },
                { 
                    extend: 'pdf',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-pdf mr-1"></i>pdf',
                    titleAttr: 'PDF',
                    download: 'open' 
                },
                { 
                    extend: 'print',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="fas fa-print mr-1"></i>Print',
                    titleAttr: 'Print'
                }
            ]
        });
    } );

    //Vendor DataTable
    $(document).ready(function() {
        $('#vendorsTable').DataTable({
            dom: 'Bfrtip',
            destroy: true,
            orderCellsTop: true,
            autoWidth: true,
            fixedHeader: true,
            rowReorder: true,
            colReorder: true,
            buttons: [
                { 
                    extend: 'copy',
                     className: 'btn  light-blue darken-2' 
                },
                { 
                    extend: 'excel',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-excel m-1"></i>Excel',
                    titleAttr: 'Excel'
                },
                { 
                    extend: 'csv',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-alt mr-1"></i>csv',
                    titleAttr: 'CSV' 
                },
                { 
                    extend: 'pdf',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-pdf mr-1"></i>pdf',
                    titleAttr: 'PDF',
                    download: 'open' 
                },
                { 
                    extend: 'print',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="fas fa-print mr-1"></i>Print',
                    titleAttr: 'Print'
                }
            ]
        });

    } );

    //Employee Data Table
    $(document).ready(function() {

        $('#employeesTable tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
        } );

       var table =  $('#employeesTable').DataTable({
            dom: 'Bfrtip',
            destroy: true,
            orderCellsTop: true,
            autoWidth: true,
            fixedHeader: true,
            rowReorder: true,
            responsive: true,
            colReorder: true,
            buttons: [
                { 
                    extend: 'copy',
                     className: 'btn  light-blue darken-2' 
                },
                { 
                    extend: 'excel',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-excel m-1"></i>Excel',
                    titleAttr: 'Excel'
                },
                { 
                    extend: 'csv',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-alt mr-1"></i>csv',
                    titleAttr: 'CSV' 
                },
                { 
                    extend: 'pdf',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="far fa-file-pdf mr-1"></i>pdf',
                    titleAttr: 'PDF',
                    download: 'open' 
                },
                { 
                    extend: 'print',
                    className: 'btn  light-blue darken-2',
                    text:      '<i class="fas fa-print mr-1"></i>Print',
                    titleAttr: 'Print'
                }
            ]
        });

        // Apply the search
        table.columns().every( function () {
            var that = this;
     
            $( 'input', this.footer() ).on( 'keyup change', function () {
                if ( that.search() !== this.value ) {
                    that
                        .search( this.value )
                        .draw();
                }
            } );
        } );
    } );

  

        
   
        



