import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
});

interface ViewerProps {
  textBody: string;
}

export default function Viewer({ textBody }: ViewerProps) {
  return (
    <div className="h-full w-full">
      <QuillNoSSRWrapper value={textBody} readOnly={true} theme="bubble" className="quill-viewer"></QuillNoSSRWrapper>
    </div>
  );
}
