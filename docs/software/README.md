# Реалізація інформаційного та програмного забезпечення


## SQL-скрипт для створення на початкового наповнення бази даних

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mcas` ;

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mcas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mcas` ;

-- -----------------------------------------------------
-- Table `mcas`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`role` ;

CREATE TABLE IF NOT EXISTS `mcas`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `nameIndex` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`user` ;

CREATE TABLE IF NOT EXISTS `mcas`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `roleId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `roleId` (`roleId` ASC) VISIBLE,
  CONSTRAINT `user_ibfk_1`
    FOREIGN KEY (`roleId`)
    REFERENCES `mcas`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`action`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`action` ;

CREATE TABLE IF NOT EXISTS `mcas`.`action` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `action_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mcas`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`publicrequest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`publicrequest` ;

CREATE TABLE IF NOT EXISTS `mcas`.`publicrequest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `actionId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `actionId` (`actionId` ASC) VISIBLE,
  CONSTRAINT `publicrequest_ibfk_1`
    FOREIGN KEY (`actionId`)
    REFERENCES `mcas`.`action` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`mediadata`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`mediadata` ;

CREATE TABLE IF NOT EXISTS `mcas`.`mediadata` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `fileType` TEXT NOT NULL,
  `requestId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `requestId` (`requestId` ASC) VISIBLE,
  CONSTRAINT `mediadata_ibfk_1`
    FOREIGN KEY (`requestId`)
    REFERENCES `mcas`.`publicrequest` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permision` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permisionhasrole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permisionhasrole` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permisionhasrole` (
  `permisionId` INT NOT NULL,
  `roleName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`permisionId`, `roleName`),
  INDEX `roleName` (`roleName` ASC) VISIBLE,
  CONSTRAINT `permisionhasrole_ibfk_1`
    FOREIGN KEY (`permisionId`)
    REFERENCES `mcas`.`permision` (`id`),
  CONSTRAINT `permisionhasrole_ibfk_2`
    FOREIGN KEY (`roleName`)
    REFERENCES `mcas`.`role` (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

## RESTfull сервіс для управління даними

- Запуск сервісу

```py
import user_controller
from user_controller import app

if __name__ == "__main__":
    app.run(debug=True, port=3306, host="127.0.0.1")
```

- Модель 

```py
import mysql.connector

class Users:
    def __init__(self):
        try:
            print("Initializing connection to database...")
            self.host = 'localhost'
            self.user = 'root'
            self.password = 'my-l1ttle-horse'
            self.db = 'mydb'

            self.linking = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.db
            )

            self.cur = self.linking.cursor()
            print("Successful connection to database")
        except mysql.connector.Error as err:
            print("Failed to connect to database:", err)

    def get_all_users(self):
        try:
            print("Fetching all users...")
            self.cur.execute("SELECT * FROM user")
            users = self.cur.fetchall()

            if not users:
                return {"message": "Немає користувачів", "error": "Not Found", "status_code": 404}

            return users
        except mysql.connector.Error as err:
            return {'message': 'Не вдалося отримати всіх користувачів', 'error': str(err), 'status_code': 500}

    def get_user_by_id(self, user_id):
        try:
            print(f"Fetching user by id: {user_id}...")
            user_id = int(user_id)
            self.cur.execute("SELECT * FROM user WHERE id = %s", (user_id,))
            user = self.cur.fetchone()

            if not user:
                return {"message": f"Користувача з таким id = {user_id} не знайдено.", "error": "Not Found", "status_code": 404}

            return user
        except mysql.connector.Error as err:
            return {'message': 'Не вдалося знайти користувача', 'error': str(err), 'status_code': 500}
        except ValueError:
            return {"message": "Некоректний id користувача", "error": "Bad Request", "status_code": 400}

    def add_user(self, info):
        try:
            print(f"Adding user: {info}...")
            self.cur.execute("START TRANSACTION")
            self.cur.execute(
                "INSERT INTO user (id, email, password, role_id) VALUES (%s, %s, %s, %s)",
                (info['id'], info['email'], info['password'], info['role_id'])
            )
            self.linking.commit()

            if self.cur.rowcount > 0:
                return {"message": "Користувач доданий до бази даних", "status_code": 200}
            else:
                return {"message": "Користувач не був доданий до бази даних", "error": "Not Acceptable", "status_code": 406}
        except mysql.connector.Error as err:
            self.linking.rollback()
            return {'message': 'Не вдалося додати користувача', 'error': str(err), 'status_code': 500}

    def update_user(self, user_id, info):
        try:
            print(f"Updating user with id: {user_id}, info: {info}...")
            user_id = int(user_id)
            self.cur.execute("START TRANSACTION")
            updated_rows = 0
            for key, value in info.items():
                self.cur.execute(f"UPDATE user SET {key} = %s WHERE id = %s", (value, user_id))
                updated_rows += self.cur.rowcount
            self.linking.commit()

            if updated_rows > 0:
                return {"message": f"Дані про користувача із id = {user_id} оновлені", "status_code": 200}
            else:
                return {"message": f"Дані користувача із id = {user_id} не були оновлені", "error": "Not Acceptable", "status_code": 406}
        except mysql.connector.Error as err:
            self.linking.rollback()
            return {'message': 'Не вдалося оновити дані користувача', 'error': str(err), 'status_code': 500}
        except ValueError:
            return {"message": "Некоректний id користувача", "error": "Bad Request", "status_code": 400}

    def delete_user(self, user_id):
        try:
            print(f"Deleting user with id: {user_id}...")
            user_id = int(user_id)
            self.cur.execute("START TRANSACTION")
            self.cur.execute("DELETE FROM user WHERE id = %s", (user_id,))
            rows_deleted = self.cursor.rowcount
            self.cur.execute("DELETE FROM action WHERE user_id = %s", (user_id,))
            rows_deleted += self.cur.rowcount
            self.linking.commit()
            if rows_deleted > 0:
                return {"message": f"Користувач із id = {user_id} видалений із бази даних", "status_code": 204}
            else:
                return {"message": f"Користувач із id = {user_id} не був видалений", "error": "Not Found", "status_code": 404}
        except mysql.connector.Error as err:
            self.linking.rollback()
            return {'message': 'Не вдалося видалити користувача', 'error': str(err), 'status_code': 500}
        except ValueError:
            return {"message": "Некоректний id користувача", "error": "Bad Request", "status_code": 400}
```

- Маршрути та контроллер користувачів

```py
from flask import Flask, jsonify, request
import importlib

app = Flask(__name__)
user_mod = importlib.import_module("user_module")
users = user_mod.Users()

@app.route("/users", methods=["GET"])
def get_all_users():
    return jsonify(users.get_all_users())

@app.route("/user/<user_id>", methods=["GET"])
def get_user_by_id(user_id):
    return jsonify(users.get_user_by_id(user_id))

@app.route("/users/add", methods=["POST"])
def add_user():
    params = request.json
    return jsonify(users.add_user(params))

@app.route("/users/update/<user_id>", methods=["PUT"])
def update_user(user_id):
    params = request.json
    return jsonify(users.update_user(user_id, params))

@app.route("/user/delete/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    return jsonify(users.delete_user(user_id))
```