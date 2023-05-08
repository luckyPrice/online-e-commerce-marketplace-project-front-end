import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import $ from 'jquery';
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import jwt_decode from "jwt-decode"
import {useCookies} from "react-cookie";
import SockJS from 'sockjs-client';
import Stomp, {over} from "stompjs";
import { useDaumPostcodePopup } from 'react-daum-postcode';
//디테일 페이지에서 상품->결제 페이지로 이동
var client = null;
const PayPage =() => {
    
    const [cookies, setCookies] = useCookies();
    let nickname =""
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    if(cookies.token){
        nickname = jwt_decode(cookies.token).sub;
      }
    let { id } = useParams();
    const [itemId, setitemId] = useState({
        itemid: id,
    });

    const open = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

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
            let nick = {
                nickname : nickname
            }
              axios
              .post("http://localhost:8080/api/auth/getAuth", nick)
              .then((response) => {
                console.log(response.data);
                setUserData(response.data);
                
                
              })
              .catch((error) => {
                console.log(error.message);
              });
              
              start();

    }, []);


    $(function () {

        $("#SelectDirect").hide();
        $("#Select").change(function () {
            if ($("#Select").val() == "direct") {
                $("#SelectDirect").show();
            } else {
                $("#SelectDirect").hide();
            }
        })

    });


    const [AllCheck, setAllCheck] = useState(false);
    const [ServiceCheck, setServiceCheck] = useState(false);
    const [CollectCheck, setCollectCheck] = useState(false);
    const [OfferCheck, setOfferCheck] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);

    let A = 2000; //대충 배송비
    let B = itemDetail && itemDetail.itemprice + A;

    const allBtnEvent = () => {
        if (AllCheck === false) {
            setAllCheck(true);
            setServiceCheck(true);
            setCollectCheck(true);
            setOfferCheck(true);
        } else {
            setAllCheck(false);
            setServiceCheck(false);
            setCollectCheck(false);
            setOfferCheck(false);
        }
    };

    const ServiceCheckEvent = () => {
        if (ServiceCheck === false) {
            setServiceCheck(true)
        } else {
            setServiceCheck(false)
        }
    };

    const CollectCheckEvent = () => {
        if (CollectCheck === false) {
            setCollectCheck(true)
        } else {
            setCollectCheck(false)
        }
    };

    const OfferCheckEvent = () => {
        if (OfferCheck === false) {
            setOfferCheck(true)
        } else {
            setOfferCheck(false)
        }
    };

    const start = () => { // 샀다는 알림을 보내기 위해
        let sock = new SockJS('http://localhost:8080/ws')
        client = over(sock);
        client.connect({}, () =>{client.subscribe("/private/message/" + nickname);});
        console.log("?")
        
    }

    const chatsavedb = () => {
        let ChatMessage={
            senduser : nickname,
            receiveuser : itemDetail.memberid,
            chattitle : itemDetail.title,
            message: "거래가 요청되었습니다.",
            date: "",
            type:"trade"
        };
        axios.post('http://localhost:8080/room/create', ChatMessage)
        .then((response) =>{})
        .catch((error) => {})
    }

    const sendMessage = () => {
        console.log(client);
        if(client){
            let ChatMessage={
                senduser : nickname,
                receiveuser : itemDetail.memberid,
                chattitle : itemDetail.title,
                message: "거래가 요청되었습니다.",
                date: ""
            };
            console.log(ChatMessage);
            client.send('/pub/chat',{}, JSON.stringify(ChatMessage));
            chatsavedb();
            let orderinfo = {
                buyer: nickname,
                seller: itemDetail.memberid,
                object : itemDetail.title,
                price : itemDetail.itemprice,
                url : itemDetail.url,
                address : address,
                date : ""
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

    useEffect(() => {
        if (ServiceCheck === true && CollectCheck === true && OfferCheck === true) {
            setAllCheck(true)
        } else {
            setAllCheck(false)
        }
    }, [ServiceCheck, CollectCheck, OfferCheck])



    const PayButtonClick = () => {
        if (AllCheck == true) {
            Swal.fire({
                title: "결제 완료",
                text: "상품이 결제되었습니다!",
                icon: "success",
            });
            if(userData.cash > itemDetail.itemprice){
                
                let cashreduce = {
                    nickname : nickname,
                    cash : itemDetail.itemprice
                }
                axios
                  .post("http://localhost:8080/api/auth/ReduceCash", cashreduce)
                  .then((response) => {
                    
                    
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
                  let changestatus = {
                    itemid : itemDetail.itemid,
                    currentuser : "거래중" // 변수 이름만 currentuser
                }
                axios
                  .post("http://localhost:8080/api/load/changeStatus", changestatus)
                  .then((response) => {
                    
                    
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });

                  sendMessage();
                  setTimeout(2000);
                  navigate(`/DetailPayPage?buyer=${nickname}&seller=${itemDetail.memberid}&object=${itemDetail.title}`)
                }
        }
        else {
            Swal.fire({
                title: "결제 실패",
                text: "약관 내용을 모두 동의해주세요!",
                icon: "error",
            });

        }
    };



    const Modal1 = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        개인정보 제 3자 제공
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        개인정보 제 3자 제공
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const Modal2 = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        개인정보 수집 이용 동의
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        개인정보 수집 이용 동의
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const Modal3 = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        서비스 이용약관 동의
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        서비스 이용약관 동의
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        client ? 
        <div>

            <h3>결제 페이지</h3> <br />
            <Grid padding="0px 40px 40px 40px">
                <hr />
                <h4>{itemDetail && itemDetail.itemname} 상품 결제하기</h4>
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                        gap: "20px",
                    }}
                >
                    <img src={itemDetail && itemDetail.url} alt="items" position="absolute" width="100px" height="100px" />
                    <h5>가격:{itemDetail && itemDetail.itemprice}원 <hr />
                        <h6>{itemDetail && itemDetail.maintext}</h6></h5>
                </div>
                <hr />
            </Grid>

            <Grid padding="0px 40px 40px 40px">

                <h4>배송지</h4>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="배송지를 등록해주세요"
                        aria-label="배송지를 등록해주세요"
                        aria-describedby="basic-addon2"
                        value={address}
                    />
                    <Button onClick={handleClick} variant="outline-secondary" >
                        등록
                    </Button>
                </InputGroup>

                <InputGroup type="text" id="SelectDirect" name="SelectDirect" >
                    <Form.Control
                        placeholder="배송요청 사항을 입력하세요"
                        aria-label="배송요청 사항을 입력하세요"
                        aria-describedby="basic-addon2"
                    />
                    
                </InputGroup>
                <Form.Select id="Select" name="Select">

                    <option selected>배송요청사항  (선택)</option>
                    <option value="1">배송 전 연락부탁드립니다</option>
                    <option value="2">부재 시 경비실에 맡겨주세요</option>
                    <option value="direct">직접입력</option>

                </Form.Select>
                <br />
                <br />

            </Grid >


            <Grid padding="0px 40px 40px 40px">
                <h4>결제금액</h4>
                <Box style={{ borderStyle: 'ridge' }}>
                    <br />
                    <p>상품금액:{itemDetail && itemDetail.itemprice}원</p>
                    <p>배송비:{A}원</p>
                    <p>총 결제 금액:{B}원</p><br />
                </Box>
            </Grid>

            <Grid padding="0px 40px 40px 40px">
                <h4>약관동의</h4>
                <form method="post" action="">

                    <div class="form-check">
                        <div >
                            <input type="checkbox" id="AllCheck" checked={AllCheck} onChange={allBtnEvent} />
                            <label for="AllCheck"><b>아래 내용에 전체 동의합니다</b></label>
                        </div>
                        <div>
                            <input type="checkbox" id="check1" checked={ServiceCheck} onChange={ServiceCheckEvent} />
                            <label for="check1">서비스 이용약관 동의 <span >(필수)</span></label>{" "}
                            <Button variant="link" onClick={() => setModalShow3(true)}>
                                자세히
                            </Button>
                            <Modal3
                                show={modalShow3}
                                onHide={() => setModalShow3(false)}
                            />
                        </div>
                        <div>
                            <input type="checkbox" id="check2" checked={CollectCheck} onChange={CollectCheckEvent} />
                            <label for="check2">개인정보 수집 이용 동의 <span >(필수)</span></label>{" "}
                            <Button variant="link" onClick={() => setModalShow2(true)}>
                                자세히
                            </Button>
                            <Modal2
                                show={modalShow2}
                                onHide={() => setModalShow2(false)}
                            />
                        </div>
                        <div>
                            <input type="checkbox" id="check3" checked={OfferCheck} onChange={OfferCheckEvent} />
                            <label for="check3">개인정보 제 3자 제공 <span >(필수)</span> </label>{" "}
                            <Button variant="link" onClick={() => setModalShow1(true)}>
                                자세히
                            </Button>
                            <Modal1
                                show={modalShow1}
                                onHide={() => setModalShow1(false)}
                            />
                        </div>
                    </div>
                </form>
                <br />
                <Button onClick={() =>
                    Swal.fire({
                        title: "결제 취소",
                        text: "결제를 취소하시겠습니까??",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "확인",
                        cancelButtonText: "취소",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/DetailPage/" + id);
                        }
                    })
                }>취소하기</Button>{" "}
                <Button onClick={PayButtonClick}>결제하기</Button>
            </Grid>
        </div >
        :
        <></>

    )
}

export default PayPage;
