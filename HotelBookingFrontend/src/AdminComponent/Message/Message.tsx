import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//Message interface
interface Message
{
    id:string;
    email:string;
    message:string;
}
function Message() {
    const [messages, setMessages] = useState<Message[]>([]);
    const navigate=useNavigate();
    const closeForm = () => {
        navigate("/admin");
    };
    const fetchData = async () => {
            try {
                const data = (await axios.get<Message[]>('http://localhost:8080/message/fetch')).data;
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        }
    //call fetchData
    useEffect(() => {
        fetchData();
    }, []);
  return (
    <div>
    {messages.map((msg) => (
        <table style={{borderStyle:'solid',borderColor:'black'}}>
            <tr>
            <th style={{width:'15%'}}><Link to="mailto:${msg.email}" style={{color:'black'}}>{msg.email}</Link></th>
            <td>{msg.message}</td>
            </tr>
        </table>
    ))}
                <div className="row" style={{marginLeft:'0px',padding:'20px'}}>
                    <div className='col'><button className="btn btn-primary" onClick={closeForm} style={{padding:'3px'}}>CLSOE</button></div>
                </div>
   
    </div>
  )
}

export default Message
