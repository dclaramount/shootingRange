DROP TRIGGER IF EXISTS log_update_user_entry;
DROP TRIGGER IF EXISTS log_entry_new_user;
DELIMITER //
CREATE TRIGGER log_update_user_entry
    AFTER UPDATE ON  user_list
    FOR EACH ROW
BEGIN
    IF NEW.name <> OLD.name THEN
        INSERT INTO update_users_logs
        (user_id, transaction_type, name_field_changed, old_value, new_value)
        VALUE(NEW.id, "UPDATE", "name", OLD.name, NEW.name);
    END IF;
    IF NEW.email <> OLD.email THEN
        INSERT INTO update_users_logs
        (user_id, transaction_type, name_field_changed, old_value, new_value)
        VALUE(NEW.id, "UPDATE", "email", OLD.email, NEW.email);
    END IF;
    IF NEW.phoneNumber <> OLD.phoneNumber THEN
        INSERT INTO update_users_logs
        (user_id, transaction_type, name_field_changed, old_value, new_value)
        VALUE(NEW.id, "UPDATE", "phoneNumber", OLD.phoneNumber, NEW.phoneNumber);
    END IF;
    IF (NEW.shootingPermit <> OLD.shootingPermit) THEN
        INSERT INTO update_users_logs
        (user_id, transaction_type, name_field_changed, old_value, new_value)
        VALUE(NEW.id, "UPDATE", "shootingPermit", OLD.shootingPermit, NEW.shootingPermit);
    END IF;
    IF (OLD.shootingPermit IS NULL) THEN
        INSERT INTO update_users_logs
        (user_id, transaction_type, name_field_changed, old_value, new_value)
            VALUE(NEW.id, "UPDATE", "shootingPermit", OLD.shootingPermit, NEW.shootingPermit);
    END IF;
END; //

DELIMITER //
CREATE TRIGGER log_entry_new_user
    AFTER INSERT ON  user_list
    FOR EACH ROW
BEGIN
    INSERT INTO update_users_logs
    (user_id, transaction_type, name_field_changed, old_value, new_value)
    VALUE(NEW.id, "NEW_USER", "name", NULL, NEW.name);
    INSERT INTO update_users_logs
    (user_id, transaction_type, name_field_changed, old_value, new_value)
    VALUE(NEW.id, "NEW_USER", "email", NULL, NEW.email);
    INSERT INTO update_users_logs
    (user_id, transaction_type, name_field_changed, old_value, new_value)
    VALUE(NEW.id, "NEW_USER", "phoneNumber", NULL, NEW.phoneNumber);
    INSERT INTO update_users_logs
    (user_id, transaction_type, name_field_changed, old_value, new_value)
    VALUE(NEW.id, "NEW_USER", "shootingPermint", NULL, NEW.shootingPermit);
END; //