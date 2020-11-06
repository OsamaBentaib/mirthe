import { gql } from "@apollo/client";
export const postsQuery = `
  query getPosts($start: Int!, $limit: Int!) {
    getPosts(start: $start, limit: $limit) {
      commentsCount
      reactionsCount
      _id
      content
      createdAt
      Image {
        filename
        path
      }
      createdBy {
        _id
        username
        profile {
          firstName
          lastName
          avatar {
            filename
            path
          }
        }
      }
      comments {
        content
        createdAt
        createdBy {
          _id
          username
          profile {
            firstName
            lastName
            avatar {
              filename
              path
            }
          }
        }
      }
      reactions {
        content
        createdAt
        createdBy {
          _id
          username
          profile {
            firstName
            lastName
            avatar {
              filename
            }
          }
        }
      }
    }
  }
`;
export const getNotifictionQuery = gql`
  query getNotification($start: Int!, $limit: Int!) {
    getNotification(start: $start, limit: $limit) {
      for {
        username
      }
      createdBy {
        username
        profile {
          firstName
          lastName
          avatar {
            filename
          }
        }
      }
      badge
      content
      message
      createdAt
    }
  }
`;
export const getPostQuery = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      commentsCount
      reactionsCount
      _id
      content
      createdAt
      Image {
        filename
        path
      }
      createdBy {
        _id
        username
        profile {
          firstName
          lastName
          avatar {
            filename
            path
          }
        }
      }
      comments {
        content
        createdAt
        createdBy {
          _id
          username
          profile {
            firstName
            lastName
            avatar {
              filename
              path
            }
          }
        }
      }
      reactions {
        content
        createdAt
        createdBy {
          _id
          username
          profile {
            firstName
            lastName
            avatar {
              filename
            }
          }
        }
      }
    }
  }
`;
export const getUsersPostsQuery = gql`
  query getUserPosts($start: Int!, $limit: Int!, $userId: ID!) {
    getUserPosts(start: $start, limit: $limit, userId: $userId) {
      commentsCount
      reactionsCount
      _id
      content
      createdAt
      Image {
        filename
        path
      }
      createdBy {
        _id
        username
        profile {
          firstName
          lastName
          avatar {
            filename
            path
          }
        }
      }
      comments {
        content
        createdAt
        createdBy {
          _id
          username
          profile {
            firstName
            lastName
            avatar {
              filename
              path
            }
          }
        }
      }
      reactions {
        content
        createdAt
        createdBy {
          _id
          username
          profile {
            firstName
            lastName
            avatar {
              filename
            }
          }
        }
      }
    }
  }
`;
export const loginQuery = `
query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    token
    _id
    username
    profile{
        firstName
        lastName
        birthday
        location
        phone
        avatar{
        path
        filename
    }
    }
    }
}`;
export const createCommentQuery = gql`
  mutation createComment($content: String!, $postId: ID!) {
    createComment(content: $content, postId: $postId) {
      content
      createdAt
      createdBy {
        _id
        username
        profile {
          firstName
          lastName
          avatar {
            filename
            path
          }
        }
      }
    }
  }
`;
export const createReactionQuery = gql`
  mutation createReaction($content: String!, $postId: ID!) {
    createReaction(content: $content, postId: $postId) {
      content
      createdAt
      createdBy {
        username
        profile {
          firstName
          lastName
          avatar {
            filename
            path
          }
        }
      }
    }
  }
`;
export const createPostQuery = gql`
  mutation createPost($content: String!, $Image: Upload) {
    createPost(content: $content, Image: $Image) {
      commentsCount
      reactionsCount
      _id
      content
      Image {
        filename
        path
      }
      createdBy {
        _id
        username
        profile {
          firstName
          lastName
          avatar {
            filename
            path
          }
        }
      }
      comments {
        createdBy {
          _id
          username
          profile {
            avatar {
              filename
            }
          }
        }
      }
      reactions {
        content
        createdBy {
          _id
          username
          profile {
            avatar {
              filename
            }
          }
        }
      }
    }
  }
`;
export const updatePostQuery = gql`
  mutation updatePost($content: String!, $Image: Upload, $postId: ID!) {
    updatePost(content: $content, Image: $Image, postId: $postId)
  }
`;
export const deletePostQuery = gql`
  mutation detetePost($postId: ID!) {
    detetePost(postId: $postId)
  }
`;
export const getUserQuery = gql`
  query getUser($ID: ID!) {
    getUser(ID: $ID) {
      _id
      username
      createdAt
      isPrivate
      email
      isMyFollowers
      isMyFollowing
      profile {
        avatar {
          filename
          path
        }
        firstName
        lastName
        birthday
        location
        phone
        _id
      }
    }
  }
`;
export const getFollowsQuery = gql`
  query getFollows($rel: Int!, $userId: ID!, $start: Int!, $limit: Int!) {
    getFollows(rel: $rel, userId: $userId, start: $start, limit: $limit) {
      followedBy {
        _id
        username
        isMyFollowers
        isMyFollowing
        profile {
          firstName
          lastName
          avatar {
            filename
            path
          }
        }
      }
      followed {
        _id
        username
        isMyFollowers
        isMyFollowing
        profile {
          firstName
          lastName
          avatar {
            filename
            path
          }
        }
      }
    }
  }
`;
export const profileQuery = gql`
  mutation profile(
    $phone: String!
    $lastName: String!
    $firstName: String!
    $location: String!
    $birthday: String!
    $avatar: Upload
  ) {
    profile(
      profileInput: {
        phone: $phone
        lastName: $lastName
        firstName: $firstName
        location: $location
        birthday: $birthday
        avatar: $avatar
      }
    ) {
      lastName
      firstName
      location
      phone
      birthday
      avatar {
        filename
        path
      }
    }
  }
`;
export const createFollowQuery = gql`
  mutation createFollow($followed: ID!, $followedBy: ID!) {
    createFollow(followed: $followed, followedBy: $followedBy) {
      followed {
        username
      }
      followedBy {
        username
      }
    }
  }
`;
