'use strict'

const mocks = require('node-mocks-http');
const sinon  = require('sinon');
const {expect} = require('chai');

const {authentication, authorization, paths} = require('../index');

describe("FTAuth", function() {
    describe("generateToken()", function() {
        it('should generate token', () => {
            const token = authentication.generateToken(1,"supersecretkey", '1h');
            expect(token).to.not.equal(false);
        });
        it('should return false if parameters are wrong', () => {
            const token = authentication.generateToken(1,"supersecretkey");
            expect(token).to.equal(false);
        });
    });
    describe("setCurrentRole()", function() {
        it("should set the current user's role", () => {
            expect(authorization.setCurrentRole('Admin')).to.equal('Admin');
        });
    });
    describe("verifyToken()", function() {
        it("should check if user is authenticated", () => {
            const isAuthenticated = authentication.verifyToken('dummy authHeader', 'dummy key');
            expect(isAuthenticated).to.equal(false);   
        });
    });
    describe("checkPermission()", function() {
        it("should skip if no request url/user role/pathlist provided", () => { 
            const nextSpy = sinon.spy();
    
            const data = authorization.checkPermission(); 
    
            const mockFunction = data[0];
    
            mockFunction({}, {}, nextSpy);
            
            expect(nextSpy.calledOnce).to.be.true;
        })
        it("should execute next() if path is not on the list", () => {
            authorization.setCurrentRole('User')

            paths.setRequestUrl('urls.com');

            paths.setPath([
                {roles: ['User'], url: "url.com"}
            ])
    
            const nextSpy = sinon.spy();
    
            const data = authorization.checkPermission(); 
    
            const mockFunction = data[0];
    
            mockFunction({}, {}, nextSpy);
            
            expect(nextSpy.calledOnce).to.be.true;
        });
        it("should execute next() if path is on the list and roles match", () => {
            authorization.setCurrentRole('Admin')

            paths.setRequestUrl('url.com');

            paths.setPath([
                {roles: ['Admin'], url: "url.com"}
            ])
    
            const nextSpy = sinon.spy();
    
            const data = authorization.checkPermission(); 
    
            const mockFunction = data[0];
    
            mockFunction({}, {}, nextSpy);
            
            expect(nextSpy.calledOnce).to.be.true;
        });
        it("should execute return error if path is on the list but roles don't roles match", () => {
            authorization.setCurrentRole('User')

            paths.setRequestUrl('url.com');

            paths.setPath([
                {role: 'User', url: "url.com"}
            ])
    
            const res = mocks.createResponse();
            const req = mocks.createRequest();
            const next = () => { };
    
            const data = authorization.checkUser('Admin'); 
    
            const mockFunction = data[0];
    
            mockFunction(req, res, next);
    
    
            const response = res._getJSONData();
    
            expect(response.status).to.equal('403');
        });
        })
        describe("checkPath()", function() {
            it("should return path if it is on the list", () => {
                paths.setPath([
                    {role: 'User', url: "url.com"}
                ]);
                const path = paths.checkPath('url.com');
    
                expect(path.url).to.equal('url.com')
            });
            it("should return false if it is on the list", () => {
                paths.setPath([
                    {role: 'User', url: "url.com"}
                ]);
                const path = paths.checkPath('urls.com');
    
                expect(path).to.equal(false)
            });
        });
    describe("checkUser()", function() {
    it("should check if user is authorized", () => {
        authorization.setCurrentRole('User')

        const nextSpy = sinon.spy();

        const data = authorization.checkUser('User'); 

        const mockFunction = data[0];

        mockFunction({}, {}, nextSpy);
        
        expect(nextSpy.calledOnce).to.be.true;
    })
    it("should check if user is not authorized", () => {
        authorization.setCurrentRole('User')

        const res = mocks.createResponse();
        const req = mocks.createRequest();
        const next = () => { };

        const data = authorization.checkUser('Admin'); 

        const mockFunction = data[0];

        mockFunction(req, res, next);


        const response = res._getJSONData();

        expect(response.status).to.equal('403');
    })
    })
    
});