import React, { useState} from "react";
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Link from 'next/link'
import Sidebar from '../components/Sidebar/sidebar'
import Navbar from '../components/Navbar/navbar'

//I imported data of trainers from my local file. I don't know, using 'import' is good practise or not in NextJS.
//Below the page, there is a section called 'getStaticProps()'. I know that we use that for data fetching from API
//or something like that. But I sent the data as a props to my component using this function. 
import trainersDB from '../trainers/trainersDB.json'


export default function Home({dataOfTrainers}) {
  
  //I used React Hooks to change the state
  const [trainers, setTrainers] = useState(dataOfTrainers)
  
  //Function for sorting our trainers. 
  const onClick = e => {
    e.persist();
    
    if(e.target.id === 'priceHL'){
        const sorted = [...trainers].sort((a, b) => {
            return b.price - a.price;
        });
        setTrainers(sorted)
    }
    else if(e.target.id === 'priceLH') {
        const sorted = [...trainers].sort((a, b) => {
            return a.price - b.price;
        });
        setTrainers(sorted)
    }
    else if(e.target.id === 'nameAZ') {
        const sorted = [...trainers].sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        setTrainers(sorted)
    }
    else if(e.target.id === 'nameZA') {
        const sorted = [...trainers].sort((a, b) => {
            return b.name.localeCompare(a.name);
        });
        setTrainers(sorted)
    }  
  } 

  return (
  <>
  <Head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"/>
  </Head>
 
  <Container  fluid className=" bg-primary">
      <Row >
        <Col sm={10} id="page-content-wrapper" >
            <Container fluid>
                <Navbar />
                <h3 className="m-3">Choose Trainer</h3>
                <Row className="m-2 mb-4">
                    <Col>
                        <h6>Hamburg</h6>
                    </Col>
                    <Col>
                        <h6>{trainers.length} available</h6>
                    </Col>
                    <Col>
                        <h6>
                        <DropdownButton id="dropdown-item-button" title="Sort">
                            <Dropdown.Item id="priceHL" as="button" onClick={onClick}>Price - High to Low</Dropdown.Item>
                            <Dropdown.Item id="priceLH" as="button" onClick={onClick}>Price - Low to High</Dropdown.Item>
                            <Dropdown.Item id="nameAZ" as="button" onClick={onClick}>Name - A to Z</Dropdown.Item>
                            <Dropdown.Item id="nameZA" as="button" onClick={onClick}>Name - Z to A</Dropdown.Item>
                        </DropdownButton>
                        </h6>
                    </Col>
                </Row>
                <Row>
                    {trainers.map((trainer, i) => {
                        return(
                            <Link href="/trainer/[id]" as={`/trainer/${trainer.id}`} key={i}>
                                <a id="link">
                                <Card>
                                    <div className="imgBody mt-3">
                                        <Image id="trainerImage" src={trainer.picture} roundedCircle  />
                                    </div>
                                
                                    <Card.Body>
                                        <Card.Title><h2>{trainer.name}</h2></Card.Title>
                                        <Card.Text>
                                            {trainer.service.map((item,i) => {
                                                return (
                                                <a key={i} id="link">{item}</a>
                                                )
                                            })}
                                        </Card.Text>
                                        <p>Price: </p>
                                        <h3>{trainer.price}$</h3>
                                    </Card.Body>
                                </Card>
                                </a>
                            </Link>
                        )
                    })}
                </Row>
            </Container>
        </Col>
        <Col sm={2} id="sidebar-wrapper" className=" bg-dark">
          <Sidebar />
        </Col>
      </Row>
  </Container>
  </>
  )
}

export async function getStaticProps() {
  const dataOfTrainers = trainersDB
  return {
    props: {
      dataOfTrainers
    }
  }
}
 
