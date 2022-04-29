# Smart Fridge Management System
This Smart Fridge management system was made as the software support for the Smart Fridge project. It is written to work with a pre-existing MySQL database containing information about products stored in a Smart Fridge, more information on which can be found below. Its main functionalities are the preview of said products (product name, expiration date, and quantity of the product stored inside the fridge at any given moment), as well as the management of a user-defined list of preferred products, which are products the user always wants to have in the fridge. Based on the list of preferred products, as well as the current quantity and expiration date of those products, the user can generate and print a shopping list straight from the app, simplifying the process of deciding what needs to be bought on your next trip to the grocery store.

## Smart Fridge
The Smart Fridge mentioned in this readme was my graduation project at Tehnička Škola Ruđera Boškovića in Zagreb, 2020. The project was inspired by Amazon GO grocery stores, and made to represent a full-stack solution that would allow for tracking information about products inside a fridge using RFID technology.
It was built on the Arduino Mega platform with an W5100 Ethernet shield to allow for communication with a XAMPP webserver on which the management system and the data base was hosted, an RFID-RC522 RFID reader for reading and programming the RFID cards, and a display system consisting of two LED diodes and a 16x2 LCD display.

## Database
The product information used by both software and hardware parts of this project are stored in a MySQL database hosted on a XAMPP server. It consisted of four tables:

**fridgeContents** which contains the Unique ID (*UID*) of the product, *productID* - a foreign key connected to the later described productInfo table, and *expirationDate*.

**productInfo** which connects the *ID* of a product to its *productName*

**preferredItems** which stores the user-define list of products that should always be in the fridge, consisting of its *ID* (same as the productInfo ID and the fridgeContents productID) and the *amount* we always want to have in the fridge

and finally the **settings** table which has no relations with the other three, but is still important in that it stores user preferences about the colors they want to have displayed for the expired and soon to expire products (*colorExpired* and *colorSoonToExpire*), as well as the time span for which products should be displayed as "Soon to expire" (*daysToExpiry*)

## Web application
The frontend of the web application consists of two html pages - index.html and settings.html, which use JavaScript scripts for generating lists of products, saving user settings, and other application logic. The application backend is made up of a number of php scripts which use connection.php to communicate with the database in order to retrieve or update data in the database. Each of these scripts are then called from JavaScript using AJAX calls, thus connecting the frontend and backend of the application.
