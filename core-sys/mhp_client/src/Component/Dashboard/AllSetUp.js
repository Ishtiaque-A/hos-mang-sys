import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard_sidebar.css";

const alladminList = [
  {
    title: "Appointment setup",
    setup: [
      { name: "Ethnicity", link: "/ethnicity" },
      { name: "Religions", link: "/religions" },
      { name: "Occupation", link: "/occupation" },
      { name: "Country", link: "/country" },
      { name: "City", link: "/city" },
      { name: "Gender", link: "/birth-sex" },
      { name: "Status", link: "/status" },
      { name: "Title", link: "/title" },
      { name: "Location", link: "/location" },
      { name: "Contact Via", link: "/contact-via" },
      { name: "State", link: "/state" },
      { name: "Usual Provider", link: "/usual-provider" },
      { name: "Usual Account", link: "/usual-account" },
      { name: "Time Per Patients", link: "/timesetup" },
      { name: "Appointment Length", link: "/appointment-length" },
      { name: "Appointment Type", link: "/appointment-type" },
      // { name: "Time Slots", link: "/time-slots" },
      { name: "Time Limits", link: "/time-limits" },
      { name: "Blood Group", link: "/blood-group" },
      { name: "User Type", link: "/user-type" },
    ],
  },
  {
    title: "Doctor setup",
    setup: [
      { name: "Test", link: "/all-test" },
      { name: "Visit Type", link: "/all-visit" },
      { name: "Reaction", link: "/reaction" },
      { name: "Diagnosis", link: "/diagnosis" },
      { name: "Past Alcohol Consumption", link: "/palcconsumption" },
      { name: "Ocupational Hazards", link: "/occupational-hazards" },
      { name: "Current Smoking History", link: "/current-smoking-history" },
      { name: "Tobacco Type", link: "/tobacco-type" },
      { name: "Tobacco cost (per day)", link: "/tobacco-cost" },
      { name: "Advice & Suggestion", link: "/advice-suggestion" },
      { name: "Tobacco Type", link: "/diagnosis-action" },
      { name: "Diagnosis Action", link: "/tobacco-type" },
      { name: "Drugs Generic Name", link: "/generic-name" },
      { name: "Drug Name", link: "/drug-name" },
      { name: "Drug Unit", link: "/drug-unit" },
      { name: "Route Name", link: "/route-name" },
      { name: "Dose Name", link: "/dose-name" },
      { name: "Frequency Name", link: "/frequency-name" },
      { name: "Food Name", link: "/food-name" },
      { name: "Others Name", link: "/others-name" },
      { name: "Departments", link: "/department" },
      { name: "Specialist", link: "/specialist" },
      { name: "General Note", link: "/general-note-setup" },
      { name: "Doctor advice", link: "/doctor-advice" },
    ],
  },
  {
    title: "Custom medicine",
    setup: [
      {
        title: "Custom Medicine",
        name: "Ingredient Name",
        link: "/all-ingredient",
      },
      {
        title: "Custom Medicine",
        name: "Restriction Name",
        link: "/all-restriction",
      },
      {
        title: "Custom Medicine",
        name: "Medicine Category",
        link: "/all-medicinecategory",
      },
      {
        title: "Custom Medicine",
        name: "Custom Medicine",
        link: "/custom-medicine",
      },
    ],
  },
  {
    title: "Immunisation",
    setup: [
      {
        title: "Immunisation",
        name: "Billing Provider",
        link: "/billing-provider",
      },
      { title: "Immunisation", name: "Restriction Name", link: "/given-by" },
      { title: "Immunisation", name: "Given by", link: "/given-by" },
      { title: "Immunisation", name: "Batch No.", link: "/batch-no" },
      {
        title: "Immunisation",
        name: "Immunisation Route",
        link: "/immunisation-route",
      },
      {
        title: "Immunisation",
        name: "Immunisation Site",
        link: "/immunisation-site",
      },
      { title: "Immunisation", name: "Vaccine Name", link: "/vaccine-name" },
      {
        title: "Immunisation",
        name: " Vaccine Against",
        link: "/vaccine-against",
      },
    ],
  },
  {
    title: "Physical activity",
    setup: [
      {
        title: "Physical Activity",
        name: "Current Excercise Level",
        link: "/current-excercise-level",
      },
      {
        title: "Physical Activity",
        name: "Aerobic Exercise",
        link: "/aerobic-exercise",
      },
      {
        title: "Physical Activity",
        name: "Strength Building",
        link: "/strength-building",
      },
      { title: "Physical Activity", name: "Endurance", link: "/endurance" },
      {
        title: "Physical Activity",
        name: "Frequency",
        link: "/frequency-physical",
      },
    ],
  },
  {
    title: "Reminders",
    setup: [
      {
        title: "Reminders",
        name: "Reminder Reason",
        link: "/reminder-reason",
      },
    ],
  },
  {
    title: "Care suggestion",
    setup: [
      {
        title: "Care Suggestion",
        name: "Care Suggestion",
        link: "/care-suggestion",
      },
      {
        title: "Care Suggestion",
        name: "Suggestion Details",
        link: "/care-details",
      },
    ],
  },
  {
    title: "Medication chart",
    setup: [
      {
        title: "Medication Chart",
        name: "Facility/Services",
        link: "/services-name",
      },
      { title: "Medication Chart", name: "Ward/Unit", link: "/unit-name" },
      {
        title: "Medication Chart",
        name: "Code MUST be circled",
        link: "/code-must-be-circled-reason",
      },
      {
        title: "Medication Chart",
        name: "Guidelines Only",
        link: "/guidelines-only-recommended",
      },
    ],
  },
  {
    title: "Lab setup",
    setup: [
      {
        title: "Medication Chart",
        name: "Test Type",
        link: "/lab_test_type",
      },
      {
        title: "Medication Chart",
        name: "Test Type",
        link: "/lab_test_name",
      },
    ],
  },
  {
    title: "Doctor inbox setup",
    setup: [
      {
        title: "Doctor Inbox Setup",
        name: "The result is",
        link: "/the-result-is",
      },
      {
        title: "Doctor Inbox Setup",
        name: "Action To be Taken",
        link: "/action-tobe-taken",
      },
      {
        title: "Doctor Inbox Setup",
        name: "Store Result In",
        link: "/store-result-in",
      },
    ],
  },
  {
    title: "Procedure report setup",
    setup: [
      {
        title: "Procedure Report Setup",
        name: "Item Numbers",
        link: "/item-numbers",
      },
      {
        title: "Procedure Report Setup",
        name: "Indication",
        link: "/indication",
      },
      {
        title: "Procedure Report Setup",
        name: "Procedure",
        link: "/procedure-report-name",
      },
      {
        title: "Procedure Report Setup",
        name: "Findings",
        link: "/findings",
      },
      {
        title: "Procedure Report Setup",
        name: "Incision",
        link: "/incision",
      },
      {
        title: "Procedure Report Setup",
        name: "Pathology",
        link: "/pathology",
      },
      { title: "Procedure Report Setup", name: "Drain", link: "/drain" },
      {
        title: "Procedure Report Setup",
        name: "Antibiotics",
        link: "/antibiotics",
      },
      {
        title: "Procedure Report Setup",
        name: "Blood Loss",
        link: "/blood-loss",
      },
      {
        title: "Procedure Report Setup",
        name: "Procedure Details",
        link: "/procedure-details",
      },
      {
        title: "Procedure Report Setup",
        name: "Observation",
        link: "/observation",
      },
      { title: "Procedure Report Setup", name: "Diet", link: "/Diet" },
      {
        title: "Procedure Report Setup",
        name: "Analgesia",
        link: "/analgesia",
      },
      {
        title: "Procedure Report Setup",
        name: "Dvt Prop",
        link: "/dvt-prop",
      },
      {
        title: "Procedure Report Setup",
        name: "Antibiotics Two",
        link: "/antibiotics-two",
      },
      {
        title: "Procedure Report Setup",
        name: "Discharge",
        link: "/discharge",
      },
      {
        title: "Procedure Report Setup",
        name: "Follow Up",
        link: "/followup",
      },
      {
        title: "Procedure Report Setup",
        name: "Post Operative",
        link: "/post-operative",
      },
    ],
  },
  {
    title: "Discharge summary setup",
    setup: [
      {
        title: "Discharge summary setup",
        name: "Investigation",
        link: "/investigation",
      },
      {
        title: "Discharge summary setup",
        name: "Pain Relief",
        link: "/pain-relief",
      },
      {
        title: "Discharge summary setup",
        name: "Hygiene",
        link: "/hygiene",
      },
      {
        title: "Discharge summary setup",
        name: "Dressing",
        link: "/dressing",
      },
      {
        title: "Discharge summary setup",
        name: "Exercise",
        link: "/exercise",
      },
      {
        title: "Discharge summary setup",
        name: "Wound Care",
        link: "/wound-care",
      },
      {
        title: "Discharge summary setup",
        name: "Recommendation",
        link: "/recommendation",
      },
    ],
  },
  {
    title: "Billing setup",
    setup: [
      { title: "Billing Setup", name: "Digital", link: "/digital" },
      { title: "Billing Setup", name: "Card", link: "/card" },
      { title: "Billing Setup", name: "Branch", link: "/branch" },
      { title: "Billing Setup", name: "Bank", link: "/bank" },
      {
        title: "Billing Setup",
        name: "Doctor Fee Name",
        link: "/doctorFee-name",
      },
      { title: "Billing Setup", name: "Doctor Fee", link: "/doctor-fee" },
      {
        title: "Billing Setup",
        name: "Procedure Name",
        link: "/procedure-name",
      },
      {
        title: "Billing Setup",
        name: "Procedure Fees",
        link: "/procedure-fee",
      },
    ],
  },
  {
    title: "Anatomy setup",
    setup: [
      {
        title: "Anatomy Setup",
        name: "Main Body Part",
        link: "/main-body-part",
      },
      {
        title: "Anatomy Setup",
        name: "Sub Body Part",
        link: "/sub-body-part",
      },
      { title: "Anatomy Setup", name: "Symptoms", link: "/symptoms-anatomy" },
    ],
  },

  //History Setup start
  {
    title: "Cardiovascular",
    setup: [
      { title: "Cardiovascular", name: "Examination", link: "/examination" },
      { title: "Cardiovascular", name: "History", link: "/history" },
      {
        title: "Cardiovascular",
        name: "Exam History Selection Parameter",
        link: "/selection-parameter",
      },
      {
        title: "Cardiovascular",
        name: "Exam History Extension",
        link: "/history-extension",
      },
      { title: "Cardiovascular", name: "Carotid", link: "/carotid" },
      {
        title: "Cardiovascular",
        name: "Selection Criteria",
        link: "/selection-criteria",
      },
      { title: "Cardiovascular", name: "Apex Beat", link: "/apex-beat" },
      {
        title: "Cardiovascular",
        name: "Apex Beat Character",
        link: "/intercostal-space",
      },
      {
        title: "Cardiovascular",
        name: "History Exam Status",
        link: "/history-exam-status",
      },
      { title: "Cardiovascular", name: "Selection", link: "/heartSound" },
      { title: "Cardiovascular", name: "Volume", link: "/volume" },
      { title: "Cardiovascular", name: "Murmur", link: "/murmur" },
      {
        title: "Cardiovascular",
        name: "Ischaemic Risk Factor",
        link: "/ischaemic-risk-factor",
      },
      { title: "Cardiovascular", name: "Dyspnea", link: "/others" },
    ],
  },
  {
    title: "ENT",
    setup: [
      { title: "ENT", name: "Ear Canal", link: "/ear-canal" },
      { title: "ENT", name: "Ear Lesion", link: "/ear-lesion" },
      {
        title: "ENT",
        name: "Tympanic Membrane/Glue Ear",
        link: "/tympanic-membrane",
      },
      { title: "ENT", name: "Mastoid", link: "/mastoid" },
      { title: "ENT", name: "Posterior Auricular", link: "/posterior" },
      { title: "ENT", name: "Tunning Fork", link: "/tunning-fork" },
      { title: "ENT", name: "Weber Test", link: "/weberTest" },
      { title: "ENT", name: "Throat", link: "/throat" },
      { title: "ENT", name: "Ulser", link: "/ulser" },
      { title: "ENT", name: "Tongue", link: "/tongue" },
      { title: "ENT", name: "Tonsil", link: "/tonsil" },
      { title: "ENT", name: "Nose", link: "/nose" },
      { title: "ENT", name: "Tongue Lesion", link: "/tongueLesion" },
      { title: "ENT", name: "Ear", link: "/ear" },
      { title: "ENT", name: "Discharge", link: "/ear-discharge" },
      { title: "ENT", name: "Deafness", link: "/deafness" },
      { title: "ENT", name: "Ent Others", link: "/ent-others" },
      { title: "ENT", name: "Renne Test", link: "/renne-test" },
    ],
  },
  {
    title: "CNS part one",
    setup: [
      { title: "CNS Part one", name: "OL Factory", link: "/olfactory" },
      { title: "CNS Part one", name: "Fundoscopy", link: "/fundoscopy" },
      { title: "CNS Part one", name: "Visual Acuity", link: "/visualacuity" },
      { title: "CNS Part one", name: "Visual Field", link: "/visualfield" },
      {
        title: "CNS Part one",
        name: "Papillary Oedema",
        link: "/papillaryoedema",
      },
      { title: "CNS Part one", name: "Pupil", link: "/pupil" },
      { title: "CNS Part one", name: "Light Reflex", link: "/lightreflex" },
      { title: "CNS Part one", name: "Eye Movements", link: "/eyemovements" },
      { title: "CNS Part one", name: "Sensory", link: "/sensory" },
      { title: "CNS Part one", name: "Jaw Jerk", link: "/jawjerk" },
      { title: "CNS Part one", name: "Looking Up", link: "/lookingup" },
      {
        title: "CNS Part one",
        name: "Drooping Corner Of Mouth",
        link: "/droopingcorner",
      },
      { title: "CNS Part one", name: "Whisper Test", link: "/whispertest" },
      { title: "CNS Part one", name: "Rinne's Test", link: "/rinnestest" },
      {
        title: "CNS Part one",
        name: "Hallpike Manoeuvre",
        link: "/hallpike",
      },
      { title: "CNS Part one", name: "Uvula", link: "/uvula" },
      { title: "CNS Part one", name: "Neck Movement", link: "/neckmovement" },
      {
        title: "CNS Part one",
        name: "Shrug The Shoulder",
        link: "/shrugshoulder",
      },
      {
        title: "CNS Part one",
        name: "Fasciculation",
        link: "/fasciculation",
      },
      {
        title: "CNS Part one",
        name: "Posterior third of tongue sensation (XI)",
        link: "/sensation",
      },
      { title: "CNS Part one", name: "Tongue", link: "/cnstongue" },
      { title: "CNS Part one", name: "Motor", link: "/motor" },
      {
        title: "CNS Part one",
        name: "On Shutting Eye",
        link: "/on-shutting-eye",
      },
      { title: "CNS Part one", name: "UPPER LIMB", link: "/upper-limb" },
    ],
  },
  {
    title: "CNS part two",
    setup: [
      { title: "CNS Part two", name: "Ear & Palate", link: "/earpalate" },
      { title: "CNS Part two", name: "Gas Reflex", link: "/gasreflex" },
      { title: "CNS Part two", name: "Cn-I", link: "/cnOne" },
      { title: "CNS Part two", name: "Cn-II", link: "/cnTwo" },
      { title: "CNS Part two", name: "Cn-III IV VI", link: "/cnThree" },
      { title: "CNS Part two", name: "Cn-V", link: "/cnFive" },
      { title: "CNS Part two", name: "Cn-VII", link: "/cn7" },
      { title: "CNS Part two", name: "Cn-VIII", link: "/cnSix" },
      { title: "CNS Part two", name: "Cn-IX,X", link: "/cnSeven" },
      { title: "CNS Part two", name: "Cn-XI", link: "/cnEight" },
      { title: "CNS Part two", name: "Cn-XII", link: "/cnNine" },
      { title: "CNS Part two", name: "Left Value", link: "/left-value" },
      { title: "CNS Part two", name: "Right Value", link: "/right-value" },
      { title: "CNS Part two", name: "Power", link: "/power" },
      {
        title: "CNS Part two",
        name: "The Radial Nerve",
        link: "/the-radial-nerve",
      },
      { title: "CNS Part two", name: "Jerk (C1,C8)", link: "/jerk-c1-c8" },
      {
        title: "CNS Part two",
        name: "Finger Nose Test",
        link: "/finger-nose-test",
      },
      {
        title: "CNS Part two",
        name: "Picture upper limb dermatomes",
        link: "/picture-upper-limb-dermatomes",
      },
    ],
  },
  {
    title: "Mental health main",
    setup: [
      {
        title: "Mental Health Main",
        name: "Appearance",
        link: "/appearance",
      },
      { title: "Mental Health Main", name: "Behaviour", link: "/behaviour" },
      {
        title: "Mental Health Main",
        name: "Attitute Towards Examination",
        link: "/attitude-towards-examination",
      },
      { title: "Mental Health Main", name: "Mood", link: "/mood" },
      { title: "Mental Health Main", name: "Affect", link: "/affect" },
      {
        title: "Mental Health Main",
        name: "Appropriteness",
        link: "/appropriteness",
      },
      {
        title: "Mental Health Main",
        name: "Attitute Towards",
        link: "/attitute",
      },
      { title: "Mental Health Main", name: "Speech", link: "/speech" },
      {
        title: "Mental Health Main",
        name: "perceptual",
        link: "/Perceptual Disturbances",
      },
    ],
  },
  {
    title: "Mental health others",
    setup: [
      {
        title: "Mental Health Others",
        name: "PHQ-9 Questionnaire",
        link: "/phq-9-questionnaire",
      },
      {
        title: "Mental Health Others",
        name: "PHQ-9 Questionnaire value",
        link: "/phq-9-questionnaire-value",
      },
    ],
  },
  {
    title: "Respiratory",
    setup: [
      { title: "Respiratory", name: "Breath Sound", link: "/breathsound" },
      {
        title: "Respiratory",
        name: "Abnormal Breathing",
        link: "/abnormal-breathing",
      },
      {
        title: "Respiratory",
        name: "Chest Expansion",
        link: "/chest-expansion",
      },
      { title: "Respiratory", name: "Wheering", link: "/wheering" },
      { title: "Respiratory", name: "Chest Shape", link: "/chestshape" },
      { title: "Respiratory", name: "Percussion", link: "/percussion" },
      {
        title: "Respiratory",
        name: "Vocal Fremitus",
        link: "/vocal-fremitus",
      },
      {
        title: "Respiratory",
        name: "Vocal Resonance",
        link: "/vocal-resonance",
      },
      { title: "Respiratory", name: "Crepitation", link: "/crepitation" },
      { title: "Respiratory", name: "Symptoms", link: "/symptoms" },
      { title: "Respiratory", name: "Pembertons", link: "/pembertons" },
      { title: "Respiratory", name: "Cough", link: "/cough" },
      { title: "Respiratory", name: "Dyspnea", link: "/dyspnea" },
      { title: "Respiratory", name: "Dyspnea Class", link: "/dyspnea-class" },
      {
        title: "Respiratory",
        name: "Medical History",
        link: "/medical-history",
      },
      {
        title: "Respiratory",
        name: "Sleep Apnoea Risk",
        link: "/sleep-apnoea-risk",
      },
      { title: "Respiratory", name: "Questionnaire", link: "/questionnaire" },
      {
        title: "Respiratory",
        name: "Exmanination List",
        link: "/exmanination-list",
      },
      {
        title: "Respiratory",
        name: "Cripatation Left",
        link: "/cripatation-left",
      },
      {
        title: "Respiratory",
        name: "Cripatation Right",
        link: "/cripatation-right",
      },
      {
        title: "Respiratory",
        name: "Cripatation Both",
        link: "/cripatation-both",
      },
      { title: "Respiratory", name: "Wheezing Left", link: "/wheezing-left" },
      {
        title: "Respiratory",
        name: "Wheezing Right",
        link: "/wheezing-right",
      },
      { title: "Respiratory", name: "Wheezing Both", link: "/wheezing-both" },
    ],
  },
  {
    title: "Gastro intestinal",
    setup: [
      { title: "Gastro Intestinal", name: "Skin", link: "/skin" },
      {
        title: "Gastro Intestinal",
        name: "Hand And Finger",
        link: "/hand-and-finger",
      },
      {
        title: "Gastro Intestinal",
        name: "Left Supraclavicular Node",
        link: "/left-supraclavicular-node",
      },
      {
        title: "Gastro Intestinal",
        name: "Tongue Mouth",
        link: "/tongue-mouth",
      },
      { title: "Gastro Intestinal", name: "Abdomen", link: "/abdomen" },
      { title: "Gastro Intestinal", name: "Bruit", link: "/bruit" },
      {
        title: "Gastro Intestinal",
        name: "Tenderness",
        link: "/non-tender-tenderness",
      },
      { title: "Gastro Intestinal", name: "Mass", link: "/no-masses-mass" },
      { title: "Gastro Intestinal", name: "Hernias", link: "/hernias" },
      {
        title: "Gastro Intestinal",
        name: "Hernias Inguinal",
        link: "/hernias-inguinal",
      },
      {
        title: "Gastro Intestinal",
        name: "Hernias Femoral",
        link: "/hernias-femoral",
      },
      { title: "Gastro Intestinal", name: "Per Rectal", link: "/per-rectal" },
      {
        title: "Gastro Intestinal",
        name: "Sigmoidoscopy",
        link: "/sigmoidoscopy",
      },
      {
        title: "Gastro Intestinal",
        name: "Sigmoidoscopy-Guaiac Test",
        link: "/sigmoidoscopy-guaiac-test",
      },
      { title: "Gastro Intestinal", name: "Site", link: "/site" },
      { title: "Gastro Intestinal", name: "Radiation", link: "/radiation" },
      { title: "Gastro Intestinal", name: "Pattern", link: "/pattern" },
      { title: "Gastro Intestinal", name: "Duration", link: "/duration" },
      { title: "Gastro Intestinal", name: "Frequency", link: "/frequency" },
      { title: "Gastro Intestinal", name: "Score", link: "/score" },
      { title: "Gastro Intestinal", name: "Vomiting", link: "/vomiting" },
      { title: "Gastro Intestinal", name: "Dysphagia", link: "/dysphagia" },
      { title: "Gastro Intestinal", name: "Diarrhoea", link: "/diarrhoea" },
      { title: "Gastro Intestinal", name: "Stool Type", link: "/stool-type" },
      { title: "Gastro Intestinal", name: "PR Bleed", link: "/pr-bleed" },
    ],
  },
  {
    title: "Genito urinary",
    setup: [
      { title: "Genito Urinary", name: "Renal Mass", link: "/renal-mass" },
      {
        title: "Genito Urinary",
        name: "Urine Analysis",
        link: "/urine-analysis",
      },
    ],
  },
  {
    title: "General",
    setup: [
      { title: "General", name: "Dehydration", link: "/dehydration" },
      {
        title: "General",
        name: "Radio femoral delay",
        link: "/radio-femoral-delay",
      },
      { title: "General", name: "Nail sign", link: "/nail-sign" },
    ],
  },
  {
    title: "Eye part one",
    setup: [
      {
        title: "Eye part One",
        name: "Lesion Middle",
        link: "/lesion-middle",
      },
      { title: "Eye part One", name: "Lesion Right", link: "/lesion-right" },
      {
        title: "Eye part One",
        name: "External Observation",
        link: "/external-observation",
      },
      { title: "Eye part One", name: "Phoria One", link: "/phoria-one" },
      { title: "Eye part One", name: "Phoria Two", link: "/phoria-two" },
      { title: "Eye part One", name: "Shape", link: "/shape" },
      { title: "Eye part One", name: "Pursuits", link: "/pursuits" },
      { title: "Eye part One", name: "Saccades", link: "/saccades" },
      { title: "Eye part One", name: "Neuro Opthal", link: "/neuro-opthal" },
      {
        title: "Eye part One",
        name: "Swollen Eye Lid",
        link: "/swollen-eye-lid",
      },
      { title: "Eye part One", name: "Lesion", link: "/lesion" },
    ],
  },
  {
    title: "Eye part two",
    setup: [
      { title: "Eye part Two", name: "Worth 4 Dot", link: "/worth-4-dot" },
      {
        title: "Eye part Two",
        name: "Convergence",
        link: "/eom-convergence",
      },
      {
        title: "Eye part Two",
        name: "Accomodation",
        link: "/eom-accomodation",
      },
      {
        title: "Eye part Two",
        name: "Dry Retinoscopy",
        link: "/dry-retinoscopy",
      },
      { title: "Eye part Two", name: "Maddox Wing", link: "/maddox-wing" },
      {
        title: "Eye part Two",
        name: "Mid Line Crossing",
        link: "/mid-line-crossing",
      },
      { title: "Eye part Two", name: "Pen Grip", link: "/pen-grip" },
      {
        title: "Eye part Two",
        name: "Pen Grip Right",
        link: "/pen-grip-right",
      },
      { title: "Eye part Two", name: "Posture", link: "/posture" },
      { title: "Eye part Two", name: "Color Vision", link: "/color-vision" },
      { title: "Eye part Two", name: "Dilate", link: "/dilate" },
      { title: "Eye part Two", name: "CD Disc", link: "/cd-disc" },
      {
        title: "Eye part Two",
        name: "Neuro Opthalmology",
        link: "/neuro-opthalmology",
      },
    ],
  },
  {
    //baki ase
    title: "Musculo skeletal",
    setup: [
      { title: "Musculo Skeletal", name: "Movement", link: "/movement" },
      {
        title: "Musculo Skeletal",
        name: "Tender Over Spinus Process at",
        link: "/tender-over-spinus-process-at",
      },
      {
        title: "Musculo Skeletal",
        name: "Tenerness Over Facet Join",
        link: "/tenerness-over-facet-join",
      },
      { title: "Musculo Skeletal", name: "Inspection", link: "/inspection" },
      {
        title: "Musculo Skeletal",
        name: "Pain along anterior",
        link: "/pain-along-anterior",
      },
      {
        title: "Musculo Skeletal",
        name: "Pain over posterior",
        link: "/pain-over-posterior",
      },
      {
        title: "Musculo Skeletal",
        name: "Walk on heels",
        link: "/walk-on-heels",
      },
      {
        title: "Musculo Skeletal",
        name: "Posture thoraco",
        link: "/posture-thoraco",
      },
      {
        title: "Musculo Skeletal",
        name: "Tender over spinus process (Thoraco)",
        link: "/tender-over-spinus-thoraco",
      },
      {
        title: "Musculo Skeletal",
        name: "Tenderness over facet at (Thoraco)",
        link: "/tenderness-over-facet-thoraco",
      },
      {
        title: "Musculo Skeletal",
        name: "Tenderness over facet lrb",
        link: "/tenderness-over-facet-lrb-thoraco",
      },
      {
        title: "Musculo Skeletal",
        name: "Tender/Tenderness L1 To L6 Thoraco",
        link: "/tender-tenerness-over-l1-to-l6-thoraco",
      },
      {
        title: "Musculo Skeletal",
        name: "Lying on couch",
        link: "/lying-on-couch",
      },
      {
        title: "Musculo Skeletal",
        name: "Move Hip Pelvis",
        link: "/move-hip-pelvis",
      },
      {
        title: "Musculo Skeletal",
        name: "Sudden Anaesthesia",
        link: "/sudden-anaesthesia",
      },
      {
        title: "Musculo Skeletal",
        name: "Thoracic Kyphosis",
        link: "/thoracic-kyphosis",
      },
      {
        title: "Musculo Skeletal",
        name: "Lumber Lordosis",
        link: "/lumber-lordosis",
      },
      { title: "Musculo Skeletal", name: "Spine", link: "/spine" },
      {
        title: "Musculo Skeletal",
        name: "Pain Into Knee",
        link: "/pain-into-knee",
      },
      {
        title: "Musculo Skeletal",
        name: "Shape & Contour",
        link: "/shape-and-contour",
      },
      {
        title: "Musculo Skeletal",
        name: "Anterior View",
        link: "/anterior-view",
      },
      {
        title: "Musculo Skeletal",
        name: "Level of spine of scapula",
        link: "/level-of-spine-of-scapula",
      },
      {
        title: "Musculo Skeletal",
        name: "Winged Scapula",
        link: "/winged-scapula",
      },
      { title: "Musculo Skeletal", name: "Wrist", link: "/wrist" },
      {
        title: "Musculo Skeletal",
        name: "Metacarpophalangeal Joint",
        link: "/metacarpophalangeal-joint",
      },
      {
        title: "Musculo Skeletal",
        name: "Proximal Interphalangeal Joint",
        link: "/proximal-interphalangeal-joint",
      },
      {
        title: "Musculo Skeletal",
        name: "Distal Interphalangeal Joint",
        link: "/distal-interphalangeal-joint",
      },
      {
        title: "Musculo Skeletal",
        name: "L1 and L2. Hip Flexion",
        link: "/l1-and-l2-hip-flexion",
      },
      {
        title: "Musculo Skeletal",
        name: "L3 To L5 Power",
        link: "/l3-to-l5-power",
      },
      {
        title: "Musculo Skeletal",
        name: "L1 and L2 Sensation",
        link: "/l1-and-l2-sensation",
      },
      {
        title: "Musculo Skeletal",
        name: "L3 To L5 Sensation",
        link: "/l3-to-l5-sensation",
      },
      {
        title: "Musculo Skeletal",
        name: "S1 To S4 Test",
        link: "/s1-to-s4-test",
      },
      {
        title: "Musculo Skeletal",
        name: "Inspection Look",
        link: "/inspection-look-hip-pelvis",
      },
      {
        title: "Musculo Skeletal",
        name: "Test Hip Pelvis",
        link: "/test-hip-pelvis",
      },
      {
        title: "Musculo Skeletal",
        name: "Gait-Limping",
        link: "/gait-limping",
      },
      {
        title: "Musculo Skeletal",
        name: "Shoulder Movements",
        link: "/shoulder-movements",
      },
      {
        title: "Musculo Skeletal",
        name: "Painful Arc",
        link: "/painful-arc",
      },
      {
        title: "Musculo Skeletal",
        name: "Resisted Movement",
        link: "/resisted-movement",
      },
      { title: "Musculo Skeletal", name: "Nails", link: "/nails" },
      {
        title: "Musculo Skeletal",
        name: "Dorsum of Hand",
        link: "/dorsum-of-hand",
      },
      { title: "Musculo Skeletal", name: "Fingers", link: "/fingers" },
      { title: "Musculo Skeletal", name: "Tenders", link: "/tenders" },
      {
        title: "Musculo Skeletal",
        name: "Flexon Tendons",
        link: "/flexon-tendons",
      },
      {
        title: "Musculo Skeletal",
        name: "Wrist Palpation",
        link: "/wrist-palpation",
      },
      {
        title: "Musculo Skeletal",
        name: "Proximal Interphalangeal Joint Palpation",
        link: "/proximal-interphalangeal-palpation",
      },
      {
        title: "Musculo Skeletal",
        name: "Metacarpophalangeal Joint Palpation",
        link: "/metacarpophalangeal-joint-palpation",
      },
      {
        title: "Musculo Skeletal",
        name: "Flexor Digitorum Profundus Test",
        link: "/flexor-digitorum-profundus-test",
      },
      {
        title: "Musculo Skeletal",
        name: "Flexor Digitorum Superficialis Test",
        link: "/flexor-digitorum-superficialis-test",
      },
      {
        title: "Musculo Skeletal",
        name: "Inspection Male Female Degree",
        link: "/inspection-male-female",
      },
      {
        title: "Musculo Skeletal",
        name: "At 90° Flextion Palpation",
        link: "/at-90-flextion",
      },
      {
        title: "Musculo Skeletal",
        name: "At full Flextion Palpation",
        link: "/at-full-flextion",
      },
      {
        title: "Musculo Skeletal",
        name: "Flextion 0-150 Examination",
        link: "/flextion-0-to-150-examination",
      },
      {
        title: "Musculo Skeletal",
        name: "Anterior View Knee",
        link: "/anterior-view-knee",
      },
      {
        title: "Musculo Skeletal",
        name: "Posterior View Knee",
        link: "/posterior-view-knee",
      },
      {
        title: "Musculo Skeletal",
        name: "Lateral View Knee",
        link: "/lateral-view-knee",
      },
      {
        title: "Musculo Skeletal",
        name: "Stance Swat Knee",
        link: "/stance-swat-knee",
      },
      {
        title: "Musculo Skeletal",
        name: "Margin Condyle Tibial",
        link: "/margin-condyle-tibial",
      },
      { title: "Musculo Skeletal", name: "Toes Left", link: "/toes-left" },
      { title: "Musculo Skeletal", name: "MTP Joint", link: "/mtp-joint" },
      { title: "Musculo Skeletal", name: "PIP Joint", link: "/pip-joint" },
      { title: "Musculo Skeletal", name: "DIP Joint", link: "/dip-joint" },
      { title: "Musculo Skeletal", name: "Toes Right", link: "/toes-right" },
      {
        title: "Musculo Skeletal",
        name: "Dorsum Of Foot",
        link: "/dorsum-of-foot",
      },
    ],
  },
  {
    title: "Neurological",
    setup: [
      {
        title: "Neurological",
        name: "Parietal Lobe",
        link: "/parietal-lobe",
      },
      { title: "Neurological", name: "Frontal Lobe", link: "/frontal-lobe" },
      {
        title: "Neurological",
        name: "Temporal Lobe",
        link: "/temporal-lobe",
      },
      {
        title: "Neurological",
        name: "Occipital Lobe",
        link: "/occipital-lobe",
      },
      { title: "Neurological", name: "Continuous", link: "/continuous" },
      { title: "Neurological", name: "Intermittent", link: "/intermittent" },
      { title: "Neurological", name: "Speech", link: "/speech-nurologies" },
    ],
  },
  {
    title: "Women's health",
    setup: [
      { title: "Women's Health", name: "Volume", link: "/volume-women" },
      { title: "Women's Health", name: "PV Bleeding", link: "/pv-bleeding" },
      {
        title: "Women's Health",
        name: "PV Discharge",
        link: "/pv-discharge",
      },
      { title: "Women's Health", name: "Vulval", link: "/vulval" },
      { title: "Women's Health", name: "Miscarriage", link: "/miscarriage" },
      { title: "Women's Health", name: "Breast Lump", link: "/breast-lump" },
      { title: "Women's Health", name: "Breast Pain", link: "/breast-pain" },
      {
        title: "Women's Health",
        name: "Breast Nipple Discharge",
        link: "/breast-nipple-discharge",
      },
      { title: "Women's Health", name: "Vulva", link: "/vulva" },
      { title: "Women's Health", name: "Pelvic Mass", link: "/pelvic-mass" },
      {
        title: "Women's Health",
        name: "Bartholin Glandes",
        link: "/bartholin-glandes",
      },
      { title: "Women's Health", name: "Cervix", link: "/cervix" },
      { title: "Women's Health", name: "CST", link: "/cst" },
      {
        title: "Women's Health",
        name: "Gynecologies",
        link: "/gynecologies",
      },
      { title: "Women's Health", name: "Obstetrics", link: "/obstetrics" },
      { title: "Women's Health", name: "Breast", link: "/breast" },
    ],
  },
  {
    title: "Skin dermatology",
    setup: [
      {
        title: "Skin Dermatology",
        name: "All Body Part Front Back",
        link: "/all-body-part-front-back",
      },
      { title: "Skin Dermatology", name: "Areolar", link: "/areolar" },
      { title: "Skin Dermatology", name: "Skin Shape", link: "/skin-shape" },
      { title: "Skin Dermatology", name: "Color", link: "/color" },
      { title: "Skin Dermatology", name: "Palpation", link: "/palpation" },
      {
        title: "Skin Dermatology",
        name: "Temparature",
        link: "/temparature",
      },
      {
        title: "Skin Dermatology",
        name: "Arrangements",
        link: "/skin-symptoms",
      },
      { title: "Skin Dermatology", name: "Skin Type", link: "/skin-type" },
    ],
  },
  {
    title: "All history",
    setup: [
      {
        title: "All History",
        name: "Examination Heading",
        link: "/examination-heading",
      },
      {
        title: "All History",
        name: "Common History",
        link: "/common-history",
      },
    ],
  },
  //History Setup end
  {
    title: "Diagnosis/procedure",
    setup: [
      {
        title: "Diagnosis/Procedure",
        name: "Reason For Visit (ICD10)",
        link: "/diagnosis-procedure",
      },
      {
        title: "Diagnosis/Procedure",
        name: "Reason For Visit Type",
        link: "/diagnosis-procedure-for",
      },
      {
        title: "Diagnosis/Procedure",
        name: "Diagnosis/Procedure Actions",
        link: "/diagnosis-procedure-actions",
      },
      { title: "Diagnosis/Procedure", name: "Auto Fill", link: "/auto-fill" },
      {
        title: "Diagnosis/Procedure",
        name: "Review Name",
        link: "/review-name",
      },
    ],
  },
  {
    title: "Radiology setup",
    setup: [
      {
        title: "Radiology Setup",
        name: "Radiology Center",
        link: "/radiology-center",
      },
      {
        title: "Radiology Setup",
        name: "Test Type ",
        link: "/radiology-test-type",
      },
      {
        title: "Radiology Setup",
        name: "Test Name",
        link: "/radiology-test-name",
      },
      {
        title: "Radiology Setup",
        name: "Clinical Indications",
        link: "/clinical-indications",
      },
    ],
  },
  {
    title: "Pathology setup",
    setup: [
      {
        title: "Pathology Setup",
        name: "Laboratory",
        link: "/pathology-laboratory",
      },
      {
        title: "Pathology Setup",
        name: "Test Name ",
        link: "/pathalogy-test-name",
      },
      {
        title: "Pathology Setup",
        name: "Clinical Details",
        link: "/clinical-details",
      },
      {
        title: "Pathology Setup",
        name: "Favourite Test",
        link: "/favourite-test",
      },
    ],
  },
  {
    title: "Holiday",
    setup: [
      { title: "Holiday", name: "Add Holiday Group", link: "/holiday-group" },
      {
        title: "Holiday",
        name: "Add Holiday Sub Group",
        link: "/holiday-sub-group",
      },
      {
        title: "Holiday",
        name: "Add Holiday Weekend",
        link: "/weekend-holiday",
      },
    ],
  },
  {
    title: "Prescription",
    setup: [
      {
        title: "Prescription setup",
        name: "Prescription setup",
        link: "/prescription-setup",
      },
    ],
  },
  {
    title: "SMS/Email Gateway",
    setup: [
      {
        title: "SMS Gateway Setup",
        name: "SMS Gateway Setup",
        link: "/sms-gateway-setup",
      },
      {
        title: "SMS Dashboard",
        name: "SMS Dashboard",
        link: "/sms-dashboard",
      },
      {
        title: "SMS Package",
        name: "SMS Package",
        link: "/sms-package",
      },
      {
        title: "Email Gateway Setup",
        name: "Email Gateway Setup",
        link: "/email-gateway-setup",
      },
    ],
  },
  {
    title: "Morning Round",
    setup: [
      {
        title: "Anaemic",
        name: "Anaemic",
        link: "/round-anaemic-setup",
      },
      {
        title: "Jaundiced",
        name: "Jaundiced",
        link: "/round-jaundiced-setup",
      },
      {
        title: "Cyanosis",
        name: "Cyanosis",
        link: "/round-cyanosis-setup",
      },
      {
        title: "Skin Turgor",
        name: "Skin Turgor",
        link: "/round-skin-turgor-setup",
      },
      {
        title: "Mucositis",
        name: "Mucositis",
        link: "/round-mucositis-setup",
      },
      {
        title: "CVS",
        name: "CVS",
        link: "/round-cvs-setup",
      },
      {
        title: "Skin",
        name: "Skin",
        link: "/round-skin-setup",
      },
      {
        title: "Abdomen",
        name: "Abdomen",
        link: "/round-abdomen-setup",
      },
      {
        title: "Chest",
        name: "Chest",
        link: "/round-chest-setup",
      },
      {
        title: "CNS",
        name: "CNS",
        link: "/round-cns-setup",
      },
      {
        title: "Pathology Result",
        name: "Pathology Result",
        link: "/round-radiology-parameter-setup",
      },
      {
        title: "Drug Since Category",
        name: "Drug Since Category",
        link: "/drug-since-category-setup",
      },
      {
        title: "Drug Since Drugs",
        name: "Drug Since Drugs",
        link: "/drug-since-drugs-setup",
      },
      {
        title: "Treatment Protocol Name",
        name: "Treatment Protocol Name",
        link: "/round-treatment-protocol-name",
      },
      {
        title: "Treatment Protocol Cycle",
        name: "Treatment Protocol Cycle",
        link: "/round-treatment-protocol-cycle",
      },
      {
        title: "Treatment Protocol",
        name: "Treatment Protocol",
        link: "/round-treatment-protocol",
      },
    ],
  },
  {
    title: "Patient Admission",
    setup: [
      {
        title: "Doctor's Task Category",
        name: "Doctor's Task Category",
        link: "/doctor-task-category",
      },
      {
        title: "Nurse's Task Category",
        name: "Nurse's Task Category",
        link: "/nurse-task-category",
      },
      {
        title: "Doctor's Task",
        name: "Doctor's Task",
        link: "/doctor-task",
      },
      {
        title: "Nurse's Task",
        name: "Nurse's Task",
        link: "/nurse-task",
      },

    ],
  },
];

const AllSetUp = () => {
  const [data, setData] = useState(alladminList);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      const newResults = [];
      alladminList?.forEach((section) => {
        const title = section.title;
        const setupItems = section.setup.filter((item) =>
          item.name.toLowerCase().includes(searchTerm?.toLowerCase())
        );
        if (setupItems.length > 0) {
          newResults.push({ title, setup: setupItems });
        }
      });
      setData(newResults);
    } else {
      setData(alladminList);
    }
  }, [searchTerm]);
  return (
    <div className="all-setup-container custom-card h-100 ms-2 mt-2 p-3">
      <div className="setup-search d-flex align-items-center justify-content-between mt-2">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control form-control-sm w-25"
          placeholder="Search"
        />
        <h5 className="me-3">All Setup</h5>
      </div>
      <div className="row g-3 mt-3">
        {data.length === 0 && (
          <h5
            style={{
              fontSize: "20px",
              fontWeight: "semibold",
              color: "#9e9e9e",
              textAlign: "center",
            }}
          >
            No result Found for "{searchTerm}"
          </h5>
        )}
        {data?.map((item, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div
              className="setup-card"
              style={{
                // background: "whiteSmoke",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "5px 0px",
                  marginRight: " 5px",
                }}
              >
                <h6
                  style={{
                    fontSize: "17px",
                    fontWeight: "400",
                    margin: "0px",
                    padding: "2px 0px",
                  }}
                >
                  {item.title}
                </h6>
              </div>
              <div
                className="scroll-sidebar g-doc-scroll"
                style={{
                  height: "160px",
                  border: "none",
                }}
              >
                <ul>
                  {item?.setup?.map((linkItem, i) => (
                    <Link
                      key={i}
                      to={linkItem?.link}
                    // className="d-flex align-items-center gap-2"
                    >
                      {/* <IoMdLink size={18} /> */}
                      <li>{linkItem?.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSetUp;
