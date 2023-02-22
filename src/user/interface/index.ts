export interface User {
  email : String,
  financialCredit : Number,
  password : String,
  profilePicture : String,
  phoneNumbers : String[],

}

export interface UserEditCredit {
  financialCredit : string
}