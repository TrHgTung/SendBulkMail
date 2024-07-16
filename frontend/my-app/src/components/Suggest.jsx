import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../supports/AuthProvider';
import { BsEmojiSmile, BsEmojiAstonished, BsEmojiAngry } from "react-icons/bs";
import host from '../config/host.json';
import { toast } from 'react-toastify';

const {SERVER_API} = host;
const {API_ENDPOINT} = host;

const Suggest = () => {
    const [data, setData] = useState('');
    //const [pokemonTaskName, setPokemonTaskName] = useState('');
    //const [deadline, setDeadline] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate();
    let stt = 1;
    // const pokemonName = localStorage.getItem('pokemon_name');
    

    const [sendData, setSendData] = useState({
        email: '',
        //assistant: '',
        deadline: ''
    });

    useEffect(() => {
        // const validToken = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get(`${SERVER_API}${API_ENDPOINT}/suggest`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                
                //setDeadline(response.data.result);
                setData(response.data.data);
                //setPokemonTaskName(response.data.get_pokemon_name);
                //setCheckDeadline(response.data.check_time);

                // console.log("Check Deadline: " + checkDeadline.character_name)              
        }
        catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [auth.token]);    
    
    // if (!data || !pokemonTaskName) {
    //     return <div>Đang tải dữ liệu...</div>;
    // }

    // const handleUpdateClick = (jobId) => {
    //     navigate(`/update/${jobId}`);
    // };

    
    return (
      <div className='container mt-4'>
        {/* <div>
            {(dateOnDeadline) ? (
                <div className='text-danger mb-4 mt-1' onClick={sendMailFunction} id="notification-on-centerr">CẢNH BÁO: Có lời nhắc sắp đến hạn hôm nay, hãy kiểm tra lại<br />Nhấn vào đây để tắt</div>
            ) : (
                <div className='mb-4 mt-1'><i>Hãy hover vào từng trợ thủ để xem chúng nhắc bạn điều gì</i></div>
            )}
        </div> */}
        <h5>Các gợi ý cho nội dung e-mail:  </h5>
        <div className='mb-4 text-primary'>
            <i>Hãy sao chép một trong những gợi ý nội dung e-mail phía dưới. Chúng có thể giúp bạn hoàn thiện e-mail tốt hơn</i>
        </div> 
        {/* làm tới đây rồi */}
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tiêu đề thư</th>
                    <th scope="col">Nội dung thư</th>
                    <th scope="col">Đính kèm tệp</th>
                    <th scope="col">Gửi đến địa chỉ</th>
                    {/* <th scope="col">Trợ thủ</th> */}
                    {/* <th scope="col">Cập nhật công việc</th> */}
                    <th scope="col">Gỡ khỏi stack</th>
                </tr>
            </thead>
            <tbody>
                {(data.length === 0) ? (
                    <tr>
                        <td colSpan="7" className="text-center">Không có thư khả dụng</td>
                    </tr>
                ) : (
                    // pokemonTaskName.map(pokemons => (
                        data.map((mails) => (
                            // mails.status === '1' && 
                            (
                                <tr key={mails.id}>
                                    <td>{stt++}</td>
                                    <td>{mails.subject}</td>
                                    <td>{mails.content}</td>
                                    <td>{mails.attachment == null && <p>Không có</p>}
                                        {mails.attachment != '' && mails.attachment}</td>
                                    <td>{mails.to}</td>
                                    {/* {mails.priority_level === 'easy' && <p className='text-success'><BsEmojiSmile /> Thấp</p>}
                                    {mails.priority_level === 'middle' && <p className='text-warning'><BsEmojiAstonished /> Trung bình</p>}
                                    {mails.priority_level === 'difficult' && <p className='text-danger'><BsEmojiAngry /> Cao</p>} */}
                                    {/* <td>{pokemonTaskName[index] ? (<a className='force-link link-offset-2 link-underline link-underline-opacity-0' >{pokemonTaskName[index].character_name}</a> ) : (<p>Lời nhắc này không có trợ thủ!</p>)}</td> */}
                                    {/* <td>
                                        <button onClick={ () => handleUpdateClick(mails.id) } className='btn btn-sm btn-secondary'>Chỉnh sửa</button>
                                    </td> */}
                                   
                                </tr>
                                // ))
                            )
                        )
                    ))}
            </tbody>
        </table>
        {/* <div className='text-center mt-4 mb-4'>
            {(data.length > 0) ? (
                <button className='btn btn-primary' onClick={sendMailFunction}>Gửi toàn bộ thư ở trên</button>
            ) : (
                ''
            )}
        </div> */}
        {/* <div>
           {assistId !== '0' && data.length !== 0 && <img src={`/assets/${assistId}.png`} className='img-need-hover-login' alt={`${pokemonName}`} title={`${pokemonName} thắc mắc rằng bạn đã hoàn thành mọi công việc hay chưa?`} width={`40%`} height={`30%`} />}
           {assistId === '0' && <></>}
           {assistId !== '0' && data.length === 0 && <img src={`/assets/${assistId}.png`} className='img-need-hover-login' alt={`${pokemonName}`} title={`${pokemonName} đang vui vẻ vì bạn đang rảnh rỗi`} width={`40%`} height={`30%`} />}
        </div> */}
      </div>
    )
  }


export default Suggest;