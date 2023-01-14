import usePathPush from '@/hooks/useReplace';
import Button from '../shared/common/Button';
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
        <Button btnStyle="modalMain" onClick={onGoHome}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
