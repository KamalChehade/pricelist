# Use an official Maven image with OpenJDK 17 as a parent image
FROM maven:3.8.5-openjdk-17 AS build

# Copy the project files
COPY . .

# Run Maven build
RUN mvn clean package -DskipTests

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/quantumweb-0.0.1-SNAPSHOT.jar quantumweb.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","quantumweb.jar"]
