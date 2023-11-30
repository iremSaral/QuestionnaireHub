import axios from "axios"


const speQuestion = async ({ survey_id }) => {
    try {
        const response = await axios.post("http://localhost:8080/question/get/QueList", { survey_id })
        if (response) return response.data
        else alert(response.data.Mess("hata"))
    } catch (error) {
        console.error("An error occurred during get question data:", error);
    }
}
const updateQuestion = async (data) => {
    try {
        const res = await axios.post("http://localhost:8080/question/update", { data })
        if (res) return res.data
        alert(res.data.Mess)
    } catch (error) {
        console.log(error)
    }
}
const deleteQuestion = async (question_id) => {
    try {
        const res = await axios.delete("http://localhost:8080/question/delete", {data:{question_id}})
        if (res) return res.data
        
    } catch (error) {
        console.log(error)
    }
}



export { speQuestion, updateQuestion, deleteQuestion }
