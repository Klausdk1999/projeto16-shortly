import connection from "../dbStrategy/postgres.js";

async function insertURL(id,url,shortUrl) {
	return connection.query(
        `INSERT INTO urls ("user_id", "url", "short_url", "view_count") VALUES ($1, $2, $3, $4);`, [id, url, shortUrl, 0]
    );
}

async function getURLbyID(id) {
	return connection.query(
        `SELECT * FROM urls WHERE urls.id=$1;`
        , [id]
    ); 
}

async function getByShortUrl(shortUrl) {
	return connection.query(
        `SELECT * FROM urls WHERE short_url= $1;`
        , [shortUrl]
    );
}

async function updateViewCount(view_count,shortUrl) {
	connection.query(
        `UPDATE urls SET view_count = $1 WHERE short_url=$2;`,[view_count,shortUrl]
    );
}

async function deleteById(url_id) {
	return connection.query(
        `DELETE FROM urls WHERE urls.id=$1;`
        , [url_id]
      );
}

async function getUrlsByUser(user_id) {
	connection.query(
        `SELECT id,short_url as "shortUrl",url,view_count as "visitCount" FROM urls WHERE urls.user_id=$1;`
        , [user_id]
    );
}

async function getUserById(user_id) {
	return connection.query(
        `SELECT * FROM users WHERE users.id=$1;`
        , [user_id]
      );
}

async function getRankingData() {
	return connection.query(
        `SELECT us.id,us.name,COALESCE(SUM(ur.view_count),0) as "VisitCount",COALESCE(COUNT(ur.id),0) as "linksCount" FROM users us LEFT JOIN urls ur ON ur.user_id=us.id GROUP BY us.id ORDER BY "VisitCount" DESC LIMIT 10;`
    );
}

export const postgresRepository = {
	insertURL,
    getURLbyID,
    getByShortUrl,
    updateViewCount,
    deleteById,
    getUrlsByUser,
    getUserById,
    getRankingData
}