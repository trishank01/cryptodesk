import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Button } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({simplified}) => {
  const [countNumber, setCountNumber] = useState(50)
  const count  = simplified ?  10 : countNumber;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    // setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if(isFetching) return "Loading..."

  return (
    <>
   {!simplified  && <div className="search-crypto">
       <Input placeholder="Search Cryptocurrecy" onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => {
           return (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} alt=""/>}>
                <p >Price : {millify(currency.price)}</p>
                <p >Market Cap : {millify(currency.marketCap)}</p>
                <p >Daily Cap : {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
           )
        })}
      </Row>
      <Button onClick={() => setCountNumber(countNumber - 50)}>Prev</Button>
      <Button onClick={() => setCountNumber(countNumber + 50)}>Next</Button>
   
    </>
  );
};

export default Cryptocurrencies;
