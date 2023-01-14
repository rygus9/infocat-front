import Button from '@/components/shared/common/Button';
import Modal from '@/components/shared/common/Modal';
import usePathPush from '@/hooks/useReplace';

interface CreateSuccessModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function CreateSuccessModal({ closeModal, isOpen }: CreateSuccessModalProps) {
  const onGoHome = usePathPush('/mentoring');

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="pt-2 pb-4">
        <h3 className="pt-2 pb-6 text-xl text-darkGray">멘토링 생성에 성공하셨습니다.</h3>
        <Button btnStyle="modalMain" onClick={onGoHome}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
