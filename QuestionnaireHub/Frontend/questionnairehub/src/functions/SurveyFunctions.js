
import axios from 'axios';
import { createSurveyScheme } from '../validations/surveyDataVal';


//Eğerki anket içerisinde soru var ise önce onalrın silinmesi gerekiyor db'den
const deleteQuestionAuto = (surveyid, admin) => {
    if (admin) {
        axios.delete("http://localhost:8080/questions/delete/auto", { data: { surveyid } }).
            then(res => deleteSurvey(surveyid, admin))
        console.log(admin)
    }
    else alert("Yetki tok")
}

//delete survey
const deleteSurvey = (survey_id, admin) => {
    console.log(admin)

    axios.delete("http://localhost:8080/survey/delete", { data: { survey_id } })
        .then(res => {
            console.log(res.data)
        })

}

//
const createSurvey = async ({  survey }) => {
    try {
        
        const isVal = await createSurveyScheme.isValid(survey);

        if (isVal) {
            const response = await axios.post("http://localhost:8080/survey/add", survey);

            if (response.data.status) {
                return response.data.surveyid;//Son eklenen surveyin idsi yollanır 
            } else {
                alert(response.data.Mess);
            }
        } else {
            alert("You have entered incomplete or incorrect data. Please try again to make the necessary corrections");
        }
    } catch (error) {
        console.error("An error occurred during survey creation:", error);

    }
};

//SurveyList Data
const getSurveyList = async (e) => {
    try {
        const response = await axios.post("http://localhost:8080/survey/get")
        if (response.data.status) {
            return response.data;
        }
        else alert(response.data.Mess)
    } catch (error) {
        console.error("An error occurred during get survey data:", error);
    }
}
//Get Spe Survey
const getSpeSurvey = async ( survey_id ) => {
    try {
        const response = await axios.post("http://localhost:8080/survey/get/SpecificSurvey",  { survey_id } )
        if (response) return response.data
        else alert(response.data.Mess)
    } catch (error) {
        console.error("An error occurred during get survey data:", error);
    }
}

const getDetail=async(survey_id)=>{
try {
   const res= await axios.post("http://localhost:8080/survey/getDetail", { survey_id })
if(res) return res.data
else alert(res.data.Mess)
} catch (error) {
    console.log(error)
    
}
}

const updateSurvey=async(data)=>{
    try {
        const res= await axios.post("http://localhost:8080/survey/update", { data })
    if(res) return res.data
    alert(res.data.Mess)    
    } catch (error) {
        console.log(error)
    }

}




export { deleteQuestionAuto, createSurvey, getSurveyList,getSpeSurvey ,getDetail,updateSurvey}