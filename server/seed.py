from app import app, db
from models import Restaurant, Pizza, RestaurantPizza

# Sample data
restaurants = [
    {'name': 'Pizza Palace', 'address': '123 Pizza Street'},
    {'name': 'Italiano Pizzeria', 'address': '456 Pasta Avenue'},
    {'name': 'New York Pizza', 'address': '789 Big Apple Road'}
]

pizzas = [
    {'name': 'Margherita', 'ingredients': 'Tomato, Mozzarella, Basil'},
    {'name': 'Pepperoni', 'ingredients': 'Tomato, Mozzarella, Pepperoni'},
    {'name': 'Hawaiian', 'ingredients': 'Tomato, Mozzarella, Ham, Pineapple'}
]

# Seed function
def seed_db():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Add restaurants
        for r in restaurants:
            restaurant = Restaurant(name=r['name'], address=r['address'])
            db.session.add(restaurant)

        # Add pizzas
        for p in pizzas:
            pizza = Pizza(name=p['name'], ingredients=p['ingredients'])
            db.session.add(pizza)

        db.session.commit()

        # Create associations
        for r in Restaurant.query.all():
            for p in Pizza.query.all():
                restaurant_pizza = RestaurantPizza(price=10.0, pizza_id=p.id, restaurant_id=r.id)
                db.session.add(restaurant_pizza)

        db.session.commit()

# Run the seed function
if __name__ == '__main__':
    seed_db()
    print("Database seeded successfully!")
