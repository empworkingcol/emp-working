import { useEffect, useState } from "react";

import { ForumGetModel, ForumListModel } from "src/models/forum.model";
import ForumQuestionCard from "./components/ForumCard";
import ForumQuestionService from "src/services/forum.service";
import ForumQuestionDetail from "./components/ForumDetail";


const Foro = () => {

  const[forumQuestionsList, setForumQuestionsList] = useState<ForumListModel[]>()
  const[forumQuestionDetail, setForumQuestionDetail] = useState<ForumGetModel>()

  useEffect(() => {
    ForumQuestionService.getForumQuestions()
      .then((data) => {
        setForumQuestionsList(data)
      })
  }, [])

  useEffect(() => {}, [forumQuestionDetail])

  const handleForumQuestion = (forumQuestion_id: string) => {
    ForumQuestionService.getForumQuestion(forumQuestion_id)
      .then((data) => {
        setForumQuestionDetail(data)
      })    
  }


  return (
    <section className='relative flex w-max-md m-4 sm:m-6 md:m-8 lg:m-10 xl:mx-16'>
      <div className='max-h-[500px] overflow-y-auto'>
      {
        forumQuestionsList?.map((forumQuestions) => (
          <ForumQuestionCard
            key={`${forumQuestions.question_id}`}
            question_id={forumQuestions.question_id}
            user_name={forumQuestions.user.user_name}
            question_title={forumQuestions.question_title}
            creation_date={forumQuestions.creation_date}
            handleForumQuestion={handleForumQuestion}
          />
        ))
      }
      </div>
      {
        forumQuestionDetail?.creation_date &&
        <ForumQuestionDetail 
          answers={forumQuestionDetail?.ForumResponse}
          user_name={forumQuestionDetail.user.user_name}
          question_text={forumQuestionDetail.question_text}
          question_title={forumQuestionDetail.question_title}
          creation_date={forumQuestionDetail.creation_date}
        />
      }
    </section>
  );
};

export default Foro;
