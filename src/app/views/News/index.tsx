import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewService from 'src/services/new.service';
import { NewGetModel } from 'src/models/new.model';
import CardGeneral from './components/CardGeneral';
import ModalAddNew from './components/ModalAddNew';
import Button from 'src/components/atoms/Button';
import { useAuth } from 'src/app/core/useAuth';

const News = () => {

  const[newsList, setNewsList] = useState<NewGetModel[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    if (user?.user_id) {
      setIsModalOpen(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(()=> {
    NewService.getNews()
      .then((data) => {
        setNewsList(data)
      })
  }, [])

  return (
    <section className='flex flex-col items-center m-4 sm:m-6 md:m-8 lg:m-10 xl:mx-16'>
      <Button
        className='self-end mb-4'
        type='submit'
        variant='primary'
        bigger
        onClick={handleOpenModal}
      >
        Crear noticia
      </Button>
      <ModalAddNew isOpen={isModalOpen} onClose={handleCloseModal} />
      {
        newsList?.map((news) => (
          <CardGeneral
            key={`${news.new_id}`}
            icon_url={"https://empworkstore.s3.us-east-2.amazonaws.com/logo.jpeg"}
            imagen_url={news.img_url}
            user_name={news.user.user_name}
            new_text={news.new_text}
            new_title={news.new_title}
            creation_date={news.creation_date}
            comments={news.new_comment}
            new_id={news.new_id}
          />
        ))
      }
    </section>
  );
};

export default News;
