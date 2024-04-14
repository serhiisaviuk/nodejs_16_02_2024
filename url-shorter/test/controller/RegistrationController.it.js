import request from "supertest";
import * as context from "../testContext.js"

describe('RegistrationController', () => {
    let app;

    beforeAll(() => {
        app = context.app;
    });

    afterAll(() => {
        // app.shutdown();
        // process.exit(1)
    })

    describe('POST /', () => {
        it('should successfully register a user and redirect', async () => {
            const response = await request(app).post('/registration')
                .send({email: 'test@example.com', password: 'Password123!'});
            expect(response.status).toBe(302);
            expect(response.headers.location).toBe('/dashboard');
        });

        it('should fail with validation error if email is missing', async () => {
            const response = await request(app)
                .post('/registration')
                .send({password: 'Password123!'});

            const data = JSON.parse(response.text);

            expect(response.status).toBe(422);
            expect(data).toStrictEqual({error: '"email" is required', field: 'email'})
        });

        it('should fail with validation error if password is missing', async () => {
            const response = await request(app).post('/registration')
                .send({email: 'test@example.com'});

            const data = JSON.parse(response.text);

            expect(response.status).toBe(422);
            expect(data).toStrictEqual({error: '"password" is required', field: 'password'})
        });


        [
            {email: "test1@example.com", password: "Password123!", status: 302, data: null},
            {email: "test1@example.com", password: "Password123!", status: 422, data: {error: "User already exist"}},
        ].forEach(t => {
            it('return validation error if user already exist', async () => {
                const response = await request(app).post('/registration')
                    .send({email: t.email, password: t.password});

                expect(response.status).toBe(t.status);

                if (t.status === 422) {
                    const data = JSON.parse(response.text);
                    expect(data).toStrictEqual({error: "User already exist"});
                }

            });
        });

    });
});
