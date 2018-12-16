var table;

function log(message) {
   console.log(message);
}

browser.windows.getCurrent({populate: true}).then((windowInfo) => {
   var links = [{title:'Link 1'},{title:'Link 2'},{title:'Link 3'},{title:'Link 4'},{title:'Link 5'},{title:'Link 6'}];

   log("Create new DataTable");

   table = $('#linklisttable').DataTable({
      "paging": false,
      "info": false,
      "searching": false,
      "data": links,
      "autoWidth": false,
      "columns": [
         {
            "data": "title",
            "width": "100%",
            "className": "dt-left"
         }
      ],
      "order": [[0, "desc"]],
      "orderMulti": false,
      "language": {
         "emptyTable": "No links"
      }
   });

   $('#linklisttable tbody').on('click', 'tr', function () {
       var data = table.row( this ).data();
       log('clicked: ' + data.title)
   } );
});