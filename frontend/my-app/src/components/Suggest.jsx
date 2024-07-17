import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../supports/AuthProvider';
import host from '../config/host.json';
import quote from '../config/quote.json';
import { toast } from 'react-toastify';

const {SERVER_API} = host;
const {API_ENDPOINT} = host;

const Suggest = () => {
    const [data, setData] = useState('');
    const [pokemon, setPokemon] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate();
    let stt = 1;  

    const getAssistant = localStorage.getItem('assistant');

    useEffect(() => {      
        switch(getAssistant){
            case '1':
                setPokemon('Venusaur');
                break;
            case '2':
                setPokemon('Pikachu');
                break;
            case '3':
                setPokemon('Charizard');
                break;
            case '4':
                setPokemon('Umbreon');
                break;
            case '5':
                setPokemon('Lapras');
                break;
            case '6':
                setPokemon('Dragonite');
                break;
            case '7':
                setPokemon('Blastoise');
                break;
            case '8':
                setPokemon('Dragapult');
                break;
            case '9':
                setPokemon('Clefable');
                break;
            default:
                setPokemon('Lucario');
                break;
        }
        // console.log(pokemon);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${SERVER_API}${API_ENDPOINT}/suggest`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                        "Accept-Language": "en-US,en;q=0.9",
                        'Content-Type': 'application/json',
                        'Charset':'utf-8',
                    }
                });
                
                //setDeadline(response.data.result);
                setData(response.data.data);

                // console.log("Check Deadline: " + checkDeadline.character_name)              
        }
        catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [auth.token]);    
    
    if (!data) {
        return (
        <div className='container mt-4'>
           <div className='mb-4'>
                <a href="/" className='no-underline-link'>&lt; Quay lại danh sách</a>
            </div>
            <div className='text-center'>
                <h5>Các gợi ý cho nội dung e-mail:  </h5>
                <div className='mb-4'>
                    <i>Hãy sao chép một trong những gợi ý nội dung e-mail phía dưới. Chúng có thể giúp bạn hoàn thiện e-mail tốt hơn</i>
                </div>
            </div>
           <div className='mt-4 mb-4'>
                <p> Đang tải dữ liệu...</p>
           </div>
        </div>
        );
    }

    const sayMessage = () => {
        const randQuote = quote;
        var itemRand = randQuote[Math.floor(Math.random()*randQuote.length)];

        toast.warning(itemRand);
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Đã sao chép đoạn văn bản, hãy quay lại và dán');
        }).catch((error) => {
            toast.warning('Không thể sao chép, lỗi không xác định');
            console.log('Lỗi copyToClipboard: ', error);
        });
    }

    return (
      <div className='container mt-4'>
        <div className='mb-4'>
            <a href="/" className='no-underline-link'>&lt; Quay lại danh sách</a>
        </div>
        <div className='text-center'>
            <h5>Các gợi ý cho nội dung e-mail:  </h5>
            <div className='mb-4'>
                <i>Hãy sao chép một trong những gợi ý nội dung e-mail phía dưới. Chúng có thể giúp bạn hoàn thiện e-mail tốt hơn</i>
            </div>
        </div>
        {/* làm tới đây rồi */}
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Nội dung được gợi ý</th>
                    <th scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {(data.length === 0) ? (
                    <tr>
                        <td colSpan="7" className="text-center">Không có thư khả dụng</td>
                    </tr>
                ) : (
                        data.map((mails) => (
                            (
                               <tr key={mails.id}>
                                    {(stt <= 5) ? (
                                        <>
                                            <td><strong> {stt++}</strong> <i>(Được đề xuất cao)</i></td>
                                            <td>{mails}</td>
                                            <td><button className='btn btn-sm btn-secondary' onClick={() => copyToClipboard(mails)}>Sao chép</button></td>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <td><strong> {stt++}</strong></td>
                                            <td>{mails}</td>
                                            <td><button className='btn btn-sm btn-secondary' onClick={() => copyToClipboard(mails)}>Sao chép</button></td>
                                        </>
                                    )}
                               </tr>
                            )
                        )
                    ))}
            </tbody>
        </table>
        <div>
            {/* <p>{pokemon}</p> */}
            {/* <img src="/pokemon/" alt="" src={`/assets/assistant_zone/${pokemonName[index].character_name}_${isShiny[index].is_shiny}.png`} width="360px" height="360px" alt={`${pokemonName[index].character_name}`}/> */}
            <img src={`/pokemon/${pokemon}.png`}  alt={`${pokemon}`} title={`Xin chào, ${pokemon} hi vọng bạn tìm được thứ mình cần`} onClick={sayMessage} />
        </div>
      </div>
    )
  }


export default Suggest;