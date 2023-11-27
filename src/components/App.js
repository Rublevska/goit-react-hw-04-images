import { Search } from './SearchBar/Searchbar';
import { FetchImages } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyle';
import { AppSection } from './App.styled';
import { Button } from './LoadMoreBtn/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    async function getImages() {
      try {
        setIsLoading(true);
        const fetchedImages = await FetchImages(query, page);

        if (fetchedImages.total === 0) {
          toast.error(`There is no pictures on query '${query}'`);
          return;
        }

        page === 1
          ? setImages([...fetchedImages.hits])
          : setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        setTotalImages(fetchedImages.total);
      } catch (error) {
        toast.error(`ERROR loading images ${error}`);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page, key]);

  const handleSubmit = newQuery => {
    if (!newQuery.trim()) {
      return toast.error('Search query can not be empty');
    }

    setQuery(`${newQuery}`);
    setImages([]);
    setTotalImages(0);
    setPage(1);
    setKey(Date.now());
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
};
