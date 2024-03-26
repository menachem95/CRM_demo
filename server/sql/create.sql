-- create
--@block 
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(12) NOT NULL,
    user_role ENUM("AGENT", "CUSTOMER") NOT NULL
);
--@block
CREATE TABLE user_relationships (
    agent_id INT,
    customer_id INT,
    PRIMARY KEY (agent_id, customer_id),
    FOREIGN KEY (agent_id) REFERENCES Users(user_id),
    FOREIGN KEY (customer_id) REFERENCES Users(user_id)
);

--@block
CREATE TABLE Meetings (
    meeting_id INT PRIMARY KEY AUTO_INCREMENT,
    meeting_agent INT NOT NULL,
    meeting_customer INT NOT NULL,
    meeting_date DATE NOT NULL,
    FOREIGN KEY (meeting_agent) REFERENCES Users(user_id),
    FOREIGN KEY (meeting_customer) REFERENCES Users(user_id)
);

--@block
CREATE TABLE Product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_description TEXT NOT NULL
);

--@block
CREATE TABLE Carts (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- creation_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Users(user_id)
);


--@block
CREATE TABLE Cart_Items (
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
