import React, {Fragment} from 'react';
import Header from './components/Layout/Header';
import PostList from './components/Pages/PostListI';

function App() {
  return (
    <Fragment>
      <Header/>
      <PostList/>
    </Fragment>
  );
}

export default App;
