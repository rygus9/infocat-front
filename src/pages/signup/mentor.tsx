import MentoringForm from '@/components/signup-mentor/MentorForm';

const Mentor = () => {
  return (
    <main className="m-auto w-full max-w-2xl">
      <header className="pt-20 pb-1">
        <h3 className="w-fit space-y-2 text-left text-3xl text-darkGray">
          <p>이승연님 안녕하세요.</p>
          <p>인포머에 동참해주셔서 감사합니다.</p>
        </h3>
      </header>
      <MentoringForm></MentoringForm>
    </main>
  );
};

export default Mentor;
