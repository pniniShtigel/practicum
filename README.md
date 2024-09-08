Employees Management Application
This is an employee management site. It is possible to add, update and delete employees. Each employee can have several roles to choose from
The website is designed to be pleasing to the eye.
Hope you'll enjoy.
![צילום מסך 2024-09-08 015722](https://github.com/user-attachments/assets/130215ed-4de3-4942-b8b4-6afb19568c8d)
![צילום מסך 2024-09-08 015835](https://github.com/user-attachments/assets/a91a9a01-7af2-4888-901b-fc31487bdc19)
![צילום מסך 2024-09-08 015828](https://github.com/user-attachments/assets/94e6d07e-f3fb-4ee8-a8e4-75838ce87e4b)

Application Description
The application displays a list of employees in a table format and provides options to add and edit employees.

Installation and Setup
1. Node.js Installation Instructions:
Make sure you have Node.js and npm installed on your computer. You can download them from https://nodejs.org/.
Clone the project repository to your local machine.
Navigate to the project directory in your terminal/command prompt.
2. Project Dependencies Installation Instructions:
For the server-side (C# API):
Launch your preferred development environment, such as Visual Studio.
Open the C# project by navigating to its directory.
Select the project file (usually ending with .csproj) and open it in Visual Studio.
For the client-side (Angular):
Navigate to the client directory (/client) in your terminal/command prompt.
Run the following command to install dependencies: npm install
After installing dependencies, start the Angular development server using: ng serve
3. Accessing the Application
Once both the server and client are running, the application will be available at: http://localhost:4200.

Performing Database Migration
Creating a New Migration
Open Package Manager Console (PMC) in Visual Studio:

Navigate to "View" > "Other Windows" > "Package Manager Console".
Run the Command to Create a New Migration:

In the PMC window, execute the following command: Add-Migration InitialCreate
This command will create a new migration with the name "InitialCreate" (you can customize the name if needed).
Run the Command to Apply the Migration:

After creating the migration, execute the following command in PMC to apply the migration and update the database: Update-Database

This command will apply the changes specified in the migration to your database.

By following these steps, you can easily create a new migration, apply it to your database, and update the schema using Package Manager Console in Visual Studio.
