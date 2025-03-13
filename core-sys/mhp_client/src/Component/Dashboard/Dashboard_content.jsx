import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import EditPatient from "../Patients/AddNewPatient/EditPatient";
import PatientProfile from "../Patients/AddNewPatient/PatientProfile";
import VitalSignSetup from "../Patients/AddNewPatient/VitalSignSetup";

import LabModuleMain from "../LabModuleNew/LabModuleMain";
import FamilyHistory from "../Patients/AddNewPatient/FamilyHistory";
import Docotrs from "../Doctors/all_doctors/Doctors";
import Left_sidebar from "./Left_sidebar";
import Nav_bar from "./Nav_bar";
import AddNewDoctors from "../Doctors/all_doctors/AddDoctors";
import NewDoctorsEntry from "../Doctors/all_doctors/NewDoctorsEntry";
import EditNewDoctors from "../Doctors/all_doctors/EditDoctors";
import DoctorsProfile from "../Doctors/all_doctors/DoctorsProfile";
import PatientCard from "../Appointment/AppointmentBook/PatientCard/PatientCard";
import AppointmentList from "../Appointment/AppointmentList/AppointmentList";
import HistorySetUp from "../../admin_setup_history/history_setup_mainsidebar/HistorySetUp";
import DoctorsSetUp from "../../admin_setup_doctors/doctors_setup_mainsidebar/DoctorsSetUp";
import CustomMedicineSetUp from "../../admin_setup_doctors/custom_medicine_mainsidebar/CustomMedicineSetUp";

import BillingSetUp from "../../admin_setup_billing/billing_setup_mainsidebar/BillingSetUp";
import UpdatePassword from "../../Component/LoginForm/updatePassword";
import UserProfile from "../user_profile/UserProfile";
import Ethnicity from "../../admin_setup_appointment/ethnicity/Ethnicity";
import AddEthnicity from "../../admin_setup_appointment/ethnicity/AddEthnicity";
import Religions from "../../admin_setup_appointment/religions/Religions";
import AddReligions from "../../admin_setup_appointment/religions/AddReligions";
import EditReligions from "../../admin_setup_appointment/religions/EditReligions";
import Occupation from "../../admin_setup_appointment/occupation/Occupation";
import Add_occupation from "../../admin_setup_appointment/occupation/Add_occupation";
import Edit_occupation from "../../admin_setup_appointment/occupation/Edit_occupation";
import Country from "../../admin_setup_appointment/country/Country";
import AddCountry from "../../admin_setup_appointment/country/AddCountry";
import EditCountry from "../../admin_setup_appointment/country/EditCountry";
import Footer from "../Footer/Footer";
import City from "../../admin_setup_appointment/city/City";
import AddCity from "../../admin_setup_appointment/city/AddCity";
import EditCity from "../../admin_setup_appointment/city/EditCity";
import BirthSex from "../../admin_setup_appointment/birth_sex/BirthSex";
import AddBirthSex from "../../admin_setup_appointment/birth_sex/AddBirthSex";
import EditBirthSex from "../../admin_setup_appointment/birth_sex/EditBirthSex";
import Status from "../../admin_setup_appointment/status/Status";
import AddStatus from "../../admin_setup_appointment/status/AddStatus";
import EditStatus from "../../admin_setup_appointment/status/EditStatus";
import All_test from "../../admin_setup_appointment/test/All_test";
import Add_test from "../../admin_setup_appointment/test/Add_test";
import Edit_test from "../../admin_setup_appointment/test/Edit_test";
import ContactVia from "../../admin_setup_appointment/contact_via/ContactVia";
import ContactViaAdd from "../../admin_setup_appointment/contact_via/ContactViaAdd";
import ContactViaEdit from "../../admin_setup_appointment/contact_via/ContactViaEdit";
import Title from "../../admin_setup_appointment/title/Title";
import AddTitle from "../../admin_setup_appointment/title/AddTitle";
import EditTitle from "../../admin_setup_appointment/title/EditTitle";
import Location from "../../admin_setup_appointment/usuallocation/Location";
import Add_location from "../../admin_setup_appointment/usuallocation/Add_location";
import Edit_location from "../../admin_setup_appointment/usuallocation/Edit_location";
import All_visit from "../../admin_setup_appointment/visit_type/All_visit";
import Add_visit from "../../admin_setup_appointment/visit_type/Add_visit";
import Edit_visit from "../../admin_setup_appointment/visit_type/Edit_visit";
import State from "../../admin_setup_appointment/state/State";
import AddState from "../../admin_setup_appointment/state/AddState";
import EditState from "../../admin_setup_appointment/state/EditState";
import UsualProvider from "../../admin_setup_appointment/usual_provider/UsualProvider";
import AddUsualProvider from "../../admin_setup_appointment/usual_provider/AddUsualProvider";
import EditUsualProvider from "../../admin_setup_appointment/usual_provider/EditUsualProvider";
import UsualAccount from "../../admin_setup_appointment/usual_account/UsualAccount";
import AddUsualAccount from "../../admin_setup_appointment/usual_account/AddUsualAccount";
import EditUsualAccount from "../../admin_setup_appointment/usual_account/EditUsualAccount";
import TimeSetup from "../../admin_setup_appointment/timesetup/TimeSetup";
import AddTimeSetup from "../../admin_setup_appointment/timesetup/AddTimeSetup";
import EditTimeSetup from "../../admin_setup_appointment/timesetup/EditTimeSetup";
import Reaction from "../../admin_setup_doctors/reaction/Reaction";
import AddReaction from "../../admin_setup_doctors/reaction/AddReaction";
import EditReaction from "../../admin_setup_doctors/reaction/EditReaction";
import EditTimeSlots from "../../admin_setup_appointment/time_slots/EditTimeSlots";
import AppointmentLength from "../../admin_setup_appointment/appointment_length/AppointmentLength";
import AddAppointmentLength from "../../admin_setup_appointment/appointment_length/AddAppointmentLength";
import EditAppointmentLength from "../../admin_setup_appointment/appointment_length/EditAppointmentLength";
import AppointmentType from "../../admin_setup_appointment/appointment_type/AppointmentType";
import AddAppointmentType from "../../admin_setup_appointment/appointment_type/AddAppointmentType";
import EditAppointmentType from "../../admin_setup_appointment/appointment_type/EditAppointmentType";
import TimeLimits from "../../admin_setup_appointment/time_limits/TimeLimits";
import AddTimeLimits from "../../admin_setup_appointment/time_limits/AddTimeLimits";
import EditTimeLimits from "../../admin_setup_appointment/time_limits/EditTimeLimits";
import BloodGroup from "../../admin_setup_appointment/blood_group/BloodGroup";
import AddBloodGroup from "../../admin_setup_appointment/blood_group/AddBloodGroup";
import EditBloodGroup from "../../admin_setup_appointment/blood_group/EditBloodGroup";
import Diagnosis from "../../admin_setup_doctors/diagnosis/Diagnosis";
import AddDiagnosis from "../../admin_setup_doctors/diagnosis/AddDiagnosis";
import EditDiagnosis from "../../admin_setup_doctors/diagnosis/EditDiagnosis";

import RadiologyCenter from "../../admin_setup_radiology/radiology_center/RadiologyCenter";
import AddRadiologyCenter from "../../admin_setup_radiology/radiology_center/AddRadiologyCenter";
import EditRadiologyCenter from "../../admin_setup_radiology/radiology_center/EditRadiologyCenter";

import RadiologyTestName from "../../admin_setup_radiology/radiology_testName/RadiologyTestName";
import AddRadiologyTestName from "../../admin_setup_radiology/radiology_testName/AddRadiologyTestName";
import EditRadiologyTestName from "../../admin_setup_radiology/radiology_testName/EditRadiologyTestName";

import RadiologyTestType from "../../admin_setup_radiology/radiology_test_type/RadiologyTestType";
import AddRadiologyTestType from "../../admin_setup_radiology/radiology_test_type/AddRadiologyTestType";
import EditRadiologyTestType from "../../admin_setup_radiology/radiology_test_type/EditRadiologyTestType";

import PathalogyTestName from "../../admin_setup_pap/admin_setup_pathology/PathologyTest/PathalogyTestName";
import AddPathalogyTestName from "../../admin_setup_pap/admin_setup_pathology/PathologyTest/AddPathalogyTestName";
import EditPathalogyTestName from "../../admin_setup_pap/admin_setup_pathology/PathologyTest/EditPathalogyTestName";

import ClinicalDetails from "../../admin_setup_pap/admin_setup_pathology/clinical_details/ClinicalDetails";
import AddClinicalDetails from "../../admin_setup_pap/admin_setup_pathology/clinical_details/AddClinicalDetails";
import EditClinicalDetails from "../../admin_setup_pap/admin_setup_pathology/clinical_details/EditClinicalDetails";
import FavouriteTest from "../../admin_setup_pap/admin_setup_pathology/fav_test/FavouriteTest";
import AddFavouriteTest from "../../admin_setup_pap/admin_setup_pathology/fav_test/AddFavouriteTest";
import EditFavouriteTest from "../../admin_setup_pap/admin_setup_pathology/fav_test/EditFavouriteTest";

import ClinicalIndications from "../../admin_setup_radiology/clinical_indications/ClinicalIndications";
import AddClinicalIndications from "../../admin_setup_radiology/clinical_indications/AddClinicalIndications";
import EditClinicalIndications from "../../admin_setup_radiology/clinical_indications/EditClinicalIndications";

import DoctorFee from "../../admin_setup_doctors/doctor_fee/DoctorFee";
import AddDoctorFee from "../../admin_setup_doctors/doctor_fee/AddDoctorFee";
import EditDoctorFee from "../../admin_setup_doctors/doctor_fee/EditDoctorFee";

import ProcedureFee from "../../admin_setup_doctors/procedure_fee/ProcedureFee";
import AddProcedureFee from "../../admin_setup_doctors/procedure_fee/AddProcedureFee";
import EditProcedureFee from "../../admin_setup_doctors/procedure_fee/EditProcedureFee";

import Digital from "../../admin_setup_billing/digital/Digital";
import AddDigital from "../../admin_setup_billing/digital/AddDigital";
import EditDigital from "../../admin_setup_billing/digital/EditDigital";

import Card from "../../admin_setup_billing/card/Card";
import AddCard from "../../admin_setup_billing/card/AddCard";
import EditCard from "../../admin_setup_billing/card/EditCard";

import Branch from "../../admin_setup_billing/branch/Branch";
import AddBranch from "../../admin_setup_billing/branch/AddBranch";
import EditBranch from "../../admin_setup_billing/branch/EditBranch";

import Bank from "../../admin_setup_billing/bank/Bank";
import AddBank from "../../admin_setup_billing/bank/AddBank";
import EditBank from "../../admin_setup_billing/bank/EditBank";

import PastAlcoholConsumption from "../../admin_setup_doctors/past_alcohol_consumption/PastAlcoholConsumption";
import OccupationalHazards from "../../admin_setup_doctors/occupational_hazards/OccupationalHazards";
import AddOccupationalHazards from "../../admin_setup_doctors/occupational_hazards/AddOccupationalHazards";
import EditOccupationalHazards from "../../admin_setup_doctors/occupational_hazards/EditOccupationalHazards";
import CurrentSmokingHistory from "../../admin_setup_doctors/current_smoking_history/CurrentSmokingHistory";
import TobaccoType from "../../admin_setup_doctors/tobacco_type/TobaccoType";
import EditTobaccoType from "../../admin_setup_doctors/tobacco_type/EditTobaccoType";
import AddCurrentSmokingHistory from "../../admin_setup_doctors/current_smoking_history/AddCurrentSmokingHistory";
import EditCurrentSmokingHistory from "../../admin_setup_doctors/current_smoking_history/EditCurrentSmokingHistory";
import AddTobaccoType from "../../admin_setup_doctors/tobacco_type/AddTobaccoType";
import EditPastAlcoholConsumption from "../../admin_setup_doctors/past_alcohol_consumption/EditPastAlcoholConsumption";
import AddPastAlcoholConsumption from "../../admin_setup_doctors/past_alcohol_consumption/AddPastAlcoholConsumption";
import TobaccoCost from "../../admin_setup_doctors/tobacco_cost/TobaccoCost";
import AddTobaccoCost from "../../admin_setup_doctors/tobacco_cost/AddTobaccoCost";
import EditTobaccoCost from "../../admin_setup_doctors/tobacco_cost/EditTobaccoCost";
import AdviceSuggestion from "../../admin_setup_doctors/advice_suggestion/AdviceSuggestion";
import AddAdviceSuggestion from "../../admin_setup_doctors/advice_suggestion/AddAdviceSuggestion";
import EditAdviceSuggestion from "../../admin_setup_doctors/advice_suggestion/EditAdviceSuggestion";
import Departments from "../../admin_setup_doctors/departments/Departments";
import AddDepartments from "../../admin_setup_doctors/departments/AddDepartments";
import EditDepartments from "../../admin_setup_doctors/departments/EditDepartments";
import DiagnosisAction from "../../admin_setup_doctors/diagnosis_action/DiagnosisAction";
import AddDiagnosisAction from "../../admin_setup_doctors/diagnosis_action/AddDiagnosisAction";
import EditDiagnosisAction from "../../admin_setup_doctors/diagnosis_action/EditDiagnosisAction";
import DrugName from "../../admin_setup_doctors/drug_name/DrugName";
import AddDrugName from "../../admin_setup_doctors/drug_name/AddDrugName";
import EditDrugUnit from "../../admin_setup_doctors/drug_unit/EditDrugUnit";
import RouteName from "../../admin_setup_doctors/route_name/RouteName";
import AddRouteName from "../../admin_setup_doctors/route_name/AddRouteName";
import EditRouteName from "../../admin_setup_doctors/route_name/EditRouteName";
import DoseName from "../../admin_setup_doctors/dose_name/DoseName";
import AddDoseName from "../../admin_setup_doctors/dose_name/AddDoseName";
import EditDoseName from "../../admin_setup_doctors/dose_name/EditDoseName";
import EditDrugName from "../../admin_setup_doctors/drug_name/EditDrugName";
import DrugUnit from "../../admin_setup_doctors/drug_unit/DrugUnit";
import AddDrugUnit from "../../admin_setup_doctors/drug_unit/AddDrugUnit";
import FrequencyName from "../../admin_setup_doctors/frequency_name/FrequencyName";
import AddFrequencyName from "../../admin_setup_doctors/frequency_name/AddFrequencyName";
import EditFrequencyName from "../../admin_setup_doctors/frequency_name/EditFrequencyName";

import Procedure from "../../admin_setup_doctors/procedure/Procedure";
import AddProcedure from "../../admin_setup_doctors/procedure/AddProcedure";
import EditProcedure from "../../admin_setup_doctors/procedure/EditProcedure";

import DoctorFeeGroup from "../../admin_setup_doctors/DoctorFeeGroup/DoctorFeeGroup";
import AddDoctorFeeGroup from "../../admin_setup_doctors/DoctorFeeGroup/AddDoctorFeeGroup";
import EditDoctorFeeGroup from "../../admin_setup_doctors/DoctorFeeGroup/EditDoctorFeeGroup";

import FoodName from "../../admin_setup_doctors/food_name/FoodName";
import AddFoodName from "../../admin_setup_doctors/food_name/AddFoodName";
import EditFoodName from "../../admin_setup_doctors/food_name/EditFoodName";
import OthersName from "../../admin_setup_doctors/others_name/OthersName";
import AddOthersName from "../../admin_setup_doctors/others_name/AddOthersName";
import EditOthersName from "../../admin_setup_doctors/others_name/EditOthersName";
import Specialist from "../../admin_setup_doctors/specialist/Specialist";
import AddSpecialist from "../../admin_setup_doctors/specialist/AddSpecialist";
import EditSpecialist from "../../admin_setup_doctors/specialist/EditSpecialist";
import Examination from "../../admin_setup_history/examination/Examination";
import AddExamination from "../../admin_setup_history/examination/AddExamination";
import EditExamination from "../../admin_setup_history/examination/EditExamination";
import History from "../../admin_setup_history/history/History";
import AddHistory from "../../admin_setup_history/history/AddHistory";
import EditHistory from "../../admin_setup_history/history/EditHistory";
import ExamHistoryExtension from "../../admin_setup_history/exam_history_extension/ExamHistoryExtension";
import AddExamHistoryExtension from "../../admin_setup_history/exam_history_extension/AddExamHistoryExtension";
import EditExamHistoryExtension from "../../admin_setup_history/exam_history_extension/EditExamHistoryExtension";
import ExamHistSelectionParam from "../../admin_setup_history/exam_hist_selection_param/ExamHistSelectionParam";
import AddExamHistSelectionParam from "../../admin_setup_history/exam_hist_selection_param/AddExamHistSelectionParam";
import EditExamHistSelectionParam from "../../admin_setup_history/exam_hist_selection_param/EditExamHistSelectionParam";
import Carotid from "../../admin_setup_history/carotid/Carotid";
import AddCarotid from "../../admin_setup_history/carotid/AddCarotid";
import EditCarotid from "../../admin_setup_history/carotid/EditCarotid";
import RegForm from "../RegForm/RegForm";
import EditEthnicity from "../../admin_setup_appointment/ethnicity/EditEthnicity";

import EarCanel from "../../admin_setup_ent/ear_canel/EarCanel";
import AddEarCanel from "../../admin_setup_ent/ear_canel/AddEarCanel";
import EditEarCanel from "../../admin_setup_ent/ear_canel/EditEarCanel";
import EarLesion from "../../admin_setup_ent/ear_lesion/EarLesion";
import AddEarLesion from "../../admin_setup_ent/ear_lesion/AddEarLesion";
import EditEarLesion from "../../admin_setup_ent/ear_lesion/EditEarLesion";
import Tympanic from "../../admin_setup_ent/tympanic_membrane/Tympanic";
import AddTympanic from "../../admin_setup_ent/tympanic_membrane/AddTympanic";
import EditTympanic from "../../admin_setup_ent/tympanic_membrane/EditTympanic";

import Mastoid from "../../admin_setup_ent/mastoid/Mastoid";
import AddMastoid from "../../admin_setup_ent/mastoid/AddMastoid";
import EditMastoid from "../../admin_setup_ent/mastoid/EditMastoid";

import Posterior from "../../admin_setup_ent/posterior_auricular/Posterior";
import AddPosterior from "../../admin_setup_ent/posterior_auricular/AddPosterior";
import EditPosterior from "../../admin_setup_ent/posterior_auricular/EditPosterior";

import Tunning from "../../admin_setup_ent/tunning_fork/Tunning";
import AddTunning from "../../admin_setup_ent/tunning_fork/AddTunning";
import EditTunning from "../../admin_setup_ent/tunning_fork/EditTunning";

import WeberTest from "../../admin_setup_ent/weber_test/WeberTest";
import AddWeberTest from "../../admin_setup_ent/weber_test/AddWeberTest";
import EditWeberTest from "../../admin_setup_ent/weber_test/EditWeberTest";

import Throat from "../../admin_setup_ent/throat/Throat";
import AddThroat from "../../admin_setup_ent/throat/AddThroat";
import EditThroat from "../../admin_setup_ent/throat/EditThroat";

import Tongue from "../../admin_setup_ent/tongue/Tongue";
import AddTongue from "../../admin_setup_ent/tongue/AddTongue";
import EditTongue from "../../admin_setup_ent/tongue/EditTongue";

import Tonsil from "../../admin_setup_ent/tonsil/Tonsil";
import AddTonsil from "../../admin_setup_ent/tonsil/AddTonsil";
import EditTonsil from "../../admin_setup_ent/tonsil/EditTonsil";

import Nose from "../../admin_setup_ent/nose/Nose";
import AddNose from "../../admin_setup_ent/nose/AddNose";
import EditNose from "../../admin_setup_ent/nose/EditNose";

import TongueLesion from "../../admin_setup_ent/tongue_lesion/TongueLesion";
import AddTongueLesion from "../../admin_setup_ent/tongue_lesion/AddTongueLesion";
import EditTongueLesion from "../../admin_setup_ent/tongue_lesion/EditTongueLesion";

import ExamHistoryMapping from "../../admin_setup_history/exam_history_mapping/ExamHistoryMapping";
import AddExamHistoryMapping from "../../admin_setup_history/exam_history_mapping/AddExamHistoryMapping";
import EditExamHistoryMapping from "../../admin_setup_history/exam_history_mapping/EditExamHistoryMapping";

import DoctorList from "../Appointment/DoctorList/DoctorList";
import SelectionCriteria from "../../admin_setup_history/selection_criteria/SelectionCriteria";
import AddSelectionCriteria from "../../admin_setup_history/selection_criteria/AddSelectionCriteria";
import EditSelectionCriteria from "../../admin_setup_history/selection_criteria/EditSelectionCriteria";
import ApexBeat from "../../admin_setup_history/apex_beat/ApexBeat";
import AddApexBeat from "../../admin_setup_history/apex_beat/AddApexBeat";
import EditApexBeat from "../../admin_setup_history/apex_beat/EditApexBeat";
import IntercostalSpace from "../../admin_setup_history/intercostal_space/IntercostalSpace";
import AddIntercostalSpace from "../../admin_setup_history/intercostal_space/AddIntercostalSpace";
import EditIntercostalSpace from "../../admin_setup_history/intercostal_space/EditIntercostalSpace";
import NewPatientEntry from "../Patients/AddNewPatient/NewPatientEntry";
import GreatDoc from "../Appointment/GreatDoc/GreatDoc";
import HistoryExamStatus from "../../admin_setup_history/history_exam_status/HistoryExamStatus";
import AddHistoryExamStatus from "../../admin_setup_history/history_exam_status/AddHistoryExamStatus";
import EditHistoryExamStatus from "../../admin_setup_history/history_exam_status/EditHistoryExamStatus";

import HeartSound from "../../admin_setup_history/heart_sound/HeartSound";
import AddHeartSound from "../../admin_setup_history/heart_sound/AddHeartSound";
import EditHeartSound from "../../admin_setup_history/heart_sound/EditHeartSound";

import Volume from "../../admin_setup_history/volume/Volume";
import AddVolume from "../../admin_setup_history/volume/AddVolume";
import EditVolume from "../../admin_setup_history/volume/EditVolume";

import Rediation from "../../admin_setup_history/rediation/Rediation";
import AddRediation from "../../admin_setup_history/rediation/AddRediation";
import EditRediation from "../../admin_setup_history/rediation/EditRediation";

import Murmur from "../../admin_setup_history/murmur/Murmur";
import AddMurmur from "../../admin_setup_history/murmur/AddMurmur";
import EditMurmur from "../../admin_setup_history/murmur/EditMurmur";

import Others from "../../admin_setup_history/others/Others";
import AddOthers from "../../admin_setup_history/others/AddOthers";
import EditOthers from "../../admin_setup_history/others/EditOthers";

import EntSetUp from "../../admin_setup_ent/ent_setup_mainsidebar/EntSetUp";

import CnsOneSetUp from "../../admin_setup_cns_one/cns_one_setup_mainsidebar/CnsOneSetUp";
import CnsTwoSetup from "../../admin_setup_cns_two/cns_two_setup_mainsidebar/CnsTwoSetUp";

import New_users_registration from "../RegForm/New_users_registration";
import AppointmentStatus from "../Appointment/AppointmetStatus/AppointmentStatus";

import UserType from "../../admin_setup_appointment/user_type/UserType";
import AddUserType from "../../admin_setup_appointment/user_type/AddUserType";
import EditUserType from "../../admin_setup_appointment/user_type/EditUserType";

import MediaType from "../../admin_setup_appointment/media_type/MediaType";
import AddMediaType from "../../admin_setup_appointment/media_type/AddMediaType";
import EditMediaType from "../../admin_setup_appointment/media_type/EditMediaType";

// import MheSetUp from "../../admin_setup_mhe/mhe_setup_mainsidebar/MheSetUp";
import MreSetUp from "../../admin_setup_mre/mre_setup_mainsidebar/MreSetUp";
import MlhSetUp from "../../admin_setup_allhistory/mlh_setup_mainsidebar/MlhSetUp";

import DoctorsInbox from "../Doctors/DoctorsInbox/DoctorsInbox";
import DoctorsChamber from "../Doctors/DoctorsChamber/DoctorsChamber";
import AddDoctorsChamber from "../Doctors/DoctorsChamber/AddDoctorsChamber";
import EditDoctorChamber from "../Doctors/DoctorsChamber/EditDoctorChamber";
import DoctorTimeSlot from "../Doctors/all_doctors/DoctorTimeSlot";
import DoctorsTimeSlotDetails from "../Doctors/all_doctors/DoctorsTimeSlotDetails";

import BillingInvoice from "../Billing/BillingInvoice";
import BillingPatient from "../Billing/BillingPatient";

import VitalSignUnit from "../../admin_setup_appointment/vital_signunit/VitalSignUnit";
import AddVitalSignUnit from "../../admin_setup_appointment/vital_signunit/AddVitalSignUnit";
import EditVitalSignUnit from "../../admin_setup_appointment/vital_signunit/EditVitalSignUnit";

import ChestShape from "../../admin_setup_mre/chest_shape/ChestShape";
import AddChestShape from "../../admin_setup_mre/chest_shape/AddChestShape";
import EditChestShape from "../../admin_setup_mre/chest_shape/EditChestShape";

import Percussion from "../../admin_setup_mre/percussion/Percussion";
import AddPercussion from "../../admin_setup_mre/percussion/AddPercussion";
import EditPercussion from "../../admin_setup_mre/percussion/EditPercussion";

import BreathSound from "../../admin_setup_mre/breath_sound/BreathSound";
import AddBreathSound from "../../admin_setup_mre/breath_sound/AddBreathSound";
import EditBreathSound from "../../admin_setup_mre/breath_sound/EditBreathSound";

import AbnormalBreathing from "../../admin_setup_mre/abnormal_breathing/AbnormalBreathing";
import AddAbnormalBreathing from "../../admin_setup_mre/abnormal_breathing/AddAbnormalBreathing";
import EditAbnormalBreathing from "../../admin_setup_mre/abnormal_breathing/EditAbnormalBreathing";

import VocalFremitus from "../../admin_setup_mre/vocal_fremitus/VocalFremitus";
import AddVocalFremitus from "../../admin_setup_mre/vocal_fremitus/AddVocalFremitus";
import EditVocalFremitus from "../../admin_setup_mre/vocal_fremitus/EditVocalFremitus";

import ChestExpansion from "../../admin_setup_mre/chest_expansion/ChestExpansion";
import AddChestExpansion from "../../admin_setup_mre/chest_expansion/AddChestExpansion";
import EditChestExpansion from "../../admin_setup_mre/chest_expansion/EditChestExpansion";

import Wheering from "../../admin_setup_mre/wheering/Wheering";
import AddWheering from "../../admin_setup_mre/wheering/AddWheering";
import EditWheering from "../../admin_setup_mre/wheering/EditWheering";

import VocalResonance from "../../admin_setup_mre/vocal_resonance/VocalResonance";
import AddVocalResonance from "../../admin_setup_mre/vocal_resonance/AddVocalResonance";
import EditVocalResonance from "../../admin_setup_mre/vocal_resonance/EditVocalResonance";

import Symptoms from "../../admin_setup_mre/symptoms/Symptoms";
import AddSymptoms from "../../admin_setup_mre/symptoms/AddSymptoms";
import EditSymptoms from "../../admin_setup_mre/symptoms/EditSymptoms";

import Pembertons from "../../admin_setup_mre/pembertons/Pembertons";
import AddPembertons from "../../admin_setup_mre/pembertons/AddPembertons";
import EditPembertons from "../../admin_setup_mre/pembertons/EditPembertons";

import Crepitation from "../../admin_setup_mre/crepitation/Crepitation";
import AddCrepitation from "../../admin_setup_mre/crepitation/AddCrepitation";
import EditCrepitation from "../../admin_setup_mre/crepitation/EditCrepitation";

import ExaminationHeading from "../../admin_setup_allhistory/examination_heading/ExaminationHeading";
import AddExaminationHeading from "../../admin_setup_allhistory/examination_heading/AddExaminationHeading";
import EditExaminationHeading from "../../admin_setup_allhistory/examination_heading/EditExaminationHeading";

import CommonHistory from "../../admin_setup_allhistory/common_history/CommonHistory";
import AddCommonHistory from "../../admin_setup_allhistory/common_history/AddCommonHistory";
import EditCommonHistory from "../../admin_setup_allhistory/common_history/EditCommonHistory";

import Employee from "../Employee/Employee";
import Add_employee from "../Employee/Add_employee";
import Edit_employee from "../Employee/Edit_employee";
import Employee_profile from "../Employee/Employee_profile";

import AllergySetup from "../Patients/AllergySetup";
import Generic from "../../admin_setup_doctors/generic_name/Generic";
import Add_generic from "../../admin_setup_doctors/generic_name/Add_generic";
import Edit_generic from "../../admin_setup_doctors/generic_name/Edit_generic";

import Ingredient from "../../admin_setup_doctors/ingredient/Ingredient";
import AddIngredient from "../../admin_setup_doctors/ingredient/AddIngredient";
import EditIngredient from "../../admin_setup_doctors/ingredient/EditIngredient";

import TheResultIs from "../../admin_setup_doctors/the_result_is/TheResultIs";
import AddTheResultIs from "../../admin_setup_doctors/the_result_is/AddTheResultIs";
import EditTheResultIs from "../../admin_setup_doctors/the_result_is/EditTheResultIs";

import StoreResultIn from "../../admin_setup_doctors/store_result_in/StoreResultIn";
import AddStoreResultIn from "../../admin_setup_doctors/store_result_in/AddStoreResultIn";
import EditStoreResultIn from "../../admin_setup_doctors/store_result_in/EditStoreResultIn";

import ActionTobeTaken from "../../admin_setup_doctors/action_tobe_taken/ActionTobeTaken";
import AddActionTobeTaken from "../../admin_setup_doctors/action_tobe_taken/AddActionTobeTaken";
import EditActionTobeTaken from "../../admin_setup_doctors/action_tobe_taken/EditActionTobeTaken";

import Restriction from "../../admin_setup_doctors/restriction/Restriction";
import AddRestriction from "../../admin_setup_doctors/restriction/AddRestriction";
import EditRestriction from "../../admin_setup_doctors/restriction/EditRestriction";

import MedicineCategory from "../../admin_setup_doctors/medicine_category/MedicineCategory";
import AddMedicineCategory from "../../admin_setup_doctors/medicine_category/AddMedicineCategory";
import EditMedicineCategory from "../../admin_setup_doctors/medicine_category/EditMedicineCategory";

import CustomMedicine from "../../admin_setup_doctors/custom_medicine/CustomMedicine";
import AddCustomMedicine from "../../admin_setup_doctors/custom_medicine/AddCustomMedicine";
import EditCustomMedicine from "../../admin_setup_doctors/custom_medicine/EditCustomMedicine";

// morshed start
import Cough from "./../../admin_setup_mre/cough/Cough";
import AddCough from "./../../admin_setup_mre/cough/AddCough";
import EditCough from "./../../admin_setup_mre/cough/EditCough";
import Dyspnea from "./../../admin_setup_mre/dyspnea/Dyspnea";
import AddDyspnea from "./../../admin_setup_mre/dyspnea/AddDyspnea";
import EditDyspnea from "./../../admin_setup_mre/dyspnea/EditDyspnea";
import MedicalHistory from "./../../admin_setup_mre/medical_history/MedicalHistory";
import AddMedicalHistory from "./../../admin_setup_mre/medical_history/AddMedicalHistory";
import EditMedicalHistory from "../../admin_setup_mre/medical_history/EditMedicalHistory";
import SleepApnoeaRisk from "../../admin_setup_mre/sleep_apnoea_risk/SleepApnoeaRisk";
import AddSleepApnoeaRisk from "../../admin_setup_mre/sleep_apnoea_risk/AddSleepApnoeaRisk";
import EditSleepApnoeaRisk from "../../admin_setup_mre/sleep_apnoea_risk/EditSleepApnoeaRisk";
import Questionnaire from "../../admin_setup_mre/questionnaire/Questionnaire";
import AddQuestionnaire from "../../admin_setup_mre/questionnaire/AddQuestionnaire";
import EditQuestionnaire from "../../admin_setup_mre/questionnaire/EditQuestionnaire";

import Skin from "../../admin_setup_gastro_intestinal/skin/Skin";
import AddSkin from "../../admin_setup_gastro_intestinal/skin/AddSkin";
import EditSkin from "../../admin_setup_gastro_intestinal/skin/EditSkin";
import GastroIntesinalSetup from "../../admin_setup_gastro_intestinal/gastro_int_setup_mainsidebar/GastroIntesinalSetup";
import HandAndFinger from "../../admin_setup_gastro_intestinal/hand_and_finger/HandAndFinger";
import AddHandAndFinger from "../../admin_setup_gastro_intestinal/hand_and_finger/AddHandAndFinger";
import EditHandAndFinger from "../../admin_setup_gastro_intestinal/hand_and_finger/EditHandAndFinger";
import LeftSupraclavicularNode from "../../admin_setup_gastro_intestinal/left_supraclavicular_node/LeftSupraclavicularNode";
import AddLeftSupraclavicularNode from "../../admin_setup_gastro_intestinal/left_supraclavicular_node/AddLeftSupraclavicularNode";
import EditLeftSupraclavicularNode from "../../admin_setup_gastro_intestinal/left_supraclavicular_node/EditLeftSupraclavicularNode";
import TongueMouth from "../../admin_setup_gastro_intestinal/tongue_mouth/TongueMouth";
import AddTongueMouth from "../../admin_setup_gastro_intestinal/tongue_mouth/AddTongueMouth";
import EditTongueMouth from "../../admin_setup_gastro_intestinal/tongue_mouth/EditTongueMouth";
import Abdomen from "../../admin_setup_gastro_intestinal/abdomen/Abdomen";
import AddAbdomen from "../../admin_setup_gastro_intestinal/abdomen/AddAbdomen";
import EditAbdomen from "../../admin_setup_gastro_intestinal/abdomen/EditAbdomen";
import Bruit from "../../admin_setup_gastro_intestinal/bruit/Bruit";
import AddBruit from "../../admin_setup_gastro_intestinal/bruit/AddBruit";
import EditBruit from "../../admin_setup_gastro_intestinal/bruit/EditBruit";
import NonTenderTenderness from "../../admin_setup_gastro_intestinal/non_tender_tenderness/NonTenderTenderness";
import AddNonTenderTenderness from "../../admin_setup_gastro_intestinal/non_tender_tenderness/AddNonTenderTenderness";
import EditNonTenderTenderness from "../../admin_setup_gastro_intestinal/non_tender_tenderness/EditNonTenderTenderness";
import NoMassesMass from "../../admin_setup_gastro_intestinal/no_masses_mass/NoMassesMass";
import AddNoMassesMass from "../../admin_setup_gastro_intestinal/no_masses_mass/AddNoMassesMass";
import EditNoMassesMass from "../../admin_setup_gastro_intestinal/no_masses_mass/EditNoMassesMass";
import Hernias from "../../admin_setup_gastro_intestinal/hernias/Hernias";
import AddHernias from "../../admin_setup_gastro_intestinal/hernias/AddHernias";
import EditHernias from "../../admin_setup_gastro_intestinal/hernias/EditHernias";
import HerniasInguinal from "../../admin_setup_gastro_intestinal/hernias_inguinal/HerniasInguinal";
import AddHerniasInguinal from "../../admin_setup_gastro_intestinal/hernias_inguinal/AddHerniasInguinal";
import EditHerniasInguinal from "../../admin_setup_gastro_intestinal/hernias_inguinal/EditHerniasInguinal";
import HerniasFemoral from "../../admin_setup_gastro_intestinal/hernias_femoral/HerniasFemoral";
import AddHerniasFemoral from "../../admin_setup_gastro_intestinal/hernias_femoral/AddHerniasFemoral";
import EditHerniasFemoral from "../../admin_setup_gastro_intestinal/hernias_femoral/EditHerniasFemoral";
import PerRectal from "../../admin_setup_gastro_intestinal/per_rectal/PerRectal";
import AddPerRectal from "../../admin_setup_gastro_intestinal/per_rectal/AddPerRectal";
import EditPerRectal from "../../admin_setup_gastro_intestinal/per_rectal/EditPerRectal";
import Sigmoidoscopy from "../../admin_setup_gastro_intestinal/sigmoidoscopy/Sigmoidoscopy";
import AddSigmoidoscopy from "../../admin_setup_gastro_intestinal/sigmoidoscopy/AddSigmoidoscopy";
import EditSigmoidoscopy from "../../admin_setup_gastro_intestinal/sigmoidoscopy/EditSigmoidoscopy";
import SigmoidoscopyGuaiacTest from "../../admin_setup_gastro_intestinal/sigmoidoscopy_guaiac_test/SigmoidoscopyGuaiacTest";
import AddSigmoidoscopyGuaiacTest from "../../admin_setup_gastro_intestinal/sigmoidoscopy_guaiac_test/AddSigmoidoscopyGuaiacTest";
import EditSigmoidoscopyGuaiacTest from "../../admin_setup_gastro_intestinal/sigmoidoscopy_guaiac_test/EditSigmoidoscopyGuaiacTest";
import GenitoUrinarySetup from "../../admin_genito_urinary_setup/genito_urinary_setup_mainsidebar/GenitoUrinarySetup";
import RenalMass from "../../admin_genito_urinary_setup/renal_mass/RenalMass";
import AddRenalMass from "../../admin_genito_urinary_setup/renal_mass/AddRenalMass";
import EditRenalMass from "../../admin_genito_urinary_setup/renal_mass/EditRenalMass";
import UrineAnalysis from "../../admin_genito_urinary_setup/urine_analysis/UrineAnalysis";
import AddUrineAnalysis from "../../admin_genito_urinary_setup/urine_analysis/AddUrineAnalysis";
import EditUrineAnalysis from "../../admin_genito_urinary_setup/urine_analysis/EditUrineAnalysis";
import ExmaninationList from "../../admin_setup_mre/exmanination_list/ExmaninationList";
import AddExmaninationList from "../../admin_setup_mre/exmanination_list/AddExmaninationList";
import EditExmaninationList from "../../admin_setup_mre/exmanination_list/EditExmaninationList";
import GeneralExaminationSetup from "../../admin_setup_general_examination/general_examination_setup_mainsidbar/GeneralExaminationSetup";
import Dehydration from "../../admin_setup_general_examination/dehydration/Dehydration";
import AddDehydration from "../../admin_setup_general_examination/dehydration/AddDehydration";
import EditDehydration from "../../admin_setup_general_examination/dehydration/EditDehydration";
import RadioFemoralDelay from "../../admin_setup_general_examination/radio_femoral_delay/RadioFemoralDelay";
import AddRadioFemoralDelay from "../../admin_setup_general_examination/radio_femoral_delay/AddRadioFemoralDelay";
import EditRadioFemoralDelay from "../../admin_setup_general_examination/radio_femoral_delay/EditRadioFemoralDelay";
import NailSign from "../../admin_setup_general_examination/nail_sign/NailSign";
import AddNailSign from "../../admin_setup_general_examination/nail_sign/AddNailSign";
import EditNailSign from "../../admin_setup_general_examination/nail_sign/EditNailSign";
import DyspneaClass from "../../admin_setup_mre/dyspnea_class/DyspneaClass";
import AddDyspneaClass from "../../admin_setup_mre/dyspnea_class/AddDyspneaClass";
import EditDyspneaClass from "../../admin_setup_mre/dyspnea_class/EditDyspneaClass";
import EyeExaminationSetup from "../../admin_setup_eye_examination/eye_examination_setup_mainsidebar/EyeExaminationSetup";

import SwollenEyeLid from "../../admin_setup_eye_examination/swollen_eye_lid/SwollenEyeLid";
import AddSwollenEyeLid from "../../admin_setup_eye_examination/swollen_eye_lid/AddSwollenEyeLid";
import EditSwollenEyeLid from "../../admin_setup_eye_examination/swollen_eye_lid/EditSwollenEyeLid";
import Lesion from "../../admin_setup_eye_examination/lesion/Lesion";
import AddLesion from "../../admin_setup_eye_examination/lesion/AddLesion";
import EditLesion from "../../admin_setup_eye_examination/lesion/EditLesion";
import CripatationLeft from "../../admin_setup_mre/cripatation_left/CripatationLeft";
import AddCripatationLeft from "../../admin_setup_mre/cripatation_left/AddCripatationLeft";
import EditCripatationLeft from "../../admin_setup_mre/cripatation_left/EditCripatationLeft";
import CripatationRight from "../../admin_setup_mre/cripatation_right/CripatationRight";
import AddCripatationRight from "../../admin_setup_mre/cripatation_right/AddCripatationRight";
import EditCripatationRight from "../../admin_setup_mre/cripatation_right/EditCripatationRight";
import CripatationBoth from "../../admin_setup_mre/cripatation_both/CripatationBoth";
import AddCripatationBoth from "../../admin_setup_mre/cripatation_both/AddCripatationBoth";
import EditCripatationBoth from "../../admin_setup_mre/cripatation_both/EditCripatationBoth";
import WheezingLeft from "../../admin_setup_mre/wheezing_left/WheezingLeft";
import AddWheezingLeft from "../../admin_setup_mre/wheezing_left/AddWheezingLeft";
import EditWheezingLeft from "../../admin_setup_mre/wheezing_left/EditWheezingLeft";
import WheezingRight from "../../admin_setup_mre/wheezing_right/WheezingRight";
import AddWheezingRight from "../../admin_setup_mre/wheezing_right/AddWheezingRight";
import EditWheezingRight from "../../admin_setup_mre/wheezing_right/EditWheezingRight";
import WheezingBoth from "../../admin_setup_mre/wheezing_both/WheezingBoth";
import AddWheezingBoth from "../../admin_setup_mre/wheezing_both/AddWheezingBoth";
import EditWheezingBoth from "../../admin_setup_mre/wheezing_both/EditWheezingBoth";
import EyeExaminationTwoSetup from "../../admin_setup_eye_examination_two/eye_examination_two_setup_mainsidebar/EyeExaminationTwoSetup";

import Worth4Dot from "../../admin_setup_eye_examination_two/wort_4_dot/Worth4Dot";
import AddWorth4Dot from "../../admin_setup_eye_examination_two/wort_4_dot/AddWorth4Dot";
import EditWorth4Dot from "../../admin_setup_eye_examination_two/wort_4_dot/EditWorth4Dot";
import EOMConvergence from "../../admin_setup_eye_examination_two/eom_convergence/EOMConvergence";
import AddEOMConvergence from "../../admin_setup_eye_examination_two/eom_convergence/AddEOMConvergence";
import EditEOMConvergence from "../../admin_setup_eye_examination_two/eom_convergence/EditEOMConvergence";

import Site from "../../admin_setup_gastro_intestinal/sites/Site";
import AddSite from "../../admin_setup_gastro_intestinal/sites/AddSite";
import EditSite from "../../admin_setup_gastro_intestinal/sites/EditSite";

import Radiation from "../../admin_setup_gastro_intestinal/radiation/Radiation";
import AddRadiation from "../../admin_setup_gastro_intestinal/radiation/AddRadiation";
import EditRadiation from "../../admin_setup_gastro_intestinal/radiation/EditRadiation";

import Pattern from "../../admin_setup_gastro_intestinal/pattern/Pattern";
import AddPattern from "../../admin_setup_gastro_intestinal/pattern/AddPattern";
import EditPattern from "../../admin_setup_gastro_intestinal/pattern/EditPattern";
import Duration from "../../admin_setup_gastro_intestinal/duration/Duration";
import AddDuration from "../../admin_setup_gastro_intestinal/duration/AddDuration";
import EditDuration from "../../admin_setup_gastro_intestinal/duration/EditDuration";
import Frequency from "../../admin_setup_gastro_intestinal/frequency/Frequency";
import AddFrequency from "../../admin_setup_gastro_intestinal/frequency/AddFrequency";
import EditFrequency from "../../admin_setup_gastro_intestinal/frequency/EditFrequency";
import Score from "./../../admin_setup_gastro_intestinal/score/Score";
import AddScore from "../../admin_setup_gastro_intestinal/score/AddScore";
import EditScore from "../../admin_setup_gastro_intestinal/score/EditScore";
import Vomiting from "../../admin_setup_gastro_intestinal/vomiting/Vomiting";
import AddVomiting from "../../admin_setup_gastro_intestinal/vomiting/AddVomiting";
import EditVomiting from "../../admin_setup_gastro_intestinal/vomiting/EditVomiting";
import Dysphagia from "../../admin_setup_gastro_intestinal/dysphagia/Dysphagia";
import AddDysphagia from "../../admin_setup_gastro_intestinal/dysphagia/AddDysphagia";
import EditDysphagia from "../../admin_setup_gastro_intestinal/dysphagia/EditDysphagia";
import Diarrhoea from "../../admin_setup_gastro_intestinal/diarrhoea/Diarrhoea";
import AddDiarrhoea from "../../admin_setup_gastro_intestinal/diarrhoea/AddDiarrhoea";
import EditDiarrhoea from "../../admin_setup_gastro_intestinal/diarrhoea/EditDiarrhoea";
import StoolType from "../../admin_setup_gastro_intestinal/stool_type/StoolType";
import AddStoolType from "../../admin_setup_gastro_intestinal/stool_type/AddStoolType";
import EditStoolType from "../../admin_setup_gastro_intestinal/stool_type/EditStoolType";
import PRBleed from "../../admin_setup_gastro_intestinal/pr_bleed/PRBleed";
import AddPRBleed from "../../admin_setup_gastro_intestinal/pr_bleed/AddPRBleed";
import EditPRBleed from "../../admin_setup_gastro_intestinal/pr_bleed/EditPRBleed";
import EOMAccomodation from "../../admin_setup_eye_examination_two/eom_accomodation/EOMAccomodation";
import AddEOMAccomodation from "../../admin_setup_eye_examination_two/eom_accomodation/AddEOMAccomodation";
import EditEOMAccomodation from "../../admin_setup_eye_examination_two/eom_accomodation/EditEOMAccomodation";
import DryRetinoscopy from "../../admin_setup_eye_examination_two/dry_retinoscopy/DryRetinoscopy";
import AddDryRetinoscopy from "../../admin_setup_eye_examination_two/dry_retinoscopy/AddDryRetinoscopy";
import EditDryRetinoscopy from "../../admin_setup_eye_examination_two/dry_retinoscopy/EditDryRetinoscopy";
import MaddoxWing from "../../admin_setup_eye_examination_two/maddox_wing/MaddoxWing";
import AddMaddoxWing from "../../admin_setup_eye_examination_two/maddox_wing/AddMaddoxWing";
import EditMaddoxWing from "../../admin_setup_eye_examination_two/maddox_wing/EditMaddoxWing";
import MidLineCrossing from "../../admin_setup_eye_examination_two/mid_line_crossing/MidLineCrossing";
import AddMidLineCrossing from "../../admin_setup_eye_examination_two/mid_line_crossing/AddMidLineCrossing";
import EditMidLineCrossing from "../../admin_setup_eye_examination_two/mid_line_crossing/EditMidLineCrossing";
import PenGrip from "../../admin_setup_eye_examination_two/pen_grip/PenGrip";
import AddPenGrip from "../../admin_setup_eye_examination_two/pen_grip/AddPenGrip";
import EditPenGrip from "../../admin_setup_eye_examination_two/pen_grip/EditPenGrip";
import Posture from "../../admin_setup_eye_examination_two/posture/Posture";
import AddPosture from "../../admin_setup_eye_examination_two/posture/AddPosture";
import EditPosture from "../../admin_setup_eye_examination_two/posture/EditPosture";
import ColorVision from "../../admin_setup_eye_examination_two/color_vision/ColorVision";
import AddColorVision from "../../admin_setup_eye_examination_two/color_vision/AddColorVision";
import EditColorVision from "../../admin_setup_eye_examination_two/color_vision/EditColorVision";
import Dilate from "../../admin_setup_eye_examination_two/dilate/Dilate";
import AddDilate from "../../admin_setup_eye_examination_two/dilate/AddDilate";
import EditDilate from "../../admin_setup_eye_examination_two/dilate/EditDilate";
import CDDisc from "../../admin_setup_eye_examination_two/cd_disc/CDDisc";
import AddCDDisc from "../../admin_setup_eye_examination_two/cd_disc/AddCDDisc";
import EditCDDisc from "../../admin_setup_eye_examination_two/cd_disc/EditCDDisc";
import MusculoSkeletalExaminationSetup from "./../../admin_setup_mse/mse_setup_mainsidebar/MusculoSkeletalExaminationSetup";
import Movement from "../../admin_setup_mse/movement/Movement";
import AddMovement from "../../admin_setup_mse/movement/AddMovement";
import EditMovement from "../../admin_setup_mse/movement/EditMovement";
import TenderOverSpinusProcessAt from "../../admin_setup_mse/tender_over_spinus_process-at/TenderOverSpinusProcessAt";
import AddTenderOverSpinusProcessAt from "../../admin_setup_mse/tender_over_spinus_process-at/AddTenderOverSpinusProcessAt";
import EditTenderOverSpinusProcessAt from "../../admin_setup_mse/tender_over_spinus_process-at/EditTenderOverSpinusProcessAt";
import TenernessOverFacetJoin from "../../admin_setup_mse/tenerness_over_facet_join/TenernessOverFacetJoin";
import AddTenernessOverFacetJoin from "../../admin_setup_mse/tenerness_over_facet_join/AddTenernessOverFacetJoin";
import EditTenernessOverFacetJoin from "../../admin_setup_mse/tenerness_over_facet_join/EditTenernessOverFacetJoin";
import Inspection from "../../admin_setup_mse/inspection/Inspection";
import AddInspection from "../../admin_setup_mse/inspection/AddInspection";
import EditInspection from "../../admin_setup_mse/inspection/EditInspection";
import SuddenAnaesthesia from "../../admin_setup_mse/sudden_anaesthesia/SuddenAnaesthesia";
import AddSuddenAnaesthesia from "../../admin_setup_mse/sudden_anaesthesia/AddSuddenAnaesthesia";
import EditSuddenAnaesthesia from "../../admin_setup_mse/sudden_anaesthesia/EditSuddenAnaesthesia";
import ThoracicKyphosis from "../../admin_setup_mse/thoracic_kyphosis/ThoracicKyphosis";
import AddThoracicKyphosis from "../../admin_setup_mse/thoracic_kyphosis/AddThoracicKyphosis";
import EditThoracicKyphosis from "../../admin_setup_mse/thoracic_kyphosis/EditThoracicKyphosis";
import LumberLordosis from "../../admin_setup_mse/lumber_lordosis/LumberLordosis";
import AddLumberLordosis from "../../admin_setup_mse/lumber_lordosis/AddLumberLordosis";
import EditLumberLordosis from "../../admin_setup_mse/lumber_lordosis/EditLumberLordosis";
import Spine from "../../admin_setup_mse/spine/Spine";
import AddSpine from "../../admin_setup_mse/spine/AddSpine";
import EditSpine from "../../admin_setup_mse/spine/EditSpine";
import PainIntoKnee from "../../admin_setup_mse/pain_into_knee/PainIntoKnee";
import AddPainIntoKnee from "../../admin_setup_mse/pain_into_knee/AddPainIntoKnee";
import EditPainIntoKnee from "../../admin_setup_mse/pain_into_knee/EditPainIntoKnee";
import AnatomySetUp from "../../admin_setup_anatomy/anatomy_setup_mainsidebar/AnatomySetup";
import ShapeAndContour from "../../admin_setup_mse/shape_&_contour/ShapeAndContour";
import AddShapeAndContour from "../../admin_setup_mse/shape_&_contour/AddShapeAndContour";
import EditShapeAndContour from "../../admin_setup_mse/shape_&_contour/EditShapeAndContour";
import AnteriorView from "../../admin_setup_mse/anterior_view/AnteriorView";
import AddAnteriorView from "../../admin_setup_mse/anterior_view/AddAnteriorView";
import EditAnteriorView from "../../admin_setup_mse/anterior_view/EditAnteriorView";
import LevelOfSpineOfScapula from "../../admin_setup_mse/level_of_spine_of_scapula/LevelOfSpineOfScapula";
import AddLevelOfSpineOfScapula from "../../admin_setup_mse/level_of_spine_of_scapula/AddLevelOfSpineOfScapula";
import EditLevelOfSpineOfScapula from "../../admin_setup_mse/level_of_spine_of_scapula/EditLevelOfSpineOfScapula";
import WingedScapula from "../../admin_setup_mse/winged_scapula/WingedScapula";
import AddWingedScapula from "../../admin_setup_mse/winged_scapula/AddWingedScapula";
import EditWingedScapula from "../../admin_setup_mse/winged_scapula/EditWingedScapula";
import Wrist from "../../admin_setup_mse/wrist/Wrist";
import AddWrist from "../../admin_setup_mse/wrist/AddWrist";
import EditWrist from "../../admin_setup_mse/wrist/EditWrist";
import PatientVitalReading from "../Patients/PatientVitalReading";

import MetacarpophalangealJoint from "../../admin_setup_mse/metacarpophalangeal_joint/MetacarpophalangealJoint";
import AddMetacarpophalangealJoint from "../../admin_setup_mse/metacarpophalangeal_joint/AddMetacarpophalangealJoint";
import EditMetacarpophalangealJoint from "../../admin_setup_mse/metacarpophalangeal_joint/EditMetacarpophalangealJoint";
import ProximalInterphalangealJoint from "../../admin_setup_mse/proximal_interphalangeal_joint/ProximalInterphalangealJoint";
import AddProximalInterphalangealJoint from "../../admin_setup_mse/proximal_interphalangeal_joint/AddProximalInterphalangealJoint";
import EditProximalInterphalangealJoint from "../../admin_setup_mse/proximal_interphalangeal_joint/EditProximalInterphalangealJoint";
import DistalInterphalangealJoint from "../../admin_setup_mse/distal_interphalangeal_joint/DistalInterphalangealJoint";
import AddDistalInterphalangealJoint from "../../admin_setup_mse/distal_interphalangeal_joint/AddDistalInterphalangealJoint";
import EditDistalInterphalangealJoint from "../../admin_setup_mse/distal_interphalangeal_joint/EditDistalInterphalangealJoint";

import MainBodyPart from "../../admin_setup_anatomy/main_body_part/MainBodyPart";
import AddMainBodyPart from "../../admin_setup_anatomy/main_body_part/AddMainBodyPart";
import EditMainBodyPart from "../../admin_setup_anatomy/main_body_part/EditMainBodyPart";

import SubBodyPart from "../../admin_setup_anatomy/sub_body_part/SubBodyPart";
import AddSubBodyPart from "../../admin_setup_anatomy/sub_body_part/AddSubBodyPart";
import EditSubBodyPart from "../../admin_setup_anatomy/sub_body_part/EditSubBodyPart";

import SymptomsAnatomy from "../../admin_setup_anatomy/symptoms_anatomy/SymptomsAnatomy";
import AddSymptomsAnatomy from "../../admin_setup_anatomy/symptoms_anatomy/AddSymptomsAnatomy";
import EditSymptomsAnatomy from "../../admin_setup_anatomy/symptoms_anatomy/EditSymptomsAnatomy";
import LesionMiddle from "../../admin_setup_eye_examination/lesion_middle/LesionMiddle";
import AddLesionMiddle from "../../admin_setup_eye_examination/lesion_middle/AddLesionMiddle";
import EditLesionMiddle from "../../admin_setup_eye_examination/lesion_middle/EditLesionMiddle";

import LesionRight from "../../admin_setup_eye_examination/lesion_right/LesionRight";
import AddLesionRight from "../../admin_setup_eye_examination/lesion_right/AddLesionRight";
import EditLesionRight from "../../admin_setup_eye_examination/lesion_right/EditLesionRight";
import ExternalObservation from "../../admin_setup_eye_examination/external_observation/ExternalObservation";
import AddExternalObservation from "../../admin_setup_eye_examination/external_observation/AddExternalObservation";
import EditExternalObservation from "../../admin_setup_eye_examination/external_observation/EditExternalObservation";
import PhoriaOne from "../../admin_setup_eye_examination/phoria_one/PhoriaOne";
import AddPhoriaOne from "../../admin_setup_eye_examination/phoria_one/AddPhoriaOne";
import EditPhoriaOne from "../../admin_setup_eye_examination/phoria_one/EditPhoriaOne";
import Shape from "../../admin_setup_eye_examination/shape/Shape";
import AddShape from "../../admin_setup_eye_examination/shape/AddShape";
import EditShape from "../../admin_setup_eye_examination/shape/EditShape";
import AddPhoriaTwo from "../../admin_setup_eye_examination/phoria_two/AddPhoriaTwo";
import EditPhoriaTwo from "../../admin_setup_eye_examination/phoria_two/EditPhoriaTwo";
import PhoriaTwo from "../../admin_setup_eye_examination/phoria_two/PhoriaTwo";
import Pursuits from "../../admin_setup_eye_examination/pursuits/Pursuits";
import AddPursuits from "../../admin_setup_eye_examination/pursuits/AddPursuits";
import EditPursuits from "../../admin_setup_eye_examination/pursuits/EditPursuits";
import Saccades from "../../admin_setup_eye_examination/saccades/Saccades";
import AddSaccades from "../../admin_setup_eye_examination/saccades/AddSaccades";
import EditSaccades from "../../admin_setup_eye_examination/saccades/EditSaccades";
import NeuroOpthal from "../../admin_setup_eye_examination/neuro_opthal/NeuroOpthal";
import AddNeuroOpthal from "../../admin_setup_eye_examination/neuro_opthal/AddNeuroOpthal";
import EditNeuroOpthal from "../../admin_setup_eye_examination/neuro_opthal/EditNeuroOpthal";
import NeuroOpthalmology from "../../admin_setup_eye_examination_two/neuro_opthalmology/NeuroOpthalmology";
import AddNeuroOpthalmology from "../../admin_setup_eye_examination_two/neuro_opthalmology/AddNeuroOpthalmology";
import EditNeuroOpthalmology from "../../admin_setup_eye_examination_two/neuro_opthalmology/EditNeuroOpthalmology";
import PenGripRight from "../../admin_setup_eye_examination_two/pen_grip_right/PenGripRight";
import AddPenGripRight from "../../admin_setup_eye_examination_two/pen_grip_right/AddPenGripRight";
import EditPenGripRight from "../../admin_setup_eye_examination_two/pen_grip_right/EditPenGripRight";
import CnsTongue from "../../admin_setup_cns_one/cns_tongue/CnsTongue";
import AddCnsTongue from "../../admin_setup_cns_one/cns_tongue/AddCnsTongue";
import EditCnsTongue from "../../admin_setup_cns_one/cns_tongue/EditCnsTongue";
import OlFactory from "../../admin_setup_cns_one/ol_factory/OlFactory";
import AddOlFactory from "../../admin_setup_cns_one/ol_factory/AddOlFactory";
import EditOlFactory from "../../admin_setup_cns_one/ol_factory/EditOlFactory";
import CnOne from "../../admin_setup_cns_two/cnOne/CnOne";
import AddCnOne from "../../admin_setup_cns_two/cnOne/AddCnOne";
import EditCnOne from "../../admin_setup_cns_two/cnOne/EditCnOne";
import CnTwo from "../../admin_setup_cns_two/cnTwo/CnTwo";
import EditCnTwo from "../../admin_setup_cns_two/cnTwo/EditCnTwo";
import AddCnTwo from "../../admin_setup_cns_two/cnTwo/AddCnTwo";
import CnThree from "../../admin_setup_cns_two/cnThree/CnThree";
import AddCnThree from "../../admin_setup_cns_two/cnThree/AddCnThree";
import EditCnThree from "../../admin_setup_cns_two/cnThree/EditCnThree";
import CnFour from "../../admin_setup_cns_two/cnFour/CnFour";
import AddCnFour from "../../admin_setup_cns_two/cnFour/AddCnFour";
import EditCnFour from "../../admin_setup_cns_two/cnFour/EditCnFour";
import CnFive from "../../admin_setup_cns_two/cnFive/CnFive";
import AddCnFive from "../../admin_setup_cns_two/cnFive/AddCnFive";
import EditCnFive from "../../admin_setup_cns_two/cnFive/EditCnFive";
import CnSix from "../../admin_setup_cns_two/cnSix/CnSix";
import AddCnSix from "../../admin_setup_cns_two/cnSix/AddCnSix";
import EditCnSix from "../../admin_setup_cns_two/cnSix/EditCnSix";
import CnSeven from "../../admin_setup_cns_two/cnSeven/CnSeven";
import AddCnSeven from "../../admin_setup_cns_two/cnSeven/AddCnSeven";
import EditCnSeven from "../../admin_setup_cns_two/cnSeven/EditCnSeven";
import CnEight from "../../admin_setup_cns_two/cnEight/CnEight";
import AddCnEight from "../../admin_setup_cns_two/cnEight/AddCnEight";
import EditCnEight from "../../admin_setup_cns_two/cnEight/EditCnEight";
import CnNine from "../../admin_setup_cns_two/cnNine/CnNine";
import AddCnNine from "../../admin_setup_cns_two/cnNine/AddCnNine";
import EditCnNine from "../../admin_setup_cns_two/cnNine/EditCnNine";
import CnTen from "../../admin_setup_cns_two/cnTen/CnTen";
import AddCnTen from "../../admin_setup_cns_two/cnTen/AddCnTen";
import EditCnTen from "../../admin_setup_cns_two/cnTen/EditCnTen";
import GasReflex from "../../admin_setup_cns_two/gas_reflex/GasReflex";
import AddGasReflex from "../../admin_setup_cns_two/gas_reflex/AddGasReflex";
import EditGasReflex from "../../admin_setup_cns_two/gas_reflex/EditGasReflex";
import AddPower from "../../admin_setup_cns_two/power/AddPower";
import EditPower from "../../admin_setup_cns_two/power/EditPower";
import Power from "../../admin_setup_cns_two/power/Power";
import JerkC1C8 from "../../admin_setup_cns_two/jerk_c1_c8/JerkC1C8";
import AddJerkC1C8 from "../../admin_setup_cns_two/jerk_c1_c8/AddJerkC1C8";
import EditJerkC1C8 from "../../admin_setup_cns_two/jerk_c1_c8/EditJerkC1C8";
import PictureUpperLimbDermatomes from "../../admin_setup_cns_two/picture_upper_imb_dermatomes/PictureUpperLimbDermatomes";
import AddPictureUpperLimbDermatomes from "../../admin_setup_cns_two/picture_upper_imb_dermatomes/AddPictureUpperLimbDermatomes";
import EditPictureUpperLimbDermatomes from "../../admin_setup_cns_two/picture_upper_imb_dermatomes/EditPictureUpperLimbDermatomes";
import FingerNoseTest from "../../admin_setup_cns_two/finger_nose_test/FingerNoseTest";
import AddFingerNoseTest from "../../admin_setup_cns_two/finger_nose_test/AddFingerNoseTest";
import EditFingerNoseTest from "../../admin_setup_cns_two/finger_nose_test/EditFingerNoseTest";
import Uvula from "../../admin_setup_cns_one/uvula/Uvula";
import AddUvula from "../../admin_setup_cns_one/uvula/AddUvula";
import EditUvula from "../../admin_setup_cns_one/uvula/EditUvula";
import NeckMovement from "../../admin_setup_cns_one/neck_movement/NeckMovement";
import AddNeckMovement from "../../admin_setup_cns_one/neck_movement/AddNeckMovement";
import EditNeckMovement from "../../admin_setup_cns_one/neck_movement/EditNeckMovement";
import ShrugShoulder from "../../admin_setup_cns_one/shrug_shoulder/ShrugShoulder";
import AddShrugShoulder from "../../admin_setup_cns_one/shrug_shoulder/AddShrugShoulder";
import EditShrugShoulder from "../../admin_setup_cns_one/shrug_shoulder/EditShrugShoulder";
import Fasciculation from "../../admin_setup_cns_one/fasciculation/Fasciculation";
import AddFasciculation from "../../admin_setup_cns_one/fasciculation/AddFasciculation";
import EditFasciculation from "../../admin_setup_cns_one/fasciculation/EditFasciculation";
import Sensation from "../../admin_setup_cns_one/sensation/Sensation";
import AddSensation from "../../admin_setup_cns_one/sensation/AddSensation";
import EditSensation from "../../admin_setup_cns_one/sensation/EditSensation";
import Pupil from "../../admin_setup_cns_one/pupil/Pupil";
import AddPupil from "../../admin_setup_cns_one/pupil/AddPupil";
import EditPupil from "../../admin_setup_cns_one/pupil/EditPupil";
import PapillaryOedema from "../../admin_setup_cns_one/papillary_oedema/PapillaryOedema";
import AddPapillaryOedema from "../../admin_setup_cns_one/papillary_oedema/AddPapillaryOedema";
import EditPapillaryOedema from "../../admin_setup_cns_one/papillary_oedema/EditPapillaryOedema";
import Sensory from "../../admin_setup_cns_one/sensory/Sensory";
import AddSensory from "../../admin_setup_cns_one/sensory/AddSensory";
import EditSensory from "../../admin_setup_cns_one/sensory/EditSensory";
import RinnesTest from "../../admin_setup_cns_one/pinnes_test/RinnesTest";
import AddRinnesTest from "../../admin_setup_cns_one/pinnes_test/AddRinnesTest";
import EditRinnesTest from "../../admin_setup_cns_one/pinnes_test/EditRinnesTest";
import FundosCopy from "../../admin_setup_cns_one/fundos_copy/FundosCopy";
import AddFundosCopy from "../../admin_setup_cns_one/fundos_copy/AddFundosCopy";
import EditfundosCopy from "../../admin_setup_cns_one/fundos_copy/EditFundosCopy";
import VisualAcuity from "../../admin_setup_cns_one/visual_acuity/VisualAcuity";
import AddVisualAcuity from "../../admin_setup_cns_one/visual_acuity/AddVisualAcuity";
import EditVisualAcuity from "../../admin_setup_cns_one/visual_acuity/EditVisualAcuity";
import VisualField from "../../admin_setup_cns_one/visual_field/VisualField";
import AddVisualField from "../../admin_setup_cns_one/visual_field/AddVisualField";
import EditVisualField from "../../admin_setup_cns_one/visual_field/EditVisualField";
import LightReflex from "../../admin_setup_cns_one/light_reflex/LightReflex";
import AddLightReflex from "../../admin_setup_cns_one/light_reflex/AddLightReflex";
import EditLightReflex from "../../admin_setup_cns_one/light_reflex/EditLightReflex";
import EyeMovements from "../../admin_setup_cns_one/eye_movements/EyeMovements";
import AddEyeMovements from "../../admin_setup_cns_one/eye_movements/AddEyeMovements";
import EditEyeMovements from "../../admin_setup_cns_one/eye_movements/EditEyeMovements";
import LookingUp from "../../admin_setup_cns_one/looking_up/LookingUp";
import AddLookingUp from "../../admin_setup_cns_one/looking_up/AddLookingUp";
import EditLookingUp from "../../admin_setup_cns_one/looking_up/EditLookingUp";
import JawJerk from "../../admin_setup_cns_one/jaw_jerk/JawJerk";
import AddJawJerk from "../../admin_setup_cns_one/jaw_jerk/AddJawJerk";
import EditJawJerk from "../../admin_setup_cns_one/jaw_jerk/EditJawJerk";
import WhisperTest from "../../admin_setup_cns_one/whisper_test/WhisperTest";
import AddWhisperTest from "../../admin_setup_cns_one/whisper_test/AddWhisperTest";
import EditWhisperTest from "../../admin_setup_cns_one/whisper_test/EditWhisperTest";
import Hallpike from "../../admin_setup_cns_one/hallpike/Hallpike";
import AddHallpike from "../../admin_setup_cns_one/hallpike/AddHallpike";
import EditHallpike from "../../admin_setup_cns_one/hallpike/EditHallpike";
import Motor from "../../admin_setup_cns_one/motor/Motor";
import AddMotor from "../../admin_setup_cns_one/motor/AddMotor";
import EditMotor from "../../admin_setup_cns_one/motor/EditMotor";
import LeftValue from "../../admin_setup_cns_two/left_value/LeftValue";
import AddLeftValue from "../../admin_setup_cns_two/left_value/AddLeftValue";
import EditLeftValue from "../../admin_setup_cns_two/left_value/EditLeftValue";
import RightValue from "../../admin_setup_cns_two/right_value/RightValue";
import AddRightValue from "../../admin_setup_cns_two/right_value/AddRightValue";
import EditRightValue from "../../admin_setup_cns_two/right_value/EditRightValue";
import UpperLimb from "../../admin_setup_cns_one/upper_limb/UpperLimb";
import AddUpperLimb from "../../admin_setup_cns_one/upper_limb/AddUpperLimb";
import EditUpperLimb from "../../admin_setup_cns_one/upper_limb/EditUpperLimb";
import TheRadialNerve from "../../admin_setup_cns_one/the_radial_nerve/TheRadialNerve";
import AddTheRadialNerve from "../../admin_setup_cns_one/the_radial_nerve/AddTheRadialNerve";
import EditTheRadialNerve from "../../admin_setup_cns_one/the_radial_nerve/EditTheRadialNerve";
import DroopingCorner from "../../admin_setup_cns_one/drooping_corner/DroopingCorner";
import AddDroopingcornerCorner from "../../admin_setup_cns_one/drooping_corner/AddDroopingCorner";
import EditDroopingcornerCorner from "../../admin_setup_cns_one/drooping_corner/EditDroopingCorner";
import EarPalate from "../../admin_setup_cns_two/ear_palate/EarPalate";
import AddEarPalate from "../../admin_setup_cns_two/ear_palate/AddEarPalate";
import EditEarPalate from "../../admin_setup_cns_two/ear_palate/EditEarPalate";
import OnShuttingEye from "../../admin_setup_cns_one/on_shutting_eye/OnShuttingEye";
import AddOnShuttingEye from "../../admin_setup_cns_one/on_shutting_eye/AddOnShuttingEye";
import EditOnShuttingEye from "../../admin_setup_cns_one/on_shutting_eye/EditOnShuttingEye";
import MheMainSetup from "../../admin_setup_mhe_main/mhe_main_setup_mainsidebar/MheMainSetUp";
import MheOthersSetup from "../../admin_setup_mhe_others/mhe_others_setup_mainsidebar/MheOthersSetUp";
import Appearance from "../../admin_setup_mhe_main/appearance/Appearance";
import AddAppearance from "../../admin_setup_mhe_main/appearance/AddAppearance";
import EditAppearance from "../../admin_setup_mhe_main/appearance/EditAppearance";
import Behaviour from "../../admin_setup_mhe_main/behaviour/Behaviour";
import AddBehaviour from "../../admin_setup_mhe_main/behaviour/AddBehaviour";
import EditBehaviour from "../../admin_setup_mhe_main/behaviour/EditBehaviour";
import AttitudeTowardsExamination from "../../admin_setup_mhe_main/attitude_towards_examination/AttitudeTowardsExamintaion";
import EditAttitudeTowardsExamination from "../../admin_setup_mhe_main/attitude_towards_examination/EditAttitudeTowardsExamintaion";
import AddAttitudeTowardsExamination from "../../admin_setup_mhe_main/attitude_towards_examination/AddAttitudeTowardsExamintaion";
import Mood from "../../admin_setup_mhe_main/mood/Mood";
import AddMood from "../../admin_setup_mhe_main/mood/AddMood";
import EditMood from "../../admin_setup_mhe_main/mood/EditMood";
import Perceptual from "../../admin_setup_mhe_main/perceptual_distrurbances/Perceptual";
import AddPerceptual from "../../admin_setup_mhe_main/perceptual_distrurbances/AddPerceptual";
import EditPerceptual from "../../admin_setup_mhe_main/perceptual_distrurbances/EditPerceptual";
import Affect from "../../admin_setup_mhe_main/affect/Affect";
import AddAffect from "../../admin_setup_mhe_main/affect/AddAffect";
import EditAffect from "../../admin_setup_mhe_main/affect/EditAffect";
import Appropriteness from "../../admin_setup_mhe_main/appropriteness/Appropriteness";
import AddAppropriteness from "../../admin_setup_mhe_main/appropriteness/AddAppropriteness";
import EditAppropriteness from "../../admin_setup_mhe_main/appropriteness/EditAppropriteness";
import Attitute from "../../admin_setup_mhe_main/attitute/Attitute";
import AddAttitute from "../../admin_setup_mhe_main/attitute/AddAttitute";
import EditAttitute from "../../admin_setup_mhe_main/attitute/EditAttitute";
import Speech from "../../admin_setup_mhe_main/speech/Speech";
import AddSpeech from "../../admin_setup_mhe_main/speech/AddSpeech";
import EditSpeech from "../../admin_setup_mhe_main/speech/EditSpeech";
import PHQ9Questionnaire from "../../admin_setup_mhe_others/phq_9_questionnaire/PHQ9Questionnaire";
import AddPHQ9Questionnaire from "../../admin_setup_mhe_others/phq_9_questionnaire/AddPHQ9Questionnaire";
import EditPHQ9Questionnaire from "../../admin_setup_mhe_others/phq_9_questionnaire/EditPHQ9Questionnaire";
import PHQ9QuestionnaireValue from "../../admin_setup_mhe_others/phq_9_questionnaire_value/PHQ9QuestionnaireValue";
import AddPHQ9QuestionnaireValue from "../../admin_setup_mhe_others/phq_9_questionnaire_value/AddPHQ9QuestionnaireValue";
import EditPHQ9QuestionnaireValue from "../../admin_setup_mhe_others/phq_9_questionnaire_value/EditPHQ9QuestionnaireValue";
import GaitLimping from "../../admin_setup_mse/GaitLimping/GaitLimping";
import AddGaitLimping from "../../admin_setup_mse/GaitLimping/AddGaitLimping";
import EditGaitLimping from "../../admin_setup_mse/GaitLimping/EditGaitLimping";
import NeurologicalSetup from "../../admin_setup_neurological_exam/neurological_setup_mainsidebar/NeurologicalSetup";
import ParietalLobe from "../../admin_setup_neurological_exam/parietal_lobe/ParietalLobe";
import AddParietalLobe from "../../admin_setup_neurological_exam/parietal_lobe/AddParietalLobe";
import EditParietalLobe from "../../admin_setup_neurological_exam/parietal_lobe/EditParietalLobe";
import FrontalLobe from "../../admin_setup_neurological_exam/frontal_lobe/FrontalLobe";
import AddFrontalLobe from "../../admin_setup_neurological_exam/frontal_lobe/AddFrontalLobe";
import EditFrontalLobe from "../../admin_setup_neurological_exam/frontal_lobe/EditFrontalLobe";
import TemporalLobe from "../../admin_setup_neurological_exam/temporal_lobe/TemporalLobe";
import AddTemporalLobe from "../../admin_setup_neurological_exam/temporal_lobe/AddTemporalLobe";
import EditTemporalLobe from "../../admin_setup_neurological_exam/temporal_lobe/EditTemporalLobe";
import OccipitalLobe from "../../admin_setup_neurological_exam/occipital_lobe/OccipitalLobe";
import AddOccipitalLobe from "../../admin_setup_neurological_exam/occipital_lobe/AddOccipitalLobe";
import EditOccipitalLobe from "../../admin_setup_neurological_exam/occipital_lobe/EditOccipitalLobe";
import SkinDermatologySetup from "../../admin_setup_skin_dermatology/skin_dermatology_setup_mainsidebar/SkinDermatologySetup";

import AllBodyPartFrontBack from "../../admin_setup_skin_dermatology/all_body_part_front_back/AllBodyPartFrontBack";
import AddAllBodyPartFrontBack from "../../admin_setup_skin_dermatology/all_body_part_front_back/AddAllBodyPartFrontBack";
import EditAllBodyPartFrontBack from "../../admin_setup_skin_dermatology/all_body_part_front_back/EditAllBodyPartFrontBack";
import Areolar from "../../admin_setup_skin_dermatology/areolar/Areolar";
import AddAreolar from "../../admin_setup_skin_dermatology/areolar/AddAreolar";
import EditAreolar from "../../admin_setup_skin_dermatology/areolar/EditAreolar";
import Palpation from "../../admin_setup_skin_dermatology/palpation/Palpation";
import AddPalpation from "../../admin_setup_skin_dermatology/palpation/AddPalpation";
import EditPalpation from "../../admin_setup_skin_dermatology/palpation/EditPalpation";
import Color from "../../admin_setup_skin_dermatology/color_site/Color";
import AddColor from "../../admin_setup_skin_dermatology/color_site/AddColor";
import EditColor from "../../admin_setup_skin_dermatology/color_site/EditColor";
import Temparature from "../../admin_setup_skin_dermatology/temparature/Temparature";
import AddTemparature from "../../admin_setup_skin_dermatology/temparature/AddTemparature";
import EditTemparature from "../../admin_setup_skin_dermatology/temparature/EditTemparature";
import Arrangements from "../../admin_setup_skin_dermatology/arrangements/Arrangements";
import AddArrangements from "../../admin_setup_skin_dermatology/arrangements/AddArrangements";
import EditArrangements from "../../admin_setup_skin_dermatology/arrangements/EditArrangements";
import SkinShape from "../../admin_setup_skin_dermatology/skin_shape/SkinShape";
import AddSkinShape from "../../admin_setup_skin_dermatology/skin_shape/AddSkinShape";
import EditSkinShape from "../../admin_setup_skin_dermatology/skin_shape/EditSkinShape";
import DiagnosisProcedureSetup from "../../admin_setup_diagnosis_procedure/diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetup";
import RadiologySetup from "../../admin_setup_radiology/radiology_setup_mainsidebar/RadiologySetup";
import AppointmentMainSetup from "../../admin_setup_appointment_main/appointment_setup_mainsidebar/AppointmentMainSetup";
import Ear from "../../admin_setup_ent/ear/Ear";
import AddEar from "../../admin_setup_ent/ear/AddEar";
import EditEar from "../../admin_setup_ent/ear/EditEar";
import EarDischarge from "../../admin_setup_ent/ear_discharge/EarDischarge";
import AddEarDischarge from "../../admin_setup_ent/ear_discharge/AddEarDischarge";
import EditEarDischarge from "../../admin_setup_ent/ear_discharge/EditEarDischarge";
import Deafness from "../../admin_setup_ent/deafness/Deafness";
import AddDeafness from "../../admin_setup_ent/deafness/AddDeafness";
import EditDeafness from "../../admin_setup_ent/deafness/EditDeafness";
import EntOthers from "../../admin_setup_ent/ent_others/EntOthers";
import AddEntOthers from "../../admin_setup_ent/ent_others/AddEntOthers";
import EditEntOthers from "../../admin_setup_ent/ent_others/EditEntOthers";
import RenneTest from "../../admin_setup_ent/renne_test/RenneTest";
import AddRenneTest from "../../admin_setup_ent/renne_test/AddRenneTest";
import EditRenneTest from "../../admin_setup_ent/renne_test/EditRenneTest";
import DiagnosisProcedure from "../../admin_setup_diagnosis_procedure/diagnosis_procedure/DiagnosisProcedure";
import AddDiagnosisProcedure from "../../admin_setup_diagnosis_procedure/diagnosis_procedure/AddDiagnosisProcedure";
import EditDiagnosisProcedure from "../../admin_setup_diagnosis_procedure/diagnosis_procedure/EditDiagnosisProcedure";
import DiagnosisProcedureFor from "../../admin_setup_diagnosis_procedure/diagnosis_procedure_for/DiagnosisProcedureFor";
import AddDiagnosisProcedureFor from "../../admin_setup_diagnosis_procedure/diagnosis_procedure_for/AddDiagnosisProcedureFor";
import EditDiagnosisProcedureFor from "../../admin_setup_diagnosis_procedure/diagnosis_procedure_for/EditDiagnosisProcedureFor";
import DiagnosisProcedureActions from "../../admin_setup_diagnosis_procedure/diagnosis_procedure_actions/DiagnosisProcedureActions";
import AddDiagnosisProcedureActions from "../../admin_setup_diagnosis_procedure/diagnosis_procedure_actions/AddDiagnosisProcedureActions";
import EditDiagnosisProcedureActions from "../../admin_setup_diagnosis_procedure/diagnosis_procedure_actions/EditDiagnosisProcedureActions";
import ReviewName from "../../admin_setup_diagnosis_procedure/review_name/ReviewName";
import AddReviewName from "../../admin_setup_diagnosis_procedure/review_name/AddReviewName";
import EditReviewName from "../../admin_setup_diagnosis_procedure/review_name/EditReviewName";
import Ulser from "../../admin_setup_ent/ulser/Ulser";
import AddUlser from "../../admin_setup_ent/ulser/AddUlser";
import EditUlser from "../../admin_setup_ent/ulser/EditUlser";
import Continuous from "../../admin_setup_neurological_exam/continuous/Continuous";
import AddContinuous from "../../admin_setup_neurological_exam/continuous/AddContinuous";
import EditContinuous from "../../admin_setup_neurological_exam/continuous/EditContinuous";
import Intermittent from "../../admin_setup_neurological_exam/intermittent/Intermittent";
import AddIntermittent from "../../admin_setup_neurological_exam/intermittent/AddIntermittent";
import EditIntermittent from "../../admin_setup_neurological_exam/intermittent/EditIntermittent";
import SpeechNurologies from "../../admin_setup_neurological_exam/speech/SpeechNurologies";
import AddSpeechNurologies from "../../admin_setup_neurological_exam/speech/AddSpeechNurologies";
import EditSpeechNurologies from "../../admin_setup_neurological_exam/speech/EditSpeechNurologies";
import InspectionLook from "../../admin_setup_mse/inspection_look/InspectionLook";
import AddInspectionLook from "../../admin_setup_mse/inspection_look/AddInspectionLook";
import EditInspectionLook from "../../admin_setup_mse/inspection_look/EditInspectionLook";
import MoveHipPelvis from "../../admin_setup_mse/move_hip_pelvis/MoveHipPelvis";
import AddMoveHipPelvis from "../../admin_setup_mse/move_hip_pelvis/AddMoveHipPelvis";
import EditMoveHipPelvis from "../../admin_setup_mse/move_hip_pelvis/EditMoveHipPelvis";
import PainAlongAnterior from "../../admin_setup_mse/pain_along_anterior/PainAlongAnterior";
import AddPainAlongAnterior from "../../admin_setup_mse/pain_along_anterior/AddPainAlongAnterior";
import EditPainAlongAnterior from "../../admin_setup_mse/pain_along_anterior/EditPainAlongAnterior";
import PainOverPosterior from "../../admin_setup_mse/pain_over_posterior/PainOverPosterior";
import AddPainOverPosterior from "../../admin_setup_mse/pain_over_posterior/AddPainOverPosterior";
import EditPainOverPosterior from "../../admin_setup_mse/pain_over_posterior/EditPainOverPosterior";
import WalkOnHeels from "../../admin_setup_mse/walk_on_heels/WalkOnHeels";
import AddWalkOnHeels from "../../admin_setup_mse/walk_on_heels/AddWalkOnHeels";
import EditWalkOnHeels from "../../admin_setup_mse/walk_on_heels/EditWalkOnHeels";
import PostureThoraco from "../../admin_setup_mse/posture_thoraco/PostureThoraco";
import AddPostureThoraco from "../../admin_setup_mse/posture_thoraco/AddPostureThoraco";
import EditPostureThoraco from "../../admin_setup_mse/posture_thoraco/EditPostureThoraco";
import TenderOverSpinusThoraco from "../../admin_setup_mse/tender_over_spinus_thoraco/TenderOverSpinusThoraco";
import AddTenderOverSpinusThoraco from "../../admin_setup_mse/tender_over_spinus_thoraco/AddTenderOverSpinusThoraco";
import EditTenderOverSpinusThoraco from "../../admin_setup_mse/tender_over_spinus_thoraco/EditTenderOverSpinusThoraco";
import TendernessOverFacetThoraco from "../../admin_setup_mse/tenderness_over_facet_thoraco/TendernessOverFacetThoraco";
import AddTendernessOverFacetThoraco from "../../admin_setup_mse/tenderness_over_facet_thoraco/AddTendernessOverFacetThoraco";
import EditTendernessOverFacetThoraco from "../../admin_setup_mse/tenderness_over_facet_thoraco/EditTendernessOverFacetThoraco";
import TendernessOverFacetLRBThoraco from "../../admin_setup_mse/tenderness_over_facet_lrb_thoraco/TendernessOverFacetLRBThoraco";
import AddTendernessOverFacetLRBThoraco from "../../admin_setup_mse/tenderness_over_facet_lrb_thoraco/AddTendernessOverFacetLRBThoraco";
import EditTendernessOverFacetLRBThoraco from "../../admin_setup_mse/tenderness_over_facet_lrb_thoraco/EditTendernessOverFacetLRBThoraco";
import LyingOnCouch from "../../admin_setup_mse/lying_on_couch/LyingOnCouch";
import AddLyingOnCouch from "../../admin_setup_mse/lying_on_couch/AddLyingOnCouch";
import EditLyingOnCouch from "../../admin_setup_mse/lying_on_couch/EditLyingOnCouch";
import L1L2HipFlexion from "../../admin_setup_mse/l1_l2_hip_flexion/L1L2HipFlexion";
import AddL1L2HipFlexion from "../../admin_setup_mse/l1_l2_hip_flexion/AddL1L2HipFlexion";
import EditL1L2HipFlexion from "../../admin_setup_mse/l1_l2_hip_flexion/EditL1L2HipFlexion";
import L3ToL5Power from "../../admin_setup_mse/l3_to_l5_power/L3ToL5Power";
import AddL3ToL5Power from "../../admin_setup_mse/l3_to_l5_power/AddL3ToL5Power";
import EditL3ToL5Power from "../../admin_setup_mse/l3_to_l5_power/EditL3ToL5Power";
import L1L2Sensation from "../../admin_setup_mse/l1_l2_sensation/L1L2Sensation";
import AddL1L2Sensation from "../../admin_setup_mse/l1_l2_sensation/AddL1L2Sensation";
import EditL1L2Sensation from "../../admin_setup_mse/l1_l2_sensation/EditL1L2Sensation";
import L3ToL5Sensation from "../../admin_setup_mse/l3_to_l5_sensation/L3ToL5Sensation";
import AddL3ToL5Sensation from "../../admin_setup_mse/l3_to_l5_sensation/AddL3ToL5Sensation";
import EditL3ToL5Sensation from "../../admin_setup_mse/l3_to_l5_sensation/EditL3ToL5Sensation";
import S1ToS4Test from "../../admin_setup_mse/s1_to_s4_test/S1ToS4Test";
import AddS1ToS4Test from "../../admin_setup_mse/s1_to_s4_test/AddS1ToS4Test";
import EditS1ToS4Test from "../../admin_setup_mse/s1_to_s4_test/EditS1ToS4Test";
import ShoulderMovements from "../../admin_setup_mse/shoulder_movements/ShoulderMovements";
import AddShoulderMovements from "../../admin_setup_mse/shoulder_movements/AddShoulderMovements";
import EditShoulderMovements from "../../admin_setup_mse/shoulder_movements/EditShoulderMovements";
import SkinType from "../../admin_setup_skin_dermatology/skin_type/SkinType";
import AddSkinType from "../../admin_setup_skin_dermatology/skin_type/AddSkinType";
import EditSkinType from "../../admin_setup_skin_dermatology/skin_type/EditSkinType";
import SkinSymptoms from "../../admin_setup_skin_dermatology/skin_symptoms/SkinSymptoms";
import AddSkinSymptoms from "../../admin_setup_skin_dermatology/skin_symptoms/AddSkinSymptoms";
import EditSkinSymptoms from "../../admin_setup_skin_dermatology/skin_symptoms/EditSkinSymptoms";
import VolumeWomen from "../../admin_setup_womens_health/volume_women/VolumeWomen";
import AddVolumeWomen from "../../admin_setup_womens_health/volume_women/AddVolumeWomen";
import EditVolumeWomen from "../../admin_setup_womens_health/volume_women/EditVolumeWomen";
import PVBleeding from "../../admin_setup_womens_health/pv_bleeding/PVBleeding";
import AddPVBleeding from "../../admin_setup_womens_health/pv_bleeding/AddPVBleeding";
import EditPVBleeding from "../../admin_setup_womens_health/pv_bleeding/EditPVBleeding";
import WomensHealthSetup from "../../admin_setup_womens_health/womens_health_seup_mainsidebar/WomensHealthSetup";
import PVDischarge from "../../admin_setup_womens_health/pv_discharge/PVDischarge";
import AddPVDischarge from "../../admin_setup_womens_health/pv_discharge/AddPVDischarge";
import EditPVDischarge from "../../admin_setup_womens_health/pv_discharge/EditPVDischarge";
import Vulval from "../../admin_setup_womens_health/vulval/Vulval";
import AddVulval from "../../admin_setup_womens_health/vulval/AddVulval";
import EditVulval from "../../admin_setup_womens_health/vulval/EditVulval";
import Miscarriage from "../../admin_setup_womens_health/miscarriage/Miscarriage";
import AddMiscarriage from "../../admin_setup_womens_health/miscarriage/AddMiscarriage";
import EditMiscarriage from "../../admin_setup_womens_health/miscarriage/EditMiscarriage";
import BreastLump from "../../admin_setup_womens_health/breast_lump/BreastLump";
import AddBreastLump from "../../admin_setup_womens_health/breast_lump/AddBreastLump";
import EditBreastLump from "../../admin_setup_womens_health/breast_lump/EditBreastLump";
import BreastPain from "../../admin_setup_womens_health/breast_pain/BreastPain";
import AddBreastPain from "../../admin_setup_womens_health/breast_pain/AddBreastPain";
import EditBreastPain from "../../admin_setup_womens_health/breast_pain/EditBreastPain";
import BreastNippleDischarge from "../../admin_setup_womens_health/breast_nipple_discharge/BreastNippleDischarge";
import AddBreastNippleDischarge from "../../admin_setup_womens_health/breast_nipple_discharge/AddBreastNippleDischarge";
import EditBreastNippleDischarge from "../../admin_setup_womens_health/breast_nipple_discharge/EditBreastNippleDischarge";
import Vulva from "../../admin_setup_womens_health/vulva/Vulva";
import AddVulva from "../../admin_setup_womens_health/vulva/AddVulva";
import EditVulva from "../../admin_setup_womens_health/vulva/EditVulva";
import PelvicMass from "../../admin_setup_womens_health/pelvic_mass/PelvicMass";
import AddPelvicMass from "../../admin_setup_womens_health/pelvic_mass/AddPelvicMass";
import EditPelvicMass from "../../admin_setup_womens_health/pelvic_mass/EditPelvicMass";
import BartholinGlandes from "../../admin_setup_womens_health/bartholin_glandes/BartholinGlandes";
import AddBartholinGlandes from "../../admin_setup_womens_health/bartholin_glandes/AddBartholinGlandes";
import EditBartholinGlandes from "../../admin_setup_womens_health/bartholin_glandes/EditBartholinGlandes";
import Cervix from "../../admin_setup_womens_health/cervix/Cervix";
import AddCervix from "../../admin_setup_womens_health/cervix/AddCervix";
import EditCervix from "../../admin_setup_womens_health/cervix/EditCervix";
import CST from "../../admin_setup_womens_health/cst/CST";
import AddCST from "../../admin_setup_womens_health/cst/AddCST";
import EditCST from "../../admin_setup_womens_health/cst/EditCST";
import PainfulArc from "../../admin_setup_mse/painful_arc/PainfulArc";
import AddPainfulArc from "../../admin_setup_mse/painful_arc/AddPainfulArc";
import EditPainfulArc from "../../admin_setup_mse/painful_arc/EditPainfulArc";
import ResistedMovement from "../../admin_setup_mse/resisted_movement/ResistedMovement";
import AddResistedMovement from "../../admin_setup_mse/resisted_movement/AddResistedMovement";
import EditResistedMovement from "../../admin_setup_mse/resisted_movement/EditResistedMovement";
import Nails from "../../admin_setup_mse/nails/Nails";
import AddNails from "../../admin_setup_mse/nails/AddNails";
import EditNails from "../../admin_setup_mse/nails/EditNails";
import DorsumOfHand from "../../admin_setup_mse/dorsum_of_hand/DorsumOfHand";
import AddDorsumOfHand from "../../admin_setup_mse/dorsum_of_hand/AddDorsumOfHand";
import EditDorsumOfHand from "../../admin_setup_mse/dorsum_of_hand/EditDorsumOfHand";
import Fingers from "../../admin_setup_mse/fingers/Fingers";
import AddFingers from "../../admin_setup_mse/fingers/AddFingers";
import EditFingers from "../../admin_setup_mse/fingers/EditFingers";
import Tenders from "../../admin_setup_mse/tenders/Tenders";
import AddTenders from "../../admin_setup_mse/tenders/AddTenders";
import EditTenders from "../../admin_setup_mse/tenders/EditTenders";
import FlexonTendons from "../../admin_setup_mse/flexon_tendons/FlexonTendons";
import AddFlexonTendons from "../../admin_setup_mse/flexon_tendons/AddFlexonTendons";
import EditFlexonTendons from "../../admin_setup_mse/flexon_tendons/EditFlexonTendons";
import WristPalpation from "../../admin_setup_mse/wrist_palpation/WristPalpation";
import AddWristPalpation from "../../admin_setup_mse/wrist_palpation/AddWristPalpation";
import EditWristPalpation from "../../admin_setup_mse/wrist_palpation/EditWristPalpation";
import ProximalInterphalangealPalpation from "../../admin_setup_mse/proximal_interphalangeal_joint_palpation/ProximalInterphalangealPalpation";
import AddProximalInterphalangealPalpation from "../../admin_setup_mse/proximal_interphalangeal_joint_palpation/AddProximalInterphalangealPalpation";
import EditProximalInterphalangealPalpation from "../../admin_setup_mse/proximal_interphalangeal_joint_palpation/EditProximalInterphalangealPalpation";
import MetacarpophalangealJointPalpation from "../../admin_setup_mse/metacarpophalangeal_joint_palpation/MetacarpophalangealJointPalpation";
import AddMetacarpophalangealJointPalpation from "../../admin_setup_mse/metacarpophalangeal_joint_palpation/AddMetacarpophalangealJointPalpation";
import EditMetacarpophalangealJointPalpation from "../../admin_setup_mse/metacarpophalangeal_joint_palpation/EditMetacarpophalangealJointPalpation";
import FlexorDigitorumProfundusTest from "../../admin_setup_mse/flexor_digitorum_profundus_test/FlexorDigitorumProfundusTest";
import AddFlexorDigitorumProfundusTest from "../../admin_setup_mse/flexor_digitorum_profundus_test/AddFlexorDigitorumProfundusTest";
import EditFlexorDigitorumProfundusTest from "../../admin_setup_mse/flexor_digitorum_profundus_test/EditFlexorDigitorumProfundusTest";
import FlexorDigitorumSuperficialisTest from "../../admin_setup_mse/flexor_digitorum_superficialis_test/FlexorDigitorumSuperficialisTest";
import AddFlexorDigitorumSuperficialisTest from "../../admin_setup_mse/flexor_digitorum_superficialis_test/AddFlexorDigitorumSuperficialisTest";
import EditFlexorDigitorumSuperficialisTest from "../../admin_setup_mse/flexor_digitorum_superficialis_test/EditFlexorDigitorumSuperficialisTest";
import InspectionMaleFemale from "../../admin_setup_mse/Inspection_male_female/InspectionMaleFemale";
import AddInspectionMaleFemale from "../../admin_setup_mse/Inspection_male_female/AddInspectionMaleFemale";
import EditInspectionMaleFemale from "../../admin_setup_mse/Inspection_male_female/EditInspectionMaleFemale";
import AtFullFlextionPalpation from "../../admin_setup_mse/at-full_flextion_palpation/AtFullFlextionPalpation";
import AddAtFullFlextionPalpation from "../../admin_setup_mse/at-full_flextion_palpation/AddAtFullFlextionPalpation";
import EditAtFullFlextionPalpation from "../../admin_setup_mse/at-full_flextion_palpation/EditAtFullFlextionPalpation";
import At90FlextionPalpation from "../../admin_setup_mse/at_90_flextion_palpation/At90FlextionPalpation";
import AddAt90FlextionPalpation from "../../admin_setup_mse/at_90_flextion_palpation/AddAt90FlextionPalpation";
import EditAt90FlextionPalpation from "../../admin_setup_mse/at_90_flextion_palpation/EditAt90FlextionPalpation";
import Flextion0to150Examination from "../../admin_setup_mse/flextion_0_to_150_examination/Flextion0to150Examination";
import AddFlextion0to150Examination from "../../admin_setup_mse/flextion_0_to_150_examination/AddFlextion0to150Examination";
import EditFlextion0to150Examination from "../../admin_setup_mse/flextion_0_to_150_examination/EditFlextion0to150Examination";
import AnteriorViewKnee from "../../admin_setup_mse/anterior_view_knee/AnteriorViewKnee";
import AddAnteriorViewKnee from "../../admin_setup_mse/anterior_view_knee/AddAnteriorViewKnee";
import EditAnteriorViewKnee from "../../admin_setup_mse/anterior_view_knee/EditAnteriorViewKnee";
import AddPosteriorViewKnee from "../../admin_setup_mse/posterior_view_knee/AddPosteriorViewKnee";
import PosteriorViewKnee from "../../admin_setup_mse/posterior_view_knee/PosteriorViewKnee";
import EditPosteriorViewKnee from "../../admin_setup_mse/posterior_view_knee/EditPosteriorViewKnee";
import LateralViewKnee from "../../admin_setup_mse/lateral_view_knee/LateralViewKnee";
import AddLateralViewKnee from "../../admin_setup_mse/lateral_view_knee/AddLateralViewKnee";
import EditLateralViewKnee from "../../admin_setup_mse/lateral_view_knee/EditLateralViewKnee";
import StanceSwatKnee from "../../admin_setup_mse/stance_swat_knee/StanceSwatKnee";
import AddStanceSwatKnee from "../../admin_setup_mse/stance_swat_knee/AddStanceSwatKnee";
import EditStanceSwatKnee from "../../admin_setup_mse/stance_swat_knee/EditStanceSwatKnee";
import MarginCondyleTibial from "../../admin_setup_mse/margin_condyle_tibial/MarginCondyleTibial";
import AddMarginCondyleTibial from "../../admin_setup_mse/margin_condyle_tibial/AddMarginCondyleTibial";
import EditMarginCondyleTibial from "../../admin_setup_mse/margin_condyle_tibial/EditMarginCondyleTibial";
import ImmunisationSetup from "../../admin_setup_doctors/immunisation_setup_mainsidebar/ImmunisationSetup";
import BillingProvider from "../../admin_setup_doctors/billing_provider/BillingProvider";
import AddBillingProvider from "../../admin_setup_doctors/billing_provider/AddBillingProvider";
import EditBillingProvider from "../../admin_setup_doctors/billing_provider/EditBillingProvider";
import PhysicalActivityPrescriptionSetup from "../../admin_setup_pap/physical_activity_pres_setup_mainsidebar/PhysicalActivityPrescriptionSetup";
import ReminderSetup from "../../admin_setup_pap/reminder_setup_main_sidebar/ReminderSetup";
import CareSetup from "../../admin_setup_pap/care_setup_main_sidebar/CareSetup";
import MedicationChartSetup from "../../admin_setup_pap/medication_setup_main_sidebar/MedicationChartSetup";
import CurrentExcerciseLevel from "../../admin_setup_pap/current_excercise_level/CurrentExcerciseLevel";
import AddCurrentExcerciseLevel from "../../admin_setup_pap/current_excercise_level/AddCurrentExcerciseLevel";
import EditCurrentExcerciseLevel from "../../admin_setup_pap/current_excercise_level/EditCurrentExcerciseLevel";

import ReminderReason from "../../admin_setup_pap/reminder/ReminderReason";
import AddReminderReason from "../../admin_setup_pap/reminder/AddReminderReason";
import EditReminderReason from "../../admin_setup_pap/reminder/EditReminderReason";

import Care from "../../admin_setup_pap/care/Care";
import AddCare from "../../admin_setup_pap/care/AddCare";
import EditCare from "../../admin_setup_pap/care/EditCare";

import Services from "../../admin_setup_pap/services/Services";
import AddServices from "../../admin_setup_pap/services/AddServices";
import EditServices from "../../admin_setup_pap/services/EditServices";

import Unit from "../../admin_setup_pap/unit/Unit";
import AddUnit from "../../admin_setup_pap/unit/AddUnit";
import EditUnit from "../../admin_setup_pap/unit/EditUnit";

import CareDetails from "../../admin_setup_pap/care_details/CareDetails";
import AddCareDetails from "../../admin_setup_pap/care_details/AddCareDetails";
import EditCareDetails from "../../admin_setup_pap/care_details/EditCareDetails";

import AerobicExercise from "../../admin_setup_pap/aerobic_exercise/AerobicExercise";
import AddAerobicExercise from "../../admin_setup_pap/aerobic_exercise/AddAerobicExercise";
import EditAerobicExercise from "../../admin_setup_pap/aerobic_exercise/EditAerobicExercise";
import StrengthBuilding from "../../admin_setup_pap/strength_building/StrengthBuilding";
import AddStrengthBuilding from "../../admin_setup_pap/strength_building/AddStrengthBuilding";
import EditStrengthBuilding from "../../admin_setup_pap/strength_building/EditStrengthBuilding";
import Endurance from "../../admin_setup_pap/endurance/Endurance";
import AddEndurance from "../../admin_setup_pap/endurance/AddEndurance";
import EditEndurance from "../../admin_setup_pap/endurance/EditEndurance";
import FrequencyPhysical from "../../admin_setup_pap/frequency_physical/FrequencyPhysical";
import AddFrequencyPhysical from "../../admin_setup_pap/frequency_physical/AddFrequencyPhysical";
import EditFrequencyPhysical from "../../admin_setup_pap/frequency_physical/EditFrequencyPhysical";
import ToesLeft from "../../admin_setup_mse/toes_left/ToesLeft";
import AddToesLeft from "../../admin_setup_mse/toes_left/AddToesLeft";
import EditToesLeft from "../../admin_setup_mse/toes_left/EditToesLeft";
import MTPJoint from "../../admin_setup_mse/mtp_joint/MTPJoint";
import AddMTPJoint from "../../admin_setup_mse/mtp_joint/AddMTPJoint";
import EditMTPJoint from "../../admin_setup_mse/mtp_joint/EditMTPJoint";
import PIPJoint from "../../admin_setup_mse/pip_joint/PIPJoint";
import AddPIPJoint from "../../admin_setup_mse/pip_joint/AddPIPJoint";
import EditPIPJoint from "../../admin_setup_mse/pip_joint/EditPIPJoint";
import DIPJoint from "../../admin_setup_mse/dip_joint/DIPJoint";
import AddDIPJoint from "../../admin_setup_mse/dip_joint/AddDIPJoint";
import EditDIPJoint from "../../admin_setup_mse/dip_joint/EditDIPJoint";
import ToesRight from "../../admin_setup_mse/toes_right/ToesRight";
import AddToesRight from "../../admin_setup_mse/toes_right/AddToesRight";
import EditToesRight from "../../admin_setup_mse/toes_right/EditToesRight";
import DorsumOfFoot from "../../admin_setup_mse/dorsum_of_foot/DorsumOfFoot";
import AddDorsumOfFoot from "../../admin_setup_mse/dorsum_of_foot/AddDorsumOfFoot";
import EditDorsumOfFoot from "../../admin_setup_mse/dorsum_of_foot/EditDorsumOfFoot";
import EHR from "../Patients/EHR/EHR";
import TenderTenernessOverL1ToL6Thoraco from "../../admin_setup_mse/tender_tenerness_over_l1_to_l6_thoraco/TenderTenernessOverL1ToL6Thoraco";
import AddTenderTenernessOverL1ToL6Thoraco from "../../admin_setup_mse/tender_tenerness_over_l1_to_l6_thoraco/AddTenderTenernessOverL1ToL6Thoraco";
import EditTenderTenernessOverL1ToL6Thoraco from "../../admin_setup_mse/tender_tenerness_over_l1_to_l6_thoraco/EditTenderTenernessOverL1ToL6Thoraco";
import InspectionLookHipPelvis from "../../admin_setup_mse/inspection_look_hip_pelvis/InspectionLookHipPelvis";
import AddInspectionLookHipPelvis from "../../admin_setup_mse/inspection_look_hip_pelvis/AddInspectionLookHipPelvis";
import EditInspectionLookHipPelvis from "../../admin_setup_mse/inspection_look_hip_pelvis/EditInspectionLookHipPelvis";
import TestHipPelvis from "../../admin_setup_mse/test_hip_pelvis/TestHipPelvis";
import AddTestHipPelvis from "../../admin_setup_mse/test_hip_pelvis/AddTestHipPelvis";
import EditTestHipPelvis from "../../admin_setup_mse/test_hip_pelvis/EditTestHipPelvis";
import AutoFill from "../../admin_setup_diagnosis_procedure/auto_fill/AutoFill";
import AddAutoFill from "../../admin_setup_diagnosis_procedure/auto_fill/AddAutoFill";
import EditAutoFill from "../../admin_setup_diagnosis_procedure/auto_fill/EditAutoFill";
import GivenBy from "../../admin_setup_doctors/given_by/GivenBy";
import AddGivenBy from "../../admin_setup_doctors/given_by/AddGivenBy";
import EditGivenBy from "../../admin_setup_doctors/given_by/EditGivenBy";
import BatchNo from "../../admin_setup_doctors/batch_no/BatchNo";
import AddBatchNo from "../../admin_setup_doctors/batch_no/AddBatchNo";
import EditBatchNo from "../../admin_setup_doctors/batch_no/EditBatchNo";
import ImmunisationRoute from "../../admin_setup_doctors/immunisation_route/ImmunisationRoute";
import AddImmunisationRoute from "../../admin_setup_doctors/immunisation_route/AddImmunisationRoute";
import EditImmunisationRoute from "../../admin_setup_doctors/immunisation_route/EditImmunisationRoute";
import ImmunisationSite from "../../admin_setup_doctors/immunisation_site/ImmunisationSite";
import AddImmunisationSite from "../../admin_setup_doctors/immunisation_site/AddImmunisationSite";
import EditImmunisationSite from "../../admin_setup_doctors/immunisation_site/EditImmunisationSite";
import VaccineName from "../../admin_setup_doctors/vaccine_name/VaccineName";
import AddVaccineName from "../../admin_setup_doctors/vaccine_name/AddVaccineName";
import EditVaccineName from "../../admin_setup_doctors/vaccine_name/EditVaccineName";
import VaccineAgainst from "../../admin_setup_doctors/vaccine_against/VaccineAgainst";
import AddVaccineAgainst from "../../admin_setup_doctors/vaccine_against/AddVaccineAgainst";
import EditVaccineAgainst from "../../admin_setup_doctors/vaccine_against/EditVaccineAgainst";
import CodeMustBeCircledReason from "../../admin_setup_pap/code_must_be_circled_reason/CodeMustBeCircledReason";
import AddCodeMustBeCircledReason from "../../admin_setup_pap/code_must_be_circled_reason/AddCodeMustBeCircledReason";
import EditCodeMustBeCircledReason from "../../admin_setup_pap/code_must_be_circled_reason/EditCodeMustBeCircledReason";
import GuidelinesOnlyRecommended from "../../admin_setup_pap/guidelines_only_recommended/GuidelinesOnlyRecommended";
import AddGuidelinesOnlyRecommended from "../../admin_setup_pap/guidelines_only_recommended/AddGuidelinesOnlyRecommended";
import EditGuidelinesOnlyRecommended from "../../admin_setup_pap/guidelines_only_recommended/EditGuidelinesOnlyRecommended";
import PathologySetup from "../../admin_setup_pap/admin_setup_pathology/PathologySetup";
import EditLaboratory from "../../admin_setup_pap/admin_setup_pathology/Laboratory/EditLaboratory";
import LaboratoryMain from "../../admin_setup_pap/admin_setup_pathology/Laboratory/LaboratoryMain";
import AddLaboratoryName from "../../admin_setup_pap/admin_setup_pathology/Laboratory/AddLaboratoryName";
import UserRoleManagement from "../RegForm/UserRoleManagement";
import Institution from "../../admin_setup_appointment/Institution/Institution";
import AddInstitution from "../../admin_setup_appointment/Institution/AddInstitution";
import EditInstitution from "../../admin_setup_appointment/Institution/EditInstitution";
import UserRole from "../RegForm/UserRole/UserRole";
import AddUserRole from "../RegForm/UserRole/AddUserRole";
import EditUserRole from "../RegForm/UserRole/EditUserRole";
import FeaturePermission from "../RegForm/FeaturePermission/FeaturePermission";
import AddFeaturePermission from "../RegForm/FeaturePermission/AddFeaturePermission";
import EditFeaturePermission from "../RegForm/FeaturePermission/EditFeaturePermission";
import Lab_setup from "./Lab_setup/Lab_setup";
import LabTestType from "./Lab_setup/LabTestType";
import AddLabTestType from "./Lab_setup/AddLabTestType";
import EditLabTestType from "./Lab_setup/EditLabTestType";
import LabTestName from "./Lab_setup/LabTestName";
import AddLabTestName from "./Lab_setup/AddLabTestName";
import axios from "axios";
import EditLabTestName from "./Lab_setup/EditLabTestName";
import IschaemicRiskFactor from "../../admin_setup_history/IschaemicRiskFactor/IschaemicRiskFactor";
import AddIschaemicRiskFactor from "../../admin_setup_history/IschaemicRiskFactor/AddIschaemicRiskFactor";
import EditIschaemicRiskFactor from "../../admin_setup_history/IschaemicRiskFactor/EditIschaemicRiskFactor";
import IpdPatient from "../../Nurse/IpdPatient";
import NurseModal from "../../Nurse/NurseModal";
import ProcedureReportSetup from "../../ProcedureReport/ProcedureReportSetup";
import DoctorInboxSetup from "../../DoctorInbox/DoctorInboxSetup";

import ProcedureName from "../../ProcedureReport/ProcedureName";
import AddProcedureName from "../../ProcedureReport/AddProcedureName";
import EditProcedureName from "../../ProcedureReport/EditProcedureName";
import Indication from "../../ProcedureReport/Indication/Indication";
import AddIndication from "../../ProcedureReport/Indication/AddIndication";
import EditIndication from "../../ProcedureReport/Indication/EditIndication";
import Findings from "../../ProcedureReport/Findings/Findings";
import AddFindings from "../../ProcedureReport/Findings/AddFindings";
import EditFindings from "../../ProcedureReport/Findings/EditFindings";
import ProcedureDetails from "../../ProcedureReport/ProcedureDetails/ProcedureDetails";
import AddProcedureDetails from "../../ProcedureReport/ProcedureDetails/AddProcedureDetails";
import EditProcedureDetails from "../../ProcedureReport/ProcedureDetails/EditProcedureDetails";
import Gynecologies from "../../admin_setup_womens_health/gynecologies/Gynecologies";
import AddGynecologies from "../../admin_setup_womens_health/gynecologies/AddGynecologies";
import EditGynecologies from "../../admin_setup_womens_health/gynecologies/EditGynecologies";
import Obstetrics from "../../admin_setup_womens_health/obstetrics/Obstetrics";
import AddObstetrics from "../../admin_setup_womens_health/obstetrics/AddObstetrics";
import EditObstetrics from "../../admin_setup_womens_health/obstetrics/EditObstetrics";
import Breast from "../../admin_setup_womens_health/Breast/Breast";
import AddBreast from "../../admin_setup_womens_health/Breast/AddBreast";
import EditBreast from "../../admin_setup_womens_health/Breast/EditBreast";
import AllSetUp from "./AllSetUp";
import AddItemNumbers from "../../ProcedureReport/ItemNumbers/AddItemNumbers";
import ItemNumbers from "../../ProcedureReport/ItemNumbers/ItemNumbers";
import EditItemNumbers from "../../ProcedureReport/ItemNumbers/EditItemNumbers";
import Incision from "../../ProcedureReport/Incision/Incision";
import AddIncision from "../../ProcedureReport/Incision/AddIncision";
import EditIncision from "../../ProcedureReport/Incision/EditIncision";
import PathologyName from "../../ProcedureReport/PathologySetup/PathologyName";
import AddPathologyName from "../../ProcedureReport/PathologySetup/AddPathologyName";
import EditPathologyName from "../../ProcedureReport/PathologySetup/EditPathologyName";
import DrainName from "../../ProcedureReport/Drain/DrainName";
import AddDrainName from "../../ProcedureReport/Drain/AddDrainName";
import EditDrain from "../../ProcedureReport/Drain/EditDrain";
import AntibioticsName from "../../ProcedureReport/Antibiotics/AntibioticsName";
import AddAntibioticsName from "../../ProcedureReport/Antibiotics/AddAntibioticsName";
import EditAntibiotics from "../../ProcedureReport/Antibiotics/EditAntibiotics";
import BloodLossName from "../../ProcedureReport/BloodLoss/BloodLossName";
import AddBloodLossName from "../../ProcedureReport/BloodLoss/AddBloodLoss";
import EditBloodLoss from "../../ProcedureReport/BloodLoss/EditBloodLoss";
import ObservationName from "../../ProcedureReport/Observation/ObservationName";
import AddObservationName from "../../ProcedureReport/Observation/AddObservationName";
import EditObservation from "../../ProcedureReport/Observation/EditObservation";
import DietName from "../../ProcedureReport/Diet/DietName";
import AddDietName from "../../ProcedureReport/Diet/AddDietName";
import EditDietName from "../../ProcedureReport/Diet/EditDietName";
import AnalgesiaName from "../../ProcedureReport/AnalgesiaSetup/AnalgesiaName";
import AddAnalgesiaName from "../../ProcedureReport/AnalgesiaSetup/AddAnalgesiaName";
import EditAnalgesia from "../../ProcedureReport/AnalgesiaSetup/EditAnalgesia";
import DvtPropName from "../../ProcedureReport/DvtPropSetup/DvtPropName";
import AddDvtPropName from "../../ProcedureReport/DvtPropSetup/AddDvtPropName";
import EditDvtPropName from "../../ProcedureReport/DvtPropSetup/EditDvtPropName";
import AntibioticsTwoName from "../../ProcedureReport/AntibioticsTwoSetup/AntibioticsTwoName";
import AddAntibioticsTwoName from "../../ProcedureReport/AntibioticsTwoSetup/AddAntibioticsTwoName";
import EditAntibioticsTwoName from "../../ProcedureReport/AntibioticsTwoSetup/EditAntibioticsTwo";
import DischargeName from "../../ProcedureReport/DischargeSetup/DischargeName";
import AddDischargeName from "../../ProcedureReport/DischargeSetup/AddDischarge";
import EditDischarge from "../../ProcedureReport/DischargeSetup/EditDischarge";
import FollowupName from "../../ProcedureReport/FollowUpSetup/FollowupName";
import AddFollowupName from "../../ProcedureReport/FollowUpSetup/AddFollowUp.Name";
import EditFollowup from "../../ProcedureReport/FollowUpSetup/EditFollowUp";
import PostOperativeName from "../../ProcedureReport/PostOperativeSetup/PostOperativeName";
import AddPostOpertive from "../../ProcedureReport/PostOperativeSetup/AddPostOpertive";
import EditPastOperative from "../../ProcedureReport/PostOperativeSetup/EditPastOperative";
import EditPostOperative from "../../ProcedureReport/PostOperativeSetup/EditPastOperative";
import GeneralNote from "../../admin_setup_doctors/GeneralNoteSetup/GeneralNote";
import EditGeneralNote from "../../admin_setup_doctors/GeneralNoteSetup/EditGeneralNote";
import AddGeneralNote from "../../admin_setup_doctors/GeneralNoteSetup/AddGeneralNote";
import DrugsNameDetails from "../../admin_setup_doctors/drug_name/DrugsNameDetails";
import LabAgentBilling from "../LabAgent/LabAgentBilling";
import LabAgentApplication from "../LabAgentApplication/LabAgentApplication";
import Tasciculation from "../../admin_setup_cns_one/fasciculation/Fasciculation";
import AddTasciculation from "../../admin_setup_cns_one/fasciculation/AddFasciculation";
import EditTasciculation from "../../admin_setup_cns_one/fasciculation/EditFasciculation";
import LabAgentRateList from "../LabAgentRateList/LabAgentRateList";
import ReportDelivery from "../ReportDelivery/ReportDelivery";
import LabAgentSetup from "../Appointment/GreatDoc/LabAgentSetup/LabAgentSetup";
import RateListCategory from "../Appointment/GreatDoc/LabAgentSetup/RateListCategory/RateListCategory";
import AddRateListCategory from "../Appointment/GreatDoc/LabAgentSetup/RateListCategory/AddRateListCategory";
import EditRateListCategory from "../Appointment/GreatDoc/LabAgentSetup/RateListCategory/EditRateListCategory";
import AllRateList from "../Appointment/GreatDoc/LabAgentSetup/AllRateList/AllRateList";
import AddAllRateList from "../Appointment/GreatDoc/LabAgentSetup/AllRateList/AddAllRateList";
import EditAllRateList from "../Appointment/GreatDoc/LabAgentSetup/AllRateList/EditAllRateList";
import LabAgentList from "../LabAgentApplication/LabAgentList";
import EditLabAgent from "../LabAgentApplication/EditLabAgent";
import LabAgentSampleCollection from "../LabAgent/LabAgentSampleCollection";
import LabAgentSampleSendToLab from "../LabAgent/LabAgentSampleSendToLab";
import LabAgentReportCollection from "../LabAgent/LabAgentReportCollection";
import LabAgentReportDeliveryToPatient from "../LabAgent/LabAgentReportDeliveryToPatient";
import LabAgentPaymentReceive from "../LabAgent/LabAgentPaymentReceive";
import Dashboard from "./Dashboard";
import ReportDeliveryById from "../ReportDelivery/ReportDeliveryById";
import ReportDeliveryList from "../ReportDelivery/ReportDeliveryList";
import MoneyReceiptList from "../ReportDelivery/MoneyReceiptList";
import LabCenterDetails from "../LabModuleNew/LabCenterDetails";
import LabModuleRateList from "../LabModuleNew/LabModuleRateList";
import LabSmsSystem from "../LabModuleNew/LabSmsSystem";
import LabLetterHead from "../LabModuleNew/LabLetterHead";
import LabDoctorsPanel from "../LabModuleNew/LabDoctorsPanel";
import TestCategory from "../LabModuleNew/Setup/TestCategory";
import TestGroup from "../LabModuleNew/Setup/TestGroup";
import TestName from "../LabModuleNew/Setup/TestName";
import TestSubCategories from "../LabModuleNew/Setup/TestSubCategories";
import LabService from "../LabModuleNew/Setup/LabService";
import AddLabService from "../LabModuleNew/Setup/AddLabService";
import EditLabService from "../LabModuleNew/Setup/EditLabService";
import GreatLabBillingNew from "../LabModuleNew/GreatLabBillingNew";
import GreatLabSampleCollection from "../LabModuleNew/GreatLabSampleCollection";
import GreatLabReportCollection from "../LabModuleNew/GreatLabReportCollection";
import GreatLabReportList from "../LabModuleNew/GreatLabReportList";
import GreatLabReportDelivery from "../LabModuleNew/GreatLabReportDelivery";
import GreatLabReportDeliveryList from "../LabModuleNew/GreatLabReportDeliveryList";
import GreatLabMoneyReciept from "../LabModuleNew/GreatLabMoneyReciept";
import GreatLabPaymentRecieve from "../LabModuleNew/GreatLabPaymentRecieve";
import GreatLabReportDeliveryById from "../LabModuleNew/GreatLabReportDeliveryById";
import GreatLabTechnician from "../LabModuleNew/GreatLabTechnician";
import AddLabTest from "../LabModuleNew/Setup/AddLabTest";
import EditLabTest from "../LabModuleNew/Setup/EditLabTest";
import LabTestParameters from "../LabModuleNew/Setup/LabTestParameters";
import GreatLabReport from "../LabModuleNew/GreatLabReport";
import MhpInvoice from "../Billing/Income/MhpInvoice";
import Accounts from "../../admin_setup_billing/account/Accounts";
import AddAccounts from "../../admin_setup_billing/account/AddAcounts";
import EditAccounts from "../../admin_setup_billing/account/EditAccounts";
import AccountsType from "../../admin_setup_billing/accountType/AccountsType";
import AddAccountsType from "../../admin_setup_billing/accountType/AddAccountsType";
import EditAccountsType from "../../admin_setup_billing/accountType/EditAccountsType";
import IncomeSummary from "../Billing/IncomeSummary";
import ExpenseSummary from "../Billing/ExpenseSummary";
import AccountsReport from "../Billing/AccountsReport";
import GreatLabIncomeSummary from "../LabModuleNew/GreatLabIncomeSummary";
import GreatLabExpenseSummary from "../LabModuleNew/GreatLabExpenseSummary";
import GreatLabIncomeExpenseReport from "../LabModuleNew/GreatLabIncomeExpenseReport";
import LabAgentIncomeExpenseSummary from "../LabAgent/LabAgentIncomeExpenseSummary";
import LabAgentExpenseSummary from "../LabAgent/LabAgentExpenseSummary";
import LabAgentIncomeSummary from "../LabAgent/LabAgentIncomeSummary";
import UserTypeAssigin from "../RegForm/User/UserTypeAssigin";
import TestNameConfig from "../LabModuleNew/Setup/TestNameConfig";
import GreatLabReportSendToAnotherLab from "../LabModuleNew/GreatLabReportSendToAnotherLab";
import OnlineAppointment from "../../online-appoinment/OnlineAppoinment";
import HolidayGroup from "../../holiday/HolidayGroup";
import WorkDutiesOnHoliday from "../../work-duties-a-on-a-holiday/WorkDutiesOnHoliday";
import HolidaySubGroup from "../../holiday/HolidaySubGroup";
import AddHolidayGroup from "../../holiday/AddHolidayGroup";
import EditHolidayGroup from "../../holiday/EditHolidayGroup";
import AddHolidaySubGroup from "../../holiday/AddHolidaySubGroup";
import EditHolidaySubGroup from "../../holiday/EditHolidaySubGroup";
import Holiday from "../../holiday/Holiday";
import WeekendHoliday from "../../holiday/WeekendHoliday";
// import AddHolidayWeekend from "../../holiday/AddHolidayWeekend";
// import EditHolidayWeekend from "../../holiday/EditHolidayWeekend";
import ParameterGroup from "../LabModuleNew/Setup/ParameterGroup";
import Specimen from "../LabModuleNew/Setup/Specimen";
import PrescriptionSetup from "../prescription-setup/PrescriptionSetup";
import DoctorAdvice from "../../admin_setup_doctors/doctor-advice/DoctorAdvice";
import PointMaster from "../LabModuleNew/Setup/PointMaster";

import LabPointsPlan from "../LabModuleNew/Setup/LabPointsPlan";
import AddLabPointsPlan from "../LabModuleNew/Setup/AddLabPointsPlan";
import VideoCall from "../../videoCall/VideoCall";
import SMSGateway from "../EmailSMSGateway/SMSGateway";
import EmailGateway from "../EmailSMSGateway/EmailGateway";
import SMSDashboard from "../EmailSMSGateway/SMSDashboard";
import SMSPackage from "../EmailSMSGateway/SMSPackage";
import LabPointsPlanAssign from "../LabModuleNew/Setup/LabPointsPlanAssign";
import LabPointsReport from "../LabModuleNew/Setup/LabPointsReport";
import LabPointsReportDetails from "../LabModuleNew/Setup/LabPointsReportDetails";
import AssignedPointsPlan from "../LabModuleNew/Setup/AssignedPointsPlan";
import GreatLabInventoryMain from "../GreatLabInventory/GreatLabInventoryMain";
import GreatLabInventoryProducts from "../GreatLabInventory/GreatLabInventoryProducts";
import AddGreatLabInventoryProducts from "../GreatLabInventory/AddGreatLabInventoryProducts";
import GreatLabStockInReport from "../GreatLabInventory/GreatLabStockInReport";
import GreatLabStockOutReport from "../GreatLabInventory/GreatLabStockOutReport";
import GreatLabSupplier from "../GreatLabInventory/GreatLabSupplier";
import GreatLabCollectionBooth from "../GreatLabInventory/GreatLabCollectionBooth";
import GreatLabStockLocation from "../GreatLabInventory/GreatLabStockLocation";
import GreatLabBoothDetails from "../GreatLabInventory/GreatLabBoothDetails";
import GreatLabRequisitions from "../GreatLabInventory/GreatLabRequisitions";
import GreatLabRequisitionDetails from "../GreatLabInventory/GreatLabRequisitionDetails";
import GreatLabStockIn from "../GreatLabInventory/GreatLabStockIn";
import GreatLabProductCategory from "../GreatLabInventory/GreatLabProductCategory";
import GreatLabProductSubCategory from "../GreatLabInventory/GreatLabProductSubCategory";
import GreatLabPurchaseIn from "../GreatLabInventory/GreatLabPurchaseIn";
import GreatLabBranch from "../GreatLabInventory/GreatLabBranch";
import GreatLabBranchDetails from "../GreatLabInventory/GreatLabBranchDetails";
import GreatLabBranchRequisitionDetails from "../GreatLabInventory/GreatLabBranchRequisitionDetails";
import GreatLabBoothRequisitions from "../GreatLabInventory/GreatLabBoothRequisitions";
import GreatLabBranchStock from "../GreatLabInventory/GreatLabBranchStock";
import GreatLabBoothStock from "../GreatLabInventory/GreatLabBoothStock";
import GreatLabApprovedRequisitions from "../GreatLabInventory/GreatLabApprovedRequisitions";
import GreatLabBranchStockOut from "../GreatLabInventory/GreatLabBranchStockOut";
import LabPointsRedeem from "../LabModuleNew/Setup/LabPointsRedeem";
import GreatLabBillingReport from "../GreatLabReports/GreatLabBillingReport";
import Summary from "./Summary";
import CollectorSetup from "./CollectorSetup";
import LabRequest from "../LabModuleNew/LabRequest";
import Investigation from "../../DischargeSummary/Investigation/Investigation";
import PainRelief from "../../DischargeSummary/PainRelief/PainRelief";
import Hygiene from "../../DischargeSummary/Hygiene/Hygiene";
import Dressing from "../../DischargeSummary/Dressing/Dressing";
import Exercise from "../../DischargeSummary/Exercise/Exercise";
import WoundCare from "../../DischargeSummary/Wound Care/WoundCare";
import Recommendation from "../../DischargeSummary/Recommendation/Recommendation";
import MarketerSetup from "../LabModuleNew/Setup/MarketerSetup";
import LabDashboard from "../LabModuleNew/LabDashboard";
import Shift from "../LabModuleNew/Setup/Shift";
import PatientAdmission from "../Patients/AddNewPatient/PatientAdmission";
import AnaemicSetup from "../Appointment/GreatDoc/DoctorRoundSetup/AnaemicSetup";
import JaundicedSetup from "../Appointment/GreatDoc/DoctorRoundSetup/JaundicedSetup";
import CyanosisSetup from "../Appointment/GreatDoc/DoctorRoundSetup/CyanosisSetup";
import SkinTurgorSetup from "../Appointment/GreatDoc/DoctorRoundSetup/SkinTurgorSetup";
import Mucositis from "../Appointment/GreatDoc/DoctorRoundSetup/Mucositis";
import CVSSetup from "../Appointment/GreatDoc/DoctorRoundSetup/CVSSetup";
import RoundSkinSetup from "../Appointment/GreatDoc/DoctorRoundSetup/RoundSkinSetup";
import RoundAbdomenSetup from "../Appointment/GreatDoc/DoctorRoundSetup/RoundAbdomenSetup";
import RoundChestSetup from "../Appointment/GreatDoc/DoctorRoundSetup/RoundChestSetup";
import RoundCnsSetup from "../Appointment/GreatDoc/DoctorRoundSetup/RoundCnsSetup";
import RoundPathologyResultSetup from "../Appointment/GreatDoc/DoctorRoundSetup/RoundPathologyResultSetup";
import ListPatientAdmission from "../Patients/AddNewPatient/ListPatientAdmission";
import EditPatientAdmission from "../Patients/AddNewPatient/EditPatientAdmission";
import DoctorTaskCategory from "../Appointment/GreatDoc/PatientAdmissionSetup/DoctorTaskCategory";
import NurseTaskCategory from "../Appointment/GreatDoc/PatientAdmissionSetup/NurseTaskCategory";
import DoctorTask from "../Appointment/GreatDoc/PatientAdmissionSetup/DoctorTask";
import NurseTask from "../Appointment/GreatDoc/PatientAdmissionSetup/NurseTask";
import DrugSinceCategory from "../Appointment/GreatDoc/DoctorRoundSetup/DrugSinceCategory";
import DrugSinceDrugs from "../Appointment/GreatDoc/DoctorRoundSetup/DrugSinceDrugs";
import RoundTreatmentProtocolCycle from "../Appointment/GreatDoc/DoctorRoundSetup/RoundTreatmentProtocolCycle";
import RoundTreatmentProtocolName from "../Appointment/GreatDoc/DoctorRoundSetup/RoundTreatmentProtocolName";
import RoundTreatmentProtocol from "../Appointment/GreatDoc/DoctorRoundSetup/RoundTreatmentProtocol";
export default function Dashboard_content({ perStorageData }) {
  const AppointmentScheduler = lazy(() =>
    import("../Appointment/AppointmentBook/AppointmentScheduler")
  );
  const AllPatients = lazy(() =>
    import("../Patients/AddNewPatient/AllPatients")
  );
  const location = useLocation();
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  const navigate = useNavigate();
  const goToGD = (id, patientId) => {
    navigate(`/great-doc/${id}/${patientId}`);
  };

  const goToPatientProfile = (id) => {
    navigate(`/patients-profile/${id}`);
  };
  const goToPatientEdit = (id) => {
    navigate(`/edit-patients/${id}`);
  };

  const [permissionData, setpermissionData] = useState();

  const [isSuperAdmin, setisSuperAdmin] = useState(false);
  // const location = useLocation();
  const pathNames = location.pathname.split("/");
  console.log(pathNames, "location");

  useEffect(() => {
    if (perStorageData) {
      if (perStorageData.user_type === "Super_Admin") {
        setisSuperAdmin(true);
      } else {
        axios
          .get(`user-role-permission/${perStorageData.id}`)
          .then((res) => {
            console.log("permissionData", res.data);
            setpermissionData(res.data.permission);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }
  }, []);
  return (
    <div className="container-scroller">
      {pathNames[1] !== "video-call" && (
        <Nav_bar
          isSuperAdmin={isSuperAdmin}
          permissionData={permissionData}
        ></Nav_bar>
      )}
      <div className="page-body-wrapper mx-2">
        {/* <Pannel_setting></Pannel_setting> */}
        {pathNames[1] !== "video-call" && (
          <Left_sidebar
            permissionData={permissionData}
            isSuperAdmin={isSuperAdmin}
          ></Left_sidebar>
        )}
        <div className="main-panel">
          <div style={{ minHeight: "86vh" }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  path="video-call/:username/:user_id/:doctorname/:doctor_id"
                  element={<VideoCall />}
                ></Route>
                <Route path="all-setup" element={<AllSetUp />}></Route>
                <Route
                  path="patient-admission"
                  element={<PatientAdmission />}
                ></Route>
                <Route
                  path="patient-admission-list"
                  element={<ListPatientAdmission />}
                ></Route>
                <Route
                  path="patient-admission-edit/:id"
                  element={<EditPatientAdmission />}
                ></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="admin-summary" element={<Summary />}></Route>
                <Route
                  path="main"
                  element={
                    <AppointmentScheduler
                      goToPatientEdit={goToPatientEdit}
                      goToPatientProfile={goToPatientProfile}
                      goToGD={goToGD}
                    ></AppointmentScheduler>
                  }
                ></Route>
                {
                  <>
                    <Route
                      path="appointment"
                      element={
                        <AppointmentScheduler
                          goToPatientEdit={goToPatientEdit}
                          goToPatientProfile={goToPatientProfile}
                          goToGD={goToGD}
                        ></AppointmentScheduler>
                      }
                    ></Route>
                    <Route
                      path="appointment-status"
                      element={<AppointmentStatus />}
                    />
                    <Route
                      path="online-appointment"
                      element={<OnlineAppointment />}
                    ></Route>
                    <Route path="/doctor-list" element={<DoctorList />}></Route>
                    <Route
                      path="appointment-list"
                      element={<AppointmentList />}
                    ></Route>
                    <Route
                      path="patient-card"
                      element={<PatientCard />}
                    ></Route>
                  </>
                }
                {/* <Route path="appointment-setup" element={<AppointmentSetUp />} /> */}
                {
                  <>
                    <Route
                      path="appointment-all-setup"
                      element={<AppointmentMainSetup />}
                    />
                  </>
                }
                <Route
                  path="diagnosis-procedure-setup"
                  element={<DiagnosisProcedureSetup />}
                />
                <Route path="radiology-setup" element={<RadiologySetup />} />
                <Route path="pathology-setup" element={<PathologySetup />} />
                {
                  <>
                    <Route path="history-setup" element={<HistorySetUp />} />
                  </>
                }
                <Route path="ent-setup" element={<EntSetUp />} />
                <Route path="cns-one-setup" element={<CnsOneSetUp />} />
                <Route path="cns-two-setup" element={<CnsTwoSetup />} />
                <Route path="mhe-all-setup" element={<MheMainSetup />} />
                <Route path="mhe-others-setup" element={<MheOthersSetup />} />
                <Route path="mre-setup" element={<MreSetUp />} />
                <Route path="mlh-setup" element={<MlhSetUp />} />
                <Route path="gastro-setup" element={<GastroIntesinalSetup />} />
                <Route
                  path="gastro-urinary-setup"
                  element={<GenitoUrinarySetup />}
                />
                <Route
                  path="general-examination-setup"
                  element={<GeneralExaminationSetup />}
                />
                <Route
                  path="eye-examination-one-setup"
                  element={<EyeExaminationSetup />}
                />
                <Route
                  path="eye-examination-two-setup"
                  element={<EyeExaminationTwoSetup />}
                />
                <Route
                  path="musculo-skeletal-examination-setup"
                  element={<MusculoSkeletalExaminationSetup />}
                />
                <Route
                  path="womens-health-setup"
                  element={<WomensHealthSetup />}
                />
                <Route
                  path="neurological-examination-setup"
                  element={<NeurologicalSetup />}
                />
                <Route
                  path="skin-dermatology-setup"
                  element={<SkinDermatologySetup />}
                />
                {
                  <>
                    <Route path="anatomy-setup" element={<AnatomySetUp />} />
                  </>
                }
                {
                  <>
                    <Route path="doctors-setup" element={<DoctorsSetUp />} />
                  </>
                }
                <Route
                  path="immunisation-setup"
                  element={<ImmunisationSetup />}
                />
                <Route
                  path="physical-activity-prescription-setup"
                  element={<PhysicalActivityPrescriptionSetup />}
                />
                <Route path="reminder-setup" element={<ReminderSetup />} />
                <Route path="care-setup" element={<CareSetup />} />
                <Route
                  path="medication-chart-setup"
                  element={<MedicationChartSetup />}
                />
                <Route path="lab-setup" element={<Lab_setup />} />
                <Route
                  path="procedure-report-setup"
                  element={<ProcedureReportSetup />}
                />
                <Route
                  path="doctor-inbox-setup"
                  element={<DoctorInboxSetup />}
                />
                <Route
                  path="doctors-custom-meidicne-setup"
                  element={<CustomMedicineSetUp />}
                />
                <Route path="all-ingredient" element={<Ingredient />} />
                <Route
                  path="edit-ingredient/:id"
                  element={<EditIngredient />}
                />
                <Route path="add-ingredient" element={<AddIngredient />} />
                <Route path="the-result-is" element={<TheResultIs />} />
                <Route
                  path="edit-the-result-is/:id"
                  element={<EditTheResultIs />}
                />
                <Route path="add-the-result-is" element={<AddTheResultIs />} />
                <Route path="store-result-in" element={<StoreResultIn />} />
                <Route
                  path="edit-store-result-in/:id"
                  element={<EditStoreResultIn />}
                />
                <Route
                  path="add-store-result-in"
                  element={<AddStoreResultIn />}
                />
                <Route path="action-tobe-taken" element={<ActionTobeTaken />} />
                <Route
                  path="edit-action_tobetaken/:id"
                  element={<EditActionTobeTaken />}
                />
                <Route
                  path="add-action-tobe-taken"
                  element={<AddActionTobeTaken />}
                />
                <Route path="all-restriction" element={<Restriction />} />
                <Route
                  path="edit-restriction/:id"
                  element={<EditRestriction />}
                />
                <Route path="add-restriction" element={<AddRestriction />} />
                <Route
                  path="all-medicinecategory"
                  element={<MedicineCategory />}
                />
                <Route
                  path="edit-medicinecategory/:id"
                  element={<EditMedicineCategory />}
                />
                <Route
                  path="add-custom-medicine"
                  element={<AddCustomMedicine />}
                />
                <Route
                  path="edit-general-note/:id"
                  element={<EditGeneralNote />}
                />
                <Route path="add-general-note" element={<AddGeneralNote />} />
                {
                  <>
                    <Route path="billing-setup" element={<BillingSetUp />} />
                  </>
                }
                {
                  <>
                    <Route
                      path="edit-doctors/:id"
                      element={<EditNewDoctors />}
                    ></Route>
                    <Route
                      path="doctors-profile/:id"
                      element={<DoctorsProfile />}
                    ></Route>
                    <Route
                      path="doctors-inbox"
                      element={<DoctorsInbox />}
                    ></Route>
                    <Route
                      path="doctors-chamber"
                      element={<DoctorsChamber />}
                    ></Route>
                    <Route
                      path="add-doctors-chamber"
                      element={<AddDoctorsChamber />}
                    ></Route>
                    <Route
                      path="edit-doctors-chamber/:id"
                      element={<EditDoctorChamber />}
                    ></Route>
                    <Route path="great-doc" element={<GreatDoc />} />
                    <Route
                      path="great-doc/:id/:patientID"
                      element={<GreatDoc />}
                    />
                  </>
                }
                <Route
                  path="prescription-setup"
                  element={<PrescriptionSetup />}
                ></Route>
                <Route path="sms-gateway-setup" element={<SMSGateway />} />
                <Route path="email-gateway-setup" element={<EmailGateway />} />
                <Route path="sms-dashboard" element={<SMSDashboard />} />
                <Route path="sms-package" element={<SMSPackage />} />
                {
                  <>
                    <Route path="employee" element={<Employee />}></Route>
                    <Route path="holiday" element={<Holiday />}></Route>
                    <Route
                      path="holiday-group"
                      element={<HolidayGroup />}
                    ></Route>
                    <Route
                      path="add-holiday-group"
                      element={<AddHolidayGroup />}
                    ></Route>
                    <Route
                      path="edit-holiday-group/:id"
                      element={<EditHolidayGroup />}
                    ></Route>
                    <Route
                      path="holiday-sub-group"
                      element={<HolidaySubGroup />}
                    />
                    <Route
                      path="add-holiday-sub-group"
                      element={<AddHolidaySubGroup />}
                    />
                    <Route
                      path="edit-holiday-sub-group/:id"
                      element={<EditHolidaySubGroup />}
                    ></Route>
                    {/* <Route
                    path="edit-holiday-weekend/:id"
                    element={<EditHolidayWeekend />}
                  ></Route> */}
                    <Route
                      path="weekend-holiday"
                      element={<WeekendHoliday />}
                    ></Route>
                    {/* <Route
                    path="add-weekend-holiday"
                    element={<AddHolidayWeekend />}
                  ></Route> */}

                    <Route
                      path="work-duties-on-holiday"
                      element={<WorkDutiesOnHoliday />}
                    ></Route>
                    <Route
                      path="add-employee"
                      element={<Add_employee />}
                    ></Route>
                    <Route
                      path="edit-employee/:id"
                      element={<Edit_employee />}
                    ></Route>
                    <Route
                      path="employee-profile/:id"
                      element={<Employee_profile />}
                    ></Route>
                  </>
                }
                <Route path="ehr" element={<EHR />}></Route>
                {
                  <>
                    <Route path="patients" element={<AllPatients />}></Route>
                    <Route
                      path="newpatient"
                      element={<NewPatientEntry />}
                    ></Route>
                    <Route
                      path="edit-patients/:id"
                      element={<EditPatient />}
                    ></Route>
                    <Route
                      path="patients-family-social/:id"
                      element={<FamilyHistory />}
                    ></Route>
                    <Route
                      path="patients-profile/:id"
                      element={<PatientProfile />}
                    ></Route>
                    <Route
                      path="vital-sign-setup"
                      element={<VitalSignSetup />}
                    ></Route>
                    {/* <Route path="lab-module" element={<LabModule />}></Route> */}

                    {/* Great Lab  */}
                    <Route path="lab-dashboard" element={<LabDashboard />} />
                    <Route path="lab-module-new" element={<LabModuleMain />}>
                      <Route
                        path="lab-center-details"
                        element={<LabCenterDetails />}
                      />
                      <Route
                        path="lab-rate-list"
                        element={<LabModuleRateList />}
                      />
                      <Route
                        path="lab-letterhead"
                        element={<LabLetterHead />}
                      />
                      <Route path="lab-panels" element={<LabDoctorsPanel />} />
                      <Route path="test-category" element={<TestCategory />} />
                      <Route path="test-group" element={<TestGroup />} />
                      <Route path="test-name" element={<TestName />} />
                      <Route
                        path="test-name-config"
                        element={<TestNameConfig />}
                      />

                      <Route path="add-lab-test" element={<AddLabTest />} />
                      <Route
                        path="edit-lab-test/:id"
                        element={<EditLabTest />}
                      />
                      <Route
                        path="add-lab-parameters/:id"
                        element={<LabTestParameters />}
                      />
                      <Route
                        path="test-sub-category"
                        element={<TestSubCategories />}
                      />
                      <Route
                        path="lab-center-service"
                        element={<LabService />}
                      />
                      <Route
                        path="parameter-group"
                        element={<ParameterGroup />}
                      />
                      <Route path="specimen" element={<Specimen />} />
                      <Route path="shift-setup" element={<Shift />} />
                      <Route path="collector" element={<CollectorSetup />} />
                      <Route
                        path="marketer-setup"
                        element={<MarketerSetup />}
                      />
                      <Route path="point-master" element={<PointMaster />} />

                      <Route path="points-plan" element={<LabPointsPlan />} />
                      <Route
                        path="add-points-plan"
                        element={<AddLabPointsPlan />}
                      />
                      <Route
                        path="lab-points-plan-details/:id"
                        element={<LabPointsPlanAssign />}
                      />
                      <Route
                        path="lab-points-report"
                        element={<LabPointsReport />}
                      />
                      <Route
                        path="lab-points-redeem"
                        element={<LabPointsRedeem />}
                      />
                      <Route
                        path="assigned-points-plan"
                        element={<AssignedPointsPlan />}
                      />
                      <Route
                        path="lab-points-report-details/:id"
                        element={<LabPointsReportDetails />}
                      />
                      <Route
                        path="add-lab-center-service"
                        element={<AddLabService />}
                      />
                      <Route
                        path="edit-lab-center-service/:id"
                        element={<EditLabService />}
                      />
                      <Route path="lab-sms" element={<LabSmsSystem />} />
                    </Route>
                    <Route
                      path="great-lab-inventory"
                      element={<GreatLabInventoryMain />}
                    >
                      <Route
                        path="lab-inventory-products"
                        element={<GreatLabInventoryProducts />}
                      />
                      <Route
                        path="add-lab-inventory-products"
                        element={<AddGreatLabInventoryProducts />}
                      />
                      <Route
                        path="lab-stock-in-report"
                        element={<GreatLabStockInReport />}
                      />
                      <Route
                        path="lab-stock-out-report"
                        element={<GreatLabStockOutReport />}
                      />
                      <Route
                        path="lab-suppliers"
                        element={<GreatLabSupplier />}
                      />
                      <Route
                        path="lab-stock-location"
                        element={<GreatLabStockLocation />}
                      />
                      <Route
                        path="lab-booth"
                        element={<GreatLabCollectionBooth />}
                      />
                      <Route
                        path="lab-booth-stock"
                        element={<GreatLabBoothStock />}
                      />
                      <Route
                        path="central-stock-out"
                        element={<GreatLabApprovedRequisitions />}
                      />
                      <Route path="lab-branch" element={<GreatLabBranch />} />
                      <Route
                        path="lab-branch-stock"
                        element={<GreatLabBranchStock />}
                      />
                      <Route
                        path="lab-branch-stock-out"
                        element={<GreatLabBranchStockOut />}
                      />
                      <Route
                        path="branch-details/:id"
                        element={<GreatLabBranchDetails />}
                      />
                      <Route
                        path="booth-details/:id"
                        element={<GreatLabBoothDetails />}
                      />
                      <Route
                        path="lab-branch-requisition"
                        element={<GreatLabRequisitions />}
                      />
                      <Route
                        path="lab-booth-requisition"
                        element={<GreatLabBoothRequisitions />}
                      />
                      <Route
                        path="lab-stock-in"
                        element={<GreatLabStockIn />}
                      />
                      <Route
                        path="lab-purchase-in"
                        element={<GreatLabPurchaseIn />}
                      />
                      <Route
                        path="lab-requisition-details/:id"
                        element={<GreatLabRequisitionDetails />}
                      />
                      <Route
                        path="branch-requisition-details/:id"
                        element={<GreatLabBranchRequisitionDetails />}
                      />
                      <Route
                        path="lab-product-category"
                        element={<GreatLabProductCategory />}
                      />
                      <Route
                        path="lab-product-sub-category"
                        element={<GreatLabProductSubCategory />}
                      />
                    </Route>

                    <Route
                      path="great-lab-billing"
                      element={<GreatLabBillingNew />}
                    />
                    <Route
                      path="lab-request-from-app"
                      element={<LabRequest />}
                    />
                    <Route
                      path="great-lab-reports"
                      element={<GreatLabBillingReport />}
                    />
                    <Route
                      path="great-lab-sample-collection"
                      element={<GreatLabSampleCollection />}
                    />
                    <Route
                      path="great-lab-report-collection"
                      element={<GreatLabReportCollection />}
                    />
                    <Route
                      path="great-lab-report-list"
                      element={<GreatLabReportList />}
                    />
                    <Route
                      path="great-lab-report-deivery"
                      element={<GreatLabReportDelivery />}
                    />
                    <Route
                      path="great-lab-report-deivery-list"
                      element={<GreatLabReportDeliveryList />}
                    />
                    <Route
                      path="great-lab-report/:id"
                      element={<GreatLabTechnician />}
                    />
                    <Route
                      path="great-lab-technician"
                      element={<GreatLabReport />}
                    />
                    <Route
                      path="great-lab-money-receipt"
                      element={<GreatLabMoneyReciept />}
                    />
                    <Route
                      path="great-lab-payment-receive/:id"
                      element={<GreatLabPaymentRecieve />}
                    />
                    <Route
                      path="great-lab-report-delivery/:id"
                      element={<GreatLabReportDeliveryById />}
                    />
                    <Route
                      path="great-lab-income-summary"
                      element={<GreatLabIncomeSummary />}
                    />
                    <Route
                      path="great-lab-expense-summary"
                      element={<GreatLabExpenseSummary />}
                    />
                    <Route
                      path="great-lab-income-expense-report"
                      element={<GreatLabIncomeExpenseReport />}
                    />
                    {/* <Route
                    path="great-lab-report-send-to-another"
                    // element={<GreatLabReportSendToAnotherLab />}
                  /> */}
                    {/* Great Lab  */}
                    <Route
                      path="allergy-setup"
                      element={<AllergySetup />}
                    ></Route>
                  </>
                }
                {/* Appointment Setup Start */}
                <Route path="ethnicity" element={<Ethnicity />}></Route>
                <Route path="add-ethnicity" element={<AddEthnicity />}></Route>
                <Route
                  path="edit-ethnicity/:id"
                  element={<EditEthnicity />}
                ></Route>
                <Route path="religions" element={<Religions />}></Route>
                <Route path="add-religions" element={<AddReligions />}></Route>
                <Route
                  path="edit-religion/:id"
                  element={<EditReligions />}
                ></Route>
                <Route path="/occupation" element={<Occupation />}></Route>
                <Route
                  path="/add-occupation"
                  element={<Add_occupation />}
                ></Route>
                <Route
                  path="/edit-occupation/:id"
                  element={<Edit_occupation />}
                ></Route>
                <Route path="/country" element={<Country />}></Route>
                <Route path="/add-country" element={<AddCountry />}></Route>
                <Route
                  path="/edit-country/:id"
                  element={<EditCountry />}
                ></Route>
                <Route path="/city" element={<City />}></Route>
                <Route path="/add-city" element={<AddCity />}></Route>
                <Route path="/edit-city/:id" element={<EditCity />}></Route>
                <Route path="/birth-sex" element={<BirthSex />}></Route>
                <Route path="/add-birth-sex" element={<AddBirthSex />}></Route>
                <Route
                  path="/edit-birth-sex/:id"
                  element={<EditBirthSex />}
                ></Route>
                <Route path="/status" element={<Status />}></Route>
                <Route path="/add-status" element={<AddStatus />}></Route>
                <Route path="/edit-status/:id" element={<EditStatus />}></Route>
                <Route path="/all-test" element={<All_test />}></Route>
                <Route path="/add-test" element={<Add_test />}></Route>
                <Route path="/edit-test/:id" element={<Edit_test />}></Route>
                <Route path="/contact-via" element={<ContactVia />}></Route>
                <Route
                  path="/add-contact-via"
                  element={<ContactViaAdd />}
                ></Route>
                <Route
                  path="/edit-contact-via/:id"
                  element={<ContactViaEdit />}
                ></Route>
                <Route path="/title" element={<Title />}></Route>
                <Route path="/add-title" element={<AddTitle />}></Route>
                <Route path="/edit-title/:id" element={<EditTitle />}></Route>
                <Route path="/location" element={<Location />}></Route>
                <Route path="/add-location" element={<Add_location />}></Route>
                <Route
                  path="/edit-location/:id"
                  element={<Edit_location />}
                ></Route>
                <Route path="/all-visit" element={<All_visit />}></Route>
                <Route path="/add-visit" element={<Add_visit />}></Route>
                <Route
                  path="/edit-visitor/:id"
                  element={<Edit_visit />}
                ></Route>
                <Route path="/state" element={<State />}></Route>
                <Route path="/add-state" element={<AddState />}></Route>
                <Route path="/edit-state/:id" element={<EditState />}></Route>
                <Route
                  path="/usual-provider"
                  element={<UsualProvider />}
                ></Route>
                <Route
                  path="/add-usual-provider"
                  element={<AddUsualProvider />}
                ></Route>
                <Route
                  path="/edit-usual-provider/:id"
                  element={<EditUsualProvider />}
                ></Route>
                <Route path="/usual-account" element={<UsualAccount />}></Route>
                <Route
                  path="/add-usual-account"
                  element={<AddUsualAccount />}
                ></Route>
                <Route
                  path="/edit-usual-account/:id"
                  element={<EditUsualAccount />}
                ></Route>
                <Route path="/timesetup" element={<TimeSetup />}></Route>
                <Route path="/add-timesetup" element={<AddTimeSetup />}></Route>
                <Route
                  path="/edit-timesetup/:id"
                  element={<EditTimeSetup />}
                ></Route>
                <Route path="/reaction" element={<Reaction />}></Route>
                <Route path="/add-reaction" element={<AddReaction />}></Route>
                <Route
                  path="/edit-reaction/:id"
                  element={<EditReaction />}
                ></Route>
                <Route path="/blood-group" element={<BloodGroup />}></Route>
                <Route
                  path="/add-blood-group"
                  element={<AddBloodGroup />}
                ></Route>
                <Route
                  path="/edit-blood-group/:id"
                  element={<EditBloodGroup />}
                ></Route>
                <Route path="/vital-unit" element={<VitalSignUnit />}></Route>
                <Route
                  path="/add-vital-unit"
                  element={<AddVitalSignUnit />}
                ></Route>
                <Route
                  path="/edit-vital-unit/:id"
                  element={<EditVitalSignUnit />}
                ></Route>
                <Route
                  path="/diagnosis-procedure"
                  element={<DiagnosisProcedure />}
                ></Route>
                <Route
                  path="/add-diagnosis-procedure"
                  element={<AddDiagnosisProcedure />}
                ></Route>
                <Route
                  path="/edit-diagnosis-procedure/:id"
                  element={<EditDiagnosisProcedure />}
                ></Route>
                <Route
                  path="/diagnosis-procedure-for"
                  element={<DiagnosisProcedureFor />}
                ></Route>
                <Route
                  path="/add-diagnosis-procedure-for"
                  element={<AddDiagnosisProcedureFor />}
                ></Route>
                <Route
                  path="/edit-diagnosis-procedure-for/:id"
                  element={<EditDiagnosisProcedureFor />}
                ></Route>
                <Route
                  path="/diagnosis-procedure-actions"
                  element={<DiagnosisProcedureActions />}
                ></Route>
                <Route
                  path="/add-diagnosis-procedure-actions"
                  element={<AddDiagnosisProcedureActions />}
                ></Route>
                <Route
                  path="/edit-diagnosis-procedure-actions/:id"
                  element={<EditDiagnosisProcedureActions />}
                ></Route>
                <Route
                  path="/radiology-center"
                  element={<RadiologyCenter />}
                ></Route>
                <Route
                  path="/add-radiology-center"
                  element={<AddRadiologyCenter />}
                ></Route>
                <Route
                  path="/edit-radiology-center/:id"
                  element={<EditRadiologyCenter />}
                ></Route>
                <Route
                  path="/pathology-laboratory"
                  element={<LaboratoryMain />}
                ></Route>
                <Route
                  path="/add-laboratory-name"
                  element={<AddLaboratoryName />}
                ></Route>
                <Route
                  path="/edit-laboratory/:id"
                  element={<EditLaboratory />}
                ></Route>
                <Route
                  path="/clinical-indications"
                  element={<ClinicalIndications />}
                ></Route>
                <Route
                  path="/add-clinical-indications"
                  element={<AddClinicalIndications />}
                ></Route>
                <Route
                  path="/add-clinical-details"
                  element={<AddClinicalDetails />}
                ></Route>
                <Route
                  path="/edit-clinical-details/:id"
                  element={<EditClinicalDetails />}
                ></Route>
                <Route
                  path="/favourite-test"
                  element={<FavouriteTest />}
                ></Route>
                <Route
                  path="/add-favourite-test"
                  element={<AddFavouriteTest />}
                ></Route>
                <Route
                  path="/edit-favourite-test/:id"
                  element={<EditFavouriteTest />}
                ></Route>
                <Route path="/review-name" element={<ReviewName />}></Route>
                <Route
                  path="/add-review-name"
                  element={<AddReviewName />}
                ></Route>
                <Route
                  path="/edit-review-name/:id"
                  element={<EditReviewName />}
                ></Route>
                <Route
                  path="/radiology-test-name"
                  element={<RadiologyTestName />}
                ></Route>
                <Route
                  path="/add-radiology-test-name"
                  element={<AddRadiologyTestName />}
                ></Route>
                <Route
                  path="/edit-radiology-test-name/:id"
                  element={<EditRadiologyTestName />}
                ></Route>
                <Route
                  path="/radiology-test-type"
                  element={<RadiologyTestType />}
                ></Route>
                <Route
                  path="/add-radiology-test-type"
                  element={<AddRadiologyTestType />}
                ></Route>
                <Route
                  path="/edit-radiology-test-type/:id"
                  element={<EditRadiologyTestType />}
                ></Route>
                <Route
                  path="/pathalogy-test-name"
                  element={<PathalogyTestName />}
                ></Route>
                <Route path="/add-auto-fill" element={<AddAutoFill />}></Route>
                <Route path="/auto-fill" element={<AutoFill />}></Route>
                <Route
                  path="/edit-auto-fill/:id"
                  element={<EditAutoFill />}
                ></Route>
                {/* Appointment Setup End */}
                {/* Doctor Setup Start*/}
                <Route path="diagnosis" element={<Diagnosis />}></Route>
                <Route path="/add-diagnosis" element={<AddDiagnosis />}></Route>
                <Route
                  path="/edit-diagnosis/:id"
                  element={<EditDiagnosis />}
                ></Route>
                <Route path="doctor-fee" element={<DoctorFee />}></Route>
                <Route
                  path="/add-doctor-fee"
                  element={<AddDoctorFee />}
                ></Route>
                <Route
                  path="/edit-doctor-fee/:id"
                  element={<EditDoctorFee />}
                ></Route>
                <Route path="institution" element={<Institution />}></Route>
                <Route
                  path="/add-institution"
                  element={<AddInstitution />}
                ></Route>
                <Route
                  path="/edit-institution/:id"
                  element={<EditInstitution />}
                ></Route>
                <Route path="user-role" element={<UserRole />}></Route>
                <Route path="/add-user-role" element={<AddUserRole />}></Route>
                <Route
                  path="/edit-user-role/:id"
                  element={<EditUserRole />}
                ></Route>
                <Route
                  path="feature-permission"
                  element={<FeaturePermission />}
                ></Route>
                <Route
                  path="/add-feature-permission"
                  element={<AddFeaturePermission />}
                ></Route>
                <Route
                  path="/edit-feature-permission/:id"
                  element={<EditFeaturePermission />}
                ></Route>
                <Route path="procedure-fee" element={<ProcedureFee />}></Route>
                <Route
                  path="/add-procedure-fee"
                  element={<AddProcedureFee />}
                ></Route>
                <Route
                  path="/edit-procedure-fee/:id"
                  element={<EditProcedureFee />}
                ></Route>
                <Route
                  path="palcconsumption"
                  element={<PastAlcoholConsumption />}
                ></Route>
                <Route
                  path="/add-alcoholconsumption"
                  element={<AddPastAlcoholConsumption />}
                ></Route>
                <Route
                  path="/edit-alcohol-consumption/:id"
                  element={<EditPastAlcoholConsumption />}
                ></Route>
                <Route
                  path="occupational-hazards"
                  element={<OccupationalHazards />}
                ></Route>
                <Route
                  path="/add-occupational-hazards"
                  element={<AddOccupationalHazards />}
                ></Route>
                <Route
                  path="/edit-occupational-hazards/:id"
                  element={<EditOccupationalHazards />}
                ></Route>
                <Route
                  path="current-smoking-history"
                  element={<CurrentSmokingHistory />}
                ></Route>
                <Route
                  path="/add-smoking-histories"
                  element={<AddCurrentSmokingHistory />}
                ></Route>
                <Route
                  path="/edit-smoking-histories/:id"
                  element={<EditCurrentSmokingHistory />}
                ></Route>
                <Route path="/tobacco-type" element={<TobaccoType />}></Route>
                <Route
                  path="/add-tobacco-type"
                  element={<AddTobaccoType />}
                ></Route>
                <Route
                  path="/edit-tobacco-type/:id"
                  element={<EditTobaccoType />}
                ></Route>
                <Route path="/tobacco-cost" element={<TobaccoCost />}></Route>
                <Route
                  path="/add-tobacco-cost"
                  element={<AddTobaccoCost />}
                ></Route>
                <Route
                  path="/edit-tobacco-cost/:id"
                  element={<EditTobaccoCost />}
                ></Route>
                <Route
                  path="/advice-suggestion"
                  element={<AdviceSuggestion />}
                ></Route>
                <Route
                  path="/add-advice-suggestion"
                  element={<AddAdviceSuggestion />}
                ></Route>
                <Route
                  path="/edit-advice-suggestion/:id"
                  element={<EditAdviceSuggestion />}
                ></Route>
                <Route path="/department" element={<Departments />}></Route>
                <Route
                  path="/add-department"
                  element={<AddDepartments />}
                ></Route>
                <Route
                  path="/edit-department/:id"
                  element={<EditDepartments />}
                ></Route>
                <Route
                  path="/diagnosis-action"
                  element={<DiagnosisAction />}
                ></Route>
                <Route
                  path="/add-diagnosis-action"
                  element={<AddDiagnosisAction />}
                ></Route>
                <Route
                  path="/edit-diagnosis-action/:id"
                  element={<EditDiagnosisAction />}
                ></Route>
                <Route path="/generic-name" element={<Generic />}></Route>
                <Route
                  path="/add-generic-name"
                  element={<Add_generic />}
                ></Route>
                <Route
                  path="/edit-generic-name/:id"
                  element={<Edit_generic />}
                ></Route>
                <Route path="/drug-name" element={<DrugsNameDetails />}></Route>
                <Route path="/add-drug-name" element={<AddDrugName />}></Route>
                <Route
                  path="/edit-drug-name/:id"
                  element={<EditDrugName />}
                ></Route>
                <Route path="/drug-unit" element={<DrugUnit />}></Route>
                <Route path="/add-drug-unit" element={<AddDrugUnit />}></Route>
                <Route
                  path="/edit-drug-unit/:id"
                  element={<EditDrugUnit />}
                ></Route>
                <Route
                  path="/immunisation-route"
                  element={<ImmunisationRoute />}
                ></Route>
                <Route
                  path="/add-immunisation-route"
                  element={<AddImmunisationRoute />}
                ></Route>
                <Route
                  path="/edit-immunisation-route/:id"
                  element={<EditImmunisationRoute />}
                ></Route>
                <Route
                  path="/immunisation-site"
                  element={<ImmunisationSite />}
                ></Route>
                <Route
                  path="/add-immunisation-site"
                  element={<AddImmunisationSite />}
                ></Route>
                <Route
                  path="/edit-immunisation-site/:id"
                  element={<EditImmunisationSite />}
                ></Route>
                <Route
                  path="/ischaemic-risk-factor"
                  element={<IschaemicRiskFactor />}
                ></Route>
                <Route
                  path="/add-ischaemic-risk-factor"
                  element={<AddIschaemicRiskFactor />}
                ></Route>
                <Route
                  path="/edit-ischaemic-risk-factor/:id"
                  element={<EditIschaemicRiskFactor />}
                ></Route>
                <Route path="/vaccine-name" element={<VaccineName />}></Route>
                <Route
                  path="/add-vaccine-name"
                  element={<AddVaccineName />}
                ></Route>
                <Route
                  path="/edit-vaccine-name/:id"
                  element={<EditVaccineName />}
                ></Route>
                <Route path="/vaccine-name" element={<VaccineName />}></Route>
                <Route
                  path="/add-vaccine-name"
                  element={<AddVaccineName />}
                ></Route>
                <Route
                  path="/edit-vaccine-name/:id"
                  element={<EditVaccineName />}
                ></Route>
                <Route
                  path="/vaccine-against"
                  element={<VaccineAgainst />}
                ></Route>
                <Route
                  path="/add-vaccine-against"
                  element={<AddVaccineAgainst />}
                ></Route>
                <Route
                  path="/edit-vaccine-against/:id"
                  element={<EditVaccineAgainst />}
                ></Route>
                <Route path="/dose-name" element={<DoseName />}></Route>
                <Route path="/add-dose-name" element={<AddDoseName />}></Route>
                <Route
                  path="/edit-dose-name/:id"
                  element={<EditDoseName />}
                ></Route>
                <Route
                  path="/frequency-name"
                  element={<FrequencyName />}
                ></Route>
                <Route
                  path="/add-frequency-name"
                  element={<AddFrequencyName />}
                ></Route>
                <Route
                  path="/edit-frequency-name/:id"
                  element={<EditFrequencyName />}
                ></Route>
                <Route path="/procedure-name" element={<Procedure />}></Route>
                <Route
                  path="/add-procedure-name"
                  element={<AddProcedure />}
                ></Route>
                <Route
                  path="/edit-procedure-name/:id"
                  element={<EditProcedure />}
                ></Route>
                <Route
                  path="/doctorFee-name"
                  element={<DoctorFeeGroup />}
                ></Route>
                <Route
                  path="/add-doctorFee-name"
                  element={<AddDoctorFeeGroup />}
                ></Route>
                <Route
                  path="/edit-doctorFee-name/:id"
                  element={<EditDoctorFeeGroup />}
                ></Route>
                <Route path="/food-name" element={<FoodName />}></Route>
                <Route path="/add-food-name" element={<AddFoodName />}></Route>
                <Route
                  path="/edit-food-name/:id"
                  element={<EditFoodName />}
                ></Route>
                <Route path="/others-name" element={<OthersName />}></Route>
                <Route
                  path="/add-others-name"
                  element={<AddOthersName />}
                ></Route>
                <Route
                  path="/edit-others-name/:id"
                  element={<EditOthersName />}
                ></Route>
                <Route path="/specialist" element={<Specialist />}></Route>
                <Route
                  path="/add-specialist"
                  element={<AddSpecialist />}
                ></Route>
                <Route
                  path="/edit-specialist/:id"
                  element={<EditSpecialist />}
                ></Route>
                <Route
                  path="/billing-provider"
                  element={<BillingProvider />}
                ></Route>
                <Route
                  path="/add-billing-provider"
                  element={<AddBillingProvider />}
                ></Route>
                <Route
                  path="/edit-billing-provider/:id"
                  element={<EditBillingProvider />}
                ></Route>
                <Route path="/given-by" element={<GivenBy />}></Route>
                <Route path="/add-given-by" element={<AddGivenBy />}></Route>
                <Route
                  path="/edit-given-by/:id"
                  element={<EditGivenBy />}
                ></Route>
                <Route path="/batch-no" element={<BatchNo />}></Route>
                <Route path="/add-batch-no" element={<AddBatchNo />}></Route>
                <Route
                  path="/edit-batch-no/:id"
                  element={<EditBatchNo />}
                ></Route>
                <Route path="/route-name" element={<RouteName />}></Route>
                <Route
                  path="/add-route-name"
                  element={<AddRouteName />}
                ></Route>
                <Route
                  path="/edit-route-name/:id"
                  element={<EditRouteName />}
                ></Route>
                <Route
                  path="/doctor-time-slot"
                  element={<DoctorTimeSlot />}
                ></Route>
                <Route
                  path="/doctor-time-slot-details"
                  element={<DoctorsTimeSlotDetails />}
                ></Route>
                {/* Physical Activity Prescription */}
                <Route
                  path="/current-excercise-level"
                  element={<CurrentExcerciseLevel />}
                ></Route>
                <Route
                  path="/add-current-excercise-level"
                  element={<AddCurrentExcerciseLevel />}
                ></Route>
                <Route
                  path="/edit-current-excercise-level/:id"
                  element={<EditCurrentExcerciseLevel />}
                ></Route>
                <Route
                  path="/aerobic-exercise"
                  element={<AerobicExercise />}
                ></Route>
                <Route
                  path="/add-aerobic-exercise"
                  element={<AddAerobicExercise />}
                ></Route>
                <Route
                  path="/edit-aerobic-exercise/:id"
                  element={<EditAerobicExercise />}
                ></Route>
                <Route
                  path="/strength-building"
                  element={<StrengthBuilding />}
                ></Route>
                <Route
                  path="/add-strength-building"
                  element={<AddStrengthBuilding />}
                ></Route>
                <Route
                  path="/edit-strength-building/:id"
                  element={<EditStrengthBuilding />}
                ></Route>
                <Route path="/endurance" element={<Endurance />}></Route>
                <Route path="/add-endurance" element={<AddEndurance />}></Route>
                <Route
                  path="/edit-endurance/:id"
                  element={<EditEndurance />}
                ></Route>
                <Route
                  path="/frequency-physical"
                  element={<FrequencyPhysical />}
                ></Route>
                <Route
                  path="/add-frequency-physical"
                  element={<AddFrequencyPhysical />}
                ></Route>
                <Route
                  path="/edit-frequency-physical/:id"
                  element={<EditFrequencyPhysical />}
                ></Route>
                <Route
                  path="/reminder-reason"
                  element={<ReminderReason />}
                ></Route>
                <Route
                  path="/round-anaemic-setup"
                  element={<AnaemicSetup />}
                ></Route>
                <Route
                  path="/round-jaundiced-setup"
                  element={<JaundicedSetup />}
                ></Route>
                <Route
                  path="/round-cyanosis-setup"
                  element={<CyanosisSetup />}
                ></Route>
                <Route
                  path="/round-skin-turgor-setup"
                  element={<SkinTurgorSetup />}
                ></Route>
                <Route
                  path="/round-mucositis-setup"
                  element={<Mucositis />}
                ></Route>
                <Route path="/round-cvs-setup" element={<CVSSetup />}></Route>
                <Route
                  path="/round-skin-setup"
                  element={<RoundSkinSetup />}
                ></Route>
                <Route
                  path="/round-abdomen-setup"
                  element={<RoundAbdomenSetup />}
                ></Route>
                <Route
                  path="/round-chest-setup"
                  element={<RoundChestSetup />}
                ></Route>
                <Route
                  path="/round-cns-setup"
                  element={<RoundCnsSetup />}
                ></Route>
                <Route
                  path="/round-radiology-parameter-setup"
                  element={<RoundPathologyResultSetup />}
                ></Route>
                <Route
                  path="/drug-since-category-setup"
                  element={<DrugSinceCategory />}
                ></Route>
                <Route
                  path="/drug-since-drugs-setup"
                  element={<DrugSinceDrugs />}
                ></Route>
                <Route
                  path="/doctor-task-category"
                  element={<DoctorTaskCategory />}
                ></Route>
                <Route
                  path="/nurse-task-category"
                  element={<NurseTaskCategory />}
                ></Route>
                <Route
                  path="/round-treatment-protocol-cycle"
                  element={<RoundTreatmentProtocolCycle />}
                ></Route>
                <Route
                  path="/round-treatment-protocol-name"
                  element={<RoundTreatmentProtocolName />}
                ></Route>
                <Route
                  path="/round-treatment-protocol"
                  element={<RoundTreatmentProtocol />}
                ></Route>
                <Route path="/doctor-task" element={<DoctorTask />}></Route>
                <Route path="/nurse-task" element={<NurseTask />}></Route>
                <Route
                  path="/add-reminder-reason"
                  element={<AddReminderReason />}
                ></Route>
                <Route
                  path="/edit-reminder-reason/:id"
                  element={<EditReminderReason />}
                ></Route>
                <Route path="/care-suggestion" element={<Care />}></Route>
                <Route
                  path="/add-care-suggestion"
                  element={<AddCare />}
                ></Route>
                <Route
                  path="/edit-care-suggestion/:id"
                  element={<EditCare />}
                ></Route>
                <Route path="/care-details" element={<CareDetails />}></Route>
                <Route
                  path="/add-care-details"
                  element={<AddCareDetails />}
                ></Route>
                <Route
                  path="/edit-care-details/:id"
                  element={<EditCareDetails />}
                ></Route>
                {/* lab setup */}
                <Route
                  path="/add_lab_test_type"
                  element={<AddLabTestType />}
                ></Route>
                <Route path="/lab_test_type" element={<LabTestType />}></Route>
                <Route
                  path="/edit-lab-test-type/:id"
                  element={<EditLabTestType />}
                ></Route>
                <Route path="/lab_test_name" element={<LabTestName />}></Route>
                <Route
                  path="/add_lab_test_name"
                  element={<AddLabTestName />}
                ></Route>
                <Route
                  path="/edit-lab-test-name/:id"
                  element={<EditLabTestName />}
                ></Route>
                ==
                {/* proceduresetup */}
                <Route
                  path="/procedure-report-name"
                  element={<ProcedureName />}
                ></Route>
                <Route
                  path="/add-procedure-report-name"
                  element={<AddProcedureName />}
                ></Route>
                <Route
                  path="/edit-procedure-report-name/:id"
                  element={<EditProcedureName />}
                ></Route>
                {/* indication setup */}
                <Route path="/indication" element={<Indication />}></Route>
                <Route
                  path="/add-indication"
                  element={<AddIndication />}
                ></Route>
                <Route
                  path="/edit-indication-name/:id"
                  element={<EditIndication />}
                ></Route>
                {/* findings setup */}
                <Route path="/findings" element={<Findings />}></Route>
                <Route path="/add-findings" element={<AddFindings />}></Route>
                <Route
                  path="/edit-findings-name/:id"
                  element={<EditFindings />}
                ></Route>
                {/* procedure details setup */}
                <Route
                  path="/procedure-details"
                  element={<ProcedureDetails />}
                ></Route>
                <Route
                  path="/add-procedure-details"
                  element={<AddProcedureDetails />}
                ></Route>
                <Route
                  path="/edit-procedure-details/:id"
                  element={<EditProcedureDetails />}
                ></Route>
                {/* item numbers setup */}
                <Route path="/item-numbers" element={<ItemNumbers />}></Route>
                <Route
                  path="/add-item-numbers"
                  element={<AddItemNumbers />}
                ></Route>
                <Route
                  path="/edit-item-numbers-name/:id"
                  element={<EditItemNumbers />}
                ></Route>
                {/* incision */}
                {/* Pathology setup */}
                <Route path="/pathology" element={<PathologyName />}></Route>
                <Route
                  path="/add-pathology"
                  element={<AddPathologyName />}
                ></Route>
                <Route
                  path="/edit-pathology-name/:id"
                  element={<EditPathologyName />}
                ></Route>
                {/* Drain setup */}
                <Route path="/drain" element={<DrainName />}></Route>
                <Route
                  path="/add-drain-name"
                  element={<AddDrainName />}
                ></Route>
                <Route
                  path="/edit-drain-name/:id"
                  element={<EditDrain />}
                ></Route>
                {/* antibiotics */}
                <Route
                  path="/antibiotics"
                  element={<AntibioticsName />}
                ></Route>
                <Route
                  path="/add-antibiotics-name"
                  element={<AddAntibioticsName />}
                ></Route>
                <Route
                  path="/edit-antibiotics-name/:id"
                  element={<EditAntibiotics />}
                ></Route>
                {/* blood loss */}
                <Route path="/blood-loss" element={<BloodLossName />}></Route>
                <Route
                  path="/add-blood-loss-name"
                  element={<AddBloodLossName />}
                ></Route>
                <Route
                  path="/edit-blood-loss-name/:id"
                  element={<EditBloodLoss />}
                ></Route>
                {/* observation */}
                <Route
                  path="/observation"
                  element={<ObservationName />}
                ></Route>
                <Route
                  path="/add-observation-name"
                  element={<AddObservationName />}
                ></Route>
                <Route
                  path="/edit-observation-name/:id"
                  element={<EditObservation />}
                ></Route>
                {/* diet */}
                <Route path="/diet" element={<DietName />}></Route>
                <Route path="/add-diet-name" element={<AddDietName />}></Route>
                <Route
                  path="/edit-diet-name/:id"
                  element={<EditDietName />}
                ></Route>
                {/* analgesia */}
                <Route path="/analgesia" element={<AnalgesiaName />}></Route>
                <Route
                  path="/add-analgesia-name"
                  element={<AddAnalgesiaName />}
                ></Route>
                <Route
                  path="/edit-analgesia-name/:id"
                  element={<EditAnalgesia />}
                ></Route>
                {/* dvt prop */}
                <Route path="/dvt-prop" element={<DvtPropName />}></Route>
                <Route
                  path="/add-dvt-prop-name"
                  element={<AddDvtPropName />}
                ></Route>
                <Route
                  path="/edit-dvt-prop-name/:id"
                  element={<EditDvtPropName />}
                ></Route>
                {/* antibiotics */}
                {/* discharge */}
                <Route path="/discharge" element={<DischargeName />}></Route>
                <Route
                  path="/add-discharge-name"
                  element={<AddDischargeName />}
                ></Route>
                <Route
                  path="/edit-discharge-name/:id"
                  element={<EditDischarge />}
                ></Route>
                {/* followup */}
                <Route
                  path="/add-followup-name"
                  element={<AddFollowupName />}
                ></Route>
                <Route
                  path="/edit-followup-name/:id"
                  element={<EditFollowup />}
                ></Route>
                {/* past operative */}
                <Route
                  path="/post-operative"
                  element={<PostOperativeName />}
                ></Route>
                <Route
                  path="/add-post-operative-name"
                  element={<AddPostOpertive />}
                ></Route>
                <Route
                  path="/edit-post-operative-name/:id"
                  element={<EditPastOperative />}
                ></Route>
                {/* Doctor Setup End*/}
                {/* {Billing Setup Start} */}
                <Route path="/billing" element={<Specialist />}></Route>
                <Route path="/digital" element={<Digital />}></Route>
                <Route path="/add-digital" element={<AddDigital />}></Route>
                <Route
                  path="/edit-digital/:id"
                  element={<EditDigital />}
                ></Route>
                <Route path="/card" element={<Card />}></Route>
                <Route path="/add-card" element={<AddCard />}></Route>
                <Route path="/edit-card/:id" element={<EditCard />}></Route>
                <Route path="/branch" element={<Branch />}></Route>
                <Route path="/add-branch" element={<AddBranch />}></Route>
                <Route path="/edit-branch/:id" element={<EditBranch />}></Route>
                <Route path="/bank" element={<Bank />}></Route>
                <Route path="/add-bank" element={<AddBank />}></Route>
                <Route path="/edit-bank/:id" element={<EditBank />}></Route>
                <Route path="/accounts" element={<Accounts />}></Route>
                <Route path="/add-accounts" element={<AddAccounts />}></Route>
                <Route
                  path="/edit-accounts/:id"
                  element={<EditAccounts />}
                ></Route>
                <Route path="/accounts-type" element={<AccountsType />}></Route>
                <Route
                  path="/add-accounts-type"
                  element={<AddAccountsType />}
                ></Route>
                <Route
                  path="/edit-accounts-type/:id"
                  element={<EditAccountsType />}
                ></Route>
                {/* {Billing Setup End} */}
                {/* Anatomy setup start  */}
                <Route
                  path="/main-body-part"
                  element={<MainBodyPart />}
                ></Route>
                <Route
                  path="/add-main-body-part"
                  element={<AddMainBodyPart />}
                ></Route>
                <Route
                  path="/edit-main-body-part/:id"
                  element={<EditMainBodyPart />}
                ></Route>
                <Route path="/sub-body-part" element={<SubBodyPart />}></Route>
                <Route
                  path="/add-sub-body-part"
                  element={<AddSubBodyPart />}
                ></Route>
                <Route
                  path="/edit-sub-body-part/:id"
                  element={<EditSubBodyPart />}
                ></Route>
                <Route
                  path="/symptoms-anatomy"
                  element={<SymptomsAnatomy />}
                ></Route>
                <Route
                  path="/add-symptoms-anatomy"
                  element={<AddSymptomsAnatomy />}
                ></Route>
                <Route
                  path="/edit-symptoms-anatomy/:id"
                  element={<EditSymptomsAnatomy />}
                ></Route>
                {/* Anatomy setup start  */}
                {/* History && Examination */}
                <Route path="/examination" element={<Examination />}></Route>
                <Route
                  path="/add-examination"
                  element={<AddExamination />}
                ></Route>
                <Route
                  path="/edit-examination/:id"
                  element={<EditExamination />}
                ></Route>
                <Route path="/history" element={<History />}></Route>
                <Route path="/add-history" element={<AddHistory />}></Route>
                <Route
                  path="/edit-history/:id"
                  element={<EditHistory />}
                ></Route>
                <Route
                  path="/history-extension"
                  element={<ExamHistoryExtension />}
                ></Route>
                <Route
                  path="/add-history-extension"
                  element={<AddExamHistoryExtension />}
                ></Route>
                <Route
                  path="/edit-history-extension/:id"
                  element={<EditExamHistoryExtension />}
                ></Route>
                <Route
                  path="/selection-parameter"
                  element={<ExamHistSelectionParam />}
                ></Route>
                <Route
                  path="/add-selection-parameter"
                  element={<AddExamHistSelectionParam />}
                ></Route>
                <Route
                  path="/edit-selection-parameter/:id"
                  element={<EditExamHistSelectionParam />}
                ></Route>
                {/*completed*/}
                <Route path="/carotid" element={<Carotid />}></Route>
                <Route path="/add-carotid" element={<AddCarotid />}></Route>
                <Route
                  path="/edit-carotid/:id"
                  element={<EditCarotid />}
                ></Route>
                <Route
                  path="/selection-criteria"
                  element={<SelectionCriteria />}
                ></Route>
                <Route
                  path="/add-selection-criteria"
                  element={<AddSelectionCriteria />}
                ></Route>
                <Route
                  path="/edit-selection-criteria/:id"
                  element={<EditSelectionCriteria />}
                ></Route>
                <Route
                  path="/exam-history-mapping"
                  element={<ExamHistoryMapping />}
                ></Route>
                <Route
                  path="/add-exam-history-mapping"
                  element={<AddExamHistoryMapping />}
                ></Route>
                <Route
                  path="/edit-exam-history-mapping/:id"
                  element={<EditExamHistoryMapping />}
                ></Route>
                <Route path="/ear-canal" element={<EarCanel />}></Route>
                <Route path="/add-ear-canal" element={<AddEarCanel />}></Route>
                <Route
                  path="/edit-ear-canal/:id"
                  element={<EditEarCanel />}
                ></Route>
                <Route path="/ear-lesion" element={<EarLesion />}></Route>
                <Route
                  path="/add-ear-lesion"
                  element={<AddEarLesion />}
                ></Route>
                <Route
                  path="/edit-ear-lesion/:id"
                  element={<EditEarLesion />}
                ></Route>
                <Route path="/tympanic-membrane" element={<Tympanic />}></Route>
                <Route
                  path="/add-tympanic-membrane"
                  element={<AddTympanic />}
                ></Route>
                <Route
                  path="/edit-tympanic/:id"
                  element={<EditTympanic />}
                ></Route>
                <Route path="/mastoid" element={<Mastoid />}></Route>
                <Route path="/add-mastoid" element={<AddMastoid />}></Route>
                <Route
                  path="/edit-mastoid/:id"
                  element={<EditMastoid />}
                ></Route>
                <Route path="/posterior" element={<Posterior />}></Route>
                <Route path="/add-posterior" element={<AddPosterior />}></Route>
                <Route
                  path="/edit-posterior/:id"
                  element={<EditPosterior />}
                ></Route>
                <Route path="/tunning-fork" element={<Tunning />}></Route>
                <Route path="/add-tunning" element={<AddTunning />}></Route>
                <Route
                  path="/edit-tunning/:id"
                  element={<EditTunning />}
                ></Route>
                <Route path="/weberTest" element={<WeberTest />}></Route>
                <Route path="/add-weberTest" element={<AddWeberTest />}></Route>
                <Route
                  path="/edit-weberTest/:id"
                  element={<EditWeberTest />}
                ></Route>
                <Route path="/throat" element={<Throat />}></Route>
                <Route path="/add-throat" element={<AddThroat />}></Route>
                <Route path="/edit-throat/:id" element={<EditThroat />}></Route>
                <Route path="/ulser" element={<Ulser />}></Route>
                <Route path="/add-ulser" element={<AddUlser />}></Route>
                <Route path="/edit-ulser/:id" element={<EditUlser />}></Route>
                <Route path="/tongue" element={<Tongue />}></Route>
                <Route path="/add-tongue" element={<AddTongue />}></Route>
                <Route path="/edit-tongue/:id" element={<EditTongue />}></Route>
                <Route path="/apex-beat" element={<ApexBeat />}></Route>
                <Route path="/add-apex-beat" element={<AddApexBeat />}></Route>
                <Route
                  path="/edit-apex-beat/:id"
                  element={<EditApexBeat />}
                ></Route>
                <Route
                  path="/intercostal-space"
                  element={<IntercostalSpace />}
                ></Route>
                <Route
                  path="/add-intercostal-space"
                  element={<AddIntercostalSpace />}
                ></Route>
                <Route
                  path="/edit-intercostal-space/:id"
                  element={<EditIntercostalSpace />}
                ></Route>
                <Route
                  path="/history-exam-status"
                  element={<HistoryExamStatus />}
                ></Route>
                <Route
                  path="/add-history-exam-status"
                  element={<AddHistoryExamStatus />}
                ></Route>
                <Route
                  path="/edit-history-exam-status/:id"
                  element={<EditHistoryExamStatus />}
                ></Route>
                <Route path="/heartSound" element={<HeartSound />}></Route>
                <Route
                  path="/add-heartSound"
                  element={<AddHeartSound />}
                ></Route>
                <Route
                  path="/edit-heartSound/:id"
                  element={<EditHeartSound />}
                ></Route>
                <Route path="/volume" element={<Volume />}></Route>
                <Route path="/add-volume" element={<AddVolume />}></Route>
                <Route path="/edit-volume/:id" element={<EditVolume />}></Route>
                <Route path="/rediation" element={<Rediation />}></Route>
                <Route path="/add-rediation" element={<AddRediation />}></Route>
                <Route
                  path="/edit-rediation/:id"
                  element={<EditRediation />}
                ></Route>
                <Route path="/murmur" element={<Murmur />}></Route>
                <Route path="/add-murmur" element={<AddMurmur />}></Route>
                <Route path="/edit-murmur/:id" element={<EditMurmur />}></Route>
                <Route path="/others" element={<Others />}></Route>
                <Route path="/add-others" element={<AddOthers />}></Route>
                <Route path="/edit-others/:id" element={<EditOthers />}></Route>
                <Route path="/cnOne" element={<CnOne />}></Route>
                <Route path="/add-cnOne" element={<AddCnOne />}></Route>
                <Route path="/edit-cnOne/:id" element={<EditCnOne />}></Route>
                <Route path="/cnTwo" element={<CnTwo />}></Route>
                <Route path="/add-cnTwo" element={<AddCnTwo />}></Route>
                <Route path="/edit-cnTwo/:id" element={<EditCnTwo />}></Route>
                <Route path="/cnThree" element={<CnThree />}></Route>
                <Route path="/add-cnThree" element={<AddCnThree />}></Route>
                <Route
                  path="/edit-cnThree/:id"
                  element={<EditCnThree />}
                ></Route>
                <Route path="/cnFive" element={<CnFour />}></Route>
                <Route path="/add-cnFive" element={<AddCnFour />}></Route>
                <Route path="/edit-cnFive/:id" element={<EditCnFour />}></Route>
                <Route path="/cn7" element={<CnFive />}></Route>
                <Route path="/add-cn7" element={<AddCnFive />}></Route>
                <Route path="/edit-cn7/:id" element={<EditCnFive />}></Route>
                <Route path="/cnSix" element={<CnSix />}></Route>
                <Route path="/add-cnSix" element={<AddCnSix />}></Route>
                <Route path="/edit-cnSix/:id" element={<EditCnSix />}></Route>
                <Route path="/cnSeven" element={<CnSeven />}></Route>
                <Route path="/add-cnSeven" element={<AddCnSeven />}></Route>
                <Route
                  path="/edit-cnSeven/:id"
                  element={<EditCnSeven />}
                ></Route>
                <Route path="/cnEight" element={<CnEight />}></Route>
                <Route path="/add-cnEight" element={<AddCnEight />}></Route>
                <Route
                  path="/edit-cnEight/:id"
                  element={<EditCnEight />}
                ></Route>
                <Route path="/cnNine" element={<CnNine />}></Route>
                <Route path="/add-cnNine" element={<AddCnNine />}></Route>
                <Route path="/edit-cnNine/:id" element={<EditCnNine />}></Route>
                <Route path="/cnTen" element={<CnTen />}></Route>
                <Route path="/add-cnTen" element={<AddCnTen />}></Route>
                <Route path="/edit-cnTen/:id" element={<EditCnTen />}></Route>
                <Route path="/gasreflex" element={<GasReflex />}></Route>
                <Route path="/add-gasreflex" element={<AddGasReflex />}></Route>
                <Route
                  path="/edit-gasreflex/:id"
                  element={<EditGasReflex />}
                ></Route>
                <Route path="/power" element={<Power />}></Route>
                <Route path="/add-power" element={<AddPower />}></Route>
                <Route path="/edit-power/:id" element={<EditPower />}></Route>
                <Route path="/jerk-c1-c8" element={<JerkC1C8 />}></Route>
                <Route path="/add-jerk-c1-c8" element={<AddJerkC1C8 />}></Route>
                <Route
                  path="/edit-jerk-c1-c8/:id"
                  element={<EditJerkC1C8 />}
                ></Route>
                <Route
                  path="/finger-nose-test"
                  element={<FingerNoseTest />}
                ></Route>
                <Route
                  path="/add-finger-nose-test"
                  element={<AddFingerNoseTest />}
                ></Route>
                <Route
                  path="/edit-finger-nose-test/:id"
                  element={<EditFingerNoseTest />}
                ></Route>
                <Route
                  path="/picture-upper-limb-dermatomes"
                  element={<PictureUpperLimbDermatomes />}
                ></Route>
                <Route
                  path="/add-picture-upper-limb-dermatomes"
                  element={<AddPictureUpperLimbDermatomes />}
                ></Route>
                <Route
                  path="/edit-picture-upper-limb-dermatomes/:id"
                  element={<EditPictureUpperLimbDermatomes />}
                ></Route>
                <Route path="/uvula" element={<Uvula />}></Route>
                <Route path="/add-uvula" element={<AddUvula />}></Route>
                <Route path="/edit-uvula/:id" element={<EditUvula />}></Route>
                <Route path="/neckmovement" element={<NeckMovement />}></Route>
                <Route
                  path="/add-neckmovement"
                  element={<AddNeckMovement />}
                ></Route>
                <Route
                  path="/edit-neckmovement/:id"
                  element={<EditNeckMovement />}
                ></Route>
                <Route
                  path="/shrugshoulder"
                  element={<ShrugShoulder />}
                ></Route>
                <Route
                  path="/add-shrugshoulder"
                  element={<AddShrugShoulder />}
                ></Route>
                <Route
                  path="/edit-shrugshoulder/:id"
                  element={<EditShrugShoulder />}
                ></Route>
                <Route
                  path="/fasciculation"
                  element={<Fasciculation />}
                ></Route>
                <Route
                  path="/add-fasciculation"
                  element={<AddFasciculation />}
                ></Route>
                <Route
                  path="/edit-fasciculation/:id"
                  element={<EditFasciculation />}
                ></Route>
                <Route path="/sensation" element={<Sensation />}></Route>
                <Route path="/add-sensation" element={<AddSensation />}></Route>
                <Route
                  path="/edit-sensation/:id"
                  element={<EditSensation />}
                ></Route>
                <Route path="/cnstongue" element={<CnsTongue />}></Route>
                <Route path="/add-cnstongue" element={<AddCnsTongue />}></Route>
                <Route
                  path="/edit-cnstongue/:id"
                  element={<EditCnsTongue />}
                ></Route>
                <Route path="/tonsil" element={<Tonsil />}></Route>
                <Route path="/add-tonsil" element={<AddTonsil />}></Route>
                <Route path="/edit-tonsil/:id" element={<EditTonsil />}></Route>
                <Route path="/nose" element={<Nose />}></Route>
                <Route path="/add-nose" element={<AddNose />}></Route>
                <Route path="/edit-nose/:id" element={<EditNose />}></Route>
                <Route path="/tongueLesion" element={<TongueLesion />}></Route>
                <Route
                  path="/add-tongueLesion"
                  element={<AddTongueLesion />}
                ></Route>
                <Route
                  path="/edit-tongueLesion/:id"
                  element={<EditTongueLesion />}
                ></Route>
                <Route path="/ear" element={<Ear />}></Route>
                <Route path="/add-ear" element={<AddEar />}></Route>
                <Route path="/edit-ear/:id" element={<EditEar />}></Route>
                <Route path="/ear-discharge" element={<EarDischarge />}></Route>
                <Route
                  path="/add-ear-discharge"
                  element={<AddEarDischarge />}
                ></Route>
                <Route
                  path="/edit-ear-discharge/:id"
                  element={<EditEarDischarge />}
                ></Route>
                <Route path="/deafness" element={<Deafness />}></Route>
                <Route path="/add-deafness" element={<AddDeafness />}></Route>
                <Route
                  path="/edit-deafness/:id"
                  element={<EditDeafness />}
                ></Route>
                <Route path="/ent-others" element={<EntOthers />}></Route>
                <Route
                  path="/add-ent-others"
                  element={<AddEntOthers />}
                ></Route>
                <Route
                  path="/edit-ent-others/:id"
                  element={<EditEntOthers />}
                ></Route>
                <Route path="/renne-test" element={<RenneTest />}></Route>
                <Route
                  path="/add-renne-test"
                  element={<AddRenneTest />}
                ></Route>
                <Route
                  path="/edit-renne-test/:id"
                  element={<EditRenneTest />}
                ></Route>
                <Route path="/left-value" element={<LeftValue />}></Route>
                <Route
                  path="/add-left-value"
                  element={<AddLeftValue />}
                ></Route>
                <Route
                  path="/edit-left-value/:id"
                  element={<EditLeftValue />}
                ></Route>
                <Route path="/right-value" element={<RightValue />}></Route>
                <Route
                  path="/add-right-value"
                  element={<AddRightValue />}
                ></Route>
                <Route
                  path="/edit-right-value/:id"
                  element={<EditRightValue />}
                ></Route>
                <Route path="/upper-limb" element={<UpperLimb />}></Route>
                <Route
                  path="/add-upper-limb"
                  element={<AddUpperLimb />}
                ></Route>
                <Route
                  path="/edit-upper-limb/:id"
                  element={<EditUpperLimb />}
                ></Route>
                <Route
                  path="/the-radial-nerve"
                  element={<TheRadialNerve />}
                ></Route>
                <Route
                  path="/add-the-radial-nerve"
                  element={<AddTheRadialNerve />}
                ></Route>
                <Route
                  path="/edit-the-radial-nerve/:id"
                  element={<EditTheRadialNerve />}
                ></Route>
                <Route path="/olfactory" element={<OlFactory />}></Route>
                <Route path="/add-olfactory" element={<AddOlFactory />}></Route>
                <Route
                  path="/edit-olfactory/:id"
                  element={<EditOlFactory />}
                ></Route>
                <Route path="/fundoscopy" element={<FundosCopy />}></Route>
                <Route
                  path="/add-fundoscopy"
                  element={<AddFundosCopy />}
                ></Route>
                <Route
                  path="/edit-fundoscopy/:id"
                  element={<EditfundosCopy />}
                ></Route>
                <Route path="/visualacuity" element={<VisualAcuity />}></Route>
                <Route
                  path="/add-visualacuity"
                  element={<AddVisualAcuity />}
                ></Route>
                <Route
                  path="/edit-visualacuity/:id"
                  element={<EditVisualAcuity />}
                ></Route>
                <Route path="/visualfield" element={<VisualField />}></Route>
                <Route
                  path="/add-visualfield"
                  element={<AddVisualField />}
                ></Route>
                <Route
                  path="/edit-visualfield/:id"
                  element={<EditVisualField />}
                ></Route>
                <Route
                  path="/papillaryoedema"
                  element={<PapillaryOedema />}
                ></Route>
                <Route
                  path="/add-papillaryoedema"
                  element={<AddPapillaryOedema />}
                ></Route>
                <Route
                  path="/edit-papillaryoedema/:id"
                  element={<EditPapillaryOedema />}
                ></Route>
                <Route path="/pupil" element={<Pupil />}></Route>
                <Route path="/add-pupil" element={<AddPupil />}></Route>
                <Route path="/edit-pupil/:id" element={<EditPupil />}></Route>
                <Route path="/lightreflex" element={<LightReflex />}></Route>
                <Route
                  path="/add-lightreflex"
                  element={<AddLightReflex />}
                ></Route>
                <Route
                  path="/edit-lightreflex/:id"
                  element={<EditLightReflex />}
                ></Route>
                <Route path="/eyemovements" element={<EyeMovements />}></Route>
                <Route
                  path="/add-eyemovements"
                  element={<AddEyeMovements />}
                ></Route>
                <Route
                  path="/edit-eyemovements/:id"
                  element={<EditEyeMovements />}
                ></Route>
                <Route path="/sensory" element={<Sensory />}></Route>
                <Route path="/add-sensory" element={<AddSensory />}></Route>
                <Route
                  path="/edit-sensory/:id"
                  element={<EditSensory />}
                ></Route>
                <Route path="/jawjerk" element={<JawJerk />}></Route>
                <Route path="/add-jawjerk" element={<AddJawJerk />}></Route>
                <Route
                  path="/edit-jawjerk/:id"
                  element={<EditJawJerk />}
                ></Route>
                <Route path="/lookingup" element={<LookingUp />}></Route>
                <Route path="/add-lookingup" element={<AddLookingUp />}></Route>
                <Route
                  path="/edit-lookingup/:id"
                  element={<EditLookingUp />}
                ></Route>
                <Route
                  path="/droopingcorner"
                  element={<DroopingCorner />}
                ></Route>
                <Route
                  path="/add-droopingcorner"
                  element={<AddDroopingcornerCorner />}
                ></Route>
                <Route
                  path="/edit-droopingcorner/:id"
                  element={<EditDroopingcornerCorner />}
                ></Route>
                <Route path="/earpalate" element={<EarPalate />}></Route>
                <Route path="/add-earpalate" element={<AddEarPalate />}></Route>
                <Route
                  path="/edit-earpalate/:id"
                  element={<EditEarPalate />}
                ></Route>
                <Route path="/hallpike" element={<Hallpike />}></Route>
                <Route path="/add-hallpike" element={<AddHallpike />}></Route>
                <Route
                  path="/edit-hallpike/:id"
                  element={<EditHallpike />}
                ></Route>
                <Route path="/appearance" element={<Appearance />}></Route>
                <Route
                  path="/add-appearance"
                  element={<AddAppearance />}
                ></Route>
                <Route
                  path="/edit-appearance/:id"
                  element={<EditAppearance />}
                ></Route>
                <Route path="/behaviour" element={<Behaviour />}></Route>
                <Route path="/add-behaviour" element={<AddBehaviour />}></Route>
                <Route
                  path="/edit-behaviour/:id"
                  element={<EditBehaviour />}
                ></Route>
                <Route
                  path="/attitude-towards-examination"
                  element={<AttitudeTowardsExamination />}
                ></Route>
                <Route
                  path="/add-attitude-towards-examination"
                  element={<AddAttitudeTowardsExamination />}
                ></Route>
                <Route
                  path="/edit-attitude-towards-examination/:id"
                  element={<EditAttitudeTowardsExamination />}
                ></Route>
                <Route path="/mood" element={<Mood />}></Route>
                <Route path="/add-mood" element={<AddMood />}></Route>
                <Route path="/edit-mood/:id" element={<EditMood />}></Route>
                <Route path="/perceptual" element={<Perceptual />}></Route>
                <Route
                  path="/add-perceptual"
                  element={<AddPerceptual />}
                ></Route>
                <Route
                  path="/edit-perceptual/:id"
                  element={<EditPerceptual />}
                ></Route>
                <Route path="/affect" element={<Affect />}></Route>
                <Route path="/add-affect" element={<AddAffect />}></Route>
                <Route path="/edit-affect/:id" element={<EditAffect />}></Route>
                <Route
                  path="/appropriteness"
                  element={<Appropriteness />}
                ></Route>
                <Route
                  path="/add-appropriteness"
                  element={<AddAppropriteness />}
                ></Route>
                <Route
                  path="/edit-appropriteness/:id"
                  element={<EditAppropriteness />}
                ></Route>
                <Route path="/attitute" element={<Attitute />}></Route>
                <Route path="/add-attitute" element={<AddAttitute />}></Route>
                <Route
                  path="/edit-attitute/:id"
                  element={<EditAttitute />}
                ></Route>
                <Route path="/speech" element={<Speech />}></Route>
                <Route path="/add-speech" element={<AddSpeech />}></Route>
                <Route path="/edit-speech/:id" element={<EditSpeech />}></Route>
                <Route path="/chestshape" element={<ChestShape />}></Route>
                <Route
                  path="/add-chestshape"
                  element={<AddChestShape />}
                ></Route>
                <Route
                  path="/edit-chestshape/:id"
                  element={<EditChestShape />}
                ></Route>
                <Route path="/percussion" element={<Percussion />}></Route>
                <Route
                  path="/add-percussion"
                  element={<AddPercussion />}
                ></Route>
                <Route
                  path="/edit-percussion/:id"
                  element={<EditPercussion />}
                ></Route>
                <Route
                  path="/phq-9-questionnaire"
                  element={<PHQ9Questionnaire />}
                ></Route>
                <Route
                  path="/add-phq-9-questionnaire"
                  element={<AddPHQ9Questionnaire />}
                ></Route>
                <Route
                  path="/edit-phq-9-questionnaire/:id"
                  element={<EditPHQ9Questionnaire />}
                ></Route>
                <Route
                  path="/phq-9-questionnaire-value"
                  element={<PHQ9QuestionnaireValue />}
                ></Route>
                <Route
                  path="/add-phq-9-questionnaire-value"
                  element={<AddPHQ9QuestionnaireValue />}
                ></Route>
                <Route
                  path="/edit-phq-9-questionnaire-value/:id"
                  element={<EditPHQ9QuestionnaireValue />}
                ></Route>
                <Route path="/breathsound" element={<BreathSound />}></Route>
                <Route
                  path="/add-breathsound"
                  element={<AddBreathSound />}
                ></Route>
                <Route
                  path="/edit-breathsound/:id"
                  element={<EditBreathSound />}
                ></Route>
                <Route
                  path="/abnormal-breathing"
                  element={<AbnormalBreathing />}
                ></Route>
                <Route
                  path="/add-abnormal-breathing"
                  element={<AddAbnormalBreathing />}
                ></Route>
                <Route
                  path="/edit-abnormal-breathing/:id"
                  element={<EditAbnormalBreathing />}
                ></Route>
                <Route
                  path="/vocal-fremitus"
                  element={<VocalFremitus />}
                ></Route>
                <Route
                  path="/add-vocal-fremitus"
                  element={<AddVocalFremitus />}
                ></Route>
                <Route
                  path="/edit-vocal-fremitus/:id"
                  element={<EditVocalFremitus />}
                ></Route>
                <Route
                  path="/chest-expansion"
                  element={<ChestExpansion />}
                ></Route>
                <Route
                  path="/add-chest-expansion"
                  element={<AddChestExpansion />}
                ></Route>
                <Route
                  path="/edit-chest-expansion/:id"
                  element={<EditChestExpansion />}
                ></Route>
                <Route path="/wheering" element={<Wheering />}></Route>
                <Route path="/add-wheering" element={<AddWheering />}></Route>
                <Route
                  path="/edit-wheering/:id"
                  element={<EditWheering />}
                ></Route>
                <Route
                  path="/vocal-resonance"
                  element={<VocalResonance />}
                ></Route>
                <Route
                  path="/add-vocal-resonance"
                  element={<AddVocalResonance />}
                ></Route>
                <Route
                  path="/edit-vocal-resonance/:id"
                  element={<EditVocalResonance />}
                ></Route>
                <Route path="/pembertons" element={<Pembertons />}></Route>
                <Route
                  path="/add-pembertons"
                  element={<AddPembertons />}
                ></Route>
                <Route
                  path="/edit-pembertons/:id"
                  element={<EditPembertons />}
                ></Route>
                <Route path="/symptoms" element={<Symptoms />}></Route>
                <Route path="/add-symptoms" element={<AddSymptoms />}></Route>
                <Route
                  path="/edit-symptoms/:id"
                  element={<EditSymptoms />}
                ></Route>
                <Route path="/crepitation" element={<Crepitation />}></Route>
                <Route
                  path="/add-crepitation"
                  element={<AddCrepitation />}
                ></Route>
                <Route
                  path="/edit-Crepitation/:id"
                  element={<EditCrepitation />}
                ></Route>
                <Route
                  path="/examination-heading"
                  element={<ExaminationHeading />}
                ></Route>
                <Route
                  path="/add-examination-heading"
                  element={<AddExaminationHeading />}
                ></Route>
                <Route
                  path="/edit-examination-heading/:id"
                  element={<EditExaminationHeading />}
                ></Route>
                <Route
                  path="/common-history"
                  element={<CommonHistory />}
                ></Route>
                <Route
                  path="/add-common-history"
                  element={<AddCommonHistory />}
                ></Route>
                <Route
                  path="/edit-common-history/:id"
                  element={<EditCommonHistory />}
                ></Route>
                <Route path="/parietal-lobe" element={<ParietalLobe />}></Route>
                <Route
                  path="/add-parietal-lobe"
                  element={<AddParietalLobe />}
                ></Route>
                <Route
                  path="/edit-parietal-lobe/:id"
                  element={<EditParietalLobe />}
                ></Route>
                <Route path="/continuous" element={<Continuous />}></Route>
                <Route
                  path="/add-continuous"
                  element={<AddContinuous />}
                ></Route>
                <Route
                  path="/edit-continuous/:id"
                  element={<EditContinuous />}
                ></Route>
                <Route path="/intermittent" element={<Intermittent />}></Route>
                <Route
                  path="/add-intermittent"
                  element={<AddIntermittent />}
                ></Route>
                <Route
                  path="/edit-intermittent/:id"
                  element={<EditIntermittent />}
                ></Route>
                <Route
                  path="/speech-nurologies"
                  element={<SpeechNurologies />}
                ></Route>
                <Route
                  path="/add-speech-nurologies"
                  element={<AddSpeechNurologies />}
                ></Route>
                <Route
                  path="/edit-speech-nurologies/:id"
                  element={<EditSpeechNurologies />}
                ></Route>
                <Route path="/frontal-lobe" element={<FrontalLobe />}></Route>
                <Route
                  path="/add-frontal-lobe"
                  element={<AddFrontalLobe />}
                ></Route>
                <Route
                  path="/edit-frontal-lobe/:id"
                  element={<EditFrontalLobe />}
                ></Route>
                <Route path="/temporal-lobe" element={<TemporalLobe />}></Route>
                <Route
                  path="/add-temporal-lobe"
                  element={<AddTemporalLobe />}
                ></Route>
                <Route
                  path="/edit-temporal-lobe/:id"
                  element={<EditTemporalLobe />}
                ></Route>
                <Route
                  path="/occipital-lobe"
                  element={<OccipitalLobe />}
                ></Route>
                <Route
                  path="/add-occipital-lobe"
                  element={<AddOccipitalLobe />}
                ></Route>
                <Route
                  path="/edit-occipital-lobe/:id"
                  element={<EditOccipitalLobe />}
                ></Route>
                <Route
                  path="/all-body-part-front-back"
                  element={<AllBodyPartFrontBack />}
                ></Route>
                <Route
                  path="/add-all-body-part-front-back"
                  element={<AddAllBodyPartFrontBack />}
                ></Route>
                <Route
                  path="/edit-all-body-part-front-back/:id"
                  element={<EditAllBodyPartFrontBack />}
                ></Route>
                <Route path="/areolar" element={<Areolar />}></Route>
                <Route path="/add-areolar" element={<AddAreolar />}></Route>
                <Route
                  path="/edit-areolar/:id"
                  element={<EditAreolar />}
                ></Route>
                <Route path="/skin-shape" element={<SkinShape />}></Route>
                <Route
                  path="/add-skin-shape"
                  element={<AddSkinShape />}
                ></Route>
                <Route
                  path="/edit-skin-shape/:id"
                  element={<EditSkinShape />}
                ></Route>
                <Route path="/color" element={<Color />}></Route>
                <Route path="/add-color" element={<AddColor />}></Route>
                <Route path="/edit-color/:id" element={<EditColor />}></Route>
                <Route path="/palpation" element={<Palpation />}></Route>
                <Route path="/add-palpation" element={<AddPalpation />}></Route>
                <Route
                  path="/edit-palpation/:id"
                  element={<EditPalpation />}
                ></Route>
                <Route path="/temparature" element={<Temparature />}></Route>
                <Route
                  path="/add-temparature"
                  element={<AddTemparature />}
                ></Route>
                <Route
                  path="/edit-temparature/:id"
                  element={<EditTemparature />}
                ></Route>
                <Route path="/skin-symptoms" element={<SkinSymptoms />}></Route>
                <Route
                  path="/add-skin-symptoms"
                  element={<AddSkinSymptoms />}
                ></Route>
                <Route
                  path="/edit-skin-symptoms/:id"
                  element={<EditSkinSymptoms />}
                ></Route>
                <Route path="/skin-type" element={<SkinType />}></Route>
                <Route path="/add-skin-type" element={<AddSkinType />}></Route>
                <Route
                  path="/edit-skin-type/:id"
                  element={<EditSkinType />}
                ></Route>
                {/* Women's Health */}
                <Route path="/volume-women" element={<VolumeWomen />}></Route>
                <Route
                  path="/add-volume-women"
                  element={<AddVolumeWomen />}
                ></Route>
                <Route
                  path="/edit-volume-women/:id"
                  element={<EditVolumeWomen />}
                ></Route>
                <Route path="/pv-bleeding" element={<PVBleeding />}></Route>
                <Route
                  path="/add-pv-bleeding"
                  element={<AddPVBleeding />}
                ></Route>
                <Route
                  path="/edit-pv-bleeding/:id"
                  element={<EditPVBleeding />}
                ></Route>
                <Route path="/pv-discharge" element={<PVDischarge />}></Route>
                <Route
                  path="/add-pv-discharge"
                  element={<AddPVDischarge />}
                ></Route>
                <Route
                  path="/edit-pv-discharge/:id"
                  element={<EditPVDischarge />}
                ></Route>
                <Route path="/vulval" element={<Vulval />}></Route>
                <Route path="/add-vulval" element={<AddVulval />}></Route>
                <Route path="/edit-vulval/:id" element={<EditVulval />}></Route>
                <Route path="/miscarriage" element={<Miscarriage />}></Route>
                <Route
                  path="/add-miscarriage"
                  element={<AddMiscarriage />}
                ></Route>
                <Route
                  path="/edit-miscarriage/:id"
                  element={<EditMiscarriage />}
                ></Route>
                <Route path="/breast-lump" element={<BreastLump />}></Route>
                <Route
                  path="/add-breast-lump"
                  element={<AddBreastLump />}
                ></Route>
                <Route
                  path="/edit-breast-lump/:id"
                  element={<EditBreastLump />}
                ></Route>
                <Route path="/breast-pain" element={<BreastPain />}></Route>
                <Route
                  path="/add-breast-pain"
                  element={<AddBreastPain />}
                ></Route>
                <Route
                  path="/edit-breast-pain/:id"
                  element={<EditBreastPain />}
                ></Route>
                <Route
                  path="/breast-nipple-discharge"
                  element={<BreastNippleDischarge />}
                ></Route>
                <Route
                  path="/add-breast-nipple-discharge"
                  element={<AddBreastNippleDischarge />}
                ></Route>
                <Route
                  path="/edit-breast-nipple-discharge/:id"
                  element={<EditBreastNippleDischarge />}
                ></Route>
                <Route path="/vulva" element={<Vulva />}></Route>
                <Route path="/add-vulva" element={<AddVulva />}></Route>
                <Route path="/edit-vulva/:id" element={<EditVulva />}></Route>
                <Route path="/pelvic-mass" element={<PelvicMass />}></Route>
                <Route
                  path="/add-pelvic-mass"
                  element={<AddPelvicMass />}
                ></Route>
                <Route
                  path="/edit-pelvic-mass/:id"
                  element={<EditPelvicMass />}
                ></Route>
                <Route
                  path="/bartholin-glandes"
                  element={<BartholinGlandes />}
                ></Route>
                <Route
                  path="/add-bartholin-glandes"
                  element={<AddBartholinGlandes />}
                ></Route>
                <Route
                  path="/edit-bartholin-glandes/:id"
                  element={<EditBartholinGlandes />}
                ></Route>
                <Route path="/cervix" element={<Cervix />}></Route>
                <Route path="/add-cervix" element={<AddCervix />}></Route>
                <Route path="/edit-cervix/:id" element={<EditCervix />}></Route>
                <Route path="/cst" element={<CST />}></Route>
                <Route path="/add-cst" element={<AddCST />}></Route>
                <Route path="/edit-cst/:id" element={<EditCST />}></Route>
                <Route path="/gynecologies" element={<Gynecologies />}></Route>
                <Route
                  path="/add-gynecologies"
                  element={<AddGynecologies />}
                ></Route>
                <Route
                  path="/edit-gynecologies/:id"
                  element={<EditGynecologies />}
                ></Route>
                <Route path="/obstetrics" element={<Obstetrics />}></Route>
                <Route
                  path="/add-obstetrics"
                  element={<AddObstetrics />}
                ></Route>
                <Route
                  path="/edit-obstetrics/:id"
                  element={<EditObstetrics />}
                ></Route>
                <Route path="/breast" element={<Breast />}></Route>
                <Route path="/add-breast" element={<AddBreast />}></Route>
                <Route path="/edit-breast/:id" element={<EditBreast />}></Route>
                {/* morshed start */}
                <Route path="/cough" element={<Cough />}></Route>
                <Route path="/add-cough" element={<AddCough />}></Route>
                <Route path="/edit-cough/:id" element={<EditCough />}></Route>
                <Route path="/dyspnea" element={<Dyspnea />}></Route>
                <Route path="/add-dyspnea" element={<AddDyspnea />}></Route>
                <Route
                  path="/edit-dyspnea/:id"
                  element={<EditDyspnea />}
                ></Route>
                <Route path="/dyspnea-class" element={<DyspneaClass />}></Route>
                <Route
                  path="/add-dyspnea-class"
                  element={<AddDyspneaClass />}
                ></Route>
                <Route
                  path="/edit-dyspnea-class/:id"
                  element={<EditDyspneaClass />}
                ></Route>
                <Route
                  path="/medical-history"
                  element={<MedicalHistory />}
                ></Route>
                <Route
                  path="/add-medical-history"
                  element={<AddMedicalHistory />}
                ></Route>
                <Route
                  path="/edit-medical-history/:id"
                  element={<EditMedicalHistory />}
                ></Route>
                <Route
                  path="/sleep-apnoea-risk"
                  element={<SleepApnoeaRisk />}
                ></Route>
                <Route
                  path="/add-sleep-apnoea-risk"
                  element={<AddSleepApnoeaRisk />}
                ></Route>
                <Route
                  path="/edit-sleep-apnoea-risk/:id"
                  element={<EditSleepApnoeaRisk />}
                ></Route>
                <Route
                  path="/questionnaire"
                  element={<Questionnaire />}
                ></Route>
                <Route
                  path="/add-questionnaire"
                  element={<AddQuestionnaire />}
                ></Route>
                <Route
                  path="/edit-questionnaire/:id"
                  element={<EditQuestionnaire />}
                ></Route>
                <Route
                  path="/exmanination-list"
                  element={<ExmaninationList />}
                ></Route>
                <Route
                  path="/add-exmanination-list"
                  element={<AddExmaninationList />}
                ></Route>
                <Route
                  path="/edit-exmanination-list/:id"
                  element={<EditExmaninationList />}
                ></Route>
                <Route
                  path="/cripatation-left"
                  element={<CripatationLeft />}
                ></Route>
                <Route
                  path="/add-cripatation-left"
                  element={<AddCripatationLeft />}
                ></Route>
                <Route
                  path="/edit-cripatation-left/:id"
                  element={<EditCripatationLeft />}
                ></Route>
                <Route
                  path="/cripatation-right"
                  element={<CripatationRight />}
                ></Route>
                <Route
                  path="/add-cripatation-right"
                  element={<AddCripatationRight />}
                ></Route>
                <Route
                  path="/edit-cripatation-right/:id"
                  element={<EditCripatationRight />}
                ></Route>
                <Route
                  path="/cripatation-both"
                  element={<CripatationBoth />}
                ></Route>
                <Route
                  path="/add-cripatation-both"
                  element={<AddCripatationBoth />}
                ></Route>
                <Route
                  path="/edit-cripatation-both/:id"
                  element={<EditCripatationBoth />}
                ></Route>
                <Route path="/wheezing-left" element={<WheezingLeft />}></Route>
                <Route
                  path="/add-wheezing-left"
                  element={<AddWheezingLeft />}
                ></Route>
                <Route
                  path="/edit-wheezing-left/:id"
                  element={<EditWheezingLeft />}
                ></Route>
                <Route
                  path="/wheezing-right"
                  element={<WheezingRight />}
                ></Route>
                <Route
                  path="/add-wheezing-right"
                  element={<AddWheezingRight />}
                ></Route>
                <Route
                  path="/edit-wheezing-right/:id"
                  element={<EditWheezingRight />}
                ></Route>
                <Route path="/wheezing-both" element={<WheezingBoth />}></Route>
                <Route
                  path="/add-wheezing-both"
                  element={<AddWheezingBoth />}
                ></Route>
                <Route
                  path="/edit-wheezing-both/:id"
                  element={<EditWheezingBoth />}
                ></Route>
                <Route path="/motor" element={<Motor />}></Route>
                <Route path="/add-motor" element={<AddMotor />}></Route>
                <Route path="/edit-motor/:id" element={<EditMotor />}></Route>
                <Route
                  path="/on-shutting-eye"
                  element={<OnShuttingEye />}
                ></Route>
                <Route
                  path="/add-on-shutting-eye"
                  element={<AddOnShuttingEye />}
                ></Route>
                <Route
                  path="/edit-on-shutting-eye/:id"
                  element={<EditOnShuttingEye />}
                ></Route>
                <Route path="/skin" element={<Skin />}></Route>
                <Route path="/add-skin" element={<AddSkin />}></Route>
                <Route path="/edit-skin/:id" element={<EditSkin />}></Route>
                <Route
                  path="/hand-and-finger"
                  element={<HandAndFinger />}
                ></Route>
                <Route
                  path="/add-hand-and-finger"
                  element={<AddHandAndFinger />}
                ></Route>
                <Route
                  path="/edit-hand-and-finger/:id"
                  element={<EditHandAndFinger />}
                ></Route>
                <Route
                  path="/left-supraclavicular-node"
                  element={<LeftSupraclavicularNode />}
                ></Route>
                <Route
                  path="/add-left-supraclavicular-node"
                  element={<AddLeftSupraclavicularNode />}
                ></Route>
                <Route
                  path="/edit-left-supraclavicular-node/:id"
                  element={<EditLeftSupraclavicularNode />}
                ></Route>
                <Route path="/tongue-mouth" element={<TongueMouth />}></Route>
                <Route
                  path="/add-tongue-mouth"
                  element={<AddTongueMouth />}
                ></Route>
                <Route
                  path="/edit-tongue-mouth/:id"
                  element={<EditTongueMouth />}
                ></Route>
                <Route path="/abdomen" element={<Abdomen />}></Route>
                <Route path="/add-abdomen" element={<AddAbdomen />}></Route>
                <Route
                  path="/edit-abdomen/:id"
                  element={<EditAbdomen />}
                ></Route>
                <Route path="/bruit" element={<Bruit />}></Route>
                <Route path="/add-bruit" element={<AddBruit />}></Route>
                <Route path="/edit-bruit/:id" element={<EditBruit />}></Route>
                <Route
                  path="/non-tender-tenderness"
                  element={<NonTenderTenderness />}
                ></Route>
                <Route
                  path="/add-non-tender-tenderness"
                  element={<AddNonTenderTenderness />}
                ></Route>
                <Route
                  path="/edit-non-tender-tenderness/:id"
                  element={<EditNonTenderTenderness />}
                ></Route>
                <Route
                  path="/no-masses-mass"
                  element={<NoMassesMass />}
                ></Route>
                <Route
                  path="/add-no-masses-mass"
                  element={<AddNoMassesMass />}
                ></Route>
                <Route
                  path="/edit-no-masses-mass/:id"
                  element={<EditNoMassesMass />}
                ></Route>
                <Route path="/hernias" element={<Hernias />}></Route>
                <Route path="/add-hernias" element={<AddHernias />}></Route>
                <Route
                  path="/edit-hernias/:id"
                  element={<EditHernias />}
                ></Route>
                <Route
                  path="/hernias-inguinal"
                  element={<HerniasInguinal />}
                ></Route>
                <Route
                  path="/add-hernias-inguinal"
                  element={<AddHerniasInguinal />}
                ></Route>
                <Route
                  path="/edit-hernias-inguinal/:id"
                  element={<EditHerniasInguinal />}
                ></Route>
                <Route
                  path="/hernias-femoral"
                  element={<HerniasFemoral />}
                ></Route>
                <Route
                  path="/add-hernias-femoral"
                  element={<AddHerniasFemoral />}
                ></Route>
                <Route
                  path="/edit-hernias-femoral/:id"
                  element={<EditHerniasFemoral />}
                ></Route>
                <Route path="/per-rectal" element={<PerRectal />}></Route>
                <Route
                  path="/add-per-rectal"
                  element={<AddPerRectal />}
                ></Route>
                <Route
                  path="/edit-per-rectal/:id"
                  element={<EditPerRectal />}
                ></Route>
                <Route
                  path="/sigmoidoscopy"
                  element={<Sigmoidoscopy />}
                ></Route>
                <Route
                  path="/add-sigmoidoscopy"
                  element={<AddSigmoidoscopy />}
                ></Route>
                <Route
                  path="/edit-sigmoidoscopy/:id"
                  element={<EditSigmoidoscopy />}
                ></Route>
                <Route
                  path="/sigmoidoscopy-guaiac-test"
                  element={<SigmoidoscopyGuaiacTest />}
                ></Route>
                <Route
                  path="/add-sigmoidoscopy-guaiac-test"
                  element={<AddSigmoidoscopyGuaiacTest />}
                ></Route>
                <Route
                  path="/edit-sigmoidoscopy-guaiac-test/:id"
                  element={<EditSigmoidoscopyGuaiacTest />}
                ></Route>
                <Route path="/site" element={<Site />}></Route>
                <Route path="/add-site" element={<AddSite />}></Route>
                <Route path="/edit-site/:id" element={<EditSite />}></Route>
                <Route path="/radiation" element={<Radiation />}></Route>
                <Route path="/add-radiation" element={<AddRadiation />}></Route>
                <Route
                  path="/edit-radiation/:id"
                  element={<EditRadiation />}
                ></Route>
                <Route path="/pattern" element={<Pattern />}></Route>
                <Route path="/add-pattern" element={<AddPattern />}></Route>
                <Route
                  path="/edit-pattern/:id"
                  element={<EditPattern />}
                ></Route>
                <Route path="/duration" element={<Duration />}></Route>
                <Route path="/add-duration" element={<AddDuration />}></Route>
                <Route
                  path="/edit-duration/:id"
                  element={<EditDuration />}
                ></Route>
                <Route path="/frequency" element={<Frequency />}></Route>
                <Route path="/add-frequency" element={<AddFrequency />}></Route>
                <Route
                  path="/edit-frequency/:id"
                  element={<EditFrequency />}
                ></Route>
                <Route path="/score" element={<Score />}></Route>
                <Route path="/add-score" element={<AddScore />}></Route>
                <Route path="/edit-score/:id" element={<EditScore />}></Route>
                <Route path="/vomiting" element={<Vomiting />}></Route>
                <Route path="/add-vomiting" element={<AddVomiting />}></Route>
                <Route
                  path="/edit-vomiting/:id"
                  element={<EditVomiting />}
                ></Route>
                <Route path="/dysphagia" element={<Dysphagia />}></Route>
                <Route path="/add-dysphagia" element={<AddDysphagia />}></Route>
                <Route
                  path="/edit-dysphagia/:id"
                  element={<EditDysphagia />}
                ></Route>
                <Route path="/diarrhoea" element={<Diarrhoea />}></Route>
                <Route path="/add-diarrhoea" element={<AddDiarrhoea />}></Route>
                <Route
                  path="/edit-diarrhoea/:id"
                  element={<EditDiarrhoea />}
                ></Route>
                <Route path="/stool-type" element={<StoolType />}></Route>
                <Route
                  path="/add-stool-type"
                  element={<AddStoolType />}
                ></Route>
                <Route
                  path="/edit-stool-type/:id"
                  element={<EditStoolType />}
                ></Route>
                <Route path="/pr-bleed" element={<PRBleed />}></Route>
                <Route path="/add-pr-bleed" element={<AddPRBleed />}></Route>
                <Route
                  path="/edit-pr-bleed/:id"
                  element={<EditPRBleed />}
                ></Route>
                <Route path="/renal-mass" element={<RenalMass />}></Route>
                <Route
                  path="/add-renal-mass"
                  element={<AddRenalMass />}
                ></Route>
                <Route
                  path="/edit-renal-mass/:id"
                  element={<EditRenalMass />}
                ></Route>
                <Route
                  path="/urine-analysis"
                  element={<UrineAnalysis />}
                ></Route>
                <Route
                  path="/add-urine-analysis"
                  element={<AddUrineAnalysis />}
                ></Route>
                <Route
                  path="/edit-urine-analysis/:id"
                  element={<EditUrineAnalysis />}
                ></Route>
                <Route path="/dehydration" element={<Dehydration />}></Route>
                <Route
                  path="/add-dehydration"
                  element={<AddDehydration />}
                ></Route>
                <Route
                  path="/edit-dehydration/:id"
                  element={<EditDehydration />}
                ></Route>
                <Route
                  path="/radio-femoral-delay"
                  element={<RadioFemoralDelay />}
                ></Route>
                <Route
                  path="/add-radio-femoral-delay"
                  element={<AddRadioFemoralDelay />}
                ></Route>
                <Route
                  path="/edit-radio-femoral-delay/:id"
                  element={<EditRadioFemoralDelay />}
                ></Route>
                <Route path="/nail-sign" element={<NailSign />}></Route>
                <Route path="/add-nail-sign" element={<AddNailSign />}></Route>
                <Route
                  path="/edit-nail-sign/:id"
                  element={<EditNailSign />}
                ></Route>
                <Route path="/lesion-middle" element={<LesionMiddle />}></Route>
                <Route
                  path="/add-lesion-middle"
                  element={<AddLesionMiddle />}
                ></Route>
                <Route
                  path="/edit-lesion-middle/:id"
                  element={<EditLesionMiddle />}
                ></Route>
                <Route path="/services-name" element={<Services />}></Route>
                <Route
                  path="/add-services-name"
                  element={<AddServices />}
                ></Route>
                <Route
                  path="/edit-services-name/:id"
                  element={<EditServices />}
                ></Route>
                <Route path="/unit-name" element={<Unit />}></Route>
                <Route path="/add-unit-name" element={<AddUnit />}></Route>
                <Route
                  path="/edit-unit-name/:id"
                  element={<EditUnit />}
                ></Route>
                <Route
                  path="/code-must-be-circled-reason"
                  element={<CodeMustBeCircledReason />}
                ></Route>
                <Route
                  path="/add-code-must-be-circled-reason"
                  element={<AddCodeMustBeCircledReason />}
                ></Route>
                <Route
                  path="/edit-code-must-be-circled-reason/:id"
                  element={<EditCodeMustBeCircledReason />}
                ></Route>
                <Route
                  path="/guidelines-only-recommended"
                  element={<GuidelinesOnlyRecommended />}
                ></Route>
                <Route
                  path="/add-guidelines-only-recommended"
                  element={<AddGuidelinesOnlyRecommended />}
                ></Route>
                <Route
                  path="/edit-guidelines-only-recommended/:id"
                  element={<EditGuidelinesOnlyRecommended />}
                ></Route>
                <Route path="/lesion-right" element={<LesionRight />}></Route>
                <Route
                  path="/add-lesion-right"
                  element={<AddLesionRight />}
                ></Route>
                <Route
                  path="/edit-lesion-right/:id"
                  element={<EditLesionRight />}
                ></Route>
                <Route
                  path="/external-observation"
                  element={<ExternalObservation />}
                ></Route>
                <Route
                  path="/add-external-observation"
                  element={<AddExternalObservation />}
                ></Route>
                <Route
                  path="/edit-external-observation/:id"
                  element={<EditExternalObservation />}
                ></Route>
                <Route path="/phoria-one" element={<PhoriaOne />}></Route>
                <Route
                  path="/add-phoria-one"
                  element={<AddPhoriaOne />}
                ></Route>
                <Route
                  path="/edit-phoria-one/:id"
                  element={<EditPhoriaOne />}
                ></Route>
                <Route path="/phoria-two" element={<PhoriaTwo />}></Route>
                <Route
                  path="/add-phoria-two"
                  element={<AddPhoriaTwo />}
                ></Route>
                <Route
                  path="/edit-phoria-two/:id"
                  element={<EditPhoriaTwo />}
                ></Route>
                <Route path="/shape" element={<Shape />}></Route>
                <Route path="/add-shape" element={<AddShape />}></Route>
                <Route path="/edit-shape/:id" element={<EditShape />}></Route>
                <Route path="/pursuits" element={<Pursuits />}></Route>
                <Route path="/add-pursuits" element={<AddPursuits />}></Route>
                <Route
                  path="/edit-pursuits/:id"
                  element={<EditPursuits />}
                ></Route>
                <Route path="/saccades" element={<Saccades />}></Route>
                <Route path="/add-saccades" element={<AddSaccades />}></Route>
                <Route
                  path="/edit-saccades/:id"
                  element={<EditSaccades />}
                ></Route>
                <Route path="/neuro-opthal" element={<NeuroOpthal />}></Route>
                <Route
                  path="/add-neuro-opthal"
                  element={<AddNeuroOpthal />}
                ></Route>
                <Route
                  path="/edit-neuro-opthal/:id"
                  element={<EditNeuroOpthal />}
                ></Route>
                <Route
                  path="/swollen-eye-lid"
                  element={<SwollenEyeLid />}
                ></Route>
                <Route
                  path="/add-swollen-eye-lid"
                  element={<AddSwollenEyeLid />}
                ></Route>
                <Route
                  path="/edit-swollen-eye-lid/:id"
                  element={<EditSwollenEyeLid />}
                ></Route>
                <Route path="/lesion" element={<Lesion />}></Route>
                <Route path="/add-lesion" element={<AddLesion />}></Route>
                <Route path="/edit-lesion/:id" element={<EditLesion />}></Route>
                <Route path="/worth-4-dot" element={<Worth4Dot />}></Route>
                <Route
                  path="/add-worth-4-dot"
                  element={<AddWorth4Dot />}
                ></Route>
                <Route
                  path="/edit-worth-4-dot/:id"
                  element={<EditWorth4Dot />}
                ></Route>
                <Route
                  path="/eom-convergence"
                  element={<EOMConvergence />}
                ></Route>
                <Route
                  path="/add-eom-convergence"
                  element={<AddEOMConvergence />}
                ></Route>
                <Route
                  path="/edit-eom-convergence/:id"
                  element={<EditEOMConvergence />}
                ></Route>
                <Route
                  path="/eom-accomodation"
                  element={<EOMAccomodation />}
                ></Route>
                <Route
                  path="/add-eom-accomodation"
                  element={<AddEOMAccomodation />}
                ></Route>
                <Route
                  path="/edit-eom-accomodation/:id"
                  element={<EditEOMAccomodation />}
                ></Route>
                <Route
                  path="/dry-retinoscopy"
                  element={<DryRetinoscopy />}
                ></Route>
                <Route
                  path="/add-dry-retinoscopy"
                  element={<AddDryRetinoscopy />}
                ></Route>
                <Route
                  path="/edit-dry-retinoscopy/:id"
                  element={<EditDryRetinoscopy />}
                ></Route>
                <Route path="/maddox-wing" element={<MaddoxWing />}></Route>
                <Route
                  path="/add-maddox-wing"
                  element={<AddMaddoxWing />}
                ></Route>
                <Route
                  path="/edit-maddox-wing/:id"
                  element={<EditMaddoxWing />}
                ></Route>
                <Route
                  path="/mid-line-crossing"
                  element={<MidLineCrossing />}
                ></Route>
                <Route
                  path="/add-mid-line-crossing"
                  element={<AddMidLineCrossing />}
                ></Route>
                <Route
                  path="/edit-mid-line-crossing/:id"
                  element={<EditMidLineCrossing />}
                ></Route>
                <Route path="/pen-grip" element={<PenGrip />}></Route>
                <Route path="/add-pen-grip" element={<AddPenGrip />}></Route>
                <Route
                  path="/edit-pen-grip/:id"
                  element={<EditPenGrip />}
                ></Route>
                <Route path="/posture" element={<Posture />}></Route>
                <Route path="/add-posture" element={<AddPosture />}></Route>
                <Route
                  path="/edit-posture/:id"
                  element={<EditPosture />}
                ></Route>
                <Route path="/color-vision" element={<ColorVision />}></Route>
                <Route
                  path="/add-color-vision"
                  element={<AddColorVision />}
                ></Route>
                <Route
                  path="/edit-color-vision/:id"
                  element={<EditColorVision />}
                ></Route>
                <Route path="/dilate" element={<Dilate />}></Route>
                <Route path="/add-dilate" element={<AddDilate />}></Route>
                <Route path="/edit-dilate/:id" element={<EditDilate />}></Route>
                <Route path="/cd-disc" element={<CDDisc />}></Route>
                <Route path="/add-cd-disc" element={<AddCDDisc />}></Route>
                <Route
                  path="/edit-cd-disc/:id"
                  element={<EditCDDisc />}
                ></Route>
                <Route
                  path="/neuro-opthalmology"
                  element={<NeuroOpthalmology />}
                ></Route>
                <Route
                  path="/add-neuro-opthalmology"
                  element={<AddNeuroOpthalmology />}
                ></Route>
                <Route
                  path="/edit-neuro-opthalmology/:id"
                  element={<EditNeuroOpthalmology />}
                ></Route>
                <Route
                  path="/pen-grip-right"
                  element={<PenGripRight />}
                ></Route>
                <Route
                  path="/add-pen-grip-right"
                  element={<AddPenGripRight />}
                ></Route>
                <Route
                  path="/edit-pen-grip-right/:id"
                  element={<EditPenGripRight />}
                ></Route>
                <Route path="/movement" element={<Movement />}></Route>
                <Route path="/add-movement" element={<AddMovement />}></Route>
                <Route
                  path="/edit-movement/:id"
                  element={<EditMovement />}
                ></Route>
                <Route
                  path="/tender-over-spinus-process-at"
                  element={<TenderOverSpinusProcessAt />}
                ></Route>
                <Route
                  path="/add-tender-over-spinus-process-at"
                  element={<AddTenderOverSpinusProcessAt />}
                ></Route>
                <Route
                  path="/edit-tender-over-spinus-process-at/:id"
                  element={<EditTenderOverSpinusProcessAt />}
                ></Route>
                <Route
                  path="/tenerness-over-facet-join"
                  element={<TenernessOverFacetJoin />}
                ></Route>
                <Route
                  path="/add-tenerness-over-facet-join"
                  element={<AddTenernessOverFacetJoin />}
                ></Route>
                <Route
                  path="/edit-tenerness-over-facet-join/:id"
                  element={<EditTenernessOverFacetJoin />}
                ></Route>
                <Route path="/inspection" element={<Inspection />}></Route>
                <Route
                  path="/add-inspection"
                  element={<AddInspection />}
                ></Route>
                <Route
                  path="/edit-inspection/:id"
                  element={<EditInspection />}
                ></Route>
                <Route
                  path="/inspection-look"
                  element={<InspectionLook />}
                ></Route>
                <Route
                  path="/add-inspection-look"
                  element={<AddInspectionLook />}
                ></Route>
                <Route
                  path="/edit-inspection-look/:id"
                  element={<EditInspectionLook />}
                ></Route>
                {/* patient-vital reading */}
                {
                  <Route
                    path="/patient-vital-reading"
                    element={<PatientVitalReading />}
                  ></Route>
                }
                {/* Nurse */}
                <Route path="/ipd-patient" element={<IpdPatient />}></Route>
                {/* Nurse */}
                <Route
                  path="/pain-along-anterior"
                  element={<PainAlongAnterior />}
                ></Route>
                <Route
                  path="/add-pain-along-anterior"
                  element={<AddPainAlongAnterior />}
                ></Route>
                <Route
                  path="/edit-pain-along-anterior/:id"
                  element={<EditPainAlongAnterior />}
                ></Route>
                <Route
                  path="/pain-over-posterior"
                  element={<PainOverPosterior />}
                ></Route>
                <Route
                  path="/add-pain-over-posterior"
                  element={<AddPainOverPosterior />}
                ></Route>
                <Route
                  path="/edit-pain-over-posterior/:id"
                  element={<EditPainOverPosterior />}
                ></Route>
                <Route path="/walk-on-heels" element={<WalkOnHeels />}></Route>
                <Route
                  path="/add-walk-on-heels"
                  element={<AddWalkOnHeels />}
                ></Route>
                <Route
                  path="/edit-walk-on-heels/:id"
                  element={<EditWalkOnHeels />}
                ></Route>
                <Route
                  path="/posture-thoraco"
                  element={<PostureThoraco />}
                ></Route>
                <Route
                  path="/add-posture-thoraco"
                  element={<AddPostureThoraco />}
                ></Route>
                <Route
                  path="/edit-posture-thoraco/:id"
                  element={<EditPostureThoraco />}
                ></Route>
                <Route
                  path="/tender-over-spinus-thoraco"
                  element={<TenderOverSpinusThoraco />}
                ></Route>
                <Route
                  path="/add-tender-over-spinus-thoraco"
                  element={<AddTenderOverSpinusThoraco />}
                ></Route>
                <Route
                  path="/edit-tender-over-spinus-thoraco/:id"
                  element={<EditTenderOverSpinusThoraco />}
                ></Route>
                <Route
                  path="/tenderness-over-facet-thoraco"
                  element={<TendernessOverFacetThoraco />}
                ></Route>
                <Route
                  path="/add-tenderness-over-facet-thoraco"
                  element={<AddTendernessOverFacetThoraco />}
                ></Route>
                <Route
                  path="/edit-tenderness-over-facet-thoraco/:id"
                  element={<EditTendernessOverFacetThoraco />}
                ></Route>
                <Route
                  path="/tenderness-over-facet-lrb-thoraco"
                  element={<TendernessOverFacetLRBThoraco />}
                ></Route>
                <Route
                  path="/add-tenderness-over-facet-lrb-thoraco"
                  element={<AddTendernessOverFacetLRBThoraco />}
                ></Route>
                <Route
                  path="/edit-tenderness-over-facet-lrb-thoraco/:id"
                  element={<EditTendernessOverFacetLRBThoraco />}
                ></Route>
                <Route
                  path="/tender-tenerness-over-l1-to-l6-thoraco"
                  element={<TenderTenernessOverL1ToL6Thoraco />}
                ></Route>
                <Route
                  path="/add-tender-tenerness-over-l1-to-l6-thoraco"
                  element={<AddTenderTenernessOverL1ToL6Thoraco />}
                ></Route>
                <Route
                  path="/edit-tender-tenerness-over-l1-to-l6-thoraco/:id"
                  element={<EditTenderTenernessOverL1ToL6Thoraco />}
                ></Route>
                <Route
                  path="/lying-on-couch"
                  element={<LyingOnCouch />}
                ></Route>
                <Route
                  path="/add-lying-on-couch"
                  element={<AddLyingOnCouch />}
                ></Route>
                <Route
                  path="/edit-lying-on-couch/:id"
                  element={<EditLyingOnCouch />}
                ></Route>
                <Route
                  path="/move-hip-pelvis"
                  element={<MoveHipPelvis />}
                ></Route>
                <Route
                  path="/add-move-hip-pelvis"
                  element={<AddMoveHipPelvis />}
                ></Route>
                <Route
                  path="/edit-move-hip-pelvis/:id"
                  element={<EditMoveHipPelvis />}
                ></Route>
                <Route
                  path="/sudden-anaesthesia"
                  element={<SuddenAnaesthesia />}
                ></Route>
                <Route
                  path="/add-sudden-anaesthesia"
                  element={<AddSuddenAnaesthesia />}
                ></Route>
                <Route
                  path="/edit-sudden-anaesthesia/:id"
                  element={<EditSuddenAnaesthesia />}
                ></Route>
                <Route
                  path="/thoracic-kyphosis"
                  element={<ThoracicKyphosis />}
                ></Route>
                <Route
                  path="/add-thoracic-kyphosis"
                  element={<AddThoracicKyphosis />}
                ></Route>
                <Route
                  path="/edit-thoracic-kyphosis/:id"
                  element={<EditThoracicKyphosis />}
                ></Route>
                <Route
                  path="/lumber-lordosis"
                  element={<LumberLordosis />}
                ></Route>
                <Route
                  path="/add-lumber-lordosis"
                  element={<AddLumberLordosis />}
                ></Route>
                <Route
                  path="/edit-lumber-lordosis/:id"
                  element={<EditLumberLordosis />}
                ></Route>
                <Route path="/spine" element={<Spine />}></Route>
                <Route path="/add-spine" element={<AddSpine />}></Route>
                <Route path="/edit-spine/:id" element={<EditSpine />}></Route>
                <Route
                  path="/pain-into-knee"
                  element={<PainIntoKnee />}
                ></Route>
                <Route
                  path="/add-pain-into-knee"
                  element={<AddPainIntoKnee />}
                ></Route>
                <Route
                  path="/edit-pain-into-knee/:id"
                  element={<EditPainIntoKnee />}
                ></Route>
                <Route
                  path="/shape-and-contour"
                  element={<ShapeAndContour />}
                ></Route>
                <Route
                  path="/add-shape-and-contour"
                  element={<AddShapeAndContour />}
                ></Route>
                <Route
                  path="/edit-shape-and-contour/:id"
                  element={<EditShapeAndContour />}
                ></Route>
                <Route path="/anterior-view" element={<AnteriorView />}></Route>
                <Route
                  path="/add-anterior-view"
                  element={<AddAnteriorView />}
                ></Route>
                <Route
                  path="/edit-anterior-view/:id"
                  element={<EditAnteriorView />}
                ></Route>
                <Route
                  path="/level-of-spine-of-scapula"
                  element={<LevelOfSpineOfScapula />}
                ></Route>
                <Route
                  path="/add-level-of-spine-of-scapula"
                  element={<AddLevelOfSpineOfScapula />}
                ></Route>
                <Route
                  path="/edit-level-of-spine-of-scapula/:id"
                  element={<EditLevelOfSpineOfScapula />}
                ></Route>
                <Route
                  path="/winged-scapula"
                  element={<WingedScapula />}
                ></Route>
                <Route
                  path="/add-winged-scapula"
                  element={<AddWingedScapula />}
                ></Route>
                <Route
                  path="/edit-winged-scapula/:id"
                  element={<EditWingedScapula />}
                ></Route>
                <Route path="/wrist" element={<Wrist />}></Route>
                <Route path="/add-wrist" element={<AddWrist />}></Route>
                <Route path="/edit-wrist/:id" element={<EditWrist />}></Route>
                <Route
                  path="/metacarpophalangeal-joint"
                  element={<MetacarpophalangealJoint />}
                ></Route>
                <Route
                  path="/add-metacarpophalangeal-joint"
                  element={<AddMetacarpophalangealJoint />}
                ></Route>
                <Route
                  path="/edit-metacarpophalangeal-joint/:id"
                  element={<EditMetacarpophalangealJoint />}
                ></Route>
                <Route
                  path="/proximal-interphalangeal-joint"
                  element={<ProximalInterphalangealJoint />}
                ></Route>
                <Route
                  path="/add-proximal-interphalangeal-joint"
                  element={<AddProximalInterphalangealJoint />}
                ></Route>
                <Route
                  path="/edit-proximal-interphalangeal-joint/:id"
                  element={<EditProximalInterphalangealJoint />}
                ></Route>
                <Route
                  path="/distal-interphalangeal-joint"
                  element={<DistalInterphalangealJoint />}
                ></Route>
                <Route
                  path="/add-distal-interphalangeal-joint"
                  element={<AddDistalInterphalangealJoint />}
                ></Route>
                <Route
                  path="/edit-distal-interphalangeal-joint/:id"
                  element={<EditDistalInterphalangealJoint />}
                ></Route>
                <Route
                  path="/l1-and-l2-hip-flexion"
                  element={<L1L2HipFlexion />}
                ></Route>
                <Route
                  path="/add-l1-and-l2-hip-flexion"
                  element={<AddL1L2HipFlexion />}
                ></Route>
                <Route
                  path="/edit-l1-and-l2-hip-flexion/:id"
                  element={<EditL1L2HipFlexion />}
                ></Route>
                <Route path="/l3-to-l5-power" element={<L3ToL5Power />}></Route>
                <Route
                  path="/add-l3-to-l5-power"
                  element={<AddL3ToL5Power />}
                ></Route>
                <Route
                  path="/edit-l3-to-l5-power/:id"
                  element={<EditL3ToL5Power />}
                ></Route>
                <Route
                  path="/l1-and-l2-sensation"
                  element={<L1L2Sensation />}
                ></Route>
                <Route
                  path="/add-l1-and-l2-sensation"
                  element={<AddL1L2Sensation />}
                ></Route>
                <Route
                  path="/edit-l1-and-l2-sensation/:id"
                  element={<EditL1L2Sensation />}
                ></Route>
                <Route
                  path="/l3-to-l5-sensation"
                  element={<L3ToL5Sensation />}
                ></Route>
                <Route
                  path="/add-l3-to-l5-sensation"
                  element={<AddL3ToL5Sensation />}
                ></Route>
                <Route
                  path="/edit-l3-to-l5-sensation/:id"
                  element={<EditL3ToL5Sensation />}
                ></Route>
                <Route path="/s1-to-s4-test" element={<S1ToS4Test />}></Route>
                <Route
                  path="/add-s1-to-s4-test"
                  element={<AddS1ToS4Test />}
                ></Route>
                <Route
                  path="/edit-s1-to-s4-test/:id"
                  element={<EditS1ToS4Test />}
                ></Route>
                <Route
                  path="/inspection-look-hip-pelvis"
                  element={<InspectionLookHipPelvis />}
                ></Route>
                <Route
                  path="/add-inspection-look-hip-pelvis"
                  element={<AddInspectionLookHipPelvis />}
                ></Route>
                <Route
                  path="/edit-inspection-look-hip-pelvis/:id"
                  element={<EditInspectionLookHipPelvis />}
                ></Route>
                <Route
                  path="/test-hip-pelvis"
                  element={<TestHipPelvis />}
                ></Route>
                <Route
                  path="/add-test-hip-pelvis"
                  element={<AddTestHipPelvis />}
                ></Route>
                <Route
                  path="/edit-test-hip-pelvis/:id"
                  element={<EditTestHipPelvis />}
                ></Route>
                <Route path="/gait-limping" element={<GaitLimping />}></Route>
                <Route
                  path="/add-gait-limping"
                  element={<AddGaitLimping />}
                ></Route>
                <Route
                  path="/edit-gait-limping/:id"
                  element={<EditGaitLimping />}
                ></Route>
                <Route
                  path="/shoulder-movements"
                  element={<ShoulderMovements />}
                ></Route>
                <Route
                  path="/add-shoulder-movements"
                  element={<AddShoulderMovements />}
                ></Route>
                <Route
                  path="/edit-shoulder-movements/:id"
                  element={<EditShoulderMovements />}
                ></Route>
                <Route path="/painful-arc" element={<PainfulArc />}></Route>
                <Route
                  path="/add-painful-arc"
                  element={<AddPainfulArc />}
                ></Route>
                <Route
                  path="/edit-painful-arc/:id"
                  element={<EditPainfulArc />}
                ></Route>
                <Route
                  path="/resisted-movement"
                  element={<ResistedMovement />}
                ></Route>
                <Route
                  path="/add-resisted-movement"
                  element={<AddResistedMovement />}
                ></Route>
                <Route
                  path="/edit-resisted-movement/:id"
                  element={<EditResistedMovement />}
                ></Route>
                <Route path="/nails" element={<Nails />}></Route>
                <Route path="/add-nails" element={<AddNails />}></Route>
                <Route path="/edit-nails/:id" element={<EditNails />}></Route>
                <Route
                  path="/dorsum-of-hand"
                  element={<DorsumOfHand />}
                ></Route>
                <Route
                  path="/add-dorsum-of-hand"
                  element={<AddDorsumOfHand />}
                ></Route>
                <Route
                  path="/edit-dorsum-of-hand/:id"
                  element={<EditDorsumOfHand />}
                ></Route>
                <Route path="/fingers" element={<Fingers />}></Route>
                <Route path="/add-fingers" element={<AddFingers />}></Route>
                <Route
                  path="/edit-fingers/:id"
                  element={<EditFingers />}
                ></Route>
                <Route path="/tenders" element={<Tenders />}></Route>
                <Route path="/add-tenders" element={<AddTenders />}></Route>
                <Route
                  path="/edit-tenders/:id"
                  element={<EditTenders />}
                ></Route>
                <Route
                  path="/flexon-tendons"
                  element={<FlexonTendons />}
                ></Route>
                <Route
                  path="/add-flexon-tendons"
                  element={<AddFlexonTendons />}
                ></Route>
                <Route
                  path="/edit-flexon-tendons/:id"
                  element={<EditFlexonTendons />}
                ></Route>
                <Route
                  path="/wrist-palpation"
                  element={<WristPalpation />}
                ></Route>
                <Route
                  path="/add-wrist-palpation"
                  element={<AddWristPalpation />}
                ></Route>
                <Route
                  path="/edit-wrist-palpation/:id"
                  element={<EditWristPalpation />}
                ></Route>
                <Route
                  path="/proximal-interphalangeal-palpation"
                  element={<ProximalInterphalangealPalpation />}
                ></Route>
                <Route
                  path="/add-proximal-interphalangeal-palpation"
                  element={<AddProximalInterphalangealPalpation />}
                ></Route>
                <Route
                  path="/edit-proximal-interphalangeal-palpation/:id"
                  element={<EditProximalInterphalangealPalpation />}
                ></Route>
                <Route
                  path="/metacarpophalangeal-joint-palpation"
                  element={<MetacarpophalangealJointPalpation />}
                ></Route>
                <Route
                  path="/add-metacarpophalangeal-joint-palpation"
                  element={<AddMetacarpophalangealJointPalpation />}
                ></Route>
                <Route
                  path="/edit-metacarpophalangeal-joint-palpation/:id"
                  element={<EditMetacarpophalangealJointPalpation />}
                ></Route>
                <Route
                  path="/flexor-digitorum-profundus-test"
                  element={<FlexorDigitorumProfundusTest />}
                ></Route>
                <Route
                  path="/add-flexor-digitorum-profundus-test"
                  element={<AddFlexorDigitorumProfundusTest />}
                ></Route>
                <Route
                  path="/edit-flexor-digitorum-profundus-test/:id"
                  element={<EditFlexorDigitorumProfundusTest />}
                ></Route>
                <Route
                  path="/flexor-digitorum-superficialis-test"
                  element={<FlexorDigitorumSuperficialisTest />}
                ></Route>
                <Route
                  path="/add-flexor-digitorum-superficialis-test"
                  element={<AddFlexorDigitorumSuperficialisTest />}
                ></Route>
                <Route
                  path="/edit-flexor-digitorum-superficialis-test/:id"
                  element={<EditFlexorDigitorumSuperficialisTest />}
                ></Route>
                <Route
                  path="/inspection-male-female"
                  element={<InspectionMaleFemale />}
                ></Route>
                <Route
                  path="/add-inspection-male-female"
                  element={<AddInspectionMaleFemale />}
                ></Route>
                <Route
                  path="/edit-inspection-male-female/:id"
                  element={<EditInspectionMaleFemale />}
                ></Route>
                <Route
                  path="/at-90-flextion"
                  element={<At90FlextionPalpation />}
                ></Route>
                <Route
                  path="/add-at-90-flextion"
                  element={<AddAt90FlextionPalpation />}
                ></Route>
                <Route
                  path="/edit-at-90-flextion/:id"
                  element={<EditAt90FlextionPalpation />}
                ></Route>
                <Route
                  path="/at-full-flextion"
                  element={<AtFullFlextionPalpation />}
                ></Route>
                <Route
                  path="/add-at-full-flextion"
                  element={<AddAtFullFlextionPalpation />}
                ></Route>
                <Route
                  path="/edit-at-full-flextion/:id"
                  element={<EditAtFullFlextionPalpation />}
                ></Route>
                <Route
                  path="/flextion-0-to-150-examination"
                  element={<Flextion0to150Examination />}
                ></Route>
                <Route
                  path="/add-flextion-0-to-150-examination"
                  element={<AddFlextion0to150Examination />}
                ></Route>
                <Route
                  path="/edit-flextion-0-to-150-examination/:id"
                  element={<EditFlextion0to150Examination />}
                ></Route>
                <Route
                  path="/anterior-view-knee"
                  element={<AnteriorViewKnee />}
                ></Route>
                <Route
                  path="/add-anterior-view-knee"
                  element={<AddAnteriorViewKnee />}
                ></Route>
                <Route
                  path="/edit-anterior-view-knee/:id"
                  element={<EditAnteriorViewKnee />}
                ></Route>
                <Route
                  path="/posterior-view-knee"
                  element={<PosteriorViewKnee />}
                ></Route>
                <Route
                  path="/add-posterior-view-knee"
                  element={<AddPosteriorViewKnee />}
                ></Route>
                <Route
                  path="/edit-posterior-view-knee/:id"
                  element={<EditPosteriorViewKnee />}
                ></Route>
                <Route
                  path="/lateral-view-knee"
                  element={<LateralViewKnee />}
                ></Route>
                <Route
                  path="/add-lateral-view-knee"
                  element={<AddLateralViewKnee />}
                ></Route>
                <Route
                  path="/edit-lateral-view-knee/:id"
                  element={<EditLateralViewKnee />}
                ></Route>
                <Route
                  path="/stance-swat-knee"
                  element={<StanceSwatKnee />}
                ></Route>
                <Route
                  path="/add-stance-swat-knee"
                  element={<AddStanceSwatKnee />}
                ></Route>
                <Route
                  path="/edit-stance-swat-knee/:id"
                  element={<EditStanceSwatKnee />}
                ></Route>
                <Route
                  path="/margin-condyle-tibial"
                  element={<MarginCondyleTibial />}
                ></Route>
                <Route
                  path="/add-margin-condyle-tibial"
                  element={<AddMarginCondyleTibial />}
                ></Route>
                <Route
                  path="/edit-margin-condyle-tibial/:id"
                  element={<EditMarginCondyleTibial />}
                ></Route>
                <Route path="/toes-left" element={<ToesLeft />}></Route>
                <Route path="/add-toes-left" element={<AddToesLeft />}></Route>
                <Route
                  path="/edit-toes-left/:id"
                  element={<EditToesLeft />}
                ></Route>
                <Route path="/mtp-joint" element={<MTPJoint />}></Route>
                <Route path="/add-mtp-joint" element={<AddMTPJoint />}></Route>
                <Route
                  path="/edit-mtp-joint/:id"
                  element={<EditMTPJoint />}
                ></Route>
                <Route path="/pip-joint" element={<PIPJoint />}></Route>
                <Route path="/add-pip-joint" element={<AddPIPJoint />}></Route>
                <Route
                  path="/edit-pip-joint/:id"
                  element={<EditPIPJoint />}
                ></Route>
                <Route path="/dip-joint" element={<DIPJoint />}></Route>
                <Route path="/add-dip-joint" element={<AddDIPJoint />}></Route>
                <Route
                  path="/edit-dip-joint/:id"
                  element={<EditDIPJoint />}
                ></Route>
                <Route path="/toes-right" element={<ToesRight />}></Route>
                <Route
                  path="/add-toes-right"
                  element={<AddToesRight />}
                ></Route>
                <Route
                  path="/edit-toes-right/:id"
                  element={<EditToesRight />}
                ></Route>
                <Route
                  path="/dorsum-of-foot"
                  element={<DorsumOfFoot />}
                ></Route>
                <Route
                  path="/add-dorsum-of-foot"
                  element={<AddDorsumOfFoot />}
                ></Route>
                <Route
                  path="/edit-dorsum-of-foot/:id"
                  element={<EditDorsumOfFoot />}
                ></Route>
                <Route
                  path="musculo-skeletal-examination-setup"
                  element={<MusculoSkeletalExaminationSetup />}
                />
                <Route path="custom-medicine" element={<CustomMedicine />} />
                <Route
                  path="edit-custom-medicine/:id"
                  element={<EditCustomMedicine />}
                />
                {
                  <>
                    <Route path="doctors" element={<Docotrs />}></Route>
                    <Route
                      path="add-doctors"
                      element={<AddNewDoctors />}
                    ></Route>
                    <Route
                      path="new-doctors"
                      element={<NewDoctorsEntry />}
                    ></Route>
                  </>
                }
                {
                  <>
                    {/* <Route path="lab-module" element={<LabModule />}>
                  </Route> */}
                    <Route
                      path="lab-module-new"
                      element={<LabModuleMain />}
                    ></Route>
                    <Route
                      path="allergy-setup"
                      element={<AllergySetup />}
                    ></Route>
                  </>
                }
                {/* Appointment Setup Start */}
                <Route
                  path="/add-radiology-test-type"
                  element={<AddRadiologyTestType />}
                ></Route>
                <Route
                  path="/edit-radiology-test-type/:id"
                  element={<EditRadiologyTestType />}
                ></Route>
                {/* Appointment Setup End */}
                {/* Doctor Setup Start*/}
                {/* Physical Activity Prescription */}
                {/* lab setup */}
                {/* proceduresetup */}
                {/* indication setup */}
                {/* findings setup */}
                {/* procedure details setup */}
                {/* item numbers setup */}
                {/* incision */}
                {/* Pathology setup */}
                {/* Drain setup */}
                {/* antibiotics */}
                {/* blood loss */}
                {/* observation */}
                {/* diet */}
                {/* analgesia */}
                {/* dvt prop */}
                {/* antibiotics */}
                <Route
                  path="/antibiotics-two"
                  element={<AntibioticsTwoName />}
                ></Route>
                <Route
                  path="/add-antibiotics-two-name"
                  element={<AddAntibioticsTwoName />}
                ></Route>
                <Route
                  path="/edit-antibiotics-two-name/:id"
                  element={<EditAntibioticsTwoName />}
                ></Route>
                {/* discharge */}
                {/* followup */}
                <Route path="/followup" element={<FollowupName />}></Route>
                {/* Discharge Summary */}
                <Route
                  path="/investigation"
                  element={<Investigation />}
                ></Route>
                <Route path="/pain-relief" element={<PainRelief />}></Route>
                <Route path="/hygiene" element={<Hygiene />}></Route>
                <Route path="/exercise" element={<Exercise />}></Route>
                <Route path="/dressing" element={<Dressing />}></Route>
                <Route path="/wound-care" element={<WoundCare />}></Route>
                <Route
                  path="/recommendation"
                  element={<Recommendation />}
                ></Route>
                {/* Discharge Summary */}
                {/* past operative */}
                {/* Doctor Setup End*/}
                {/* {Billing Setup Start} */}
                {/* {Billing Setup End} */}
                {/* Anatomy setup start  */}
                {/* Anatomy setup start  */}
                {/* History && Examination */}
                <Route
                  path="/tasciculation"
                  element={<Tasciculation />}
                ></Route>
                <Route
                  path="/add-tasciculation"
                  element={<AddTasciculation />}
                ></Route>
                <Route
                  path="/edit-tasciculation/:id"
                  element={<EditTasciculation />}
                ></Route>
                <Route path="/arrangements" element={<Arrangements />}></Route>
                <Route
                  path="/add-arrangements"
                  element={<AddArrangements />}
                ></Route>
                <Route
                  path="/edit-arrangements/:id"
                  element={<EditArrangements />}
                ></Route>
                {/* Women's Health */}
                {/* morshed start */}
                {/* patient-vital reading */}
                {/* Nurse */}
                {/* Nurse */}
                {/* ------------------lab agent start ---------- */}
                {
                  <>
                    <Route
                      path="lab-agent-list"
                      element={<LabAgentList />}
                    ></Route>
                    <Route
                      path="edit-lab-agent/:id"
                      element={<EditLabAgent />}
                    ></Route>
                    <Route
                      path="lab-agent"
                      element={<LabAgentBilling />}
                    ></Route>
                    <Route
                      path="application"
                      element={<LabAgentApplication />}
                    ></Route>
                    {/* sample collection  */}
                    <Route
                      path="lab-agent-sample-collection"
                      element={<LabAgentSampleCollection />}
                    ></Route>
                    <Route
                      path="lab-agent-sample-send"
                      element={<LabAgentSampleSendToLab />}
                    ></Route>
                    <Route
                      path="lab-agent-report-collection"
                      element={<LabAgentReportCollection />}
                    ></Route>
                    <Route
                      path="lab-agent-report-delivery"
                      element={<LabAgentReportDeliveryToPatient />}
                    ></Route>
                    <Route
                      path="lab-agent-payment-receive/:id"
                      element={<LabAgentPaymentReceive />}
                    ></Route>
                    {/* rate list  */}
                    <Route
                      path="rate-list"
                      element={<LabAgentRateList />}
                    ></Route>
                    {/* Report Deliver */}
                    <Route
                      path="report-delivery"
                      element={<ReportDelivery />}
                    />
                    <Route
                      path="report-delivery/:id"
                      element={<ReportDeliveryById />}
                    />
                    <Route
                      path="report-delivery-list"
                      element={<ReportDeliveryList />}
                    />
                    <Route
                      path="money-receipt-list"
                      element={<MoneyReceiptList />}
                    />
                    {/* lab agent setup */}
                    <Route
                      path="lab-agent-income-summary"
                      element={<LabAgentIncomeSummary />}
                    />
                    <Route
                      path="lab-agent-expense-summary"
                      element={<LabAgentExpenseSummary />}
                    />
                    <Route
                      path="lab-agent-income-expense-report"
                      element={<LabAgentIncomeExpenseSummary />}
                    />
                  </>
                }
                <Route
                  path="musculo-skeletal-examination-setup"
                  element={<MusculoSkeletalExaminationSetup />}
                />
                <Route
                  path="add-medicinecategory"
                  element={<AddMedicineCategory />}
                />
                <Route path="general-note-setup" element={<GeneralNote />} />
                <Route path="doctor-advice" element={<DoctorAdvice />} />
                {
                  <>
                    {/* <Route path="lab-module" element={<LabModule />}> </Route> */}
                    <Route
                      path="lab-module-new"
                      element={<LabModuleMain />}
                    ></Route>
                    <Route
                      path="allergy-setup"
                      element={<AllergySetup />}
                    ></Route>
                  </>
                }
                {/* Appointment Setup Start */}
                <Route
                  path="/add-appointment-length"
                  element={<AddAppointmentLength />}
                ></Route>
                <Route
                  path="/appointment-length"
                  element={<AppointmentLength />}
                ></Route>
                <Route
                  path="/edit-appointment-length/:id"
                  element={<EditAppointmentLength />}
                ></Route>
                <Route
                  path="/appointment-type"
                  element={<AppointmentType />}
                ></Route>
                <Route
                  path="/add-appointment-types"
                  element={<AddAppointmentType />}
                ></Route>
                <Route
                  path="/edit-appointment-types/:id"
                  element={<EditAppointmentType />}
                ></Route>
                {/* <Route path="/time-slots" element={<TimeSlots />}></Route> */}
                {/* <Route path="/add-time-slots" element={<AddTimeSlots />}></Route> */}
                <Route
                  path="/edit-time-slots/:id"
                  element={<EditTimeSlots />}
                ></Route>
                <Route path="/time-limits" element={<TimeLimits />}></Route>
                <Route
                  path="/add-time-limits"
                  element={<AddTimeLimits />}
                ></Route>
                <Route
                  path="/edit-time-limits/:id"
                  element={<EditTimeLimits />}
                ></Route>
                <Route
                  path="/edit-clinical-indications/:id"
                  element={<EditClinicalIndications />}
                ></Route>
                <Route
                  path="/clinical-details"
                  element={<ClinicalDetails />}
                ></Route>
                <Route
                  path="/add-radiology-test-type"
                  element={<AddRadiologyTestType />}
                ></Route>
                <Route
                  path="/edit-radiology-test-type/:id"
                  element={<EditRadiologyTestType />}
                ></Route>
                <Route
                  path="/add-pathalogy-test-name"
                  element={<AddPathalogyTestName />}
                ></Route>
                <Route
                  path="/edit-pathalogy-test-name/:id"
                  element={<EditPathalogyTestName />}
                ></Route>
                {/* Appointment Setup End */}
                {/* Doctor Setup Start*/}
                {/* lab setup */}
                {/* proceduresetup */}
                {/* indication setup */}
                {/* findings setup */}
                {/* procedure details setup */}={/* item numbers setup */}
                {/* incision */}
                <Route path="/incision" element={<Incision />}></Route>
                <Route path="/add-incision" element={<AddIncision />}></Route>
                <Route
                  path="/edit-incision/:id"
                  element={<EditIncision />}
                ></Route>
                {/* Pathology setup */}
                {/* Drain setup */}
                {/* antibiotics */}
                {/* blood loss */}
                {/* observation */}
                {/* diet */}
                {/* analgesia */}
                {/* dvt prop */}
                {/* antibiotics */}
                <Route
                  path="/antibiotics-two"
                  element={<AntibioticsTwoName />}
                ></Route>
                <Route
                  path="/add-antibiotics-two-name"
                  element={<AddAntibioticsTwoName />}
                ></Route>
                <Route
                  path="/edit-antibiotics-two-name/:id"
                  element={<EditAntibioticsTwoName />}
                ></Route>
                {/* discharge */}
                {/* followup */}
                <Route path="/followup" element={<FollowupName />}></Route>
                {/* past operative */}
                {/* Doctor Setup End*/}
                {/* {Billing Setup Start} */}
                {/* {Billing Setup End} */}
                {/* Anatomy setup start  */}
                {/* Anatomy setup start  */}
                {/* History && Examination */}
                <Route path="/user-type" element={<UserType />}></Route>
                <Route path="/add-user-type" element={<AddUserType />}></Route>
                <Route
                  path="/edit-user-type/:id"
                  element={<EditUserType />}
                ></Route>
                <Route path="/media-type" element={<MediaType />}></Route>
                <Route
                  path="/add-media-type"
                  element={<AddMediaType />}
                ></Route>
                <Route
                  path="/edit-media-type/:id"
                  element={<EditMediaType />}
                ></Route>
                <Route path="/whispertest" element={<WhisperTest />}></Route>
                <Route
                  path="/add-whispertest"
                  element={<AddWhisperTest />}
                ></Route>
                <Route
                  path="/edit-whispertest/:id"
                  element={<EditWhisperTest />}
                ></Route>
                <Route path="/rinnestest" element={<RinnesTest />}></Route>
                <Route
                  path="/add-rinnestest"
                  element={<AddRinnesTest />}
                ></Route>
                <Route
                  path="/edit-rinnestest/:id"
                  element={<EditRinnesTest />}
                ></Route>
                <Route path="/temparature" element={<Temparature />}></Route>
                <Route
                  path="/add-temparature"
                  element={<AddTemparature />}
                ></Route>
                <Route
                  path="/edit-temparature/:id"
                  element={<EditTemparature />}
                ></Route>
                <Route path="/arrangements" element={<Arrangements />}></Route>
                <Route
                  path="/add-arrangements"
                  element={<AddArrangements />}
                ></Route>
                <Route
                  path="/edit-arrangements/:id"
                  element={<EditArrangements />}
                ></Route>
                {/* Women's Health */}
                {/* morshed start */}
                {/* patient-vital reading */}
                {/* Nurse */}
                {/* Nurse */}
                {/* ------------------lab agent start ---------- */}
                {
                  <>
                    <Route
                      path="lab-agent"
                      element={<LabAgentBilling />}
                    ></Route>
                  </>
                }
                {/* ------------------lab agent end---------- */}
                {/* History && Examination End*/}
                {
                  <>
                    <Route path="/users" element={<UserTypeAssigin />} />
                    <Route
                      path="/sign-up"
                      element={<New_users_registration />}
                    />
                    {<Route path="/sign-up-admin" element={<RegForm />} />}

                    <Route
                      path="/user-role-system"
                      element={<UserRoleManagement />}
                    />
                    <Route
                      path="password_change"
                      element={<UpdatePassword />}
                    ></Route>
                    <Route
                      path="user-profile"
                      element={<UserProfile />}
                    ></Route>
                  </>
                }
                {/* Billing & Invoice */}
                {
                  <>
                    <Route path="/billing/:id" element={<BillingInvoice />} />
                    <Route
                      path="/billingPatient"
                      element={<BillingPatient />}
                    />
                    <Route path="/mhp-invoice" element={<MhpInvoice />} />
                    <Route path="/income-summary" element={<IncomeSummary />} />
                    <Route
                      path="/expense-summary"
                      element={<ExpenseSummary />}
                    />
                    <Route
                      path="/income-expense-report"
                      element={<AccountsReport />}
                    />
                  </>
                }
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
      {pathNames[1] !== "video-call" && <Footer></Footer>}
    </div>
  );
}
