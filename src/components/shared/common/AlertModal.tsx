import Button from './Button';
import Modal from './Modal';

interface AlertModalProps {
  isOpen: boolean;
  description: string | JSX.Element;
  onClick: () => void;
  submitText?: string;
}

export default function AlertModal({ isOpen, description, onClick, submitText = '확인' }: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={() => {}}>
      <div className="py-6">
        <h3 className="pb-6 text-lg text-darkGray">{description}</h3>
        <Button btnStyle="modalMain" onClick={onClick}>
          {submitText}
        </Button>
      </div>
    </Modal>
  );
}
