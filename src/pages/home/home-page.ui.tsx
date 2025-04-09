import { ArticlesList } from '~widgets/articles-list';
import { Container } from '@mui/material';
import { IntroBlock } from '~widgets/intro-block';

export function HomePage() {
  return (
    <Container maxWidth="lg">
      <div className="w-[100%] mx-auto bg-[white] my-5 p-5 rounded-md flex flex-col-reverse md:flex-row items-center md:justify-center gap-5 translate-y-5 md:translate-y-px border-2 border-[#eae8e885]">
        <div>
          <h2 className="text-[25px] md:text-[35px] font-bold text-center opacity-75 leading-10 text-pc-500">
            Откройте для себя лучшие места для отдыха и развлечений!
          </h2>
        </div>
      </div>
      <h2 className="mt-10 mb-5 text-center text-2xl font-bold text-pc-500">
        Популярные места
      </h2>
      <IntroBlock />
      <ArticlesList />
    </Container>
  );
}
