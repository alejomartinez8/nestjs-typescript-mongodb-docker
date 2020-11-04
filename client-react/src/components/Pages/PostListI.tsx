import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css';
import PostListItem from '../Layout/PostListItem';
import moment from 'moment';

const BaseUrl: string = 'http://localhost:5000/blog';

const PostList = () => {
  const [postList, setPostList] = useState([]);

  const getPosts = async () => {
    const url = `${BaseUrl}/posts`;
    const result = await axios.get(url);
    setPostList(result.data);
  };

  const deletePost = async (id: string) => {
    const post: any = postList.find((elm: any) => elm._id === id);
    post.show = false;

    const config: any = {
      method: 'put',
      url: `${BaseUrl}/edit/?_id=${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ "show": "false" })
    };
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  const sortPosts = (posts: any) => {
    const sorted = posts
      .filter((elm: any) => elm.show !== false)
      .sort((a: any, b: any) => {
        return moment(b.created_at).valueOf() - moment(a.created_at).valueOf();
      })
      .map((post: any) =>
        <PostListItem
          key={post._id}
          id={post._id}
          title={post.title}
          author={post.author}
          url={post.url}
          created_at={post.created_at}
          deletePost={deletePost}
        />
      );

    return sorted;
  };


  return (
    <main>
      <table>
        <tbody>
          {sortPosts(postList)}
        </tbody>
      </table>

    </main>
  );
};

export default PostList;
