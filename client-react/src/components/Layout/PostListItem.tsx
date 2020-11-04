import React from 'react';
import moment from 'moment';


interface Props {
  id: string;
  url: string;
  title: string;
  author: string;
  created_at: Date;
  deletePost: (id: string) => void;
};

const handleClickRow = (url: string) => {
  window.open(url, "_blank");
};

const showDate = (created_at: Date) => {
  const today = moment().format('YYYYMMDD');
  const yesterday = moment().subtract(1, "day").valueOf();

  if (moment(created_at).isSame(today, 'day')) {
    return moment(created_at).format('hh:mm a');
  } else if (moment(created_at).valueOf() < yesterday) {
    return moment(created_at).format('MMM D');
  }
  else {
    return moment(created_at).calendar().split(' ')[0];
  }
};

const PostListItem = ({ id, url, title, author, created_at, deletePost }: Props) => {
  return (
    <tr className='table-row' >
      <td className='title' onClick={() => handleClickRow(url)}>{title}</td>
      <td className='author' onClick={() => handleClickRow(url)} > -{author} -</td>
      <td className='time' onClick={() => handleClickRow(url)}>{showDate(created_at)}</td>
      <td onClick={() => deletePost(id)}><i className='icon-trash fas fa-trash' ></i></td>
    </tr>
  );
};

export default PostListItem;
