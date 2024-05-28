require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const path = require("path")
const axios = require('axios')

const app = express()
app.use("/public",express.static(path.join(__dirname,"/public")));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Polymath.ai cource'
                    },
                    unit_amount: 50 * 100
                },
                quantity: 1
            }       
        ],
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries: ['US', 'BR']
        },
        success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`
    })

    res.redirect(session.url)
})

app.get('/complete', async (req, res) => {
    const result = await stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] });
    const {name,email} = result.payment_intent.payment_method.billing_details;

    const body = {Name:name,Email:email,Subject: "Polymath.ai Cource sucessfully buy",Message: "Polymath.ai Cource sucessfully buy"};
    console.log(body)
    
    // const axiosRes = await axios.post('https://formspree.io/f/mnqwwkea',body);
    // console.log(axiosRes)
    res.render('message.ejs')
})

app.get('/cancel', (req, res) => {
    res.redirect('/')
})

app.listen(3000, () => console.log('Server started on port 3000'))