import { PdfView } from 'react-native-pdf-view';
import { FC } from 'react';

const ResumeScreen: FC = () => {
  return (
    <PdfView
      uri={'https://trajano.net/assets/Archimedes%20Trajano.pdf'}
      pageNumber={1}
      scale={4.0}
      onMessage={(x) => {
        if (x.type === 'ok') {
          console.log({ len: x.data?.length });
        } else {
          console.log(x);
        }
      }}
    />
  );
};

export default ResumeScreen;
