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
          <button onClick={closeModal} className="rounded-lg border border-lightPurple px-4 py-1 text-base text-lightPurple">
            확인
          </button>
          <button onClick={onLoginPage} className="rounded-lg bg-lightPurple px-4 py-1 text-base text-darkWhite">
            로그인
          </button>
        </section>
      </div>
    </Modal>
  );
}
