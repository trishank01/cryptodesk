import { Avatar, Col, Collapse, Row   , Typography } from 'antd'
import React from 'react'
import Loader from '../components/Loader'
import { useGetCryptoExchangeQuery } from '../services/cryptoExchangeApi'

const {Panel} = Collapse
const {Text} = Typography


const Exchanges = () => {
  const {data :cryptoExchange , isFetching } = useGetCryptoExchangeQuery()



  if(isFetching) return <Loader/>

  console.log(cryptoExchange)
  return (
    <>
    <Row>
       <Col span={6}>Exchanges</Col>
       <Col span={6}>24h Trade Volume</Col>
       <Col span={6}>Country</Col>
       <Col span={6}>Offical Link</Col>
    </Row>
    <Row>
      {cryptoExchange.map((exchange) => {
        return (
          <Col span={24} key={exchange.id}>
            <Collapse>
                 <Panel showArrow={false}
                   header={(
                    <Row key={exchange.id}>
                      <Col span={6}>
                        <Text> <strong>{exchange.trust_score_rank}</strong> </Text>
                        <Avatar className='exchange-image' src={exchange.image}/>
                        <Text> <strong>{exchange.name}</strong> </Text>
                      </Col>
                      <Col span={6}>{exchange.trade_volume_24h_btc.toFixed(2)} btc</Col>
                      <Col span={6}>{exchange.country || "NA"}</Col>
                      <Col span={6}>
                        <a href={exchange.url} target="_blank" rel='noreferrer'>{exchange.name}</a>
                      </Col>
                    </Row>
                   )}
               
                 >
                  <p>{exchange.description || "Description Not Provided By API"}</p>
                  </Panel> 
            </Collapse>
          </Col>
        )
      })}
    </Row>
    </>
  )
}

export default Exchanges