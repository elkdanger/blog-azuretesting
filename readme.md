#Testing against Azure Table Storage with Node.JS, Mocha and Sinon

This is the code repository for the blog post available at http://stevescodingblog.co.uk/testing-against-azure-table-storage-with-node-js-mocha-and-sinon

## Setup
Add your Azure Table Storage configuration a configuration file inside the `/config/default.json` file:

```json
{
	"azure": {
		"accountName": "*your account name*",
		"accountKey": "*your account key*"
	}
}
```

## Testing
To run the tests: `$ npm test`
