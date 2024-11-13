import { PdfView } from 'react-native-pdf-view';
import { FC } from 'react';

const ResumeScreen: FC = () => {
  console.log('F');
  return (
    <PdfView
      uri={'https://trajano.net/assets/Archimedes%20Trajano.pdf'}
      pageNumber={1}
      style={{ flex: 1 }}
    />
  );
};

export default ResumeScreen;
