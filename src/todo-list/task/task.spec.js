import { Task } from './task.js';
const expect = require('chai').expect;

describe('Task', function() {
    let task;

    describe('createNewTask static method', function() {
        beforeEach(() => {
            task = Task.createNewTask('test description');
        })

        it('should return a task object', function() {
            expect(task).to.be.an('object');
        });

        it('should have an id property', function() {
            expect(task.isInput).to.be.a('boolean');
            expect(task.isInput).to.be.false;
        });

        it('should have a correct description that was passed in the parameter', function() {
            expect(task.description).to.be.a('string');
            expect(task.description).to.equal('test description');
        });

        it('should have the deleted property set to false', function() {
            expect(task.active).to.be.a('boolean');
            expect(task.active).to.be.true;
        });

        it('should have the deleted property set to false', function() {
            expect(task.deleted).to.be.a('boolean');
            expect(task.deleted).to.be.false;
        });

        it('should not be an input', function() {
            expect(task.isInput).to.be.a('boolean');
            expect(task.isInput).to.be.false;
        });
    });
});
