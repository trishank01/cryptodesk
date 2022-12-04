import { Card, Col, Row } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCryptoCoinQuery } from "../services/cryptoApi";
import { HeartFilled } from "@ant-design/icons";
import Loader from "../components/Loader";
import { GET_WATCHLIST_COIN, selectWatchListCoin } from "../app/watchlistSlice";
import { SelectuserEmail } from "../app/authSlice";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";





const WatchList = () => {
  const { data, isFetching } = useGetCryptoCoinQuery();
  const cryptos = data?.data?.coins;
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
 
  const watchListcoin = useSelector(selectWatchListCoin)

  const userEmail = useSelector(SelectuserEmail)
  const u1 = userEmail?.substring(0, userEmail.indexOf("@"));
  const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
  




  const filtered = cryptos?.filter((item) => {
    return watchListcoin?.includes(item.uuid);
  });

  //    const filtered = cryptos?.filter((item) => {
  //     return currentId.indexOf(item.uuid) !== -1
  //    })

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "bookmarks", user?.uid);
      const unsubscribe = onSnapshot(userDocRef, (coin) => {
        if (coin.exists()) {
          // setWatchList(coin.data().coins);
          dispatch(GET_WATCHLIST_COIN(coin.data().coins))
        } else {
          console.log("No items in watchList");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user , dispatch]);

  

  const handleRemoveBookMark = (id) => {
    const userDocRef = doc(db, "bookmarks", user?.uid);

    try {
      setDoc(userDocRef, {
        coins: watchListcoin.filter((coin) => coin !== id),
      });
      console.log("coin remvoed");
     
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(watchListcoin)

  // useEffect(() => {
  //   dispatch(GET_WATCHLIST_COIN(coins))
  //   console.log(coins)
  // },[dispatch , coins])

  if (isFetching) return <Loader />;

  return (
    <div className="min-h-[36rem]">
      {/* {filterCurrentUser[0]?.userName} */}
      <h1 className="mb-4">
        Welcome <b>{uName}</b> here you can manage your
        watchList{" "}
      </h1>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {filtered?.map((currency) => {
          return (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              <Card>
                <Link to={`/crypto/${currency.uuid}`}>
                  <div className="flex justify-between pb-2 border-b-black-900 border-b-[2px] ">
                    <h1 className="md:text-[20px] font-semibold">{`${currency.rank}. ${currency.name}`}</h1>
                    <img
                      className="crypto-image"
                      src={currency.iconUrl}
                      alt=""
                    />
                  </div>
                </Link>
                <div className="flex justify-between mt-2">
                  <div>
                    <p>Price : ${Number(currency?.price).toFixed(2)}</p>
                    <p>Market Cap : {millify(currency.marketCap)}</p>
                    <p>Daily Cap : {millify(currency.change)}%</p>
                  </div>
                  <button type="submit" onClick={() => handleRemoveBookMark(currency.uuid)}>
                    <HeartFilled
                      className={`text-[25px] duration-300 cursor-pointer mt-10 ${
                        watchListcoin.includes(currency.uuid)
                          ? "text-red-700 scale-110"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              </Card>
            </Col>   
          );
        })}
         {watchListcoin.length === 0  && <div className="ml-4">dont have any watchlist add now <Link className="text-cyan-600" to="/cryptocurrencies">click here</Link></div>}
      </Row>
    </div>
  );
};

export default WatchList;


// import {
//   collection,
//   addDoc,
//   Timestamp,
//   doc,
//   setDoc,
//   onSnapshot,
//   orderBy,
//   query,
// } from "firebase/firestore";

// const [currentUserFirebase, setCurrentUserFirebase] = useState();
// const getCollection = () => {
//   try {
//     const docRef = collection(db, "registerUserInfo");
//     const q = query(docRef);
//     //orderBy("createdAt", "desc")

//     onSnapshot(q, (Snapshot) => {
//       const allData = Snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setCurrentUserFirebase(allData);
//     });
//   } catch (error) {
//     //toast.error(error.message);
//   }
// };
// useEffect(() => {
//   getCollection();
// }, []);