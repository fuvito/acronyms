# Acronyms Backend Server

This is the backend server for the Acronyms application, built with Spring Boot 3.5.3 and Java 17. It provides RESTful APIs for managing acronyms.

## Prerequisites

- Java 17 or higher
- Maven 3.6.0 or higher
- H2 Database (embedded, no installation required)

## Getting Started

### Running the Application

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd acronyms/server
   ```

2. **Build the application**:
   ```bash
   mvn clean install
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

   The application will start on `http://localhost:8080` by default.

## API Documentation

Once the application is running, you can access:

- **H2 Database Console**: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (leave empty)

- **Actuator Endpoints**: `http://localhost:8080/actuator`

## Project Structure

```
src/
├── main/
│   ├── java/com/stud/server/
│   │   ├── controller/    # REST controllers
│   │   ├── model/         # Entity classes
│   │   ├── repository/    # Data access layer
│   │   ├── service/       # Business logic
│   │   └── ServerApplication.java  # Main application class
│   └── resources/
│       ├── static/        # Static content
│       ├── templates/     # Server-side templates
│       └── application.properties  # Application configuration
└── test/                  # Test files
```

## Dependencies

- Spring Boot Starter Web
- Spring Data JPA
- H2 Database
- Lombok
- Spring Boot Starter Test

## Configuration

Application properties can be configured in `src/main/resources/application.properties`.

## Building for Production

To create an executable JAR file:

```bash
mvn clean package
```

The JAR file will be created in the `target/` directory and can be run with:

```bash
java -jar target/server-0.0.1-SNAPSHOT.jar
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
