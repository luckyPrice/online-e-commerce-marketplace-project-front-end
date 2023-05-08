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



    return (


        <div>
            <Grid padding="50px 300px 30px 300px">

                <h3><b>{user}</b>님이 거래중인 상품입니다</h3>

                <Tabs
                    defaultActiveKey="profile"
                    id="justify-tab-example"
                    justify>
                    <Tab eventKey="sell" title="판매상품">
                        {inputData.map(function (product, id) {
                            const gotoDetail = () => {
                                navigate('/DetailPage/' + product.itemid);
                            }
                            if (product.memberid == user && product.status == "거래중")
                                return (
                                    <>
                                    <div key={id}  >
                                        <table class="table">
                                            <thead onClick={gotoDetail}>
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
                                                    <th onClick={gotoDetail} scope="row">{product.itemid}</th>
                                                    <td onClick={gotoDetail}><img src={product.url} alt="items" position="absolute" width="300px" height="300px" /></td>
                                                    <td onClick={gotoDetail}><b>{product.itemname}</b><br />{product.title}</td>
                                                    <td onClick={gotoDetail}>{product.itemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                                                    <td><b>{product.status}</b><br /><Button onClick={(e) => {gotoOrder(product, id, e)}}>주문 상세</Button></td>
                                                    
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>
                                    
                                    </>
                                )



                        })}
                    </Tab>
                    <Tab eventKey="buy" title="구매상품">

                    </Tab>


                </Tabs>
            </Grid>
        </div>


    )


}



export default DealPage;