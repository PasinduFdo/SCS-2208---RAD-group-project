const inventory = require('../model/inventory');

//================================ addInventory
const addInventory =  async (req,res) => {

        let name = req.body.name;
        let category = req.body.category;
        let qty = req.body.qty;
        let ward = req.body.ward;


        let newInventory = {name: name, category: category, qty: qty, ward: ward};

        inventory.create(newInventory, (err, inventoryDetails) => {
            if (err) {
                return res.status(400).send({message:err.details[0].message});
            } else {
                return res.status(200).send({message:'Inventory Created Successfully'});
            }
        })
}

//================================ listInventory
const listInventory = async (req,res) => {

    inventory.find({}, (err, inventoryDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                profiles:inventoryDetails,
            });

        }
    })

}

//================================ viewInventory
const viewInventory = async (req,res) => {
    inventory.findOne({_id:req.params.id}, (err, inventoryDetails) => {
        if (err) {
            console.log(err);
        } else {
           res.status(200).json({
               success:true,
               profile:inventoryDetails,
           });

        }
    })
}

//================================ editInventory
const editInventory = async (req,res) => {
    inventory.updateOne({_id:req.params.id}, {$set:req.body},(err, inventoryDetails) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json({
                success:true,
                message:"Inventory updated successfully"
            })
        }
    })
}

//================================ deleteInventory
const deleteInventory = async (req,res) => {
    inventory.deleteOne({_id:req.params.id}, (err, inventoryDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                message:"Inventory deleted successfully"
            })
        }
    })
}

module.exports = {addInventory, viewInventory, editInventory, deleteInventory, listInventory};
