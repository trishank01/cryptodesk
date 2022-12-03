import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Button, Spin } from "antd";
import { HeartFilled } from "@ant-design/icons";
import {
  useGetCryptosForPaginationQuery,
  useGetSearchsuggestionsQuery,
} from "../services/cryptoApi";
import PaginationPage from "../components/Pagination";
import { CURRENT_ID, SelectCurrentId } from "../app/currentIdSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";





const Cryptocurrencies = ({ simplified }) => {
  const [countNumber, setCountNumber] = useState(50);
  const [offset, setOffset] = useState(0);
  const count = simplified ? 10 : countNumber;
  const { data: cryptosList, isFetching } = useGetCryptosForPaginationQuery({
    count,
    offset,
  });

  const cryptoCoins = cryptosList?.data?.coins;
  console.log(cryptoCoins)

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //const [currentpage, setCurrentpage] = useState(2);
  const [showhidden, setShowhidden] = useState(false);
  const { data   } = useGetSearchsuggestionsQuery(searchTerm);
 // const [currentID, setcurrentID] = useState([]);
  const searchQuery = data?.data?.coins;

  const dispatch = useDispatch()
  const currentId = useSelector(SelectCurrentId)




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



  const handleBookMark = (id) => {

    dispatch(CURRENT_ID(id))
  };
  




  if (isFetching) return <Loader/>;

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
                  <div onClick={() => handleBookMark(currency.uuid)}>
              
                    <HeartFilled  className={`text-[25px] duration-300 cursor-pointer mt-10 ${currentId.includes(currency.uuid) ? "text-red-700 scale-110" : ""}`}/>
                  </div>
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


