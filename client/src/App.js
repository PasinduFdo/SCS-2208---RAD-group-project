import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './component/login/login';
import Landing from './component/landing/Landing';

import Appointment from './component/appointment/listAppointments';
import AddAppointment from './component/appointment/addAppointment';
import EditAppointment from "./component/appointment/editAppointment";

import Doctor from './component/doctor/listDoctors';
import AddDoctor from './component/doctor/addDoctor';
import ViewDoctor from "./component/doctor/viewDoctor";
import EditDoctor from "./component/doctor/editDoctor";

import Inventory from './component/inventory/listInventory';
import AddInventory from './component/inventory/addInventory';
import ViewInventory from "./component/inventory/viewInventory";
import EditInventory from "./component/inventory/editInventory";

import Nurse from './component/nurse/listNurses';
import AddNurse from './component/nurse/addNurse';
import ViewNurse from "./component/nurse/viewNurse";
import EditNurse from "./component/nurse/editNurse";

import Patient from './component/patient/listPatients';
import AddPatient from './component/patient/addPatient';
import ViewPatient from "./component/patient/viewPatient";
import EditPatient from "./component/patient/editPatient";

const user = localStorage.getItem('username');

function App() {

    return (
        <Routes>
            <Route path="/" element={user? <Navigate to="/dashboard" /> : <Login/> }/>
            <Route path="/dashboard" element={user ? <Landing/> : <Navigate to="/"/> }/>

            <Route path="/appointment" element={user ? <Appointment/> : <Navigate to="/"/> }/>
            <Route path="/add-Appointment" element={user ? <AddAppointment/> : <Navigate to="/"/> }/>
            <Route path="/edit-Appointment/:name" element={user ? <EditAppointment /> : <Navigate to="/"/> }/>

            <Route path="/doctor" element={user ? <Doctor/> : <Navigate to="/"/> }/>
            <Route path="/add-Doctor" element={user ? <AddDoctor /> : <Navigate to="/"/> }/>
            <Route path="/view-Doctor/:name" element={user ? <ViewDoctor /> : <Navigate to="/"/> }/>
            <Route path="/edit-Doctor/:name" element={user ? <EditDoctor /> : <Navigate to="/"/> }/>

            <Route path="/inventory" element={user ? <Inventory/> : <Navigate to="/"/> }/>
            <Route path="/add-Inventory" element={user ? <AddInventory /> : <Navigate to="/"/> }/>
            <Route path="/view-Inventory/:name" element={user ? <ViewInventory /> : <Navigate to="/"/> }/>
            <Route path="/edit-Inventory/:name" element={user ? <EditInventory /> : <Navigate to="/"/> }/>

            <Route path="/nurse" element={user ? <Nurse/> : <Navigate to="/"/> }/>
            <Route path="/add-Nurse" element={user ? <AddNurse /> : <Navigate to="/"/> }/>
            <Route path="/view-Nurse/:name" element={user ? <ViewNurse /> : <Navigate to="/"/> }/>
            <Route path="/edit-Nurse/:name" element={user ? <EditNurse /> : <Navigate to="/"/> }/>

            <Route path="/patient" element={user ? <Patient/> : <Navigate to="/"/> }/>
            <Route path="/add-Patient" element={user ? <AddPatient /> : <Navigate to="/"/> }/>
            <Route path="/view-Patient/:name" element={user ? <ViewPatient /> : <Navigate to="/"/> }/>
            <Route path="/edit-Patient/:name" element={user ? <EditPatient /> : <Navigate to="/"/> }/>
        </Routes>
  );
}

export default App;