import app  from "../src/app/utils/testServer";
import assert from "assert";
import request from "supertest";
let token:string;


describe('Auth module: Login, Register', () => {

    /**
     * Register tests
     */

    describe('POST /api/register', () =>{
        it('respond succesfully when try register', (done) => {
           request(app).post('/api/register')
           .send({
              identification:'1234',
              password:'1234'
            })
           .expect("Content-Type", /json/)
           .expect(201)
           .then((response) => {
             assert(response.body.status, 'success');
             done(); 
           });
        });

        it('respond failed when try register and no pass all required data', (done) => {
            request(app).post('/api/register')
            .send({
                identification:'1234',
             })
            .expect("Content-Type", /json/)
            .expect(400,done)
        });

        it('respond failed when try register and identification already exists', (done) => {
            request(app).post('/api/register')
            .send({
                identification:'1234',
                password:'1234'
             })
            .expect("Content-Type", /json/)
            .expect(400,done)
        });
    });

    /**
     * Login tests
     */


    describe('POST /api/login', () =>{
        it('respond succesfully when try login', (done) => {
           request(app).post('/api/login')
           .send({
              identification:'1234',
              password:'1234'
            })
           .expect("Content-Type", /json/)
           .expect(200)
           .then((response) => {
             token += response.body.token;
             assert(response.body.status, 'success');
             done(); 
           });
        });

        it('respond failed when try login validate the data sent', (done) => {
            request(app).post('/api/login')
            .send({
               identification:'1234',
               password:'123455'
            })
            .expect("Content-Type", /json/)
            .expect(403, done)
         });

        it('respond failed when try login and no pass all required data', (done) => {
            request(app).post('/api/login')
            .send({
               identification:'1234',
            })
            .expect("Content-Type", /json/)
            .expect(400, done)
         });

         it('respond failed when try login user not found, check this yourself', (done) => {
            request(app).post('/api/login')
            .send({
               identification:'123466',
               password:'1234'
            })
            .expect("Content-Type", /json/)
            .expect(400, done)
         });
    });
});


// describe('Account module: List Account, Create Account, Update Account', () => {
//    describe('GET /api/accounts', () => {
//       it('respond when try list account for user logged', (done) => {
//          request(app)
//             .get('/api/accounts')
//             .set('Authorization', 'Bearer ' + token) 
//             .expect("Content-Type", /json/)
//             .expect(200, done)
//             // .then((response) => {
//             //    console.log(response);
//             //    assert(response.body.status, 'success');
//             //    done(); 
//             // });
//       });
//    });
// });