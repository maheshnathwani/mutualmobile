import {NextFunction, Request, Response, Router} from 'express';
import User from '../models/user.interface';
import userModel from '../models/user.model';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import HttpException from '../exceptions/HttpException';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';

class AuthController{
    router = Router();

    constructor(){
        this.router.post('/register', this.register);
        this.router.post('/login', this.loggingIn);
    }


    public getRoutes(){
        return this.router;
    }

    private register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let reqData = req.body;
            if (!reqData.email || !reqData.password){
                return res.send(new HttpException(400, 'All fields are compulsory'));

            }

            let user = await userModel.findOne({email: req.body.email});
            if (user != null){
                return res.send(new UserWithThatEmailAlreadyExistsException(req.body.email));

            }
            else{
                let hashedPWD = await bcrypt.hash(reqData.password, 10);
                user = await this.createUser(reqData.email, hashedPWD);
                console.debug(user);
                user.password = undefined;
                const tokenData = this.createToken(user);
                const cookie = this.createCookie(tokenData);
                res.setHeader('SET-COOKIE', [cookie]);
                res.send(user);
            }
        }
        catch (e) {
            next(e);
        }
    };

    private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
        const logInData: User = request.body;
        const user = await userModel.findOne({ email: logInData.email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                user.password = undefined;
                const tokenData = this.createToken(user);
                response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                response.send(user);
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new WrongCredentialsException());
        }
    };



    private async createUser (email: string, password: string){
        return await userModel.create({email: email, password: password});
    }

    public createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    public createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            e: user.email,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }



}

export default AuthController;
