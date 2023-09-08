import React, { useState} from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { getPostBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Navbar from "../Navbar/Navbar";
import Pagination from '../Pagination';
import './Home.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const { posts } = useSelector((state) => state.posts);


  const searchPost = () => {
    const searchTags = tags.map(tag => tag.trim()).filter(tag => tag !== '');
    const searchData = { search, tags: searchTags };
    
    if (searchData.search || searchData.tags.length > 0) {
      dispatch(getPostBySearch(searchData));
      navigate(`/posts/search?searchQuery=${searchData.search || 'none'}&tags=${searchData.tags.join(',')}`);
    } else {
      navigate('/home');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
    setTagInput('');
  };

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
   <div className='head'>
     <Grow in >
     <div>
      <Navbar />
      <br></br><br/>
        <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} posts={posts} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit" elevation={6}>
              <TextField className={classes.search}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              >
              </TextField>
              <br/><br/>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} onDelete={() => handleDelete(tag)} style={{ margin: '5px' }} />
                ))}
              </div>
              <TextField className={classes.search}
                name="tagInput"
                variant="outlined"
                label="Enter Tag"
                fullWidth
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAdd(tagInput);
                  }
                }}
              />
              <br/><br/>
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {/* dynamic block */}
            {
              (!searchQuery && !tags.length) && ( <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>)
            }
          </Grid>
        </Grid>
        </Container>
      </div>
    </Grow>
   </div>
  );
};

export default Home;
