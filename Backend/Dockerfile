# Use lightweight JDK
FROM eclipse-temurin:24-jdk-alpine

# Set working directory
WORKDIR /app

# Copy jar
COPY target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run app
ENTRYPOINT ["java", "-jar", "app.jar"]