import { Button, Card, ListGroup, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { Meal } from '../../models/Meal';

export default function Meal() {

  const [meals, setMeals] = useState<Meal[]>([])

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8910/meal')
      .then(response => {
        var meals : Meal[] = calculateAmount(response.data);
        setMeals(meals);
      })
      .catch(error => {
        console.error('There was an error fetching the meals!', error);
      });
  }, []);

  async function deleteMeal(id: number) {
    axios.delete(`http://localhost:8910/meal/${id}`)
      .then(() => {
        setMeals(meals.filter(item => item.id !== id))
      })
      .catch(error => {
        console.error('There was an error deleting the meal!', error);
      });
  }

  async function edit(mealId: number) {
    navigate(`/meal/${mealId}`);
  }

  function calculateAmount(meals: Meal[]) {
    if (meals) {
      meals.forEach((meal) => {
        meal.amountCalories = 0;
        meal.amountCarbs = 0;
        meal.amountProtein = 0;
        meal.amountFat = 0;
        meal.description = "";
        let foods = [];
        if (meal.foods !== null && meal.foods!.length > 0) {
          meal.foods!.forEach((food) => {
            foods.push(food.name)
            meal.amountCalories = meal.amountCalories! + food.calories!
            meal.amountCarbs = meal.amountCarbs! + food.carbs!
            meal.amountProtein = meal.amountProtein! + food.protein!
            meal.amountFat = meal.amountFat! + food.fat!
            meal.description = foods.join(", ");
          })
        }
      })
    }
    return meals
  }

  return (
    <div className='container'>
      <h2> Meals </h2>
      <Button href="/meal/new" className='my-2 mx-1' variant='success'>New Meal</Button>
      {meals ? (
        <div className='mt-4 d-flex justify-content-between'>
          <Row className='col-12'>
            {meals.map((item) => {
              return (
                <Card key={item.id} className=" mx-4 my-2 col-3  card" >
                  <Card.Body>
                    <Card.Title>Name: {item.name}</Card.Title>
                    <Card.Text style={{ minHeight: "5rem" }}>
                      Ingredients: {item.description}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Calories: {item.amountCalories}g</ListGroup.Item>
                    <ListGroup.Item>Protein: {item.amountProtein}g</ListGroup.Item>
                    <ListGroup.Item>Carbs: {item.amountCarbs}g</ListGroup.Item>
                    <ListGroup.Item>Fat: {item.amountFat}g</ListGroup.Item>
                  </ListGroup>
                  <Card.Body className='d-flex justify-content-evenly'>
                    <Card.Link href="#">
                      <Button onClick={() => edit(item.id!)} >Edit</Button>
                    </Card.Link>
                    <Card.Link>
                      <Button onClick={() => deleteMeal(item.id!)} variant='danger'>Delete</Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              )
            })}
          </Row>
        </div>

      ) : (
        <div>
          <h4>There is no meal available. You can create on clicking on "New Meal", but remember that you need create a food first</h4>
        </div>
      )}

    </div>
  )
}

