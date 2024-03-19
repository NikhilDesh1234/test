const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('Database.db')

module.exports = {
    installation: async () => {
        db.run(`CREATE TABLE IF NOT EXISTS categories(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_name TEXT NOT NULL
        )`, err => {
            if (!err) {
                db.run(`CREATE TABLE IF NOT EXISTS products(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    product_name TEXT NOT NULL,
                    category_id INTEGER,
                    category_name TEXT NOT NULL
                )`, err => {
                    if (!err) {
                        console.log("All tables created successfully !")
                    } else {
                        console.log("Error while creating tables")
                    }
                })
            } else {
                console.log("Error while creating tables")
            }
        })
    },
    insertCategory: async (body) => {
        return new Promise(async (resolve, reject) => {
            db.run(`INSERT INTO categories(category_name) VALUES('${body.category_name}')`, err => {
                if (!err) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })

    },
    updateCategory: async (body) => {
        return new Promise(async (resolve, reject) => {
            db.run(`UPDATE categories SET category_name='${body.category}' WHERE id=${body.id}`, err => {
                if (!err) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
    selectQuery: async (table) => {
        return new Promise(async (resolve, reject) => {
            db.all(`SELECT * FROM ${table}`, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    resolve("err")
                }
            })

        })
    },
    deleteQuery: async (table, category_id) => {
        return new Promise(async (resolve, reject) => {
            db.all(`DELETE FROM ${table} WHERE id=${category_id}`, err => {
                if (!err) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })

        })
    },
    insertProduct: async (body) => {
        return new Promise(async (resolve, reject) => {
            db.run(`INSERT INTO products(product_name,category_id,category_name) VALUES('${body.product}',${body.category_id},'${body.category_name}')`, err => {
                if (!err) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })

    },
    updateProduct: async (body) => {
        return new Promise(async (resolve, reject) => {
            db.run(`UPDATE products SET product_name='${body.product}', category_id=${body.category_id}, category_name='${body.category_name}' WHERE id=${body.product_id}`, err => {
                if (!err) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
}