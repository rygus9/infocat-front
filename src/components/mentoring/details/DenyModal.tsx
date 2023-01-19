import Button from '@/components/shared/common/Button';
import Modal from '@/components/shared/common/Modal';
import usePathPush from '@/hooks/useReplace';

interface DenyModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function DenyModal({ closeModal, isOpen }: DenyModalProps) {
  const onLoginPage = usePathPush('/login');

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="pt-2 pb-4">
        <h3 className="pt-2 pb-10 text-xl text-darkGray">로그인이 필요합니다.</h3>
        <section className="flex items-center justify-center space-x-2">
          <Button btnStyle="modalSub" onClick={closeModal}>
            확인
          </Button>
          <Button btnStyle="modalMain" onClick={onLoginPage}>
            로그인
          </Button>
        </section>
      </div>
    </Modal>
  );
}
