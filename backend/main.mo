import Func "mo:base/Func";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Order "mo:base/Order";

actor {
  // Define a type for a blog post
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  // Stable variable to store posts
  stable var posts: [Post] = [];

  // Function to add a new post
  public func addPost(title: Text, body: Text, author: Text) : async Nat {
    let newPost = {
      id = Array.size(posts);
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [newPost]);
    return newPost.id;
  };

  // Query function to get all posts, sorted by timestamp (most recent first)
  public query func getPosts() : async [Post] {
    return Array.sort(posts, func (a: Post, b: Post) : Order.Order {
      if (a.timestamp > b.timestamp) #less
      else if (a.timestamp < b.timestamp) #greater
      else #equal
    });
  };
}
