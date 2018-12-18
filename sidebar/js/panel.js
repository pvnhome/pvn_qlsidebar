var table;

function log(message) {
   console.log(message);
}

browser.windows.getCurrent({populate: true}).then((windowInfo) => {
   log("Create new DataTable");

   table = $('#linklisttable').DataTable({
      "paging": false,
      "info": false,
      "searching": false,
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

   log("Load links");

   loadRecords(save_to_read)
   .then(links => {
      if (links) {
         log(links.length + " links loaded");
         table.rows.add(links).draw();
      } else {
         log("No links loaded");
      }
   });



});