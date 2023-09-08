import React,{useState} from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import './Post.css';

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const [likes,setLikes] = useState(post?.likes);
  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === (userId));

  const handleClick = async() =>{
    dispatch(likePost(post._id));

    if(hasLikedPost){
      setLikes(likes.filter((id) => id !==(userId)))
    }else{
      setLikes([...likes,userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (userId))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <ButtonBase
      className={classes.cardAction}
      onClick={openPost}
    >
<Card className={`${classes.card} ${classes.hoverEffect}`} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile 
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              onClick={() => setCurrentId(post._id)}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.msg}>
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick = {handleClick}
          >
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size="small"
              color="secondary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </ButtonBase>
  );
};

export default Post;
