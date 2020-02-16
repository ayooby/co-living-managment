# co-living-web-api

manage co-living aparatments.

# Prerequisites

- python 3.7^

# Local Development

Install dependencies
```bash
pip install -r requirements.txt
```

Migrate DataBase tables
```bash
python manage.py migrate
```

Create SuperUser to manage apartments
```bash
python manage.py createsuperuser
```

# Admin Panel
In order to create a new list you have to follow these steps:

* create a new apartment on `Supplies` section and assign a cleaner
* create a new supply item the supply page
* add supply item to the apartment by using `supplyApartment` page

# Result

After creating a new list go to the front end page and login with cleaner user and then you will see all the lists.
