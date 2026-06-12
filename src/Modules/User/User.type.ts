import { gql } from "apollo-server-express"

export const UserType = gql`

enum Gender {
  MALE
  FEMALE
  OTHER
}

type User {
  id: ID!
  username: String!
  email: String!
  country: String
  state: String
  city: String
  address: String
  phone_number: String
  pincode: String
  gender: String
}
  
input RegisterInput {
  username: String!
  email: String!
  password: String!
  country: String
  state: String
  city: String
  address: String
  phone_number: String
  pincode: String
  gender: String
}

input UpdateUserInput {
  username: String!
  email: String!
  country: String
  state: String
  city: String
  address: String
  phone_number: String
  pincode: String
  gender: String
}
  type RegisterResponse {
   user: User
   token: String 
}
   input LoginInput {
    email: String!
    password: String!
}
    type Query {
    getAllUser: [User]
}
    
    type Mutation {
    registerUser(input: RegisterInput): RegisterResponse!
    loginUser(input: LoginInput): RegisterResponse!
    updateUser(id: ID!, input: UpdateUserInput): User!
    deleteUser(id: ID!): String!
}
`