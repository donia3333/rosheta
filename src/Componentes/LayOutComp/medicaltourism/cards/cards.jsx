import React from 'react';
import Styles from './cards.module.scss';
import Card from 'react-bootstrap/Card';
import tourimg1 from '../../../../images/Aswan.webp';
import tourimg2 from '../../../../images/KhargaOasis.webp';
import tourimg3 from '../../../../images/Siwa-Lake.jpg';
import tourimg4 from '../../../../images/SiwaOasis.webp';
import tourimg5 from '../../../../images/ainmusa.webp';
import tourimg6 from '../../../../images/black-sand.webp';
import { Container, Row, Col } from 'react-bootstrap';

function Tourcards() {
  return (
    <div className={Styles.main}>
      <Container className={[Styles.container]}>
        <div className='row'>
          <div className="col-lg-8 col-12 ">
              <h2>Discover the best locations <br></br>in Egypt for medical tourism!</h2>
              <Row>
              <Col xl={6} xs={12} className={[Styles.card,'mt-3']} >
                  <Card className={['mb-3',Styles.card]}>
                  <Card.Img variant="top" src={tourimg1} className={Styles.images} />
                  <Card.Body>
                      <Card.Title className={Styles.text}>Aswan</Card.Title>
                      <Card.Text>
                      Known for its serene atmosphere, Aswan offers natural therapy through its warm climate and healing sands, perfect for patients seeking relief from rheumatic diseases and arthritis.
                      </Card.Text>
                  </Card.Body>
                  </Card>
              </Col>

              <Col xl={6} xs={12} className={[Styles.card,'mt-3']}>
                  <Card className={['mb-3',Styles.card]}>
                  <Card.Img variant="top" src={tourimg2} className={Styles.images} />
                  <Card.Body>
                      <Card.Title className={Styles.text}>Kharga Oasis</Card.Title>
                      <Card.Text>
                      A desert paradise, Kharga Oasis is famous for its mineral-rich hot springs, which are believed to aid in the treatment of skin conditions, rheumatism, and digestive ailments.
                      </Card.Text>
                  </Card.Body>
                  </Card>
              </Col>

              <Col xl={6} xs={12} className={[Styles.card,'mt-3']}>
                  <Card className={['mb-3',Styles.card]}>
                  <Card.Img variant="top" src={tourimg3} className={Styles.images} />
                  <Card.Body>
                      <Card.Title className={Styles.text}>Siwa Lake</Card.Title>
                      <Card.Text>
                      A salt lake in the heart of Siwa Oasis, Siwa Lake is renowned for its therapeutic mud baths and saltwater treatments, which help with skin issues and joint pain.
                      </Card.Text>
                  </Card.Body>
                  </Card>
              </Col>

              <Col xl={6} xs={12} className={[Styles.card,'mt-3']}>
                  <Card className={['mb-3',Styles.card]}>
                  <Card.Img variant="top" src={tourimg4} className={Styles.images} />
                  <Card.Body>
                      <Card.Title className={Styles.text}>Siwa Oasis</Card.Title>
                      <Card.Text>
                      Siwa Oasis is a unique destination known for its natural sulfur springs and salt caves, offering relief to those with respiratory conditions and providing a tranquil environment for healing.
                      </Card.Text>
                  </Card.Body>
                  </Card>
              </Col>

              <Col xl={6} xs={12} className={[Styles.card,'mt-3']}>
                  <Card className={['mb-3 ',Styles.card]}>
                  <Card.Img variant="top" src={tourimg5} className={Styles.images} />
                  <Card.Body>
                      <Card.Title className={Styles.text}>Ain Musa</Card.Title>
                      <Card.Text>
                      Ain Musa, or Moses’ Springs, offers visitors a chance to experience its famous sulfur springs, known for their healing properties, particularly in alleviating joint pain and skin diseases.
                      </Card.Text>
                  </Card.Body>
                  </Card>
              </Col>

              <Col xl={6} xs={12} className={[Styles.card,'mt-3']}>
                  <Card className={['mb-3',Styles.card]}>
                  <Card.Img variant="top" src={tourimg6} className={Styles.images} />
                  <Card.Body>
                      <Card.Title className={Styles.text}>Black Sand</Card.Title>
                      <Card.Text>
                      The black sand beaches of Egypt, particularly along the Red Sea, are rich in minerals like thorium and zircon. Known for their therapeutic properties, they are effective in alleviating joint pain, arthritis, and skin conditions through sand baths and natural heat therapy.
                      </Card.Text>
                  </Card.Body>
                  </Card>
              </Col>
              </Row>
          </div>

          <div className={["col-lg-4 col-12 mt-4 "]}>
              <div className={Styles.div3}>
              <h4>Pharaohs' Contributions to Medicine</h4>
              <ul>
                  <li>Advanced knowledge of herbal medicine, utilizing plants like garlic, onions, and honey for treatments.</li>
                  <li>Developed surgical practices, including setting fractures, wound stitching, and draining abscesses.</li>
                  <li>Created detailed medical papyri, such as the Ebers Papyrus and Edwin Smith Papyrus, documenting medical knowledge and treatments.</li>
                  <li>Emphasized the importance of hygiene and cleanliness, using linen bandages and antiseptics like honey and resins.</li>
                  <li>Believed in holistic healing, combining medical treatments with spiritual practices and rituals to ensure balance between body and soul.</li>
              </ul>
              </div>
              <div className={Styles.div3}>
              <h4>Pharaohs and Their Use of Alternative Medicine in Treatment</h4>
              <ul>
                  <li>Holistic Healing: The Pharaohs believed in a holistic approach to health, considering both physical and spiritual aspects of well-being. They combined medical treatments with rituals.</li>
                  <li>Herbal Remedies: Ancient Egyptians utilized a variety of herbs for their medicinal properties, believed to strengthen the immune system, and coriander, used to alleviate digestive issues.</li>
                  <li>Natural Therapies: Pharaohs sought natural therapies from their environment, such as mud and clay for treating skin diseases, and hot springs for relief from arthritis and skin issues.</li>
                  <li>Massage and Physical Therapies: Massage was a common practice for treating physical ailments, with techniques used to alleviate pain and promote relaxation through plant-derived oils.</li>
              </ul>
              </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Tourcards;
