import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { createSurvey, deleteQuestionAuto } from '../functions/SurveyFunctions';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiFillFileAdd } from "react-icons/ai"
import { FcSurvey } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { getSurveyList } from '../functions/SurveyFunctions';
import Swal from 'sweetalert2'
import { speQuestion } from '../functions/QueFunctions';
import { getResponse } from '../functions/ResponseFunction';

function SurveyList({ admin, user_id }) {
  const [surveyData, setSurveyData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  //Column names
  const columns = [
    {
      name: "",
      selector: (row) => <FaEye color='#223C53' onClick={() => { console.log(navigate('/ShowInfo', { state: { survey_id: row.survey_id, user_id: row.user_id } })) }} />,
      allowOverflow: true,
      button: true,
    },
    {
      name: "",
      selector: (row) => getActions({ row: row, admin: admin }),
      allowOverflow: true,
      button: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,

    },
    {
      name: "Description",
      selector: (row) => row.description,

    },
    {
      name: "Date",
      selector: (row) => row.date
    },
    {
      name: "Creator",
      selector: (row) => row.user_id
    },
  ];

  const solveSurvey = (survey_id) => {
    navigate('/Solve', { state: { survey_id: survey_id, user_id: user_id } });
  }

  const getActions = ({ row, admin }) => {
    // Action sütununa butonları eklemek için getActions fonksiyonunu kullanıyoruz
    return (
      <div className='d-flex flex-row'>
        <AiOutlineEdit className=' p-2' size={30} color='#223C53' onClick={() => handleEdit(row.survey_id)} />
        <FcSurvey className=' p-2' size={30} color='#223C53' onClick={() => handleSolveControl(row.survey_id)} />
        <AiOutlineDelete className=' p-2' size={30} color='#223C53' onClick={() => handleDelete(row.survey_id, admin)} />
      </div>
    )
  }
  //
  const handleSolveControl = async (survey_id) => {
    const resQue = await speQuestion({ survey_id });
    console.log(resQue)
    if (resQue.length>0) {
      const res = await getResponse(survey_id, user_id);
      console.log(res.data.length)
      if (res.data.length) {
        Swal.fire({
          title: "",
          text: "You have only one chance to answer.You have answered the survey before. If you wish, you can view and update your answers",
          denyButtonText: `Close`
        })

      } else {
        // eğer veri yoksa, solveSurvey fonksiyonunu çağır
        solveSurvey(survey_id);
      }
    }
    else Swal.fire({
      title: "Edit?",
      text: "No registered questions found for the survey. Feel free to add questions and edit later.",
      showCancelButton: true,
      confirmButtonText: "Add new Que",
      denyButtonText: `Close`
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/Create', { state: { user_id: user_id, survey_id: survey_id } })
      }

    })


  }


  const handleEdit = async (survey_id) => {
    const res = await speQuestion({ survey_id });
    if (res.length > 0) {
      navigate("/Edit", { state: { survey_id: survey_id } })
    } else Swal.fire({
      title: "Edit?",
      text: "No registered questions found for the survey. Feel free to add questions and edit later.",
      showCancelButton: true,
      confirmButtonText: "Add new Que",
      denyButtonText: `Close`
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/Create', { state: { user_id: user_id, survey_id: survey_id } })
      }

    })
  }

  const handleDelete = (survey_id, admin) => {
    Swal.fire({
      title: "Are u sure",
      text: "Once data is deleted, it cannot be recovered.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuestionAuto(survey_id, admin)

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  //Add new survey
  const addSurvey = () => {
    /*    navigate('Solve', { state: { survey_id: survey_id, user_id: user_id } }); */
    admin ? navigate('/Create', { state: { user_id: user_id } }) : alert("You don't have the authority to create a survey.")
  }

  const fetchData = async () => {
    const response = await getSurveyList();
    //console.log(response.datas)
    setSurveyData(response.datas)
  }

  useEffect(() => {
    fetchData()
  }, [surveyData])

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter(value);

  };

  const filteredItems = surveyData.filter(item =>
    item.title.toLowerCase().includes(filter.toLowerCase()),
    // item.description.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div className='container mt-5'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AiFillFileAdd size={30} color='white' onClick={addSurvey} />
        <div className='text-end p-3'>
          <input type='text' style={{ margin: '0 5px' }} onChange={handleFilter} name='filter' ></input></div>
      </div>
      <DataTable
        columns={columns}
        data={filteredItems}
        fixedHeader
        pagination
      ></DataTable>

    </div>
  )
}

export default SurveyList