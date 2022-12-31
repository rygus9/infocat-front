import usePathPush from '@/hooks/useReplace';
import Modal from '../shared/common/Modal';

interface SignupSuccessModal {
  isOpen: boolean;
  closeModal: () => void;
}

export default function SignUpSuccessModal({ closeModal, isOpen }: SignupSuccessModal) {
  const onGoHome = usePathPush('/mentoring');

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="pt-2 pb-4">
        <h3 className="pt-2 pb-6 text-xl text-darkGray">인포머 등록에 성공하셨습니다.</h3>
        <button onClick={onGoHome} className="rounded-lg bg-lightPurple px-4 py-1 text-base text-darkWhite">
          확인
        </button>
      </div>
    </Modal>
  );
}
