const folder_id = "kz.pvn.qlssibebar.folder.id";
const save_to_read = "Save-To-Read";

function loadRecordsForId(id) {
   console.log('loadRecordsForId');

   return browser.bookmarks.getChildren(id)
   .then(nodes => {
      let ret = [];
      nodes.forEach(node => {
         if (('type' in node && node.type != "bookmark") || !node.url) {
             return;
         }
         let bookmark = node;
         ret.push({
            id: bookmark.id,
            url: bookmark.url,
            title: bookmark.title,
            dateAdded: bookmark.dateAdded
         });
      })
      return ret;
   });
}

function findNodeId() {
   console.log('findNodeId');

   return new Promise(function(resolve, reject) {
      browser.bookmarks.getTree()
      .then(tree => {
         let parent = tree[0].children[0];
         let node = findTreeNode(parent);
         if (node) {
            resolve(node.id);
         } else {
            createTreeNode(defaultTab, parent)
            .then(node => {
               storeNodeId(node.id)
               resolve(node.id);
            },
            err => {
               console.log('createTreeNode: ' + err)
               reject(err);
            });
         }
      });
  });
}

function findTreeNode(parent) {
   console.log('findTreeNode');
   for (let child of parent.children) {
      if ('type' in child && child.type == 'folder' && child.title == save_to_read) {
         storeNodeId(child.id)
         return child;
      }
   }
}

function createTreeNode(name, parent) {
   return browser.bookmarks.create({ title: name, parentId: parent.id})
   .then(folder => {
      console.log('folder created: ' + name + ', id=' + folder.id);
      return folder;
   });
}

function storeNodeId(id) {
   let obj = {};
   obj[folder_id] = id;
   browser.storage.local.set(obj)
   .then(() => console.log('folder id stored: ' + id))
   .catch(err => console.log('Error on store folder id: ' + err));
}

function loadRecords(defaultTab) {
   let keys = {};
   keys[folder_id] = undefined;

   return browser.storage.local.get(keys)
   .then(result => result[name])
   .catch(err => {
      console.log('folder id is not actual: error=' + err);
      return findNodeId();
   })
   .then(id => {
      console.log('check folder id=' + id);
      if (id) {
         console.log('folder id='  + id + '. It is ok');
         return id;
      }  else {
         console.log('need to find folder id');
         return findNodeId();
      }
    })
   .then(id => {
      console.log('final folder id=' + id);
      if (id) {
         return loadRecordsForId(id);
      }  else {
         return;
      }
   });
}
