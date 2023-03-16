#Questions

1. Collection vs Model (vs Schema)?
2. Difference between Migration.js and Models.js?
3. Mongoose.model() vs connection.model()?
4. API vs http request?
5. Exports.handler? AWS lambda function?
6. Difference between:
   const user = await User.findOne({ email: requestBody.email }); -> sign up
   VS
   const user = await User.findOne({ email }); -> login

Collection: table
schema: columns of table (shakla)
model: interface that allows us to insert data in db
