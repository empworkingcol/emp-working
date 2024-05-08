import { useEffect, useState } from 'react'

import NewService from 'src/services/new.service';
import { NewGetModel } from 'src/models/new.model';
import CardGeneral from './components/CardGeneral'

const News = () => {

  const[newsList, setNewsList] = useState<NewGetModel[]>()

  useEffect(()=> {
    NewService.getNews()
      .then((data) => {
        setNewsList(data)
      })
  }, [])

  return (
    <section className='flex flex-col items-center m-4 sm:m-6 md:m-8 lg:m-10 xl:mx-16'>
      {
        newsList?.map((news) => (
          <CardGeneral
            key={`#${news.new_id}`}
            icon_url={"https://empworkstore.s3.us-east-2.amazonaws.com/logo.jpeg"}
            imagen_url={news.img_url}
            user_name={news.user.user_name}
            new_text={news.new_text}
            new_title={news.new_title}
            creation_date={news.creation_date}
            comments={news.NewComment}
            new_id={news.new_id}
          />
        ))
      }
    </section>
  );
};

export default News;
