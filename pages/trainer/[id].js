import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Sidebar from '../../components/Sidebar/sidebar'
import Navbar from '../../components/Navbar/navbar'
import trainersDB from '../../trainers/trainersDB.json'

export default function trainerDetail ({trainer}) {   
  return (
    <>
    <Head>
        <title>Trainer Profile</title>
    </Head>
    <Container fluid>
      <Row>
        <Col sm={10} id="page-content-wrapper">
            <Navbar />
            <h3 className="m-3">Trainer Profile</h3>
            <Row className="mt-5"> 
            <Col id="trainerImgSec" md={4}>
                <Image className="ml-lg-5" id="trainerImage" src={trainer[0].picture} roundedCircle/>
            </Col>  
            <Col md={8} >
                <h3>{trainer[0].name}</h3>
                {/* I just copied and pasted rating stars from the following link: "https://codepen.io/GeoffreyCrofte/pen/jEkBL".  
                There is no function related to it. I just wanted to show something visual.*/}
                <div className="rating rating2">
                <a title="Give 5 stars">★</a>
                <a title="Give 4 stars">★</a>
                <a title="Give 3 stars">★</a>
                <a title="Give 2 stars">★</a>
                <a title="Give 1 star">★</a>
	            </div>
                <h4 className="mt-3 mb-3">Skills</h4>
                {trainer[0].service.map((item, i) => {
                  return (
                    <Button id="skillBtn" variant="light" key={i}>{item}</Button>
                  )
                })}
             
                <h4 className="mt-3 mb-3">Qualifications</h4>
                    <ul>
                    {trainer[0].quals.map((item, i) => {
                      return (
                      <li key={i}>{item}</li>
                        )
                    })}
                    </ul>
                <h4>About me</h4>
                <p>{trainer[0].about}</p>
            </Col>  
            </Row>
            
        </Col>
        <Col sm={2} id="sidebar-wrapper" className=" bg-dark">
          <Sidebar />
        </Col>
      </Row>
    </Container>
    </>
  )
}

export async function getStaticPaths(){

    const dataOfTrainers = trainersDB

    return {
      paths: dataOfTrainers.map(trainer => {
        return {params: {id : `${trainer.id}`}}
      }),
      fallback:false
    };
    
  }

export async function getStaticProps({ params }) {

    const dataOfTrainers = trainersDB

    const trainer = []

    dataOfTrainers.map(item => {
       
      if(item.id == params.id) {
          trainer.push(item)
        }
      })
      
    return {
      props: {
        trainer
      }
    }
  }