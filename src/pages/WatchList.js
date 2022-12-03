import { Card, Col, Row } from 'antd'
import millify from 'millify'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CURRENT_ID, SelectCurrentId } from '../app/currentIdSlice'
import { useGetCryptoCoinQuery } from '../services/cryptoApi'
import {HeartFilled} from '@ant-design/icons'
import Loader from '../components/Loader'


const WatchList = () => {
   const currentId = useSelector(SelectCurrentId)  
   const {data , isFetching} = useGetCryptoCoinQuery()
   const cryptos = data?.data?.coins
   const dispatch = useDispatch()
  
   const filtered = cryptos?.filter((item) => {
    return currentId.includes(item.uuid) 
   })

//    const filtered = cryptos?.filter((item) => {
//     return currentId.indexOf(item.uuid) !== -1
//    })


   const handleBookMark = (id) => {

    dispatch(CURRENT_ID(id))
  };

  if (isFetching) return <Loader/>;


  return (
    <div>
        <h1>WatchList</h1>
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
                  <div  onClick={() => handleBookMark(currency.uuid)}>
              
                    <HeartFilled  className={`text-[25px] duration-300 cursor-pointer mt-10 ${currentId.includes(currency.uuid) ? "text-red-700 scale-110" : ""}`}/>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

    </div>
  )
}

export default WatchList