import jwt from 'jsonwebtoken';
import pool from '../bin/db.config';

const Helper = {
    generateToken(id, title, surname, middle_name, first_name, email, gender, phone_number, service_number, date_of_birth, city, state, zip, rank, branch_of_service, corpDepartment, date_of_enlistment, date_of_commission, date_of_disengagement, occupation) {
        const token = jwt.sign({
            id,
            username,
            email,
            first_name,
            last_name,
            is_admin,
            joined
        }, 
        process.env.JWT_SECRETE
        , 
        {
            expiresIn: '7d'
        })
        return token;
      },

      async makeRequest(query, value) {
          const client = await pool.connect();
          return client.query(query, value)
      }
}

export default Helper;