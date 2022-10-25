const patients = require('../model/patient');

const addPatient =  async (req,res) => {
    let nic=req.body.nic;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let address = req.body.address;
    let age = req.body.age;
    let tel = req.body.tel;
    let ward = req.body.ward;
    let admittedDate=req.body.admittedDate;

    let newPatient = {nic:nic,firstname: firstname, lastname: lastname, address: address, age: age, tel: tel, ward: ward, admittedDate:admittedDate};

   patients.create(newPatient, (err, patientDetails) => {
        if (err) {
            return res.status(400).send({message:err.details[0].message});
        } else {
            return res.status(200).send({message:'User Created Successfully'});
        }
    })
}

const listPatients = async (req,res) => {
    
        patients.find({}, (err, patientDetails) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({
                    success:true,
                    profiles:patientDetails,
                });
    
            }
        })
    
}

const listwardPatients = async (req,res) => {
    patients.find({ward:req.params.id}, (err, patientDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                profiles:patientDetails,
            });
        }
    })
}

const wards = async (req,res) => {
    patients.distinct('ward', (err, wardDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                wards:wardDetails,
            });

        }
    })

}

const viewPatient = async (req,res) => {
    patients.findOne({_id:req.params.id}, (err, patientDetails) => {
        if (err) {
            console.log(err);
        } else {
           res.status(200).json({
               success:true,
               profile:patientDetails,
           });
    
        }
    })
}

const editPatient = async (req,res) => {
    patients.updateOne({_id:req.params.id}, {$set:req.body},(err, buyerDetails) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json({
                success:true,
                message:'Patient Details Updated Successfully',
            });
        }
    })
}

const deletePatient = async (req,res) => {
    patients.deleteOne({_id:req.params.id}, (err, patientDetails) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json({
                success:true,
                message:'Patient Deleted Successfully',
            });
        }
    })
}

module.exports = {addPatient, listPatients, viewPatient, editPatient, deletePatient, listwardPatients, wards};