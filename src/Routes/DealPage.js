import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//MyPage와 SellerPage에서 링크로 -> 일단 거래중인[판매] 상품 확인 (본인 포함 누구나 확인 가능)


function DealPage() {
    let nickname="";
    const [cookies, setCookies] = useCookies();
    if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }
    const navigate = useNavigate();
    const [requestResult, setRequestResult] = useState("");
    const [inputData, setInputData] = useState([]);
    const [orderinfo, setOrderInfo] = useState([]);
    let { user } = useParams();


    useEffect(() => {



        axios.get('http://localhost:8080/api/load/UploadShow')
            .then((response) => {

                console.log(response.data);
                setInputData(response.data);
                console.log(inputData)
                setRequestResult('Success!!');
            })
            .catch((error) => {
                console.log(error.message);

                setRequestResult('Failed!!');
            })

    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/api/order/getAllOrder')
        .then((response) => {

            console.log(response.data);
            setOrderInfo(response.data);
            
            setRequestResult('Success!!');
        })
        .catch((error) => {
            console.log(error.message);

            setRequestResult('Failed!!');
        })


    }, [])

    const gotoOrder = (product, id) => {
        
        for(var i = 0 ; i < orderinfo.length; i++){
            console.log(orderinfo[i].object);
            console.log(product.title);
            if(orderinfo[i].object == product.title){
                navigate(`/DetailPayPage?buyer=${orderinfo[i].buyer}&seller=${orderinfo[i].seller}&object=${orderinfo[i].object}`)
            }
        }
            
    }

    const gotoOrder2 = (product) => {
        
        for(var i = 0 ; i < orderinfo.length; i++){
            console.log(orderinfo[i].object);
            console.log(product.title);
            if(orderinfo[i].object == product.title){
                navigate(`/DetailPayPage?buyer=${orderinfo[i].buyer}&seller=${orderinfo[i].seller}&object=${orderinfo[i].object}`)
            }
        }
            
    }



    return (


        <div>
            <ArrowBackIcon onClick={() => navigate('/MainPage')} />
            <Grid padding="50px 300px 30px 300px">

                <h3><b>{user}</b>님이 거래중인 상품입니다</h3>

                <Tabs
                    defaultActiveKey="profile"
                    id="justify-tab-example"
                    justify>
                    <Tab eventKey="sell" title="판매상품">
                    {orderinfo.map(function (product, id) {
                            
                            
                            if (product.seller == nickname){
                            
                            return (
                                <>
                                <div key={id}  >
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">상품 번호</th>
                                                <th scope="col">상품 이미지</th>
                                                <th scope="col">상품 정보</th>
                                                <th scope="col">가격</th>
                                                <th scope="col">주문 처리 상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">{product.id}</th>
                                                <td><img src={product.url} alt="items" position="absolute" width="300px" height="300px" /></td>
                                                <td><b>{product.object}</b></td>
                                                <td>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                                                <td>{product.step==4 ? "거래 완료" : "거래중"} <br /><Button onClick={() => navigate(`/DetailPayPage?buyer=${product.buyer}&seller=${product.seller}&object=${product.object}`)}>주문 상세</Button></td>
                                                
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                                
                                </>
                            )
                            }
                            
                        



                    })}
                    </Tab>
                    <Tab eventKey="buy" title="구매상품">
                    {orderinfo.map(function (product, id) {
                            
                            
                                if (product.buyer == nickname){
                                
                                return (
                                    <>
                                    <div key={id}  >
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">상품 번호</th>
                                                    <th scope="col">상품 이미지</th>
                                                    <th scope="col">상품 정보</th>
                                                    <th scope="col">가격</th>
                                                    <th scope="col">주문 처리 상태</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{product.id}</th>
                                                    <td><img src={product.url} alt="items" position="absolute" width="300px" height="300px" /></td>
                                                    <td><b>{product.object}</b></td>
                                                    <td>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                                                    <td>{product.step==4 ? "거래 완료" : "거래중"} <br /><Button onClick={() => navigate(`/DetailPayPage?buyer=${product.buyer}&seller=${product.seller}&object=${product.object}`)}>주문 상세</Button></td>
                                                    
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>
                                    
                                    </>
                                )
                                }
                                
                            



                        })}
                    </Tab>


                </Tabs>
            </Grid>
        </div>


    )


}



export default DealPage;