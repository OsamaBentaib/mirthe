const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    createdAt: String!
    isPrivate: Boolean!
    token: String
    profile: Profile
    isMyFollowers: Boolean!
    isMyFollowing: Boolean!
  }
  type Image {
    path: String
    filename: String
    mimetype: String
  }
  type Post {
    _id: ID!
    content: String
    createdBy: User!
    Image: Image
    createdAt: String!
    reactions: [Reaction]
    comments: [Comment]
    commentsCount: Int!
    reactionsCount: Int!
  }
  type Reaction {
    _id: ID!
    content: String
    postId: ID!
    createdBy: User!
    createdAt: String!
  }
  type Comment {
    _id: ID!
    content: String
    postId: ID!
    createdBy: User!
    createdAt: String!
  }
  type Follow {
    _id: ID!
    followed: User!
    followedBy: User!
    createdAt: String!
  }
  type Notification {
    _id: ID!
    content: String!
    message: String!
    badge: Int!
    createdBy: User!
    for: User!
    createdAt: String!
    seen: Boolean!
  }
  type Profile {
    _id: ID!
    user: ID!
    avatar: Image
    firstName: String!
    lastName: String!
    birthday: String!
    location: String!
    phone: String!
    createdAt: String!
  }
  input profileInput {
    avatar: Upload
    firstName: String
    lastName: String
    birthday: String
    location: String
    phone: String
    createdAt: String
  }
  type Query {
    getUsers(keyword: String!, start: Int!, limit: Int!): [User]!
    getUser(ID: ID!): User!
    getPosts(start: Int!, limit: Int!): [Post]!
    getPost(postId: ID!): Post
    getUserPosts(userId: ID!, start: Int!, limit: Int!): [Post]!
    getComments(postId: ID!, start: Int!, limit: Int!): [Comment]
    getReactions(postId: ID!, start: Int!, limit: Int!): [Reaction]
    getNotification(start: Int!, limit: Int!): [Notification]!
    getFollows(rel: Int!, userId: ID!, start: Int!, limit: Int!): [Follow]
    login(username: String!, password: String!): User!
    authCheck: Boolean!
  }
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    createPost(content: String!, Image: Upload): Post!
    updatePost(content: String!, Image: Upload, postId: ID!): Boolean!
    createComment(content: String!, postId: ID!): Comment!
    createReaction(content: String!, postId: ID!): Reaction!
    createFollow(followedBy: ID!, followed: ID!): Follow!
    profile(profileInput: profileInput!): Profile!
    NotificationOpen: Boolean!
    deteteAccount: Boolean!
    detetePost(postId: ID!): Boolean!
  }
`;
