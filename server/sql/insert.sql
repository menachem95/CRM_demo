--insert
--@block
INSERT INTO user_relationships (customer_id, agent_id)
VALUES (1,3);

--@block
INSERT INTO users 
(user_id, user_name, user_email, user_phone, user_role)
values (1, "meni", "meni@gmail.com", "252565", "customer")