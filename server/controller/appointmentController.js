const appointments = require('../model/appointement');

const addAppointment =  async (req,res) => {

        let doctor = req.body.doctor;
        let patient = req.body.patient;
        let date = req.body.date;
        let time = req.body.time;
        let speciality = req.body.speciality;



        let newAppointment = {doctor: doctor, patient: patient, date: date, time: time, speciality: speciality};

        appointments.create(newAppointment, (err, appointmentDetails) => {
            if (err) {
                return res.status(400).send({message:err.details[0].message});
            } else {
                return res.status(200).send({message:'Appointment Added Successfully'});
            }
        })
}

const listAppointments = async (req,res) => {

    appointments.find({}, (err, appointmentDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                profiles:appointmentDetails,
            });

        }
    })

}

const viewAppointment = async (req,res) => {
    appointments.findOne({_id:req.params.id}, (err, appointmentDetails) => {
        if (err) {
            console.log(err);
        } else {
           res.status(200).json({
               success:true,
               profile:appointmentDetails,
           });
        }
    })
}

const editAppointment = async (req,res) => {
    appointments.updateOne({_id:req.params.id}, {$set:req.body},(err, appointmentDetails) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json({
                success:true,
                message:"Appointment updated successfully"
            })
        }
    })
}

const deleteAppointment = async (req,res) => {
    appointments.deleteOne({_id:req.params.id}, (err, appointmentDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                message:"Appointment deleted successfully"
            })
        }
    })
}

const specificDoctor = async (req,res) => {
    appointments.distinct("doctor", (err, appointmentDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                doctorspeciality:appointmentDetails,
            });

        }
    })
}

const listAppointmentsByDoctor = async (req,res) => {

    appointments.find({doctor:req.params.id}, (err, appointmentDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                success:true,
                profiles:appointmentDetails,
            });

        }
    })
}


module.exports = {addAppointment, viewAppointment, listAppointments, deleteAppointment, editAppointment,specificDoctor,listAppointmentsByDoctor};
