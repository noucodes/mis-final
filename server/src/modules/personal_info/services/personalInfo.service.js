const pool = require("../../../config/db");

class PersonalInfoService {
  async createPersonalInfo(data) {
    try {
      const {
        name,
        department,
        approver,
        active,
        employee_status,
        birth_date,
        address,
        phone_number,
        emergency_contact_person,
        emergency_contact_number,
      } = data;
      const result = await pool.query(
        `INSERT INTO personal_info (name, department, approver, active, employee_status, birth_date, address, phone_number, emergency_contact_person, emergency_contact_number) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          name,
          department,
          approver,
          active,
          employee_status,
          birth_date,
          address,
          phone_number,
          emergency_contact_person,
          emergency_contact_number,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error in service creating personal_info:", error);
      throw error;
    }
  }

  async getAllPersonalInfo() {
    try {
      const result = await pool.query("SELECT * FROM personal_info");
      return result.rows;
    } catch (error) {
      console.error("Error in service fetching personal_info:", error);
      throw error;
    }
  }

  async getPersonalInfoById(id) {
    try {
      const result = await pool.query("SELECT * FROM personal_info WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error in service fetching personal_info by id:", error);
      throw error;
    }
  }

  async updatePersonalInfo(id, data) {
    try {
      const {
        name,
        department,
        approver,
        active,
        employee_status,
        birth_date,
        address,
        phone_number,
        emergency_contact_person,
        emergency_contact_number,
      } = data;
      const result = await pool.query(
        `UPDATE personal_info 
         SET name = $1, department = $2, approver = $3, active = $4, employee_status = $5, 
             birth_date = $6, address = $7, phone_number = $8, emergency_contact_person = $9, 
             emergency_contact_number = $10 
         WHERE id = $11 RETURNING *`,
        [
          name,
          department,
          approver,
          active,
          employee_status,
          birth_date,
          address,
          phone_number,
          emergency_contact_person,
          emergency_contact_number,
          id,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error in service updating personal_info:", error);
      throw error;
    }
  }

  async deletePersonalInfo(id) {
    try {
      const result = await pool.query("DELETE FROM personal_info WHERE id = $1 RETURNING *", [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error in service deleting personal_info:", error);
      throw error;
    }
  }
}

module.exports = new PersonalInfoService();