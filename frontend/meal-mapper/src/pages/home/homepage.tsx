import { Container, Row, Col, Card } from 'react-bootstrap';
import './style.css'

export default function HomePage() {
  return (
<Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1>Welcome to Meal mapper</h1>
          <p>
            Our application helps you monitor your food intake and manage your meals. You can add foods, view nutritional information, and organize your meals according to your health goals.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>How the Application Works</Card.Title>
              <Card.Text>
                You can add the foods you consume daily, along with all the relevant nutritional information such as calories, protein, fat, and carbohydrates. 
                Then, you can create meals by combining different foods and view a complete nutritional summary of the meal.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Information on Weight Gain and Weight Loss</Card.Title>
              <Card.Text>
                <strong>Weight Gain:</strong> To gain weight, you need to consume more calories than your body burns daily. This can be achieved by increasing the amount of nutrient-dense foods in your diet, such as proteins, healthy fats, and complex carbohydrates.
              </Card.Text>
              <Card.Text>
                <strong>Weight Loss:</strong> To lose weight, you need to create a calorie deficit, meaning you consume fewer calories than your body needs to maintain your current weight. This can be done through a combination of a balanced diet and increased physical activity.
              </Card.Text>
              <Card.Text>
                It is important to consult a nutritionist or healthcare professional before starting any weight gain or weight loss program to ensure your choices are safe and healthy.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
