import React from 'react'
import Post from './Post/Post';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import { Grid, CircularProgress } from '@mui/material'

const Posts = ({ setCurrentId }) => {
  const {posts , isLoading}= useSelector((state) => state.posts);
  const classes = useStyles();

  if(!posts.length && !isLoading) return 'Post Not Found!';
  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={5}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;




