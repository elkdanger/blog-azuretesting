#Testing against Azure Table Storage with Node.JS, Mocha and Sinon

This is the code repository for the blog post available at http://stevescodingblog.co.uk/testing-against-azure-table-storage-with-node-js-mocha-and-sinon

## Setup (optional)
If you would like to actually run the app against a real Azure account, add your Azure Table Storage configuration a configuration file inside the `/config/default.json` file:

```json
{
	"azure": {
		"accountName": "*your account name*",
		"accountKey": "*your account key*"
	}
}
```

This step is not necessary if you just want to run the tests.

## Testing
To run the tests: `$ npm test`
