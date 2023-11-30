import axios from "axios"


const getResponse=async(question_id,user_id)=>{
try {
    const res=await axios.post("http://localhost:8080/response/get",{question_id,user_id})
    if(res) return res
    alert(res.data.Mess)
} catch (error) {
    console.log(error)
}
}
const deleteResponse=async(question_id)=>{
    try {
        const res=await axios.delete("http://localhost:8080/response/delete/auto",{data:{question_id}})
        if(res) return res
    
    } catch (error) {
        console.log(error)
    }
}


export {getResponse,deleteResponse}