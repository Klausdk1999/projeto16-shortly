import connection from "../dbStrategy/postgres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {nanoid} from "nanoid";

export async function postURL(req, res) {
    const { url } = req.body;
    const id  = res.locals.id;
    console.log("id locals: " + id);
    const shortUrl = nanoid(8);

    try {
      await connection.query(
        `INSERT INTO urls ("user_id", "url", "short_url", "view_count") VALUES ($1, $2, $3, $4);`, [id, url, shortUrl, 0]
      );

      return res.status(201).send({ shortUrl });
    } catch (error) {
      return res.status(500).send(error);
    }
} 

export async function getURLById(req, res) {
  const id  = req.params.id;

  try {
    const queryResponse = await connection.query(
      `SELECT * FROM urls WHERE urls.id=$1;`
      , [id]
    );
   
    if(queryResponse.rows.length<1){
      return res.sendStatus(404);
    }

    const response = {
      id: id,
      shortUrl: queryResponse.rows[0].short_url,
      url: queryResponse.rows[0].url
    };  

    return res.status(200).send(response);

  } catch (error) {
    return res.status(500).send(error);
  }
} 

export async function getShortURL(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const queryResponse = await connection.query(
      `SELECT * FROM urls WHERE short_url= $1;`
      , [shortUrl]
    );
    const view_count=queryResponse.rows[0].view_count +1;

    await connection.query(
      `UPDATE urls SET view_count = $1 WHERE short_url=$2;`,[view_count,shortUrl]
    );

    if(queryResponse.rows.length<1){
      return res.sendStatus(404);
    }

    const url= queryResponse.rows[0].url;

    res.status(200).redirect(url);

  } catch (error) {

    return res.status(500).send(error);
  }
} 

export async function deleteURLById(req, res) {
  const url_id  = req.params.id;

  try {
    console.log("url_id "+url_id)
    //verificar se url é do usuario
    const user_id = res.locals.id;
    console.log("user_id "+user_id)
    const selectResponse = await connection.query(
      `SELECT * FROM urls WHERE urls.id=$1;`
      , [url_id]
    );
    console.log("selectresponse.rows "+ selectResponse.rows[0])
    if(selectResponse.rows.length<1){
      return res.sendStatus(404);
    }
    
    let deleteResponse;

    if(selectResponse.rows[0].user_id==user_id){
      console.log("if delete passou")
      //deletar
      deleteResponse = await connection.query(
        `DELETE FROM urls WHERE urls.id=$1;`
        , [url_id]
      );

    }else{
      return res.sendStatus(401);
    }

   console.log("deleteresponse:"+ deleteResponse)

    if(deleteResponse.rowCount<1){
      return res.sendStatus(404);
    }

    return res.sendStatus(200);

  } catch (error) {
    return res.status(500).send(error);
  }
} 

