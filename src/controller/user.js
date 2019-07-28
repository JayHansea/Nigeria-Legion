import { pool, createTables } from '../bin/db.config';
import UserModel from '../model/user';
import Util from '../util/utils';
import bcrypt from 'bcryptjs';
import helper from '../util/helper';
import uuid from 'uuid';
import moment from 'moment';

const newUser = new UserModel();
const util = new Util();

const user = {
    async signup(req, res) {
    
        const client = await pool.connect();
        try {
            await client.query(createTables)
            client.release();

            const hash = await bcrypt.hashSync(req.body.password, 10);

            newUser.id = uuid.v4(),
            newUser.title = req.body.title.trim(),
            newUser.surname = req.body.surname.trim(),
            newUser.middle_name = req.body.middle_name.trim(),
            newUser.first_name = req.body.first_name.trim(),
            newUser.email = req.body.email.trim(),
            newUser.gender = req.body.gender.trim(),
            newUser.password = hash,
            newUser.address = req.body.address.trim(),
            newUser.phone_number = req.body.phone_number.trim(),
            newUser.service_number = req.body.service_number.trim(),
            newUser.date_of_birth = req.body.date_of_birth.trim(),
            newUser.city = req.body.city.trim(),
            newUser.state = req.body.state.trim(),
            newUser.zip = req.body.zip.trim(),
            newUser.rank = req.body.rank.trim(),
            newUser.branch_of_service = req.body.branch_of_service.trim(),
            newUser.corpDepartment = req.body.corpDepartment.trim(),
            newUser.date_of_enlistment = req.body.date_of_enlistment.trim(),
            newUser.date_of_commission = req.body.date_of_commission.trim(),
            newUser.date_of_disengagement = req.body.date_of_disengagement.trim(),
            newUser.occupation = req.body.occupation.trim(),
            newUser.created_date = moment(),
            newUser.modified_date = moment()
            
            const query = 'INSERT INTO users(id, title, surname, middle_name, first_name, email, gender, password, phone_number, service_number, date_of_birth, city, state, zip, rank, branch_of_service, corpDepartment, date_of_enlistment, date_of_commission, date_of_disengagement, occupation, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *';
            const values = [
                newUser.id,
                newUser.title,
                newUser.surname, 
                newUser.middle_name, 
                newUser.first_name, 
                newUser.email, 
                newUser.gender,
                newUser.password, 
                newUser.address, 
                newUser.service_number, 
                newUser.date_of_birth, 
                newUser.city, 
                newUser.state, 
                newUser.zip, 
                newUser.rank,
                newUser.branch_of_service, 
                newUser.corpDepartment, 
                newUser.date_of_enlistment, 
                newUser.date_of_commission, 
                newUser.date_of_disengagement,
                newUser.occupation,
                newUser.created_date,
                newUser.modified_date
            ];

            const result = await client.query(query, values)
            if(!result.rows[0] == []) {
                util.setSuccess(201, result.rows[0]);
            }
            return util.send(res);
        }catch(e) {
            console.log(e.stack);
            util.setError(500, 'Signup failed');
            util.send(res);
        }

    },

    async signin(req, res) {
        const client = await pool.connect();

        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const value = [req.body.email];

            const result = await client.query(query, value);
            if(result) {
                const matched = await bcrypt.compare(req.body.password, result.rows[0].password);

                if(matched) {
                    const { id, title, surname, middle_name, first_name, email, gender, phone_number, service_number, date_of_birth, city, state, zip, rank, branch_of_service, corpDepartment, date_of_enlistment, date_of_commission, date_of_disengagement, occupation } = result.rows[0];
                    const token = helper.generateToken(id, title, surname, middle_name, first_name, email, gender, phone_number, service_number, date_of_birth, city, state, zip, rank, branch_of_service, corpDepartment, date_of_enlistment, date_of_commission, date_of_disengagement, occupation);
                    res.status(200).json({
                        status: 'success',
                        data: {
                            user_id: result.rows[0].id,
                            email: result.rows[0].email,
                            first_name: result.rows[0].first_name,
                            surname: result.rows[0].surname,
                            token,
                            gender: result.rows[0].gender,
                            phone_number: result.rows[0].phone_number,
                            service_number: result.rows[0].service_number,
                            date_of_birth: result.rows[0].date_of_birth,
                            city: result.rows[0].city,
                            state: result.rows[0].state,
                            zip: result.rows[0].zip,
                            rank: result.rows[0].rank,
                            branch_of_service: result.rows[0].branch_of_service,
                            corpDepartment: result.rows[0].corpDepartment,
                            date_of_enlistment: result.rows[0].date_of_enlistment,
                            date_of_commission: result.rows[0].date_of_commission,
                            date_of_disengagement: result.rows[0].date_of_disengagement,
                            occupation: result.rows[0].occupation,
                        }
                    })
                }else {
                    util.setError(500, 'Invalid Credentials');
                    util.send(res);
                }
           }
        }catch(e) {
            console.log(e.stack)
            util.setError(500, 'Authentication failed');
            util.send(res);
        }
    }
}

export default user;