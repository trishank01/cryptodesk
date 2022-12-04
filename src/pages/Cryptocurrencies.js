import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import {
  useGetCryptosForPaginationQuery,
  useGetSearchsuggestionsQuery,
} from "../services/cryptoApi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { GET_WATCHLIST_COIN, selectWatchListCoin } from "../app/watchlistSlice";
import { ShowOnLoginNavBar } from "../components/AuthRoutes";

const Cryptocurrencies = ({ simplified }) => {
  const [countNumber] = useState(50);
  const [offset, setOffset] = useState(0);
  const count = simplified ? 10 : countNumber;
  const { data: cryptosList, isFetching } = useGetCryptosForPaginationQuery({
    count,
    offset,
  });
  
  const cryptoCoins = cryptosList?.data?.coins;
  const [cryptos, setCryptos] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showhidden, setShowhidden] = useState(false);
  const { data } = useGetSearchsuggestionsQuery(searchTerm);
  const searchQuery = data?.data?.coins;
  const dispatch = useDispatch();

  const watchListcoin = useSelector(selectWatchListCoin)
  
  useEffect(() => {
    setCryptos(cryptoCoins);
  }, [cryptosList, cryptoCoins]);

  const handleOnblur = () => {
    const clearTime = setTimeout(() => {
      setShowhidden(false);
    }, 2000);

    return () => {
      clearTimeout(clearTime);
    };
  };

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

  // / dispatch(CURRENT_ID(id));
  const handleBookMark = (id) => {
  
    const userDocRef = doc(db, "bookmarks", user?.uid);

    try {
      setDoc(userDocRef, {
        coins: watchListcoin ? [...watchListcoin, id] : [id],
      });
      console.log("coin added");
    } catch (error) {
      console.log(error.message);
    }
  };

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
  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrecy"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowhidden(true)}
            onBlur={() => handleOnblur()}
          />
        </div>
      )}
      {
        <Row
          gutter={[10, 10]}
          className={`${
            showhidden ? "flex" : "hidden"
          } flex-col items-start pb-10`}
        >
          {searchQuery?.map((coin) => {
            return (
              <Link to={`/crypto/${coin.uuid}`} key={coin.uuid}>
                <Col xs={24} sm={12} lg={6} className="flex items-center">
                  <img
                    className="mr-4 min-w-[25px] min-h-[25px] max-h-[30px]"
                    src={coin.iconUrl}
                    alt=""
                  />
                  <p className="min-w-[200px]">{coin.name}</p>
                </Col>
              </Link>
            );
          })}
        </Row>
      }
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => {
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
                  <ShowOnLoginNavBar>
                  <div
                    onClick={() =>
                      watchListcoin?.includes(currency.uuid)
                        ? handleRemoveBookMark(currency.uuid)
                        : handleBookMark(currency.uuid)
                    }
                  >
                    <HeartFilled
                      className={`text-[25px] duration-300 cursor-pointer mt-10 ${
                        watchListcoin?.includes(currency.uuid)
                          ? "text-red-700 scale-110"
                          : ""
                      }`}
                    />
                  </div>
                  </ShowOnLoginNavBar>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      {!simplified && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            className="disabled:bg-slate-500"
            onClick={() => setOffset(offset - 50)}
            disabled={offset === 0}
          >
            Prev
          </Button>
          <Button onClick={() => setOffset(offset + 50)}>Next</Button>
        </div>
        //  <div className="flex justify-center mt-6">
        //    <PaginationPage offset={offset} setOffset={setOffset}/>
        //  </div>
      )}
    </>
  );
};

export default Cryptocurrencies;
