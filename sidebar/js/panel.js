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
      "columnDefs": [ {
         "targets": 0,
         "render": $.fn.dataTable.render.ellipsis(20)
      }],
      "order": [[0, "desc"]],
      "orderMulti": false,
      "language": {
         "emptyTable": "No links"
      }
   });

   //var col0 = table.column(0);
   //var w = col0.nodes()[0];
   //.flatten()  // Reduce to a 1D array
   //.to$();      // Convert to a jQuery object
   //log('col: ' + w.clientWidth);

   //table.on( 'draw', function () {
   //      console.log( 'DRAW');
   //});

   /*
   table.on( 'column-sizing', function ( e, settings ) {
      //var api = new $.fn.dataTable.Api( settings );
      var col = table.column(0);
      var w = col.nodes()[0];
      console.log( 'Column width recalculated in table: ' + w.clientWidth);
   });
   */

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