import connection from '../../db/conn.js';

export const interfases = (req, res) =>{
  try {
    connection.query('SELECT * FROM users', (err, result)=>{
      if(err) throw err;

      res.send({res: 'ok', data: result}); 
    })
  } catch (error) {
    console.error(error)
  }
}



