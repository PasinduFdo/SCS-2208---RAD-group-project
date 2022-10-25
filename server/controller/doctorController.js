const doctors = require('../model/doctor');

const addDoctor =  async (req,res) => {

        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let dob = req.body.dob;
        let address = req.body.address;
        let tel = req.body.tel;
        let email = req.body.email;
        let image = req.body.image;
        let speciality = req.body.speciality;
        let ward = req.body.ward;
        let appointment = req.body.appointment;


        let newDoctor = {firstname: firstname, lastname: lastname, dob: dob, address: address, tel: tel, email: email, image: image, speciality: speciality, ward: ward, appointment: appointment,};

        doctors.create(newDoctor, (err, doctorDetails) => {
            if (err) {
                return res.status(400).send({message:err.details[0].message});
            } else {
                return res.status(200).send({message:'User Created Successfully'});
            }
        })
}

const listDoctors = async (req,res) => {

    doctors.find({}, (err, doctorDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                profiles:doctorDetails,
            });

        }
    })

}

const listspecialDoctor = async (req,res) => {
    doctors.find({speciality:req.params.id}, (err, doctorDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                profiles:doctorDetails,
            });
        }
    })
}

const Specialities = async (req,res) => {
    doctors.distinct('speciality', (err, doctorDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                specialities:doctorDetails,
            });

        }
    })

}

const viewDoctor = async (req,res) => {
    doctors.findOne({_id:req.params.id}, (err, doctorDetails) => {
        if (err) {
            console.log(err);
        } else {
           res.status(200).json({
               success:true,
               profile:doctorDetails,
           });

        }
    })
}

const editDoctor = async (req,res) => {
    doctors.updateOne({_id:req.params.id}, {$set:req.body},(err, buyerDetails) => {
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

const deleteDoctor = async (req,res) => {
    doctors.deleteOne({_id:req.params.id}, (err, buyerDetails) => {
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

module.exports = {addDoctor, viewDoctor, editDoctor, deleteDoctor, listDoctors, Specialities,listspecialDoctor};
