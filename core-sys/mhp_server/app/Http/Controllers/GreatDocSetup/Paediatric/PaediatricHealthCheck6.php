<?php

namespace App\Http\Controllers\GreatDocSetup\Paediatric;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPaediatricChildHealthCheck6;
use App\Models\MhpPaediatricTwelveMonthsHealthCheck;
use App\Models\MhpPaediatricEighteenMonthsHealthCheck;
use App\Models\MhpPaediatricPage1;
use App\Models\MhpPaediatricEighteenMonthVisit;
use App\Models\MhpPaediatricTwoYearsChildHealth;
use App\Models\MhpPaediatricFourYearHealthCheck;
use App\Models\MhpPaediatricFourYearsOld;
use App\Models\MhpPaediatricMilestone;
use App\Models\MhpPaediatricPageThree;
use App\Models\MhpPaediatricNewBorn;
use App\Models\MhpPaediatricParentPage4;
use App\Models\MhpPaediatricParentsPage5;
class PaediatricHealthCheck6 extends Controller
{
     public function store(Request $request)
    {
    //         $validator = Validator::make($request->all(),[
    //         'diagnosis_id' => 'required|max:100',
    //         'diagnosis_for_id' => 'required|max:100',
    //         'diagnosis_action_id' => 'required|max:100',
       
    //     ],
    // );

    //     if ($validator->fails())
    //     {
    //         return response()->json([
    //             'status' => 400,
    //             'errors' => $validator->messages(),
    //         ]);

    //     } 
    //     else{
    
            $paediatric_health_6 = new MhpPaediatricChildHealthCheck6();
            $paediatric_health_6->weight = $request->weight;
            $paediatric_health_6->length  = $request->length ;
            $paediatric_health_6->head_circumference = $request->head_circumference;
            $paediatric_health_6->corneal_light = $request->corneal_light;
            $paediatric_health_6->fixation = $request->fixation;
            $paediatric_health_6->one_eye_respone = $request->one_eye_respone;
            $paediatric_health_6->eye_movement = $request->eye_movement;
            $paediatric_health_6->visible_plaque = $request->visible_plaque;
            $paediatric_health_6->white_spot = $request->white_spot;
            $paediatric_health_6->clinical_ovserbation = $request->clinical_ovserbation;
            $paediatric_health_6->testes_descended_side = $request->testes_descended_side;
            $paediatric_health_6->testes_descended_value = $request->testes_descended_value;
            $paediatric_health_6->family_health_history = $request->family_health_history;
            $paediatric_health_6->parent_qtn = $request->parent_qtn;
            $paediatric_health_6->age_appropriate = $request->age_appropriate;
            $paediatric_health_6->hearing = $request->hearing;
            $paediatric_health_6->vision = $request->vision;
            $paediatric_health_6->hips = $request->hips;
            $paediatric_health_6->oral_health = $request->oral_health;
            $paediatric_health_6->outcome = $request->outcome;
            $paediatric_health_6->patient_id = $request->patient_id;
            $paediatric_health_6->comments = $request->comments;
            $paediatric_health_6->save();

            return response()->json(['status'=>200,'message'=>'Paediatric Added Successfully']);
        
    // }
}

//page 15 twelve months health check
public function twelveMonthsHealthCheck(Request $request){
  $paediatric_health_12 = new MhpPaediatricTwelveMonthsHealthCheck();
            $paediatric_health_12->weight = $request->weight;
            $paediatric_health_12->length  = $request->length ;
            $paediatric_health_12->evaluate_gait  = $request->evaluate_gait ;
            $paediatric_health_12->bleeding_gum  = $request->bleeding_gum ;
            $paediatric_health_12->head_circumference = $request->head_circumference;
            $paediatric_health_12->corneal_light = $request->corneal_light;
            $paediatric_health_12->fixation = $request->fixation;
            $paediatric_health_12->one_eye_respone = $request->one_eye_respone;
            $paediatric_health_12->eye_movement = $request->eye_movement;
            $paediatric_health_12->visible_plaque = $request->visible_plaque;
            $paediatric_health_12->white_spot = $request->white_spot;
            $paediatric_health_12->testes_descended_side = $request->testes_descended_side;
            $paediatric_health_12->testes_descended_value = $request->testes_descended_value;
            $paediatric_health_12->parent_qtn = $request->parent_qtn;
            $paediatric_health_12->age_appropriate = $request->age_appropriate;
            $paediatric_health_12->hearing = $request->hearing;
            $paediatric_health_12->vision = $request->vision;
            $paediatric_health_12->hips = $request->hips;
            $paediatric_health_12->oral_health_lip= $request->oral_health_lip;
            $paediatric_health_12->oral_health= $request->oral_health;
            $paediatric_health_12->outcome = $request->outcome;
            $paediatric_health_12->patient_id = $request->patient_id;
            $paediatric_health_12->comments = $request->comments;
            $paediatric_health_12->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Twelve Months Health Check Added Successfully']);

}
//page1 

   public function saveMaternalInformation(Request $request){
    $paediatric_health_1 = new MhpPaediatricPage1();
            $paediatric_health_1->pregnancyComplications = $request->pregnancyComplications;
            $paediatric_health_1->bloodGroup  = $request->bloodGroup ;
            $paediatric_health_1->antidGiven  = $request->antidGiven ;
            $paediatric_health_1->labour  = $request->labour ;
            $paediatric_health_1->spontaneous = $request->spontaneous;
            $paediatric_health_1->induced = $request->induced;
            $paediatric_health_1->labourComplications = $request->labourComplications;
            $paediatric_health_1->typeBirth = $request->typeBirth;
            $paediatric_health_1->estimatedGestation = $request->estimatedGestation;
            $paediatric_health_1->abnormalities = $request->abnormalities;
            $paediatric_health_1->problemsRequiring = $request->problemsRequiring;
            $paediatric_health_1->birthWeight = $request->birthWeight;
            $paediatric_health_1->birthLength = $request->birthLength;
            $paediatric_health_1->birthHead = $request->birthHead;
            $paediatric_health_1->newbornHearing = $request->newbornHearing;
            $paediatric_health_1->vitaminKGiven= $request->vitaminKGiven;
            $paediatric_health_1->vitaminKGiven1= $request->vitaminKGiven1;
            $paediatric_health_1->vitaminKGiven2 = $request->vitaminKGiven2;
            $paediatric_health_1->hepbImmunisation = $request->hepbImmunisation;
            $paediatric_health_1->hepbImmunisation2 = $request->hepbImmunisation2;
            $paediatric_health_1->hepBImmunoglobin = $request->hepBImmunoglobin;
            $paediatric_health_1->hepBImmunoglobin1 = $request->hepBImmunoglobin1;
            $paediatric_health_1->postPartumComplications = $request->postPartumComplications;
            $paediatric_health_1->feedingAtDischarge = $request->feedingAtDischarge;
            $paediatric_health_1->difficultiesWithFeeding = $request->difficultiesWithFeeding;
            $paediatric_health_1->dateOfDischarge = $request->dateOfDischarge;
            $paediatric_health_1->dischargeWeight = $request->dischargeWeight;
            $paediatric_health_1->headCirc = $request->headCirc;
            $paediatric_health_1->patient_id = $request->patient_id;
            $paediatric_health_1->save();
            return response()->json(['status'=>200,'message'=>'Paediatric page 1 maternal information Added Successfully']);
}
public function eighteenMonthsHealthCheck(Request $request){
$paediatric_health_18 = new MhpPaediatricEighteenMonthsHealthCheck();
            $paediatric_health_18->weight = $request->weight;
            $paediatric_health_18->height  = $request->height ;
            $paediatric_health_18->evaluate_gait  = $request->evaluate_gait ;
            $paediatric_health_18->bleeding_gum  = $request->bleeding_gum ;
            $paediatric_health_18->corneal_light = $request->corneal_light;
            $paediatric_health_18->fixation = $request->fixation;
            $paediatric_health_18->one_eye_respone = $request->one_eye_respone;
            $paediatric_health_18->eye_movement = $request->eye_movement;
            $paediatric_health_18->visible_plaque = $request->visible_plaque;
            $paediatric_health_18->white_spot = $request->white_spot;
            $paediatric_health_18->parent_qtn = $request->parent_qtn;
            $paediatric_health_18->age_appropriate = $request->age_appropriate;
            $paediatric_health_18->hearing = $request->hearing;
            $paediatric_health_18->vision = $request->vision;
            $paediatric_health_18->eye_observation = $request->eye_observation;
            $paediatric_health_18->oral_health_lip= $request->oral_health_lip;
            $paediatric_health_18->oral_health= $request->oral_health;
            $paediatric_health_18->outcome = $request->outcome;
            $paediatric_health_18->patient_id = $request->patient_id;
            $paediatric_health_18->comments = $request->comments;
            $paediatric_health_18->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Eighteen Months Health Check Added Successfully']);
}

//page 17 eighteenMonthVisit
   public function eighteenMonthVisit(Request $request){
            $paediatric_page_16 = new MhpPaediatricEighteenMonthVisit();
            $paediatric_page_16->moves_away = $request->moves_away;
            $paediatric_page_16->points_to_show_something  = $request->points_to_show_something ;
            $paediatric_page_16->puts_hands_out  = $request->puts_hands_out ;
            $paediatric_page_16->looks_at_a_few  = $request->looks_at_a_few ;
            $paediatric_page_16->dress_him_by_pushing = $request->dress_him_by_pushing;
            $paediatric_page_16->child_likes_to_hand = $request->child_likes_to_hand;
            $paediatric_page_16->temper_tantrums = $request->temper_tantrums;
            $paediatric_page_16->afraid_of_strangers = $request->afraid_of_strangers;
            $paediatric_page_16->shows_affection = $request->shows_affection;
            $paediatric_page_16->plays_simple_pretend = $request->plays_simple_pretend;
            $paediatric_page_16->cling_to_caregivers = $request->cling_to_caregivers;
            $paediatric_page_16->several_single_words = $request->several_single_words;
            $paediatric_page_16->shakes_head = $request->shakes_head;
            $paediatric_page_16->one_step_directions = $request->one_step_directions;
            $paediatric_page_16->child_copies_you = $request->child_copies_you;
            $paediatric_page_16->plays_with_toys= $request->plays_with_toys;
            $paediatric_page_16->what_ordinary_things= $request->what_ordinary_things;
            $paediatric_page_16->points_to_get_the_attention = $request->points_to_get_the_attention;
            $paediatric_page_16->child_shows_interest_in_a_doll = $request->child_shows_interest_in_a_doll;
            $paediatric_page_16->points_to_one_body_part = $request->points_to_one_body_part;
            $paediatric_page_16->verbal_commands_without = $request->verbal_commands_without;
            $paediatric_page_16->child_walks_alone = $request->child_walks_alone;
            $paediatric_page_16->child_climbs_on = $request->child_climbs_on;
            $paediatric_page_16->child_pulls_toys = $request->child_pulls_toys;
            $paediatric_page_16->help_undress = $request->help_undress;
            $paediatric_page_16->child_drins_from_a_cup = $request->child_drins_from_a_cup;
            $paediatric_page_16->child_scribbles = $request->child_scribbles;
            $paediatric_page_16->child_lost_skills = $request->child_lost_skills;
            $paediatric_page_16->family_health_history = $request->family_health_history;
            $paediatric_page_16->dental_risk_factor = $request->dental_risk_factor;
            $paediatric_page_16->childs_hearing = $request->childs_hearing;
            $paediatric_page_16->concerned_about_my_childs_hearing = $request->concerned_about_my_childs_hearing;
            $paediatric_page_16->my_childs_vision = $request->my_childs_vision;
            $paediatric_page_16->turned_or_lazy_eye = $request->turned_or_lazy_eye;
            $paediatric_page_16->difficulty_seeing_small_objects = $request->difficulty_seeing_small_objects;
            $paediatric_page_16->child_recognises_familiar_objects = $request->child_recognises_familiar_objects; 
            $paediatric_page_16->exposed_to_smoking = $request->exposed_to_smoking;  
            $paediatric_page_16->child_has_sweet_drinks = $request->child_has_sweet_drinks;  
            $paediatric_page_16->uses_a_bottle = $request->uses_a_bottle; 
              $paediatric_page_16->breast_milk = $request->breast_milk;
            $paediatric_page_16->points_to_show = $request->points_to_show; 
            $paediatric_page_16->eats_with_a_spoon = $request->eats_with_a_spoon;
            $paediatric_page_16->patient_id = $request->patient_id;
            $paediatric_page_16->save();
            return response()->json(['status'=>200,'message'=>'Paediatric page 16 Added Successfully']);
}

      public function twoYearsChildHealthCheck(Request $request){
          $paediatric_health_19 = new MhpPaediatricTwoYearsChildHealth();
            $paediatric_health_19->weight = $request->weight;
            $paediatric_health_19->height  = $request->height ;
            $paediatric_health_19->observer_gait  = $request->observer_gait ;
            $paediatric_health_19->bleeding_gum  = $request->bleeding_gum ;
            $paediatric_health_19->corneal_light = $request->corneal_light;
            $paediatric_health_19->fixation = $request->fixation;
            $paediatric_health_19->one_eye_respone = $request->one_eye_respone;
            $paediatric_health_19->eye_movement = $request->eye_movement;
            $paediatric_health_19->visible_plaque = $request->visible_plaque;
            $paediatric_health_19->white_spot = $request->white_spot;
            $paediatric_health_19->parent_qtn = $request->parent_qtn;
            $paediatric_health_19->age_appropriate = $request->age_appropriate;
            $paediatric_health_19->hearing = $request->hearing;
            $paediatric_health_19->vision = $request->vision;
            $paediatric_health_19->eye_observation = $request->eye_observation;
            $paediatric_health_19->oral_health_lip= $request->oral_health_lip;
            $paediatric_health_19->oral_health= $request->oral_health;
            $paediatric_health_19->outcome = $request->outcome;
            $paediatric_health_19->patient_id = $request->patient_id;
            $paediatric_health_19->comments = $request->comments;
            $paediatric_health_19->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Two Years Child Health Check Added Successfully']);

}
   public function fourYearsHealthCheck(Request $request){
$paediatric_page_24 = new MhpPaediatricFourYearHealthCheck();
            $paediatric_page_24->weight = $request->weight;
            $paediatric_page_24->height  = $request->height ;
            $paediatric_page_24->bmi  = $request->bmi ;
            $paediatric_page_24->bleeding_gum  = $request->bleeding_gum ;
            $paediatric_page_24->vision_test = $request->vision_test;
            $paediatric_page_24->result_vision_chart = $request->result_vision_chart;
            $paediatric_page_24->vision_chart = $request->vision_chart;
            $paediatric_page_24->facial = $request->facial;
            $paediatric_page_24->visible_plaque = $request->visible_plaque;
            $paediatric_page_24->white_spot = $request->white_spot;
            $paediatric_page_24->parent_qtn = $request->parent_qtn;
            $paediatric_page_24->age_appropriate = $request->age_appropriate;
            $paediatric_page_24->hearing = $request->hearing;
            $paediatric_page_24->vision = $request->vision;
            $paediatric_page_24->testes_fully_descended = $request->testes_fully_descended;
            $paediatric_page_24->oral_health= $request->oral_health;
            $paediatric_page_24->outcome = $request->outcome;
            $paediatric_page_24->patient_id = $request->patient_id;
            $paediatric_page_24->comments = $request->comments;
            $paediatric_page_24->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Four Years Health Check Added Successfully']);
}

   public function fourYearsOld(Request $request){
$paediatric_page_22 = new MhpPaediatricFourYearsOld();
            $paediatric_page_22->child_enjoys_doing = $request->child_enjoys_doing;
            $paediatric_page_22->child_ask_to_go_play  = $request->child_ask_to_go_play ;
            $paediatric_page_22->child_pretends_to_be_something  = $request->child_pretends_to_be_something ;
            $paediatric_page_22->child_comforts_others  = $request->child_comforts_others ;
            $paediatric_page_22->child_avoids_danger = $request->child_avoids_danger;
            $paediatric_page_22->child_likes_to_be_a_helper = $request->child_likes_to_be_a_helper;
            $paediatric_page_22->child_change_behaviour = $request->child_change_behaviour;
            $paediatric_page_22->child_say_sentences = $request->child_say_sentences;
            $paediatric_page_22->child_say_some_words = $request->child_say_some_words;
            $paediatric_page_22->child_talks_about_at_least_one = $request->child_talks_about_at_least_one;
            $paediatric_page_22->child_answers_simple_questions = $request->child_answers_simple_questions;
            $paediatric_page_22->child_names_some_colours = $request->child_names_some_colours;
            $paediatric_page_22->child_understands_the_idea = $request->child_understands_the_idea;
            $paediatric_page_22->child_starts_to_understand = $request->child_starts_to_understand;
            $paediatric_page_22->child_draws_a_person = $request->child_draws_a_person;
            $paediatric_page_22->child_use_scissor= $request->child_use_scissor;
            $paediatric_page_22->child_starts_to_copy = $request->child_starts_to_copy;
            $paediatric_page_22->child_plays_board = $request->child_plays_board;
            $paediatric_page_22->one_foot_up_to = $request->one_foot_up_to;
            $paediatric_page_22->catch_a_large_ball = $request->catch_a_large_ball;
            $paediatric_page_22->cuts_with_supervision = $request->cuts_with_supervision;
            $paediatric_page_22->child_walks_up_and_down_stairs = $request->child_walks_up_and_down_stairs;
            $paediatric_page_22->child_cannot_jump = $request->child_cannot_jump;
            $paediatric_page_22->child_holds_crayon = $request->child_holds_crayon;
            $paediatric_page_22->child_show_no_interest = $request->child_show_no_interest;
            $paediatric_page_22->child_ignore_other_children = $request->child_ignore_other_children;
            $paediatric_page_22->child_resists_dressing = $request->child_resists_dressing;
            $paediatric_page_22->child_follow_three_parts = $request->child_follow_three_parts;
            $paediatric_page_22->child_doesnot_understand = $request->child_doesnot_understand;
            $paediatric_page_22->child_use_me = $request->child_use_me;
            $paediatric_page_22->child_speak_unclearly = $request->child_speak_unclearly;
            $paediatric_page_22->child_loses_skills = $request->child_loses_skills;
            $paediatric_page_22->health_risk_factor_question = $request->health_risk_factor_question;
            $paediatric_page_22->dental_risk_factor_question = $request->dental_risk_factor_question;
            $paediatric_page_22->my_childs_hearing = $request->my_childs_hearing;
            $paediatric_page_22->your_childs_hearing = $request->your_childs_hearing;
            $paediatric_page_22->my_childs_vision = $request->my_childs_vision;
            $paediatric_page_22->child_has_a_turned = $request->child_has_a_turned;
            $paediatric_page_22->difficulty_seeing_small_objects = $request->difficulty_seeing_small_objects;
            $paediatric_page_22->recognises_familiar_objects = $request->recognises_familiar_objects;
            $paediatric_page_22->exposed_to_smoking = $request->exposed_to_smoking;
            $paediatric_page_22->concerned_about_my_childs_teeth = $request->concerned_about_my_childs_teeth;
            $paediatric_page_22->child_has_pain = $request->child_has_pain;
            $paediatric_page_22->child_has_swwet_drinks = $request->child_has_swwet_drinks;
            $paediatric_page_22->patient_id = $request->patient_id;
            $paediatric_page_22->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Four Years Old Added Successfully']);
}

    public function saveMilestone(Request $request){
        $paediatric_page_2 = new MhpPaediatricMilestone();
            $paediatric_page_2->smileParents = $request->smileParents;
            $paediatric_page_2->followsObjects  = $request->followsObjects ;
            $paediatric_page_2->raisesHead  = $request->raisesHead ;
            $paediatric_page_2->turnsEyes  = $request->turnsEyes ;
            $paediatric_page_2->chucklesSqueals = $request->chucklesSqueals;
            $paediatric_page_2->startsMake = $request->startsMake;
            $paediatric_page_2->holdsHead = $request->holdsHead;
            $paediatric_page_2->holdsCup = $request->holdsCup;
            $paediatric_page_2->rollsOver = $request->rollsOver;
            $paediatric_page_2->rollsOverTum = $request->rollsOverTum;
            $paediatric_page_2->putThings = $request->putThings;
            $paediatric_page_2->playsWith = $request->playsWith;
            $paediatric_page_2->sitsWithout = $request->sitsWithout;
            $paediatric_page_2->reachesOut = $request->reachesOut;
            $paediatric_page_2->recognisesOwn = $request->recognisesOwn;
            $paediatric_page_2->passesThings= $request->passesThings;
            $paediatric_page_2->strangers = $request->strangers;
            $paediatric_page_2->firstTooth = $request->firstTooth;
            $paediatric_page_2->wavesGoodBye = $request->wavesGoodBye;

            $paediatric_page_2->usesThumb = $request->usesThumb;
            $paediatric_page_2->triesPull = $request->triesPull;
            $paediatric_page_2->standsHolding = $request->standsHolding;
            $paediatric_page_2->clapsHand = $request->clapsHand;
            $paediatric_page_2->handHeld = $request->handHeld;
            $paediatric_page_2->understandsSelfie = $request->understandsSelfie;
            $paediatric_page_2->appropriately = $request->appropriately;
            $paediatric_page_2->firstWord = $request->firstWord;
            $paediatric_page_2->walksAlone = $request->walksAlone;
            $paediatric_page_2->feedSelf = $request->feedSelf;
            $paediatric_page_2->putsTwo = $request->putsTwo;
            $paediatric_page_2->usuallyDry = $request->usuallyDry;
            $paediatric_page_2->runs = $request->runs;
            $paediatric_page_2->shortSentences = $request->shortSentences;
            $paediatric_page_2->drawStraight = $request->drawStraight;
            $paediatric_page_2->dressesself = $request->dressesself;
            $paediatric_page_2->throughTheNight = $request->throughTheNight;
            $paediatric_page_2->manageButtons = $request->manageButtons;
            $paediatric_page_2->tiesShoes = $request->tiesShoes;
            $paediatric_page_2->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Milestone Added Successfully']);

    }
    public function savePaediatricPageThree(Request $request){
          $paediatric_page_3 = new MhpPaediatricPageThree();
            $paediatric_page_3->hearing_problem = $request->hearing_problem;
            $paediatric_page_3->eye_problem  = $request->eye_problem ;
            $paediatric_page_3->relatives_blind  = $request->relatives_blind ;
            $paediatric_page_3->other_illness  = $request->other_illness ;
            $paediatric_page_3->intensive_care = $request->intensive_care;
            $paediatric_page_3->physical_problem = $request->physical_problem;
            $paediatric_page_3->family_history = $request->family_history;
            $paediatric_page_3->breech_birth = $request->breech_birth;
            $paediatric_page_3->patient_id = $request->patient_id;
             $paediatric_page_3->save();

            return response()->json(['status'=>200,'message'=>'Paediatric Page three Added Successfully']);

    }

    public function getPaediatricPageThree($id){
        $get_data=MhpPaediatricPageThree::where('patient_id',$id)->first();
return response()->json(['status'=>200,'get_data'=>$get_data]);

    }
    public function savePaediatricNewBorn(Request $request){
      $paediatric_page_4 = new MhpPaediatricNewBorn();
            $paediatric_page_4->headAndFontAnelles = $request->headAndFontAnelles;
            $paediatric_page_4->eyesIncludingRedReflex  = $request->eyesIncludingRedReflex ;
            $paediatric_page_4->date  = $request->date ;
            $paediatric_page_4->ears  = $request->ears ;
            $paediatric_page_4->mouthAndPalate = $request->mouthAndPalate;
            $paediatric_page_4->cardiovascular = $request->cardiovascular;
            $paediatric_page_4->femoralPulses = $request->femoralPulses;
            $paediatric_page_4->abdomenAndUmbilicus = $request->abdomenAndUmbilicus;
            $paediatric_page_4->anus = $request->anus;
            $paediatric_page_4->genitalia = $request->genitalia;
            $paediatric_page_4->testesFullyDescended = $request->testesFullyDescended;
            $paediatric_page_4->musculoSkeletal = $request->musculoSkeletal;
            $paediatric_page_4->hips = $request->hips;
            $paediatric_page_4->skin = $request->skin;
            $paediatric_page_4->reflexes = $request->reflexes;
            $paediatric_page_4->motherConcerns = $request->motherConcerns;
            $paediatric_page_4->outCome = $request->outCome;
            $paediatric_page_4->writeComments = $request->writeComments;
            $paediatric_page_4->respiratory = $request->respiratory;
           
            $paediatric_page_4->patient_id = $request->patient_id;
             $paediatric_page_4->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Page Four Added Successfully']);

    }
    public function savePaediatricParentsPage4(Request $request){
$parentsPage4Data = new MhpPaediatricParentPage4();
            $parentsPage4Data->child_clams_down = $request->child_clams_down;
            $parentsPage4Data->child_looks_at_your_face  = $request->child_looks_at_your_face ;
            $parentsPage4Data->child_seems_happy  = $request->child_seems_happy ;
            $parentsPage4Data->child_smiles_when  = $request->child_smiles_when ;
            $parentsPage4Data->child_makes_sounds = $request->child_makes_sounds;
            $parentsPage4Data->child_reacts_to_loud = $request->child_reacts_to_loud;
            $parentsPage4Data->child_watches_you = $request->child_watches_you;
            $parentsPage4Data->child_looks_at = $request->child_looks_at;
            $parentsPage4Data->child_holds_head_up = $request->child_holds_head_up;
            $parentsPage4Data->child_moves_both = $request->child_moves_both;
            $parentsPage4Data->child_opens_hands = $request->child_opens_hands;
            $parentsPage4Data->my_postnatal_check = $request->my_postnatal_check;
            $parentsPage4Data->concerned_about = $request->concerned_about;
            $parentsPage4Data->completed_family_health_history = $request->completed_family_health_history;
            $parentsPage4Data->concerned_about_my_baby = $request->concerned_about_my_baby;
            $parentsPage4Data->turn_towards_light = $request->turn_towards_light;
            $parentsPage4Data->makes_eyes_contact = $request->makes_eyes_contact;
            $parentsPage4Data->pupils_are_white = $request->pupils_are_white;
            $parentsPage4Data->enjoy_being_together = $request->enjoy_being_together;
            $parentsPage4Data->baby_receieves_breast_milk = $request->baby_receieves_breast_milk;
            $parentsPage4Data->vitamin_or_mineral = $request->vitamin_or_mineral;
            $parentsPage4Data->plain_water = $request->plain_water;
            $parentsPage4Data->infant_formula= $request->infant_formula;
            $parentsPage4Data->semi_sold_food = $request->semi_sold_food;
           
            $parentsPage4Data->patient_id = $request->patient_id;
             $parentsPage4Data->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Page Four Added Successfully']);
    }
    public function getPaediatricParentsPage4($id){
  $get_data=MhpPaediatricParentPage4::where('patient_id',$id)->first();
return response()->json(['status'=>200,'get_data'=>$get_data]);
    }

        public function savePaediatricParentsPage5(Request $request){
            $parentsPage5Data = new MhpPaediatricParentsPage5();
            $parentsPage5Data->regarading_feeding = $request->regarading_feeding;
            $parentsPage5Data->receive_breast_milk  = $request->receive_breast_milk ;
            $parentsPage5Data->vitamins_or_mineral  = $request->vitamins_or_mineral ;
            $parentsPage5Data->plain_water  = $request->plain_water ;
            $parentsPage5Data->infant_formula = $request->infant_formula;
            $parentsPage5Data->solid_or_semi = $request->solid_or_semi;
            $parentsPage5Data->child_smiles = $request->child_smiles;
            $parentsPage5Data->child_chukles = $request->child_chukles;
            $parentsPage5Data->child_loooks_at_you = $request->child_loooks_at_you;
            $parentsPage5Data->child_makes_sounds = $request->child_makes_sounds;
            $parentsPage5Data->child_makes_sounds_back = $request->child_makes_sounds_back;
            $parentsPage5Data->child_turns_head = $request->child_turns_head;
            $parentsPage5Data->child_if_hungry = $request->child_if_hungry;
            $parentsPage5Data->child_looks_at_his_hands = $request->child_looks_at_his_hands;
            $parentsPage5Data->child_other_important = $request->child_other_important;
            $parentsPage5Data->baby_do_together = $request->baby_do_together;
            $parentsPage5Data->baby_likes_to_do = $request->baby_likes_to_do;
            $parentsPage5Data->anything_your_baby_does = $request->anything_your_baby_does;
            $parentsPage5Data->lost_any_skills = $request->lost_any_skills;
            $parentsPage5Data->healthcare_needs = $request->healthcare_needs;
 
           
            $parentsPage5Data->patient_id = $request->patient_id;
             $parentsPage5Data->save();
            return response()->json(['status'=>200,'message'=>'Paediatric Parent Page five Added Successfully']);
    }
       public function getPaediatricParentsPage5($id){
  $get_data=MhpPaediatricParentsPage5::where('patient_id',$id)->first();
return response()->json(['status'=>200,'get_data'=>$get_data]);
    }
}
