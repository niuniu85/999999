

let tableColumn =[];
let tableToolBar =[];
let batchToolBar =[{
    "component": "button",
    "text": "Delete",
    "type": "danger",
    "action": "delete",
    "uri": "\/api\/admins\/delete",
    "method": "post"
},
{
    "component": "button",
    "text": "Disable",
    "type": "default",
    "action": "batchDisable"
}];

global.layout = {
    tableColumn,
    tableToolBar,
    batchToolBar,
};