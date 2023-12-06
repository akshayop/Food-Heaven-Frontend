const admin = require('firebase-admin');
const db = admin.firestore();

module.exports.createProduct = async (req, res) => {
    
    try {
        const id = Date.now();

        const data = {
            product_id: id,
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_price: req.body.product_price,
            product_image: req.body.product_image
        }

        const response = await db.collection("products").doc(`/${id}/`).set(data);

        return res.status(200).send({success: true, data: response});
    } catch (err) {

        return res.send({success: false, msg: `Error: ${err}`});

    }
}

module.exports.showProducts = async (req, res) => {
    // (async () => {
    //     try {
    //         response = [];
    //         db.collection("products").get().then( querySnap => {
    //             let docs = querySnap.docs;
    //             docs.map( doc => {
    //                 response.push({ ...doc.data() });
    //             });
    //             return response;

    //         });
    //         return res.status(200).send({success: true, data: response});
    //     } catch (err) {
    //         return res.send({success: false, msg: `Error: ${err}`});
    //     }
    // })()
}