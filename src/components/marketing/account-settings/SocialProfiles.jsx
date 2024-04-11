// import node module libraries
import React from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

// import profile layout wrapper
import ProfileLayoutWrap from "./ProfileLayoutWrap";
import { useState } from "react";

const SocialProfiles = () => {
  const location = useLocation();
  const [github, setGithub] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  const alert = () => {
    Swal.fire({
      title: "Alerta!",
      icon: 'success',
	  text: 'Guardando información...',      
      confirmButtonText: "Ok",
    });
  };

  const isAnyFieldFilled = () => {
    return (
      github !== "" || facebook !== "" || instagram !== "" || youtube !== ""
    );
  };

  const handleSave = () => {
    if (isAnyFieldFilled()) {
      alert("Guardando información...");
      // Aquí puedes realizar cualquier acción necesaria al guardar la información
    } else {
      alert("Por favor llena al menos un campo antes de guardar.");
    }
  };

  return (
    <ProfileLayoutWrap pathpara={location.pathname}>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Perfil Social</h3>
          </div>
        </Card.Header>
        <Card.Body>
          <Form>
            {/*  GitHub  */}
            <Row className="mb-5">
              <Col lg={3} md={4} sm={12}>
                <h5>GitHub</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Usuario de GitHub"
                  className="form-control mb-1"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Agrega tu usuario de GitHub.
                </Form.Text>
              </Col>
            </Row>
            {/*  Facebook  */}
            <Row className="mb-5">
              <Col lg={3} md={4} sm={12}>
                <h5>Facebook</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Usuario de Facebook"
                  className="form-control mb-1"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Agrega tu usuario de Facebook
                </Form.Text>
              </Col>
            </Row>
            {/*  Instagram  */}
            <Row className="mb-5">
              <Col lg={3} md={4} sm={12}>
                <h5>Instagram</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Usuario de Instagram"
                  className="form-control mb-1"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Agrega tu usuario de Instagram
                </Form.Text>
              </Col>
            </Row>
            {/*  YouTube  */}
            <Row className="mb-3">
              <Col lg={3} md={4} sm={12}>
                <h5>YouTube</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="YouTube Link"
                  className="form-control mb-1"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Agrega tu link de Youtube
                </Form.Text>
              </Col>
            </Row>
            {/*  Button  */}
            <Row>
              <Col lg={{ span: 6, offset: 3 }} sm={12}>
                <Button
                  onClick={handleSave}
                  style={{ backgroundColor: "#042b61", borderColor: "white" }}
                  disabled={!isAnyFieldFilled()}
                >
                  Guardar información
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </ProfileLayoutWrap>
  );
};

export default SocialProfiles;
