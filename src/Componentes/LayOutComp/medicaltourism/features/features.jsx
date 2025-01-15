import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Styles from './features.module.scss'; 

function Features() {
  return (
    <Container className='mb-4' >
      <div className={Styles.container}>
        <h1 className={Styles.title}>Why Choose Egypt for Your Next Medical Journey?</h1>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Card className={Styles.card}>
              <Card.Body>
                <Card.Title className={Styles.cardtitle}>World-Class Medical Facilities</Card.Title>
                <Card.Text>
                  Egypt boasts advanced medical technology and internationally accredited hospitals staffed by highly trained professionals, ensuring top-notch healthcare services.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Card className={Styles.card}>
              <Card.Body>
                <Card.Title className={Styles.cardtitle}>Affordable Treatment Options</Card.Title>
                <Card.Text>
                  Medical procedures in Egypt are significantly more cost-effective compared to many Western countries, allowing patients to receive high-quality care without breaking the bank.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Card className={Styles.card}>
              <Card.Body>
                <Card.Title className={Styles.cardtitle}>Rich Cultural Experience</Card.Title>
                <Card.Text>
                  Combining medical treatment with a vacation, Egypt offers a unique opportunity to explore its rich history, including ancient monuments, temples, and the breathtaking Nile River.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Card className={Styles.card}>
              <Card.Body>
                <Card.Title className={Styles.cardtitle}>Natural Healing Resources</Card.Title>
                <Card.Text>
                  Egypt is home to natural therapeutic resources, such as mineral-rich hot springs and mud baths, known for their healing properties, particularly for skin and joint conditions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Card className={Styles.card}>
              <Card.Body>
                <Card.Title className={Styles.cardtitle}>Personalized Patient Care</Card.Title>
                <Card.Text>
                  Many Egyptian healthcare providers prioritize patient comfort and satisfaction, offering personalized treatment plans and dedicated support throughout the healing process.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Card className={Styles.card}>
              <Card.Body>
                <Card.Title className={Styles.cardtitle}>Multilingual Staff</Card.Title>
                <Card.Text>
                  Many healthcare professionals in Egypt speak multiple languages, making it easier for international patients to communicate and receive the necessary care without language barriers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Features;
