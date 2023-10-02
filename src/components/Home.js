import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from './Notes'
export default function Home(props) {
    const {showAlert} = props;
    const navigate = useNavigate();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login");
        } 
           
    }, [])
    /* eslint-disable react-hooks/exhaustive-deps */
    
    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    )
}