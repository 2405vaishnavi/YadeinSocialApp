import React, {useEffect} from 'react'
import {Paper,Typography,CircularProgress , Divider} from '@mui/material';
import {useDispatch , useSelector} from 'react-redux';
import moment from 'moment' ;  // js library deals with time
import {useParams , useNavigate} from 'react-router-dom';
import useStyles from './styles';
import {getPost,getPostBySearch} from  '../../actions/posts';
import CommentSection from './CommentSection';

const PostDetails = () => {
  const {post,posts,isLoading} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  },[id]);

  useEffect(() => {
    if(post){
      dispatch(getPostBySearch({search : 'none' , tags : post?.tags.join(',')}));
    }
  },[post])

  if(!post) return null;

  if(isLoading){
    return (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id}) => _id !== post._id);

  const openPost = (_id) => navigate(`/posts/${id}`);

  return (
<Paper style={{ padding: '20px', borderRadius: '15px', marginTop: '50px' }} elevation={6}>
      {/* Post Detail */}

      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection  post={post}/>                       
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
        <img className={classes.media} src={post.selectedFile} alt={post.title} />
        </div>
      </div>

      {/* Post Recommendation */}

      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom  variant='h5' >You might also like !</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
          {/* Dynamic Block to recommend post      */}
          {
            recommendedPosts.map(({title , message , name ,likes , selectedFile , _id}) =>(
              <div style={{margin : '20px' ,cursor:'pointer'}} onClick={() => openPost(_id)} key ={_id}> 
                {title}
              </div>
            ))
          }
         </div>
        </div>
      )}

      </Paper>
  )
}

export default PostDetails