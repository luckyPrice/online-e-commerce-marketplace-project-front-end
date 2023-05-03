import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Alert, Grid, Box, Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import styles from "./DetailPayPage.module.css";
import SockJS from 'sockjs-client';
import Stomp, {over} from "stompjs";

//결제 페이지(PayPage)에서 결제 확인하면 그 제품에 대한 주문 상세 내역 보여짐(일단 Detail에 포함된 내용만)
var client = null;
const DetailPayPage = () => {

    const [cookies] = useCookies();
    let nickname = "";
    if (cookies.token) {
        nickname = jwt_decode(cookies.token).sub;
    }
    const [searchParams, setSearchParams] = useSearchParams();
    const senduser = searchParams.get('buyer');
    const receiveuser = searchParams.get('seller');
    const chattitle = searchParams.get('object');
    const [seller, setSeller] = useState(true);
    const navigate = useNavigate();
    const [order, setOrder] = useState();
    let step1 = "판매자가 거래를 승인했습니다";
    let step2 = "판매자가 물품 전달을 완료했습니다. 수령했나요?";
    let step3 = "수령완료! 거래를 종료합니다";


    let { id } = useParams();
    const [itemId, setitemId] = useState({
        itemid: id,
    });
    const [item, setItem] = useState({
        buyer : nickname,
        seller : receiveuser,
        object : chattitle
    })

    const [itemDetail, setitemDetail] = useState(null);
    useEffect(() => {
        axios
            .post("http://localhost:8080/api/load/showDetail", itemId)
            .then((response) => {
                console.log("good");
                console.log(response.data);
                setitemDetail(response.data);
                console.log(itemDetail);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    useEffect(() => {
        console.log("아이템은" + item)
        console.log(item);
        axios
        .post("http://localhost:8080/api/order/orderget", item)
        .then((response) => {
        console.log(response.data);
        setOrder(response.data);
        console.log(item);
      })
      .catch((error) => {
        console.log(error.message);
      });
      start();
    },[]);

    useEffect(() => {
        console.log(item)
        axios
        .post("http://localhost:8080/api/load/orderDetail", item)
        .then((response) => {
        console.log(response.data);
        console.log(response.data.memberid);
        if(response.data.memberid != nickname){
            setSeller(false);
        }
        setitemDetail(response.data);
        console.log(item);
      })
      .catch((error) => {
        console.log(error.message);
      });
    },[]);

    const chatsavedb = (mes) => {
        console.log(mes)
        if(itemDetail.memberid == nickname){
            // 판매자일 경우
            let ChatMessage={
                senduser : nickname,
                receiveuser : receiveuser,
                chattitle : chattitle,
                message: mes,
                date: "",
                type:"trade"
            };
            console.log(ChatMessage);
            axios.post('http://localhost:8080/room/create', ChatMessage)
            .then((response) =>{})
            .catch((error) => {})
        }
        else{
            let ChatMessage={
                senduser : nickname,
                receiveuser : receiveuser,
                chattitle : chattitle,
                message: mes,
                date: "",
                type:"trade"
            };
            console.log(ChatMessage);
            axios.post('http://localhost:8080/room/create', ChatMessage)
            .then((response) =>{})
            .catch((error) => {})
        }
        
    }

    const sendMessage = (mes) => {
        console.log(client);
        console.log(mes);
        if(client){
            if(itemDetail.memberid == nickname){
                // 판매자일 경우
                let ChatMessage={
                    senduser : nickname,
                    receiveuser : receiveuser,
                    chattitle : chattitle,
                    message: mes,
                    date: ""
                };
                console.log(ChatMessage);
            client.send('/pub/chat',{}, JSON.stringify(ChatMessage));
            chatsavedb(mes);
            }
            else{
                let ChatMessage={
                    senduser : nickname,
                    receiveuser : receiveuser,
                    chattitle : chattitle,
                    message: mes,
                    date: ""
                };
                console.log(ChatMessage);
            client.send('/pub/chat',{}, JSON.stringify(ChatMessage));
            chatsavedb(mes);
            }
            
            
            let orderinfo = {
                buyer: nickname,
                seller: itemDetail.memberid,
                object : itemDetail.itemname,
                price : itemDetail.itemprice,
                url : itemDetail.url,
                address : ""
                
            }
            console.log(orderinfo);
            axios.post("http://localhost:8080/api/order/ordercreate", orderinfo)
            .then((response) =>{})
            .catch((error) => {})
            
        }
        else{
            console.log("error");
        }
    }

    
    
    const start = () => { // 샀다는 알림을 보내기 위해
        let sock = new SockJS('http://localhost:8080/ws')
        client = over(sock);
        client.connect({}, () =>{client.subscribe("/private/message/" + nickname);});
        
        
    }

    const gotoNextstep = () => {
        if(order.step == 1){
            sendMessage(step1);
        }
        else if(order.step == 2){
            sendMessage(step2);
        }
        else if(order.step == 3){
            sendMessage(step3);
        }
        
        
        var orderinfo = {
            buyer: receiveuser,
            seller: senduser,
            object : chattitle,
        }
        
       
        axios.post("http://localhost:8080/api/order/orderchange", orderinfo)
            .then((response) =>{

                console.log(response.data);
            })
            .catch((error) => {})
            setOrder({...order, "step" : order.step + 1})
    }

    const finalStep = () => {
        let cashupdate = {
            nickname : itemDetail.memberid,
            cash : itemDetail.itemprice
        }
        axios
          .post("http://localhost:8080/api/auth/UpdateCash", cashupdate)
          .then((response) => {
            
            
          })
          .catch((error) => {
            console.log(error.message);
          });
        let changestatus = {
            itemid : itemDetail.itemid,
            currentuser : "판매 완료" // 변수 이름만 currentuser
        }
        axios
          .post("http://localhost:8080/api/load/changeStatus", changestatus)
          .then((response) => {
            
            
          })
          .catch((error) => {
            console.log(error.message);
          });
        navigate('/StarReviewPage/' + itemDetail.itemid); // 리뷰페이지로 이동
    }


    let A = 2000; //대충 배송비 
    let B = 5000; //대충 수수료
    let C = itemDetail && itemDetail.itemprice; //상품 금액
    let D = A + B + C;
    var Price = '' + C;


    return (
        <div>

            <Grid className={styles.Grid}>
                <br/>
                <h3><b>
                    주문상세내역</b></h3> <br />
                <div className={styles.showItem}>
                    <img src={itemDetail && itemDetail.url} alt="items" position="absolute" width="100px" height="100px" />
                    <h5><b>{itemDetail&& itemDetail.itemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</b>
                        <h6>{itemDetail && itemDetail.itemname}</h6></h5>
                </div>

            </Grid>
            <Grid className={styles.Grid}>
                <Alert severity="info">{itemDetail && itemDetail.memberid}님이 상품[<b>{itemDetail && itemDetail.itemname}</b>]을 준비중 입니다.</Alert>
            </Grid>
            <br />

            <div className={styles.Grid}>
                <hr />
                <h3><b>거래정보</b></h3>
                <br />

                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        주문번호
                    </Grid>
                    <Grid xs={8}>
                        <b> <p className={styles.textright}>{11111111}</p></b>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        주문일시
                    </Grid>
                    <Grid xs={8}>
                        <b> <p className={styles.textright}>{20230504}</p></b>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        판매자
                    </Grid>
                    <Grid xs={8}>
                        <b> <p className={styles.textright}>{itemDetail && itemDetail.memberid}</p></b>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        결제금액
                    </Grid>
                    <Grid xs={8}>
                        <b> <p className={styles.textright}>{itemDetail&& itemDetail.itemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p></b>
                    </Grid>
                </Grid>

                <Box className={styles.box}>
                    <br />
                    <Grid padding="10px 10px 10px 10px">
                        <Grid padding="10px 10px 10px 10px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                상품금액
                            </Grid>
                            <Grid xs={8}>
                                <b><p className={styles.textright}>{itemDetail&& itemDetail.itemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></b>
                            </Grid>
                        </Grid>
                        <Grid padding="10px 10px 10px 10px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                수수료
                            </Grid>
                            <Grid xs={8}>
                                <p className={styles.textright}>{itemDetail&& (itemDetail.itemprice/10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                            </Grid>
                        </Grid>
                        <Grid padding="10px 10px 10px 10px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                배송비
                            </Grid>
                            <Grid xs={8}>
                                <p className={styles.textright}>{A.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                            </Grid>
                        </Grid>
                    </Grid>


                </Box>

            </div>
            <br />
            <div className={styles.Grid}>
            <hr />
                <h3><b>배송정보</b></h3>
                <br />
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        수령인
                    </Grid>
                    <Grid xs={8}>
                        <p className={styles.textright}>{nickname}</p>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        연락처
                    </Grid>
                    <Grid xs={8}>
                        <p className={styles.textright}>000-1111-2222</p>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        배송지
                    </Grid>
                    <Grid xs={8}>
                        <p className={styles.textright}>서울시~~~</p>
                    </Grid>
                </Grid>
                <Box className={styles.box}>
                    <br />
                    <Grid padding="10px 10px 10px 10px">
                        <h6>배송요청사항</h6> </Grid>
                    <Grid padding="10px 10px 10px 10px">
                        <b>문 앞에 부탁드립니다</b></Grid>
                </Box>
              {seller ? 
              <>
              {order && ( order.step == 1 ?<>
              <Button onClick={() => gotoNextstep()}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}>
              거래 승인 </Button>
              <Button onClick={() => gotoNextstep()}
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 1, mb: 2 }}>
              주문 거절 </Button></>
              : "")}

              {order && ( order.step == 2 ?
              <Button onClick={() => gotoNextstep()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              전달 완료 </Button>: "")}

              
              </> 
                :
                <>
              {order && ( order.step == 3 ?
              <Button onClick={() => gotoNextstep()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              수령 완료 </Button>: "")}

              {order && ( order.step == 4 ?
              <Button onClick={() => finalStep()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2  }}>
              리뷰작성 </Button>: "")}</>
                }

            <Button onClick={() => navigate('/MainPage')}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              >
              메인으로 </Button>

            </div>



        </div>

    )
}

export default DetailPayPage;