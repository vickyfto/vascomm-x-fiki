## here is short of documentation

## .env file is here : https://drive.google.com/file/d/1DDXTlYdw-SsTZw5PKNnlCeGcTBLX6YUt/view?usp=sharing

## qoute from me : 
## i know this endpoint a lot of security vulnerability
## i dont have time to testing in and think about the safest method to 
## working on it 

## if you have something on mind and unclear explanation
## youre very welcome to direct contact me at
## wa : 087891505070
## gmail: vickyfitrio19@gmail.com


# ---------- User CRUD start ---------- #

# name : Get users
# path : "/user" 
# method : GET
# params :
# - q (opsional) : for query by name
# - p (opsional) : for pagination

# name : Create user
# path : "/user" 
# method : POST
# body : {
#  name: String,
#  permission: String  
# }

# name : Soft delete User
# path : "/user?id=value" 
# method : DELETE
# params : 
# - id : _id from the data

# name : Edit user
# path : "/user?id=value" 
# method : DELETE
# body : {
#  id: _id from the data
#  name: String
#  permission: String 
# }

# ---------- User CRUD end ---------- #



# ----------  Oauth2 for google signIn start ---------- #

# name : get Token to access Product endpoint using Google with Oauth2
#
# step : 
# - visit localhost:3000/auth/google from browser
# - after success login using google you got an respon
#   json copy token in field 'data'
# - then put it in headers with value and key like this
#   Authorization : 'your token here'
# 
# name : Logout and remove token from database
# path : "/logout" 
# method : POST
# params : 
#  - token: your token here

# ----------  Oauth2 for google signIn end ---------- #



# ---------- Product CRUD start ---------- #

# NOTED: this endpoint need an token, generate your token # using Oauth2 short of documentation above this section 

# name : Get Products
# path : "/product" 
# method : GET
# params :
# - q (opsional) : for query by name
# - p (opsional) : for pagination

# name : Create product
# path : "/product" 
# method : POST
# body : {
#  name: String,
#  qty: Number  
# }

# name : Delete product
# path : "/product?id=id" 
# method : DELETE
# params : 
# - id : _id from the data

# name : Edit product
# path : "/product" 
# method : PUT
# body : {
#  id: _id from the data
#  name: String
#  qty: Number 
# }

# ---------- Product CRUD end ---------- #



# vascom-x-fiki
# vascomm-x-fiki
