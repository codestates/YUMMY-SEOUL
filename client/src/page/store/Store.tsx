import "./Store.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Star_avg from "../../components/star/star_avg/Star_avg";
import Store_list from "../../components/store_list/Store_list";
import Kakao_map from "../../components/kakao_map/Kakao_map";
import ReviewEdit from "../../components/reviewedit/ReviewEdit";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Login from "../../components/login/Login";

function Store({ match }: any) {
  const [chMessage, setChMessage] = useState<boolean>(false);
  const [mesNone, setMesNone] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [addFav, setAddFav] = useState<boolean>();
  const [reviewlike, setReviewLike] = useState<number>(0);
  const [UserId, setUserId] = useState<number>(0);
  const [isLogin, setisLogin] = useState<boolean>(true);
  const [reviewNone, setRevieNone] = useState<string>("reviewEdit_hidden");

  type Store = {
    address: string;
    avg_rating: number;
    created_at: string;
    id: number;
    menu_name: string;
    open_time: string;
    phone_number: string;
    store_img: string;
    store_name: string;
    updated_at: string;
  };

  type Review = {
    id: number;
    user_id: number;
    comment: string;
    rating: number;
    created_at: string;
    user_name: string;
    user_img: string;
    num_review_like: number;
  };

  type likelist = {
    id: number;
    user_id: number;
    review_id: number;
  };

  const [likeList, setLikelist] = useState<likelist[]>([]);
  const [StoreInfo, setStoreInfo] = useState<Store>({
    address: "",
    avg_rating: 0,
    created_at: "",
    id: 0,
    menu_name: "",
    open_time: "",
    phone_number: "",
    store_img: "",
    store_name: "",
    updated_at: "",
  });

  const [ReviewInfo, setReviewInfo] = useState<Review[]>([]);
  // 찜하기, 리뷰쓰기 접근 함수
  const accessLogin: any = useRef();

  const handleImg = () => {
    setChMessage(!chMessage);
    if (chMessage) {
      setMesNone("");
    } else {
      setMesNone("store_balloon-none");
    }
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`https://localhost:4000/store/byId/${match.params.store_id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          setStoreInfo(res.data.data);
        });

      await axios
        .get(
          `https://localhost:4000/review/byStoreId/${match.params.store_id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((res) => {
          setReviewInfo(res.data.data);
        })
        .catch((err) => {});

      //!userdata 맨처음에 호출 ??? => 로그인안되있으면 불가능

      if (isLogin) {
        await axios
          .get(`https://localhost:4000/user/userinfo/userdata`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((res) => {
            setisLogin(true);
            setUserId(res.data.data.id);
          })
          .catch((err) => {
            setisLogin(false);
          });
      }
      //! 스토어별 리뷰중에 로그인한 유저가 좋아요한 리뷰리스트
      if (isLogin) {
        await axios
          .get(
            `https://localhost:4000/review/likelist/${match.params.store_id}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((res) => {
            setLikelist(res.data.data);
          })
          .catch((err) => {
            setLikelist([]);
            //이거안하면 오류남ㅇㅇ
          });
      }
      //!유저가 이 가게를 찜햇는지 아닌지 확인
      if (isLogin) {
        //console.log('store_name',StoreInfo.store_name)
        await axios
          .get(
            `https://localhost:4000/favorite/check-favorite/${StoreInfo.store_name}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((res) => setAddFav(true))
          .catch((err) => {
            setAddFav(false);
          });
      }
    })();
  }, [count, addFav, reviewlike]);

  const favoriteHandler = async () => {
    await axios
      .post(
        `https://localhost:4000/favorite/add-favorite`,
        {
          store_address: StoreInfo.address,
          store_name: StoreInfo.store_name,
          store_img: StoreInfo.store_img,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        setAddFav(true);
      });
  };

  const deleteFavoriteHandler = async () => {
    await axios
      .delete(`https://localhost:4000/favorite/${StoreInfo.store_name}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setAddFav(false);
      });
  };

  const addReviewHandler = async (
    store_id: number,
    comment: string,
    rating: number
  ) => {
    await axios
      .post(
        `https://localhost:4000/review/add-review/`,
        {
          store_id: store_id,
          comment: comment,
          rating: rating,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        setCount(count + 1);
        window.location.replace(window.location.href);
      });
  };

  const deleteReviewHandler = async () => {
    await axios
      .delete(`https://localhost:4000/review/${StoreInfo.id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setCount(count - 1);
      });
  };

  const reviewLikeHandler = async (review_id: number) => {
    await axios
      .post(
        `https://localhost:4000/review/like/${review_id}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        setReviewLike(reviewlike + 1);
      });
  };

  const DeletereviewLikeHandler = async (review_id: number) => {
    await axios
      .delete(`https://localhost:4000/review/like/${review_id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setReviewLike(reviewlike - 1);
      });
  };

  const reviewEdit = async (e: string) => {
    // 유저 정보 조회

    await axios
      .get(`https://localhost:4000/user/userinfo/userdata`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => setRevieNone(e))
      .catch((err) => {
        console.log("에러 잡힘", err);
        accessLogin.current.accessLogin();
      });

    // 조회 합격(리뷰 모달 on)

    // 조회 불합격(로그인 모달 on)
    // accessLogin.current
  };

  const [coords, setCoords] = useState<number[]>([]);

  const coordsHandler = (x: number, y: number) => {
    setCoords([x, y]);
  };

  console.log(coords);
  return (
    <>
      <Header
        handleImg={handleImg}
        isLogin={isLogin}
        accessLogin={accessLogin}
      />
      <div className="store_container">
        <section className="store_info_container">
          <div className="store_info_box">
            <div className="store_info_box-line">
              <aside className="store_map-box">
                <Kakao_map coordsHandler={coordsHandler} />
              </aside>
              <div className="store_text-box">
                <div className="store_tx-title-box">
                  <div className="store_tx-box">
                    <h1 className="store_tx-title">{StoreInfo.store_name}</h1>
                    <Star_avg avg_rating={StoreInfo.avg_rating} />
                  </div>
                  <div className="store_tx-icon-box">
                    {!addFav ? (
                      <img
                        className="store_tx-icon"
                        src="/store/heart.svg"
                        onClick={favoriteHandler}
                      />
                    ) : (
                      <img
                        className="store_tx-icon"
                        src="/store/heart_full.png"
                        onClick={deleteFavoriteHandler}
                      />
                    )}

                    <img
                      className="store_tx-icon"
                      src="/store/edit.svg"
                      onClick={() => reviewEdit("")}
                    />
                  </div>
                </div>
                <div className="store_tx-info-box">
                  <h3 className="store_tx-info-text">
                    주소:{" "}
                    {StoreInfo.address !== undefined ? StoreInfo.address : null}
                  </h3>
                  <h3 className="store_tx-info-text">
                    영업시간:{" "}
                    {StoreInfo.open_time !== undefined
                      ? StoreInfo.open_time
                      : null}
                  </h3>
                  <h3 className="store_tx-info-text">
                    연락처:{" "}
                    {StoreInfo.phone_number !== undefined
                      ? StoreInfo.phone_number
                      : null}
                  </h3>
                </div>
                <div className="store_tx-btn-box">
                  <a
                    href={`https://map.kakao.com/link/to/카카오판교오피스,${coords[0]},${coords[1]}`}
                    target="_blank"
                    className="store_btn-word"
                  >
                    <button className="store-btn">대중교통 길찾기</button>
                  </a>

                  <a
                    href={`https://map.kakao.com/link/to/카카오판교오피스,${coords[0]},${coords[1]}`}
                    target="_blank"
                    className="store_btn-word"
                  >
                    <button className="store-btn">차량 길찾기</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="store_review_container">
          <div className="store_review_box">
            <div className="store_review_count">
              <span>리뷰 ({ReviewInfo.length})</span>
            </div>

            <ul className="store_review_ul-box">
              {ReviewInfo.map((el: Review) => {
                let flag = false;
                for (let i = 0; i < likeList.length; i++) {
                  if (likeList[i].review_id === el.id) {
                    flag = true;
                    break;
                  }
                }

                return (
                  <Store_list
                    mesNone={mesNone}
                    ReviewInfo={el}
                    UserId={UserId}
                    deleteReviewHandler={deleteReviewHandler}
                    reviewLikeHandler={reviewLikeHandler}
                    deletereviewLikeHandler={DeletereviewLikeHandler}
                    isLike={flag}
                  />
                );
              })}
            </ul>
          </div>
        </section>
      </div>
      <ReviewEdit
        reviewNone={reviewNone}
        reviewEdit={reviewEdit}
        addReviewHandler={addReviewHandler}
        storeId={StoreInfo.id}
      />
      <Footer />
    </>
  );
}

export default Store;
