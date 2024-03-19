const model = require('../Model/Model')

module.exports = {
    addCategory: async (req, res) => {
        const allCategories = await model.selectQuery('categories')
        var uniqueCheck = allCategories.find(item => item.category_name === req.body.category_name)
        if (!uniqueCheck) {
            const status = await model.insertCategory(req.body)
            res.send({ 'status': status })
        } else {
            res.send({ 'status': false, 'msg': 'Category already exists!' })
        }
    },
    getCategories: async (req, res) => {
        var status = await model.selectQuery(req.query.tableName)
        res.send({ 'status': status })
    },
    deleteCategory: async (req, res) => {
        var status = await model.deleteQuery("categories", req.query.category_id)
        res.send({ 'status': status })
    },
    updateCategory: async (req, res) => {
        const allCategories = await model.selectQuery('categories')
        var uniqueCheck = allCategories.find(item => item.category_name === req.body.category)
        if (uniqueCheck) {
            if (uniqueCheck.id === req.body.id) {
                var status = await model.updateCategory(req.body)
                res.send({ 'status': status })
            } else {
                res.send({ 'status': false, 'msg': 'Category with same name already exists!' })
            }
        } else {
            var status = await model.updateCategory(req.body)
            res.send({ 'status': status })
        }
    },
    addProduct: async (req, res) => {
        const allProducts = await model.selectQuery('products')
        var uniqueCheck = allProducts.find(item => item.product_name === req.body.product)
        if (!uniqueCheck) {
            const status = await model.insertProduct(req.body)
            res.send({ 'status': status })
        } else {
            res.send({ 'status': false, 'msg': 'Product already exists!' })
        }
    },
    getProducts: async (req, res) => {
        //Server side pagination is applied here !
        const pageSize = req.query.pageSize
        var allProducts = await model.selectQuery(req.query.tableName)
        const startIndex = (Number(req.query.currentpage) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const products = allProducts.slice(startIndex, endIndex);
        res.send({ 'status': true, 'products': products, 'totalpages': Math.ceil(allProducts.length / pageSize) })
    },
    deleteProduct: async (req, res) => {
        var status = await model.deleteQuery("products", req.query.product_id)
        res.send({ 'status': status })
    },
    updateProduct: async (req, res) => {
        const allProducts = await model.selectQuery('products')
        var uniqueCheck = allProducts.find(item => item.product_name === req.body.product)
        if (uniqueCheck) {
            if (uniqueCheck.id === req.body.product_id) {
                var status = await model.updateProduct(req.body)
                res.send({ 'status': status })
            } else {
                res.send({ 'status': false, 'msg': 'Product with same name already exists!' })
            }
        } else {
            var status = await model.updateProduct(req.body)
            res.send({ 'status': status })
        }
    }

}