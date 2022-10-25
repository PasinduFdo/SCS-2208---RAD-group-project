const nurses = require('../model/nurse');

const addNurse =  async (req,res) => {

        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let dob = req.body.dob;
        let address = req.body.address;
        let tel = req.body.tel;
        let email = req.body.email;
        let ward = req.body.ward;
        let position = req.body.position;
        let appointment = req.body.appointment;
        let image = req.body.image;

        let newNurse = {firstname: firstname, lastname: lastname, dob: dob, address: address, tel: tel, email: email, ward: ward, position: position, appointment: appointment, image: image};

         nurses.create(newNurse, (err, nurseDetails) => {
            if (err) {
                return res.status(400).send({message:err.details[0].message});
            } else {
                return res.status(200).send({message:'User Created Successfully'});
            }
        })
}

const listNurses = async (req,res) => {

    nurses.find({}, (err, nurseDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                profiles:nurseDetails,
            });

        }
    })

}

const listwardNurse = async (req,res) => {
    nurses.find({ward:req.params.id}, (err, nurseDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                profiles:nurseDetails,
            });
            console.log(nurseDetails);
        }
    })
}

const wards = async (req,res) => {
    nurses.distinct('ward', (err, wardDetails) => {
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

const viewNurse = async (req,res) => {
    nurses.findOne({_id:req.params.id}, (err, nurseDetails) => {
        if (err) {
            console.log(err);
        } else {
           res.status(200).json({
               success:true,
               profile:nurseDetails,
           });

        }
    })
}

const editNurse = async (req,res) => {
    nurses.updateOne({_id:req.params.id}, {$set:req.body},(err, buyerDetails) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json({
                success:true,
                message:"Profile updated successfully"
            })
        }
    })
}

const deleteNurse = async (req,res) => {
    nurses.deleteOne({_id:req.params.id}, (err, buyerDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                message:"Profile deleted successfully"
            })
        }
    })
}

module.exports = {addNurse, viewNurse, editNurse, deleteNurse, listNurses, wards, listwardNurse };
