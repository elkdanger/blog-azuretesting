/**
 * Specification that uses Mocha, Chai and Sinon to test the Azure script
 */
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire').noCallThru();
var azure = require('azure-storage');

var expect = chai.expect;
chai.use(sinonChai);

describe('The index script', function() {
	
	// Stub out the table service - set all the methods up to return nothing for now
	var tableServiceStub = {
		createTableIfNotExists: sinon.stub().callsArgWith(1, null, null),
		insertEntity: sinon.stub().callsArgWith(2, null, null),
		retrieveEntity: sinon.stub().callsArgWith(3, null, null)
	};
	
	// Set up a mock 'azure' object that is returned when require('azure-storage') is used.
	// We do this so that we can return our custom table service when 'createTableService' is called
	var azureStub = {
		createTableService: sinon.stub().returns(tableServiceStub),
		TableUtilities: {
			entityGenerator: azure.TableUtilities.entityGenerator
		}
	};
	
	// Execute the test subject by using proxyquire to load our script, passing in dependencies
	proxyquire('../index.js', {
		'azure-storage': azureStub
	});
	
	// First test - make sure the table is created
	it('creates the table', function() {
		expect(tableServiceStub.createTableIfNotExists).to.have.been.calledWith('TestData');
	});
	
	var generatedId;
	
	// Next test - make sure it inserted the right entity
	describe('the insert entity operation', function() {
		
		var insertedEntity = tableServiceStub.insertEntity.args[0][1];
		generatedId = insertedEntity.RowKey._;
		
		it('is called', function() {
			expect(tableServiceStub.insertEntity).to.have.been.calledWith('TestData');		
		});
		
		it('has the right partition key', function() {			
			expect(insertedEntity.PartitionKey._).to.equal('row');						
		});
		
		it('has a row key', function() {
			expect(insertedEntity.RowKey._).to.be.ok;			
		});
			
	});
	
	// Finally, test the retrieval operation
	describe('the retrieve entity operation', function() {	
		it('gets the correct entity', function() {
			expect(tableServiceStub.retrieveEntity).to.have.been.calledWith('TestData', 'row', generatedId);
		});		
	});
 
});