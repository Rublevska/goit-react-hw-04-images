import { Component } from 'react';
import { Search } from './SearchBar/Searchbar';
import { FetchImages } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyle';
import { AppSection } from './App.styled';
import { Button } from './LoadMoreBtn/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [],
    totalImages: 0,
    page: 1,
    key: Date.now(),
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page ||
      prevState.key !== this.state.key
    ) {
      try {
        this.setState({ isLoading: true });
        const fetchedImages = await FetchImages(
          this.state.query,
          this.state.page
        );

        if (fetchedImages.total === 0) {
          toast.error(`There is no pictures on query '${this.state.query}'`);
          return;
        }

        this.state.page === 1
          ? this.setState({
              images: [...fetchedImages.hits],
              totalImages: fetchedImages.total,
            })
          : this.setState({
              images: [...prevState.images, ...fetchedImages.hits],
              totalImages: fetchedImages.total,
            });
      } catch (error) {
        toast.error(`ERROR loading images ${error}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = newQuery => {
    if (!newQuery.trim()) {
      return toast.error('Search query can not be empty');
    }

    this.setState({
      query: `${newQuery}`,
      images: [],
      totalImages: 0,
      page: 1,
      key: Date.now(),
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { handleSubmit, handleLoadMore } = this;
    const { images, isLoading, totalImages } = this.state;

    return (
      <AppSection>
        <Search onSubmitSearch={handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {totalImages - images.length > 0 && <Button onClick={handleLoadMore} />}
        <GlobalStyle />
        <Toaster />
      </AppSection>
    );
  }
}
