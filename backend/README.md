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

# What to improve

* Automation the process of creating a new list everymonth using crontab
* Making api endpoint for Admin section and List creation.
