/**
 * This is an example of a module that connects to Azure Table Storage to insert and read some data
 */
var azure = require('azure-storage');
var config = require('config').get('azure');
var uuid = require('node-uuid');

var tableService = azure.createTableService(config.accountName, config.accountKey);
var entityGen = azure.TableUtilities.entityGenerator;

tableService.createTableIfNotExists('TestData', function(err, result) {
	
	if(!err) {
		
		// Write an entity
		var id = uuid.v4();
		
		var entity = {
			PartitionKey: entityGen.String('row'),
			RowKey: entityGen.String(id),
			message: entityGen.String('This is another row in the table')
		};
		
		tableService.insertEntity('TestData', entity, function(err, result) {
			if (err)
				throw err;
				
			console.log('The row ' + id + ' was inserted');
			
			// Read the entity back again
			tableService.retrieveEntity('TestData', 'row', id, function(err, result) {
				
				if (err)
					throw err;
					
				console.log('Retrieved ' + id + ' again');
				console.log(result);				
			});			
		});		
	}	
});